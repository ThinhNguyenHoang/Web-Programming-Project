<?php

namespace src\cart\service;

use src\common\utils\RequestHelper;
use src\common\utils\ResponseHelper;
use src\cart\mapper\CartMapper;
use src\cart\message\CartMessage;
use src\cart\entity\Cart;
use src\common\utils\QueryExecutor;
use src\cart\repository\CartRepository;
use src\food\repository\FoodRepository;
use src\combo\repository\ComboRepository;
use stdClass;

require_once  __DIR__ . '/../../../vendor/autoload.php';

/**
 * Define operation that can be done related to the entity
 * Xu ly request : 3 khuc
 * 1. Parse request --> lay param
 * 2. Xu ly backend
 * 3. Tra ve response cho client
 */
class CartService
{
    public static function getCartList()
    {
        $cart_result = CartRepository::getCart();
        if (RequestHelper::isAdminPrivilege()) {
            self::getCartListFromAdmin($cart_result);
        } else {
            self::getCartListFromUser($cart_result);
        }
    }

    public static function getCartListFromAdmin($cart_result)
    {
        die("chua lam cart cho admin");
    }

    public static function getCartListFromUser($cart_result)
    {
        $cart_list = array();
        if (!empty($cart_result)) {
            $cart_list["UserID"] = RequestHelper::getUserIDFromToken();
            $cart_list["FoodList"] = array();
            $cart_list["ComboList"] = array();
            foreach ($cart_result as $cart_item) {
                if ($cart_item["FoodID"] != 0) {
                    $FoodID = $cart_item["FoodID"];
                    $food_found = FoodRepository::findFoodByID($FoodID);

                    if (!$food_found) {
                        ResponseHelper::error_client("Get cart list: FoodID not found");
                        die();
                    }

                    unset($food_found["Description"], $food_found["Material"], $food_found["Tags"], $food_found["Instruct"]);
                    $food_found["Quantity"]  = $cart_item["Quantity"];
                    array_push($cart_list["FoodList"], $food_found);
                }

                if ($cart_item["ComboID"] != 0) {
                    $ComboID = $cart_item["ComboID"];
                    $combo_found = ComboRepository::findComboByID($ComboID);

                    if (!$combo_found) {
                        ResponseHelper::error_client("Get cart list: ComboID not found");
                        die();
                    }

                    $combo_found["FoodList"]  = array();
                    foreach ($combo_found["Food"] as $food) {
                        unset($food["Description"], $food["Instruct"]);
                        array_push($combo_found["FoodList"], $food);
                    }
                    unset($combo_found["ComboDescrip"], $combo_found["Tags"], $combo_found["Food"]);
                    $combo_found["Quantity"]  = $cart_item["Quantity"];
                    array_push($cart_list["ComboList"], $combo_found);
                }
            }
        }

        ResponseHelper::success(CartMessage::getMessages()->readSuccess, $cart_list);
        return;
    }

    public static function addCart()
    {
        // $request = RequestHelper::getRequestBody();

        // error_log("Adding cart: get request body", 0);
    }

    public static function updateCart($CartID)
    {
        $request = RequestHelper::getRequestBody();

        error_log("CART_SERVICE::UPDATE::", 0);

        $cart = new stdClass();
        $cart->FoodList = array();
        $cart->ComboList = array();

        //Map cart from request body

        if (property_exists($request, "FoodList")){
            $cart->FoodList = $request->FoodList;
        }

        if (property_exists($request, "ComboList")){
            $cart->ComboList = $request->ComboList;
        }

        $UserID = RequestHelper::getUserIDFromToken();
        $result = CartRepository::update($UserID, $cart);

        if ($result) {
            ResponseHelper::success(CartMessage::getMessages()->updateSuccess, $cart);
            return;
        }

        ResponseHelper::error_server(CartMessage::getMessages()->updateError);
    }

    public static function deleteCart($CartID)
    {
        // error_log("CART_SERVICE::DELETE::", 0);

        // // Find cart with the CartID in database
        // $cart_result = CartRepository::getCart();
        // if (empty($cart_result)) {
        //     // Throw error notifying CartID already taken
        //     ResponseHelper::error_client("Cart khong co item de delete");
        //     die();
        // }

        // // delete cart
        // $result = CartRepository::delete($UserID);
        // if ($result) {
        //     ResponseHelper::success(CartMessage::getMessages()->deleteSuccess, $cart_result);
        //     return;
        // }
        // ResponseHelper::error_server(CartMessage::getMessages()->deleteError);
    }
}
