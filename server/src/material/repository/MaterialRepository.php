<?php

namespace src\material\repository;

require_once  __DIR__ . '/../../../vendor/autoload.php';

//// generate json web token
//include_once 'libs/php-jwt-master/src/BeforeValidException.php';
//include_once 'libs/php-jwt-master/src/ExpiredException.php';
//include_once 'libs/php-jwt-master/src/SignatureInvalidException.php';
//include_once 'libs/php-jwt-master/src/JWT.php';

use Exception;
use src\common\base\Repository;
use src\common\utils\QueryExecutor;
use function DeepCopy\deep_copy;

/**
 * Class for interaction with database
 * + Create
 * + Read by ID
 * + Read List
 * + Find by field
 * + Delete
 * + Update
 * + Fight out. Don't let it loose.
 */
class MaterialRepository implements Repository
{
    public static function listMaterial(): array
    {
        $query = "SELECT * FROM MATERIAL;";
        try {
            $result = QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
        //        $num_row = $result->num_rows;
        $list_material = array();
        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
            error_log(json_encode($row), 0);
            array_push($list_material, $row);
        }

        error_log("MATERIAL_REPOSITORY::FETCH_LIST::", 0);
        return $list_material;
    }

    public static function findMaterialByID($MaterialID)
    {
        $query = "SELECT * FROM material WHERE MaterialID = $MaterialID;";

        try {
            $result = QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
        $material = mysqli_fetch_array($result, MYSQLI_ASSOC);

        error_log(json_encode($material), 0);

        error_log("MATERIAL_REPOSITORY::FETCH_LIST::", 0);
        return $material;
    }

    /**
     */
    public static function create($entity = null): \mysqli_result|bool|null
    {
        $query = "INSERT INTO material (MaterialName, Picture) VALUES('$entity->MaterialName', '$entity->Picture');";
        try {
            return QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage(), 0);
            return null;
        }
    }

    // public static function insertMakeBy(int $FoodID, int $MaterialID): \mysqli_result|bool|null
    // {
    //     $query = "INSERT INTO makeby VALUES('$MaterialID','$FoodID');";
    //     try {
    //         return QueryExecutor::executeQuery($query);
    //     } catch (Exception $e) {
    //         error_log($e->getMessage(), 0);
    //         return null;
    //     }
    // }

    public static function read(int $entityID = null)
    {
        //DO NOTHING
    }

    public static function update(int $entityID = null, object $entity = null)
    {
        $query = "UPDATE material SET MaterialName='$entity->MaterialName', Picture='$entity->Picture' WHERE MaterialID='$entityID';";
        try {
            return QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage(), 0);
            return null;
        }
    }

    public static function delete(int $entityID = null)
    {
        $query = "DELETE FROM material WHERE MaterialID=$entityID;";
        try {
            return QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage(), 0);
            return null;
        }
    }
}
