<?php
$tmp_dir = str_replace("\\","/", __DIR__);
$root = str_replace ("/inc", "/", $tmp_dir);
define("PROJECT_ROOT_PATH", $root);
 
// include main configuration file
require_once PROJECT_ROOT_PATH . "inc/config.php";

// // include the base controller file
require_once PROJECT_ROOT_PATH . "Controller/Api/BaseController.php";
 
// // include the use model file
require_once PROJECT_ROOT_PATH . "Model/Food.php";
