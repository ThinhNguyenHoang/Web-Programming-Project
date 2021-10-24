<?php
namespace src\common\utils;
require_once  __DIR__ . '../../../vendor/autoload.php';


use Firebase\JWT\JWT;

include '../config/jwt_token_config.php';
require_once('../../vendor/autoload.php');

// show error reporting
error_reporting(E_ALL);

// set your default time-zone
date_default_timezone_set('Asia/Manila');



class RequestHelper{
    /*
        * This one return either: GET | PUT | POST | DELETE
     */
    public static function getRequestMethod()
    {
        return $_SERVER["REQUEST_METHOD"];
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
     *      + Call to get_ith_path_item(1) should return user
     *      + Call to get_ith_path_item(2) should return authorize
     *  NOTE: We only get the base endpoint to determine which controller to call.
     *  /authorize will be handled by the controller called it self.
     */
    public static function get_ith_path_item($ith_num){
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $uri = explode( '/', $uri );
        return $uri[$ith_num];
    }

    public static function generate_jwt_token(UserAccount $userAccount) : string{
        global $issuer, $issued_at,$expiration_time,$key;
        $payload = array(
            "iat" => $issued_at,
            "exp" => $expiration_time,
            "iss" => $issuer,
            "data" => array(
                "id" => $userAccount->id,
                "username" => $userAccount->username,
            )
        );
        return JWT::encode($payload,$key,'HS512');
    }

    public static function validate_jwt_token(){
        // GET THE jwt token attached to the request
        global $key,$issuer;
        if (! preg_match('/Bearer\s(\S+)/', $_SERVER['HTTP_AUTHORIZATION'], $matches)) {
            header('HTTP/1.0 400 Bad Request');
            echo 'Token not found in request';
            exit;
        }
        
        $jwt = $matches[1];
        if (! $jwt) {
            // No token was able to be extracted from the authorization header
            header('HTTP/1.0 400 Bad Request');
            exit;
        }
        $token = JWT::decode($jwt,$key , ['HS512']);
        $now = new DateTimeImmutable();

        if ($token->iss !== $issuer ||
            $token->exp < $now->getTimestamp())
        {
            header('HTTP/1.1 401 Unauthorized');
            exit;
        }
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