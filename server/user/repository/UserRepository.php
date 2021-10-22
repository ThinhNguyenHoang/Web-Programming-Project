<?php

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

    public static function getLastUserId(){

    }

    /**
     * @param UserAccount|null $entity
     */
    public static function create(UserAccount $entity = null)
    {
        $query = "INSERT INTO USER_ACCOUNT(Username,Password) VALUES($entity->username,$entity->password)";
        QueryExecutor::executeQuery($query);
    }

    public static function read(int $entityID = null)
    {
        $row = QueryExecutor::selectTableWithID(self::$table_name,$entityID);
        //TODO: There should be a mapper that map the row to UserData Entity
        return null;
    }

    public static function update(int $entityID = null, UserAccount $entityBody = null)
    {
        // TODO: Implement update() method.
    }

    public static function delete(int $entityID = null)
    {
        // TODO: Implement delete() method.
    }
}