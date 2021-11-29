<?php

namespace src\page_setting\mapper;

use JetBrains\PhpStorm\Pure;
use stdClass;

require_once  __DIR__ . '/../../../vendor/autoload.php';

/**
 * Map between the entity passed in request to inmemory object
 * User Resquest  <--> User <--> Response
 */
class PageSettingMapper
{

    // Map a page_setting create request body to in memory user r
    #[Pure] public static function mapPageSettingFromRequest($request): stdClass
    {
        $page_setting = new stdClass();
        $page_setting->banner = $request->banner;
        $page_setting->logo = $request->logo;
        $page_setting->name = $request->name;
        $page_setting->phone = $request->phone;
        $page_setting->slogan = $request->slogan;
        $page_setting->address = $request->address;
        $page_setting->description = $request->description;
        $page_setting->color = $request->color;
        $page_setting->length = $request->length;
        $page_setting->lat = $request->lat;
        $page_setting->facebook = $request->facebook;
        $page_setting->mail = $request->mail;
        $page_setting->twitter = $request->twitter;
        return $page_setting;
    }
}
