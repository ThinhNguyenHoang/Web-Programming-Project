<?php

namespace src\food\controller;

use http\Client\Curl\User;
use src\common\base\BaseController;
use src\common\base\RequestHandler;
use src\common\utils\RequestHelper;
use src\common\utils\ResponseHelper;
use src\food\dto\FoodRegisterRequest;
use src\food\service\FoodService;

require_once  __DIR__ . '/../../../vendor/autoload.php';

class FoodController extends BaseController implements RequestHandler
{
    /**
     * "/food/list" Endpoint - Get list of foods
     */
    public function handleRequest(){
        $method = strtolower(RequestHelper::getRequestMethod());
        error_log("Food controller::METHOD::" . $method);
        $relative_path = RequestHelper::get_ith_path_item(1);
        switch($method){
            case "get":
                if($relative_path == null){
                    FoodService::getFoodList();
                }
                break;
            case "post":
                switch ($relative_path){
                    case "add-food":
                        error_log("FOOD_CONTROLLER::ADD FOOD ENDPOINT::" . $relative_path);
                        FoodService::addFood();
                        break;
                    case "add-combo":
                        error_log("FOOD_CONTROLLER::ADD COMBO ENDPOINT::" . $relative_path);
                        FoodService::addCombo();
                        break;
                    case "add-material":
                        error_log("FOOD_CONTROLLER::ADD MATERIAL ENDPOINT::" . $relative_path);
                        FoodService::addMaterial();
                        break;
                    default:
                        ResponseHelper::error_client("Invalid path in user endpoint");
                }
                break;
            case "put":
                switch($relative_path){
                    case "bank-account":
                        FoodService::registerUser();
                        break;
                    case null:
                        FoodService::updateUserAccount();
                        break;
                    case "change-password":
                        FoodService::setNewPassword();
                        break;
                    default:
                        ResponseHelper::error_client("Invalid parameter");
                }
                break;
            case "delete":
                switch ($relative_path){
                    case "bank-account":
                        FoodService::updateUserAccount();
                        break;
                    case null:
                        FoodService::removeUserAccount();
                        break;
                    default:
                        ResponseHelper::error_client("Invalid parameter");
                };
                break;
            default:
                return false;
        }
    }
    public function listAction()
    {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $arrQueryStringParams = $this->getQueryStringParams();

        if (strtoupper($requestMethod) == 'GET') {
            try {
                $food = new Food();

                $intLimit = 10;
                $id = "-1";
                if (isset($arrQueryStringParams['limit']) && $arrQueryStringParams['limit']) {
                    $intLimit = $arrQueryStringParams['limit'];
                    $arrFoods = $food->getFood($intLimit);
                    $responseData = json_encode($arrFoods);
                } else if (isset($arrQueryStringParams['id']) && $arrQueryStringParams['id']) {
                    $id = $arrQueryStringParams['id'];
                    $arrFoods = $food->getFoodByID($id);
                    $responseData = json_encode($arrFoods);
                } else {
                    $arrFoods = $food->getFood($intLimit);
                    $responseData = json_encode($arrFoods);
                }
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage() . 'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }

        // send output
        if (!$strErrorDesc) {
            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            $this->sendOutput(
                json_encode(array('error' => $strErrorDesc)),
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }

    /**
     * "/food/create" Endpoint - create food to database
     */
    public function createAction()
    {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        if (strtoupper($requestMethod) == 'PUT') {
            try {
                // required headers
                header("Access-Control-Allow-Origin: *");
                header("Content-Type: application/json; charset=UTF-8");
                header("Access-Control-Allow-Methods: POST");
                header("Access-Control-Max-Age: 3600");
                header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

                $food = new Food();
                // get posted data
                $data = json_decode(file_get_contents("php://input"));

                // make sure data is not empty
                if (
                    !empty($data->FoodID) &&
                    !empty($data->FoodName) &&
                    !empty($data->Picture) &&
                    !empty($data->FoodPrice) &&
                    !empty($data->Description)
                ) {
                    // set food property values
                    $food->FoodID = $data->FoodID;
                    $food->FoodName = $data->FoodName;
                    $food->Picture = $data->Picture;
                    $food->FoodPrice = $data->FoodPrice;
                }   
                // tell the user data is incomplete
                else {

                    // set response code - 400 bad request
                    http_response_code(400);

                    // tell the user
                    echo json_encode(array("message" => "Unable to create product. Data is incomplete."));
                }
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage() . 'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }
    }
}
