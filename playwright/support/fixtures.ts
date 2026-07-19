import { test as base } from "@playwright/test"
import { createLoginActions } from "./actions/loginActions"
import { createSignupActions } from "./actions/signupActions"
import { createHomeActions } from "./actions/homeActions"

type App = {
  login: ReturnType<typeof createLoginActions>
  signup: ReturnType<typeof createSignupActions>
  home: ReturnType<typeof createHomeActions>
}

export const test = base.extend<{ app: App }>({
  app: async ({ page }, use) => {
    const app: App = {
      login: createLoginActions(page),
      signup: createSignupActions(page),
      home: createHomeActions(page),
    }
    await use(app)
  },
})

export { expect } from "@playwright/test"
