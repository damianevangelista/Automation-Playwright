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


    constructor(page: Page) {
        this.page = page;
        this.addEmployeeSection = this.page.getByRole('link', { name: 'Add Employee' });
        this.firstName = this.page.getByRole('textbox', { name: 'First Name' });
        this.middleName = this.page.getByRole('textbox', { name: 'Middle Name' });
        this.lastName = this.page.getByRole('textbox', { name: 'Last Name' });
        this.employeeId = this.page.locator("//div[@class='oxd-input-group oxd-input-field-bottom-space']//div//input[@class='oxd-input oxd-input--active']");
        this.saveEmployeeBtn = this.page.getByRole('button', { name: 'Save' });
        this.cancelBtn = this.page.getByRole('button', { name: 'Cancel' });
    }

    async addEmployee(firstName: string, lastName: string, employeeId: string) {
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
            expect(this.employeeId).toBeVisible();
            expect(this.employeeId).not.toBeEmpty();
        });
        await allure.step('Click on Save Button', async () => {
            await this.saveEmployeeBtn.click()
        })
    }
}

export default addEmployeesPage;