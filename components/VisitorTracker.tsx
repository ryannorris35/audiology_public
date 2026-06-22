'use client';

import { useEffect } from 'react';

const CONSENT_KEY = 'wb_cookie_consent';
const SESSION_KEY = 'wb_visit_logged';

interface ConsentState {
  essential: true;
  analytics: boolean;
  marketing: boolean;
}

function getConsent(): ConsentState | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function generateSessionId(): string {
  return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
}

function getReferrerDomain(): string | undefined {
  try {
    return document.referrer ? new URL(document.referrer).hostname : undefined;
  } catch {
    return undefined;
  }
}

async function trackVisit(consent: ConsentState | null) {
  // No consent recorded yet — fire anonymous track so we still count the visit.
  const hasAnalytics = consent?.analytics || consent?.marketing;

  if (hasAnalytics) {
    const storedId = window.sessionStorage.getItem('wb_session_id');
    const sessionId = storedId ?? generateSessionId();
    if (!storedId) window.sessionStorage.setItem('wb_session_id', sessionId);

    await fetch('/api/visitor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        consentLevel: 'full',
        page: window.location.pathname,
        referrer: document.referrer || undefined,
        screenWidth: screen.width,
        screenHeight: screen.height,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        sessionId,
      }),
    });
  } else {
    await fetch('/api/visitor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        consentLevel: 'anonymous',
        page: window.location.pathname,
        referrerDomain: getReferrerDomain(),
      }),
    });
  }

  window.sessionStorage.setItem(SESSION_KEY, consent ? 'decided' : 'undecided');
}

export default function VisitorTracker() {
  useEffect(() => {
    const alreadyLogged = window.sessionStorage.getItem(SESSION_KEY);
    const consent = getConsent();

    // Only skip if we already logged at the same consent level this session.
    const currentLevel = consent?.analytics || consent?.marketing ? 'decided' : 'undecided';
    if (alreadyLogged === currentLevel) return;

    trackVisit(consent).catch(() => {});

    // Re-track if consent changes mid-session (e.g. user accepts after initial decline).
    function onConsentChanged(e: Event) {
      const updated = (e as CustomEvent<ConsentState>).detail;
      window.sessionStorage.removeItem(SESSION_KEY);
      trackVisit(updated).catch(() => {});
    }

    window.addEventListener('wb-consent-changed', onConsentChanged);
    return () => window.removeEventListener('wb-consent-changed', onConsentChanged);
  }, []);

  return null;
}
