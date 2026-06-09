import { Page, expect, Locator } from "@playwright/test";
import * as allure from "allure-js-commons"
import fs from "fs";
const errorMessage = JSON.parse(fs.readFileSync('Datas/errorMessage.json', 'utf-8'));
const generalData = JSON.parse(fs.readFileSync('Datas/generalData.json', 'utf-8'));

class adminUserManagement {
    private page: Page;
    private adminTitle: Locator;
    private userManagement: Locator;
    private user: Locator;
    private addUserBtn: Locator;
    readonly userRoleDropdown: Locator;
    readonly statusDropdown: Locator;
    readonly selectDropdown: Locator;
    private employeeName: Locator;
    private userName: Locator;
    private password: Locator;
    private confirmPassword: Locator;
    private saveButton: Locator;
    private cancelButton: Locator;
    private successMessage: Locator;
    private userRoleRequiredMessage: Locator;
    private statusRequiredMessage: Locator;
    private employeeNameRequiredMessage: Locator;
    private userNameRequiredMessage: Locator;
    private passwordRequiredMessage: Locator;
    private confirmPasswordRequiredMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.adminTitle = this.page.locator('div.oxd-topbar-header-title');
        this.userManagement = this.page.getByLabel('Topbar Menu').getByText('User Management')
        this.user = this.page.getByRole('menuitem', { name: 'Users' })
        this.addUserBtn = this.page.getByRole('button', { name: ' Add' })
        this.userRoleDropdown = page.locator('.oxd-input-group').filter({ hasText: 'User Role' }).locator('.oxd-select-wrapper');
        this.statusDropdown = page.locator('.oxd-input-group').filter({ hasText: 'Status' }).locator('.oxd-select-wrapper');
        this.selectDropdown = page.locator('.oxd-select-dropdown');
        this.employeeName = this.page.getByRole('textbox', { name: 'Type for hints...' })
        this.userName = this.page.getByRole('textbox').nth(2)
        this.password = this.page.getByRole('textbox').nth(3)
        this.confirmPassword = this.page.getByRole('textbox').nth(4)
        this.saveButton = this.page.getByRole('button', { name: 'Save' })
        this.cancelButton = this.page.getByRole('button', { name: 'Cancel' })
        this.successMessage = this.page.getByText('SuccessSuccessfully Saved×');
        this.userRoleRequiredMessage = this.page.getByText('Required').first();
        this.statusRequiredMessage = this.page.getByText('Required').nth(2);
        this.employeeNameRequiredMessage = this.page.getByText('Required').nth(1);
        this.userNameRequiredMessage = this.page.getByText('Required').nth(3);
        this.passwordRequiredMessage = this.page.getByText('Required').nth(4);
        this.confirmPasswordRequiredMessage = this.page.getByText('Passwords do not match');
    }


    async verifyAdminTitle() {
        return await allure.step('verify Admin Title', async () => {
            await expect(this.adminTitle).toBeVisible();
            await expect(this.adminTitle).toContainText(generalData.adminPageTitles.userManagement);
        })
    }

    async addUser(userRole: string, status: string, employeeName: string, userName: string, password: string, confirmPassword: string) {
        await allure.step('Click on User Management', async () => {
            await this.userManagement.click()
        })
        await allure.step('Click on User', async () => {
            await this.user.click()
        })
        await allure.step('Click on Add User Button', async () => {
            await this.addUserBtn.click()
        })
        await allure.step(`Select User Role "${userRole}"`, async () => {
            await this.selectOption(this.userRoleDropdown, userRole);
        })
        await allure.step(`Select Status "${status}"`, async () => {
            await this.selectOption(this.statusDropdown, status);
        })
        await allure.step("Fill Employee Name", async () => {
            await this.employeeName.fill(employeeName);
            await this.getEmployeeOptionLocator(employeeName).click();
        })
        await allure.step("Fill User Name", async () => {
            await this.userName.fill(userName);
        })
        await allure.step("Fill Password", async () => {
            await this.password.fill(password);
        })
        await allure.step("Fill Confirm Password", async () => {
            await this.confirmPassword.fill(confirmPassword);
        })
        await allure.step("Click Save Button", async () => {
            await this.saveButton.click();
        })
        // await allure.step("Verify Success Message", async () => {
        //     await expect(this.successMessage).toContainText('Successfully Saved');
        // })
    }

    async requiredFields() {
        await allure.step('Click on User Management', async () => {
            await this.userManagement.click()
        })
        await allure.step('Click on User', async () => {
            await this.user.click()
        })
        await allure.step('Click on Add User Button', async () => {
            await this.addUserBtn.click()
        })
        await allure.step("Click Save Button", async () => {
            await this.saveButton.click();
        })
        await allure.step("Verify User Role Required Message", async () => {
            await expect(this.userRoleRequiredMessage).toContainText(errorMessage.required.message);
            await expect(this.userRoleRequiredMessage).toBeVisible();
        })
        await allure.step("Verify Status Required Message", async () => {
            await expect(this.statusRequiredMessage).toContainText(errorMessage.required.message);
            await expect(this.statusRequiredMessage).toBeVisible();
        })
        await allure.step("Verify Employee Name Required Message", async () => {
            await expect(this.employeeNameRequiredMessage).toContainText(errorMessage.required.message);
            await expect(this.employeeNameRequiredMessage).toBeVisible();
        })
        await allure.step("Verify User Name Required Message", async () => {
            await expect(this.userNameRequiredMessage).toContainText(errorMessage.required.message);
            await expect(this.userNameRequiredMessage).toBeVisible();
        })
        await allure.step("Verify Password Required Message", async () => {
            await expect(this.passwordRequiredMessage).toContainText(errorMessage.required.message);
            await expect(this.passwordRequiredMessage).toBeVisible();
        })
        await allure.step("Verify Confirm Password Required Message", async () => {
            await expect(this.confirmPasswordRequiredMessage).toContainText(errorMessage.passwordsDoNotMatch.message);
            await expect(this.confirmPasswordRequiredMessage).toBeVisible();
        })
    }


    async selectOption(dropdownLocator: Locator, optionName: string) {
        await allure.step(`Select option "${optionName}"`, async () => {
            // 1. Abrir el dropdown
            await dropdownLocator.click();
            // 2. Esperar que el menú flotante sea visible para evitar que el test falle rápido
            await this.selectDropdown.waitFor({ state: 'visible' });
            // 3. Hacer clic en la opción deseada
            await this.selectDropdown.locator('.oxd-select-option').filter({ hasText: optionName }).click();
        });
    }

    private getEmployeeOptionLocator(employeeName: string): Locator {
        return this.page.getByRole('option', { name: employeeName });
    }

}


export default adminUserManagement;