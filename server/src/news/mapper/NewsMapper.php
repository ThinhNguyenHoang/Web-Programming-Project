<?php

namespace src\news\mapper;

use JetBrains\PhpStorm\Pure;
use src\news\entity\News;

require_once  __DIR__ . '/../../../vendor/autoload.php';

/**
 * Map between the entity passed in request to inmemory object
 * User Resquest  <--> User <--> Response
 */
class NewsMapper
{

    // Map a news create request body to in memory user r
    #[Pure] public static function mapNewsFromRequest($request): News
    {
        $news = new News();
        $news->Title = $request->Title;
        $news->Picture = $request->Picture;
        $news->Highlight = $request->Highlight;
        $news->Content = $request->Content;
        $news->Author = $request->Author;
        return $news;
    }
}
