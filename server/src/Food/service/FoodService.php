<?php

namespace src\food\service;

use JetBrains\PhpStorm\NoReturn;
use src\common\config\ConnectionSingleton;
use src\common\utils\RequestHelper;
use src\common\utils\ResponseHelper;
use src\food\dto\FoodRegisterRequest;
use src\food\dto\FoodResponseDTO;
use src\food\dto\FoodSignInRequest;
use src\food\entity\FoodAccount;
use src\food\mapper\FoodMapper;
use src\food\message\FoodMessage;
use src\food\repository\FoodRepository;

require_once  __DIR__ . '/../../../vendor/autoload.php';

/**
 * Define operation that can be done related to the entity
 * Xu ly request : 3 khuc
 * 1. Parse request --> lay param
 * 2. Xu ly backend
 * 3. Tra ve response cho client
 */
class FoodService
{
    public static function getFoodList()
    {
        $token = RequestHelper::validate_jwt_token();
        ResponseHelper::success(FoodMessage::getMessages()->readSuccess, FoodRepository::listFoodAccount());
    }

    public static function addFood()
    {
    }

    public static function addCombo()
    {
    }
    public static function addMaterial()
    {
    }

    #[NoReturn] public static function signInFood()
    {
        $request = RequestHelper::getRequestBody();
        $food = FoodMapper::mapFoodAccountFromSignInRequest($request);
        // Hash the password before saving in the database
        // Find food with the foodname in database
        $food_found = FoodRepository::findFoodByName($food->foodname);
        if (!$food_found) {
            // Throw error notifying foodname already taken
            ResponseHelper::error_client(array("message" => "Login Failed. Food doesn't exist at all"));
            die();
        }
        if (!password_verify($food->password, $food_found->password)) {
            ResponseHelper::error_client(array("message" => "Login Failed. Password doesn't match"));
            die("Invalid password. Please make sure you enter it correctly and try again");
        }
        // TODO: Generate the access token and Packetize the response and send back to client
        $body = new \stdClass();
        $body->token = RequestHelper::generate_jwt_token($food_found);
        $body->food_profile = FoodRepository::getFoodProfile($food_found->id);
        error_log("LOGIN SUCCESS: " . $body->token, 0);
        ResponseHelper::success("Login success", $body);
        die();
    }

    public static function updateFoodAccount()
    {
        $request = RequestHelper::getRequestBody();
        error_log("USER_SERVICE::REGISTER::" . $request, 0);
        // Find food with the foodname in database
        $food = FoodMapper::mapFoodAccountFromRequest($request);
        $food_found = FoodRepository::findFoodByName($food->foodname);
        if (!$food_found) {
            // Throw error notifying foodname already taken
            ResponseHelper::error_client("Account doesn't exist");
        }
        // Create food account
        $food->password = password_hash($food->password, PASSWORD_DEFAULT);
        $result = FoodRepository::update($food_found->id, $food);
        if ($result) {
            ResponseHelper::success(FoodMessage::getMessages()->updateSuccess, $food);
        }
        ResponseHelper::error_server(FoodMessage::getMessages()->updateError);
    }

    public static function removeFoodAccount()
    {
        $request = RequestHelper::getRequestBody();
        error_log("USER_SERVICE::REMOVE::" . $request, 0);
        // Find food with the foodname in database
        $food = FoodMapper::mapFoodAccountFromRequest($request);
        $food_found = FoodRepository::findFoodByName($food->foodname);
        if (!$food_found) {
            // Throw error notifying foodname already taken
            ResponseHelper::error_client("Account doesn't exist");
        }
        // Create food account
        $food->password = password_hash($food->password, PASSWORD_DEFAULT);
        $result = FoodRepository::delete($food_found->id);
        if ($result) {
            ResponseHelper::success(FoodMessage::getMessages()->updateSuccess, $food);
        }
        ResponseHelper::error_server(FoodMessage::getMessages()->updateError);
    }

    public static function singOutFood()
    {
    }

    public static function renewFoodToken()
    {
        $request = RequestHelper::getRequestBody();
        $foodAccount = FoodMapper::mapFoodAccountFromRequest($request);
        ResponseHelper::success("token is renewed", RequestHelper::generate_jwt_token($foodAccount));
    }

    public static function setNewPassword()
    {
        $token = RequestHelper::validate_jwt_token();
        $request = RequestHelper::getRequestBody();
        error_log("USER_SERVICE::REGISTER::" . $request, 0);
        // Find food with the foodname in database
        $food = new \stdClass();
        $food->foodname = $token->data->foodname;
        if (!$food->foodname) {
            error_log("USER_NAME_FROM_TOKEN:" . $food->foodname, 0);
            die();
        }
        $food_found = FoodRepository::findFoodByName($food->foodname);
        if (!$food_found) {
            // Throw error notifying foodname already taken
            ResponseHelper::error_client("Account doesn't exist");
        }
        // Create food account
        $food->password = password_hash($request->password, PASSWORD_DEFAULT);
        $result = FoodRepository::update($food_found->id, $food);
        if ($result) {
            ResponseHelper::success(FoodMessage::getMessages()->updateSuccess, $food);
        }
        ResponseHelper::error_server(FoodMessage::getMessages()->updateError);
    }
}
