<?php
namespace src\user\entity;
require_once  __DIR__ . '../../../vendor/autoload.php';

class UserProfile{
    public string $id;
    public string $userID;
    public string $fullName;
    public string $userName;
    public string $dob;
    public string $email;
    public string $point;
    public string $bankAccountID;
    public string $address;
    public string $phoneNumber;
}