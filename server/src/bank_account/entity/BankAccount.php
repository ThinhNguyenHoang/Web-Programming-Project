<?php
namespace src\bank_account\entity;
require_once  __DIR__ . '/../../../vendor/autoload.php';

class BankAccount
{
    public $id;
    public $bank_account_number;
    public $bank_account_owner;
    public $bank_account_type;
    public $balance;
    public $valid_start;
    public $valid_end;

    /**
     * BankAccount constructor.
     */
    public function __construct($bank_account_number=0, $bank_account_owner="", $bank_account_type="", $balance=0, $valid_start="", $valid_end="")
    {
        $this->bank_account_number= $bank_account_number;
        $this->bank_account_owner = $bank_account_owner;
        $this->bank_account_type = $bank_account_type;
        $this->balance = $balance;
        $this->valid_start = $valid_start;
        $this->valid_end = $valid_end;
    }
}