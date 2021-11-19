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
            $food_includes = $request->Food;
            foreach ($food_includes as $food) {
                $includes_result = ComboRepository::insertIncludes($food->FoodID, $combo->ComboID);
                array_push($combo->Food, $combo);
            }
            if ($includes_result) {
                ResponseHelper::success(ComboMessage::getMessages()->createSuccess, $combo);
                return;
            }
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

        if (property_exists($request, "ComboName")) {
            if ($request->ComboName != "") {
                $combo->ComboName = $request->ComboName;
                $is_update_combo = true;
            }
        }

        if (property_exists($request, "ComboDescrip")) {
            if ($request->ComboDescrip != "") {
                $combo->ComboDescrip = $request->ComboDescrip;
                $is_update_combo = true;
            }
        }

        if (property_exists($request, "Price")) {
            if ($request->Price != "") {
                $combo->Price = $request->Price;
                $is_update_combo = true;
            }
        }

        // if (property_exists($request, "Food")) {
        //     if (is_array($request->Food)) {
        //         if (!empty($request->Food)) {
        //             $is_update_include = true;
        //         }
        //     } esle {
        //         ResponseHelper::error_client("Food feild incorrect");
        //         die();
        //     }
        // }

        if (property_exists($request, "Food")) {
            if (is_array($request->Food)) {
                if (!empty($request->Food)) {
                    $is_update_include = true;
                }
            } else {
                ResponseHelper::error_client("Food feild must be an array");
                die();
            }
        }

        // Find combo with the ComboID in database
        $combo_found = ComboRepository::findComboByID($ComboID);
        if (!$combo_found) {
            // Throw error notifying ComboID already taken
            ResponseHelper::error_client("ComboID doesn't exist");
            die();
        }
        $combo->ComboID = $ComboID;
        // update combo
        $update_combo_result = false;
        $update_include_result = false;

        if (!($is_update_combo || $is_update_include)) {
            ResponseHelper::error_client("No Feild to update");
            die();
        }

        if ($is_update_combo) {
            $update_combo_result = ComboRepository::update($ComboID, $combo);
        }

        if ($is_update_include) {
            $update_include_result = ComboRepository::updateInclude($ComboID, $request->Food);
            $combo->Food = array();
            foreach ($request->Food as $food) {
                array_push($combo->Food, $food);
            }
        }

        if ($update_combo_result || $update_include_result) {
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
            if ($delete_include_result) {
                ResponseHelper::success(ComboMessage::getMessages()->deleteSuccess, $combo_found);
                return;
            }
        }
        ResponseHelper::error_server(ComboMessage::getMessages()->deleteError);
    }
}
