import { test, expect } from '@playwright/test';

/**
 * Visual regression tests using Playwright's built-in {@link toHaveScreenshot}.
 *
 * <b>Workflow:</b>
 * 1. First run locally to generate baselines: `npm run test:visual:update`
 * 2. Commit the resulting snapshot files under `tests/visual/__screenshots__/`
 * 3. Subsequent runs compare against baseline. Diffs are reported with an image.
 *
 * <b>Cross-platform note:</b> browsers render subtly differently on macOS / Linux / Windows.
 * The `visual` project in playwright.config isolates snapshots per platform. For CI-stable
 * baselines, generate them in the official Playwright Docker image:
 *
 *   docker run --rm -v $(pwd):/work -w /work mcr.microsoft.com/playwright:v1.48.0-jammy \
 *     npm run test:visual:update
 */

test.describe('Visual regression', () => {
  test('example.com landing page — full page snapshot', async ({ page }) => {
    await page.goto('https://example.com');

    // Wait for network idle so any lazy assets settle before capture.
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('example-landing.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.01, // tolerate 1% pixel drift (font antialiasing, etc.)
    });
  });

  test('example.com hero heading — component-level snapshot', async ({ page }) => {
    await page.goto('https://example.com');
    const heading = page.getByRole('heading', { level: 1 });

    await expect(heading).toHaveScreenshot('example-heading.png', {
      maxDiffPixelRatio: 0.005,
    });
  });
});
