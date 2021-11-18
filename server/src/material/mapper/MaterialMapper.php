<?php

namespace src\material\mapper;

use JetBrains\PhpStorm\Pure;
use src\material\entity\Material;

require_once  __DIR__ . '/../../../vendor/autoload.php';

/**
 * Map between the entity passed in request to inmemory object
 * User Resquest  <--> User <--> Response
 */
class MaterialMapper
{
    #[Pure] public static function mapMaterialFromAddMaterialRequest($request): Material
    {
        return new Material($request->MaterialID, $request->MaterialName);
    }
}