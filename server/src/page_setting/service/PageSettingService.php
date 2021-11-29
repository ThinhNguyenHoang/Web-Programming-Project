<?php

namespace src\page_setting\service;

use src\common\utils\RequestHelper;
use src\common\utils\ResponseHelper;
use src\page_setting\mapper\PageSettingMapper;
use src\page_setting\message\PageSettingMessage;
use src\page_setting\repository\PageSettingRepository;


require_once  __DIR__ . '/../../../vendor/autoload.php';

/**
 * Define operation that can be done related to the entity
 * Xu ly request : 3 khuc
 * 1. Parse request --> lay param
 * 2. Xu ly backend
 * 3. Tra ve response cho client
 */
class PageSettingService
{
    public static function getPageSetting()
    {
        ResponseHelper::success(PageSettingMessage::getMessages()->readSuccess, PageSettingRepository::getPageSetting());
    }

    public static function addPageSetting()
    {
        //NOTHING
    }

    public static function updatePageSetting()
    {
        $request = RequestHelper::getRequestBody();

        error_log("PAGE_SETTING_SERVICE::UPDATE::", 0);

        $page_setting = PageSettingMapper::mapPageSettingFromRequest($request);

        $result = PageSettingRepository::update(null, $page_setting);

        if ($result) {
            ResponseHelper::success(PageSettingMessage::getMessages()->updateSuccess, $page_setting);
            return;
        }

        ResponseHelper::error_server(PageSettingMessage::getMessages()->updateError);
    }

    public static function deletePageSetting($PageSettingID)
    {
        //DO NOTHING HERE
    }
}
