<?php

namespace src\food\service;

use JetBrains\PhpStorm\NoReturn;
use src\common\config\ConnectionSingleton;
use src\common\utils\RequestHelper;
use src\common\utils\ResponseHelper;
use src\food\mapper\FoodMapper;
use src\food\mapper\ComboMapper;
use src\food\mapper\MaterialMapper;
use src\food\message\FoodMessage;
use src\food\message\ComboMessage;
use src\food\message\MaterialMessage;
use src\food\repository\FoodRepository;
use src\food\repository\ComboRepository;
use src\food\repository\MaterialRepository;

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

        $food = FoodMapper::mapFoodFromAddFoodRequest($request);

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
    public static function addMaterial()
    {
        $request = RequestHelper::getRequestBody();

        error_log("Adding material: get request body", 0);

        $material = MaterialMapper::mapMaterialFromAddMaterialRequest($request);

        error_log("Adding material: Map Material entity from request", 0);

        $makeby_result = MaterialRepository::insertMakeBy($request->FoodID, $material->MaterialID);

        $material_result = MaterialRepository::create($material);


        error_log("Adding material: Insert to database", 0);

        if($makeby_result && $material_result){
            error_log("Adding material: " . json_encode($material),0);
            ResponseHelper::success(MaterialMessage::getMessages()->createSuccess, $material);
            return;
        }

         ResponseHelper::error_server(MaterialMessage::getMessages()->createError);

        return;
    }

}
