import { type Page, expect } from "@playwright/test"

export function createHomeActions(page: Page) {

  return {
    async goto() {
      await page.goto("/")
    }
  }
}
