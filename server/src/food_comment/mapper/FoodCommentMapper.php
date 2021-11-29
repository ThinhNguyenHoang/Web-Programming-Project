<?php

namespace src\food_comment\mapper;

use JetBrains\PhpStorm\Pure;
use src\food_comment\entity\FoodComment;

require_once  __DIR__ . '/../../../vendor/autoload.php';

/**
 * Map between the entity passed in request to inmemory object
 * User Resquest  <--> User <--> Response
 */
class FoodCommentMapper
{

    // Map a food create request body to in memory user r
    #[Pure] public static function mapFoodCommentFromRequest($request): FoodComment
    {
        $food_comment = new FoodComment();
        $food_comment->FoodID = $request->FoodID;
        $food_comment->Content = $request->Content;
        $food_comment->ImageList = $request->ImageList;
        return $food_comment;
    }
}
