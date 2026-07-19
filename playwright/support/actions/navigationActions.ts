import { type Page, expect } from "@playwright/test"

export function createNavigationActions(page: Page) {
  const signupNavLink = page.getByRole("link", { name: "Signup / Login" })

  return {
    elements: {
      signupNavLink
    },

    async expectSignupNavLinkVisible() {
      await expect(signupNavLink).toBeVisible()
    },

    async expectLogoutLinkVisible() {
      const logoutLink = page.getByRole("link", { name: "Logout" })
      await expect(logoutLink).toBeVisible()
    },

    async expectWebsiteLinkVisible() {
      const websiteLink = page.getByRole("link", { name: "Website for automation" })
      await expect(websiteLink).toBeVisible()
    }
  }
}
