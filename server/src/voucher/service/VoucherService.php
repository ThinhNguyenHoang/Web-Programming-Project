<?php

namespace src\voucher\service;

use src\common\utils\QueryExecutor;
use src\common\utils\RequestHelper;
use src\common\utils\ResponseHelper;
use src\voucher\entity\Voucher;
use src\voucher\mapper\VoucherMapper;
use src\voucher\message\VoucherMessage;
use src\voucher\repository\VoucherRepository;

require_once  __DIR__ . '/../../../vendor/autoload.php';

/**
 * Define operation that can be done related to the entity
 * Xu ly request : 3 khuc
 * 1. Parse request --> lay param
 * 2. Xu ly backend
 * 3. Tra ve response cho client
 */
class VoucherService
{
    public static function getVoucherList()
    {
        ResponseHelper::success(VoucherMessage::getMessages()->readSuccess, VoucherRepository::listVoucher());
    }

    public static function getVoucherByID($VoucherID)
    {
        // Find tag with the FoodID in database
        $voucher_found = VoucherRepository::findVoucherByID($VoucherID);
        if (!$voucher_found) {
            // Throw error notifying FoodID already taken
            ResponseHelper::error_client("FoodID doesn't exist");
            die();
        }
        ResponseHelper::success(VoucherMessage::getMessages()->readSuccess, $voucher_found);
    }

    public static function addVoucher()
    {
        $request = RequestHelper::getRequestBody();

        error_log("Adding Voucher: get request body", 0);

        //Map Voucher from request
        error_log("Adding Voucher: Map Voucher entity from request", 0);
        $voucher = VoucherMapper::mapVoucherFromRequest($request);


        $result = VoucherRepository::create($voucher);

        error_log("Adding voucher: Insert to database", 0);

        if ($result) {
            $voucher->VoucherID = QueryExecutor::getLastInsertID();
            error_log("Adding voucher: " . json_encode($voucher), 0);

            ResponseHelper::success(VoucherMessage::getMessages()->createSuccess, $voucher);
            return;
        }

        ResponseHelper::error_server(VoucherMessage::getMessages()->createError);
        return;
    }

    public static function updateVoucher($VoucherID)
    {
        $request = RequestHelper::getRequestBody();

        error_log("VOUCHER_SERVICE::UPDATE::", 0);

        $voucher = new Voucher();
        $is_update_voucher = false;

        $voucher_found = VoucherRepository::findVoucherByID($VoucherID);
        if (!$voucher_found) {
            // Throw error notifying TagID already taken
            ResponseHelper::error_client("VoucherID doesn't exist");
            die();
        }

        if (property_exists($request, "VoucherName")) {
            if ($request->VoucherName != "") {
                $voucher->VoucherName = $request->VoucherName;
                $is_update_voucher = true;
            } else {
                $voucher->VoucherName = $voucher_found["VoucherName"];
            }
        } else {
            $voucher->VoucherName = $voucher_found["VoucherName"];
        }

        if (property_exists($request, "Description")) {
            if ($request->Description != "") {
                $voucher->Description = $request->Description;
                $is_update_voucher = true;
            } else {
                $voucher->Description = $voucher_found["Description"];
            }
        } else {
            $voucher->Description = $voucher_found["Description"];
        }

        if (property_exists($request, "Description")) {
            if ($request->Description != "") {
                $voucher->Description = $request->Description;
                $is_update_voucher = true;
            } else {
                $voucher->Description = $voucher_found["Description"];
            }
        } else {
            $voucher->Description = $voucher_found["Description"];
        }

        if (property_exists($request, "ExpirationDate")) {
            if ($request->ExpirationDate != "") {
                $voucher->ExpirationDate = VoucherMapper::validateDate($request->ExpirationDate);
                $is_update_voucher = true;
            } else {
                $voucher->ExpirationDate = $voucher_found["ExpirationDate"];
            }
        } else {
            $voucher->ExpirationDate = $voucher_found["ExpirationDate"];
        }

        $voucher->VoucherID = $VoucherID;

        if ($is_update_voucher) {
            $result = VoucherRepository::update($VoucherID, $voucher);
        } else {
            ResponseHelper::error_client("No Feild to update");
            die();
        }

        if ($result) {
            ResponseHelper::success(VoucherMessage::getMessages()->updateSuccess, $voucher);
            return;
        }

        ResponseHelper::error_server(VoucherMessage::getMessages()->updateError);
    }

    public static function deleteVoucher($VoucherID)
    {
        error_log("TAG_SERVICE::DELETE::", 0);

        // Find tag with the VoucherID in database
        $voucher_found = VoucherRepository::findVoucherByID($VoucherID);
        if (!$voucher_found) {
            // Throw error notifying VoucherID already taken
            ResponseHelper::error_client("VoucherID doesn't exist");
            die();
        }

        // delete voucher
        $result = VoucherRepository::delete($VoucherID);
        if ($result) {
            ResponseHelper::success(VoucherMessage::getMessages()->deleteSuccess, $voucher_found);
            return;
        }
        ResponseHelper::error_server(VoucherMessage::getMessages()->deleteError);
    }
}
