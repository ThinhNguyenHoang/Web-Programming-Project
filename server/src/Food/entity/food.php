<?php

namespace src\food\entity;

require_once  __DIR__ . '/../../../vendor/autoload.php';

class Food
{
    public int $FoodID;
    public string $FoodName;
    public $Picture;
    public int $Price;
    public string $Description;
    public $Instruct;
    public $Sale;

    /**
     * Food constructor.
     */
    public function __construct(int $FoodID = 0, string $FoodName = "", $Picture = null, int $Price = 0, string $Description = "", $Instruct = "", $Sale=0)
    {
        $this->FoodID = $FoodID;
        $this->FoodName = $FoodName;
        $this->Picture = $Picture;
        $this->Price = $Price;
        $this->Description = $Description;  
        $this->$Instruct = $Instruct;
        $this->Sale = $Sale;
    }
}