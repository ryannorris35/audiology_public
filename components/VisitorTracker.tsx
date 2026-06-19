'use client';

import { useEffect } from 'react';

/**
 * Silently records a visit once per browser session. Renders nothing and
 * surfaces no information to the visitor — see /api/visitor and
 * lib/models/VisitorLog.ts.
 */
export default function VisitorTracker() {
  useEffect(() => {
    const SESSION_KEY = 'wb_visit_logged';
    if (window.sessionStorage.getItem(SESSION_KEY)) return;

    fetch('/api/visitor', { method: 'POST' })
      .catch(() => {
        /* never surface tracking failures to the visitor */
      })
      .finally(() => {
        window.sessionStorage.setItem(SESSION_KEY, 'true');
      });
  }, []);

  return null;
}
