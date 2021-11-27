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
use src\common\utils\RequestHelper;
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
        return $list_food ? $list_food[0] : $list_food;
    }

    public static function getTopTagFood()
    {
        $UserID = RequestHelper::getUserIDFromToken();
        $tag_limit = 6;
        $query = "SELECT * FROM user_ref_tag AS ref_tag
                INNER JOIN category_tag AS category_tag
                ON ref_tag.TagID=category_tag.TagID 
                WHERE ref_tag.UserID=$UserID AND category_tag.ComboID=0
                 ORDER BY ref_tag.Count DESC LIMIT $tag_limit";
        $result = null;
        try {
            $result = QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
        if(!$result){
            return null;
        }
        $top_tag = array();
        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
            error_log(json_encode($row), 0);
            unset($row["ComboID"]);
            array_push($top_tag, $row);
        }

        error_log("FOOD_REPOSITORY::GET_TOP_TAG::", 0);
        return $top_tag;
    }

    public static function getFoodByComboID($ComboID)
    {
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
        $query = "INSERT INTO makeby (MaterialID, FoodID) VALUES('$MaterialID','$FoodID');";
        try {
            return QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage(), 0);
            return null;
        }
    }

    public static function insertCategoryTag($FoodID, $TagID)
    {
        $query = "INSERT INTO category_tag (TagID, FoodID) VALUES('$TagID','$FoodID');";
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

    public static function updateCategoryTag($FoodID, $Tags)
    {
        $delete_category_tag_query = "DELETE FROM category_tag WHERE FoodID = $FoodID;";
        try {
            QueryExecutor::executeQuery($delete_category_tag_query);
        } catch (Exception $exception) {
            echo $exception->getMessage();
        }

        foreach ($Tags as $tag) {
            $result = FoodRepository::insertCategoryTag($FoodID, $tag->TagID);
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

    public static function deleteCategoryTag($FoodID)
    {
        $query = "DELETE FROM category_tag WHERE FoodID = $FoodID;";
        try {
            return QueryExecutor::executeQuery($query);
        } catch (Exception $exception) {
            echo $exception->getMessage();
        }
        return null;
    }
}