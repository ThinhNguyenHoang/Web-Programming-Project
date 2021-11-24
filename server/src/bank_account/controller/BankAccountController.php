<?php

namespace src\bank_account\controller;

use src\bank_account\service\BankAccountService;
use src\common\base\BaseController;
use src\common\base\RequestHandler;
use src\common\utils\RequestHelper;
use src\common\utils\ResponseHelper;

require_once  __DIR__ . '/../../../vendor/autoload.php';

class BankAccountController extends BaseController implements RequestHandler
{
    /**
     * "/bank_accout" Endpoint 
     */
    public function handleRequest()
    {
        $method = strtolower(RequestHelper::getRequestMethod());
        error_log("Bank Account controller::METHOD::" . $method);
        $relative_path = RequestHelper::get_ith_path_item(1);
        switch ($method) {
            case "get":
                $token = RequestHelper::validate_jwt_token();
                if ($relative_path == null) {
                    error_log("BANK_ACCOUNT_CONTROLLER::GET BANK ACCOUNT ENDPOINT::" . $relative_path);
                    BankAccountService::getBankAccountList();
                } else if (is_numeric($relative_path)) {
                    error_log("BANK_ACCOUNT_CONTROLLER::GET BANK ACCOUNT BY ID ENDPOINT::" . $relative_path);
                    BankAccountService::getBankAccountByID($relative_path);
                } else {
                    ResponseHelper::error_client("Invalid path in bank_account endpoint");
                }
                break;
            case "post":
                $token = RequestHelper::validate_jwt_token();
                if ($relative_path == null) {
                    error_log("BANK_ACCOUNT_CONTROLLER::ADD BANK ACCOUNT ENDPOINT::" . $relative_path);
                    BankAccountService::addBankAccount();
                } else {
                    ResponseHelper::error_client("Invalid path in bank_account endpoint");
                }
                break;
            case "put":
                $token = RequestHelper::validate_jwt_token();
                if (is_numeric($relative_path)) {
                    error_log("BANK_ACCOUNT_CONTROLLER::UPDATE BANK ACCOUNT ENDPOINT::" . $relative_path);
                    BankAccountService::updateBankAccount($relative_path);
                } else {
                    ResponseHelper::error_client("Invalid path in bank_account endpoint");
                }
                break;
            case "delete":
                if (is_numeric($relative_path)) {
                    error_log("BANK_ACCOUNT_CONTROLLER::DELETE BANK ACCOUNT ENDPOINT::" . $relative_path);
                    BankAccountService::deleteBankAccount($relative_path);
                } else {
                    ResponseHelper::error_client("Invalid path in bank_account endpoint");
                }
                break;
            default:
                return false;
        }
    }
}
