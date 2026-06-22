import { test, expect } from '@playwright/test';
import {
  suppressCookieBanner,
  mockBookingSuccess,
  mockBookingFailure,
  mockVisitorApi,
} from '../helpers';

test.beforeEach(async ({ page }) => {
  await suppressCookieBanner(page);
  await mockVisitorApi(page);
  await mockBookingSuccess(page);
  await page.goto('/book-appointment');
});

async function fillValidForm(page: import('@playwright/test').Page) {
  await page.getByLabel(/first name/i).fill('Jane');
  await page.getByLabel(/last name/i).fill('Smith');
  await page.getByLabel(/email/i).fill('jane.smith@example.com');
  await page.getByLabel(/phone/i).fill('+44 7700 900123');
  await page.getByLabel(/reason/i).selectOption({ index: 0 });
}

test('booking page renders the form', async ({ page }) => {
  await expect(page.getByLabel(/first name/i)).toBeVisible();
  await expect(page.getByLabel(/last name/i)).toBeVisible();
  await expect(page.getByLabel(/email/i)).toBeVisible();
  await expect(page.getByLabel(/phone/i)).toBeVisible();
  await expect(page.getByLabel(/reason/i)).toBeVisible();
  await expect(page.getByRole('button', { name: /confirm appointment/i })).toBeVisible();
});

test('submitting empty form shows required field errors', async ({ page }) => {
  await page.getByRole('button', { name: /confirm appointment/i }).click();
  await expect(page.getByRole('alert').first()).toBeVisible();
});

test('invalid email shows validation error', async ({ page }) => {
  await page.getByLabel(/first name/i).fill('Jane');
  await page.getByLabel(/last name/i).fill('Smith');
  await page.getByLabel(/email/i).fill('not-an-email');
  await page.getByLabel(/phone/i).fill('+44 7700 900123');
  await page.getByRole('button', { name: /confirm appointment/i }).click();
  await expect(page.locator('p[role="alert"]')).toContainText(/valid email/i);
});

test('invalid phone shows validation error', async ({ page }) => {
  await page.getByLabel(/first name/i).fill('Jane');
  await page.getByLabel(/last name/i).fill('Smith');
  await page.getByLabel(/email/i).fill('jane@example.com');
  await page.getByLabel(/phone/i).fill('abc');
  await page.getByRole('button', { name: /confirm appointment/i }).click();
  await expect(page.locator('p[role="alert"]')).toContainText(/valid phone/i);
});

test('valid form submission shows success state', async ({ page }) => {
  await fillValidForm(page);
  await page.getByRole('button', { name: /confirm appointment/i }).click();
  await expect(page.getByText(/appointment request has been received/i)).toBeVisible();
});

test('success state shows Add to Google Calendar button', async ({ page }) => {
  await fillValidForm(page);
  await page.getByRole('button', { name: /confirm appointment/i }).click();
  await expect(page.getByRole('link', { name: /google.*calendar/i })).toBeVisible();
});

test('success state shows Return to Home button', async ({ page }) => {
  await fillValidForm(page);
  await page.getByRole('button', { name: /confirm appointment/i }).click();
  const homeBtn = page.getByRole('link', { name: /return to home/i });
  await expect(homeBtn).toBeVisible();
  await expect(homeBtn).toHaveCSS('color', 'rgb(0, 0, 0)');
});

test('API error shows generic error message', async ({ page }) => {
  await mockBookingFailure(page);
  await fillValidForm(page);
  await page.getByRole('button', { name: /confirm appointment/i }).click();
  await expect(page.locator('p[role="alert"]')).toContainText(/went wrong/i);
});

test('submit button shows loading state during submission', async ({ page }) => {
  // Delay the mock response to observe the loading state
  await page.route('/api/booking', async (route) => {
    await new Promise((r) => setTimeout(r, 500));
    await route.fulfill({
      status: 200,
      body: JSON.stringify({ success: true, bookingId: 'x', calendarUrl: 'https://calendar.google.com' }),
    });
  });
  await fillValidForm(page);
  await page.getByRole('button', { name: /confirm appointment/i }).click();
  await expect(page.getByRole('button', { name: /sending/i })).toBeVisible();
});

test('date of birth field rejects future dates', async ({ page }) => {
  const futureDate = new Date();
  futureDate.setFullYear(futureDate.getFullYear() + 1);
  const iso = futureDate.toISOString().split('T')[0];

  await page.getByLabel(/first name/i).fill('Jane');
  await page.getByLabel(/last name/i).fill('Smith');
  await page.getByLabel(/date of birth/i).fill(iso);
  await page.getByLabel(/email/i).fill('jane@example.com');
  await page.getByLabel(/phone/i).fill('+44 7700 900123');
  await page.getByRole('button', { name: /confirm appointment/i }).click();
  await expect(page.locator('p[role="alert"]')).toContainText(/valid.*date|date.*birth/i);
});
