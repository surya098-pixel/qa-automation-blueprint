import { test, expect } from '@fixtures/pages.fixture';

test.describe('Login flow', () => {
  test('valid credentials land the user on the inventory page', async ({ loginPage, page }) => {
    await loginPage.open();
    await loginPage.loginAs(
      process.env.TEST_USER ?? 'standard_user',
      process.env.TEST_PASSWORD ?? 'secret_sauce',
    );
    await expect(page).toHaveURL(/inventory/);
  });

  test('invalid credentials show an error banner', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.loginAs('locked_out_user', 'wrong');
    await expect(loginPage.errorBanner).toBeVisible();
  });
});
