import { test, expect } from '@playwright/test';
import loginPage from '../pages/loginPage';
import forgotPasswordPage from '../pages/forgotPasswor';
import ErrorMessage from '../Datas/errorMessage.json'

test.beforeEach(async ({ page }) => {
    await page.goto(process.env.baseurl!)
})

test('Forgot Password', async ({ page }) => {
    const login = new loginPage(page);
    await login.forgotPasswordLink();
    const forgotPassword = new forgotPasswordPage(page);
    expect(await forgotPassword.isUrlForgotPassword()).toBe(true);
    await page.close()
})

test('Reset Password with blanck username should show error', async ({ page }) => {
    const login = new loginPage(page);
    await login.forgotPasswordLink();
    const forgotPassword = new forgotPasswordPage(page);
    expect(await forgotPassword.isUrlForgotPassword()).toBe(true);
    await forgotPassword.clickResetPassword();
    expect(await forgotPassword.getUsernameRequiredError()).toBe(ErrorMessage[1].message);
    await page.close()
})

test('Cancel reset password', async ({ page }) => {
    const login = new loginPage(page);
    await login.forgotPasswordLink();
    const forgotPassword = new forgotPasswordPage(page);
    expect(await forgotPassword.isUrlForgotPassword()).toBe(true);
    await forgotPassword.clickCancel();
    expect(await login.isUrlLoginPage()).toBe(true);
    await page.close()


})
