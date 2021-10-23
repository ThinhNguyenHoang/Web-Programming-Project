<?php
/**
 * Define operation that can be done related to the entity
 * Xu ly request : 3 khuc
 * 1. Parse request --> lay param
 * 2. Xu ly backend
 * 3. Tra ve response cho client
 */
class UserService
{
    private static function registerUser(UserRegisterRequest $request){
        // Find user with the username in database
        $user = UserMapper::getUserFromRegisterRequest($request);
        $user_found = UserRepository::findUserByName($user->username);
        if($user_found){
            // Throw error notifying username already taken
            echo "Username already taken. Please use another name";
        }
        $user->password = password_hash($user->password,PASSWORD_DEFAULT);
        // TODO: Should use response helper class to return the result to user
        return UserRepository::create($user);
    }

    private static function signInUser(UserSignInRequest $request){
        $user = UserMapper::getUserAccountFromSignInRequest($request);
        // Hash the password before saving in the database
        // Find user with the username in database
        $user_found = UserRepository::findUserByName($user->username);
        if(!$user_found){
            // Throw error notifying username already taken
            echo "User doesn't exist. Check again";
        }
        if(!password_verify($user->password,$user_found->password)){
            echo "Invalid Password";
            die("Invalid password. Please make sure you enter it correctly and try again");
        }
        // TODO: Generate the access token and Packetize the response and send back to client
        return true;
    }

    private static function updateUserInfo(UserUpdateRequest $request){
        // Get the user account

    }

    private static function singOutUser(){

    }
}