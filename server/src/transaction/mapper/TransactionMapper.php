<?php

namespace src\transaction\mapper;

use JetBrains\PhpStorm\Pure;
use src\transaction\entity\Transaction;
use src\common\utils\ResponseHelper;

require_once  __DIR__ . '/../../../vendor/autoload.php';

/**
 * Map between the entity passed in request to inmemory object
 * User Resquest  <--> User <--> Response
 */
class TransactionMapper
{
    #[Pure] public static function mapTransactionFromRequest($request): Transaction
    {
        $transaction = new Transaction();
        date_default_timezone_set('Asia/Saigon');
        $transaction->time= date("Y/m/d H:i:s");
        $transaction->bank_account_number = $request->bank_account_number;
        $transaction->description = $request->description;
        $transaction->amount = $request->amount;
        $transaction->order_id = $request->order_id;
        $transaction->user_id = $request->user_id;
        return $transaction;
    }
}
