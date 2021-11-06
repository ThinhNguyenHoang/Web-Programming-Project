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
use http\Env\Request;
use src\common\base\Repository;
use src\common\config\ConnectionSingleton;
use src\common\utils\QueryExecutor;
use src\common\utils\RequestHelper;
use src\food\entity\FoodAccount;
use src\food\mapper\FoodMapper;
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
class FoodRepository implements Repository
{
    // Determine the latest inserted food ID --> Sequence
    public static string $table_name = "food_account";

    /**
     */
    public static function listFoodAccount(): array
    {
        $query = "SELECT ID,USERNAME,PASSWORD FROM food";
        try {
            $result = QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
//        $num_row = $result->num_rows;
        $list_food = array();
        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
            error_log(json_encode($row),0);
            array_push($list_food,$row);
        }
        error_log("USER_REPOSITORY::FETCH_LIST::",0);
        return $list_food;
    }

    public static function getLastFoodId()
    {

    }


    public static function findFoodByName(string $food_name): ?FoodAccount
    {
        $query = "SELECT * FROM USER_ACCOUNT WHERE USERNAME=$food_name";
        try {
            $row = QueryExecutor::executeQuery($query);
            $return = $row->fetch_object($class = "FoodAccount");
            return deep_copy($return);
        } catch (Exception $exception) {
            echo $exception->getMessage();
        }
        return null;
    }

    /**
     * @param FoodAccount|null $entity
     */
    public static function create($entity = null)
    {
        $query = "INSERT INTO USER_ACCOUNT(Foodname,Password) VALUES($entity->foodname,$entity->password)";
        return QueryExecutor::executeQuery($query);
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