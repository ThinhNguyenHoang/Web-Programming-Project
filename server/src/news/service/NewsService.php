<?php

namespace src\news\service;

use src\common\utils\QueryExecutor;
use src\common\utils\RequestHelper;
use src\common\utils\ResponseHelper;
use src\news\entity\News;
use src\news\mapper\NewsMapper;
use src\news\message\NewsMessage;
use src\news\repository\NewsRepository;

require_once  __DIR__ . '/../../../vendor/autoload.php';

/**
 * Define operation that can be done related to the entity
 * Xu ly request : 3 khuc
 * 1. Parse request --> lay param
 * 2. Xu ly backend
 * 3. Tra ve response cho client
 */
class NewsService
{
    public static function getNewsList()
    {
        $news_list = NewsRepository::listNews();
        if ($news_list) {
            ResponseHelper::success(NewsMessage::getMessages()->readSuccess, $news_list);
            return;
        }

        ResponseHelper::error_server(NewsMessage::getMessages()->readError);
    }

    public static function getNewsByID($NewsID)
    {
        // Find news with the NewsID in database
        $news_found = NewsRepository::findNewsByID($NewsID);
        if (!$news_found) {
            // Throw error notifying NewsID already taken
            ResponseHelper::error_client("NewsID doesn't exist");
            die();
        }
        ResponseHelper::success(NewsMessage::getMessages()->readSuccess, $news_found);
        return $news_found;
    }

    public static function addNews()
    {
        $request = RequestHelper::getRequestBody();

        error_log("Adding news: get request body", 0);

        $news = NewsMapper::mapNewsFromRequest($request);

        error_log("Adding news: Map News entity from request", 0);

        $news_result = NewsRepository::create($news);

        error_log("Adding news: Insert to database", 0);

        if ($news_result) {
            error_log("Adding news: " . json_encode($news), 0);
            $news->NewsID = QueryExecutor::getLastInsertID();

            ResponseHelper::success(NewsMessage::getMessages()->createSuccess, $news);
            return;
        }

        ResponseHelper::error_server(NewsMessage::getMessages()->createError);
    }

    public static function updateNews($NewsID)
    {
        $request = RequestHelper::getRequestBody();

        error_log("NEWS_SERVICE::UPDATE::", 0);

        $news = NewsMapper::mapNewsFromRequest($request);

        $result = NewsRepository::update($NewsID, $news);

        if ($result) {
            ResponseHelper::success(NewsMessage::getMessages()->updateSuccess, $news);
            return;
        }

        ResponseHelper::error_server(NewsMessage::getMessages()->updateError);
    }

    public static function deleteNews($NewsID)
    {
        error_log("NEWS_SERVICE::DELETE::", 0);

        // Find news with the NewsID in database
        $news_found = NewsRepository::findNewsByID($NewsID);
        if (!$news_found) {
            // Throw error notifying NewsID already taken
            ResponseHelper::error_client("NewsID doesn't exist");
            die();
        }

        // delete news
        $result = NewsRepository::delete($NewsID);
        if ($result) {
            ResponseHelper::success(NewsMessage::getMessages()->deleteSuccess, $news_found);
            return;
        }
        ResponseHelper::error_server(NewsMessage::getMessages()->deleteError);
    }
}
