import { Page } from '@playwright/test';

export const PAGES = [
  { path: '/',                          title: /Huw Latimer/i },
  { path: '/about-hearing-impairment',  title: /Hearing Impairment/i },
  { path: '/micro-suction',             title: /Micro.Suction|Ear Wax/i },
  { path: '/types-of-hearing-aids',     title: /Hearing Aids/i },
  { path: '/contact',                   title: /Contact/i },
  { path: '/book-appointment',          title: /Book/i },
  { path: '/referrals',                 title: /Refer/i },
];

export const NAV_LINKS = [
  { label: /home/i,               href: '/' },
  { label: /hearing impairment/i, href: '/about-hearing-impairment' },
  { label: /micro.suction/i,      href: '/micro-suction' },
  { label: /hearing aids/i,       href: '/types-of-hearing-aids' },
  { label: /contact/i,            href: '/contact' },
  { label: /referrals/i,          href: '/referrals' },
];

/** Dismiss the cookie banner so it doesn't interfere with other interactions. */
export async function acceptCookies(page: Page) {
  const banner = page.getByRole('dialog');
  if (await banner.isVisible({ timeout: 3000 }).catch(() => false)) {
    await page.getByRole('button', { name: /accept/i }).click();
  }
}

/** Decline cookies — useful for testing the anonymous tracking path. */
export async function declineCookies(page: Page) {
  const banner = page.getByRole('dialog');
  if (await banner.isVisible({ timeout: 3000 }).catch(() => false)) {
    await page.getByRole('button', { name: /decline/i }).click();
  }
}

/** Clear cookie consent from localStorage so the banner reappears. */
export async function clearConsent(page: Page) {
  await page.evaluate(() => localStorage.removeItem('wb_cookie_consent'));
}

/** Mock the booking API to return a success response. */
export async function mockBookingSuccess(page: Page) {
  await page.route('/api/booking', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        bookingId: 'test-booking-id',
        calendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE',
        emailSent: false,
      }),
    })
  );
}

/** Mock the booking API to return a server error. */
export async function mockBookingFailure(page: Page) {
  await page.route('/api/booking', (route) =>
    route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Internal server error' }),
    })
  );
}

/** Mock the referral API to return a success response. */
export async function mockReferralSuccess(page: Page) {
  await page.route('/api/referral', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, referralId: 'test-referral-id' }),
    })
  );
}

/** Mock the referral API to return a server error. */
export async function mockReferralFailure(page: Page) {
  await page.route('/api/referral', (route) =>
    route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Internal server error' }),
    })
  );
}

/** Mock the visitor API so tests don't write to the real database. */
export async function mockVisitorApi(page: Page) {
  await page.route('/api/visitor', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ ok: true }),
    })
  );
}
