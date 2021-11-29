<?php

namespace src\page_setting\repository;

require_once  __DIR__ . '/../../../vendor/autoload.php';

use Exception;
use src\common\base\Repository;
use src\common\utils\RequestHelper;
use src\common\utils\ResponseHelper;
use src\common\utils\QueryExecutor;

class PageSettingRepository implements Repository
{
    public static function getPageSetting(): array
    {
        $query = "SELECT * FROM page_setting;";
        $result = null;
        try {
            $result = QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
        //        $num_row = $result->num_rows;
        $page_setting = array();
        if ($result) {
            while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
                error_log(json_encode($row), 0);
                array_push($page_setting, $row);
            }
        }

        error_log("PAGE_SETTING_REPOSITORY::FETCH_LIST::", 0);
        return $page_setting;
    }

    /**
     */
    public static function create($entity = null)
    {
        //DO NOTHING
    }

    public static function read(int $entityID = null)
    {
        //DO NOTHING
    }

    public static function update(int $UserID = null, object $entity = null)
    {
        $query = "UPDATE page_setting SET banner='$entity->banner', logo='$entity->logo', name='$entity->name', phone='$entity->phone',
                 slogan='$entity->slogan', address='$entity->address', description='$entity->description', color='$entity->color',
                 length='$entity->length', lat='$entity->lat', facebook='$entity->facebook', mail='$entity->mail', twitter='$entity->twitter';";

        try {
            return QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage(), 0);
            return null;
        }
    }

    public static function delete(int $entityID = null)
    {
        //DO NOTHING
    }
}
