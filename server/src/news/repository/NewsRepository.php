<?php

namespace src\news\repository;

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
use src\news\message\NewsMessage;
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
class NewsRepository implements Repository
{

    /**
     */
    public static function listNews(): array
    {
        $query = "SELECT * FROM news ORDER BY NewsID;";
        $result = null;
        try {
            $result = QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }

        $list_news = array();

        if ($result) {
            while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
                error_log(json_encode($row), 0);
                $row["Comment"] = array();
                array_push($list_news, $row);
            }
        }

        error_log("NEWS_REPOSITORY::FETCH_LIST::", 0);
        return $list_news;
    }

    public static function findNewsByID(int $NewsID)
    {
        $query = "SELECT * FROM news WHERE NewsID = $NewsID;";

        try {
            $result = QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }

        $list_news = array();
        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
            error_log(json_encode($row), 0);
            $row["Comment"] = array();
            array_push($list_news, $row);
        }

        error_log("NEWS_REPOSITORY::FETCH_LIST::", 0);
        return $list_news ? $list_news[0] : $list_news;
    }

    public static function getTopTagNews()
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
        if (!$result) {
            return null;
        }
        $top_tag = array();
        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
            error_log(json_encode($row), 0);
            unset($row["ComboID"]);
            array_push($top_tag, $row);
        }

        error_log("NEWS_REPOSITORY::GET_TOP_TAG::", 0);
        return $top_tag;
    }

    public static function create($entity = null): \mysqli_result|bool|null
    {
        $query = "INSERT INTO news (Title, Picture, Highlight, Content, Author) VALUES('$entity->Title','$entity->Picture','$entity->Highlight', '$entity->Content', '$entity->Author');";
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
        $query = "UPDATE news SET Title='$entity->Title', Picture='$entity->Picture', Highlight='$entity->Highlight', Content='$entity->Content', Author='$entity->Author' WHERE NewsID=$entityID;";
        try {
            return QueryExecutor::executeQuery($query);
        } catch (Exception $exception) {
            echo $exception->getMessage();
        }
        return null;
    }

    public static function delete(int $entityID = null)
    {
        $query = "DELETE FROM news WHERE NewsID = $entityID";;
        try {
            return QueryExecutor::executeQuery($query);
        } catch (Exception $exception) {
            echo $exception->getMessage();
        }
        return null;
    }
}
