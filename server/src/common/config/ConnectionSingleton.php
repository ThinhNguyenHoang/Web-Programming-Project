<?php
namespace src\common\config;
use Exception;
use mysqli;
use src\common\base\Singleton;

require_once  __DIR__ . '/../../../vendor/autoload.php';

 define("DB_HOST1", "localhost");
 define("DB_USERNAME1", "root");
 define("DB_PASSWORD1", "toor");
 define("DB_DATABASE_NAME1", "web_food");

define("DB_HOST", "localhost");
define("DB_USERNAME", "thuan");
define("DB_PASSWORD", "Csv0202");
define("DB_DATABASE_NAME", "web_food");

class ConnectionSingleton extends Singleton
{
    private static mysqli $mySqlConnection;

    protected function __construct()
    {
        try {
            mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
            self::$mySqlConnection = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE_NAME);
        } catch (Exception $e) {
            try {
                error_log("FAILED LOGIN WITH THUAN ACCOUNT. LOGIN WITH THINH ACCOUNT" . $e->getMessage());

                self::$mySqlConnection = new mysqli(DB_HOST1, DB_USERNAME1, DB_PASSWORD1, DB_DATABASE_NAME1);
            }
            catch (Exception $e) {
                throw new Exception("Cannot connect to mysql: " . $e->getMessage());
            }
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