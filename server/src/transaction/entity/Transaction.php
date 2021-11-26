<?php
namespace src\transaction\entity;
require_once  __DIR__ . '/../../../vendor/autoload.php';

class Transaction
{
    public $bank_account_number;
    public $time;
    public $description;
    public $amount;
    public $order_id;
    public $user_id;

    /**
     * Transaction constructor.
     */
    public function __construct($bank_account_number="", $description="", $amount=0, $order_id=0, $user_id=0)
    {
        date_default_timezone_set('Asia/Saigon');
        $this->time= date("Y/m/d H:i:s");
        $this->description = $description;
        $this->amount = $amount;
        $this->order_id = $order_id;
        $this->user_id = $user_id;
        $this->bank_account_number = $bank_account_number;
    }
}