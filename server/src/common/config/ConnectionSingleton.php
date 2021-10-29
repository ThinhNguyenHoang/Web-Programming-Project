<?php
namespace src\common\config;
use Exception;
use mysqli;
use src\common\base\Singleton;

require_once  __DIR__ . '/../../../vendor/autoload.php';

define("DB_HOST", "localhost");
define("DB_USERNAME", "root");
define("DB_PASSWORD", "toor");
define("DB_DATABASE_NAME", "web_food");


class ConnectionSingleton extends Singleton
{
    private static mysqli $mySqlConnection;

    protected function __construct()
    {
        try {
            self::$mySqlConnection = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE_NAME);
        } catch (Exception $e) {
            throw new Exception("Cannot connect to mysql: " . $e->getMessage());
        }
    }
    public function returnConnection(): mysqli
    {
        return self::$mySqlConnection;
    }

    public static function getConnection(): mysqli
    {
        $connector = self::getInstance();
        return $connector->returnConnection();
    }
}