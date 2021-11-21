<?php

namespace src\wish_list\mapper;

use JetBrains\PhpStorm\Pure;
use src\wish_list\entity\WishList;
use src\common\utils\ResponseHelper;
use src\common\utils\RequestHelper;
use src\food\repository\FoodRepository;
use src\combo\repository\ComboRepository;

require_once  __DIR__ . '/../../../vendor/autoload.php';

/**
 * Map between the entity passed in request to inmemory object
 * User Resquest  <--> User <--> Response
 */
class WishListMapper
{

    // Map a wish_list create request body to in memory user r
    #[Pure] public static function mapWishListFromRequest($request): WishList | bool
    {
        $UserID = RequestHelper::getUserIDFromToken();
        $wish_list = new WishList();

        $wish_list->UserID = $UserID;

        if (property_exists($request, "FoodID") && property_exists($request, "ComboID")) {
            ResponseHelper::error_client("Wish List Cannot Have Both ComboID And FoodID");
            die();
        }

        if (property_exists($request, "FoodID")) {
            $food_found = FoodRepository::findFoodByID($request->FoodID);

            if (!$food_found) {
                // Throw error notifying FoodID already taken
                ResponseHelper::error_client("FoodID doesn't exist");
                die();
            }

            $wish_list->FoodID = $request->FoodID;
        } else {
            $wish_list->FoodID = 0;
        }
        

        if (property_exists($request, "ComboID")) {
            $combo_found = ComboRepository::findComboByID($request->ComboID);

            if (!$combo_found) {
                // Throw error notifying FoodID already taken
                ResponseHelper::error_client("ComboID doesn't exist");
                die();
            }

            $wish_list->ComboID = $request->ComboID;
        } else {
            $wish_list->ComboID = 0;
        }

        if ($wish_list->FoodID == 0 && $wish_list->ComboID == 0) {
            return false;
        }

        return $wish_list;
    }
}
