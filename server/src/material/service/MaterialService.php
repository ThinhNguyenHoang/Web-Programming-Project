<?php

namespace src\material\service;

use src\common\utils\RequestHelper;
use src\common\utils\ResponseHelper;
use src\material\mapper\MaterialMapper;
use src\material\message\MaterialMessage;
use src\material\entity\Material;
use src\common\utils\QueryExecutor;
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

    public static function getMaterialByID($MaterialID)
    {
        $result = MaterialRepository::findMaterialByID($MaterialID);
        if (!$result) {
            ResponseHelper::error_client("Materaial doesn't exist");
            die();
        }

        ResponseHelper::success(MaterialMessage::getMessages()->readSuccess, $result);
    }
    public static function addMaterial()
    {
        $request = RequestHelper::getRequestBody();

        error_log("Adding material: get request body", 0);

        $material = MaterialMapper::mapMaterialFromAddMaterialRequest($request);

        error_log("Adding material: Map Material entity from request", 0);

        $result = MaterialRepository::create($material);

        $material->MaterialID = QueryExecutor::getLastInsertID();

        error_log("Adding material: Insert to database", 0);

        if ($result) {
            error_log("Adding material: " . json_encode($material), 0);
            ResponseHelper::success(MaterialMessage::getMessages()->createSuccess, $material);
            return;
        }

        ResponseHelper::error_server(MaterialMessage::getMessages()->createError);

        return;
    }

    public static function updateMaterial($MaterialID)
    {
        $request = RequestHelper::getRequestBody();

        error_log("MATERIAL_SERVICE::UPDATE::", 0);

        $material = new Material();
        $is_update_material = false;

        if (property_exists($request, "MaterialName")) {
            if ($request->MaterialName != "") {
                $material->MaterialName = $request->MaterialName;
                $is_update_material = true;
            }
        }

        if (property_exists($request, "Picture")) {
            if ($request->Picture != "") {
                $material->Picture = $request->Picture;
                $is_update_material = true;
            }
        }

        // Find material with the MaterialID in database
        $material_found = MaterialRepository::findMaterialByID($MaterialID);
        if (!$material_found) {
            // Throw error notifying MaterialID already taken
            ResponseHelper::error_client("MaterialID doesn't exist");
            die();
        }
        $material->MaterialID = $MaterialID;

        if ($is_update_material) {
            $result = MaterialRepository::update($MaterialID, $material);
        } else {
            ResponseHelper::error_client("No Feild to update");
            die();
        }

        if ($result) {
            ResponseHelper::success(MaterialMessage::getMessages()->updateSuccess, $material);
        }

        ResponseHelper::error_server(MaterialMessage::getMessages()->updateError);
    }

    public static function deleteMaterial($MaterialID)
    {
        error_log("MATERIAL_SERVICE::DELETE::", 0);

        // Find material with the MaterialID in database
        $material_found = MaterialRepository::findMaterialByID($MaterialID);
        if (!$material_found) {
            // Throw error notifying MaterialID already taken
            ResponseHelper::error_client("MaterialID doesn't exist");
            die();
        }

        // delete material
        $result = MaterialRepository::delete($MaterialID);
        if ($result) {
            ResponseHelper::success(MaterialMessage::getMessages()->deleteSuccess, $material_found);
        }
        ResponseHelper::error_server(MaterialMessage::getMessages()->deleteError);
    }
}
