<?php

namespace src\combo\repository;

require_once  __DIR__ . '/../../../vendor/autoload.php';

//// generate json web token
//include_once 'libs/php-jwt-master/src/BeforeValidException.php';
//include_once 'libs/php-jwt-master/src/ExpiredException.php';
//include_once 'libs/php-jwt-master/src/SignatureInvalidException.php';
//include_once 'libs/php-jwt-master/src/JWT.php';

use Exception;
use src\common\base\Repository;
use src\common\utils\QueryExecutor;
use src\common\utils\ResponseHelper;
use src\combo\message\ComboMessage;
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
        $query = "SELECT * FROM combo ORDER BY ComboID";
        try {
            $result = QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }

        $list_combo = array();
        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
            error_log(json_encode($row), 0);

            $ComboID = $row['ComboID'];

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

            $row["Food"] = $list_food;

            array_push($list_combo, $row);
        }

        error_log("COMBO_REPOSITORY::FETCH_LIST::", 0);
        return $list_combo;
    }

    public static function findComboByID($ComboID)
    {
        $query = "SELECT * FROM combo WHERE ComboID = $ComboID";

        try {
            $result = QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }

        $list_combo = array();
        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
            error_log(json_encode($row), 0);

            $ComboID = $row['ComboID'];

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

            $row["Food"] = $list_food;

            array_push($list_combo, $row);
        }

        error_log("COMBO_REPOSITORY::FETCH_LIST::", 0);
        return $list_combo;
    }

    /**
     */
    public static function create($entity = null): \mysqli_result|bool|null
    {
        $query = "INSERT INTO combo (ComboName, ComboDescrip, Price) VALUES('$entity->ComboName','$entity->ComboDescrip', '$entity->Price')";
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
        //NOTHING
    }

    public static function update(int $entityID = null, object $entity = null)
    {
        $query = "UPDATE combo set ComboName='$entity->ComboName', ComboDescrip='$entity->ComboDescrip', Price='$entity->Price' WHERE ComboID='$entityID'";
        try {
            return QueryExecutor::executeQuery($query);
        } catch (Exception $exception) {
            echo $exception->getMessage();
        }
        return null;
    }

    public static function updateInclude($ComboID, $Foods)
    {
        $delete_include_query = "DELETE FROM includes WHERE ComboID = $ComboID;";
        try {
            QueryExecutor::executeQuery($delete_include_query);
        } catch (Exception $exception) {
            echo $exception->getMessage();
        }

        foreach ($Foods as $food) {
            $result = ComboRepository::insertIncludes($food->FoodID, $ComboID);
            if (!$result) {
                ResponseHelper::error_server(ComboMessage::getMessages()->updateError);
                die();
            }
        }
        return true;
    }

    public static function delete(int $entityID = null)
    {
        $delete_combo_query = "DELETE FROM combo WHERE ComboID = $entityID";
        try {
            return QueryExecutor::executeQuery($delete_combo_query);
        } catch (Exception $exception) {
            echo $exception->getMessage();
        }

        return null;
    }

    public static function deleteInclude($ComboID) {
        $delete_include_query = "DELETE FROM includes WHERE ComboID = $ComboID";
        try {
            return QueryExecutor::executeQuery($delete_include_query);
        } catch (Exception $exception) {
            echo $exception->getMessage();
        }

        return null;
    }
}
