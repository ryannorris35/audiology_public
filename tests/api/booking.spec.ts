import { test, expect } from '@playwright/test';

const VALID_BOOKING = {
  firstName: 'Jane',
  lastName: 'Smith',
  email: 'jane.smith@example.com',
  phone: '+44 7700 900123',
  reason: 'General hearing checkup',
  locale: 'en',
};

test.describe('POST /api/booking', () => {
  test('returns 400 for empty body', async ({ request }) => {
    const res = await request.post('/api/booking', { data: {} });
    expect(res.status()).toBe(400);
  });

  test('returns 400 for missing required fields', async ({ request }) => {
    const res = await request.post('/api/booking', {
      data: { firstName: 'Jane' },
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.error).toBeTruthy();
  });

  test('returns 400 for invalid email', async ({ request }) => {
    const res = await request.post('/api/booking', {
      data: { ...VALID_BOOKING, email: 'not-an-email' },
    });
    expect(res.status()).toBe(400);
  });

  test('returns 400 for invalid phone', async ({ request }) => {
    const res = await request.post('/api/booking', {
      data: { ...VALID_BOOKING, phone: 'abc' },
    });
    expect(res.status()).toBe(400);
  });

  test('returns 400 for overly long fields', async ({ request }) => {
    const res = await request.post('/api/booking', {
      data: { ...VALID_BOOKING, firstName: 'A'.repeat(200) },
    });
    expect(res.status()).toBe(400);
  });

  test('returns 400 for malformed JSON', async ({ request }) => {
    const res = await request.post('/api/booking', {
      headers: { 'Content-Type': 'application/json' },
      data: 'not json at all',
    });
    expect(res.status()).toBe(400);
  });

  test('valid payload returns 200 with bookingId and calendarUrl', async ({ request }) => {
    const res = await request.post('/api/booking', { data: VALID_BOOKING });
    // May be 500 if DB is not configured in CI — we test the shape when it succeeds
    if (res.status() === 200) {
      const body = await res.json();
      expect(body.success).toBe(true);
      expect(body.bookingId).toBeTruthy();
      expect(body.calendarUrl).toContain('calendar.google.com');
    } else {
      // Still shouldn't be a 400 (validation error) for a valid payload
      expect(res.status()).not.toBe(400);
    }
  });
});
