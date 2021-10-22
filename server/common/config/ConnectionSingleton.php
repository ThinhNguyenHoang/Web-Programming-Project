<?php
    class ConnectionSingleton extends Singleton {
        private static $mySqlConnection;
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
        protected function __construct()
        {
            try {
                self::$mySqlConnection = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE_NAME);
            } catch (Exception $e) {
                throw new Exception("Cannot connect to mysql: " . $e->getMessage());
            }
        }

        public static function getConnection(): mysqli
        {
            return self::$mySqlConnection;
        }
    }