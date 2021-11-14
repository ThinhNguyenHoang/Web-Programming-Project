<?php

namespace src\food\mapper;

use JetBrains\PhpStorm\Pure;
use src\food\entity\Food;
use src\food\entity\Combo;

require_once  __DIR__ . '/../../../vendor/autoload.php';

/**
 * Map between the entity passed in request to inmemory object
 * User Resquest  <--> User <--> Response
 */
class ComboMapper
{
    #[Pure] public static function mapComboFromAddComboRequest($request): Combo
    {
        return new Combo($request->ComboID, $request->ComboName, $request->Price);
    }
}
