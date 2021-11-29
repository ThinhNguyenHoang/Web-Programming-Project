<?php

namespace src\voucher\mapper;

use JetBrains\PhpStorm\Pure;
use src\voucher\entity\Voucher;
use \Datetime;
use src\common\utils\ResponseHelper;

require_once  __DIR__ . '/../../../vendor/autoload.php';

/**
 * Map between the entity passed in request to inmemory object
 * User Resquest  <--> User <--> Response
 */
class VoucherMapper
{

    // Map a voucher create request body to in memory user r
    #[Pure] public static function mapVoucherFromRequest($request): Voucher
    {
        $voucher = new Voucher();
        $voucher->ExpirationDate  = VoucherMapper::validateDate($request->ExpirationDate);
        $voucher->VoucherName = $request->VoucherName;
        $voucher->Description = $request->Description;
        $voucher->UserID = $request->UserID;
        $voucher->SalePercent = $request->SalePercent;
        return $voucher;
    }

    public static function validateDate($date, $format = 'Y-m-d')
    {
        $d = DateTime::createFromFormat($format, $date);
        if ($d && $d->format($format) == $date) {
            return $date;
        } else {
            ResponseHelper::error_client("Invalid ExpirationDate Format");
            die();
        }
    }
}
