<?php

namespace src\wish_list\repository;

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
class WishListRepository implements Repository
{

    /**
     */
    public static function listWishList(): array
    {
        $UserID = RequestHelper::getUserIDFromToken();
        $query = "SELECT * FROM wish_list WHERE UserID='$UserID';";
        try {
            $result = QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }

        $list_voucher = array();
        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
            error_log(json_encode($row), 0);
            array_push($list_voucher, $row);
        }

        error_log("WISH_LIST_REPOSITORY::FETCH_LIST::", 0);
        return $list_voucher;
    }

    public static function findWishListByID($entityID)
    {
        $UserID = RequestHelper::getUserIDFromToken();
        $query = "SELECT * FROM wish_list WHERE WishListID=$entityID;";
        try {
            $result = QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }

        $voucher = mysqli_fetch_array($result, MYSQLI_ASSOC);
        error_log(json_encode($voucher), 0);

        error_log("VOUCHER_REPOSITORY::FETCH_BY_ID::", 0);
        return $voucher;
    }


    public static function create($entity = null): \mysqli_result|bool|null
    {
        $query = "INSERT INTO wish_list (FoodID, ComboID, UserID)
         VALUES ('$entity->FoodID', '$entity->ComboID', '$entity->UserID');";

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
        //DO Nothing
    }

    public static function delete(int $entityID = null)
    {
        $UserID = RequestHelper::getUserIDFromToken();
        $query = "DELETE FROM wish_list WHERE WishListID=$entityID AND UserID=$UserID;";
        try {
            return QueryExecutor::executeQuery($query);
        } catch (Exception $exception) {
            echo $exception->getMessage();
        }
        return null;
    }
}
