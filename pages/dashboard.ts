import { Page, Locator, expect } from "@playwright/test";
import * as allure from 'allure-js-commons';

class Dashboard {
    private page: Page;
    private titleDashboard: Locator;
    private punchedOut: Locator;
    private timeAtWork: Locator;
    private myActions: Locator;
    private quickLaunch: Locator;
    private buzzLatestPost: Locator;
    private dasQuickAssignLeave: Locator;
    private dashPendingSelfReview: Locator;


    constructor(page: Page) {
        this.page = page;
        this.titleDashboard = this.page.getByRole('heading', { name: 'Dashboard' });
        this.punchedOut = this.page.locator('div').filter({ hasText: 'Time at WorkPunched' }).nth(5);
        this.timeAtWork = this.page.locator("body > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)");
        this.myActions = this.page.locator("body > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)");
        this.quickLaunch = this.page.locator("body > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1)");
        this.buzzLatestPost = this.page.locator("body > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1)");
        this.dasQuickAssignLeave = this.page.getByRole('button', { name: 'Assign Leave' });
        this.dashPendingSelfReview = this.page.locator(':text("(1) Pending Self Review")');

    }

    async isUrlDashboard() {
        await allure.step('Dashboard URL', async () => {
            await expect(this.page).toHaveURL(/dashboard/);
        })
    }

    async dashboardTitle() {
        return await allure.step('Dashboard Title', async () => {
            await expect(this.titleDashboard).toContainText('Dashboard')
        })
    }

    async cardPunchedOut() {
        return await allure.step('Verify Punched Out Card Is Visible', async () => {
            await expect(this.punchedOut).toBeVisible();
        })
    }

    async cardTimeAtWork() {
        return await allure.step('Verify Time At Work Card Is Visible', async () => {
            await expect(this.timeAtWork).toBeVisible();
        })
    }

    async cardMyActions() {
        return await allure.step('Verify My Actions Card Is Visible', async () => {
            await expect(this.myActions).toBeVisible();
        })
    }

    async cardQuickLaunch() {
        return await allure.step('Verify Quick Launch Card Is Visible', async () => {
            await expect(this.quickLaunch).toBeVisible();
        })
    }

    async cardBuzzLatestPost() {
        return await allure.step('Verify Buzz Latest Post Card Is Visible', async () => {
            await expect(this.buzzLatestPost).toBeVisible();
        })
    }

    async goToAssignLeave() {
        await allure.step('Click On Quick Assign Leave', async () => {
            await this.dasQuickAssignLeave.click();
        })
        await allure.step('Verify Assign Leave Page URL', async () => {
            expect(this.page.url().includes('assignLeave')).toBe(true);
        })
    }

    async goToPendingSelfReview() {
        await allure.step('Click On Pending Self Review', async () => {
            await this.dashPendingSelfReview.click();
        })
        await allure.step('Verify Performance Page URL', async () => {
            expect(this.page.url().includes('/performance/')).toBe(true);
        })
    }


}

export default Dashboard