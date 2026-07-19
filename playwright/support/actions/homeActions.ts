import { type Page, expect } from "@playwright/test"

export function createHomeActions(page: Page) {

  return {
    async goto() {
      await page.goto("/")
    },

    async expectWebsiteLinkVisible() {
      const websiteLink = page.getByRole("link", { name: "Website for automation" })
      await expect(websiteLink).toBeVisible()
    }
  }
}
