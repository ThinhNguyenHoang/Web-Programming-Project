<?php

namespace src\news\entity;

require_once  __DIR__ . '/../../../vendor/autoload.php';

class News
{
    public $NewsID;
    public $Title;
    public $Picture;
    public $Highlight;
    public $Content;
    public $Author;

    /**
     * News constructor.
     */
    public function __construct($NewsID = 0, $Title = "", $Picture = "", $Highlight = "", $Content = "", $Author = "")
    {
        $this->NewsID = $NewsID;
        $this->Title = $Title;
        $this->Picture = $Picture;
        $this->Highlight = $Highlight;
        $this->Content = $Content;  
        $this->$Author = $Author;
    }
}
