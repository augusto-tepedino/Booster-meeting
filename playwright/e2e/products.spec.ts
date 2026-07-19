import { test } from "../support/fixtures"

test.describe("Products Domain", () => {
  test("API 1: Get All Products List", async ({ app }) => {
    await app.products.validateGetAllProductsListResponse()
  })

  test("API 2: Post to all Products List", async ({ app }) => {
    await app.products.validatePostAllProductsListResponse()
  })
})