import { Page, expect, Locator } from "@playwright/test";
import * as allure from "allure-js-commons"

class admin {
    private page: Page;
    private adminTitle: Locator;
    private userManagement: Locator;
    private user: Locator;
    private addUserBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.adminTitle = this.page.locator('div.oxd-topbar-header-title');
        this.userManagement = this.page.getByLabel('Topbar Menu').getByText('User Management')
        this.user = this.page.getByRole('menuitem', { name: 'Users' })
        this.addUserBtn = this.page.getByRole('button', { name: ' Add' })
    }

    async verifyAdminTitle() {
        return await allure.step('verifyAdminTitle', async () => {
            await expect(this.adminTitle).toBeVisible();
            await expect(this.adminTitle).toContainText('Admin');
        })
    }
    async addUser() {
        await allure.step('Click on User Management', async () => {
            await this.userManagement.click()
        })
        await allure.step('Click on User', async () => {
            await this.user.click()
        })
        await allure.step('Click on Add User Button', async () => {
            await this.addUserBtn.click()
        })
    }



}

export default admin;