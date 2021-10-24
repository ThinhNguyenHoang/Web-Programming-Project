<?php


namespace src\common\base;
require_once  __DIR__ . '../../../vendor/autoload.php';

interface Repository
{
    public static function create($entity = null);
    public static function read($entityID=null);
    public static function update($entityID=null,$entity=null);
    public static function delete($entityID=null);
}