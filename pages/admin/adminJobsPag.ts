import { Page, expect, Locator } from "@playwright/test";
import * as allure from "allure-js-commons"

class adminJobs {
    private page: Page;
    private job: Locator;
    private jobTitle: Locator;
    private payGrade: Locator;
    private employmentStatus: Locator;
    private jobCategory: Locator;
    private workShift: Locator;
    private addJobTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.job = this.page.locator('li:has-text("Job")');
        this.jobTitle = this.page.getByRole('listitem').filter({ hasText: /^Job Titles$/ });
        this.payGrade = this.page.getByRole('menuitem', { name: 'Pay Grades' });
        this.employmentStatus = this.page.getByRole('menuitem', { name: 'Employment Status' });
        this.jobCategory = this.page.getByRole('menuitem', { name: 'Job Categories' });
        this.workShift = this.page.getByRole('menuitem', { name: 'Work Shifts' });
        this.addJobTitle = this.page.getByRole('button', { name: 'Add' })
    }

    async addJob() {
        await allure.step('Click on Job', async () => {
            await this.job.click()
        })
        await allure.step('Click on Job Title', async () => {
            await this.jobTitle.click()
        })
        await allure.step('Click on Add Job Title Button', async () => {
            await this.addJobTitle.click()
        })
    }
}

export default adminJobs;
