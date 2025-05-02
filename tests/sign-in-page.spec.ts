import { test, expect } from "@playwright/test";

test.describe("Sign In Page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://localhost:3000/auth/sign-in");
    });

    test("should have correct elements", async ({ page }) => {
        await expect(
            page.getByRole("heading", { name: "Welcome Back" })
        ).toBeVisible();
    });

    test("Should redirect to /auth/create-account", async ({ page }) => {
        await page
            .getByRole("link", { name: "Don't have an Account?" })
            .click();
        await expect(
            page.getByRole("heading", { name: "Create Account" })
        ).toBeVisible();
    });
});
