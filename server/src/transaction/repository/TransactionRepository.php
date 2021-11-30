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
use src\food\repository\FoodRepository;
use src\combo\repository\ComboRepository;
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
                        transaction.user_id, user_account.Username AS userName, transaction.sale_percent
                        FROM transaction AS transaction INNER JOIN user_account AS user_account
                        ON user_account.Id=transaction.user_id ORDER BY transaction.id;";
        } else {
            $UserID = RequestHelper::getUserIDFromToken();
            $query = "SELECT transaction.id, transaction.time, transaction.description, transaction.amount, transaction.sale_percent
                        FROM transaction AS transaction WHERE user_id=$UserID ORDER BY id;";
        }
        $result = null;
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
            $row["food_list"] = self::getFoodTransaction($row["id"]);
            $row["combo_list"] = self::getComboTransaction($row["id"]);
            array_push($list_transaction, $row);
        }

        error_log("BANK_ACCOUNT_REPOSITORY::FETCH_LIST::", 0);
        return $list_transaction;
    }

    public static function getComboTransaction($TransactionID)
    {
        $query = "SELECT * FROM contains WHERE TransactionID=$TransactionID AND ComboID!=0";

        $result = null;
        try {
            $result = QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
        $list_combo = array();
        if ($result) {
            while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
                error_log(json_encode($row), 0);
                $combo = ComboRepository::findComboByID($row["ComboID"]);
                $combo["Quantity"] = $row["Quantity"];
                array_push($list_combo, $combo);
            }
        }
        error_log("BANK_ACCOUNT_REPOSITORY::FETCH_LIST::", 0);
        return $list_combo;
    }

    public static function getFoodTransaction($TransactionID)
    {
        $query = "SELECT * FROM contains WHERE TransactionID=$TransactionID AND FoodID!=0";

        $result = null;
        try {
            $result = QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
        $list_food = array();
        if ($result) {
            while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
                error_log(json_encode($row), 0);
                $food = FoodRepository::findFoodByID($row["FoodID"]);
                $food["Quantity"] = $row["Quantity"];
                unset($food["Comment"]);
                array_push($list_food, $food);
            }
        }
        error_log("BANK_ACCOUNT_REPOSITORY::FETCH_LIST::", 0);
        return $list_food;
    }

    public static function findTransactionByID(int $id)
    {
        if (RequestHelper::isAdminPrivilege()) {
            $query = "SELECT transaction.id, transaction.time, transaction.description, transaction.amount, 
            transaction.user_id, user_account.Username AS username, transaction.sale_percent
            FROM transaction AS transaction INNER JOIN user_account AS user_account
            ON user_account.Id=transaction.user_id WHERE transaction.id=$id;";
        } else {
            $UserID = RequestHelper::getUserIDFromToken();
            $query = "SELECT transaction.id, transaction.time, transaction.description, transaction.amount, transaction.sale_percent
            FROM transaction AS transaction WHERE id=$id AND user_id=$UserID;";
        }

        $result = null;
        try {
            $result = QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }

        if (!$result) {
            return null;
        }

        $transaction = mysqli_fetch_array($result, MYSQLI_ASSOC);
        $transaction["food_list"] = self::getFoodTransaction($transaction["id"]);
        $transaction["combo_list"] = self::getComboTransaction($transaction["id"]);
        error_log(json_encode($transaction), 0);

        error_log("TRANSACTION_REPOSITORY::FETCH_LIST::", 0);
        return $transaction;
    }

    public static function create($entity = null): \mysqli_result|bool|null
    {
        $query = "INSERT INTO transaction (time, description, amount, user_id, sale_percent)
         VALUES ('$entity->time', '$entity->description', '$entity->amount', '$entity->user_id', '$entity->sale_percent');";
        try {
            return QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage(), 0);
            return null;
        }
    }

    public static function insertFoodTransactionContain($transaction_id, $food_list)
    {
        foreach ($food_list as $food) {
            $query = "INSERT INTO contains (TransactionID, FoodID, ComboID, Quantity) VALUES ($transaction_id, $food->FoodID, 0, $food->Quantity);";

            $result = null;
            try {
                $result = QueryExecutor::executeQuery($query);
            } catch (Exception $e) {
                error_log($e->getMessage(), 0);
                return null;
            }

            if (!$result) {
                return null;
            }
        }

        return true;
    }

    public static function insertComboTransactionContain($transaction_id, $combo_list)
    {
        foreach ($combo_list as $combo) {
            $query = "INSERT INTO contains (TransactionID, FoodID, ComboID, Quantity) VALUES ($transaction_id, 0, $combo->ComboID, $combo->Quantity);";

            $result = null;
            try {
                $result = QueryExecutor::executeQuery($query);
            } catch (Exception $e) {
                error_log($e->getMessage(), 0);
                return null;
            }

            if (!$result) {
                return null;
            }
        }

        return true;
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
