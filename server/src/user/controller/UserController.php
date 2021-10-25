<?php

namespace src\user\controller;

use src\common\base\BaseController;
use src\common\base\RequestHandler;
use src\common\utils\RequestHelper;
use src\common\utils\ResponseHelper;
use src\user\service\UserService;

require_once  __DIR__ . '/../../../vendor/autoload.php';

class UserController extends BaseController implements RequestHandler
{
    /**
     * "/food/list" Endpoint - Get list of foods
     */
    public function handleRequest()
    {
        $method = strtolower(RequestHelper::getRequestMethod());
        error_log("User controller::METHOD::" . $method);
        $relative_path = RequestHelper::get_ith_path_item(1);
        switch($method){
            case "get":
                switch ($relative_path){
                    case "accounts":
                        error_log("USER_CONTROLLER::LIST ENDPOINT::" . $relative_path);
                        UserService::getUserList();
                        break;
                    default:
                        ResponseHelper::error_client("Invalid path in user endpoint");
                }
                break;
            case "post":
                $this->create();
                break;
            case "put":
                $this->update();
                break;
            case "delete":
                $this->delete();
                break;
            default:
                return false;
        }
    }
}
