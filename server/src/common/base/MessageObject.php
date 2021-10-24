<?php

namespace src\common\base;
require_once  __DIR__ . '../../../vendor/autoload.php';

class MessageObject
{
    public string $createSuccess;
    public string $createError;
    public string $readSuccess;
    public string $readError;
    public string $updateSuccess;
    public string $updateError;
    public string $deleteSuccess;
    public string $deleteError;

    public function __construct($createSuccess, $createError, $readSuccess, $readError, $updateSuccess, $updateError, $deleteSuccess, $deleteError)
    {
        $this->createSuccess = $createSuccess;
        $this->createError = $createError;

        $this->readSuccess = $readSuccess;
        $this->readError = $readError;

        $this->updateSuccess = $updateSuccess;
        $this->updateError = $updateError;

        $this->deleteSuccess = $deleteSuccess;
        $this->deleteError= $deleteError;
    }
}