<?php

namespace src\news_comment\repository;

require_once  __DIR__ . '/../../../vendor/autoload.php';

//// generate json web token
//include_once 'libs/php-jwt-master/src/BeforeValidException.php';
//include_once 'libs/php-jwt-master/src/ExpiredException.php';
//include_once 'libs/php-jwt-master/src/SignatureInvalidException.php';
//include_once 'libs/php-jwt-master/src/JWT.php';

use Exception;
use src\common\base\Repository;
use src\common\utils\QueryExecutor;
use src\common\utils\RequestHelper;
use src\user\repository\UserRepository;
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
class NewsCommentRepository implements Repository
{

    /**
     */
    public static function listNewsComment($NewsID): array
    {
        $query = "SELECT * FROM comment WHERE NewsID=$NewsID;";
        $result = null;
        try {
            $result = QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }

        $list_news_comment = array();

        if ($result) {
            while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
                unset($row["FoodID"], $row["NewsID"]);
                $user = UserRepository::getUserProfile($row["UserID"]);
                $row["UserName"] = $user->username;
                $row["UserAvatar"] = $user->avatar;
                $row["ImageList"] = self::getNewsCommentImage($row["CommentID"]);
                $row["Reply"] = self::getReplyComment($row["CommentID"]);

                error_log(json_encode($row), 0);
                array_push($list_news_comment, $row);
            }
        }

        error_log("NEWS_COMMENT_REPOSITORY::FETCH_LIST::", 0);
        return $list_news_comment;
    }

    public static function findNewsCommentByID($CommnetID)
    {
        $query = "SELECT * FROM comment WHERE CommentID = $CommnetID;";

        $result = null;
        try {
            $result = QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }

        $list_news_comment = array();

        if ($result) {
            while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
                unset($row["FoodID"], $row["NewsID"]);
                $user = UserRepository::getUserProfile($row["UserID"]);
                $row["UserName"] = $user->username;
                $row["UserAvatar"] = $user->avatar;
                $row["ImageList"] = self::getNewsCommentImage($row["CommentID"]);
                $row["Reply"] = self::getReplyComment($row["CommentID"]);

                error_log(json_encode($row), 0);
                array_push($list_news_comment, $row);
            }
        }

        error_log("NEWS_COMMENT_REPOSITORY::FETCH_LIST::", 0);
        return $list_news_comment;
    }

    public static function getReplyComment($CommentID)
    {
        $query = "SELECT Content, UserID FROM reply_comment WHERE CommentID = $CommentID;";

        $result = null;
        try {
            $result = QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }

        $list_comment_reply = array();
        $result=null;
        if ($result) {
            while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
                error_log(json_encode($row), 0);

                $user = UserRepository::getUserProfile($row["UserID"]);
                $row["UserName"] = $user->username;
                $row["UserAvatar"] = $user->avatar;

                array_push($list_comment_reply, $row);
            }
        }

        error_log("NEWS_COMMENT_REPOSITORY::FETCH_REPLY::", 0);
        return $list_comment_reply;
    }

    public static function getNewsCommentImage($CommentID)
    {
        $query = "SELECT Image FROM comment_image WHERE CommentID = $CommentID;";

        try {
            $result = QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }

        $list_comment_image = array();
        if ($result) {
            while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
                error_log(json_encode($row), 0);
                array_push($list_comment_image, $row);
            }
        }

        error_log("NEWS_COMMENT_REPOSITORY::FETCH_LIST::", 0);
        return $list_comment_image;
    }

    public static function create($entity = null): \mysqli_result|bool|null
    {
        $UserID = RequestHelper::getUserIDFromToken();
        $comment_query = "INSERT INTO comment (UserID, Content, NewsID, FoodID) VALUES('$UserID','$entity->Content', '$entity->NewsID', 0);";
        try {
            $comment_result = QueryExecutor::executeQuery($comment_query);
        } catch (Exception $e) {
            error_log($e->getMessage(), 0);
            return null;
        }

        if ($comment_result) {
            $CommentID = QueryExecutor::getLastInsertID();
            foreach ($entity->ImageList as $Image) {
                $image_query = "INSERT INTO comment_image (CommentID, Image) VALUES ($CommentID, '$Image->Image');";

                try {
                    $image_result = QueryExecutor::executeQuery($image_query);
                } catch (Exception $e) {
                    error_log($e->getMessage(), 0);
                    return null;
                }

                if (!$image_result) {
                    return null;
                }
            }
            return true;
        }

        return false;
    }

    public static function read(int $entityID = null)
    {
        //DO NOTHING HERE
    }

    public static function update(int $entityID = null, object $entity = null)
    {
        $query = "UPDATE comment SET Content='$entity->Content' WHERE CommentID=$entityID;";
        try {
            $result = QueryExecutor::executeQuery($query);
        } catch (Exception $exception) {
            echo $exception->getMessage();
        }

        if ($result) {
            $comment_reply_result = self::updateCommentReply($entityID, $entity->Reply);
            $comment_image_result = self::updateCommentImage($entityID, $entity->ImageList);
            if ($comment_reply_result != null && $comment_image_result != null) {
                return true;
            }
        }
        return null;
    }

    public static function updateCommentImage($entityID, $entity)
    {
        $delete_image_query = "DELETE FROM comment_image WHERE CommentID=$entityID;";
        try {
            $delete_image_result = QueryExecutor::executeQuery($delete_image_query);
        } catch (Exception $exception) {
            echo $exception->getMessage();
        }

        if ($delete_image_result) {
            foreach ($entity as $reply) {
                $insert_image_query = "INSERT INTO comment_image (CommentID, Image) VALUES ('$entityID', '$reply->Image')";

                try {
                    $insert_image_result = QueryExecutor::executeQuery($insert_image_query);
                } catch (Exception $exception) {
                    echo $exception->getMessage();
                }

                if (!$insert_image_result) {
                    return null;
                }
            }
            return true;
        }
    }

    public static function updateCommentReply($entityID, $entity)
    {
        $delete_reply_query = "DELETE FROM reply_comment WHERE CommentID=$entityID;";
        try {
            $delete_reply_result = QueryExecutor::executeQuery($delete_reply_query);
        } catch (Exception $exception) {
            echo $exception->getMessage();
        }

        if ($delete_reply_result) {
            foreach ($entity as $reply) {
                $insert_reply_query = "INSERT INTO reply_comment (CommentID, Content, UserID) VALUES ('$entityID', '$reply->Content', '$reply->UserID')";

                $insert_reply_result = null;
                try {
                    $insert_reply_result = QueryExecutor::executeQuery($insert_reply_query);
                } catch (Exception $exception) {
                    echo $exception->getMessage();
                }

                if (!$insert_reply_result) {
                    return null;
                }
            }
            return true;
        }
    }

    public static function delete(int $entityID = null)
    {
        $query = "DELETE FROM comment WHERE CommentID = $entityID;";
        try {
            $result = QueryExecutor::executeQuery($query);
        } catch (Exception $exception) {
            echo $exception->getMessage();
        }

        if ($result) {
            $delete_comment_reply_query = "DELETE FROM comment_image WHERE CommentID = $entityID;";

            try {
                $delete_comment_reply_result = QueryExecutor::executeQuery($delete_comment_reply_query);
            } catch (Exception $exception) {
                echo $exception->getMessage();
            }

            $delete_comment_image_query = "DELETE FROM reply_comment WHERE CommentID = $entityID;";
            try {
                $delete_comment_image_result = QueryExecutor::executeQuery($delete_comment_image_query);
            } catch (Exception $exception) {
                echo $exception->getMessage();
            }

            if ($delete_comment_image_result && $delete_comment_reply_result) {
                return true;
            }
        }
        return null;
    }
}
