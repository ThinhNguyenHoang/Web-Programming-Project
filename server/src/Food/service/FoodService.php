<?php

namespace src\food\service;

use src\common\utils\QueryExecutor;
use src\common\utils\RequestHelper;
use src\common\utils\ResponseHelper;
use src\food\entity\Food;
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
        return $food_found;
    }

    public static function addFood()
    {
        $request = RequestHelper::getRequestBody();

        error_log("Adding food: get request body", 0);

        $food = FoodMapper::mapFoodFromRequest($request);

        error_log("Adding food: Map Food entity from request", 0);

        $food_result = FoodRepository::create($food);

        error_log("Adding food: Insert to database", 0);

        if ($food_result) {
            error_log("Adding food: " . json_encode($food), 0);
            $food->FoodID = QueryExecutor::getLastInsertID();

            $food->Material = array();
            $material_makeby = $request->Material;
            foreach ($material_makeby as $material) {
                $makeby_result = FoodRepository::insertMakeBy($food->FoodID, $material->MaterialID);
                array_push($food->Material, $material);
            }

            if ($makeby_result) {
                ResponseHelper::success(FoodMessage::getMessages()->createSuccess, $food);
                return;
            }
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
        $is_update_makeby = false;

        // Find food with the FoodID in database
        $food_found = FoodRepository::findFoodByID($FoodID);
        if (!$food_found) {
            // Throw error notifying FoodID already taken
            ResponseHelper::error_client("FoodID doesn't exist");
            die();
        }

        if (property_exists($request, "FoodName")) {
            if ($request->FoodName != "") {
                $food->FoodName = $request->FoodName;
                $is_update_food = true;
            } else {
                $food->FoodName = $food_found["FoodName"];
            }
        } else {
            $food->FoodName = $food_found["FoodName"];
        }

        if (property_exists($request, "Picture")) {
            if ($request->Picture != "") {
                $food->Picture = $request->Picture;
                $is_update_food = true;
            } else {
                $food->Picture = $food_found["Picture"];
            }
        } else {
            $food->Picture = $food_found["Picture"];
        }

        if (property_exists($request, "Price")) {
            if ($request->Price != "") {
                $food->Price = $request->Price;
                $is_update_food = true;
            } else {
                $food->Price = $food_found["Price"];
            }
        } else {
            $food->Price = $food_found["Price"];
        }

        if (property_exists($request, "Description")) {
            if ($request->Description != "") {
                $food->Description = $request->Description;
                $is_update_food = true;
            } else {
                $food->Description = $food_found["Description"];
            }
        } else {
            $food->Description = $food_found["Description"];
        }

        if (property_exists($request, "Instruct")) {
            if ($request->Instruct != "") {
                $food->Instruct = $request->Instruct;
                $is_update_food = true;
            } else {
                $food->Instruct = $food_found["Instruct"];
            }
        } else {
            $food->Instruct = $food_found["Instruct"];
        }

        //TODO:validate thằng Material trong body
        if (property_exists($request, "Material")) {
            if (is_array($request->Material)) {
                if (!empty($request->Material)) {
                    foreach ($request->Material as $material) {
                        if (!property_exists($material, "MaterialID")) {
                            ResponseHelper::error_client("Cannot find MaterialID in Material array");
                            die();
                        }
                    }
                    $is_update_makeby = true;
                } else {
                    $food->Material = $food_found["Material"];
                }
            } else {
                ResponseHelper::error_client("Material feild must be an array");
                die();
            }
        } else {
            $food->Material = $food_found["Material"];
        }

        $food->FoodID = $FoodID;
        // update food
        $update_food_result = false;
        $update_makeby_result = false;

        if (!($is_update_food || $is_update_makeby)) {
            ResponseHelper::error_client("No Feild to update");
            die();
        }

        if ($is_update_food) {
            $update_food_result = FoodRepository::update($FoodID, $food);
        }

        if ($is_update_makeby) {
            $update_makeby_result = FoodRepository::updateMakeBy($FoodID, $request->Material);
        }

        if ($update_food_result || $update_makeby_result) {
            ResponseHelper::success(FoodMessage::getMessages()->updateSuccess, $food);
            return;
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
        $delete_food_result = FoodRepository::delete($FoodID);
        if ($delete_food_result) {
            $delete_makeby_result = FoodRepository::deleteMakeBy($FoodID);

            if ($delete_makeby_result) {
                ResponseHelper::success(FoodMessage::getMessages()->deleteSuccess, $FoodID);
                return;
            }
        }
        ResponseHelper::error_server(FoodMessage::getMessages()->deleteError);
    }
}
