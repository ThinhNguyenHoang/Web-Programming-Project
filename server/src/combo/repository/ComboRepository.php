<?php

namespace src\combo\repository;

require_once  __DIR__ . '/../../../vendor/autoload.php';

//// generate json web token
//include_once 'libs/php-jwt-master/src/BeforeValidException.php';
//include_once 'libs/php-jwt-master/src/ExpiredException.php';
//include_once 'libs/php-jwt-master/src/SignatureInvalidException.php';
//include_once 'libs/php-jwt-master/src/JWT.php';

use Exception;
use \Firebase\JWT\JWT;
use Food;
use src\common\base\Repository;
use src\common\utils\QueryExecutor;
use function DeepCopy\deep_copy;

/**
 * Class for interaction with database
 * + Create
 * + Read by ID
 * + Read List
 * + Find by field
 * + Delete
 * + Update
 * + Fight out. Don't let it loose.
 */
class ComboRepository implements Repository
{
    public static function listCombo(): array
    {
        $query = "
        INNER JOIN combo AS combo
        ON combo.ComboID = includes.ComboID ORDER BY food.FoodID;";

        $query = "SELECT * FROM combo";
        try {
            $result = QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
        //        $num_row = $result->num_rows;
        $list_combo = array();
        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
            error_log(json_encode($row), 0);
            $ComboID =  $row["ComboID"];

            $food_query = "SELECT * FROM food AS food 
            INNER JOIN includes AS includes
            ON food.FoodID = includes.FoodID 
            WHERE includes.ComboID = $ComboID";

            try {
                $food_result = QueryExecutor::executeQuery($food_query);
            } catch (Exception $e) {
                error_log($e->getMessage());
            }

            $list_food = array();

            while ($food = $food_result->fetch_array(MYSQLI_ASSOC)) {
                unset($food["ComboID"]);
                error_log(json_encode($food), 0);
                array_push($list_food, $food);
            }
            // end($list_food)["material"] = $list_material;

            $row["Material"] = $list_food;

            array_push($list_combo, $row);
        }

        error_log("COMBO_REPOSITORY::FETCH_LIST::", 0);
        return $list_combo;
    }

    public static function findComboByID($ComboID) {
        $query = "SELECT * FROM combo WHERE ComboID=$ComboID";
        try {
            $row = QueryExecutor::executeQuery($query);
            $return = $row->fetch_object();
            return deep_copy($return);
        } catch (Exception $exception) {
            echo $exception->getMessage();
        }
        return null;
    }
    /**
     */
    public static function create($entity = null): \mysqli_result|bool|null
    {
        $query = "INSERT INTO combo (ComboName, ComboDescrip, Price) VALUES('$entity->ComboName', '$entity->ComboDescrip','$entity->Price')";
        try {
            return QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage(), 0);
            return null;
        }
    }

    public static function insertIncludes(int $FoodID, int $ComboID): \mysqli_result|bool|null
    {
        $query = "INSERT INTO includes VALUES('$FoodID','$ComboID')";
        try {
            return QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage(), 0);
            return null;
        }
    }

    public static function read(int $entityID = null)
    {
        $query = "SELECT * FROM USER_ACCOUNT WHERE ID=$entityID";
        $row = QueryExecutor::executeQuery($query);
        if (!$row) {
            // Throw error return error message for client to display
            echo "Something has gone wrong when reading food with id: $entityID! ";
        }
        $return = $row->fetch_object($class = "FoodAccount");
        return deep_copy($return);
    }

    public static function update(int $entityID = null, object $entity = null)
    {
        $query = "UPDATE USER_ACCOUNT SET USERNAME=$entity->foodname, PASSWORD=$entity->password WHERE ID=$entityID";
        return QueryExecutor::executeQuery($query);
    }

    public static function delete(int $entityID = null)
    {
        // TODO: Implement delete() method.
    }
}
