<?php

namespace src\material\service;

use src\common\utils\RequestHelper;
use src\common\utils\ResponseHelper;
use src\food\mapper\ComboMapper;
use src\food\mapper\MaterialMapper;
use src\food\message\ComboMessage;
use src\material\message\MaterialMessage;
use src\material\repository\MaterialRepository;

require_once  __DIR__ . '/../../../vendor/autoload.php';

/**
 * Define operation that can be done related to the entity
 * Xu ly request : 3 khuc
 * 1. Parse request --> lay param
 * 2. Xu ly backend
 * 3. Tra ve response cho client
 */
class MaterialService
{
    public static function getMaterialList()
    {
        ResponseHelper::success(MaterialMessage::getMessages()->readSuccess, MaterialRepository::listMaterial());
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

        if ($makeby_result && $material_result) {
            error_log("Adding material: " . json_encode($material), 0);
            ResponseHelper::success(MaterialMessage::getMessages()->createSuccess, $material);
            return;
        }

        ResponseHelper::error_server(MaterialMessage::getMessages()->createError);

        return;
    }

    public static function updateMaterial()
    {
    }
}
