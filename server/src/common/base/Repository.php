<?php


namespace src\common\base;

interface Repository
{
    public static function create(object $entity = null);
    public static function read(int $entityID=null);
    public static function update(int $entityID=null,object $entity=null);
    public static function delete(int $entityID=null);
}