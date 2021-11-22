<?php
namespace src\common\utils;
require_once  __DIR__ . '/../../../vendor/autoload.php';

use DateTimeImmutable;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT;

// show error reporting
error_reporting(E_ALL);

// set your default time-zone
date_default_timezone_set('Asia/Manila');

// variables used for jwt
$key = "example_key";
$issued_at = time();
$expiration_time = $issued_at + (60 * 60); // valid for 1 hour
$issuer = "http://localhost/CodeOfaNinja/RestApiAuthLevel1/";

class RequestHelper{
    /*
        * This one return either: GET | PUT | POST | DELETE
     */
    public static function getRequestMethod()
    {
        return $_SERVER["REQUEST_METHOD"];
    }

    /**
     * Get header Authorization
     * */
    public static function getAuthorizationHeader(): ?string
    {
        $headers = null;
        if (isset($_SERVER['Authorization'])) {
            $headers = trim($_SERVER["Authorization"]);
        }
        else if (isset($_SERVER['HTTP_AUTHORIZATION'])) { //Nginx or fast CGI
            $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
        } elseif (function_exists('apache_request_headers')) {
            $requestHeaders = apache_request_headers();
            // Server-side fix for bug in old Android versions (a nice side-effect of this fix means we don't care about capitalization for Authorization)
            $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
            //print_r($requestHeaders);
            if (isset($requestHeaders['Authorization'])) {
                $headers = trim($requestHeaders['Authorization']);
            }
        }
        return $headers;
    }
    /**
     * get access token from header
     * */
    public static function getBearerToken() {
        $headers = self::getAuthorizationHeader();
        // HEADER: Get the access token from the header
        if (!empty($headers)) {
            if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
                return $matches[1];
            }
        }
        return null;
    }

    public static function returnSuccess($body){

    }

    /*
     *  GET Endpoint info:
     *  Example:
     *  Input: https://www.server.com/user/authorize
     *  Output: /user
     *  NOTE: We only get the base endpoint to determine which controller to call.
     *  /authorize will be handled by the controller called it self.
     */
    public static function getBaseEndpoint(){
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

        $uri = explode( '/', $uri );
        return $uri[1];
    }
    /*
     *  GET Endpoint info:
     *  Example:
     *  Input: https://www.server.com/user/authorize
     *  Output:
     *      + Call to get_ith_path_item(0) should return user
     *      + Call to get_ith_path_item(1) should return authorize
     *  NOTE: We only get the base endpoint to determine which controller to call.
     *  /authorize will be handled by the controller called it self.
     */
    public static function get_ith_path_item(int $ith_num) : ?string {
        $uri = explode("/",substr($_SERVER['REQUEST_URI'],1));
        if($ith_num >= count($uri)){
            error_log("RequestHelper: Có thằng lấy index sai " . $ith_num);
            return null;
        }
        return $uri[$ith_num];
    }

    public static function getRequestBody() : ?object{
        return json_decode(file_get_contents("php://input"));
    }

    public static function generate_jwt_token($userAccount) : string{
        $key = "example_key";
        $issued_at = time();
        $expiration_time = $issued_at + (60 * 60); // valid for 1 hour
        $issuer = "http://localhost/CodeOfaN";

        $object = new \stdClass();
        error_log("KEY_FLOBAL_TEST:" . $key,0);
        $payload = (object) array(
            "iat" => $issued_at,
            "exp" => $expiration_time,
            "iss" => $issuer,
            "data" => (object) array(
                "id" => $userAccount->id,
                "username" => $userAccount->username,
                "role" => $userAccount->role
            )
        );
        return JWT::encode($payload,$key,'HS512');
    }

    public static function validate_jwt_token(): ?object
    {
        $key = "example_key";
        $issuer = "http://localhost/CodeOfaN";
        // GET THE jwt token attached to the request
        $jwt = self::getBearerToken();
        error_log("TOKEN ATTACHED:" . json_encode($jwt), 0);
        if (! $jwt) {
            // No token was able to be extracted from the authorization header
            header('HTTP/1.0 400 Bad Request');
            ResponseHelper::error_client("Unauthorized. Suck Ass Token. Stop being an Imposter");
            exit;
        }
        $token = null;
        try{
            $token = JWT::decode($jwt,$key , ['HS512']);
            $now = new DateTimeImmutable();
        }
        catch(ExpiredException $exception) {
            ResponseHelper::error_client("Expired Token: Please try renew the token");
            return null;
        }
        if ($token->iss !== $issuer ||
            $token->exp < $now->getTimestamp())
        {
            header('HTTP/1.1 401 Unauthorized');
            exit;
        }
        return $token;
    }
    public static function isAdminPrivilege(): bool {
        $token = self::validate_jwt_token();
        $payload = self::getTokenPayload();
        return $payload->role == "ADMIN";
    }
    public static function getTokenPayload(): object{
        $jwt = self::getRequestBody()->token;
        global $key;
        return JWT::decode($jwt,$key , ['HS512']);
    }


    /**
     * Get URI elements.
     *
     * @return array
     */
    protected function getUriSegments(): array
    {
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $uri = explode('/', $uri);

        return $uri;
    }

    /**
     * Get querystring params.
     *
     * @return array
     */
    protected function getQueryStringParams(): array
    {
        parse_str($_SERVER['QUERY_STRING'], $query);
        return $query;
    }
}