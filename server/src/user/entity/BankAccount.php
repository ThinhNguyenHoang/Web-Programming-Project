<?php
namespace src\user\entity;
require_once  __DIR__ . '../../../vendor/autoload.php';

class BankAccount
{
    public $id;
    public $userID;
    public $bankAccountType;
    public $cardNumber;
    public $cardHolderName;
    public $cardValidTimeStart;
    public $cardValidTimeEnd;
    public $userBalance;
}