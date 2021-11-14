<?php

namespace src\food\controller;

use http\Client\Curl\User;
use src\common\base\BaseController;
use src\common\base\RequestHandler;
use src\common\utils\RequestHelper;
use src\common\utils\ResponseHelper;
use src\food\dto\FoodRegisterRequest;
use src\food\service\FoodService;

require_once  __DIR__ . '/../../../vendor/autoload.php';

class FoodController extends BaseController implements RequestHandler
{
    /**
     * "/food" Endpoint - Get list of foods
     */
    public function handleRequest(){
        $method = strtolower(RequestHelper::getRequestMethod());
        error_log("Food controller::METHOD::" . $method);
        $relative_path = RequestHelper::get_ith_path_item(1);
        switch($method){
            case "get":
                if($relative_path == null){
                    FoodService::getFoodList();
                }
                else {
                    ResponseHelper::error_client("Invalid path in food endpoint");
                }
                break;
            case "post":
                switch ($relative_path){
                    case "add-food":
                        error_log("FOOD_CONTROLLER::ADD FOOD ENDPOINT::" . $relative_path);
                        FoodService::addFood();
                        break;
                    case "add-combo":
                        error_log("FOOD_CONTROLLER::ADD COMBO ENDPOINT::" . $relative_path);
                        FoodService::addCombo();
                        break;
                    case "add-material":
                        error_log("FOOD_CONTROLLER::ADD MATERIAL ENDPOINT::" . $relative_path);
                        FoodService::addMaterial();
                        break;
                    default:
                        ResponseHelper::error_client("Invalid path in food endpoint");
                }
                break;
            default:
                return false;
        }
    }
}
