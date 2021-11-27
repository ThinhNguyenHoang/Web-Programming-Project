<?php
namespace src\cart\message;
use src\common\base\MessageObject;
use src\common\base\Singleton;
use src\common\utils\MessageBuilder;

require_once  __DIR__ . '/../../../vendor/autoload.php';

const CART_ENTITY = "cart";

class CartMessage extends Singleton {
    private static MessageObject $messages;
    /**
     * The method you use to get the Singleton's instance.
     */
    public function __construct()
    {
        self::$messages = MessageBuilder::generateObjectMessage(CART_ENTITY);
    }

    public static function getMessages(): MessageObject
    {
        $connector = self::getInstance();
        return self::$messages;
    }
}