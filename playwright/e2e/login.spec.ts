import { test } from "../support/fixtures"
import { generateUser } from "../helpers/user-factory"

test.describe("Reach login page", () => {
  test("reach login page by goto", async ({ app }) => {
    await app.login.goto()
    await app.login.expectHeadingVisible()
  })

  test("reach login page by link", async ({ page, app }) => {
    await page.goto("/")
    await app.login.elements.signupNavLink.click()
    await app.login.expectHeadingVisible()
  })
})

test.describe("Validate login", () => {
  test.beforeEach(async ({ app }) => {
    await app.login.goto()
    await app.login.expectHeadingVisible()
  })

  test("Login with no credentials", async ({ app }) => {
    await app.login.elements.loginButton.click()

    await app.login.validateMissingEmailMessage("Please fill out this field.")
  })

  test("Login with valid credentials", async ({ app }) => {
    const user = { email: "myownuser@google.com", password: "myownuser" }
    await app.login.fillLoginForm(user.email, user.password)

    await app.login.expectLogoutLinkVisible()
  })

  test("Login with no password", async ({ app }) => {
    const user = { email: "myownuser@google.com" }
    await app.login.elements.loginEmailInput.fill(user.email)
    await app.login.elements.loginButton.click()

    await app.login.validateMissingPasswordMessage("Please fill out this field.")
  })

  test("Login with invalid credentials", async ({ app }) => {
    const user = { email: "myownuser@google.com", password: "my" }
    await app.login.fillLoginForm(user.email, user.password)

    await app.login.expectInvalidCredentialsError()
  })
})