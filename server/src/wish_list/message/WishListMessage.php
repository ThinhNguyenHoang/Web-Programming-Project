<?php
namespace src\wish_list\message;
use src\common\base\MessageObject;
use src\common\base\Singleton;
use src\common\utils\MessageBuilder;

require_once  __DIR__ . '/../../../vendor/autoload.php';

const WISH_LIST_ENTITY = "wish_list";

class WishListMessage extends Singleton {
    private static MessageObject $messages;
    /**
     * The method you use to get the Singleton's instance.
     */
    public function __construct()
    {
        self::$messages = MessageBuilder::generateObjectMessage(WISH_LIST_ENTITY);
    }

    public static function getMessages(): MessageObject
    {
        $connector = self::getInstance();
        return self::$messages;
    }
}