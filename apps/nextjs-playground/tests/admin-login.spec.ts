import { test, expect, Page } from "@playwright/test";

test.describe("Admin Login Flow", () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
  });

  test("should allow access to admin route", async () => {
    // Visit the /admin route with a longer timeout
    const adminResponse = await page.goto("http://localhost:3000/admin");

    // Check that the /admin page loaded without an error
    expect(adminResponse?.status()).toBe(200);
  });

  test.afterEach(async () => {
    await page.close();
  });
});
