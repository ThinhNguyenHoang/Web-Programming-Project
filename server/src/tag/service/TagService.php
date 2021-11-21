<?php

namespace src\tag\service;

use src\common\utils\QueryExecutor;
use src\common\utils\RequestHelper;
use src\common\utils\ResponseHelper;
use src\tag\entity\Tag;
use src\tag\message\TagMessage;
use src\tag\repository\TagRepository;

require_once  __DIR__ . '/../../../vendor/autoload.php';

/**
 * Define operation that can be done related to the entity
 * Xu ly request : 3 khuc
 * 1. Parse request --> lay param
 * 2. Xu ly backend
 * 3. Tra ve response cho client
 */
class TagService
{
    public static function getTagList()
    {
        ResponseHelper::success(TagMessage::getMessages()->readSuccess, TagRepository::listTag());
    }

    public static function getTagByID($TagID)
    {
        // Find tag with the FoodID in database
        $tag_found = TagRepository::findTagByID($TagID);
        if (!$tag_found) {
            // Throw error notifying FoodID already taken
            ResponseHelper::error_client("FoodID doesn't exist");
            die();
        }
        ResponseHelper::success(TagMessage::getMessages()->readSuccess, $tag_found);
    }

    public static function addTag()
    {
        $request = RequestHelper::getRequestBody();

        error_log("Adding tag: get request body", 0);

        //Map Tag from request
        error_log("Adding tag: Map Tag entity from request", 0);
        $tag = new Tag();
        $tag->TagName = $request->TagName;

        $result = TagRepository::create($tag);

        error_log("Adding tag: Insert to database", 0);

        if ($result) {
            $tag->TagID = QueryExecutor::getLastInsertID();
            error_log("Adding tag: " . json_encode($tag), 0);

            ResponseHelper::success(TagMessage::getMessages()->createSuccess, $tag);
            return;
        }

        ResponseHelper::error_server(TagMessage::getMessages()->createError);
        return;
    }

    public static function updateTag($TagID)
    {
        $request = RequestHelper::getRequestBody();

        error_log("TAG_SERVICE::UPDATE::", 0);

        $tag = new Tag();
        $is_update_tag = false;

        $tag_found = TagRepository::findTagByID($TagID);
        if (!$tag_found) {
            // Throw error notifying TagID already taken
            ResponseHelper::error_client("TagID doesn't exist");
            die();
        }

        if (property_exists($request, "TagName")) {
            if ($request->TagName != "") {
                $tag->TagName = $request->TagName;
                $is_update_tag = true;
            } else {
                $tag->TagName = $tag_found["TagName"];
            }
        } else {
            $tag->TagName = $tag_found["TagName"];
        }

        $tag->TagID = $TagID;

        if ($is_update_tag) {
            $result = TagRepository::update($TagID, $tag);
        } else {
            ResponseHelper::error_client("No Feild to update");
            die();
        }

        if ($result) {
            ResponseHelper::success(TagMessage::getMessages()->updateSuccess, $tag);
            return;
        }

        ResponseHelper::error_server(TagMessage::getMessages()->updateError);
    }

    public static function deleteTag($TagID)
    {
        error_log("TAG_SERVICE::DELETE::", 0);

        // Find tag with the TagID in database
        $tag_found = TagRepository::findTagByID($TagID);
        if (!$tag_found) {
            // Throw error notifying TagID already taken
            ResponseHelper::error_client("TagID doesn't exist");
            die();
        }

        // delete tag
        $result = TagRepository::delete($TagID);
        if ($result) {
            ResponseHelper::success(TagMessage::getMessages()->deleteSuccess, $tag_found);
            return;
        }
        ResponseHelper::error_server(TagMessage::getMessages()->deleteError);
    }
}
