<?php

namespace src\food\repository;

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
use src\food\message\FoodMessage;
use src\material\repository\MaterialRepository;
use src\tag\repository\TagRepository;
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
class FoodRepository implements Repository
{

    /**
     */
    public static function listFood(): array
    {
        $query = "SELECT * FROM food ORDER BY FoodID;";
        try {
            $result = QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }

        $list_food = array();
        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
            error_log(json_encode($row), 0);

            $FoodID = $row['FoodID'];

            $list_material = MaterialRepository::getMaterialByFoodID($FoodID);
            $row["Material"] = $list_material;

            $list_tag = TagRepository::getTagByFoodID($FoodID);
            $row["Tags"] = $list_tag;

            array_push($list_food, $row);
        }

        error_log("FOOD_REPOSITORY::FETCH_LIST::", 0);
        return $list_food;
    }

    public static function findFoodByID(int $FoodID)
    {
        $query = "SELECT * FROM food WHERE FoodID = $FoodID;";

        try {
            $result = QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }

        $list_food = array();
        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
            error_log(json_encode($row), 0);

            $FoodID = $row['FoodID'];

            $list_material = MaterialRepository::getMaterialByFoodID($FoodID);
            $row["Material"] = $list_material;

            $list_tag = TagRepository::getTagByFoodID($FoodID);
            $row["Tags"] = $list_tag;

            array_push($list_food, $row);
        }

        error_log("FOOD_REPOSITORY::FETCH_LIST::", 0);
        return $list_food;
    }

    public static function create($entity = null): \mysqli_result|bool|null
    {
        $query = "INSERT INTO food VALUES('$entity->FoodID','$entity->FoodName','$entity->Picture', '$entity->Price', '$entity->Description', '$entity->Instruct');";
        try {
            return QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage(), 0);
            return null;
        }
    }

    public static function insertMakeBy(int $FoodID, int $MaterialID): \mysqli_result|bool|null
    {
        $query = "INSERT INTO makeby VALUES('$MaterialID','$FoodID');";
        try {
            return QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage(), 0);
            return null;
        }
    }

    public static function read(int $entityID = null)
    {
        //DO NOTHING HERE
    }

    public static function update(int $entityID = null, object $entity = null)
    {
        $query = "UPDATE food SET FoodName='$entity->FoodName', Picture='$entity->Picture', Price=$entity->Price, Description='$entity->Description', Instruct='$entity->Instruct' WHERE FoodID=$entityID;";
        try {
            return QueryExecutor::executeQuery($query);
        } catch (Exception $exception) {
            echo $exception->getMessage();
        }
        return null;
    }

    public static function updateMakeBy($FoodID, $Materials)
    {
        $delete_makeby_query = "DELETE FROM makeby WHERE FoodID = $FoodID;";
        try {
            QueryExecutor::executeQuery($delete_makeby_query);
        } catch (Exception $exception) {
            echo $exception->getMessage();
        }

        foreach ($Materials as $material) {
            $result = FoodRepository::insertMakeBy($FoodID, $material->MaterialID);
            if (!$result) {
                ResponseHelper::error_server(FoodMessage::getMessages()->updateError);
                die();
            }
        }
        return true;
    }

    public static function delete(int $entityID = null)
    {
        $query = "DELETE FROM food WHERE FoodID = $entityID";;
        try {
            return QueryExecutor::executeQuery($query);
        } catch (Exception $exception) {
            echo $exception->getMessage();
        }
        return null;
    }

    public static function deleteMakeBy($FoodID)
    {
        $query = "DELETE FROM makeby WHERE FoodID = $FoodID;";
        try {
            return QueryExecutor::executeQuery($query);
        } catch (Exception $exception) {
            echo $exception->getMessage();
        }
        return null;
    }
}
