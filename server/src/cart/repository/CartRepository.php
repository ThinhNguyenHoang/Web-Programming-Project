<?php

namespace src\cart\repository;

require_once  __DIR__ . '/../../../vendor/autoload.php';

//// generate json web token
//include_once 'libs/php-jwt-master/src/BeforeValidException.php';
//include_once 'libs/php-jwt-master/src/ExpiredException.php';
//include_once 'libs/php-jwt-master/src/SignatureInvalidException.php';
//include_once 'libs/php-jwt-master/src/JWT.php';

use Exception;
use src\common\base\Repository;
use src\common\utils\RequestHelper;
use src\common\utils\ResponseHelper;
use src\common\utils\QueryExecutor;
use function DeepCopy\deep_copy;

/**
 * Class for interaction with database
 * + Create
 * + Read by ID
 * + Read List
 * + Find by field
 * + Delete
 * + Update
 * + Fight out. Don't let it loose.
 */
class CartRepository implements Repository
{
    public static function getCart(): array
    {
        if (RequestHelper::isAdminPrivilege()) {
            $query = "SELECT * FROM cart ORDER BY UserID;";
        } else {
            $UserID = RequestHelper::getUserIDFromToken();
            $query = "SELECT * FROM cart WHERE UserID=$UserID;";
        }
        try {
            $result = QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
        //        $num_row = $result->num_rows;
        $list_cart = array();
        while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
            error_log(json_encode($row), 0);
            array_push($list_cart, $row);
        }

        error_log("CART_REPOSITORY::FETCH_LIST::", 0);
        return $list_cart;
    }

    public static function findMaterialByID($MaterialID)
    {
        $query = "SELECT * FROM cart WHERE MaterialID = $MaterialID;";

        try {
            $result = QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage());
        }
        $cart = mysqli_fetch_array($result, MYSQLI_ASSOC);

        error_log(json_encode($cart), 0);

        error_log("CART_REPOSITORY::FETCH_LIST::", 0);
        return $cart;
    }

    /**
     */
    public static function create($entity = null)
    {
        //DO NOTHING
    }

    public static function read(int $entityID = null)
    {
        //DO NOTHING
    }

    public static function update(int $UserID = null, object $entity = null)
    {
        $query = "DELETE FROM cart WHERE UserID='$UserID';";

        try {
            QueryExecutor::executeQuery($query);
        } catch (Exception $e) {
            error_log($e->getMessage(), 0);
            return null;
        }

        foreach ($entity->FoodList as $food_item) {
            $food_query = "INSERT INTO cart (UserID, FoodID, ComboID, Quantity) VALUES ($UserID, $food_item->FoodID, 0, $food_item->Quantity);";

            try {
                $food_result = QueryExecutor::executeQuery($food_query);
            } catch (Exception $e) {
                error_log($e->getMessage(), 0);
                return null;
            }

            if (!$food_result) {
                ResponseHelper::error_client("Fail to update cart");
            }
        }
        
        foreach($entity->ComboList as $combo_item){
            $combo_query = "INSERT INTO cart (UserID, FoodID, ComboID, Quantity) VALUES ($UserID, 0, $combo_item->ComboID, $combo_item->Quantity);";

            try {
                $combo_result = QueryExecutor::executeQuery($combo_query);
            } catch (Exception $e) {
                error_log($e->getMessage(), 0);
                return null;
            }

            if (!$combo_result) {
                ResponseHelper::error_client("Fail to update cart");
            }
        }

        return true;
    }

    public static function delete(int $entityID = null)
    {
        //DO NOTHING
    }
}
