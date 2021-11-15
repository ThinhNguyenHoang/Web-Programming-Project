<?php

namespace src\material\controller;

use src\common\base\BaseController;
use src\common\base\RequestHandler;
use src\common\utils\RequestHelper;
use src\common\utils\ResponseHelper;
use src\material\service\MaterialService;

require_once  __DIR__ . '/../../../vendor/autoload.php';

class MaterialController extends BaseController implements RequestHandler
{
    /**
     * "/food" Endpoint - Get list of foods
     */
    public function handleRequest(){
        $method = strtolower(RequestHelper::getRequestMethod());
        error_log("Material controller::METHOD::" . $method);
        $relative_path = RequestHelper::get_ith_path_item(1);
        switch($method){
            case "get":
                if($relative_path == null){
                    error_log("MATERIAL_CONTROLLER::GET MATERIAL ENDPOINT::" . $relative_path);
                    MaterialService::getMaterialList();
                }
                else {
                    ResponseHelper::error_client("Invalid path in material endpoint");
                }
                break;
            case "post":
                if($relative_path == null){
                    error_log("MATERIAL_CONTROLLER::ADD MATERIAL ENDPOINT::" . $relative_path);
                    MaterialService::addMaterial();
                }
                else {
                    ResponseHelper::error_client("Invalid path in material endpoint");
                }
                break;
            case "put":
                switch($relative_path){
                    case null:
                        error_log("MATERIAL_CONTROLLER::UPDATE MATERIAL ENDPOINT::" . $relative_path);
                        MaterialService::updateMaterial();
                        break;
                    // case null:
                    //     FoodService::updateUserAccount();
                    //     break;
                    // case "change-password":
                    //     FoodService::setNewPassword();
                    //     break;
                    default:
                        ResponseHelper::error_client("Invalid parameter");
                }
                break;
            // case "delete":
            //     switch ($relative_path){
            //         case "bank-account":
            //             FoodService::updateUserAccount();
            //             break;
            //         case null:
            //             FoodService::removeUserAccount();
            //             break;
            //         default:
            //             ResponseHelper::error_client("Invalid parameter");
            //     };
            //     break;
            default:
                return false;
        }
    }
}
