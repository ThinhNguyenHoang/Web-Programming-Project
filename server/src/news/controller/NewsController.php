<?php

namespace src\news\controller;

use src\common\base\BaseController;
use src\common\base\RequestHandler;
use src\common\utils\RequestHelper;
use src\common\utils\ResponseHelper;
use src\news\service\NewsService;
use src\news_comment\controller\NewsCommentController;
use src\tag\repository\TagRepository;

require_once  __DIR__ . '/../../../vendor/autoload.php';

class NewsController extends BaseController implements RequestHandler
{
    /**
     * "/news" Endpoint - Get list of newss
     */
    public function handleRequest()
    {
        $method = strtolower(RequestHelper::getRequestMethod());
        error_log("News controller::METHOD::" . $method);
        $relative_path = RequestHelper::get_ith_path_item(1);
        if ($relative_path  != "comment") {
            self::newsEndpoint($method, $relative_path);
        } else {
            $newsCommentController = new NewsCommentController();
            $newsCommentController->handleRequest();
        }
    }

    public static function newsEndpoint($method, $relative_path)
    {
        switch ($method) {
            case "get":
                if ($relative_path == null) {
                    error_log("NEWS_CONTROLLER::GET NEWS ENDPOINT::" . $relative_path);
                    NewsService::getNewsList();
                } else if (is_numeric($relative_path)) {
                    error_log("NEWS_CONTROLLER::GET NEWS BY ID ENDPOINT::" . $relative_path);
                    NewsService::getNewsByID($relative_path);
                } else {
                    ResponseHelper::error_client("Invalid path in news endpoint");
                }
                break;
            case "post":
                if ($relative_path == null) {
                    error_log("NEWS_CONTROLLER::ADD NEWS ENDPOINT::" . $relative_path);
                    NewsService::addNews();
                } else {
                    ResponseHelper::error_client("Invalid path in news endpoint");
                }
                break;
            case "put":
                if (is_numeric($relative_path)) {
                    error_log("NEWS_CONTROLLER::UPDATE NEWS ENDPOINT::" . $relative_path);
                    NewsService::updateNews($relative_path);
                } else {
                    ResponseHelper::error_client("Invalid path in news endpoint");
                }
                break;
            case "delete":
                if (is_numeric($relative_path)) {
                    error_log("NEWS_CONTROLLER::DELETE NEWS ENDPOINT::" . $relative_path);
                    NewsService::deleteNews($relative_path);
                } else {
                    ResponseHelper::error_client("Invalid path in news endpoint");
                }
                break;
            default:
                return false;
        }
    }

    public static function newsCommentEndpoint()
    {
        
    }
}
