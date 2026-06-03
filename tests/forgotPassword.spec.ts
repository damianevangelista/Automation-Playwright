import { test, expect } from '@playwright/test';
import loginPage from '../pages/loginPage';
import forgotPasswordPage from '../pages/forgotPasswor';
import ErrorMessage from '../Datas/errorMessage.json'

test.beforeEach(async ({ page }) => {
    await page.goto(process.env.baseurl!)
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
    expect(await forgotPassword.getUsernameRequiredError()).toBe(ErrorMessage[1].message);
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
