import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Accessibility tests using axe-core.
 *
 * Runs the WCAG 2.1 A + AA rulesets against the login and inventory pages.
 * A real project would gate PRs on this — every new component should be a11y-clean.
 *
 * Docs: https://github.com/dequelabs/axe-core-npm/blob/develop/packages/playwright/README.md
 */

test.describe('Accessibility — WCAG 2.1 A/AA', () => {
  test('login page has no serious violations', async ({ page }) => {
    await page.goto('/');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    // Fail only on serious/critical — moderate can be a follow-up ticket.
    const blockers = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical',
    );

    if (blockers.length > 0) {
      console.log('Accessibility violations:', JSON.stringify(blockers, null, 2));
    }

    expect(blockers).toEqual([]);
  });

  test('inventory page has no serious violations after login', async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('Username').fill(process.env.TEST_USER ?? 'standard_user');
    await page.getByPlaceholder('Password').fill(process.env.TEST_PASSWORD ?? 'secret_sauce');
    await page.getByRole('button', { name: /login/i }).click();
    await expect(page).toHaveURL(/inventory/);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .disableRules(['color-contrast']) // saucedemo has known contrast issues; example of scoped exclusion
      .analyze();

    const blockers = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical',
    );

    expect(blockers).toEqual([]);
  });
});
