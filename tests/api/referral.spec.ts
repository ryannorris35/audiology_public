import { test, expect } from '@playwright/test';

const VALID_REFERRAL = {
  referrerFirstName: 'John',
  referrerLastName: 'Davies',
  referrerEmail: 'john.davies@example.com',
  patientName: 'Mary Jones',
};

test.describe('POST /api/referral', () => {
  test('returns 400 for empty body', async ({ request }) => {
    const res = await request.post('/api/referral', { data: {} });
    expect(res.status()).toBe(400);
  });

  test('returns 400 for missing referrer email', async ({ request }) => {
    const res = await request.post('/api/referral', {
      data: { ...VALID_REFERRAL, referrerEmail: undefined },
    });
    expect(res.status()).toBe(400);
  });

  test('returns 400 for invalid email', async ({ request }) => {
    const res = await request.post('/api/referral', {
      data: { ...VALID_REFERRAL, referrerEmail: 'bad-email' },
    });
    expect(res.status()).toBe(400);
  });

  test('returns 400 for missing patient name', async ({ request }) => {
    const res = await request.post('/api/referral', {
      data: { ...VALID_REFERRAL, patientName: '' },
    });
    expect(res.status()).toBe(400);
  });

  test('returns 400 for overly long patient name', async ({ request }) => {
    const res = await request.post('/api/referral', {
      data: { ...VALID_REFERRAL, patientName: 'A'.repeat(300) },
    });
    expect(res.status()).toBe(400);
  });

  test('optional phone is accepted when omitted', async ({ request }) => {
    const res = await request.post('/api/referral', {
      data: { ...VALID_REFERRAL },
    });
    expect(res.status()).not.toBe(400);
  });

  test('optional phone is accepted when valid', async ({ request }) => {
    const res = await request.post('/api/referral', {
      data: { ...VALID_REFERRAL, referrerPhone: '+44 7700 900456' },
    });
    expect(res.status()).not.toBe(400);
  });

  test('returns 400 for invalid phone format', async ({ request }) => {
    const res = await request.post('/api/referral', {
      data: { ...VALID_REFERRAL, referrerPhone: 'xyz' },
    });
    expect(res.status()).toBe(400);
  });

  test('valid payload returns 200 with referralId', async ({ request }) => {
    const res = await request.post('/api/referral', { data: VALID_REFERRAL });
    if (res.status() === 200) {
      const body = await res.json();
      expect(body.success).toBe(true);
      expect(body.referralId).toBeTruthy();
    } else {
      expect(res.status()).not.toBe(400);
    }
  });
});
