<?php
namespace src\user\mapper;
require_once  __DIR__ . '/../../../vendor/autoload.php';

/**
 * Map between the entity passed in request to inmemory object
 * User Resquest  <--> User <--> Response
 */
class UserMapper
{
    // * Map User from database
    public static function mapUserAccountFromDatabaseRow($row): object
    {
        return (object) array(
            "id" => $row["id"],
            "username" => $row["username"],
            "password" => $row["password"],
        );
    }
    // Map a user create request body to in memory user r
    public static function mapUserFromRegisterRequest(UserRegisterRequest $request): UserAccount{
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
    public static function mapUserAccountFromSignInRequest(UserSignInRequest $request): UserAccount{
        $user = new UserAccount();
        $user->username = $request->username;
        $user->password = $request->password;
        return $user;
    }
}