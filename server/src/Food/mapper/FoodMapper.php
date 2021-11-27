<?php

namespace src\food\mapper;

use JetBrains\PhpStorm\Pure;
use src\food\entity\Combo;
use src\food\entity\Food;

require_once  __DIR__ . '/../../../vendor/autoload.php';

/**
 * Map between the entity passed in request to inmemory object
 * User Resquest  <--> User <--> Response
 */
class FoodMapper
{

    // Map a food create request body to in memory user r
    #[Pure] public static function mapFoodFromRequest($request): Food
    {
        $food = new Food();
        $food->FoodName = $request->FoodName;
        $food->Picture = $request->Picture;
        $food->Price = $request->Price;
        $food->Description = $request->Description;
        $food->Instruct = $request->Instruct;
        $food->Sale = $request->Sale;
        return $food;
    }
}
