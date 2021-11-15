<?php

namespace src\combo\service;

use JetBrains\PhpStorm\NoReturn;
use src\common\utils\QueryExecutor;
use src\common\utils\RequestHelper;
use src\common\utils\ResponseHelper;
use src\combo\mapper\ComboMapper;
use src\combo\message\ComboMessage;
use src\combo\repository\ComboRepository;

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

    public static function addCombo()
    {
        $request = RequestHelper::getRequestBody();

        error_log("Adding combo: get request body", 0);

        $combo = ComboMapper::mapComboFromRequest($request);

        error_log("Adding combo: Map Combo entity from request", 0);

        $combo_result = ComboRepository::create($combo);

        $combo->ComboID = QueryExecutor::getLastInsertID();

        $includes_result = ComboRepository::insertIncludes($request->FoodID, $combo->ComboID);

        error_log("Adding combo: Insert to database", 0);

        if($combo_result && $includes_result){
            error_log("Adding combo: " . json_encode($combo),0);
            ResponseHelper::success(ComboMessage::getMessages()->createSuccess, $combo);
            return;
        }

         ResponseHelper::error_server(ComboMessage::getMessages()->createError);

        return;
    }

    public static function updateCombo($ComboID) {
        $request = RequestHelper::getRequestBody();
        error_log("COMBO_SERVICE::UPDATE::" ,0);
        // Find food with the FoodID in database
        $combo = ComboMapper::mapComboFromRequest($request);
        $combo->ComboID = $ComboID;
        $combo_found = ComboRepository::findComboByID($combo->FoodID);
        if(!$combo_found){
            // Throw error notifying FoodID already taken
            ResponseHelper::error_client("ComboID doesn't exist");
            die();
        }
        // Create food
        $result = ComboRepository::update($combo_found->FoodID,$combo);
        if($result){
            ResponseHelper::success(ComboMessage::getMessages()->updateSuccess,$combo);
        }
        ResponseHelper::error_server(ComboMessage::getMessages()->updateError);
    }

}
