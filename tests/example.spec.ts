import 'dotenv/config'
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto(process.env.TEST_URL!);

  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  await page.getByRole('link', { name: 'Get started' }).click();

  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
