import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import {cn, de, en, fr, jp, ko, ru} from "@/features/locales/data";

const resources = {
  cn: {
    translation: cn,
  },
  de: {
    translation: de,
  },
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
  jp: {
    translation: jp,
  },
  ko: {
    translation: ko,
  },
  ru: {
    translation: ru,
  },
};

i18n.use(initReactI18next).use(LanguageDetector).init({
  resources: resources,
  fallbackLng: "en",
});
