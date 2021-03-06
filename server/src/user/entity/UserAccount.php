<?php
namespace src\user\entity;
require_once  __DIR__ . '/../../../vendor/autoload.php';

class UserAccount
{
    public int $id;
    public string $username;
    public string $password;
    public string $role;

    /**
     * UserAccount constructor.
     * @param string $username
     * @param string $password
     */
    public function __construct(int $id=0,string $username="", string $password="", string $role="")
    {
        $this->id= $id;
        $this->username = $username;
        $this->password = $password;
        $this->role = $role;

    }
}