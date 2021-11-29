<?php

namespace src\voucher\controller;

use src\common\base\BaseController;
use src\common\base\RequestHandler;
use src\common\utils\RequestHelper;
use src\common\utils\ResponseHelper;
use src\voucher\service\VoucherService;

require_once  __DIR__ . '/../../../vendor/autoload.php';

class VoucherController extends BaseController implements RequestHandler
{
    /**
     * "/voucher" Endpoint - Get list of vouchers
     */
    public function handleRequest()
    {
        $method = strtolower(RequestHelper::getRequestMethod());
        error_log("Voucher controller::METHOD::" . $method);
        $relative_path = RequestHelper::get_ith_path_item(1);
        switch ($method) {
            case "get":
                $token = RequestHelper::validate_jwt_token();
                if ($relative_path == null) {
                    error_log("VOUCHER_CONTROLLER::GET VOUCHER ENDPOINT::" . $relative_path);
                    VoucherService::getVoucherList();
                } else if (is_numeric($relative_path)) {
                    error_log("VOUCHER_CONTROLLER::GET VOUCHER BY ID ENDPOINT::" . $relative_path);
                    VoucherService::getVoucherByID($relative_path);
                } else {
                    ResponseHelper::error_client("Invalid path in voucher endpoint");
                }
                break;
            case "post":
                $token = RequestHelper::validate_jwt_token();
                if ($relative_path == null) {
                    if (!RequestHelper::isAdminPrivilege()) {
                        ResponseHelper::error_client("Khong co quyen truy cap");
                        return;
                    }
                    error_log("VOUCHER_CONTROLLER::ADD VOUCHER ENDPOINT::" . $relative_path);
                    VoucherService::addVoucher();
                } else {
                    ResponseHelper::error_client("Invalid path in voucher endpoint");
                }
                break;
            case "put":
                $token = RequestHelper::validate_jwt_token();
                if (is_numeric($relative_path)) {
                    if (!RequestHelper::isAdminPrivilege()) {
                        ResponseHelper::error_client("Khong co quyen truy cap");
                        return;
                    }
                    error_log("VOUCHER_CONTROLLER::UPDATE VOUCHER ENDPOINT::" . $relative_path);
                    VoucherService::updateVoucher($relative_path);
                } else {
                    ResponseHelper::error_client("Invalid path in voucher endpoint");
                }
                break;
            case "delete":
                $token = RequestHelper::validate_jwt_token();
                if (is_numeric($relative_path)) {
                    if (!RequestHelper::isAdminPrivilege()) {
                        ResponseHelper::error_client("Khong co quyen truy cap");
                        return;
                    }
                    error_log("VOUCHER_CONTROLLER::DELETE VOUCHER ENDPOINT::" . $relative_path);
                    VoucherService::deleteVoucher($relative_path);
                } else {
                    ResponseHelper::error_client("Invalid path in voucher endpoint");
                }
                break;
            default:
                return false;
        }
    }
}
