import { test } from "../support/fixtures"
import { generateUser } from "../helpers/user-factory"

test.describe("Reach signup page", () => {
  test("reach signup page by goto", async ({ app }) => {
    await app.login.goto()
    await app.login.expectHeadingVisible()
  })

  test("reach signup page by link", async ({ page, app }) => {
    await page.goto("/")
    await app.login.elements.signupNavLink.click()
    await app.login.expectHeadingVisible()
  })
})

test.describe("Validate valid signup", () => {
  test.beforeEach(async ({ app }) => {
    await app.login.goto()
    await app.login.expectSignupNavLinkVisible()
  })

  test("User Signup", async ({ app }) => {
    const user = generateUser()

    await app.signup.executeSignup(user.name, user.email)
    await app.signup.fillForm(user)

    await app.signup.expectAccountCreated()
  })
})

test.describe("Validate signup details form", () => {
  test.beforeEach(async ({ app }) => {
    const user = generateUser()
    await app.login.goto()
    await app.signup.executeSignup(user.name, user.email)
    await app.signup.waitForHeading()
  })

  test("Validate required fields", async ({ app }) => {
    const missingFieldMessage = "Please fill out this field."

    await app.signup.elements.submitButton.click()
    await app.signup.validateMissingPasswordMessage(missingFieldMessage)

    await app.signup.elements.passwordInput.fill("Test1234!")
    await app.signup.elements.submitButton.click()
    await app.signup.validateMissingFirstNameMessage(missingFieldMessage)

    await app.signup.elements.firstNameInput.fill("John")
    await app.signup.elements.submitButton.click()
    await app.signup.validateMissingLastNameMessage(missingFieldMessage)

    await app.signup.elements.lastNameInput.fill("Doe")
    await app.signup.elements.submitButton.click()
    await app.signup.validateMissingAddress1Message(missingFieldMessage)

    await app.signup.elements.address1Input.fill("123 Main St")
    await app.signup.elements.submitButton.click()
    await app.signup.validateMissingStateMessage(missingFieldMessage)

    await app.signup.elements.stateInput.fill("CA")
    await app.signup.elements.cityInput.fill("Los Angeles")
    await app.signup.elements.submitButton.click()
    await app.signup.validateMissingZipcodeMessage(missingFieldMessage)

    await app.signup.elements.zipcodeInput.fill("90001")
    await app.signup.elements.submitButton.click()
    await app.signup.validateMissingMobileMessage(missingFieldMessage)
  })

  test("Validate Title radios are unchecked by default", async ({ app }) => {
    await app.signup.validateNoTitleNotChecked()
  })

  test("Validate Newsletter checkboxes are unchecked by default", async ({ app }) => {
    await app.signup.validateNewslettersNotChecked()
  })

  test("Validate DOB dropdowns are visible and populated", async ({ app }) => {
    await app.signup.validateDobDropdownsPopulated()
  })

  test("Validate User can switch title from Mr. to Mrs.", async ({ app }) => {
    await app.signup.selectTitleMr()
    await app.signup.selectTitleMrs()
  })

  test("Validate User can switch title from Mrs. to Mr.", async ({ app }) => {
    await app.signup.selectTitleMrs()
    await app.signup.selectTitleMr()

  })
})

test.describe("Validate Invalid signup", () => {
  test.beforeEach(async ({ app }) => {
    await app.login.goto()
    await app.login.expectSignupNavLinkVisible()
  })

  test("Signup with existing email", async ({ app }) => {
    const user = {
      name: "myuser",
      email: "myownaccount@google.com",
    }

    await app.signup.executeSignup(user.name, user.email)
    await app.signup.expectEmailAlreadyExistsError()
  })

  test("Signup with invalid email - no @", async ({ app }) => {
    const user = { name: "myuser", email: "invalidEmail.com" }
    await app.signup.executeSignup(user.name, user.email)

    await app.signup.validateMissingSignupEmailMessage(`Please include an '@' in the email address. '${user.email}' is missing an '@'.`)
  })

  test("Signup with invalid email - Nothing before @", async ({ app }) => {
    const user = { name: "myuser", email: "@domain.com" }
    await app.signup.executeSignup(user.name, user.email)

    await app.signup.validateMissingSignupEmailMessage(`Please enter a part followed by '@'. '${user.email}' is incomplete.`)
  })

  test("Signup with invalid email - Nothing after @", async ({ app }) => {
    const user = { name: "myuser", email: "myownaccount@" }
    await app.signup.executeSignup(user.name, user.email)

    await app.signup.validateMissingSignupEmailMessage(`Please enter a part following '@'. '${user.email}' is incomplete.`)
  })

  test("Signup with invalid email - . after @", async ({ app }) => {
    const user = { name: "myuser", email: "myownaccount@.com" }
    await app.signup.executeSignup(user.name, user.email)

    await app.signup.validateMissingSignupEmailMessage(`'.' is used at a wrong position in '${user.email.split("@")[1]}'.`)
  })

  test("Signup with no name", async ({ app }) => {
    await app.signup.elements.signupButton.click()

    await app.signup.validateMissingNameMessage("Please fill out this field.")
  })
})
