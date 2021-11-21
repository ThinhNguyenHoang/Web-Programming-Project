<?php

namespace src\wish_list\service;

use src\common\utils\QueryExecutor;
use src\common\utils\RequestHelper;
use src\common\utils\ResponseHelper;
use src\wish_list\entity\WishList;
use src\wish_list\mapper\WishListMapper;
use src\wish_list\message\WishListMessage;
use src\wish_list\repository\WishListRepository;

require_once  __DIR__ . '/../../../vendor/autoload.php';

/**
 * Define operation that can be done related to the entity
 * Xu ly request : 3 khuc
 * 1. Parse request --> lay param
 * 2. Xu ly backend
 * 3. Tra ve response cho client
 */
class WishListService
{
    public static function getWishListList()
    {
        ResponseHelper::success(WishListMessage::getMessages()->readSuccess, WishListRepository::listWishList());
    }

    public static function addWishList()
    {
        $request = RequestHelper::getRequestBody();

        error_log("Adding WishList: get request body", 0);

        //Map WishList from request
        error_log("Adding WishList: Map WishList entity from request", 0);
        $wish_list = WishListMapper::mapWishListFromRequest($request);

        if(!$wish_list) {
            ResponseHelper::error_client("Need ComboID or FoodID");
            die();
        }

        $result = WishListRepository::create($wish_list);

        error_log("Adding wish_list: Insert to database", 0);

        if ($result) {
            $wish_list->WishListID = QueryExecutor::getLastInsertID();
            error_log("Adding wish_list: " . json_encode($wish_list), 0);

            ResponseHelper::success(WishListMessage::getMessages()->createSuccess, $wish_list);
            return;
        }

        ResponseHelper::error_server(WishListMessage::getMessages()->createError);
        return;
    }

    public static function deleteWishList($WishListID)
    {
        error_log("WISH_LIST_SERVICE::DELETE::", 0);

        // Find tag with the WishListID in database
        $wish_list_found = WishListRepository::findWishListByID($WishListID);
        if (!$wish_list_found) {
            // Throw error notifying WishListID already taken
            ResponseHelper::error_client("WishListID doesn't exist");
            die();
        }

        // delete wish_list
        $result = WishListRepository::delete($WishListID);
        if ($result) {
            ResponseHelper::success(WishListMessage::getMessages()->deleteSuccess, $wish_list_found);
            return;
        }
        ResponseHelper::error_server(WishListMessage::getMessages()->deleteError);
    }
}
