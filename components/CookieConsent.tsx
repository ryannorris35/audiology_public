'use client';

import { useEffect, useState } from 'react';
import { Dictionary } from '@/lib/i18n/types';

interface CookieConsentProps {
  dict: Dictionary;
}

interface ConsentState {
  essential: true;
  analytics: boolean;
  marketing: boolean;
}

const STORAGE_KEY = 'wb_cookie_consent';

type View = 'hidden' | 'banner' | 'customize';

export default function CookieConsent({ dict }: CookieConsentProps) {
  const [view, setView] = useState<View>('hidden');
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        setView('banner');
      } else {
        const parsed: ConsentState = JSON.parse(stored);
        setAnalytics(!!parsed.analytics);
        setMarketing(!!parsed.marketing);
      }
    } catch {
      setView('banner');
    }

    function handleOpenSettings() {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed: ConsentState = JSON.parse(stored);
          setAnalytics(!!parsed.analytics);
          setMarketing(!!parsed.marketing);
        }
      } catch {
        // ignore malformed stored value
      }
      setView('customize');
    }

    window.addEventListener('wb-open-cookie-settings', handleOpenSettings);
    return () => window.removeEventListener('wb-open-cookie-settings', handleOpenSettings);
  }, []);

  function save(consent: ConsentState) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    window.dispatchEvent(new CustomEvent('wb-consent-changed', { detail: consent }));
    setView('hidden');
  }

  function acceptAll() {
    save({ essential: true, analytics: true, marketing: true });
  }

  function declineNonEssential() {
    save({ essential: true, analytics: false, marketing: false });
  }

  function savePreferences() {
    save({ essential: true, analytics, marketing });
  }

  if (view === 'hidden') return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-sand-dark bg-sand px-4 py-5 text-bark shadow-[0_-4px_20px_rgba(0,0,0,0.08)] sm:px-6"
    >
      <div className="mx-auto max-w-content">
        {view === 'banner' && (
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <h2 id="cookie-consent-title" className="font-display text-lg font-semibold">
                {dict.cookie.title}
              </h2>
              <p className="mt-1 text-sm text-bark-light">{dict.cookie.description}</p>
            </div>
            <div className="flex flex-shrink-0 flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setView('customize')}
                className="rounded-full border border-sage-500 px-4 py-2 text-sm font-medium text-black hover:bg-sage-50"
              >
                {dict.cookie.moreInfo}
              </button>
              <button
                type="button"
                onClick={declineNonEssential}
                className="rounded-full border border-sage-500 px-4 py-2 text-sm font-medium text-black hover:bg-sage-50"
              >
                {dict.cookie.decline}
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-full bg-sage px-4 py-2 text-sm font-semibold text-black hover:bg-sage-700"
              >
                {dict.cookie.accept}
              </button>
            </div>
          </div>
        )}

        {view === 'customize' && (
          <div>
            <h2 id="cookie-consent-title" className="font-display text-lg font-semibold">
              {dict.cookie.customizeTitle}
            </h2>

            <div className="mt-4 space-y-4">
              <CategoryRow
                title={dict.cookie.categories.essential.title}
                description={dict.cookie.categories.essential.description}
                checked
                disabled
              />
              <CategoryRow
                title={dict.cookie.categories.analytics.title}
                description={dict.cookie.categories.analytics.description}
                checked={analytics}
                onChange={setAnalytics}
              />
              <CategoryRow
                title={dict.cookie.categories.marketing.title}
                description={dict.cookie.categories.marketing.description}
                checked={marketing}
                onChange={setMarketing}
              />
            </div>

            <div className="mt-5 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={() => setView('banner')}
                className="rounded-full border border-sage-500 px-4 py-2 text-sm font-medium text-black hover:bg-sage-50"
              >
                {dict.cookie.back}
              </button>
              <button
                type="button"
                onClick={savePreferences}
                className="rounded-full bg-sage px-4 py-2 text-sm font-semibold text-black hover:bg-sage-700"
              >
                {dict.cookie.save}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface CategoryRowProps {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}

function CategoryRow({ title, description, checked, disabled, onChange }: CategoryRowProps) {
  return (
    <label className={`flex items-start gap-3 rounded-lg border border-sand-dark bg-linen p-3 ${disabled ? '' : 'cursor-pointer'}`}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-1 h-5 w-5 accent-sage-600"
      />
      <span>
        <span className="block font-semibold">{title}</span>
        <span className="block text-sm text-bark-light">{description}</span>
      </span>
    </label>
  );
}
