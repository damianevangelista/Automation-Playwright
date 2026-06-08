import { expect, Locator, Page } from "@playwright/test";
import * as allure from "allure-js-commons";
import fs from 'fs';
const generalData = JSON.parse(fs.readFileSync('Datas/generalData.json', 'utf-8'));

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
        return await allure.step('Check Forgot Password Page URL', async () => {
            expect(this.page.url().includes(generalData.forgotPasswordPage.url)).toBe(true);
        })
    }

    async getResetPasswordTitle() {
        return await allure.step('Get Reset Password Title', async () => {
            return await this.resetPasswordTitle.textContent()
        })
    }

    async getUsernameRequiredError() {
        return await allure.step('Get Username Required Error', async () => {
            return await this.usernameRequiredError.textContent()
        })
    }

    async fillUsername(username: string) {
        return await allure.step('Fill Username', async () => {
            await this.usernameInput.fill(username)
        })
    }

    async clickResetPassword() {
        return await allure.step('Click Reset Password Button', async () => {
            await this.resetPasswordButton.click()
        })
    }
    async clickCancel() {
        return await allure.step('Click Cancel Button', async () => {
            await this.cancelButton.click()
        })
    }
}

export default forgotPasswordPage