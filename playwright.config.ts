import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }], ['list']],

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    // Smoke tests run across all three browsers
    {
      name: 'smoke-chromium',
      testMatch: '**/smoke/**/*.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'smoke-firefox',
      testMatch: '**/smoke/**/*.spec.ts',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'smoke-webkit',
      testMatch: '**/smoke/**/*.spec.ts',
      use: { ...devices['Desktop Safari'] },
    },
    // Regression tests run on Chromium only (fast feedback)
    {
      name: 'regression',
      testMatch: '**/regression/**/*.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    // Regression on mobile viewport too
    {
      name: 'regression-mobile',
      testMatch: '**/regression/**/*.spec.ts',
      use: { ...devices['iPhone 14'] },
    },
    // API and unit tests — no browser needed
    {
      name: 'api',
      testMatch: '**/api/**/*.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'unit',
      testMatch: '**/unit/**/*.spec.ts',
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
