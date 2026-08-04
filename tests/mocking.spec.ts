import { test, expect } from '@playwright/test';

/**
 * Network mocking example — intercept a browser-context request and return a stub.
 *
 * Note: page.route() only intercepts requests made from the browser page
 * (fetch/XHR from the loaded document). The APIRequestContext exposed at
 * `page.request` runs in Node and is NOT intercepted — so we go through
 * page.evaluate() to make the call from the page context, where the route
 * hook can see it.
 */
test('page.route intercepts and stubs an outbound request', async ({ page }) => {
  await page.route('**/api/v2/pokemon/pikachu', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ name: 'mockchu', id: 999 }),
    });
  });

  await page.goto('about:blank');

  const body = await page.evaluate(async () => {
    const r = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu');
    return r.json();
  });

  expect(body.name).toBe('mockchu');
  expect(body.id).toBe(999);
});
