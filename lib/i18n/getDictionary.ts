import { cookies } from 'next/headers';
import { Dictionary, PartialDictionary } from './types';
import { LocaleCode, LOCALE_COOKIE, defaultLocale, isLocale } from './config';
import en from './en';
import cy from './cy';
import pl from './pl';
import es from './es';
import de from './de';
import fr from './fr';

const partials: Record<Exclude<LocaleCode, 'en'>, PartialDictionary> = {
  cy,
  pl,
  es,
  de,
  fr,
};

/**
 * Recursively merges a partial translation over the full English dictionary.
 * Arrays and primitives in the override always win; missing keys fall back
 * to the English copy so the site never renders an empty string.
 */
function deepMerge<T>(base: T, override: unknown): T {
  if (override === null || override === undefined) return base;

  if (Array.isArray(base) || Array.isArray(override)) {
    return (override as T) ?? base;
  }

  if (typeof base === 'object' && typeof override === 'object') {
    const result: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    for (const key of Object.keys(override as Record<string, unknown>)) {
      const overrideValue = (override as Record<string, unknown>)[key];
      const baseValue = (base as Record<string, unknown>)[key];
      result[key] = deepMerge(baseValue, overrideValue);
    }
    return result as T;
  }

  return (override as T) ?? base;
}

export function getDictionaryForLocale(locale: LocaleCode): Dictionary {
  if (locale === 'en') return en;
  const partial = partials[locale];
  return deepMerge<Dictionary>(en, partial);
}

/**
 * Reads the user's chosen language from the locale cookie (server-side) and
 * returns the merged dictionary. Falls back to English if no cookie is set
 * or the value is unrecognised.
 */
export async function getDictionary(): Promise<Dictionary> {
  const cookieStore = await cookies();
  const value = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(value) ? value : defaultLocale;
  return getDictionaryForLocale(locale);
}

export async function getCurrentLocale(): Promise<LocaleCode> {
  const cookieStore = await cookies();
  const value = cookieStore.get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : defaultLocale;
}
