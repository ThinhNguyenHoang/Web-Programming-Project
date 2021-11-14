<?php
namespace src\food\entity;
require_once  __DIR__ . '/../../../vendor/autoload.php';

class Material
{
    public int $MaterialID;
    public string $MaterialName;

    /**
     * Material constructor.
     */
    public function __construct(int $MaterialID=0,string $MaterialName="")
    {
        $this->MaterialID= $MaterialID;
        $this->MaterialName = $MaterialName;
    }
}