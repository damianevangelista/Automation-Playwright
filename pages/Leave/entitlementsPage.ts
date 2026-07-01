
import { Page, expect, Locator } from "@playwright/test";
import * as allure from "allure-js-commons";

class entitlementsPage {
    private page: Page;
    private entitlements: Locator;
    private addEntitlementBtn: Locator;
    private addEntitlementTitle: Locator;
    private employeeName: Locator;
    private leaveType: Locator;
    private leavePeriod: Locator;
    private entitlement: Locator;
    private saveBtn: Locator;
    private selectDropdown: Locator;
    private cancelBtn: Locator;
    private confirmUpdate: Locator;


    constructor(page: Page) {
        this.page = page;
        this.entitlements = this.page.getByText('Entitlements', { exact: true });
        this.addEntitlementBtn = this.page.getByRole('menuitem', { name: 'Add Entitlements' });
        this.addEntitlementTitle = this.page.getByText('Add Leave Entitlement');
        this.employeeName = this.page.getByRole('textbox', { name: 'Type for hints...' });
        this.leaveType = this.page.locator('.oxd-input-group').filter({ hasText: 'Leave Type' });
        this.leavePeriod = this.page.locator('.oxd-input-group').filter({ hasText: 'Leave Period' }).locator('.oxd-select-text');
        this.entitlement = this.page.getByRole('textbox').nth(2);
        this.saveBtn = this.page.getByRole('button', { name: 'Save' });
        this.selectDropdown = this.page.locator('.oxd-select-dropdown');
        this.cancelBtn = this.page.getByRole('button', { name: 'Cancel' });
        this.confirmUpdate = this.page.getByRole('button', { name: 'Confirm' });
    }

    async addEntitlement(employeename: string, leavetype: string, leaveperiod: string, entitlement: string) {
        await allure.step('Click on Entitlements', async () => {
            await this.entitlements.click();
        })
        await allure.step('Click on Add Entitlement Button', async () => {
            await this.addEntitlementBtn.click();
        })
        await allure.step('Verify Add Entitlement Page', async () => {
            await expect(this.addEntitlementTitle).toBeVisible();
        })
        await allure.step('Enter Employee Name', async () => {
            const prefix = employeename.slice(0, -1);
            const lastChar = employeename.slice(-1);
            await this.employeeName.fill(prefix);
            await this.page.waitForTimeout(500);
            await this.employeeName.pressSequentially(lastChar, { delay: 100 });
            await this.getEmployeeOptionLocator(employeename).waitFor({ state: 'visible', timeout: 15000 });
            await this.getEmployeeOptionLocator(employeename).click();
        })
        await allure.step('Select Leave Type', async () => {
            await this.selectLeaveType(leavetype);
        })
        await allure.step('Leave Period', async () => {
            await expect(this.leavePeriod).toContainText(leaveperiod);
        })
        await allure.step('Enter Entitlement', async () => {
            await this.entitlement.fill(entitlement);
        })
        await allure.step('Click on Save Button', async () => {
            await this.saveBtn.click();
        })
        await allure.step('Click on Confirm Button', async () => {
            await this.confirmUpdate.click();
        })
    }


    private async selectLeaveType(option: string) {
        await this.leaveType.click();
        await this.page.locator('.oxd-select-dropdown').locator('div[role="option"]').filter({ hasText: option }).locator('span').first().click();
    }

    private getEmployeeOptionLocator(employeeName: string): Locator {
        const lastName = employeeName.split(' ').pop() || employeeName;
        return this.page.getByRole('option', { name: new RegExp(lastName, 'i') });
    }


}

export default entitlementsPage;