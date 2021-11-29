<?php

namespace src\food_comment\service;

use src\common\utils\QueryExecutor;
use src\common\utils\RequestHelper;
use src\common\utils\ResponseHelper;
use stdClass;
use src\food_comment\mapper\FoodCommentMapper;
use src\food_comment\message\FoodCommentMessage;
use src\food_comment\repository\FoodCommentRepository;

require_once  __DIR__ . '/../../../vendor/autoload.php';

/**
 * Define operation that can be done related to the entity
 * Xu ly request : 3 khuc
 * 1. Parse request --> lay param
 * 2. Xu ly backend
 * 3. Tra ve response cho client
 */
class FoodCommentService
{
    public static function addFoodComment()
    {
        $request = RequestHelper::getRequestBody();

        error_log("Adding food_comment: get request body", 0);

        $food_comment = FoodCommentMapper::mapFoodCommentFromRequest($request);

        error_log("Adding food_comment: Map Food entity from request", 0);

        $food_comment_result = FoodCommentRepository::create($food_comment);

        error_log("Adding food_comment: Insert to database", 0);

        if ($food_comment_result) {
            error_log("Adding food_comment: " . json_encode($food_comment), 0);

            ResponseHelper::success(FoodCommentMessage::getMessages()->createSuccess, $food_comment);
            return;
        }

        ResponseHelper::error_server(FoodCommentMessage::getMessages()->createError);
    }

    public static function updateFoodComment($FoodCommentID)
    {
        $request = RequestHelper::getRequestBody();

        error_log("FOOD_SERVICE::UPDATE::", 0);

        //Map request body
        $food_comment = new stdClass();
        $food_comment->Content = $request->Content;
        $food_comment->ImageList = $request->ImageList;
        $food_comment->Reply = $request->Reply;

        $food_comment_found = FoodCommentRepository::findFoodCommentByID($FoodCommentID);
        if (!$food_comment_found) {
            // Throw error notifying FoodID already taken
            ResponseHelper::error_client("FoodID doesn't exist");
            die();
        }

        $result = FoodCommentRepository::update($FoodCommentID, $food_comment);

        if ($result) {
            ResponseHelper::success(FoodCommentMessage::getMessages()->updateSuccess, $food_comment);
            return;
        }

        ResponseHelper::error_server(FoodCommentMessage::getMessages()->updateError);
    }

    public static function deleteFoodComment($FoodCommentID)
    {
        error_log("FOOD_SERVICE::DELETE::", 0);

        // Find food_comment with the FoodID in database
        $food_comment_found = FoodCommentRepository::findFoodCommentByID($FoodCommentID);
        if (!$food_comment_found) {
            // Throw error notifying FoodCommentID already taken
            ResponseHelper::error_client("FoodCommentID doesn't exist");
            die();
        }

        // delete food_comment
        $result = FoodCommentRepository::delete($FoodCommentID);
        if ($result) {
            ResponseHelper::success(FoodCommentMessage::getMessages()->deleteSuccess, $food_comment_found);
            return;
        }
        ResponseHelper::error_server(FoodCommentMessage::getMessages()->deleteError);
    }
}
