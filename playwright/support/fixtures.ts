import { test as base } from "@playwright/test"
import { createLoginActions } from "./actions/loginActions"
import { createSignupActions } from "./actions/signupActions"
import { createHomeActions } from "./actions/homeActions"
import { createNavigationActions } from "./actions/navigationActions"

type App = {
  login: ReturnType<typeof createLoginActions>
  signup: ReturnType<typeof createSignupActions>
  home: ReturnType<typeof createHomeActions>
  navigation: ReturnType<typeof createNavigationActions>
}

export const test = base.extend<{ app: App }>({
  app: async ({ page }, use) => {
    const app: App = {
      login: createLoginActions(page),
      signup: createSignupActions(page),
      home: createHomeActions(page),
      navigation: createNavigationActions(page),
    }
    await use(app)
  },
})

export { expect } from "@playwright/test"
