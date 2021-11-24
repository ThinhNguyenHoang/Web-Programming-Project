<?php

namespace src\bank_account\service;

use src\common\utils\QueryExecutor;
use src\common\utils\RequestHelper;
use src\common\utils\ResponseHelper;
use src\bank_account\entity\BankAccount;
use src\bank_account\mapper\BankAccountMapper;
use src\bank_account\message\BankAccountMessage;
use src\bank_account\repository\BankAccountRepository;

require_once  __DIR__ . '/../../../vendor/autoload.php';

/**
 * Define operation that can be done related to the entity
 * Xu ly request : 3 khuc
 * 1. Parse request --> lay param
 * 2. Xu ly backend
 * 3. Tra ve response cho client
 */
class BankAccountService
{
    public static function getBankAccountList()
    {
        ResponseHelper::success(BankAccountMessage::getMessages()->readSuccess, BankAccountRepository::listBankAccount());
    }

    public static function getBankAccountByID($id)
    {
        // Find tag with the FoodID in database
        $tag_found = BankAccountRepository::findBankAccountByID($id);
        if (!$tag_found) {
            // Throw error notifying FoodID already taken
            ResponseHelper::error_client("id doesn't exist");
            die();
        }
        ResponseHelper::success(BankAccountMessage::getMessages()->readSuccess, $tag_found);
    }

    public static function addBankAccount()
    {
        $request = RequestHelper::getRequestBody();

        error_log("Adding bank account: get request body", 0);

        //Map Bank Account from request
        error_log("Adding bank account: Map Tag entity from request", 0);
        $bank_account = new BankAccount();
        $bank_account = BankAccountMapper::mapBankAccountFromRequest($request);

        $result = BankAccountRepository::create($bank_account);

        error_log("Adding bank account: Insert to database", 0);

        if ($result) {
            $bank_account->id = QueryExecutor::getLastInsertID();
            error_log("Adding bank account: " . json_encode($bank_account), 0);

            ResponseHelper::success(BankAccountMessage::getMessages()->createSuccess, $bank_account);
            return;
        }

        ResponseHelper::error_server(BankAccountMessage::getMessages()->createError);
        return;
    }

    public static function updateBankAccount($id)
    {
        $request = RequestHelper::getRequestBody();

        error_log("BANK_ACCOUNT_SERVICE::UPDATE::", 0);

        $bank_account = new BankAccount();
        $is_update_bank_account = false;

        $bank_account_found = BankAccountRepository::findBankAccountByID($id);
        if (!$bank_account_found) {
            // Throw error notifying id already taken
            ResponseHelper::error_client("id doesn't exist");
            die();
        }

        if (property_exists($request, "bank_account_number")) {
            if ($request->bank_account_number != "") {
                $bank_account->bank_account_number = $request->bank_account_number;
                $is_update_bank_account = true;
            } else {
                $bank_account->bank_account_number = $bank_account_found["bank_account_number"];
            }
        } else {
            $bank_account->bank_account_number = $bank_account_found["bank_account_number"];
        }

        if (property_exists($request, "bank_account_owner")) {
            if ($request->bank_account_owner != "") {
                $bank_account->bank_account_owner = $request->bank_account_owner;
                $is_update_bank_account = true;
            } else {
                $bank_account->bank_account_owner = $bank_account_found["bank_account_owner"];
            }
        } else {
            $bank_account->bank_account_owner = $bank_account_found["bank_account_owner"];
        }

        if (property_exists($request, "bank_account_type")) {
            if ($request->bank_account_type != "") {
                $bank_account->bank_account_type = $request->bank_account_type;
                $is_update_bank_account = true;
            } else {
                $bank_account->bank_account_type = $bank_account_found["bank_account_type"];
            }
        } else {
            $bank_account->bank_account_type = $bank_account_found["bank_account_type"];
        }

        if (property_exists($request, "balance")) {
            if ($request->balance != "") {
                $bank_account->balance = $request->balance;
                $is_update_bank_account = true;
            } else {
                $bank_account->balance = $bank_account_found["balance"];
            }
        } else {
            $bank_account->balance = $bank_account_found["balance"];
        }

        if (property_exists($request, "valid_start")) {
            if ($request->valid_start != "") {
                $bank_account->valid_start = BankAccountMapper::validateDate($request->valid_start, "valid_start");
                $is_update_bank_account = true;
            } else {
                $bank_account->valid_start = $bank_account_found["valid_start"];
            }
        } else {
            $bank_account->valid_start = $bank_account_found["valid_start"];
        }

        if (property_exists($request, "valid_end")) {
            if ($request->valid_end != "") {
                $bank_account->valid_end = BankAccountMapper::validateDate($request->valid_end, "valid_end");
                $is_update_bank_account = true;
            } else {
                $bank_account->valid_end = $bank_account_found["valid_end"];
            }
        } else {
            $bank_account->valid_end = $bank_account_found["valid_end"];
        }

        $bank_account->id = $id;

        if ($is_update_bank_account) {
            $result = BankAccountRepository::update($id, $bank_account);
        } else {
            ResponseHelper::error_client("No Feild to update");
            die();
        }

        if ($result) {
            ResponseHelper::success(BankAccountMessage::getMessages()->updateSuccess, $bank_account);
            return;
        }

        ResponseHelper::error_server(BankAccountMessage::getMessages()->updateError);
    }

    public static function deleteBankAccount($id)
    {
        error_log("BANK_ACCOUNT_SERVICE::DELETE::", 0);

        // Find bank_account with id in database
        $bank_account_found = BankAccountRepository::findBankAccountByID($id);
        if (!$bank_account_found) {
            // Throw error notifying id already taken
            ResponseHelper::error_client("id doesn't exist");
            die();
        }

        // delete bank_account
        $result = BankAccountRepository::delete($id);
        if ($result) {
            ResponseHelper::success(BankAccountMessage::getMessages()->deleteSuccess, $bank_account_found);
            return;
        }
        ResponseHelper::error_server(BankAccountMessage::getMessages()->deleteError);
    }
}
