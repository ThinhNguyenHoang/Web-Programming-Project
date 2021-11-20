<?php

namespace src\voucher\entity;

require_once  __DIR__ . '/../../../vendor/autoload.php';

class Voucher
{
    public $VoucherID;
    public $ExpirationDate;
    public $Description;
    public $VoucherName;
    public $UserID;

    /**
     * Voucher constructor.
     */
    public function __construct($VoucherID = 0, $ExpirationDate = "", $Description="", $VoucherName="", $UserID="")
    {
        $this->VoucherID = $VoucherID;
        $this->ExpirationDate = $ExpirationDate;
        $this->Description = $Description;
        $this->VoucherName = $VoucherName;
        $this->UserID = $UserID;
    }
}
