<?php

namespace src\food\controller;

use src\common\base\BaseController;
use src\common\base\RequestHandler;
use src\common\utils\RequestHelper;
use src\common\utils\ResponseHelper;
use src\food\service\FoodService;
use src\food_comment\controller\FoodCommentController;
use src\tag\repository\TagRepository;

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
        if ($relative_path  != "comment") {
            self::foodEndpoint($method, $relative_path);
        } else {
            $foodCommentController = new FoodCommentController();
            $foodCommentController->handleRequest();
        }
    }

    public static function foodEndpoint($method, $relative_path = null){
        switch ($method) {
            case "get":
                if ($relative_path == null) {
                    error_log("FOOD_CONTROLLER::GET FOOD ENDPOINT::" . $relative_path);
                    FoodService::getFoodList();
                } else if (is_numeric($relative_path)) {
                    error_log("FOOD_CONTROLLER::GET FOOD BY ID ENDPOINT::" . $relative_path);
                    $UserID = RequestHelper::getUserIDFromToken();
                    $food = FoodService::getFoodByID($relative_path);

                    if ($UserID) {
                        TagRepository::increaseTagCount($UserID, $food["Tags"]);
                    }
                } else if ($relative_path == "recommendation") {
                    $token = RequestHelper::validate_jwt_token();
                    error_log("FOOD_CONTROLLER::GET FOOD RECOMENDATION ENDPOINT::" . $relative_path);
                    FoodService::getFoodRecomendation();
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
                    ResponseHelper::error_client("Invalid path in food endpoint");
                }
                break;
            case "delete":
                if (is_numeric($relative_path)) {
                    error_log("FOOD_CONTROLLER::DELETE FOOD ENDPOINT::" . $relative_path);
                    FoodService::deleteFood($relative_path);
                } else {
                    ResponseHelper::error_client("Invalid path in food endpoint");
                }
                break;
            default:
                return false;
        }
    }
}