<?php
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

    public static function get_jwt_token(){
        // GET THE jwt token attached to the request
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