import { test, expect } from '@playwright/test';

test.describe('POST /api/visitor', () => {
  test('returns 400 for empty body', async ({ request }) => {
    const res = await request.post('/api/visitor', { data: {} });
    expect(res.status()).toBe(400);
  });

  test('returns 400 for unknown consentLevel', async ({ request }) => {
    const res = await request.post('/api/visitor', {
      data: { consentLevel: 'unknown', page: '/' },
    });
    expect(res.status()).toBe(400);
  });

  test('anonymous payload is accepted', async ({ request }) => {
    const res = await request.post('/api/visitor', {
      data: {
        consentLevel: 'anonymous',
        page: '/test-page',
        referrerDomain: 'google.com',
      },
    });
    // Returns 200 even if DB write fails (tracking must never break the site)
    expect(res.status()).toBe(200);
  });

  test('full consent payload is accepted', async ({ request }) => {
    const res = await request.post('/api/visitor', {
      data: {
        consentLevel: 'full',
        page: '/test-page',
        referrer: 'https://www.google.com/search?q=audiologist+swansea',
        screenWidth: 1440,
        screenHeight: 900,
        viewportWidth: 1440,
        viewportHeight: 800,
        language: 'en-GB',
        timezone: 'Europe/London',
        sessionId: 'test-session-123',
      },
    });
    expect(res.status()).toBe(200);
  });

  test('page path too long returns 400', async ({ request }) => {
    const res = await request.post('/api/visitor', {
      data: {
        consentLevel: 'anonymous',
        page: '/'.repeat(600),
      },
    });
    expect(res.status()).toBe(400);
  });

  test('always returns JSON', async ({ request }) => {
    const res = await request.post('/api/visitor', {
      data: { consentLevel: 'anonymous', page: '/' },
    });
    const body = await res.json();
    expect(typeof body).toBe('object');
    expect('ok' in body).toBe(true);
  });
});
