<?php


interface Repository
{
    public static function create($entity = null);
    public static function read($entityID=null);
    public static function update($entityID=null,$entity=null);
    public static function delete($entityID=null);
}