<?php
namespace src\common\utils;
use Exception;
use src\common\base\Singleton;
use src\common\config\ConnectionSingleton;

require_once  __DIR__ . '/../../../vendor/autoload.php';

class QueryExecutor extends Singleton
{

    public static function executeQuery($query): \mysqli_result|bool
    {
        error_log("Querying the query:" . $query,0 );
        $conn = ConnectionSingleton::getConnection();
        if($conn->connect_error){
            die("Connection Error: " . $conn->connect_error);
        }
        $result =  $conn->query($query);
        if(!$result){
            error_log("ERROR WHEN EXECUTING QUERY: " . $conn->error);
            die("Query Error: " . $conn->error);
        }
        return $result;
    }

    public static function getLastInsertID () {
        return ConnectionSingleton::getConnection()->insert_id;
    }


    /**
     * @param $query
     * @Return: This function should only be used for getting single object with ID
     */
    public static function selectTableWithID($table_name,$id){
        $query = "SELECT FROM $table_name WHERE ID=$id";
        $result = QueryExecutor::executeQuery($query);
        return mysqli_fetch_array($result);
    }


    /**
     * Thuan Old Functions
     * @param string $query
     * @param array $params
     * @return false
     * @throws Exception
     */
    public function select($query = "", $params = [])
    {
        try {
            $stmt = $this->executeStatement($query, $params);
            $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
            $stmt->close();
            return $result;
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
        return false;
    }

    private function executeStatement($query = "", $params = [])
    {
        try {
            $stmt = $this->conn->prepare($query);
            if ($stmt === false) {
                throw new Exception("Unable to do prepared statement: " . $query);
            }

            if ($params) {
                $stmt->bind_param($params[0], $params[1]);
            }

            $stmt->execute();

            return $stmt;
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }
}