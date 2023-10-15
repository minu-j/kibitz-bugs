import ko from "@locales/ko.json";
import en from "@locales/en.json";
import i18n from "i18next";
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

i18n.use(initReactI18next).use(LanguageDetector).init({
  resources: resources,
  fallbackLng: "en",
});
