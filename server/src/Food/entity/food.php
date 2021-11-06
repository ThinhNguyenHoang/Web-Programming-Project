<?php
namespace src\food\entity;
require_once  __DIR__ . '/../../../vendor/autoload.php';

class Food
{
    public int $FoodID;
    public string $FoodName;
    public string $Picture;
    public int $Price;
    public string $Description;

    /**
     * Food constructor.
     */
    public function __construct(int $FoodID=0,string $FoodName="", string $Picture="", int $Price=0, string $Description="")
    {
        $this->FoodID= $FoodID;
        $this->FoodName = $FoodName;
        $this->Picture = $Picture;
        $this->Price = $Price;
        $this->Description = $Description;
    }
}