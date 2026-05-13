import { Locator, Page } from "@playwright/test";
import generalData from "../Datas/generalData.json"

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

    async Login(username: string, password: string) {
        await this.username.fill(username)
        await this.password.fill(password)
        await this.login.click()
    }

    async forgotPasswordLink() {
        await this.forgotPassword.click()
    }

    async isUrlLoginPage() {
        return this.page.url().includes(generalData[0].url_loginPage);
    }

    async getErrorMessageInvalidCredencial() {
        return await this.errorMessageInvalidCredencial.textContent()
    }

    async getErrorMessageUsernameRequired() {
        return await this.errorMessageUsernameRequired.textContent()
    }

    async getErrorMessagePasswordRequired() {
        return await this.errorMessagePasswordRequired.textContent()
    }
}

export default loginPage