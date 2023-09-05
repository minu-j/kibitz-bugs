import ko from "@locales/ko.json";
import en from "@locales/en.json";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  ko: {
    translation: ko,
  },
  en: {
    translation: en,
  },
};

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });
