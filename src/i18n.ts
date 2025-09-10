import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

// Configure i18next with HTTP backend to load /locales/{lng}.json files
i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: [
      'en', 'hi', 'bn', 'ta', 'te', 'mr', 'gu', 'kn', 'ml', 'pa',
    ],
    // Cache & detection tuned for SPA with localStorage persistence
    detection: {
      order: ['localStorage', 'querystring', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    backend: {
      loadPath: '/locales/{{lng}}.json',
    },
    interpolation: { escapeValue: false },
    debug: false,
    returnEmptyString: false,
  });

export default i18n;


