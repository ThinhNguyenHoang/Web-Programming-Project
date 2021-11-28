<?php

namespace src\news_comment\mapper;

use JetBrains\PhpStorm\Pure;
use src\news_comment\entity\NewsComment;

require_once  __DIR__ . '/../../../vendor/autoload.php';

/**
 * Map between the entity passed in request to inmemory object
 * User Resquest  <--> User <--> Response
 */
class NewsCommentMapper
{

    // Map a news create request body to in memory user r
    #[Pure] public static function mapNewsCommentFromRequest($request): NewsComment
    {
        $news_comment = new NewsComment();
        $news_comment->NewsID = $request->NewsID;
        $news_comment->Content = $request->Content;
        $news_comment->ImageList = $request->ImageList;
        return $news_comment;
    }
}
