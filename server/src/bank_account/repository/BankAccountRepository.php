<?php

namespace src\bank_account\repository;

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
use src\bank_account\message\BankAccountMessage;
use src\common\utils\ResponseHelper;

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
class BankAccountRepository implements Repository
{

    /**
     */
    public static function listBankAccount(): array
    {
        if (RequestHelper::isAdminPrivilege()) {
            $query = "SELECT * FROM bank_account ORDER BY id;";
        } else {
            $UserID = RequestHelper::getUserIDFromToken();
            $query = "SELECT * FROM bank_account WHERE user_id=$UserID ORDER BY id;";
        }
        $result=null;
        try {
            $result = QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }

        if (!$result) {
            ResponseHelper::error_server("User doesn't have any bank account'");
            die();
        }

        $list_bank_account = array();
        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
            error_log(json_encode($row), 0);
            array_push($list_bank_account, $row);
        }

        error_log("BANK_ACCOUNT_REPOSITORY::FETCH_LIST::", 0);
        return $list_bank_account;
    }

    public static function findBankAccountByID(int $id)
    {
        if (RequestHelper::isAdminPrivilege()) {
            $query = "SELECT * FROM bank_account WHERE id=$id;";
        } else {
            $UserID = RequestHelper::getUserIDFromToken();
            $query = "SELECT * FROM bank_account WHERE id=$id AND user_id=$UserID;";
        }

        $result=null;
        try {
            $result = QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }

        if (!$result) {
            return null;
        }

        $bank_account = mysqli_fetch_array($result, MYSQLI_ASSOC);
        error_log(json_encode($bank_account), 0);

        error_log("BANK_ACCOUNT_REPOSITORY::FETCH_LIST::", 0);
        return $bank_account;
    }

    public static function findBankAccountByBankAccountNumber($bank_account_number)
    {
        $UserID = RequestHelper::getUserIDFromToken();
        $query = "SELECT * FROM bank_account WHERE bank_account_number=$bank_account_number AND user_id=$UserID;";

        $result=null;
        try {
            $result = QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }

        if (!$result) {
            return null;
        }

        $bank_account = mysqli_fetch_array($result, MYSQLI_ASSOC);
        error_log(json_encode($bank_account), 0);

        error_log("BANK_ACCOUNT_REPOSITORY::FETCH_LIST::", 0);
        return $bank_account;
    }

    public static function create($entity = null): \mysqli_result|bool|null
    {
        $user_id = RequestHelper::getUserIDFromToken();
        $query = "INSERT INTO bank_account (user_id, bank_account_number, bank_account_owner, bank_account_type, balance, valid_start, valid_end)
         VALUES ('$user_id', '$entity->bank_account_number', '$entity->bank_account_owner', '$entity->bank_account_type', '$entity->balance', '$entity->valid_start', '$entity->valid_end');";
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
        $user_id = RequestHelper::getUserIDFromToken();
        $query = "UPDATE bank_account SET bank_account_number='$entity->bank_account_number', bank_account_owner='$entity->bank_account_owner', 
                bank_account_type='$entity->bank_account_type', balance='$entity->balance', valid_start='$entity->valid_start', valid_end='$entity->valid_end'
                WHERE id=$entityID AND user_id='$user_id';";
        try {
            return QueryExecutor::executeQuery($query);
        } catch (Exception $exception) {
            echo $exception->getMessage();
        }
        return null;
    }

    public static function updateBalance($bank_account_number, $balance) {
        $user_id = RequestHelper::getUserIDFromToken();
        $query = "UPDATE bank_account SET balance='$balance' WHERE bank_account_number='$bank_account_number' AND user_id=$user_id";

        try {
            return QueryExecutor::executeQuery($query);
        } catch (Exception $exception) {
            echo $exception->getMessage();
        }
        return null;
    }

    public static function delete(int $entityID = null)
    {
        $user_id = RequestHelper::getUserIDFromToken();
        $query = "DELETE FROM bank_account WHERE id=$entityID AND user_id='$user_id';";
        try {
            return QueryExecutor::executeQuery($query);
        } catch (Exception $exception) {
            echo $exception->getMessage();
        }
        return null;
    }
}
