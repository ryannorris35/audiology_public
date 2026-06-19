'use client';

import { LOCALE_COOKIE, locales, LocaleCode } from '@/lib/i18n/config';

interface LanguageSwitcherProps {
  currentLocale: LocaleCode;
  label: string;
  className?: string;
}

/**
 * Sets the language cookie and reloads the page so every server component
 * re-renders with the chosen locale's dictionary.
 */
export default function LanguageSwitcher({ currentLocale, label, className = '' }: LanguageSwitcherProps) {
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    document.cookie = `${LOCALE_COOKIE}=${value}; path=/; max-age=31536000; SameSite=Lax`;
    window.location.reload();
  }

  return (
    <label className={`flex items-center gap-2 ${className}`}>
      <span className="sr-only">{label}</span>
      <select
        value={currentLocale}
        onChange={handleChange}
        aria-label={label}
        className="cursor-pointer rounded-md border border-bark bg-sage-50 px-2 py-1 text-sm text-bark focus:outline-none"
      >
        {locales.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </label>
  );
}
