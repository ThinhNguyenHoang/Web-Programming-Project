<?php

namespace src\cart\controller;

use src\common\base\BaseController;
use src\common\base\RequestHandler;
use src\common\utils\RequestHelper;
use src\common\utils\ResponseHelper;
use src\cart\service\CartService;

require_once  __DIR__ . '/../../../vendor/autoload.php';

class CartController extends BaseController implements RequestHandler
{
    /**
     * "/food" Endpoint - Get list of foods
     */
    public function handleRequest()
    {
        $method = strtolower(RequestHelper::getRequestMethod());
        error_log("Cart controller::METHOD::" . $method);
        $relative_path = RequestHelper::get_ith_path_item(1);
        switch ($method) {
            case "get":
                $token = RequestHelper::validate_jwt_token();
                if ($relative_path == null) {
                    error_log("CART_CONTROLLER::GET CART ENDPOINT::" . $relative_path);
                    CartService::getCartList();
                } else {
                    ResponseHelper::error_client("Invalid path in cart endpoint");
                }
                break;
            case "put":
                $token = RequestHelper::validate_jwt_token();
                if ($relative_path == null) {
                    error_log("CART_CONTROLLER::UPDATE CART ENDPOINT::" . $relative_path);
                    CartService::updateCart();
                } else {
                    ResponseHelper::error_client("Invalid path in cart endpoint");
                }
                break;
            default:
                return false;
        }
    }
}
