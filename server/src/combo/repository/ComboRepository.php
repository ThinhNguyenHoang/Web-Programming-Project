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
use src\common\utils\RequestHelper;
use src\food\repository\FoodRepository;
use src\tag\repository\TagRepository;

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

            $list_food = FoodRepository::getFoodByComboID($ComboID);
            $row["Food"] = $list_food;

            $list_tag = TagRepository::getTagByComboID($ComboID);
            $row["Tags"] = $list_tag;

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

            $list_food = FoodRepository::getFoodByComboID($ComboID);
            $row["Food"] = $list_food;

            $list_tag = TagRepository::getTagByComboID($ComboID);
            $row["Tags"] = $list_tag;

            array_push($list_combo, $row);
        }

        error_log("COMBO_REPOSITORY::FETCH_LIST::", 0);
        return $list_combo ? $list_combo[0] : $list_combo;
    }

    public static function getTopTagCombo()
    {
        $UserID = RequestHelper::getUserIDFromToken();
        $tag_limit = 6;
        $query = "SELECT * FROM user_ref_tag AS ref_tag
                INNER JOIN category_tag AS category_tag
                ON ref_tag.TagID=category_tag.TagID 
                WHERE ref_tag.UserID=$UserID AND category_tag.FoodID=0
                 ORDER BY ref_tag.Count DESC LIMIT $tag_limit";

        try {
            $result = QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }

        $top_tag = array();
        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
            error_log(json_encode($row), 0);
            unset($row["FoodID"]);
            array_push($top_tag, $row);
        }

        error_log("COMBO_REPOSITORY::GET_TOP_TAG::", 0);
        return $top_tag;
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
        $query = "INSERT INTO includes (FoodID, ComboID) VALUES('$FoodID','$ComboID')";
        try {
            return QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage(), 0);
            return null;
        }
    }

    public static function insertCategoryTag($ComboID, $TagID)
    {
        $query = "INSERT INTO category_tag (TagID, ComboID) VALUES('$TagID','$ComboID');";
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

    public static function updateCategoryTag($ComboID, $Tags)
    {
        $delete_category_tag_query = "DELETE FROM category_tag WHERE ComboID = $ComboID;";
        try {
            QueryExecutor::executeQuery($delete_category_tag_query);
        } catch (Exception $exception) {
            echo $exception->getMessage();
        }

        foreach ($Tags as $tag) {
            $result = ComboRepository::insertCategoryTag($ComboID, $tag->TagID);
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

    public static function deleteInclude($ComboID)
    {
        $delete_include_query = "DELETE FROM includes WHERE ComboID = $ComboID";
        try {
            return QueryExecutor::executeQuery($delete_include_query);
        } catch (Exception $exception) {
            echo $exception->getMessage();
        }

        return null;
    }

    public static function deleteCategoryTag($ComboID) {
        $query = "DELETE FROM category_tag WHERE ComboID = $ComboID;";
        try {
            return QueryExecutor::executeQuery($query);
        } catch (Exception $exception) {
            echo $exception->getMessage();
        }
        return null;
    }

    public static function initUserRefTagForCombo()
    {
        $list_tag = TagRepository::listTag();

        $UserID = RequestHelper::getUserIDFromToken();
        foreach ($list_tag as $tag) {
            $query = "INSERT INTO user_ref_tag (TagID, UserID, Count) VALUES ('" . $tag["TagID"] . "', $UserID, 0)";

            try {
                $result = QueryExecutor::executeQuery($query);
            } catch (Exception $exception) {
                echo $exception->getMessage();
            }

            if (!$result) {
                return null;
            }
        }
    }
}
