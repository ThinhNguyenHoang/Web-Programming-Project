<?php
namespace src\user\mapper;
use JetBrains\PhpStorm\Pure;
use src\user\dto\UserRegisterRequest;
use src\user\entity\BankAccount;
use src\user\entity\UserAccount;

require_once  __DIR__ . '/../../../vendor/autoload.php';

/**
 * Map between the entity passed in request to inmemory object
 * User Resquest  <--> User <--> Response
 */
class UserMapper
{
    // * Map User from database
    public static function mapUserFromDatabaseResult($result): ?object{
        $row = $result->fetch_array(MYSQLI_ASSOC);
        if(!$row) return null;
        return (object) array(
            "id" => $row["id"],
            "username" => $row["username"],
            "password" => $row["password"],
            "role" => $row["role"],
        );
    }
    // * Map User from database
    public static function mapUserProfileFromResult($result): ?object{
        $row = $result->fetch_array(MYSQLI_ASSOC);
        error_log("USER_PROFILE_FOUDN:" . json_encode($row), 0);
        if (!$row) {
            return null;
        }
        return (object) array(
            "id" => $row["id"],
            "account_id" => $row["account_id"],
            "dob" => $row["dob"],
            "email" => $row["email"],
            "point" => $row["point"],
            "address" => $row["address"],
            "phone_number" => $row["phone_number"],
            "full_name" => $row["full_name"],
        );
    }

    public static function mapBankAccountFromDatabaseRow($row): object
    {
        return (object) array(
            "id" => $row["id"],
        );
    }
    // Map a user create request body to in memory user r
    #[Pure] public static function mapUserAccountFromRegisterRequest($request): UserAccount{
        $user = new UserAccount();
        $user->username = $request->username;
        $user->password = $request->password;
        return $user;
    }
    // Map a user create request body to in memory user r
    #[Pure] public static function mapBankAccountFromRegisterRequest($request): BankAccount{
        $object = new BankAccount();

        $object->id = $request->user_id;
        $object->bankAccountType = $request->bank_account_type;
        $object->cardHolderName = $request->card_holder_name;
        $object->cardNumber = $request->card_number;
        $object->cardValidTimeEnd = $request->card_valid_time_start;
        $object->cardValidTimeStart = $request->card_valid_time_end;
        $object->userBalance = $request->user_balance;
        return $object;
    }
    // Map a request containing user account to User
    #[Pure] public static function mapUserAccountFromRequest($request): UserAccount
    {
        $user = new UserAccount();
        $user->username = $request->username;
        $user->password = $request->password;
        return $user;
    }
    // Map a User object to response body for client
    public static function mapUserToResponse($user){
        $response = "response object";
        return $response;
    }
    #[Pure] public static function mapUserAccountFromSignInRequest($request): UserAccount{
        $user = new UserAccount();
        $user->username = $request->username;
        $user->password = $request->password;
        return $user;
    }
}