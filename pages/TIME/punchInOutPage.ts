import { Page, expect, Locator } from "@playwright/test";
import * as allure from "allure-js-commons";

class punchInOutPage {
    private page: Page;
    private attendanceMenu: Locator;
    private punchInOutOption: Locator;
    private punchInHeading: Locator;
    private punchOutHeading: Locator;
    private dateField: Locator;
    private timeField: Locator;
    private noteField: Locator;
    private punchInButton: Locator;
    private punchOutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.attendanceMenu = this.page.getByLabel('Topbar Menu').getByText('Attendance');
        this.punchInOutOption = this.page.getByLabel('Topbar Menu').getByText('Punch In/Out');
        this.punchInHeading = this.page.getByRole('heading', { name: 'Punch In', level: 6 });
        this.punchOutHeading = this.page.getByRole('heading', { name: 'Punch Out', level: 6 });
        this.dateField = this.page.locator('.oxd-date-input input');
        this.timeField = this.page.locator('.oxd-time-input input');
        this.noteField = this.page.getByPlaceholder('Type here');
        this.punchInButton = this.page.getByRole('button', { name: 'In' });
        this.punchOutButton = this.page.getByRole('button', { name: 'Out' });
    }

    async navigateToPunchInOut() {
        await allure.step('Click Attendance Menu', async () => {
            await this.attendanceMenu.click();
        });
        await allure.step('Click Punch In/Out Option', async () => {
            await this.punchInOutOption.click();
            await this.page.waitForLoadState('domcontentloaded');
        });
    }

    async isUrlPunchInOut() {
        return await allure.step('Verify Punch In/Out Page URL', async () => {
            expect(this.page.url()).toContain('attendance/punch');
        });
    }

    async isPunchInPageVisible() {
        return await allure.step('Verify Punch In Page is Visible', async () => {
            await expect(this.punchInHeading).toBeVisible();
        });
    }

    async isPunchOutPageVisible() {
        return await allure.step('Verify Punch Out Page is Visible', async () => {
            await expect(this.punchOutHeading).toBeVisible();
        });
    }

    async enterNote(note: string) {
        await allure.step('Enter Note', async () => {
            await expect(this.noteField).toBeVisible();
            await this.noteField.fill(note);
        });
    }

    async clickPunchIn() {
        await allure.step('Click Punch In Button', async () => {
            await expect(this.punchInButton).toBeVisible();
            await this.punchInButton.click();
            await this.page.waitForURL('**/attendance/punchOut');
        });
    }

    async clickPunchOut() {
        await allure.step('Click Punch Out Button', async () => {
            await expect(this.punchOutButton).toBeVisible();
            await this.punchOutButton.click();
            await this.page.waitForURL('**/attendance/punchIn');
        });
    }

    async isDateFieldVisible() {
        return await allure.step('Verify Date Field is Visible', async () => {
            await expect(this.dateField).toBeVisible();
        });
    }

    async isTimeFieldVisible() {
        return await allure.step('Verify Time Field is Visible', async () => {
            await expect(this.timeField).toBeVisible();
        });
    }

    async isNoteFieldVisible() {
        return await allure.step('Verify Note Field is Visible', async () => {
            await expect(this.noteField).toBeVisible();
        });
    }

    async isPunchInButtonVisible() {
        return await allure.step('Verify Punch In Button is Visible', async () => {
            await expect(this.punchInButton).toBeVisible();
        });
    }

    async isPunchOutButtonVisible() {
        return await allure.step('Verify Punch Out Button is Visible', async () => {
            await expect(this.punchOutButton).toBeVisible();
        });
    }

    /**
     * Ensures the page is in Punch In state.
     * If already punched in (Punch Out page is shown), punches out first.
     */
    async ensurePunchInState() {
        await allure.step('Ensure page is in Punch In state', async () => {
            const isPunchOutVisible = await this.punchOutHeading.isVisible();
            if (isPunchOutVisible) {
                await this.punchOutButton.click();
                await this.page.waitForURL('**/attendance/punchIn');
            }
            await expect(this.punchInHeading).toBeVisible();
        });
    }
}

export default punchInOutPage;
