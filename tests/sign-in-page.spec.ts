import { LoginRequestData } from "@/forms/auth/login-form";
import { test, expect, Page } from "@playwright/test";
import { v4 as uuidv4 } from "uuid";

test.describe("/auth/sign-in", () => {
    const formData: LoginRequestData = {
        email: `test${uuidv4()}@example.com`,
        password: "123456",
    };

    test.beforeEach(async ({ page }) => {
        await page.goto(`http://localhost:3000/auth/sign-in`);
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

    test("Email must not be empty on form submission", async ({ page }) => {
        const data: LoginRequestData = { ...formData, email: "" };

        await submitForm(page, data);
        await page.waitForSelector('[data-testid="txtEmail_err"]', {
            state: "visible",
        });
        await expect(page.getByTestId("txtEmail_err")).toBeVisible();
    });
});

const submitForm = async (page: Page, data: LoginRequestData) => {
    await page.getByTestId("txtEmail").fill(data.email);
    await page.getByTestId("txtPassword").fill(data.password);
    await page.getByTestId("btnSubmit").click();
};
