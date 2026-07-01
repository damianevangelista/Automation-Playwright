import { Page, expect, Locator } from "@playwright/test";
import * as allure from "allure-js-commons";

class projectInfoPage {
    private page: Page;
    private projectInfo: Locator;
    private addProjectBtn: Locator;
    private addProjectTitle: Locator;
    private projectName: Locator;
    private projectDescription: Locator;
    private createProjectButton: Locator;
    private cancelButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.projectInfo = this.page.getByLabel('Topbar Menu').getByText('Project Info');
        this.addProjectBtn = this.page.getByRole('button', { name: 'Add' });
        this.addProjectTitle = this.page.getByRole('heading', { name: 'Add Customer' });
        this.projectName = this.page.locator('form input');
        this.projectDescription = this.page.getByRole('textbox', { name: 'Type description here' });
        this.createProjectButton = this.page.getByRole('button', { name: 'Save' });
        this.cancelButton = this.page.getByRole('button', { name: 'Cancel' });
    }

    private getProjectRowLocator(projectName: string): Locator {
        return this.page.locator('.oxd-table-row.oxd-table-row--with-border-bottom').filter({ hasText: projectName })
    }
    private getEditButtonForProject(projectName: string): Locator {
        return this.getProjectRowLocator(projectName).locator('.oxd-icon.bi-pencil-fill')
    }
    private getDeleteButtonForProject(projectName: string): Locator {
        return this.getProjectRowLocator(projectName).locator('.oxd-icon.bi-trash')
    }


    async addProject(projectName: string, projectDescription: string) {
        await allure.step('Click on Add Project Button', async () => {
            await this.addProjectBtn.click()
        })
        await allure.step('Enter Project Name', async () => {
            await this.projectName.fill(projectName)
        })
        await allure.step('Enter Project Description', async () => {
            await this.projectDescription.fill(projectDescription)
        })
        await allure.step('Click on Create Button', async () => {
            await this.createProjectButton.click()
        })
    }

    // async editProject(projectName: string, newProjectName: string, newProjectDescription: string) {
    //     await allure.step('Locate Project', async () => {
    //         await expect(this.projectListTable).toBeVisible()
    //         await expect(this.getProjectRowLocator(projectName)).toBeVisible()
    //     })
    //     await allure.step('Click on Edit Button', async () => {
    //         await this.getEditButtonForProject(projectName).click()
    //     })
    //     await allure.step('Update Project Name', async () => {
    //         await expect(this.page.getByRole('heading', { name: 'Edit Project' })).toBeVisible()
    //         await this.projectName.fill(newProjectName)
    //     })
    //     await allure.step('Update Project Description', async () => {
    //         await this.projectDescription.fill(newProjectDescription)
    //     })
    //     await allure.step('Click on Save Button', async () => {
    //         await this.page.getByRole('button', { name: 'Save' }).click()
    //     })
    // }

    // async verifyProjectExists(projectName: string) {
    //     await allure.step('Verify Project Exists', async () => {
    //         await expect(this.projectListTable).toBeVisible()
    //         await expect(this.getProjectRowLocator(projectName)).toBeVisible()
    //         await allure.attachment('Project Data', JSON.stringify(projectName))
    //     })
    // }

    // async deleteProject(projectName: string) {
    //     await allure.step('Locate Project', async () => {
    //         await expect(this.projectListTable).toBeVisible()
    //         await expect(this.getProjectRowLocator(projectName)).toBeVisible()
    //     })
    //     await allure.step('Click on Delete Button', async () => {
    //         await this.getDeleteButtonForProject(projectName).click()
    //     })
    //     await allure.step('Confirm Delete', async () => {
    //         await this.page.getByRole('button', { name: 'Yes, Delete' }).click()
    //     })
    // }

    // async verifyProjectNotExists(projectName: string) {
    //     await allure.step('Verify Project Not Exists', async () => {
    //         await expect(this.projectListTable).toBeVisible()
    //         await expect(this.getProjectRowLocator(projectName)).toBeHidden()
    //     })
    // }

}