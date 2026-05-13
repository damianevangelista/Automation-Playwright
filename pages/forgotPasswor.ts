import { Locator, Page } from "@playwright/test";
import generalData from "../Datas/generalData.json"

class forgotPasswordPage {
    private page: Page;
    private resetPasswordTitle: Locator;
    private usernameRequiredError: Locator;
    private usernameInput: Locator;
    private resetPasswordButton: Locator;
    private cancelButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.resetPasswordTitle = this.page.getByRole('heading', { name: 'Reset Password' });
        this.usernameRequiredError = this.page.locator('.oxd-text.oxd-text--span.oxd-input-field-error-message');
        this.usernameInput = this.page.locator('input[name="username"]');
        this.resetPasswordButton = this.page.getByRole('button', { name: 'Reset Password' })
        this.cancelButton = this.page.getByRole('button', { name: 'Cancel' })

    }

    async isUrlForgotPassword() {
        return this.page.url().includes(generalData[0].url_forgotPassword)
    }

    async getResetPasswordTitle() {
        return await this.resetPasswordTitle.textContent()
    }

    async getUsernameRequiredError() {
        return await this.usernameRequiredError.textContent()
    }

    async fillUsername(username: string) {
        await this.usernameInput.fill(username)
    }

    async clickResetPassword() {
        await this.resetPasswordButton.click()
    }
    async clickCancel() {
        await this.cancelButton.click()
    }
}

export default forgotPasswordPage