<?php
require_once PROJECT_ROOT_PATH . "/Model/BaseRepository.php";
class Food extends BaseRepository
{
  public $FoodID;
  public $FoodName;
  public $Picture;
  public $FoodPrice;
  public $Description;
  public $ComboID;
  public $ComboName;
  public $ComboPrice;

  public function getFood($limit)
  {
    return $this->select("SELECT food.FoodID, FoodName, Picture, food.Price AS FoodPrice, Description, 
                                combo.ComboID, ComboName, combo.Price AS ComboPrice FROM food 
                              INNER JOIN includes 
                              ON food.FoodID=includes.FoodID
                              INNER JOIN combo
                              ON combo.ComboID=includes.ComboID
                              ORDER BY food.FoodID ASC LIMIT ?", ["i", $limit]);
  }

  public function getFoodByID($id)
  {
    return $this->select("SELECT food.FoodID, FoodName, Picture, food.Price AS FoodPrice, Description, 
                                combo.ComboID, ComboName, combo.Price AS ComboPrice FROM food 
                              INNER JOIN includes 
                              ON food.FoodID=includes.FoodID
                              INNER JOIN combo
                              ON combo.ComboID=includes.ComboID
                              where food.FoodID=?", ["i", $id]);
  }
}
