import { test as base, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';

/**
 * Authenticated fixture — logs in once per worker via storageState.
 * Extend this for any test that starts already-logged-in.
 */
export const test = base.extend<{ loggedIn: void }>({
  loggedIn: [
    async ({ page }, use) => {
      const user = process.env.TEST_USER ?? 'standard_user';
      const pass = process.env.TEST_PASSWORD ?? 'secret_sauce';

      const login = new LoginPage(page);
      await login.open();
      await login.loginAs(user, pass);
      await expect(page).toHaveURL(/inventory/);

      await use();
    },
    { auto: true },
  ],
});

export { expect };
