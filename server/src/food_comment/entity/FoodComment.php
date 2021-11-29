<?php

namespace src\food_comment\entity;

require_once  __DIR__ . '/../../../vendor/autoload.php';

class FoodComment
{
    public $FoodID;
    public $Content;
    public $ImageList;

    /**
     * Food constructor.
     */
    public function __construct(int $FoodID = 0, string $Content = "")
    {
        $this->FoodID = $FoodID;
        $this->Content = $Content;  
    }
}
