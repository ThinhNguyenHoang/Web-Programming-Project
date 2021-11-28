<?php
namespace src\news_comment\message;
use src\common\base\MessageObject;
use src\common\base\Singleton;
use src\common\utils\MessageBuilder;

require_once  __DIR__ . '/../../../vendor/autoload.php';

const NEWS_COMMENT_ENTITY = "news_comment";

class NewsCommentMessage extends Singleton {
    private static MessageObject $messages;
    /**
     * The method you use to get the Singleton's instance.
     */
    public function __construct()
    {
        self::$messages = MessageBuilder::generateObjectMessage(NEWS_COMMENT_ENTITY);
    }

    public static function getMessages(): MessageObject
    {
        $connector = self::getInstance();
        return self::$messages;
    }
}