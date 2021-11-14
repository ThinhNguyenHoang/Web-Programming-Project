<?php

namespace src\food\mapper;

use JetBrains\PhpStorm\Pure;
use src\food\dto\UserRegisterRequest;
use src\food\entity\BankAccount;
use src\food\entity\Food;

require_once  __DIR__ . '/../../../vendor/autoload.php';

/**
 * Map between the entity passed in request to inmemory object
 * User Resquest  <--> User <--> Response
 */
class FoodMapper
{

    // Map a food create request body to in memory user r
    #[Pure] public static function mapFoodFromAddFoodRequest($request): Food
    {
        $food = new Food();
        $food->FoodID = $request->FoodID;
        $food->FoodName = $request->FoodName;
        $food->Picture = $request->Picture;
        $food->Price = $request->Price;
        $food->Description = $request->Description;
        $food->Instruct = $request->Instruct;
        return $food;
    }
}
