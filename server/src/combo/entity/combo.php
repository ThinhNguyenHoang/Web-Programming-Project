<?php
namespace src\combo\entity;
require_once  __DIR__ . '/../../../vendor/autoload.php';

class Combo
{
    public int $ComboID;
    public string $ComboName;
    public string $ComboDescrip;
    public int $Price;

    /**
     * Combo constructor.
     */
    public function __construct(int $ComboID=0,string $ComboName="", string $ComboDescrip="", int $Price=0)
    {
        $this->ComboID= $ComboID;
        $this->ComboName = $ComboName;
        $this->ComboDescrip = $ComboDescrip;
        $this->Price = $Price;
    }
}