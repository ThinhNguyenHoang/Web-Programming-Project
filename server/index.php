<?php

/**
// 0th level autoload (index.html)
require_once __DIR__ . 'vendor/autoload.php';
// 1th level autoload
require_once  __DIR__ . '/../vendor/autoload.php';
// 2th level autoload
require_once  __DIR__ . '/../../vendor/autoload.php';
// 3th level autoload: File in Service, Repos, ....
require_once  __DIR__ . '/../../../vendor/autoload.php';
 */
//header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Methods: *');

use src\combo\controller\ComboController;
use src\food\controller\FoodController;
use src\material\controller\MaterialController;
use src\user\controller\UserController;
use src\tag\controller\TagController;
use src\voucher\controller\VoucherController;
use src\wish_list\controller\WishListController;
use src\bank_account\controller\BankAccountController;
use src\transaction\controller\TransactionController;
use src\cart\controller\CartController;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Methods: *');
header("Access-Control-Allow-Headers:Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization,ResponseType,X-Request-Id,Access-Control-Allow-Methods");

require_once './vendor/autoload.php';

//$uri = explode("/",substr($_SERVER['REQUEST_URI'],1));
//print_r($uri);
//error_log((string)$uri, 0);

$endpoint = \src\common\utils\RequestHelper::get_ith_path_item(0);
//echo $end point == "";
error_log("ENDOINT ĐƯỢC XỬ LÝ: " . $endpoint, 0);

//// TODO: Parse the token for protected endpoints before assigning the request to the controller
//// TODO: Thịnh thêm code xác thực trước khi chuyển request cho các controller
///



switch ($endpoint) {
    case "food":
        $foodController = new FoodController();
        $foodController->handleRequest();
        break;
    case "user":
        $userController = new UserController();
        $userController->handleRequest();
        break;
    case "combo":
        $comboController = new ComboController();
        $comboController->handleRequest();
        break;
    case "material":
        $materialController = new MaterialController();
        $materialController->handleRequest();
        break;
    case "tag":
        $tagController = new TagController();
        $tagController->handleRequest();
        break;
    case "voucher":
        $voucherController = new VoucherController();
        $voucherController->handleRequest();
        break;
    case "wish_list":
        $wishListController = new WishListController();
        $wishListController->handleRequest();
        break;
    case "bank_account":
        $bankAccountController = new BankAccountController();
        $bankAccountController->handleRequest();
        break;
    case "transaction":
        $transactionController = new TransactionController();
        $transactionController->handleRequest();
        break;
    case "cart":
        $cartController = new CartController();
        $cartController->handleRequest();
        break;
    default:
        header("HTTP/1.1 404 Not Found");
        exit(1);
}
