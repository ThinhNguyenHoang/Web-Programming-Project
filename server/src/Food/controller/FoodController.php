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
    public function handleRequest()
    {
        $method = strtolower(RequestHelper::getRequestMethod());
        error_log("Food controller::METHOD::" . $method);
        $relative_path = RequestHelper::get_ith_path_item(1);
        switch ($method) {
            case "get":
                if ($relative_path == null) {
                    error_log("FOOD_CONTROLLER::GET FOOD ENDPOINT::" . $relative_path);
                    FoodService::getFoodList();
                } else if (is_numeric($relative_path)) {
                    error_log("FOOD_CONTROLLER::GET FOOD BY ID ENDPOINT::" . $relative_path);
                    FoodService::getFoodByID($relative_path);
                } else {
                    ResponseHelper::error_client("Invalid path in food endpoint");
                }
                break;
            case "post":
                if ($relative_path == null) {
                    error_log("FOOD_CONTROLLER::ADD FOOD ENDPOINT::" . $relative_path);
                    FoodService::addFood();
                } else {
                    ResponseHelper::error_client("Invalid path in food endpoint");
                }
                break;
            case "put":
                if (is_numeric($relative_path)) {
                    error_log("FOOD_CONTROLLER::UPDATE FOOD ENDPOINT::" . $relative_path);
                    FoodService::updateFood($relative_path);
                } else {
                    ResponseHelper::error_client("Invalid parameter");
                }
                break;
            case "delete":
                if (is_numeric($relative_path)) {
                    error_log("FOOD_CONTROLLER::DELETE FOOD ENDPOINT::" . $relative_path);
                    FoodService::deleteFood($relative_path);
                } else {
                    ResponseHelper::error_client("Invalid parameter");
                }
                break;
            default:
                return false;
        }
    }
}
