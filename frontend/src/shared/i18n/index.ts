import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { cn, en, jp, ko } from "./config";

const resources = {
  cn: {
    translation: cn,
  },
  en: {
    translation: en,
  },
  jp: {
    translation: jp,
  },
  ko: {
    translation: ko,
  },
};

i18n.use(initReactI18next).use(LanguageDetector).init({
  resources: resources,
  fallbackLng: "en",
});

export { SelectLocales } from "./ui";
