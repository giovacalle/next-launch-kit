import en from './i18n/en.json';

declare module 'next-intl' {
  interface AppConfig {
    Messages: typeof en;
  }
}
