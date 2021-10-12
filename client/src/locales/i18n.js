import { TRANSLATIONS_VI } from "./vi/translations";
import { TRANSLATIONS_EN } from "./en/translations";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Moment for internalization with date-time format
var moment = require('moment');
// Import the language translations

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: 'en',
        resources: {
            en: {
                translation: TRANSLATIONS_EN
            },
            vi: {
                translation: TRANSLATIONS_VI
            }
        },
        interpolation: {
            format: function (value, format, lng) {
                if (value instanceof Date) return moment(value).format(format);
                return value;
                if (typeof value === "number") return new Intl.NumberFormat().format(value);
            }
        }
    });

i18n.changeLanguage("vi");