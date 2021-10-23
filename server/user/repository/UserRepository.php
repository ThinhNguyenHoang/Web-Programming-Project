<?php

use function DeepCopy\deep_copy;

/**
 * Class for interaction with database
 * + Create
 * + Read by ID
 * + Read List
 * + Find by field
 * + Delete
 * + Update
 */
class UserRepository implements Repository
{
    // Determine the latest inserted user ID --> Sequence
    public static string $table_name = "user_account";

    public static function getLastUserId()
    {

    }


    public static function findUserByName(string $user_name): ?UserAccount
    {
        $query = "SELECT * FROM USER_ACCOUNT WHERE USERNAME=$user_name";
        try {
            $row = QueryExecutor::executeQuery($query);
            $return = $row->fetch_object($class = "UserAccount");
            return deep_copy($return);
        } catch (Exception $exception) {
            echo $exception->getMessage();
        }
        return null;
    }

    /**
     * @param UserAccount|null $entity
     */
    public static function create(UserAccount $entity = null)
    {
        $query = "INSERT INTO USER_ACCOUNT(Username,Password) VALUES($entity->username,$entity->password)";
        return QueryExecutor::executeQuery($query);
    }

    public static function read(int $entityID = null)
    {
        $query = "SELECT * FROM USER_ACCOUNT WHERE ID=$entityID";
        $row = QueryExecutor::executeQuery($query);
        if (!$row) {
            // Throw error return error message for client to display
            echo "Something has gone wrong when reading user with id: $entityID! ";
        }
        $return = $row->fetch_object($class = "UserAccount");
        return deep_copy($return);
    }

    public static function update(int $entityID = null, UserAccount $entity = null)
    {
        $query = "UPDATE USER_ACCOUNT SET USERNAME=$entity->username, PASSWORD=$entity->password WHERE ID=$entityID";
        return QueryExecutor::executeQuery($query);
    }

    public static function delete(int $entityID = null)
    {
        // TODO: Implement delete() method.
    }
}