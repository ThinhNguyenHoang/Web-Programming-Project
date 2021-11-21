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
        $material  = new Material();
        $material->MaterialName = $request->MaterialName;
        $material->Picture = $request->Picture;
        return $material;
    }
}
