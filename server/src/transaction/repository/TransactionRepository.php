<?php

namespace src\transaction\repository;

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
use src\transaction\message\TransactionMessage;
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
class TransactionRepository implements Repository
{

    /**
     */
    public static function listTransaction(): array
    {
        if (RequestHelper::isAdminPrivilege()) {
            $query = "SELECT transaction.id, transaction.time, transaction.description, transaction.amount, 
                        transaction.order_id, transaction.user_id, user_account.Username AS userName 
                        FROM transaction AS transaction
                        INNER JOIN user_account AS user_account
                        ON user_account.Id=transaction.user_id ORDER BY transaction.id;";
        } else {
            $UserID = RequestHelper::getUserIDFromToken();
            $query = "SELECT id, time, description, amount, order_id 
                    FROM transaction WHERE user_id=$UserID ORDER BY id;";
        }
        $result=null;
        try {
            $result = QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }

        if (!$result) {
            ResponseHelper::error_server("User doesn't have any transaction'");
            die();
        }

        $list_transaction = array();
        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
            error_log(json_encode($row), 0);
            array_push($list_transaction, $row);
        }

        error_log("BANK_ACCOUNT_REPOSITORY::FETCH_LIST::", 0);
        return $list_transaction;
    }

    public static function findTransactionByID(int $id)
    {
        if (RequestHelper::isAdminPrivilege()) {
            $query = "SELECT transaction.id, transaction.time, transaction.description, transaction.amount, 
                        transaction.order_id, transaction.user_id, user_account.Username AS userName 
                        FROM transaction AS transaction 
                        INNER JOIN user_account AS user_account
                        ON user_account.Id=transaction.user_id WHERE transaction.id=$id;";
        } else {
            $UserID = RequestHelper::getUserIDFromToken();
            $query = "SELECT id, time, description, amount, order_id 
                        FROM transaction WHERE id=$id AND UserID=$UserID;";
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

        $transaction = mysqli_fetch_array($result, MYSQLI_ASSOC);
        error_log(json_encode($transaction), 0);

        error_log("TRANSACTION_REPOSITORY::FETCH_LIST::", 0);
        return $transaction;
    }

    public static function create($entity = null): \mysqli_result|bool|null
    {
        $query = "INSERT INTO transaction (time, description, amount, order_id, user_id)
         VALUES ('$$entity->time', '$entity->description', '$entity->amount', '$entity->order_id', '$entity->user_id');";
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
        //DO NOTHING
    }

    public static function delete(int $entityID = null)
    {
        //DO NOTHING
    }
}
