import { test, expect } from "@playwright/test";
import LoginPage from "../pages/loginPage";
import adminPage from "../pages/adminPage";
import menuOption from "../pages/menuOption";

test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.openBrowser();
    await login.Login(process.env.user!, process.env.password!);
    const menu = new menuOption(page);
    await menu.clickAdmin();
})

test('Add User', async ({ page }) => {
    const admin = new adminPage(page);
    await admin.verifyAdminTitle();
    await admin.addUser();
})