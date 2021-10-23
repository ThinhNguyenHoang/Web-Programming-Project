<?php
/*
 * This class is supposed to help packing the response request:
 *  + Add header
 */
class ResponseHelper {
    public static function addHeader(){

    }

    public static function success($message=null,$body=null){
        // TODO: Tra ve code 200 và trả về body cho người dùng (nếu có)
        if($message){
            //TODO: Quăng về kèm message
        }
    }

    public static function error_client($message){
        // TODO: Trả về code lỗi: 400  và trả về message lỗi (Lỗi do client)
    }

    public static function error_server($message){
        // TODO: Trả về code lỗi: 500  và trả về message lỗi nếu có (Lỗi do server)
    }

}