import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 4 : undefined,
  timeout: 30_000,
  expect: {
    timeout: 5_000,
    // Snapshot config — segregates baselines per platform to avoid font/rendering drift.
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.02,
      threshold: 0.2,
    },
  },
  snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}/{arg}-{projectName}-{platform}{ext}',

  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright', { detail: true, resultsDir: 'allure-results' }],
    ...(isCI ? [['github'] as const] : []),
  ],

  use: {
    baseURL: process.env.BASE_URL ?? 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
  },

  projects: [
    // Default browser matrix — visual tests are excluded via testIgnore.
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: ['**/visual/**'],
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testIgnore: ['**/visual/**'],
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      testIgnore: ['**/visual/**'],
    },
    { name: 'mobile-chrome', use: { ...devices['Pixel 7'] }, testIgnore: ['**/visual/**'] },
    { name: 'mobile-safari', use: { ...devices['iPhone 14'] }, testIgnore: ['**/visual/**'] },

    // Dedicated visual regression project — opt-in via `npm run test:visual`.
    // Not run in the default CI matrix; needs baseline snapshots generated in
    // a consistent environment (Docker recommended).
    {
      name: 'visual',
      use: { ...devices['Desktop Chrome'] },
      testMatch: ['**/visual/**'],
    },
  ],
});
