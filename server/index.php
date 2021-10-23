<?php
require __DIR__ . "/inc/bootstrap.php";

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);

$endpoint = array('food');

if ((isset($uri[2]) && !in_array($uri[2], $endpoint))) {
    header("HTTP/1.1 404 Not Found");
    exit(1);
}

require PROJECT_ROOT_PATH . "/Controller/Api/FoodController.php";

if ($uri[2] == 'food') {
    $objFeedController = new FoodController();
    $strMethodName = $uri[3] . 'Action';
    $objFeedController->{$strMethodName}();
}
