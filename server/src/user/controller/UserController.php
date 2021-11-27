<?php

namespace src\user\controller;

use http\Client\Curl\User;
use src\common\base\BaseController;
use src\common\base\RequestHandler;
use src\common\utils\RequestHelper;
use src\common\utils\ResponseHelper;
use src\user\dto\UserRegisterRequest;
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
                if($relative_path == null){
                    UserService::getUserList();
                }
                else if($relative_path == "profile"){
                    UserService::getUserProfile();
                }
                else if ($relative_path == "accounts") {
                    UserService::getUserList();
                }
                else if (is_numeric($relative_path)) {
                    $second_path_param = RequestHelper::get_ith_path_item(2);
                    switch ($second_path_param) {
                        case "bank-accounts":
                            UserService::getUserBankAccounts();
                            break;
                        default:
                            ResponseHelper::error_client("Invalid URL");
                    }
                }
                break;
            case "post":
                switch ($relative_path){
                    case "register":
                        error_log("USER_CONTROLLER::REGISTER ENDPOINT::" . $relative_path);
                        UserService::registerUser();
                        break;
                    case "authorize":
                        error_log("USER_CONTROLLER::LIST ENDPOINT::" . $relative_path);
                        UserService::signInUser();
                        break;
                    case "logout":
                        error_log("USER_CONTROLLER::SIGN OUT ENDPOINT::" . $relative_path);
                        UserService::singOutUser();
                        break;
                    case "token-renew":
                        error_log("USER_CONTROLLER::RENEW TOKEN");
                        UserService::renewUserToken();
                        break;
                    default:
                        ResponseHelper::error_client("Invalid path in user endpoint");
                }
                break;
            case "put":
                switch($relative_path){
                    case null:
                        UserService::updateUserAccount();
                        break;
                    case "change-password":
                        UserService::setNewPassword();
                        break;
                    case "profile":
                        UserService::updateUserProfile();
                        break;
                    default:
                        ResponseHelper::error_client("Invalid parameter");
                }
                break;
            case "delete":
                switch ($relative_path){
                    case "bank-account":
                        UserService::updateUserAccount();
                        break;
                    case null:
                        UserService::removeUserAccount();
                        break;
                    default:
                        ResponseHelper::error_client("Invalid parameter");
                };
                break;
            default:
                return false;
        }
    }
}
