<?php

namespace src\news_comment\service;

use src\common\utils\QueryExecutor;
use src\common\utils\RequestHelper;
use src\common\utils\ResponseHelper;
use stdClass;
use src\news_comment\mapper\NewsCommentMapper;
use src\news_comment\message\NewsCommentMessage;
use src\news_comment\repository\NewsCommentRepository;

require_once  __DIR__ . '/../../../vendor/autoload.php';

/**
 * Define operation that can be done related to the entity
 * Xu ly request : 3 khuc
 * 1. Parse request --> lay param
 * 2. Xu ly backend
 * 3. Tra ve response cho client
 */
class NewsCommentService
{
    public static function addNewsComment()
    {
        $request = RequestHelper::getRequestBody();

        error_log("Adding news_comment: get request body", 0);

        $news_comment = NewsCommentMapper::mapNewsCommentFromRequest($request);

        error_log("Adding news_comment: Map News entity from request", 0);

        $news_comment_result = NewsCommentRepository::create($news_comment);

        error_log("Adding news_comment: Insert to database", 0);

        if ($news_comment_result) {
            error_log("Adding news_comment: " . json_encode($news_comment), 0);

            ResponseHelper::success(NewsCommentMessage::getMessages()->createSuccess, $news_comment);
            return;
        }

        ResponseHelper::error_server(NewsCommentMessage::getMessages()->createError);
    }

    public static function updateNewsComment($NewsCommentID)
    {
        $request = RequestHelper::getRequestBody();

        error_log("NEWS_SERVICE::UPDATE::", 0);

        //Map request body
        $news_comment = new stdClass();
        $news_comment->Content = $request->Content;
        $news_comment->ImageList = $request->ImageList;
        $news_comment->Reply = $request->Reply;

        $news_comment_found = NewsCommentRepository::findNewsCommentByID($NewsCommentID);
        if (!$news_comment_found) {
            // Throw error notifying NewsID already taken
            ResponseHelper::error_client("NewsID doesn't exist");
            die();
        }

        $result = NewsCommentRepository::update($NewsCommentID, $news_comment);

        if ($result) {
            ResponseHelper::success(NewsCommentMessage::getMessages()->updateSuccess, $news_comment);
            return;
        }

        ResponseHelper::error_server(NewsCommentMessage::getMessages()->updateError);
    }

    public static function deleteNewsComment($NewsCommentID)
    {
        error_log("NEWS_SERVICE::DELETE::", 0);

        // Find news_comment with the NewsID in database
        $news_comment_found = NewsCommentRepository::findNewsCommentByID($NewsCommentID);
        if (!$news_comment_found) {
            // Throw error notifying NewsCommentID already taken
            ResponseHelper::error_client("NewsCommentID doesn't exist");
            die();
        }

        // delete news_comment
        $result = NewsCommentRepository::delete($NewsCommentID);
        if ($result) {
            ResponseHelper::success(NewsCommentMessage::getMessages()->deleteSuccess, $news_comment_found);
            return;
        }
        ResponseHelper::error_server(NewsCommentMessage::getMessages()->deleteError);
    }
}
