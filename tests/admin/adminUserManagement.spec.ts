import { test, expect } from "@playwright/test";
import LoginPage from "../../pages/loginPage";
import adminUserManagementPage from "../../pages/admin/adminUserManagementPage";
import menuOption from "../../pages/menuOption";

test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.openBrowser();
    await login.Login(process.env.user!, process.env.password!);
    const menu = new menuOption(page);
    await menu.clickAdmin();
})

test.skip('Add User Admin Enabled', async ({ page }) => {
    const adminUserManagement = new adminUserManagementPage(page);
    await adminUserManagement.verifyAdminTitle();
    await adminUserManagement.addUser("Admin", "Enabled", "Charles  Carter", "Jhoan4587141121", "Daf587141121", "Daf587141121");
})

test('Verifay required fields', async ({ page }) => {
    const adminUserManagement = new adminUserManagementPage(page);
    await adminUserManagement.verifyAdminTitle();
    await adminUserManagement.requiredFields();
    await page.pause();
})

test.skip('Add User Admin Disabled', async ({ page }) => {
    const adminUserManagement = new adminUserManagementPage(page);
    await adminUserManagement.verifyAdminTitle();
    await adminUserManagement.addUser("Admin", "Disabled", "Charles  Carter", "Jhoan4587141121", "Daf587141121", "Daf587141121");
})

test.skip('Add User ESS Enabled', async ({ page }) => {
    const adminUserManagement = new adminUserManagementPage(page);
    await adminUserManagement.verifyAdminTitle();
    await adminUserManagement.addUser("ESS", "Enabled", "Charles  Carter", "Jhoan4587141122", "Daf587141122", "Daf587141122");
})

test.skip('Add User ESS Disabled', async ({ page }) => {
    const adminUserManagement = new adminUserManagementPage(page);
    await adminUserManagement.verifyAdminTitle();
    await adminUserManagement.addUser("ESS", "Disabled", "Charles  Carter", "Jhoan4587141123", "Daf587141123", "Daf587141123");
})