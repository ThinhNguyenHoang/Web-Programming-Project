<?php

namespace src\bank_account\mapper;

use JetBrains\PhpStorm\Pure;
use src\bank_account\entity\BankAccount;
use \Datetime;
use src\common\utils\ResponseHelper;

require_once  __DIR__ . '/../../../vendor/autoload.php';

/**
 * Map between the entity passed in request to inmemory object
 * User Resquest  <--> User <--> Response
 */
class BankAccountMapper
{
    #[Pure] public static function mapBankAccountFromRequest($request): BankAccount
    {
        $bank_account = new BankAccount();
        $bank_account->bank_account_number = $request->bank_account_number;
        $bank_account->bank_account_owner = $request->bank_account_owner;
        $bank_account->bank_account_type = $request->bank_account_type;
        $bank_account->balance = $request->balance;
        $bank_account->valid_start = BankAccountMapper::validateDate($request->valid_start, "valid_start");
        $bank_account->valid_end = BankAccountMapper::validateDate($request->valid_end, "valid_end");
        return $bank_account;
    }

    public static function validateDate($date, $field, $format = 'Y-m-d')
    {
        $d = DateTime::createFromFormat($format, $date);
        if ($d && $d->format($format) == $date) {
            return $date;
        } else {
            ResponseHelper::error_client("Invalid " .$field. " Format");
            die();
        }
    }
}
