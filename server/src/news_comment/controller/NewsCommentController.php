<?php

namespace src\news_comment\controller;

use src\common\base\BaseController;
use src\common\base\RequestHandler;
use src\common\utils\RequestHelper;
use src\common\utils\ResponseHelper;
use src\news_comment\service\NewsCommentService;
use src\tag\repository\TagRepository;

require_once  __DIR__ . '/../../../vendor/autoload.php';

class NewsCommentController extends BaseController implements RequestHandler
{
    /**
     * "/news/comment" Endpoint - Get list of news comment
     */
    public function handleRequest()
    {
        $method = strtolower(RequestHelper::getRequestMethod());
        error_log("News comment controller::METHOD::" . $method);
        $relative_path = RequestHelper::get_ith_path_item(2);

        switch ($method) {
            case "post":
                if ($relative_path == null) {
                    error_log("NEWS_CONTROLLER::ADD NEWS ENDPOINT::" . $relative_path);
                    NewsCommentService::addNewsComment();
                } else {
                    ResponseHelper::error_client("Invalid path in news endpoint");
                }
                break;
            case "put":
                if (is_numeric($relative_path)) {
                    error_log("NEWS_CONTROLLER::UPDATE NEWS ENDPOINT::" . $relative_path);
                    NewsCommentService::updateNewsComment($relative_path);
                } else {
                    ResponseHelper::error_client("Invalid path in news endpoint");
                }
                break;
            case "delete":
                if (is_numeric($relative_path)) {
                    error_log("NEWS_CONTROLLER::DELETE NEWS ENDPOINT::" . $relative_path);
                    NewsCommentService::deleteNewsComment($relative_path);
                } else {
                    ResponseHelper::error_client("Invalid path in news endpoint");
                }
                break;
            default:
                return false;
        }
    }
}
