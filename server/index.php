<?php
require __DIR__ . "/inc/bootstrap.php";

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);

$endpoint = array('food');


$request = $uri;
// TODO: Parse the token for protected endpoints before assigning the request to the controller

if ((isset($uri[2]) && !in_array($uri[2], $endpoint))) {
    header("HTTP/1.1 404 Not Found");
    exit(1);
}

require PROJECT_ROOT_PATH . "/Controller/Api/FoodController.php";

// TODO: Thịnh thêm code xác thực trước khi chuyển request cho các controller
switch ($uri[2]){
    case "food":
        $foodController = new FoodController();
        $foodController->handleRequest();
        break;
    case "user":
        $userController = new UserController();
        $userController->handleRequest();
        break;
    default:
        header("HTTP/1.1 404 Not Found");
        exit(1);
}
// api_endpoint = $rootUrl/user/bank_account/