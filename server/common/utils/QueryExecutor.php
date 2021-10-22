<?php
class QueryExecutor extends Singleton
{
    protected mysqli $conn;

    /**
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
            $conn = ConnectionSingleton::getInstance()::getConnection();
        }
        return self::$instances[$subclass];
    }

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

    public static function executeQuery($query){
        return mysqli_query(ConnectionSingleton::getConnection(),$query);
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