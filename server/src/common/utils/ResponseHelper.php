<?php
namespace src\common\utils;
require_once  __DIR__ . '../../../vendor/autoload.php';


/*
 * This class is supposed to help packing the response request:
 *  + Add header
 */
class ResponseHelper {
    public static function addHeader(){

    }

    public static function success($message=null,$body=null){
        // TODO: Tra ve code 200 và trả về body cho người dùng (nếu có)
        http_response_code(200);
        if($message){
            //TODO: Quăng về kèm message
            echo json_encode(array("message" => $message));
        }
    }

    public static function error_client($message){
        // TODO: Trả về code lỗi: 400  và trả về message lỗi (Lỗi do client)
        http_response_code(400);
        echo json_encode(array("message" => $message));
    }

    public static function error_server($message){
        // TODO: Trả về code lỗi: 500  và trả về message lỗi nếu có (Lỗi do server)
    }

}