<?php

namespace src\food\service;

use src\common\utils\RequestHelper;
use src\common\utils\ResponseHelper;
use src\food\mapper\FoodMapper;
use src\food\message\FoodMessage;
use src\food\repository\FoodRepository;
use src\food\entity\Food;

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

    public static function getFoodByID($FoodID)
    {
        // Find food with the FoodID in database
        $food_found = FoodRepository::findFoodByID($FoodID);
        if (!$food_found) {
            // Throw error notifying FoodID already taken
            ResponseHelper::error_client("FoodID doesn't exist");
            die();
        }
        ResponseHelper::success(FoodMessage::getMessages()->readSuccess, $food_found);
    }

    public static function addFood()
    {
        $request = RequestHelper::getRequestBody();

        error_log("Adding food: get request body", 0);

        $food = FoodMapper::mapFoodFromRequest($request);

        error_log("Adding food: Map Food entity from request", 0);

        $result = FoodRepository::create($food);

        error_log("Adding food: Insert to database", 0);

        if ($result) {
            error_log("Adding food: " . json_encode($food), 0);
            ResponseHelper::success(FoodMessage::getMessages()->createSuccess, $food);
            return;
        }

        ResponseHelper::error_server(FoodMessage::getMessages()->createError);

        return;
    }

    public static function updateFood($FoodID)
    {
        $request = RequestHelper::getRequestBody();

        error_log("FOOD_SERVICE::UPDATE::", 0);

        $food = new Food();
        $is_update_food = false;

        if (property_exists($request, "FoodName")) {
            if ($request->FoodName != "") {
                $food->FoodName = $request->FoodName;
                $is_update_food = true;
            }
        }

        if (property_exists($request, "Picture")) {
            if ($request->Picture != "") {
                $food->Picture = $request->Picture;
                $is_update_food = true;
            }
        }

        if (property_exists($request, "Price")) {
            if ($request->Price != "") {
                $food->Price = $request->Price;
                $is_update_food = true;
            }
        }

        if (property_exists($request, "Description")) {
            if ($request->Description != "") {
                $food->Description = $request->Description;
                $is_update_food = true;
            }
        }

        if (property_exists($request, "Instruct")) {
            if ($request->Instruct != "") {
                $food->Instruct = $request->Instruct;
                $is_update_food = true;
            }
        }

        // Find food with the FoodID in database
        $food_found = FoodRepository::findFoodByID($FoodID);
        if (!$food_found) {
            // Throw error notifying FoodID already taken
            ResponseHelper::error_client("FoodID doesn't exist");
            die();
        }
        $food->FoodID = $FoodID;
        // update food
        if ($is_update_food) {
            $result = FoodRepository::update($FoodID, $food);
            if ($result) {
                ResponseHelper::success(FoodMessage::getMessages()->updateSuccess, $food);
            }
        } else {
            ResponseHelper::error_client("No Feild to update");
        }
        ResponseHelper::error_server(FoodMessage::getMessages()->updateError);
    }

    public static function deleteFood($FoodID)
    {
        error_log("FOOD_SERVICE::DELETE::", 0);

        // Find food with the FoodID in database
        $food_found = FoodRepository::findFoodByID($FoodID);
        if (!$food_found) {
            // Throw error notifying FoodID already taken
            ResponseHelper::error_client("FoodID doesn't exist");
            die();
        }

        // delete food
        $result = FoodRepository::delete($FoodID);
        if ($result) {
            ResponseHelper::success(FoodMessage::getMessages()->deleteSuccess, $FoodID);
        }
        ResponseHelper::error_server(FoodMessage::getMessages()->deleteError);
    }
}
