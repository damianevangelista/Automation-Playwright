import { test, expect } from '@playwright/test';
import loginPage from '../pages/loginPage';
import forgotPasswordPage from '../pages/forgotPasswor';
import fs from 'fs'
import ErrorMessage from '../Datas/errorMessage.json'
const generalData = JSON.parse(fs.readFileSync('Datas/generalData.json', 'utf-8'));

test.beforeEach(async ({ page }) => {
    await page.goto(generalData.loginPage.url)
})

test('Validate Forgot Password Page', async ({ page }) => {
    const login = new loginPage(page);
    await login.forgotPasswordLink();
    const forgotPassword = new forgotPasswordPage(page);
    await forgotPassword.isUrlForgotPassword();
    await page.close()
})

test('Reset Password with blanck username should show error', async ({ page }) => {
    const login = new loginPage(page);
    await login.forgotPasswordLink();
    const forgotPassword = new forgotPasswordPage(page);
    await forgotPassword.isUrlForgotPassword();
    await forgotPassword.clickResetPassword();
    expect(await forgotPassword.getUsernameRequiredError()).toBe(ErrorMessage.required.message);
    await page.close()
})

test('Cancel reset password', async ({ page }) => {
    const login = new loginPage(page);
    await login.forgotPasswordLink();
    const forgotPassword = new forgotPasswordPage(page);
    await forgotPassword.isUrlForgotPassword();
    await forgotPassword.clickCancel();
    await login.isUrlLoginPage();
    await page.close()
})
