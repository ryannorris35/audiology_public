import { test, expect } from '@playwright/test';
import { clearConsent, mockVisitorApi } from '../helpers';

test.beforeEach(async ({ page }) => {
  await mockVisitorApi(page);
  await page.goto('/');
  await clearConsent(page);
  await page.reload();
});

test('cookie banner appears on first visit', async ({ page }) => {
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('dialog')).toContainText(/cookie|privacy/i);
});

test('cookie banner does not appear after accepting', async ({ page }) => {
  await page.getByRole('button', { name: /accept/i }).click();
  await expect(page.getByRole('dialog')).toBeHidden();

  // Reload — banner should stay hidden
  await page.reload();
  await expect(page.getByRole('dialog')).toBeHidden();
});

test('cookie banner does not appear after declining', async ({ page }) => {
  await page.getByRole('button', { name: /decline/i }).click();
  await expect(page.getByRole('dialog')).toBeHidden();

  await page.reload();
  await expect(page.getByRole('dialog')).toBeHidden();
});

test('accept stores correct consent in localStorage', async ({ page }) => {
  await page.getByRole('button', { name: /accept/i }).click();
  const consent = await page.evaluate(() =>
    JSON.parse(localStorage.getItem('wb_cookie_consent') || '{}')
  );
  expect(consent.essential).toBe(true);
  expect(consent.analytics).toBe(true);
  expect(consent.marketing).toBe(true);
});

test('decline stores correct consent in localStorage', async ({ page }) => {
  await page.getByRole('button', { name: /decline/i }).click();
  const consent = await page.evaluate(() =>
    JSON.parse(localStorage.getItem('wb_cookie_consent') || '{}')
  );
  expect(consent.essential).toBe(true);
  expect(consent.analytics).toBe(false);
  expect(consent.marketing).toBe(false);
});

test('customise panel shows three categories', async ({ page }) => {
  await page.getByRole('button', { name: /more info|customis/i }).click();
  const panel = page.getByRole('dialog');
  await expect(panel).toContainText(/essential/i);
  await expect(panel).toContainText(/analytics/i);
  await expect(panel).toContainText(/marketing/i);
});

test('essential cookies checkbox is disabled', async ({ page }) => {
  await page.getByRole('button', { name: /more info|customis/i }).click();
  // Essential checkbox should be checked and disabled
  const essentialCheckbox = page.getByRole('dialog').locator('input[type="checkbox"]').first();
  await expect(essentialCheckbox).toBeChecked();
  await expect(essentialCheckbox).toBeDisabled();
});

test('save preferences stores partial consent', async ({ page }) => {
  await page.getByRole('button', { name: /more info|customis/i }).click();

  // Enable analytics, leave marketing off
  const checkboxes = page.getByRole('dialog').locator('input[type="checkbox"]:not(:disabled)');
  await checkboxes.first().check(); // analytics

  await page.getByRole('button', { name: /save/i }).click();
  await expect(page.getByRole('dialog')).toBeHidden();

  const consent = await page.evaluate(() =>
    JSON.parse(localStorage.getItem('wb_cookie_consent') || '{}')
  );
  expect(consent.essential).toBe(true);
  expect(consent.analytics).toBe(true);
  expect(consent.marketing).toBe(false);
});

test('footer privacy link re-opens cookie settings', async ({ page }) => {
  await page.getByRole('button', { name: /accept/i }).click();
  await page.locator('footer').getByRole('button', { name: /privacy|cookie/i }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
});
