<?php
namespace src\common\utils;
require_once  __DIR__ . '/../../../vendor/autoload.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Methods: *');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization,ResponseType,X-Request-Id,Access-Control-Allow-Methods");

/*
 * This class is supposed to help packing the response request:
 *  + Add header
 */
class ResponseHelper {
    public static function addHeader(){

    }

    public static function returnJsonBody($body){
        http_response_code(200);
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json; charset=UTF-8");
        echo json_encode($body);
    }

    public static function success($message=null,$body=null){
        // TODO: Tra ve code 200 và trả về body cho người dùng (nếu có)
        http_response_code(200);
        $object = new \stdClass();
        if($message){
            $object->message = $message;
        }
        $object->data = $body;
        echo json_encode($object);
    }

    public static function error_client($message){
        // TODO: Trả về code lỗi: 400  và trả về message lỗi (Lỗi do client)
        http_response_code(400);
        $object = new \stdClass();
        $object->message = "HASDHASHD";
        echo json_encode(
            array("message" => $message)
        );
    }

    public static function error_server($message){
        // TODO: Trả về code lỗi: 500  và trả về message lỗi nếu có (Lỗi do server)
        http_response_code(500);
        $object = new \stdClass();
        $object->message = "HASDHASHD";
        echo json_encode(
            array("message" => $message)
        );
    }

}