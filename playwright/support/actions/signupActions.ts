import { type Page, expect } from "@playwright/test"
import { type UserData } from "../../helpers/user-factory"

export function createSignupActions(page: Page) {
  const nameInput = page.getByRole("textbox", { name: "Name" })
  const signupEmailInput = page.locator("form")
    .filter({ hasText: "Signup" })
    .getByRole("textbox", { name: "email" })
  const signupButton = page.getByRole("button", { name: "Signup" })

  const titleMr = page.getByRole("radio", { name: "Mr." })
  const titleMrs = page.getByRole("radio", { name: "Mrs." })
  const passwordInput = page.getByRole("textbox", { name: "Password" })
  const daysSelect = page.locator("#days")
  const monthsSelect = page.locator("#months")
  const yearsSelect = page.locator("#years")
  const newsletterCheckbox = page.getByRole("checkbox", { name: "Sign up for our newsletter!" })
  const offersCheckbox = page.getByRole("checkbox", { name: "Receive special offers from" })
  const firstNameInput = page.getByRole("textbox", { name: "First name" })
  const lastNameInput = page.getByRole("textbox", { name: "Last name" })
  const address1Input = page.getByRole("textbox", { name: "Address * (Street address, P." })
  const stateInput = page.getByRole("textbox", { name: "State" })
  const cityInput = page.getByRole("textbox", { name: "City" })
  const zipcodeInput = page.locator("#zipcode")
  const mobileInput = page.getByRole("textbox", { name: "Mobile Number" })
  const submitButton = page.getByRole("button", { name: "Create Account" })

  return {
    elements: {
      titleMr,
      titleMrs,
      passwordInput,
      firstNameInput,
      lastNameInput,
      address1Input,
      stateInput,
      cityInput,
      zipcodeInput,
      submitButton,
      signupButton
    },

    async executeSignup(name: string, email: string) {
      await nameInput.fill(name)
      await signupEmailInput.fill(email)
      await signupButton.click()
    },
    async waitForHeading() {
      const heading = page.getByRole("heading", { name: "Enter Account Information" })
      await expect(heading).toBeVisible()
    },

    async fillForm(user: UserData) {
      const companyInput = page.getByRole("textbox", { name: "Company", exact: true })
      const address2Input = page.getByRole("textbox", { name: "Address 2" })
      const countrySelect = page.getByLabel("Country")

      await titleMr.check()
      await passwordInput.fill(user.password)
      await daysSelect.selectOption(user.day)
      await monthsSelect.selectOption(user.month)
      await yearsSelect.selectOption(user.year)
      await newsletterCheckbox.check()
      await offersCheckbox.check()
      await firstNameInput.fill(user.firstName)
      await lastNameInput.fill(user.lastName)
      await companyInput.fill(user.company)
      await address1Input.fill(user.address1)
      await address2Input.fill(user.address2)
      await countrySelect.selectOption(user.country)
      await stateInput.fill(user.state)
      await cityInput.fill(user.city)
      await zipcodeInput.fill(user.zipcode)
      await mobileInput.fill(user.mobile)
      await submitButton.click()
    },

    async expectAccountCreated() {
      await expect(page).toHaveURL(/\/account_created/)
      await expect(page.getByText("Account Created!")).toBeVisible()
    },

    async expectEmailAlreadyExistsError() {
      const emailAlreadyExistsError = page.getByText("Email Address already exist!")
      await expect(emailAlreadyExistsError).toBeVisible()
    },

    async validateMissingPasswordMessage(expectedMessage: string) {
      const validationMessage = await passwordInput.evaluate((el: HTMLInputElement) => el.validationMessage)
      expect(validationMessage).toContain(expectedMessage)
    },
    async validateMissingFirstNameMessage(expectedMessage: string) {
      const validationMessage = await firstNameInput.evaluate((el: HTMLInputElement) => el.validationMessage)
      expect(validationMessage).toContain(expectedMessage)
    },
    async validateMissingLastNameMessage(expectedMessage: string) {
      const validationMessage = await lastNameInput.evaluate((el: HTMLInputElement) => el.validationMessage)
      expect(validationMessage).toContain(expectedMessage)
    },
    async validateMissingAddress1Message(expectedMessage: string) {
      const validationMessage = await address1Input.evaluate((el: HTMLInputElement) => el.validationMessage)
      expect(validationMessage).toContain(expectedMessage)
    },
    async validateMissingStateMessage(expectedMessage: string) {
      const validationMessage = await stateInput.evaluate((el: HTMLInputElement) => el.validationMessage)
      expect(validationMessage).toContain(expectedMessage)
    },
    async validateMissingCityMessage(expectedMessage: string) {
      const validationMessage = await cityInput.evaluate((el: HTMLInputElement) => el.validationMessage)
      expect(validationMessage).toContain(expectedMessage)
    },
    async validateMissingZipcodeMessage(expectedMessage: string) {
      const validationMessage = await zipcodeInput.evaluate((el: HTMLInputElement) => el.validationMessage)
      expect(validationMessage).toContain(expectedMessage)
    },
    async validateMissingMobileMessage(expectedMessage: string) {
      const validationMessage = await mobileInput.evaluate((el: HTMLInputElement) => el.validationMessage)
      expect(validationMessage).toContain(expectedMessage)
    },
    async validateMissingNameMessage(expectedMessage: string) {
      const validationMessage = await nameInput.evaluate((el: HTMLInputElement) => el.validationMessage)
      expect(validationMessage).toContain(expectedMessage)
    },
    async validateMissingSignupEmailMessage(expectedMessage: string) {
      const validationMessage = await signupEmailInput.evaluate((el: HTMLInputElement) => el.validationMessage)
      expect(validationMessage).toContain(expectedMessage)
    },

    async selectTitleMr() {
      await this.elements.titleMr.check({ force: true })
      await expect(titleMr).toBeChecked()
      await expect(titleMrs).not.toBeChecked()
    },

    async selectTitleMrs() {
      await this.elements.titleMrs.check({ force: true })
      await expect(titleMrs).toBeChecked()
      await expect(titleMr).not.toBeChecked()
    },

    async validateNoTitleNotChecked() {
      await expect(titleMr).not.toBeChecked()
      await expect(titleMrs).not.toBeChecked()
    },

    async validateNewslettersNotChecked() {
      await expect(newsletterCheckbox).not.toBeChecked()
      await expect(offersCheckbox).not.toBeChecked()
    },

    async validateDobDropdownsPopulated() {
      const dayOptions = await daysSelect.locator("option").count()
      const monthOptions = await monthsSelect.locator("option").count()
      const yearOptions = await yearsSelect.locator("option").count()

      expect(dayOptions).toBeGreaterThan(1)
      expect(monthOptions).toBeGreaterThan(1)
      expect(yearOptions).toBeGreaterThan(1)
    }
  }
}
