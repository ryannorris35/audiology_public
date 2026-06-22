import { test, expect } from '@playwright/test';
import { PAGES, mockVisitorApi } from '../helpers';

test.beforeEach(async ({ page }) => {
  await mockVisitorApi(page);
});

for (const { path, title } of PAGES) {
  test(`${path} — loads with correct title`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(title);
  });

  test(`${path} — has navbar and footer`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test(`${path} — has no broken images`, async ({ page }) => {
    const failedImages: string[] = [];
    page.on('response', (response) => {
      if (
        response.request().resourceType() === 'image' &&
        response.status() >= 400
      ) {
        failedImages.push(response.url());
      }
    });
    await page.goto(path);
    await page.waitForLoadState('networkidle');
    expect(failedImages, `Broken images on ${path}: ${failedImages.join(', ')}`).toHaveLength(0);
  });
}

test('sitemap.xml is accessible and contains all pages', async ({ request }) => {
  const response = await request.get('/sitemap.xml');
  expect(response.status()).toBe(200);
  const body = await response.text();
  expect(body).toContain('<urlset');
  expect(body).toContain('/micro-suction');
  expect(body).toContain('/book-appointment');
  expect(body).toContain('/referrals');
});

test('robots.txt is accessible', async ({ request }) => {
  const response = await request.get('/robots.txt');
  expect(response.status()).toBe(200);
  const body = await response.text();
  expect(body).toContain('User-agent');
  expect(body).toContain('sitemap.xml');
  expect(body).toContain('/api/');
});
