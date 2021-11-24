<?php

namespace src\tag\repository;

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
use src\tag\message\TagMessage;
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
class TagRepository implements Repository
{

    /**
     */
    public static function listTag(): array
    {
        $query = "SELECT * FROM tag ORDER BY TagID;";
        try {
            $result = QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }

        $list_tag = array();
        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
            error_log(json_encode($row), 0);
            array_push($list_tag, $row);
        }

        error_log("TAG_REPOSITORY::FETCH_LIST::", 0);
        return $list_tag;
    }

    public static function findTagByID(int $TagID)
    {
        $query = "SELECT * FROM tag WHERE TagID=$TagID;";
        try {
            $result = QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }

        $tag = mysqli_fetch_array($result, MYSQLI_ASSOC);
        error_log(json_encode($tag), 0);

        error_log("TAG_REPOSITORY::FETCH_LIST::", 0);
        return $tag;
    }

    public static function create($entity = null): \mysqli_result|bool|null
    {
        $query = "INSERT INTO tag (TagName) VALUES ('$entity->TagName');";
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
        $query = "UPDATE tag set TagName='$entity->TagName' WHERE TagID=$entityID;";
        try {
            return QueryExecutor::executeQuery($query);
        } catch (Exception $exception) {
            echo $exception->getMessage();
        }
        return null;
    }

    public static function deleteUserRefTag($TagID)
    {
        $delete_user_ref_tag_query = "DELETE FROM user_ref_tag WHERE TagID=$TagID;";
        try {
            return QueryExecutor::executeQuery($delete_user_ref_tag_query);
        } catch (Exception $exception) {
            echo $exception->getMessage();
        }

        return null;
    }

    public static function deleteCategoryTag($TagID)
    {
        $delete_category_tag_query = "DELETE FROM category_tag WHERE TagID=$TagID;";
        try {
            return QueryExecutor::executeQuery($delete_category_tag_query);
        } catch (Exception $exception) {
            echo $exception->getMessage();
        }

        return null;
    }

    public static function delete(int $entityID = null)
    {
        $query = "DELETE FROM tag WHERE TagID=$entityID;;";
        try {
            return QueryExecutor::executeQuery($query);
        } catch (Exception $exception) {
            echo $exception->getMessage();
        }
        return null;
    }

    // public static function deleteMakeBy($FoodID)
    // {
    //     $query = "DELETE FROM makeby WHERE FoodID = $FoodID";
    //     try {
    //         return QueryExecutor::executeQuery($query);
    //     } catch (Exception $exception) {
    //         echo $exception->getMessage();
    //     }
    //     return null;
    // }

    public static function getTagByFoodID($FoodID)
    {
        $tag_query = "SELECT * FROM tag AS tag
        INNER JOIN category_tag AS category_tag
        ON tag.TagID = category_tag.TagID
        WHERE category_tag.FoodID = $FoodID;";

        try {
            $tag_result = QueryExecutor::executeQuery($tag_query);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }

        $list_tag = array();

        while ($tag = $tag_result->fetch_array(MYSQLI_ASSOC)) {
            unset($tag["FoodID"]);
            unset($tag["ComboID"]);
            error_log(json_encode($tag), 0);
            array_push($list_tag, $tag);
        }

        return $list_tag;
    }

    public static function increaseTagCount($UserID, array $Tags)
    {
        foreach($Tags as $Tag) {
            $TagID = $Tag["TagID"];
            $query = "SELECT * FROM user_ref_tag WHERE UserID=$UserID AND TagID=$TagID;";

            try {
                $result = QueryExecutor::executeQuery($query);
            } catch (Exception $exception) {
                echo $exception->getMessage();
            }
            
            while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
                $Count = $row['Count'];
                $Count++;
                $update_query = "UPDATE user_ref_tag SET Count=$Count WHERE UserID=$UserID AND TagID=$TagID;";
                try {
                    QueryExecutor::executeQuery($update_query);
                } catch (Exception $exception) {
                    echo $exception->getMessage();
                }
            }
        }
    }

    public static function getTagByComboID($ComboID) {
        $tag_query = "SELECT * FROM tag AS tag
        INNER JOIN category_tag AS category_tag
        ON tag.TagID = category_tag.TagID
        WHERE category_tag.ComboID = $ComboID;";

        try {
            $tag_result = QueryExecutor::executeQuery($tag_query);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }

        $list_tag = array();

        while ($tag = $tag_result->fetch_array(MYSQLI_ASSOC)) {
            unset($tag["FoodID"]);
            unset($tag["ComboID"]);
            error_log(json_encode($tag), 0);
            array_push($list_tag, $tag);
        }

        return $list_tag;
    }
}
