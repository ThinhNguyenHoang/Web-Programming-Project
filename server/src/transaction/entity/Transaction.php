<?php
namespace src\transaction\entity;
require_once  __DIR__ . '/../../../vendor/autoload.php';

class Transaction
{
    public $bank_account_number;
    public $time;
    public $description;
    public $amount;
    public $voucher_id;
    public $user_id;

    /**
     * Transaction constructor.
     */
    public function __construct($bank_account_number="", $description="", $amount=0, $voucher_id=0, $user_id=0)
    {
        date_default_timezone_set('Asia/Saigon');
        $this->time= date("Y/m/d H:i:s");
        $this->description = $description;
        $this->amount = $amount;
        $this->voucher_id = $voucher_id;
        $this->user_id = $user_id;
        $this->bank_account_number = $bank_account_number;
    }
}