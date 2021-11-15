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

        $combo = ComboMapper::mapComboFromAddComboRequest($request);

        error_log("Adding combo: Map Combo entity from request", 0);

        $includes_result = ComboRepository::insertIncludes($request->FoodID, $combo->ComboID);

        $combo_result = ComboRepository::create($combo);


        error_log("Adding combo: Insert to database", 0);

        if($combo_result && $includes_result){
            error_log("Adding combo: " . json_encode($combo),0);
            ResponseHelper::success(ComboMessage::getMessages()->createSuccess, $combo);
            return;
        }

         ResponseHelper::error_server(ComboMessage::getMessages()->createError);

        return;
    }

}
