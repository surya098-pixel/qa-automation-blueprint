import { test, expect } from '@playwright/test';

/**
 * API-only test using Playwright's request context — no browser needed.
 * Demonstrates schema-shape assertions against a public API.
 */
test.describe('PokeAPI contract', () => {
  test('GET /pokemon/pikachu returns a well-formed payload', async ({ request }) => {
    const res = await request.get('https://pokeapi.co/api/v2/pokemon/pikachu');
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body).toMatchObject({
      name: 'pikachu',
      id: expect.any(Number),
      abilities: expect.any(Array),
    });
    expect(body.abilities.length).toBeGreaterThan(0);
  });
});
