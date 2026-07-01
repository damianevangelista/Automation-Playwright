import { Page, Locator } from "@playwright/test";
import * as allure from "allure-js-commons";

class logOutPage {
    private page: Page;
    private logOutOption: Locator;
    private logoutBtn: Locator;
    private aboutBtn: Locator;
    private supportLink: Locator;
    private changePasswordBtn: Locator;


    constructor(page: Page) {
        this.page = page;
        this.logOutOption = this.page.getByRole('listitem').filter({ hasText: 'UpdatedUser' }).locator('i');
        this.logoutBtn = this.page.getByRole('menuitem', { name: 'Logout' });
        this.aboutBtn = this.page.getByRole('menuitem', { name: 'About' });
        this.supportLink = this.page.getByRole('menuitem', { name: 'Support' });
        this.changePasswordBtn = this.page.getByRole('menuitem', { name: 'Change Password' });
    }

    async logOut() {
        await allure.step('Click on Log Out', async () => {
            await this.logOutOption.click();
            await this.logoutBtn.click();
        })
    }

    async about() {
        await allure.step('Click on About', async () => {
            await this.logOutOption.click();
            await this.aboutBtn.click();
        })
    }

    async support() {
        await allure.step('Click on Support', async () => {
            await this.logOutOption.click();
            await this.supportLink.click();
        })
    }

    async changePassword() {
        await allure.step('Click on Change Password', async () => {
            await this.logOutOption.click();
            await this.changePasswordBtn.click();
        })
    }
}

export default logOutPage;