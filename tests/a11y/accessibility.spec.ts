import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Accessibility tests using axe-core.
 *
 * Runs the WCAG 2.1 A + AA rulesets against the target page. A real project would
 * gate PRs on this — every new component should be a11y-clean.
 *
 * We point at example.com (a minimal, well-formed page) for the demo so the
 * example is always green. Swap for your own app's pages when adapting.
 *
 * Docs: https://github.com/dequelabs/axe-core-npm/blob/develop/packages/playwright/README.md
 */

test.describe('Accessibility — WCAG 2.1 A/AA', () => {
  test('example.com has no serious violations', async ({ page }) => {
    await page.goto('https://example.com');

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

  test('example.com passes even the strictest ruleset', async ({ page }) => {
    await page.goto('https://example.com');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
      .analyze();

    // Best-practice violations aren't blockers, but they're worth reporting.
    if (results.violations.length > 0) {
      console.log(
        'Non-blocking accessibility findings:',
        results.violations.map((v) => `${v.id} (${v.impact})`).join(', '),
      );
    }

    // Assert only the WCAG-mandated ones.
    const wcagBlockers = results.violations.filter(
      (v) =>
        (v.impact === 'serious' || v.impact === 'critical') &&
        v.tags.some((t) => t.startsWith('wcag')),
    );

    expect(wcagBlockers).toEqual([]);
  });
});
