<?php

namespace src\user\controller;

require_once  __DIR__ . '../../../vendor/autoload.php';

class UserController extends BaseController implements RequestHandler
{
    /**
     * "/food/list" Endpoint - Get list of foods
     */
    private $service;
    public function handleRequest()
    {
        $method = strtolower(RequestHelper::getRequestMethod());
        switch($method){
            case "get":
                $this->read();
                break;
            case "post":
                $this->create();
                break;
            case "put":
                $this->update();
                break;
            case "delete":
                $this->delete();
                break;
        }
    }

    public function create(){

    }
    public function read(){

    }
    public function update(){

    }
    public function delete()
    {

    }
}
