<?php
require_once PROJECT_ROOT_PATH . "/Model/Database.php";
class Food extends Database
{
    public function getFood($limit)
    {
        return $this->select("SELECT * FROM food ORDER BY FoodID ASC LIMIT ?", ["i", $limit]);
    }
}