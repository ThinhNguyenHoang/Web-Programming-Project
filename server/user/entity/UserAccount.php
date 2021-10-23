<?php

class UserAccount
{
    public int $id;
    public string $username;
    public string $password;

    /**
     * UserAccount constructor.
     * @param string $username
     * @param string $password
     */
    public function __construct(int $id=0,string $username="", string $password="")
    {
        $this->id= $id;
        $this->username = $username;
        $this->password = $password;
    }
}