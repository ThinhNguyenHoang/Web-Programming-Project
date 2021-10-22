<?php
/**
 * Map between the entity passed in request to inmemory object
 * User Resquest  <--> User <--> Response
 */
class UserMapper
{
    // Map a user create request body to in memory user r
    public static function getUserFromCreateRequest($request){
        $user = "user object";
        return $user;
    }
    // Map a User object to response body for client
    public static function mapUserToResponse($user){
        $response = "response object";
        return $response;
    }
}