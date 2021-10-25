<?php
namespace src\user\repository;

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
use src\user\entity\UserAccount;
use src\user\mapper\UserMapper;
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
class UserRepository implements Repository
{
    // Determine the latest inserted user ID --> Sequence
    public static string $table_name = "user_account";

    /**
     */
    public static function listUserAccount(): array
    {
        $query = "SELECT ID,USERNAME,PASSWORD FROM USER_ACCOUNT";
        try {
            $result = QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
//        $num_row = $result->num_rows;
        $list_user = array();
        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
            error_log(json_encode($row),0);
            array_push($list_user,$row);
        }
        error_log("USER_REPOSITORY::FETCH_LIST::",0);
        return $list_user;
    }

    public static function getLastUserId()
    {

    }


    public static function findUserByName(string $user_name): ?UserAccount
    {
        $query = "SELECT * FROM USER_ACCOUNT WHERE USERNAME=$user_name";
        try {
            $row = QueryExecutor::executeQuery($query);
            $return = $row->fetch_object($class = "UserAccount");
            return deep_copy($return);
        } catch (Exception $exception) {
            echo $exception->getMessage();
        }
        return null;
    }

    /**
     * @param UserAccount|null $entity
     */
    public static function create($entity = null)
    {
        $query = "INSERT INTO USER_ACCOUNT(Username,Password) VALUES($entity->username,$entity->password)";
        return QueryExecutor::executeQuery($query);
    }

    public static function read(int $entityID = null)
    {
        $query = "SELECT * FROM USER_ACCOUNT WHERE ID=$entityID";
        $row = QueryExecutor::executeQuery($query);
        if (!$row) {
            // Throw error return error message for client to display
            echo "Something has gone wrong when reading user with id: $entityID! ";
        }
        $return = $row->fetch_object($class = "UserAccount");
        return deep_copy($return);
    }

    public static function update(int $entityID = null, object $entity = null)
    {
        $query = "UPDATE USER_ACCOUNT SET USERNAME=$entity->username, PASSWORD=$entity->password WHERE ID=$entityID";
        return QueryExecutor::executeQuery($query);
    }

    public static function delete(int $entityID = null)
    {
        // TODO: Implement delete() method.
    }
}