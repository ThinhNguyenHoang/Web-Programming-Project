<?php

namespace src\news_comment\entity;

require_once  __DIR__ . '/../../../vendor/autoload.php';

class NewsComment
{
    public $NewsID;
    public $Content;
    public $ImageList;

    /**
     * News constructor.
     */
    public function __construct(int $NewsID = 0, string $Content = "")
    {
        $this->NewsID = $NewsID;
        $this->Content = $Content;  
    }
}
