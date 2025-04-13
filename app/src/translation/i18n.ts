import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import es from '@/translation/locales/es.json'
import en from '@/translation/locales/en.json'
import ca from '@/translation/locales/ca.json'

const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
  ca: {
    translation: ca,
  },
}

i18n
  .use(initReactI18next) // uses the react i18next module
  .use(LanguageDetector) // uses the language detector
  .init({
    resources,
    fallbackLng: 'es', // used when a translation was not found in the current language

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
