import { test, expect } from "@playwright/test"
import LoginPage from "../../pages/loginPage";
import menuOption from "../../pages/menuOption";
import adminJobsPage from "../../pages/admin/adminJobsPag";

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openBrowser();
    await loginPage.Login(process.env.USER!, process.env.PASSWORD!);
    const menuOptions = new menuOption(page);
    await menuOptions.clickAdmin();
})


test('Add Job', async ({ page }) => {
    const adminJobs = new adminJobsPage(page);
    await adminJobs.addJob();
    await page.pause();
})
