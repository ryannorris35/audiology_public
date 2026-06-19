export const LOCALE_COOKIE = 'wb_lang';

export const locales = [
  { code: 'en', label: 'English' },
  { code: 'cy', label: 'Cymraeg' },
  { code: 'pl', label: 'Polski' },
  { code: 'es', label: 'Español' },
  { code: 'de', label: 'Deutsch' },
  { code: 'fr', label: 'Français' },
] as const;

export type LocaleCode = (typeof locales)[number]['code'];

export const defaultLocale: LocaleCode = 'en';

export function isLocale(value: string | undefined): value is LocaleCode {
  return !!value && locales.some((l) => l.code === value);
}
