<?php
namespace src\user\service;

use JetBrains\PhpStorm\NoReturn;
use src\common\config\ConnectionSingleton;
use src\common\utils\RequestHelper;
use src\common\utils\ResponseHelper;
use src\user\dto\UserRegisterRequest;
use src\user\dto\UserResponseDTO;
use src\user\dto\UserSignInRequest;
use src\user\entity\UserAccount;
use src\user\mapper\UserMapper;
use src\user\message\UserMessage;
use src\user\repository\UserRepository;

require_once  __DIR__ . '/../../../vendor/autoload.php';

/**
 * Define operation that can be done related to the entity
 * Xu ly request : 3 khuc
 * 1. Parse request --> lay param
 * 2. Xu ly backend
 * 3. Tra ve response cho client
 */
class UserService
{
    public static function getUserList(){
        $token = RequestHelper::validate_jwt_token();
        ResponseHelper::success(UserMessage::getMessages()->readSuccess,UserRepository::listUserAccount());
    }


    public static function registerUser(){
        $request = RequestHelper::getRequestBody();
        // Find user with the username in database
        error_log("Creating user: savepoint 0",0);

        $user = UserMapper::mapUserAccountFromRegisterRequest($request);
        error_log("Creating user: savepoint 0.5",0);

        $user_found = UserRepository::findUserByName($user->username);
        error_log("Creating user: savepoint 0.565" . json_encode($user_found),0);

        if($user_found){
            // Throw error notifying username already taken
            ResponseHelper::error_client("Account exist already");
            return;
        }
        error_log("Creating user: savepoint 1",0);

        // Create user account
        $user->password = password_hash($user->password,PASSWORD_DEFAULT);
        $result = UserRepository::create($user);
        if($result){
            error_log("Created User: " . json_encode($user),0);
            $user->password = "";
            ResponseHelper::success(UserMessage::getMessages()->createSuccess,$user);
            return;
        }
        ResponseHelper::error_server(UserMessage::getMessages()->createError);
        return;
//        $last_id = ConnectionSingleton::getConnection()->insert_id;
//        // Create user Bank Account
//        $request->user_id = $last_id;
//        $bank_account = UserMapper::mapBankAccountFromRegisterRequest($request);
//        // Create user profile
//        // TODO: Should use response helper class to return the result to user
    }

    #[NoReturn] public static function signInUser(){
        $request = RequestHelper::getRequestBody();
        $user = UserMapper::mapUserAccountFromSignInRequest($request);
        // Hash the password before saving in the database
        // Find user with the username in database
        $user_found = UserRepository::findUserByName($user->username);
        if(!$user_found){
            // Throw error notifying username already taken
            ResponseHelper::error_client(array("message"=>"Login Failed. User doesn't exist at all"));
            die();
        }
        if(!password_verify($user->password,$user_found->password)){
            ResponseHelper::error_client(array("message"=>"Login Failed. Password doesn't match"));
            die("Invalid password. Please make sure you enter it correctly and try again");
        }
        // TODO: Generate the access token and Packetize the response and send back to client
        $body = new \stdClass();
        $body->token=RequestHelper::generate_jwt_token($user_found);
        $body->username = $user->username;
        $body->user_profile = UserRepository::getUserProfile($user_found->id);
        error_log("LOGIN SUCCESS: " . $body->token, 0);
        error_log("LOGIN SUCCESS::USER_PROFILE:: " . $body->token, 0);
        ResponseHelper::success("Login success", $body);
        die();
    }

    public static function updateUserAccount(){
        $request = RequestHelper::getRequestBody();
        error_log("USER_SERVICE::REGISTER::" . $request,0);
        // Find user with the username in database
        $user = UserMapper::mapUserAccountFromRequest($request);
        $user_found = UserRepository::findUserByName($user->username);
        if(!$user_found){
            // Throw error notifying username already taken
            ResponseHelper::error_client("Account doesn't exist");
        }
        // Create user account
        $user->password = password_hash($user->password,PASSWORD_DEFAULT);
        $result = UserRepository::update($user_found->id,$user);
        if($result){
            ResponseHelper::success(UserMessage::getMessages()->updateSuccess,$user);
        }
        ResponseHelper::error_server(UserMessage::getMessages()->updateError);
    }

    public static function removeUserAccount(){
        $request = RequestHelper::getRequestBody();
        error_log("USER_SERVICE::REMOVE::" . $request,0);
        // Find user with the username in database
        $user = UserMapper::mapUserAccountFromRequest($request);
        $user_found = UserRepository::findUserByName($user->username);
        if(!$user_found){
            // Throw error notifying username already taken
            ResponseHelper::error_client("Account doesn't exist");
        }
        // Create user account
        $user->password = password_hash($user->password,PASSWORD_DEFAULT);
        $result = UserRepository::delete($user_found->id);
        if($result){
            ResponseHelper::success(UserMessage::getMessages()->updateSuccess,$user);
        }
        ResponseHelper::error_server(UserMessage::getMessages()->updateError);
    }
    public static function getUserBankAccounts(){
        $userID = RequestHelper::get_ith_path_item(1);
        ResponseHelper::success("getting user bank accounts success",UserRepository::listUserBankAccounts($userID));
    }

    public static function singOutUser(){

    }

    public static function renewUserToken(){
        $request = RequestHelper::getRequestBody();
        $userAccount = UserMapper::mapUserAccountFromRequest($request);
        ResponseHelper::success("token is renewed", RequestHelper::generate_jwt_token($userAccount));
    }

    public static function setNewPassword(){
        $token = RequestHelper::validate_jwt_token();
        $request = RequestHelper::getRequestBody();
        error_log("USER_SERVICE::REGISTER::" . $request,0);
        // Find user with the username in database
        $user = new \stdClass();
        $user->username = $token->data->username;
        if(!$user->username){
            error_log("USER_NAME_FROM_TOKEN:" . $user->username,0);
            die();
        }
        $user_found = UserRepository::findUserByName($user->username);
        if(!$user_found){
            // Throw error notifying username already taken
            ResponseHelper::error_client("Account doesn't exist");
        }
        // Create user account
        $user->password = password_hash($request->password,PASSWORD_DEFAULT);
        $result = UserRepository::update($user_found->id,$user);
        if($result){
            ResponseHelper::success(UserMessage::getMessages()->updateSuccess,$user);
        }
        ResponseHelper::error_server(UserMessage::getMessages()->updateError);
    }
}