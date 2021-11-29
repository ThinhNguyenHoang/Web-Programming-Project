<?php

namespace src\food_comment\controller;

use src\common\base\BaseController;
use src\common\base\RequestHandler;
use src\common\utils\RequestHelper;
use src\common\utils\ResponseHelper;
use src\food_comment\service\FoodCommentService;
use src\tag\repository\TagRepository;

require_once  __DIR__ . '/../../../vendor/autoload.php';

class FoodCommentController extends BaseController implements RequestHandler
{
    /**
     * "/food/comment" Endpoint - Get list of food comment
     */
    public function handleRequest()
    {
        $method = strtolower(RequestHelper::getRequestMethod());
        error_log("Food comment controller::METHOD::" . $method);
        $relative_path = RequestHelper::get_ith_path_item(2);

        switch ($method) {
            case "post":
                if ($relative_path == null) {
                    error_log("FOOD_CONTROLLER::ADD FOOD ENDPOINT::" . $relative_path);
                    FoodCommentService::addFoodComment();
                } else {
                    ResponseHelper::error_client("Invalid path in food endpoint");
                }
                break;
            case "put":
                if (is_numeric($relative_path)) {
                    error_log("FOOD_CONTROLLER::UPDATE FOOD ENDPOINT::" . $relative_path);
                    FoodCommentService::updateFoodComment($relative_path);
                } else {
                    ResponseHelper::error_client("Invalid path in food endpoint");
                }
                break;
            case "delete":
                if (is_numeric($relative_path)) {
                    error_log("FOOD_CONTROLLER::DELETE FOOD ENDPOINT::" . $relative_path);
                    FoodCommentService::deleteFoodComment($relative_path);
                } else {
                    ResponseHelper::error_client("Invalid path in food endpoint");
                }
                break;
            default:
                return false;
        }
    }
}
