<?php
namespace src\common\config;
require_once  __DIR__ . '../../../vendor/autoload.php';

class RootPathGetter{
    public static function getRootPathToVendor(): string
    {
        return substr(__DIR__,0,-18) ;
    }

    public static function getPathToAutoLoadPHP(){
        return self::getRootPathToVendor() . '/vendor/autoload.php';
    }
}