<?php

namespace src\material\controller;

use src\common\base\BaseController;
use src\common\base\RequestHandler;
use src\common\utils\RequestHelper;
use src\common\utils\ResponseHelper;
use src\material\service\MaterialService;

require_once  __DIR__ . '/../../../vendor/autoload.php';

class MaterialController extends BaseController implements RequestHandler
{
    /**
     * "/food" Endpoint - Get list of foods
     */
    public function handleRequest()
    {
        $method = strtolower(RequestHelper::getRequestMethod());
        error_log("Material controller::METHOD::" . $method);
        $relative_path = RequestHelper::get_ith_path_item(1);
        switch ($method) {
            case "get":
                if ($relative_path == null) {
                    error_log("MATERIAL_CONTROLLER::GET MATERIAL ENDPOINT::" . $relative_path);
                    MaterialService::getMaterialList();
                } else if (is_numeric($relative_path)) {
                    error_log("MATERIAL_CONTROLLER::GET MATERIAL BY ID ENDPOINT::" . $relative_path);
                    MaterialService::getMaterialByID($relative_path);
                } else {
                    ResponseHelper::error_client("Invalid path in material endpoint");
                }
                break;
            case "post":
                if ($relative_path == null) {
                    error_log("MATERIAL_CONTROLLER::ADD MATERIAL ENDPOINT::" . $relative_path);
                    MaterialService::addMaterial();
                } else {
                    ResponseHelper::error_client("Invalid path in material endpoint");
                }
                break;
            case "put":
                if (is_numeric($relative_path)) {
                    error_log("MATERIAL_CONTROLLER::UPDATE MATERIAL ENDPOINT::" . $relative_path);
                    MaterialService::updateMaterial($relative_path);
                } else {
                    ResponseHelper::error_client("Invalid path in material endpoint");
                }
                break;
            case "delete":
                if (is_numeric($relative_path)) {
                    error_log("MATERIAL_CONTROLLER::DELETE MATERIAL ENDPOINT::" . $relative_path);
                    MaterialService::deleteMaterial($relative_path);
                } else {
                    ResponseHelper::error_client("Invalid path in material endpoint");
                }
                break;
            default:
                return false;
        }
    }
}
