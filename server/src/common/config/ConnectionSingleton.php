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
define("DB_USERNAME", "root");
define("DB_PASSWORD", "123456");
define("DB_DATABASE_NAME", "web_food");

define("DB_HOST2", "localhost");
define("DB_USERNAME2", "root");
define("DB_PASSWORD2", "123456");
define("DB_DATABASE_NAME2", "web_food");

class ConnectionSingleton extends Singleton
{
    private static mysqli $mySqlConnection;
    // minh co autosave ko ta có anh ok. 
    protected function __construct()
    {
        try {
            error_log("LOGIN MYSQL ERROR. LOGIN WITH THUAN");
            mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
            self::$mySqlConnection = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE_NAME);
        } catch (Exception $e) {
            try {
                error_log("LOGIN MYSQL ERROR. LOGIN WITH THINH");
                mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
                self::$mySqlConnection = new mysqli(DB_HOST1, DB_USERNAME1, DB_PASSWORD1, DB_DATABASE_NAME1);
            }//mấy bữa nay code là em vs quyền code front end trên máy nó,nó shared server localhost:3000, rồi mỗi đứa tự chạy server backend riêng
            catch (Exception $e) {
                try{
                    error_log("LOGIN MYSQL ERROR. LOGIN WITH KHOI");
                    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
                    self::$mySqlConnection = new mysqli(DB_HOST2, DB_USERNAME2, DB_PASSWORD2, DB_DATABASE_NAME2);
                }//dể em chuyển qua branch khác thử
                catch(Exception $e){
                    error_log("LOGIN MYSQL ERROR. LOGIN WITH KHOI ACCOUNT" . $e->getMessage());
                }
                throw new Exception("Cannot connect to mysql: " . $e->getMessage());
            }
        } // Sao ky vay. Cai log no khong ra gion thieu khuc do. May tinh nay ao vay ta @@ co dang chay terminal nao khac khong ,ko anh
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