import { Page, expect, Locator } from "@playwright/test";
import * as allure from "allure-js-commons";

class assignLeavePage {
    private page: Page;
    private assignLeaveBtn: Locator;
    private employeeName: Locator;
    private leaveType: Locator;
    private fromDate: Locator;
    private toDate: Locator;
    private assignBtn: Locator;
    private comment: Locator;
    private assignLeaveTitle: Locator;
    private duration: Locator;

    constructor(page: Page) {
        this.page = page;
        this.assignLeaveBtn = this.page.getByRole('link', { name: 'Assign Leave' });
        this.assignLeaveTitle = this.page.getByRole('heading', { name: 'Assign Leave' });
        this.employeeName = this.page.getByRole('textbox', { name: 'Type for hints...' })
        this.leaveType = this.page.locator('.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow');
        this.fromDate = this.page.locator('.oxd-input-group:has-text("From Date")').locator('input');
        this.toDate = this.page.locator('.oxd-input-group:has-text("To Date")').locator('input');
        this.assignBtn = this.page.getByRole('button', { name: 'Assign' })
        this.comment = this.page.locator('textarea')
        this.duration = this.page.locator('.oxd-input-group').filter({ hasText: 'Duration' }).locator('.oxd-select-text');
    }

    async assignLeave(employeename: string, leaveType: string, fromDate: string, toDate: string, duration: string, comment: string) {
        await allure.step('Click on Assign Leave', async () => {
            await this.assignLeaveBtn.click();
        })
        await allure.step('Verify Assign Leave Page', async () => {
            await expect(this.assignLeaveTitle).toBeVisible();
        })
        await allure.step('Enter Employee Name', async () => {
            const firstName = employeename.split(' ')[0];
            await this.employeeName.fill(firstName);
            await this.page.waitForTimeout(1000);
            await this.employeeName.press('ArrowDown');
            await this.getEmployeeOptionLocator(employeename).waitFor({ state: 'visible', timeout: 15000 });
            await this.getEmployeeOptionLocator(employeename).click();
        })
        await allure.step('Select Leave Type', async () => {
            await this.selectLeaveType(leaveType);
        })
        await allure.step('Select Leave Duration', async () => {
            await this.fromDate.fill(fromDate);
            //await this.toDate.click()
            this.page.locator('body').click()
        })
        await allure.step('Select Leave Duration', async () => {
            await this.selectDuration(duration);
        })
        await allure.step('Enter Comment', async () => {
            await this.comment.fill(comment);
        })
        await allure.step('Click on Assign Button', async () => {
            await this.assignBtn.click();
        })
    }

    private async selectLeaveType(option: string) {
        await this.leaveType.click();
        await this.page.locator('.oxd-select-dropdown').locator('div[role="option"]').filter({ hasText: option }).locator('span').first().click();
    }

    private async selectDuration(option: string) {
        await this.duration.click();
        await this.page.locator('.oxd-select-dropdown').locator('div[role="option"]').filter({ hasText: option }).locator('span').first().click();
        await this.page.keyboard.press('Enter');
    }


    private getEmployeeOptionLocator(employeeName: string): Locator {
        const lastName = employeeName.split(' ').pop() || employeeName;
        return this.page.getByRole('option', { name: new RegExp(lastName, 'i') });
    }
}

export default assignLeavePage;
