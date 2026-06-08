import { test, expect } from "@playwright/test"
import adminJobsPage from "../../pages/admin/adminJobsPag";
import loginUtil from "../../Utils/loginUtil";
import fs from "fs";
const dataAdmin = JSON.parse(fs.readFileSync("./Datas/adminData.json", "utf-8"));

test.beforeEach(async ({ page }) => {
    const login = new loginUtil(page);
    await login.loginAndClickAdmin();
})


test('Add Job', async ({ page }) => {
    const adminJobs = new adminJobsPage(page);
    await adminJobs.addJob(dataAdmin.addJob.jobTitle, dataAdmin.addJob.jobDescription, dataAdmin.addJob.attachmentPath, dataAdmin.addJob.note);
    await page.pause();
});


