<?php

namespace src\tag\entity;

require_once  __DIR__ . '/../../../vendor/autoload.php';

class Tag
{
    public int $TagID;
    public string $TagName;

    /**
     * Tag constructor.
     */
    public function __construct(int $TagID = 0, string $TagName = "")
    {
        $this->TagID = $TagID;
        $this->TagName = $TagName;
    }
}