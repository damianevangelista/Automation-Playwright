import { test, expect } from "@playwright/test";
import adminUserManagementPage from "../../pages/admin/adminUserManagementPage";
import loginUtil from "../../Utils/loginUtil";
import fs from "fs";
const dataAdmin = JSON.parse(fs.readFileSync("./Datas/adminData.json", "utf-8"));

test.beforeEach(async ({ page }) => {
    const login = new loginUtil(page);
    await login.loginAndClickAdmin();
})

test('Add User Admin Enabled', async ({ page }) => {
    const adminUserManagement = new adminUserManagementPage(page);
    await adminUserManagement.verifyAdminTitle();
    await adminUserManagement.addUser(dataAdmin.addUserAdminEnabled.userRole, dataAdmin.addUserAdminEnabled.status, dataAdmin.addUserAdminEnabled.employeeName, dataAdmin.addUserAdminEnabled.userName, dataAdmin.addUserAdminEnabled.password, dataAdmin.addUserAdminEnabled.confirmPassword);
    await page.pause();
})

test('Verifay required fields', async ({ page }) => {
    const adminUserManagement = new adminUserManagementPage(page);
    await adminUserManagement.verifyAdminTitle();
    await adminUserManagement.requiredFields();
    await page.pause();
})

test('Add User Admin Disabled', async ({ page }) => {
    const adminUserManagement = new adminUserManagementPage(page);
    await adminUserManagement.verifyAdminTitle();
    await adminUserManagement.addUser(dataAdmin.addUserAdminDisabled.userRole, dataAdmin.addUserAdminDisabled.status, dataAdmin.addUserAdminDisabled.employeeName, dataAdmin.addUserAdminDisabled.userName, dataAdmin.addUserAdminDisabled.password, dataAdmin.addUserAdminDisabled.confirmPassword);
    await page.pause();
})

test('Add User ESS Enabled', async ({ page }) => {
    const adminUserManagement = new adminUserManagementPage(page);
    await adminUserManagement.verifyAdminTitle();
    await adminUserManagement.addUser(dataAdmin.addUserEssEnabled.userRole, dataAdmin.addUserEssEnabled.status, dataAdmin.addUserEssEnabled.employeeName, dataAdmin.addUserEssEnabled.userName, dataAdmin.addUserEssEnabled.password, dataAdmin.addUserEssEnabled.confirmPassword);
    await page.pause();
})

test('Add User ESS Disabled', async ({ page }) => {
    const adminUserManagement = new adminUserManagementPage(page);
    await adminUserManagement.verifyAdminTitle();
    await adminUserManagement.addUser(dataAdmin.addUserEssDisabled.userRole, dataAdmin.addUserEssDisabled.status, dataAdmin.addUserEssDisabled.employeeName, dataAdmin.addUserEssDisabled.userName, dataAdmin.addUserEssDisabled.password, dataAdmin.addUserEssDisabled.confirmPassword);
    await page.pause();
})