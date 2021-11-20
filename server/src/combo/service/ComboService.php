<?php

namespace src\combo\service;

use src\combo\entity\Combo;
use src\combo\mapper\ComboMapper;
use src\combo\message\ComboMessage;
use src\combo\repository\ComboRepository;
use src\common\utils\QueryExecutor;
use src\common\utils\RequestHelper;
use src\common\utils\ResponseHelper;

require_once  __DIR__ . '/../../../vendor/autoload.php';

/**
 * Define operation that can be done related to the entity
 * Xu ly request : 3 khuc
 * 1. Parse request --> lay param
 * 2. Xu ly backend
 * 3. Tra ve response cho client
 */
class ComboService
{
    public static function getComboList()
    {
        ResponseHelper::success(ComboMessage::getMessages()->readSuccess, ComboRepository::listCombo());
    }

    public static function getComboByID($ComboID)
    {
        $result = ComboRepository::findComboByID($ComboID);
        if (!$result) {
            ResponseHelper::error_client("ComboID doesn't exist");
            die();
        }

        ResponseHelper::success(ComboMessage::getMessages()->readSuccess, $result);
        return $result;
    }

    public static function addCombo()
    {
        $request = RequestHelper::getRequestBody();

        error_log("Adding combo: get request body", 0);

        $combo = ComboMapper::mapComboFromRequest($request);

        error_log("Adding combo: Map Combo entity from request", 0);
        $combo_result = ComboRepository::create($combo);

        error_log("Adding combo: Insert to database", 0);

        if ($combo_result) {
            error_log("Adding combo: " . json_encode($combo), 0);

            $combo->ComboID = QueryExecutor::getLastInsertID();

            $combo->Food = array();

            if (property_exists($combo, "Food")) {
                $foods = $request->Food;
                foreach ($foods as $food) {
                    $food_result = ComboRepository::insertIncludes($food->FoodID, $combo->ComboID);
                    if ($food_result) {
                        array_push($combo->Food, $food);
                    } else {
                        ResponseHelper::error_server(ComboMessage::getMessages()->createError);
                        die();
                    }
                }
            }

            $combo->Tags = array();

            if (property_exists($combo, "Tags")) {
                $tags = $request->Tags;
                foreach ($tags as $tag) {
                    $tag_result = ComboRepository::insertCategoryTag($combo->ComboID, $tag->TagID);
                    if ($tag_result) {
                        array_push($combo->Tags, $tag);
                    } else {
                        ResponseHelper::error_server(ComboMessage::getMessages()->createError);
                        die();
                    }
                }
            }

            ResponseHelper::success(ComboMessage::getMessages()->createSuccess, $combo);
            return;
        }

        ResponseHelper::error_server(ComboMessage::getMessages()->createError);
        return;
    }

    public static function updateCombo($ComboID)
    {
        $request = RequestHelper::getRequestBody();

        error_log("COMBO_SERVICE::UPDATE::", 0);

        $combo = new Combo();
        $is_update_combo = false;
        $is_update_include = false;

        // Find combo with the ComboID in database
        $combo_found = ComboRepository::findComboByID($ComboID);
        if (!$combo_found) {
            // Throw error notifying ComboID already taken
            ResponseHelper::error_client("ComboID doesn't exist");
            die();
        }

        if (property_exists($request, "ComboName")) {
            if ($request->ComboName != "") {
                $combo->ComboName = $request->ComboName;
                $is_update_combo = true;
            } else {
                $combo->ComboName = $combo_found["ComboName"];
            }
        } else {
            $combo->ComboName = $combo_found["ComboName"];
        }

        if (property_exists($request, "ComboDescrip")) {
            if ($request->ComboDescrip != "") {
                $combo->ComboDescrip = $request->ComboDescrip;
                $is_update_combo = true;
            } else {
                $combo->ComboDescrip = $combo_found["ComboDescrip"];
            }
        } else {
            $combo->ComboDescrip = $combo_found["ComboDescrip"];
        }

        if (property_exists($request, "Price")) {
            if ($request->Price != "") {
                $combo->Price = $request->Price;
                $is_update_combo = true;
            } else {
                $combo->Price = $combo_found["Price"];
            }
        } else {
            $combo->Price = $combo_found["Price"];
        }

        $combo->Food = array();
        if (property_exists($request, "Food")) {
            if (is_array($request->Food)) {
                if (!empty($request->Food)) {
                    foreach ($request->Food as $food) {
                        if (property_exists($food, "FoodID")) {
                            array_push($combo->Food, $food);
                        } else {
                            ResponseHelper::error_client("Must contain FoodID in Food array element");
                            die();
                        }
                    }
                    $is_update_include = true;
                } else {
                    $combo->Food = $combo_found["Food"];
                }
            } else {
                ResponseHelper::error_client("Food feild must be an array");
                die();
            }
        } else {
            $combo->Food = $combo_found["Food"];
        }

        $combo->Tags = array();
        if (property_exists($request, "Tags")) {
            if (is_array($request->Tags)) {
                if (!empty($request->Tags)) {
                    foreach ($request->Tags as $tag) {
                        if (property_exists($tag, "TagID")) {
                            array_push($combo->Tags, $tag);
                        } else {
                            ResponseHelper::error_client("Must contain TagID in Tag array element");
                            die();
                        }
                    }
                    $is_update_category_tag = true;
                } else {
                    $combo->Tags = $combo_found["Tags"];
                }
            } else {
                ResponseHelper::error_client("Tags feild must be an array");
                die();
            }
        } else {
            $combo->Tags = $combo_found["Tags"];
        }

        $combo->ComboID = $ComboID;
        // update combo
        $update_combo_result = false;
        $update_include_result = false;

        if (!($is_update_combo || $is_update_include || $is_update_category_tag)) {
            ResponseHelper::error_client("No Feild to update");
            die();
        }

        $update_combo_result = $is_update_combo ? ComboRepository::update($ComboID, $combo) : true;

        $update_include_result = $is_update_include ? ComboRepository::updateInclude($ComboID, $request->Food) : true;

        $update_category_tag_result = $is_update_category_tag ? ComboRepository::updateCategoryTag($ComboID, $request->Tags) : true;

        if ($update_combo_result && $update_include_result && $update_category_tag_result) {
            ResponseHelper::success(ComboMessage::getMessages()->updateSuccess, $combo);
            return;
        }
        ResponseHelper::error_server(ComboMessage::getMessages()->updateError);
    }

    public static function deleteCombo($ComboID)
    {
        error_log("COMBO_SERVICE::DELETE::", 0);

        // Find combo with the ComboID in database
        $combo_found = ComboRepository::findComboByID($ComboID);
        if (!$combo_found) {
            // Throw error notifying ComboID already taken
            ResponseHelper::error_client("ComboID doesn't exist");
            die();
        }

        // delete combo
        $delete_combo_result = ComboRepository::delete($ComboID);
        if ($delete_combo_result) {
            $delete_include_result = ComboRepository::deleteInclude($ComboID);

            $delete_category_tag_result = ComboRepository::deleteCategoryTag($ComboID);

            if ($delete_include_result && $delete_category_tag_result) {
                ResponseHelper::success(ComboMessage::getMessages()->deleteSuccess, $combo_found);
                return;
            }
        }
        ResponseHelper::error_server(ComboMessage::getMessages()->deleteError);
    }
}
