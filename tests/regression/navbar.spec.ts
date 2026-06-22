import { test, expect } from '@playwright/test';
import { NAV_LINKS, mockVisitorApi, acceptCookies } from '../helpers';

test.beforeEach(async ({ page }) => {
  await mockVisitorApi(page);
  await page.goto('/');
  await acceptCookies(page);
});

test.describe('Desktop navigation', () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test('all nav links are visible', async ({ page }) => {
    for (const { label } of NAV_LINKS) {
      await expect(page.locator('header nav').first().getByRole('link', { name: label })).toBeVisible();
    }
  });

  test('Book Appointment button is visible', async ({ page }) => {
    await expect(
      page.locator('header').getByRole('link', { name: /book appointment/i })
    ).toBeVisible();
  });

  test('clicking a nav link navigates to the correct page', async ({ page }) => {
    await page.locator('header nav').first().getByRole('link', { name: /micro.suction/i }).click();
    await expect(page).toHaveURL('/micro-suction');
  });

  test('active nav link has underline styling', async ({ page }) => {
    await page.goto('/micro-suction');
    const activeLink = page.locator('header nav').first().getByRole('link', { name: /micro.suction/i });
    await expect(activeLink).toHaveClass(/border-b-2/);
  });

  test('site name logo links to homepage', async ({ page }) => {
    await page.goto('/micro-suction');
    await page.locator('header').getByRole('link', { name: /huw latimer/i }).click();
    await expect(page).toHaveURL('/');
  });
});

test.describe('Mobile navigation', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('hamburger button is visible on mobile', async ({ page }) => {
    await expect(page.getByRole('button', { name: /menu/i })).toBeVisible();
  });

  test('desktop nav is hidden on mobile', async ({ page }) => {
    await expect(page.locator('header nav').first()).toBeHidden();
  });

  test('mobile menu opens and shows all links', async ({ page }) => {
    await page.getByRole('button', { name: /menu/i }).click();
    const mobileMenu = page.locator('#mobile-menu');
    await expect(mobileMenu).toBeVisible();
    for (const { label } of NAV_LINKS) {
      await expect(mobileMenu.getByRole('link', { name: label })).toBeVisible();
    }
  });

  test('mobile menu closes when a link is clicked', async ({ page }) => {
    await page.getByRole('button', { name: /menu/i }).click();
    await page.locator('#mobile-menu').getByRole('link', { name: /contact/i }).click();
    await expect(page).toHaveURL('/contact');
    await expect(page.locator('#mobile-menu')).toBeHidden();
  });

  test('mobile menu closes when hamburger is tapped again', async ({ page }) => {
    await page.getByRole('button', { name: /menu/i }).click();
    await expect(page.locator('#mobile-menu')).toBeVisible();
    await page.getByRole('button', { name: /menu/i }).click();
    await expect(page.locator('#mobile-menu')).toBeHidden();
  });
});
