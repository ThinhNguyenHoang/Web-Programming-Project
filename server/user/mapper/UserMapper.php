<?php
/**
 * Map between the entity passed in request to inmemory object
 * User Resquest  <--> User <--> Response
 */
class UserMapper
{
    // Map a user create request body to in memory user r
    public static function getUserFromRegisterRequest(UserRegisterRequest $request): UserAccount{
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
    public static function getUserAccountFromSignInRequest(UserSignInRequest $request): UserAccount{
        $user = new UserAccount();
        $user->username = $request->username;
        $user->password = $request->password;
        return $user;
    }
}