<?php
namespace src\user\dto;
require_once  __DIR__ . '../../../vendor/autoload.php';

class UserSignOutRequest
{
    public string $username;
}