import ko from "@locales/ko.json";
import cn from "@locales/cn.json";
import de from "@locales/de.json";
import en from "@locales/en.json";
import fr from "@locales/fr.json";
import jp from "@locales/jp.json";
import ru from "@locales/ru.json";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

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
