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
use src\user\entity\BankAccount;
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
        $query = "SELECT id,username,password,role FROM USER_ACCOUNT";
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

    public static function findUserByName(string $user_name)
    {
        $query = "SELECT id,username,password,role FROM USER_ACCOUNT WHERE USERNAME='$user_name'";
        try {
            $result = QueryExecutor::executeQuery($query);
            return UserMapper::mapUserFromDatabaseResult($result);
        } catch (Exception $exception) {
            echo $exception->getMessage();
        }
        return null;
    }

    /**
     * @param UserAccount|null $entity
     */
    public static function create($entity = null): \mysqli_result|bool|null
    {
        $query = "INSERT INTO USER_ACCOUNT(Username,Password,Role) VALUES('$entity->username','$entity->password','CUSTOMER')";
        try {
            return QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage(),0);
            return null;
        }
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
        $query = "UPDATE USER_ACCOUNT SET USERNAME='$entity->username', PASSWORD='$entity->password' WHERE ID=$entityID";
        return QueryExecutor::executeQuery($query);
    }


    public static function delete(int $entityID = null)
    {
        // TODO: Implement delete() method.
        // Delete the user profile
        // Delete the user bank accounts
        // Delete the user account
        $query = "DELETE FROM USER_ACCOUNT  WHERE ID=$entityID";
        try {
            return QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            echo $e->getMessage();
        }
        return null;
    }



    public static function listUserBankAccounts($userID): array
    {
        $token = RequestHelper::validate_jwt_token();
        error_log("Token attached is: " . json_encode($token), 0);
        $query = "SELECT * FROM BANK_ACCOUNT WHERE USERID = $userID";
        try {
            $result = QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
        $list_user = array();
        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
            error_log(json_encode($row),0);
            array_push($list_user,$row);
        }
        error_log("USER_REPOSITORY::FETCH_LIST::",0);
        return $list_user;
    }

    public static function createUserBankAccount(BankAccount $bankAccountInfo=null, $userId=null): \mysqli_result|bool|null
    {
        $query = "INSERT INTO BANK_ACCOUNT(UserID,BankAccountNumber, AccountOwner, BankAccountType,Balance, ValidStart, ValidEnd)
 VALUES($bankAccountInfo->id,$bankAccountInfo->bankAccountType,$bankAccountInfo->cardHolderName,$bankAccountInfo->bankAccountType,$bankAccountInfo->userBalance,$bankAccountInfo->cardValidTimeStart,$bankAccountInfo->cardValidTimeEnd);";
        try {
            return QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage(), 0);
        }
        return null;
    }
    public static function readUserBankAccountById(int $bankAccountId): \mysqli_result|bool|null
    {
        $query = "SELECT * FROM BANK_ACCOUNT WHERE ID=$bankAccountId";
        try {
            $result = QueryExecutor::executeQuery($query);
            return QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage(), 0);
        }
        return null;
    }

    public static function findUserProfileByName(string $user_name)
    {
        $query = "SELECT select fullname as full_name,accountID as account_id, avatarURI as avatar ,dob,email,point,address,phonenumber as phone_number,role FROM user_account, user_profile WHERE user_account.Username =$user_name and user_account.Id=user_profile.AccountID;";
        try {
            $result = QueryExecutor::executeQuery($query);
            return UserMapper::mapUserProfileFromResult($result);
        } catch (Exception $exception) {
            echo $exception->getMessage();
        }
        return null;
    }

    public static function getUserProfile(int $userId) : ?object{
        $query = "select username,fullname as full_name,accountID as account_id, avatarURI as avatar ,dob,email,point,address,phonenumber as phone_number,role from user_profile, user_account where user_profile.AccountID = user_account.Id and user_account.Id = $userId";
        try {
            $result = QueryExecutor::executeQuery($query);
            return UserMapper::mapUserProfileFromResult($result);
        } catch (Exception $exception) {
            echo $exception->getMessage();
        }
        return null;
    }


    public static function updateUserProfile($user_id,$user_profile): ?object{
        $query = "UPDATE USER_PROFILE SET FULLNAME='$user_profile->full_name', DOB='$user_profile->dob', EMAIL='$user_profile->email',Address='$user_profile->address',PHONENUMBER='$user_profile->phone_number',AVATARURI='$user_profile->avatar' WHERE ACCOUNTID=$user_profile->account_id";
        try {
            $result = QueryExecutor::executeQuery($query);
            $updated_profile = self::getUserProfile($user_id);
            error_log("Updated Profile To: " . json_encode($updated_profile), 0);
            return $updated_profile;
        } catch (Exception $exception) {
            echo $exception->getMessage();
        }
        return null;
    }

}