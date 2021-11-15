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
                    ResponseHelper::error_client("Invalid path in combo endpoint");
                }
                break;
                case "post":
                    if($relative_path == null){
                        error_log("COMBO_CONTROLLER::ADD MATERIAL ENDPOINT::" . $relative_path);
                        ComboService::addCombo();
                    }
                    else {
                        ResponseHelper::error_client("Invalid path in combo endpoint");
                    }
                    break;
            case "put":
                if (is_numeric($relative_path)) {
                    error_log("COMBO_CONTROLLER::UPDATE COMBO ENDPOINT::" . $relative_path);
                    ComboService::updateCombo($relative_path);
                } else {
                    ResponseHelper::error_client("Invalid parameter");
                }
                break;
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
