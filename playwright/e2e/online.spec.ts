import { test } from "../support/fixtures"

test("reach page", async ({ app }) => {
  await app.home.goto()

  await app.navigation.expectWebsiteLinkVisible()
})
