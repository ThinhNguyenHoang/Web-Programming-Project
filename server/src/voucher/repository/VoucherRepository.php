<?php

namespace src\voucher\repository;

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
class VoucherRepository implements Repository
{

    /**
     */
    public static function listVoucher(): array
    {
        $UserID = RequestHelper::getUserIDFromToken();
        $query = "SELECT * FROM voucher WHERE UserID='$UserID' ORDER BY VoucherID;";
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

        error_log("VOUCHER_REPOSITORY::FETCH_LIST::", 0);
        return $list_voucher;
    }

    public static function findVoucherByID(int $VoucherID)
    {
        $UserID = RequestHelper::getUserIDFromToken();
        $query = "SELECT * FROM voucher WHERE VoucherID=$VoucherID AND UserID=$UserID;";
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
        $UserID = RequestHelper::getUserIDFromToken();
        $query = "INSERT INTO voucher (ExpirationDate, Description, VoucherName, UserID)
         VALUES ('$entity->ExpirationDate', '$entity->Description', '$entity->VoucherName', '$UserID');";

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
        $UserID = RequestHelper::getUserIDFromToken();
        $query = "UPDATE voucher SET 
                    ExpirationDate='$entity->ExpirationDate', VoucherName='$entity->VoucherName',
                    Description='$entity->Description'  WHERE VoucherID=$entityID AND UserID=$UserID;";
        try {
            return QueryExecutor::executeQuery($query);
        } catch (Exception $exception) {
            echo $exception->getMessage();
        }
        return null;
    }

    public static function delete(int $entityID = null)
    {
        $UserID = RequestHelper::getUserIDFromToken();
        $query = "DELETE FROM voucher WHERE VoucherID=$entityID AND UserID=$UserID;";
        try {
            return QueryExecutor::executeQuery($query);
        } catch (Exception $exception) {
            echo $exception->getMessage();
        }
        return null;
    }
}
