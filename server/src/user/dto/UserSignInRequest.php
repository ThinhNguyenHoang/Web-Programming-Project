<?php
namespace src\user\dto;
require_once  __DIR__ . '../../../vendor/autoload.php';

class UserSignInRequest
{
    public string $username;
    public string $password;
}