<?php

namespace src\wish_list\controller;

use src\common\base\BaseController;
use src\common\base\RequestHandler;
use src\common\utils\RequestHelper;
use src\common\utils\ResponseHelper;
use src\wish_list\service\WishListService;

require_once  __DIR__ . '/../../../vendor/autoload.php';

class WishListController extends BaseController implements RequestHandler
{
    /**
     * "/wish_list" Endpoint - Get list of wish_lists
     */
    public function handleRequest()
    {
        $method = strtolower(RequestHelper::getRequestMethod());
        error_log("WishList controller::METHOD::" . $method);
        $relative_path = RequestHelper::get_ith_path_item(1);
        switch ($method) {
            case "get":
                $token = RequestHelper::validate_jwt_token();

                if ($relative_path == null) {
                    error_log("WISH_LIST_CONTROLLER::GET WISH_LIST ENDPOINT::" . $relative_path);
                    WishListService::getWishListList();
                } else {
                    ResponseHelper::error_client("Invalid path in wish_list endpoint");
                }
                break;
            case "post":
                $token = RequestHelper::validate_jwt_token();

                if ($relative_path == null) {
                    error_log("WISH_LIST_CONTROLLER::ADD WISH_LIST ENDPOINT::" . $relative_path);
                    WishListService::addWishList();
                } else {
                    ResponseHelper::error_client("Invalid path in wish_list endpoint");
                }
                break;
            case "delete":
                $token = RequestHelper::validate_jwt_token();

                if (is_numeric($relative_path)) {
                    error_log("WISH_LIST_CONTROLLER::DELETE WISH_LIST ENDPOINT::" . $relative_path);
                    WishListService::deleteWishList($relative_path);
                } else {
                    ResponseHelper::error_client("Invalid path in wish_list endpoint");
                }
                break;
    //            case "options":
    //                ResponseHelper::success("Success");
    //                break;
            default:
                return false;
        }
    }
}
