<?php

namespace src\tag\controller;

use src\common\base\BaseController;
use src\common\base\RequestHandler;
use src\common\utils\RequestHelper;
use src\common\utils\ResponseHelper;
use src\tag\service\TagService;

require_once  __DIR__ . '/../../../vendor/autoload.php';

class TagController extends BaseController implements RequestHandler
{
    /**
     * "/tag" Endpoint - Get list of tags
     */
    public function handleRequest()
    {
        $method = strtolower(RequestHelper::getRequestMethod());
        error_log("Tag controller::METHOD::" . $method);
        $relative_path = RequestHelper::get_ith_path_item(1);
        switch ($method) {
            case "get":
                $token = RequestHelper::validate_jwt_token();
                if (RequestHelper::isAdminPrivilege()){
                    if ($relative_path == null) {
                        error_log("TAG_CONTROLLER::GET TAG ENDPOINT::" . $relative_path);
                        TagService::getTagList();
                    } else if (is_numeric($relative_path)) {
                        error_log("TAG_CONTROLLER::GET TAG BY ID ENDPOINT::" . $relative_path);
                        TagService::getTagByID($relative_path);
                    } else {
                        ResponseHelper::error_client("Invalid path in tag endpoint");
                    }
                } else {
                    ResponseHelper::error_client("You don't have permission to access");
                }
                break;
            case "post":
                $token = RequestHelper::validate_jwt_token();
                if (RequestHelper::isAdminPrivilege()){
                    if ($relative_path == null) {
                        error_log("TAG_CONTROLLER::ADD TAG ENDPOINT::" . $relative_path);
                        TagService::addTag();
                    } else {
                        ResponseHelper::error_client("Invalid path in tag endpoint");
                    }
                } else {
                    ResponseHelper::error_client("You don't have permission to access");
                }
                break;
            case "put":
                $token = RequestHelper::validate_jwt_token();
                if (RequestHelper::isAdminPrivilege()){
                    if (is_numeric($relative_path)) {
                        error_log("TAG_CONTROLLER::UPDATE TAG ENDPOINT::" . $relative_path);
                        TagService::updateTag($relative_path);
                    } else {
                        ResponseHelper::error_client("Invalid path in tag endpoint");
                    }
                } else {
                    ResponseHelper::error_client("You don't have permission to access");
                }
                break;
            case "delete":
                $token = RequestHelper::validate_jwt_token();
                if (RequestHelper::isAdminPrivilege()){
                    if (is_numeric($relative_path)) {
                        error_log("TAG_CONTROLLER::DELETE TAG ENDPOINT::" . $relative_path);
                        TagService::deleteTag($relative_path);
                    } else {
                        ResponseHelper::error_client("Invalid path in tag endpoint");
                    }
                } else {
                    ResponseHelper::error_client("You don't have permission to access");
                }
                break;
            default:
                return false;
        }
    }
}
