import { test, expect } from '@playwright/test';

/**
 * Network mocking example — intercept and stub a third-party request
 * so the UI test never depends on live network state.
 */
test('page.route intercepts and stubs an outbound request', async ({ page }) => {
  await page.route('**/api/v2/pokemon/pikachu', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ name: 'mockchu', id: 999 }),
    });
  });

  const res = await page.request.get('https://pokeapi.co/api/v2/pokemon/pikachu');
  const body = await res.json();
  expect(body.name).toBe('mockchu');
});
