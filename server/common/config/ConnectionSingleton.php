<?php

class ConnectionSingleton extends Singleton
{
    private static mysqli $mySqlConnection;
    /**
     * This is the static method that controls the access to the singleton
     * instance. On the first run, it creates a singleton object and places it
     * into the static field. On subsequent runs, it returns the client existing
     * object stored in the static field.
     *
     * This implementation lets you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     * @throws Exception
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
            try {
                self::$mySqlConnection = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE_NAME);
            } catch (Exception $e) {
                throw new Exception("Cannot connect to mysql: " . $e->getMessage());
            }
        }
        return self::$instances[$subclass];
    }

    public static function getConnection(): mysqli
    {
        return self::$mySqlConnection;
    }
}