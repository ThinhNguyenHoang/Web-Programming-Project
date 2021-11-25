<?php

namespace src\transaction\controller;

use src\transaction\service\TransactionService;
use src\common\base\BaseController;
use src\common\base\RequestHandler;
use src\common\utils\RequestHelper;
use src\common\utils\ResponseHelper;

require_once  __DIR__ . '/../../../vendor/autoload.php';

class TransactionController extends BaseController implements RequestHandler
{
    /**
     * "/transaction" Endpoint 
     */
    public function handleRequest()
    {
        $method = strtolower(RequestHelper::getRequestMethod());
        error_log("Transaction controller::METHOD::" . $method);
        $relative_path = RequestHelper::get_ith_path_item(1);
        switch ($method) {
            case "get":
                $token = RequestHelper::validate_jwt_token();
                if ($relative_path == null) {
                    error_log("TRANSACTION_CONTROLLER::GET TRANSACTION ENDPOINT::" . $relative_path);
                    TransactionService::getTransactionList();
                } else if (is_numeric($relative_path)) {
                    error_log("TRANSACTION_CONTROLLER::GET TRANSACTION BY ID ENDPOINT::" . $relative_path);
                    TransactionService::getTransactionByID($relative_path);
                } else {
                    ResponseHelper::error_client("Invalid path in transaction endpoint");
                }
                break;
            case "post":
                $token = RequestHelper::validate_jwt_token();
                if ($relative_path == null) {
                    error_log("TRANSACTION_CONTROLLER::ADD TRANSACTION ENDPOINT::" . $relative_path);
                    TransactionService::addTransaction();
                } else {
                    ResponseHelper::error_client("Invalid path in transaction endpoint");
                }
                break;
            default:
                return false;
        }
    }
}
