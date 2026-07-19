import { type Page, expect } from "@playwright/test"

export function createProductActions(page: Page) {

  return {
    async validateGetAllProductsListResponse() {
      const response = await page.request.get('https://automationexercise.com/api/productsList')
      expect(response.status()).toBe(200)

      const responseBody = await response.json()
      expect(responseBody).toBeDefined()
      expect(responseBody).toHaveProperty('products')
      expect(Array.isArray(responseBody.products)).toBeTruthy()

      const items = responseBody.products;
      items.forEach((item: { name: string }) => {
        console.log(`Item Name: ${item.name}`);
      });
    },

    async validatePostAllProductsListResponse() {
      const response = await page.request.post('https://automationexercise.com/api/productsList')
      expect(response.status()).toBe(200)

      const responseBody = await response.json()
      expect(responseBody.responseCode).toBe(405)
      expect(responseBody.message).toBe("This request method is not supported.")
      console.log(responseBody.message)
    }
  }
}
