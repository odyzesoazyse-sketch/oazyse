import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ru from './locales/ru.json';
import en from './locales/en.json';
import es from './locales/es.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import zh from './locales/zh.json';
import ja from './locales/ja.json';
import ko from './locales/ko.json';
import ar from './locales/ar.json';
import hi from './locales/hi.json';
import pt from './locales/pt.json';
import it from './locales/it.json';
import tr from './locales/tr.json';
import pl from './locales/pl.json';
import nl from './locales/nl.json';
import uk from './locales/uk.json';
import vi from './locales/vi.json';
import th from './locales/th.json';
import sv from './locales/sv.json';
import he from './locales/he.json';

export const languages = [
  { code: 'ru', name: 'Русский' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'de', name: 'Deutsch' },
  { code: 'fr', name: 'Français' },
  { code: 'zh', name: '中文' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'ar', name: 'العربية' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'pt', name: 'Português' },
  { code: 'it', name: 'Italiano' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'pl', name: 'Polski' },
  { code: 'nl', name: 'Nederlands' },
  { code: 'uk', name: 'Українська' },
  { code: 'vi', name: 'Tiếng Việt' },
  { code: 'th', name: 'ไทย' },
  { code: 'sv', name: 'Svenska' },
  { code: 'he', name: 'עברית' },
];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { ru: { translation: ru }, en: { translation: en }, es: { translation: es }, de: { translation: de }, fr: { translation: fr }, zh: { translation: zh }, ja: { translation: ja }, ko: { translation: ko }, ar: { translation: ar }, hi: { translation: hi }, pt: { translation: pt }, it: { translation: it }, tr: { translation: tr }, pl: { translation: pl }, nl: { translation: nl }, uk: { translation: uk }, vi: { translation: vi }, th: { translation: th }, sv: { translation: sv }, he: { translation: he } },
    fallbackLng: 'ru',
    interpolation: { escapeValue: false },
    detection: { 
      order: ['localStorage', 'navigator', 'htmlTag'], 
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage']
    },
    supportedLngs: ['ru', 'en', 'es', 'de', 'fr', 'zh', 'ja', 'ko', 'ar', 'hi', 'pt', 'it', 'tr', 'pl', 'nl', 'uk', 'vi', 'th', 'sv', 'he']
  });

export default i18n;
