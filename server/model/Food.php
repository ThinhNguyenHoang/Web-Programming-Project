<?php
require_once PROJECT_ROOT_PATH . "/Model/BaseRepository.php";
class Food extends BaseRepository
{
    public function getFood($limit)
    {
        return $this->select("SELECT * FROM food ORDER BY FoodID ASC LIMIT ?", ["i", $limit]);
    }
}