<?php
////require __DIR__ . "./common/config/bootstrap.php";
////require "./common/utils/Logger.php";
//$rootLenPosToCut = strpos(__DIR__, '/');
//$rootPath = substr(__DIR__,0,$rootLenPosToCut) . '/server';
//print_r($rootLenPosToCut);
//print_r($rootPath);
//;
////use src\common\config\RootPathGetter;
////$phpAutoloadFile = RootPathGetter::getPathToAutoLoadPHP();
////define("PROJECT_ROOT_PATH", $phpAutoloadFile);
////require_once PROJECT_ROOT_PATH;

/**
// 0th level autoload (index.html)
require_once __DIR__ . 'vendor/autoload.php';
// 1th level autoload
require_once  __DIR__ . '../vendor/autoload.php';
// 2th level autoload
require_once  __DIR__ . '../../vendor/autoload.php';
// 3th level autoload: File in Service, Repos, ....
require_once  __DIR__ . '../../../vendor/autoload.php';
*/

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);

$endpoint = array('food');


$request = $uri;
// TODO: Parse the token for protected endpoints before assigning the request to the controller

if ((isset($uri[2]) && !in_array($uri[2], $endpoint))) {
    header("HTTP/1.1 404 Not Found");
    exit(1);
}

//require PROJECT_ROOT_PATH . "/Controller/Api/FoodController.php";
error_log(print_r($uri, TRUE));

//echo __DIR__ . '/vendor/autoload.php';
//echo "THINH ROOT PATH: " . \src\common\config\RootPathGetter::getPathToAutoLoadPHP();

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