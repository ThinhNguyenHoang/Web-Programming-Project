<?php

namespace src\transaction\service;

use src\common\utils\QueryExecutor;
use src\common\utils\RequestHelper;
use src\common\utils\ResponseHelper;
use src\transaction\entity\Transaction;
use src\transaction\mapper\TransactionMapper;
use src\transaction\message\TransactionMessage;
use src\transaction\repository\TransactionRepository;
use src\bank_account\service\BankAccountService;

require_once  __DIR__ . '/../../../vendor/autoload.php';

/**
 * Define operation that can be done related to the entity
 * Xu ly request : 3 khuc
 * 1. Parse request --> lay param
 * 2. Xu ly backend
 * 3. Tra ve response cho client
 */
class TransactionService
{
    public static function getTransactionList()
    {
        ResponseHelper::success(TransactionMessage::getMessages()->readSuccess, TransactionRepository::listTransaction());
    }

    public static function getTransactionByID($id)
    {
        // Find tag with the FoodID in database
        $transaction_found = TransactionRepository::findTransactionByID($id);
        if (!$transaction_found) {
            // Throw error notifying FoodID already taken
            ResponseHelper::error_client("id doesn't exist");
            die();
        }
        ResponseHelper::success(TransactionMessage::getMessages()->readSuccess, $transaction_found);
    }

    public static function addTransaction()
    {
        $request = RequestHelper::getRequestBody();

        error_log("Adding transaction: get request body", 0);

        //Map Transaction from request
        error_log("Adding transaction: Map Transaction entity from request", 0);
        $transaction = TransactionMapper::mapTransactionFromRequest($request);

        if (BankAccountService::checkBankAccountBallance($transaction->bank_account_number, $transaction->amount)) {
            $result = TransactionRepository::create($transaction);
    
            error_log("Adding transaction: Insert to database", 0);
    
            if ($result) {
                $transaction->id = QueryExecutor::getLastInsertID();
                error_log("Adding transaction: " . json_encode($transaction), 0);

                BankAccountService::reduceBankAccountBalance($transaction->bank_account_number, $transaction->amount);
    
                ResponseHelper::success(TransactionMessage::getMessages()->createSuccess, $transaction);
                return;
            }
        } else {
            ResponseHelper::error_client("Deo du tien ban eii");
            die();
        }

        ResponseHelper::error_server(TransactionMessage::getMessages()->createError);
        return;
    }
}
