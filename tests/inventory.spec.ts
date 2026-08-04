import { test, expect } from '@fixtures/pages.fixture';

test.describe('Inventory', () => {
  test.beforeEach(async ({ loginPage, page }) => {
    await loginPage.open();
    await loginPage.loginAs(
      process.env.TEST_USER ?? 'standard_user',
      process.env.TEST_PASSWORD ?? 'secret_sauce',
    );
    await expect(page).toHaveURL(/inventory/);
  });

  test('renders a non-empty product list', async ({ inventoryPage }) => {
    await expect(inventoryPage.items.first()).toBeVisible();
    expect(await inventoryPage.items.count()).toBeGreaterThan(0);
  });

  test('adding an item updates the cart badge', async ({ inventoryPage }) => {
    await inventoryPage.addFirstItemToCart();
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });
});
