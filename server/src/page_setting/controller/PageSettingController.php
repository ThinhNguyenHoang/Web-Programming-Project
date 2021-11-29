<?php

namespace src\page_setting\controller;

use src\common\base\BaseController;
use src\common\base\RequestHandler;
use src\common\utils\RequestHelper;
use src\common\utils\ResponseHelper;
use src\page_setting\service\PageSettingService;

require_once  __DIR__ . '/../../../vendor/autoload.php';

class PageSettingController extends BaseController implements RequestHandler
{
    /**
     * "/food" Endpoint - Get list of foods
     */
    public function handleRequest()
    {
        $method = strtolower(RequestHelper::getRequestMethod());
        error_log("PageSetting controller::METHOD::" . $method);
        $relative_path = RequestHelper::get_ith_path_item(1);
        switch ($method) {
            case "get":
                if ($relative_path == null) {
                    error_log("PAGE_SETTING_CONTROLLER::GET PAGE_SETTING ENDPOINT::" . $relative_path);
                    PageSettingService::getPageSetting();
                } else {
                    ResponseHelper::error_client("Invalid path in page_setting endpoint");
                }
                break;
            case "put":
                $token = RequestHelper::validate_jwt_token();
                if ($relative_path == null) {
                    if (!RequestHelper::isAdminPrivilege()) {
                        ResponseHelper::error_client("Khong co quyen truy cap");
                        die();
                    }
                    error_log("PAGE_SETTING_CONTROLLER::UPDATE PAGE_SETTING ENDPOINT::" . $relative_path);
                    PageSettingService::updatePageSetting();
                } else {
                    ResponseHelper::error_client("Invalid path in page_setting endpoint");
                }
                break;
            default:
                return false;
        }
    }
}
