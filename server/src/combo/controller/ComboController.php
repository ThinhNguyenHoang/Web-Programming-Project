<?php

namespace src\combo\controller;

use http\Client\Curl\User;
use src\common\base\BaseController;
use src\common\base\RequestHandler;
use src\common\utils\RequestHelper;
use src\common\utils\ResponseHelper;
use src\combo\dto\ComboRegisterRequest;
use src\combo\service\ComboService;

require_once  __DIR__ . '/../../../vendor/autoload.php';

class ComboController extends BaseController implements RequestHandler
{
    /**
     * "/combo" Endpoint - Get list of combos
     */
    public function handleRequest(){
        $method = strtolower(RequestHelper::getRequestMethod());
        error_log("Combo controller::METHOD::" . $method);
        $relative_path = RequestHelper::get_ith_path_item(1);
        switch($method){
            case "get":
                if($relative_path == null){
                    ComboService::getComboList();
                }
                else {
                    ResponseHelper::error_client("Invalid path in food endpoint");
                }
                break;
            // case "post":
            //     switch ($relative_path){
            //         case "add-food":
            //             error_log("FOOD_CONTROLLER::ADD FOOD ENDPOINT::" . $relative_path);
            //             FoodService::addFood();
            //             break;
            //         case "add-combo":
            //             error_log("FOOD_CONTROLLER::ADD COMBO ENDPOINT::" . $relative_path);
            //             FoodService::addCombo();
            //             break;
            //         case "add-material":
            //             error_log("FOOD_CONTROLLER::ADD MATERIAL ENDPOINT::" . $relative_path);
            //             FoodService::addMaterial();
            //             break;
            //         default:
            //             ResponseHelper::error_client("Invalid path in food endpoint");
            //     }
            //     break;
            // case "put":
            //     switch($relative_path){
            //         case null:
            //             FoodService::updateFood();
            //             break;
            //         case null:
            //             FoodService::updateUserAccount();
            //             break;
            //         case "change-password":
            //             FoodService::setNewPassword();
            //             break;
            //         default:
            //             ResponseHelper::error_client("Invalid parameter");
            //     }
            //     break;
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
