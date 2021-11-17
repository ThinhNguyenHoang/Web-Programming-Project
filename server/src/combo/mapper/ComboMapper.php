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
    #[Pure] public static function mapComboFromRequest($request): Combo
    {
        $combo = new Combo();
        $combo->ComboName = $request->ComboName;
        $combo->ComboDescrip = $request->ComboDescrip;
        $combo->Price = $request->Price;
        return $combo;
    }
}
