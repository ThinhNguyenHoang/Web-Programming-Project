<?php
const USER_ACCOUNT_ENTITY = "USER_ACCOUNT";

class UserMessage extends Singleton {
    private static MessageObject $messages;
    /**
     * The method you use to get the Singleton's instance.
     */
    public static function getInstance()
    {
        $subclass = static::class;
        if (!isset(self::$instances[$subclass])) {
            // Note that here we use the "static" keyword instead of the actual
            // class name. In this context, the "static" keyword means "the name
            // of the current class". That detail is important because when the
            // method is called on the subclass, we want an instance of that
            // subclass to be created here.

            self::$instances[$subclass] = new static();
            self::$messages = MessageBuilder::generateObjectMessage(USER_ACCOUNT_ENTITY);
        }
        return self::$instances[$subclass];
    }

    public static function getMessages(): MessageObject
    {
        return self::$messages;
    }
}