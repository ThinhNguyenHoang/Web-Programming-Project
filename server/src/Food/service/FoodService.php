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

    public static function getFoodRecomendation()
    {
        $top_tag = FoodRepository::getTopTagFood();
        if(!$top_tag){
            FoodRepository::initUserRefTagForFood();
            $top_tag = FoodRepository::getTopTagFood();
        }
        $list_food = array();
        foreach($top_tag as $tag) {
            // echo json_encode($tag);die();
            $food_found = FoodRepository::findFoodByID($tag["FoodID"]);
            if ($food_found) {
                array_push($list_food, $food_found);
            }
        }
        ResponseHelper::success(FoodMessage::getMessages()->readSuccess, $list_food);
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

            if (property_exists($food, 'Material')) {
                $materials = $request->Material;
                foreach ($materials as $material) {
                    $material_result = FoodRepository::insertMakeBy($food->FoodID, $material->MaterialID);
                    if ($material_result) {
                        array_push($food->Material, $material);
                    } else {
                        ResponseHelper::error_server(FoodMessage::getMessages()->createError);
                        die();
                    }
                }
            }

            $food->Tags = array();

            if (property_exists($food, "Tags")) {
                $tags = $request->Tags;
                foreach ($tags as $tag) {
                    $tag_result = FoodRepository::insertCategoryTag($food->FoodID, $tag->TagID);

                    if ($tag_result) {
                        array_push($food->Tags, $tag);
                    } else {
                        ResponseHelper::error_server(FoodMessage::getMessages()->createError);
                        die();
                    }
                }
            }

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
        $is_update_makeby = false;
        $is_update_category_tag = false;

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

        if (property_exists($request, "Sale")) {
            if ($request->Sale != "") {
                $food->Sale = $request->Sale;
                $is_update_food = true;
            } else {
                $food->Sale = $food_found["Sale"];
            }
        } else {
            $food->Sale = $food_found["Sale"];
        }

        $food->Material = array();
        if (property_exists($request, "Material")) {
            if (is_array($request->Material)) {
                if (!empty($request->Material)) {
                    foreach ($request->Material as $material) {
                        if (property_exists($material, "MaterialID")) {
                            array_push($food->Material, $material);
                        } else {
                            ResponseHelper::error_client("Must contain MaterialID in Material array element");
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

        // echo json_encode($food->Material);
        // die();

        $food->Tags = array();
        if (property_exists($request, "Tags")) {
            if (is_array($request->Tags)) {
                if (!empty($request->Tags)) {
                    foreach ($request->Tags as $tag) {
                        if (property_exists($tag, "TagID")) {
                            array_push($food->Tags, $tag);
                        } else {
                            ResponseHelper::error_client("Must contain TagID in Tag array element");
                            die();
                        }
                    }
                    $is_update_category_tag = true;
                } else {
                    $food->Tags = $food_found["Tags"];
                }
            } else {
                ResponseHelper::error_client("Tags feild must be an array");
                die();
            }
        } else {
            $food->Tags = $food_found["Tags"];
        }

        $food->FoodID = $FoodID;
        // update food
        $update_food_result = false;
        $update_makeby_result = false;

        if (!($is_update_food || $is_update_makeby || $is_update_category_tag)) {
            ResponseHelper::error_client("No Feild to update");
            die();
        }

        $update_food_result = $is_update_food ? FoodRepository::update($FoodID, $food) : true;

        $update_makeby_result = $is_update_makeby ? FoodRepository::updateMakeBy($FoodID, $request->Material) : true;

        $update_category_tag_result = $is_update_category_tag ? FoodRepository::updateCategoryTag($FoodID, $request->Tags) : true;

        if ($update_food_result && $update_makeby_result && $update_category_tag_result) {
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

            $delete_category_tag_result = FoodRepository::deleteCategoryTag($FoodID);

            if ($delete_makeby_result && $delete_category_tag_result) {
                ResponseHelper::success(FoodMessage::getMessages()->deleteSuccess, $FoodID);
                return;
            }
        }
        ResponseHelper::error_server(FoodMessage::getMessages()->deleteError);
    }
}
