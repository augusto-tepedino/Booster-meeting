import { test, expect } from "@playwright/test";

test("reach page", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(
    page.getByRole("link", { name: "Website for automation" }),
  ).toBeVisible();
});
