<?php

namespace src\common\base;
require_once  __DIR__ . '../../../vendor/autoload.php';

interface RequestHandler
{
    public function handleRequest();
}