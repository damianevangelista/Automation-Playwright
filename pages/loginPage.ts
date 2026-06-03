import { expect, Locator, Page } from "@playwright/test";
import * as allure from "allure-js-commons";

class loginPage {
    private page: Page;
    private username: Locator;
    private password: Locator;
    private login: Locator;
    private forgotPassword: Locator;
    private errorMessageInvalidCredencial: Locator;
    private errorMessageUsernameRequired: Locator;
    private errorMessagePasswordRequired: Locator;


    constructor(page: Page) {
        this.page = page;
        this.username = this.page.locator('input[name="username"]');
        this.password = this.page.locator('input[name="password"]');
        this.login = this.page.locator('button[type="submit"]');
        this.forgotPassword = this.page.locator('.orangehrm-login-forgot')
        this.errorMessageInvalidCredencial = this.page.getByRole('alert');
        this.errorMessageUsernameRequired = this.page.locator('.oxd-input-field-error-message').first();
        this.errorMessagePasswordRequired = this.page.locator('.oxd-input-field-error-message').last();
    }

    async openBrowser() {
        await allure.step('Open Browser', async () => {
            await this.page.goto(process.env.baseurl!)
        })
    }

    async Login(username: string, password: string) {
        await allure.step('Fill Username', async () => {
            await expect(this.username).toBeVisible()
            await this.username.fill(username)
        })
        await allure.step('Fill Password', async () => {
            await expect(this.password).toBeVisible()
            await this.password.fill(password)
        })
        await allure.step('Click Login', async () => {
            await expect(this.login).toBeVisible()
            await this.login.click()
        })
    }

    async forgotPasswordLink() {
        await allure.step('Click Forgot Password', async () => {
            await expect(this.forgotPassword).toBeVisible()
            await this.forgotPassword.click()
        })
    }

    async isUrlLoginPage() {
        return await allure.step('Check Login Page URL', async () => {
            expect(this.page.url().includes('/web/index.php/auth/login')).toBe(true);
        })
    }

    async getErrorMessageInvalidCredencial() {
        return await allure.step('Get Error Message Invalid Credencial', async () => {
            return await this.errorMessageInvalidCredencial.textContent()
        })
    }

    async getErrorMessageUsernameRequired() {
        return await allure.step('Get Error Message Username Required', async () => {
            return await this.errorMessageUsernameRequired.textContent()
        })
    }

    async getErrorMessagePasswordRequired() {
        return await allure.step('Get Error Message Password Required', async () => {
            return await this.errorMessagePasswordRequired.textContent()
        })
    }
}

export default loginPage