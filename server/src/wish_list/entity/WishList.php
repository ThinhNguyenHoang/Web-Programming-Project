<?php

namespace src\wish_list\entity;

require_once  __DIR__ . '/../../../vendor/autoload.php';

class WishList
{
    public $UserID;
    public $ComboID;
    public $FoodID;

    /**
     * Voucher constructor.
     */
    public function __construct($UserID = 0, $ComboID = "", $FoodID="")
    {
        $this->UserID = $UserID;
        $this->ComboID = $ComboID;
        $this->FoodID = $FoodID;
    }
}
