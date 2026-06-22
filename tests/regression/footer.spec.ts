import { test, expect } from '@playwright/test';
import { acceptCookies, mockVisitorApi } from '../helpers';

test.beforeEach(async ({ page }) => {
  await mockVisitorApi(page);
  await page.goto('/');
  await acceptCookies(page);
});

test('footer is present on every page', async ({ page }) => {
  const paths = ['/', '/micro-suction', '/contact', '/book-appointment', '/referrals'];
  for (const path of paths) {
    await page.goto(path);
    await expect(page.locator('footer'), `Footer missing on ${path}`).toBeVisible();
  }
});

test('footer LinkedIn button links to correct profile', async ({ page }) => {
  const link = page.locator('footer').getByRole('link', { name: /linkedin/i });
  await expect(link).toHaveAttribute('href', 'https://www.linkedin.com/in/huw-latimer-125821418/');
  await expect(link).toHaveAttribute('target', '_blank');
  await expect(link).toHaveAttribute('rel', /noopener/);
});

test('footer Facebook button links to correct profile', async ({ page }) => {
  const link = page.locator('footer').getByRole('link', { name: /facebook/i });
  await expect(link).toHaveAttribute('href', 'https://www.facebook.com/profile.php?id=61590933583878');
  await expect(link).toHaveAttribute('target', '_blank');
});

test('footer Instagram button links to correct profile', async ({ page }) => {
  const link = page.locator('footer').getByRole('link', { name: /instagram/i });
  await expect(link).toHaveAttribute('href', 'https://www.instagram.com/huwlatimeraudiologist/');
  await expect(link).toHaveAttribute('target', '_blank');
});

test('footer quick links navigate correctly', async ({ page }) => {
  await page.locator('footer').getByRole('link', { name: /micro.suction/i }).click();
  await expect(page).toHaveURL('/micro-suction');
});

test('footer book appointment link navigates correctly', async ({ page }) => {
  await page.locator('footer').getByRole('link', { name: /book appointment/i }).click();
  await expect(page).toHaveURL('/book-appointment');
});

test('footer shows correct copyright year', async ({ page }) => {
  const year = new Date().getFullYear().toString();
  await expect(page.locator('footer')).toContainText(year);
});

test('footer privacy button opens cookie settings panel', async ({ page }) => {
  await page.locator('footer').getByRole('button', { name: /privacy|cookie/i }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
});
