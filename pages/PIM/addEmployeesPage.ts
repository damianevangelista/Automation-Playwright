import { Page, expect, Locator } from "@playwright/test";
import * as allure from "allure-js-commons"
import { exitCode } from "node:process";

class addEmployeesPage {
    private page: Page;
    private addEmployeeSection: Locator;
    private firstName: Locator;
    private lastName: Locator;
    private middleName: Locator;
    private employeeId: Locator;
    private saveEmployeeBtn: Locator;
    private cancelBtn: Locator;
    private createLoginDetails: Locator;
    private username: Locator;
    private password: Locator;
    private confirmPassword: Locator;
    private statusEnabled: Locator;
    private statusDisabled: Locator;
    private userExistErrorMsg: Locator;


    constructor(page: Page) {
        this.page = page;
        this.addEmployeeSection = this.page.getByRole('link', { name: 'Add Employee' });
        this.firstName = this.page.getByRole('textbox', { name: 'First Name' });
        this.middleName = this.page.getByRole('textbox', { name: 'Middle Name' });
        this.lastName = this.page.getByRole('textbox', { name: 'Last Name' });
        this.employeeId = this.page.getByRole('textbox').nth(4);
        this.saveEmployeeBtn = this.page.getByRole('button', { name: 'Save' });
        this.cancelBtn = this.page.getByRole('button', { name: 'Cancel' });
        this.createLoginDetails = this.page.locator('.oxd-switch-input');
        this.username = this.page.getByRole('textbox').nth(5);
        this.password = this.page.locator('input[type="password"]').first();
        this.confirmPassword = this.page.locator('input[type="password"]').nth(1);
        this.statusEnabled = this.page.locator('.oxd-radio-input').first();
        this.statusDisabled = this.page.locator('.oxd-radio-input').nth(1);
        this.userExistErrorMsg = this.page.getByText('Username already exists');
    }

    async addEmployeeWithoutLogin(firstName: string, lastName: string) {
        await allure.step('Click on Add Employee Button', async () => {
            await this.addEmployeeSection.click();
        })
        await allure.step('Enter First Name', async () => {
            await this.firstName.fill(firstName)
        })
        await allure.step('Enter Last Name', async () => {
            await this.lastName.fill(lastName)
        })
        await allure.step('Employee ID', async () => {
            await expect(this.employeeId).toBeVisible();
            await expect(this.employeeId).not.toBeEmpty();
        });
        await allure.step('Click on Save Button', async () => {
            await this.saveEmployeeBtn.click()
        })
    }

    async addEmployeewithLogin(firstName: string, lastName: string, username: string, password: string, status: string = 'Enabled') {
        await allure.step('Click on Add Employee Button', async () => {
            await this.addEmployeeSection.click();
        })
        await allure.step('Enter First Name', async () => {
            await this.firstName.fill(firstName)
        })
        await allure.step('Enter Last Name', async () => {
            await this.lastName.fill(lastName)
        })
        await allure.step('Employee ID', async () => {
            await expect(this.employeeId).toBeVisible();
            await expect(this.employeeId).not.toBeEmpty();
        });
        await this.createLogin(username, password, status);


        await allure.step('Click on Save Button', async () => {
            await this.saveEmployeeBtn.click()
        })
    }

    private async createLogin(username: string, password: string, status: string) {
        await allure.step('Click on Create Login Details', async () => {
            await this.createLoginDetails.click();
        })
        await allure.step('Enter username', async () => {
            await this.username.fill(username);
            await expect(this.userExistErrorMsg).toBeHidden();
        })
        await allure.step('Enter password', async () => {
            await this.password.fill(password);
        })
        await allure.step('Enter confirm password', async () => {
            await this.confirmPassword.fill(password);
        })
        await allure.step(`Set Status to ${status}`, async () => {
            if (status.toLowerCase() === 'disabled') {
                await this.statusDisabled.check();
            } else {
                await this.statusEnabled.check();
            }
        })
    }

}

export default addEmployeesPage;