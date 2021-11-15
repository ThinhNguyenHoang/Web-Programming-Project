<?php

namespace src\food\service;

use src\common\utils\RequestHelper;
use src\common\utils\ResponseHelper;
use src\food\mapper\FoodMapper;
use src\food\message\FoodMessage;
use src\food\repository\FoodRepository;

require_once  __DIR__ . '/../../../vendor/autoload.php';

/**
 * Define operation that can be done related to the entity
 * Xu ly request : 3 khuc
 * 1. Parse request --> lay param
 * 2. Xu ly backend
 * 3. Tra ve response cho client
 */
class FoodService
{
    public static function getFoodList()
    {
        ResponseHelper::success(FoodMessage::getMessages()->readSuccess, FoodRepository::listFood());
    }

    public static function addFood()
    {
        $request = RequestHelper::getRequestBody();

        error_log("Adding food: get request body", 0);

        $food = FoodMapper::mapFoodFromRequest($request);

        error_log("Adding food: Map Food entity from request", 0);

        $result = FoodRepository::create($food);

        error_log("Adding food: Insert to database", 0);

        if($result){
            error_log("Adding food: " . json_encode($food),0);
            ResponseHelper::success(FoodMessage::getMessages()->createSuccess,$food);
            return;
        }

        ResponseHelper::error_server(FoodMessage::getMessages()->createError);

        return;
    }

    public static function updateFood(){
        $request = RequestHelper::getRequestBody();
        error_log("FOOD_SERVICE::UPDATE::" ,0);
        // Find food with the FoodID in database
        $food = FoodMapper::mapFoodFromRequest($request);
        $food_found = FoodRepository::findFoodByID($food->FoodID);
        if(!$food_found){
            // Throw error notifying FoodID already taken
            ResponseHelper::error_client("FoodID doesn't exist");
        }
        // Create food
        $result = FoodRepository::update($food_found->FoodID,$food);
        if($result){
            ResponseHelper::success(FoodMessage::getMessages()->updateSuccess,$food);
        }
        ResponseHelper::error_server(FoodMessage::getMessages()->updateError);
    }

}
