<?php
/**
 * Define operation that can be done related to the entity
 */
class UserService
{
    public function __construct()
    {
        $this->userRepository = new UserRepository();
    }
}