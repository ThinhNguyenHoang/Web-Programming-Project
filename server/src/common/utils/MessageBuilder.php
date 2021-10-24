<?php

namespace src\common\utils;
require_once  __DIR__ . '../../../vendor/autoload.php';

const SUCCESS_STATUS = "result in success";
const ERROR_STATUS = "result in error";
const WARNING_STATUS = "some thing is wrong";

const CREATE_ACTION = "Create";
const READ_ACTION = "Read";
const UPDATE_ACTION = "Update";
const DELETE_ACTION = "Delete";

class MessageBuilder{
    public static string $create = "create";
    public static string $read = "read";
    public static string $update = "update";
    public static string $delete = "delete";
    public static function buildMessage(string $entity, string $action, string $status):String{
        return "$action $entity: $status";
    }

    public static function generateObjectMessage($entity) : MessageObject{
//        $messageArray = array(
//            'createSuccess' => self::createSuccess($entity),
//            'createError' => self::createError($entity),
//            'readSuccess' => self::readSuccess($entity),
//            'readError' => self::readError($entity),
//            'updateSuccess' => self::updateSuccess($entity),
//            'updateError' => self::updateError($entity),
//            'deleteSuccess' => self::deleteSuccess($entity),
//            'deleteError' => self::deleteError($entity),
//        );
        return new MessageObject(self::createSuccess($entity),self::createError($entity),
            self::readSuccess($entity),self::readError($entity),
            self::updateSuccess($entity),self::updateError($entity),
            self::deleteSuccess($entity),self::deleteError($entity));
    }

    public static function createSuccess($entity): string
    {
        return CREATE_ACTION . " $entity:" . SUCCESS_STATUS;
    }
    public static function createError($entity): string
    {
        return CREATE_ACTION . " $entity:" . ERROR_STATUS;
    }

    public static function readSuccess($entity): string
    {
        return READ_ACTION. " $entity:" . SUCCESS_STATUS;
    }

    public static function readError($entity): string
    {
        return READ_ACTION. " $entity:" . ERROR_STATUS;
    }

    public static function updateSuccess($entity): string
    {
        return UPDATE_ACTION. " $entity:" . SUCCESS_STATUS;
    }

    public static function updateError($entity): string
    {
        return UPDATE_ACTION. " $entity:" . ERROR_STATUS;
    }

    public static function deleteSuccess($entity): string
    {
        return DELETE_ACTION. " $entity:" . SUCCESS_STATUS;
    }

    public static function deleteError($entity): string
    {
        return DELETE_ACTION. " $entity:" . ERROR_STATUS;
    }
}