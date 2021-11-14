<?php

namespace src\food\repository;

require_once  __DIR__ . '/../../../vendor/autoload.php';

//// generate json web token
//include_once 'libs/php-jwt-master/src/BeforeValidException.php';
//include_once 'libs/php-jwt-master/src/ExpiredException.php';
//include_once 'libs/php-jwt-master/src/SignatureInvalidException.php';
//include_once 'libs/php-jwt-master/src/JWT.php';

use Exception;
use \Firebase\JWT\JWT;
use Food;
use http\Env\Request;
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
    /**
     */
    public static function create($entity = null): \mysqli_result|bool|null
    {
        $query = "INSERT INTO material VALUES('$entity->MaterialID','$entity->MaterialName')";
        try {
            return QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage(), 0);
            return null;
        }
    }

    public static function insertMakeBy(int $FoodID, int $MaterialID): \mysqli_result|bool|null {
        $query = "INSERT INTO makeby VALUES('$MaterialID','$FoodID')";
        try {
            return QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage(), 0);
            return null;
        }
    }
    
    public static function read(int $entityID = null)
    {
        $query = "SELECT * FROM USER_ACCOUNT WHERE ID=$entityID";
        $row = QueryExecutor::executeQuery($query);
        if (!$row) {
            // Throw error return error message for client to display
            echo "Something has gone wrong when reading food with id: $entityID! ";
        }
        $return = $row->fetch_object($class = "FoodAccount");
        return deep_copy($return);
    }

    public static function update(int $entityID = null, object $entity = null)
    {
        $query = "UPDATE USER_ACCOUNT SET USERNAME=$entity->foodname, PASSWORD=$entity->password WHERE ID=$entityID";
        return QueryExecutor::executeQuery($query);
    }

    public static function delete(int $entityID = null)
    {
        // TODO: Implement delete() method.
    }
}
