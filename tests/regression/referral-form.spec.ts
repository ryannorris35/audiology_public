import { test, expect } from '@playwright/test';
import {
  suppressCookieBanner,
  mockReferralSuccess,
  mockReferralFailure,
  mockVisitorApi,
} from '../helpers';

test.beforeEach(async ({ page }) => {
  await suppressCookieBanner(page);
  await mockVisitorApi(page);
  await mockReferralSuccess(page);
  await page.goto('/referrals');
});

async function fillValidReferral(page: import('@playwright/test').Page) {
  await page.getByLabel(/your first name/i).fill('John');
  await page.getByLabel(/your last name/i).fill('Davies');
  await page.getByLabel(/your email/i).fill('john.davies@example.com');
  await page.getByLabel(/full name of the person/i).fill('Mary Jones');
}

test('referrals page renders correctly', async ({ page }) => {
  await expect(page.getByRole('heading', { name: /refer a friend/i })).toBeVisible();
  await expect(page.getByText(/£30/i).first()).toBeVisible();
  await expect(page.getByText(/what is the referral/i)).toBeVisible();
  await expect(page.getByText(/how does it work/i)).toBeVisible();
});

test('referrals page shows four how-it-works steps', async ({ page }) => {
  const steps = page.getByText(/^\d\. /);
  await expect(steps).toHaveCount(4);
});

test('referral form renders all fields', async ({ page }) => {
  await expect(page.getByLabel(/your first name/i)).toBeVisible();
  await expect(page.getByLabel(/your last name/i)).toBeVisible();
  await expect(page.getByLabel(/your email/i)).toBeVisible();
  await expect(page.getByLabel(/phone/i)).toBeVisible();
  await expect(page.getByLabel(/full name of the person/i)).toBeVisible();
  await expect(page.getByRole('button', { name: /submit referral/i })).toBeVisible();
});

test('submitting empty form shows required field errors', async ({ page }) => {
  await page.getByRole('button', { name: /submit referral/i }).click();
  await expect(page.getByRole('alert').first()).toBeVisible();
});

test('invalid email shows validation error', async ({ page }) => {
  await page.getByLabel(/your first name/i).fill('John');
  await page.getByLabel(/your last name/i).fill('Davies');
  await page.getByLabel(/your email/i).fill('not-valid');
  await page.getByLabel(/full name of the person/i).fill('Mary Jones');
  await page.getByRole('button', { name: /submit referral/i }).click();
  await expect(page.locator('p[role="alert"]')).toContainText(/valid email/i);
});

test('optional phone field validates format when filled', async ({ page }) => {
  await page.getByLabel(/your first name/i).fill('John');
  await page.getByLabel(/your last name/i).fill('Davies');
  await page.getByLabel(/your email/i).fill('john@example.com');
  await page.getByLabel(/phone/i).fill('not-a-phone');
  await page.getByLabel(/full name of the person/i).fill('Mary Jones');
  await page.getByRole('button', { name: /submit referral/i }).click();
  await expect(page.locator('p[role="alert"]')).toContainText(/valid phone/i);
});

test('valid submission shows success message', async ({ page }) => {
  await fillValidReferral(page);
  await page.getByRole('button', { name: /submit referral/i }).click();
  await expect(page.getByText(/referral received/i)).toBeVisible();
  await expect(page.getByText(/£30 reward once they attend/i)).toBeVisible();
});

test('success state shows Return to Home button in black', async ({ page }) => {
  await fillValidReferral(page);
  await page.getByRole('button', { name: /submit referral/i }).click();
  const homeBtn = page.getByRole('link', { name: /return to home/i });
  await expect(homeBtn).toBeVisible();
  await expect(homeBtn).toHaveCSS('color', 'rgb(0, 0, 0)');
});

test('API error shows generic error message', async ({ page }) => {
  await mockReferralFailure(page);
  await fillValidReferral(page);
  await page.getByRole('button', { name: /submit referral/i }).click();
  await expect(page.locator('p[role="alert"]')).toContainText(/went wrong/i);
});

test('phone field is optional — form submits without it', async ({ page }) => {
  await page.getByLabel(/your first name/i).fill('John');
  await page.getByLabel(/your last name/i).fill('Davies');
  await page.getByLabel(/your email/i).fill('john@example.com');
  await page.getByLabel(/full name of the person/i).fill('Mary Jones');
  // Leave phone empty
  await page.getByRole('button', { name: /submit referral/i }).click();
  await expect(page.getByText(/referral received/i)).toBeVisible();
});
