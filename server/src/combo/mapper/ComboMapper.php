<?php

namespace src\combo\mapper;

use JetBrains\PhpStorm\Pure;
use src\combo\entity\Combo;

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
