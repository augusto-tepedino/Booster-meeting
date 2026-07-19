import { type Page, expect } from "@playwright/test"

export function createLoginActions(page: Page) {
  const signupNavLink = page.getByRole("link", { name: "Signup / Login" })
  const loginEmailInput = page.locator("form")
    .filter({ hasText: "Login" })
    .getByRole("textbox", { name: "email" })
  const loginPasswordInput = page.getByRole("textbox", { name: "Password" })
  const loginButton = page.getByRole("button", { name: "Login" })

  return {
    elements: {
      signupNavLink,
      loginEmailInput,
      loginButton
    },

    async goto() {
      await page.goto("/login")
      await expect(page).toHaveURL(/\/login/)
    },

    async fillLoginForm(email: string, password: string) {
      await loginEmailInput.fill(email)
      await loginPasswordInput.fill(password)
      await loginButton.click()
    },

    async expectHeadingVisible() {
      const heading = page.getByRole("heading", { name: "Login to your account" })
      await expect(heading).toBeVisible()
    },

    async expectSignupNavLinkVisible() {
      await expect(signupNavLink).toBeVisible()
    },

    async expectLogoutLinkVisible() {
      const logoutLink = page.getByRole("link", { name: "Logout" })
      await expect(logoutLink).toBeVisible()
    },

    async expectInvalidCredentialsError() {
      const invalidCredentialsError = page.getByText("Your email or password is incorrect!")
      await expect(invalidCredentialsError).toBeVisible()
    },

    async validateMissingEmailMessage(expectedMessage: string) {
      const validationMessage = await loginEmailInput.evaluate((el: HTMLInputElement) => el.validationMessage)
      expect(validationMessage).toContain(expectedMessage)
    },

    async validateMissingPasswordMessage(expectedMessage: string) {
      const validationMessage = await loginPasswordInput.evaluate((el: HTMLInputElement) => el.validationMessage)
      expect(validationMessage).toContain(expectedMessage)
    }
  }
}
