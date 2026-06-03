import { Locator, Page } from "@playwright/test";
import { test, expect } from '@playwright/test';
import * as allure from "allure-js-commons";

class menu {
    private page: Page;
    private admin: Locator;
    private pim: Locator;
    private leave: Locator;
    private time: Locator;
    private recruitment: Locator;
    private myInfo: Locator;
    private performance: Locator;
    private dashboard: Locator;
    private directory: Locator;
    private maintenance: Locator;
    private claim: Locator;
    private buzz: Locator;

    constructor(page: Page) {
        this.page = page;
        this.admin = page.getByRole('link', { name: 'Admin' });
        this.pim = page.getByRole('link', { name: 'PIM' });
        this.leave = page.getByRole('link', { name: 'Leave' });
        this.time = page.getByRole('link', { name: 'Time' });
        this.recruitment = page.getByRole('link', { name: 'Recruitment' });
        this.myInfo = page.getByRole('link', { name: 'My Info' });
        this.performance = page.getByRole('link', { name: 'Performance' });
        this.dashboard = page.getByRole('link', { name: 'Dashboard' });
        this.directory = page.getByRole('link', { name: 'Directory' });
        this.maintenance = page.getByRole('link', { name: 'Maintenance' });
        this.claim = page.getByRole('link', { name: 'Claim' });
        this.buzz = page.getByRole('link', { name: 'Buzz' });
    }

    async clickAdmin() {
        await allure.step('Click Admin Tab', async () => {
            await this.admin.click();
        })
    }
    async clickDashboard() {
        await allure.step('Click Dashboard Tab', async () => {
            await this.dashboard.click();
        })
    }
    async clickPim() {
        await allure.step('Click PIM Tab', async () => {
            await this.pim.click();
        })
    }
    async clickLeave() {
        await allure.step('Click Leave Tab', async () => {
            await this.leave.click();
        })
    }
    async clickTime() {
        await allure.step('Click Time Tab', async () => {
            await this.time.click();
        })
    }
    async clickRecruitment() {
        await allure.step('Click Recruitment Tab', async () => {
            await this.recruitment.click();
        })
    }
    async clickMyInfo() {
        await allure.step('Click My Info Tab', async () => {
            await this.myInfo.click();
        })
    }
    async clickPerformance() {
        await allure.step('Click Performance Tab', async () => {
            await this.performance.click();
        })
    }
    async clickDirectory() {
        await allure.step('Click Directory Tab', async () => {
            await this.directory.click();
        })
    }
    async clickMaintenance() {
        await allure.step('Click Maintenance Tab', async () => {
            await this.maintenance.click();
        })
    }
    async clickClaim() {
        await allure.step('Click Claim Tab', async () => {
            await this.claim.click();
        })
    }
    async clickBuzz() {
        await allure.step('Click Buzz Tab', async () => {
            await this.buzz.click();
        })
    }
}

export default menu