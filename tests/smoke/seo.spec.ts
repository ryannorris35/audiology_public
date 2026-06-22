import { test, expect } from '@playwright/test';
import { mockVisitorApi } from '../helpers';

test.beforeEach(async ({ page }) => {
  await mockVisitorApi(page);
});

const SEO_PAGES = [
  {
    path: '/',
    titleContains: 'Swansea',
    descriptionContains: 'hearing',
  },
  {
    path: '/micro-suction',
    titleContains: 'Ear Wax',
    descriptionContains: 'micro-suction',
  },
  {
    path: '/types-of-hearing-aids',
    titleContains: 'Hearing Aids',
    descriptionContains: 'Swansea',
  },
  {
    path: '/about-hearing-impairment',
    titleContains: 'Hearing Impairment',
    descriptionContains: 'audiologist',
  },
  {
    path: '/contact',
    titleContains: 'Contact',
    descriptionContains: 'Swansea',
  },
  {
    path: '/book-appointment',
    titleContains: 'Book',
    descriptionContains: 'appointment',
  },
  {
    path: '/referrals',
    titleContains: 'Refer',
    descriptionContains: '£30',
  },
];

for (const { path, titleContains, descriptionContains } of SEO_PAGES) {
  test(`${path} — title contains "${titleContains}"`, async ({ page }) => {
    await page.goto(path);
    const title = await page.title();
    expect(title.toLowerCase()).toContain(titleContains.toLowerCase());
  });

  test(`${path} — meta description contains "${descriptionContains}"`, async ({ page }) => {
    await page.goto(path);
    const description = await page
      .locator('meta[name="description"]')
      .getAttribute('content');
    expect(description?.toLowerCase()).toContain(descriptionContains.toLowerCase());
  });

  test(`${path} — has Open Graph tags`, async ({ page }) => {
    await page.goto(path);
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toBeTruthy();
  });
}

test('JSON-LD LocalBusiness schema is present on homepage', async ({ page }) => {
  await page.goto('/');
  const schema = await page.locator('script[type="application/ld+json"]').first().textContent();
  expect(schema).toBeTruthy();
  const parsed = JSON.parse(schema!);
  expect(parsed['@type']).toContain('LocalBusiness');
  expect(parsed.name).toContain('Huw Latimer');
  expect(parsed.address.addressLocality).toBe('Swansea');
});
