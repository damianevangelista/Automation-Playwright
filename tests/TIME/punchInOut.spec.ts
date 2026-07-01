import { test, expect } from '@playwright/test';
import loginPage from '../../pages/loginPage';
import menu from '../../pages/menuOption';
import punchInOutPage from '../../pages/TIME/punchInOutPage';
import fs from 'fs';
const generalData = JSON.parse(fs.readFileSync('Datas/generalData.json', 'utf-8'));

test.beforeEach(async ({ page }) => {
    const login = new loginPage(page);
    await login.openBrowser();
    await page.waitForLoadState('domcontentloaded');
    await login.Login(process.env.user!, process.env.password!);
    await page.waitForLoadState('domcontentloaded');
    const menuNav = new menu(page);
    await menuNav.clickTime();
    await page.waitForLoadState('domcontentloaded');
    const punchPage = new punchInOutPage(page);
    await punchPage.navigateToPunchInOut();
    await punchPage.ensurePunchInState();
});

test('Verify Punch In/Out page URL is correct', async ({ page }) => {
    expect(page.url()).toContain(generalData.punchInOutPage.url);
    await page.close();
});

test('Verify Punch In page heading is displayed', async ({ page }) => {
    const punchPage = new punchInOutPage(page);
    await punchPage.isPunchInPageVisible();
    await page.close();
});

test('Verify date field is visible on Punch In page', async ({ page }) => {
    const punchPage = new punchInOutPage(page);
    await punchPage.isDateFieldVisible();
    await page.close();
});

test('Verify time field is visible on Punch In page', async ({ page }) => {
    const punchPage = new punchInOutPage(page);
    await punchPage.isTimeFieldVisible();
    await page.close();
});

test('Verify note field is visible on Punch In page', async ({ page }) => {
    const punchPage = new punchInOutPage(page);
    await punchPage.isNoteFieldVisible();
    await page.close();
});

test('Verify Punch In button is visible', async ({ page }) => {
    const punchPage = new punchInOutPage(page);
    await punchPage.isPunchInButtonVisible();
    await page.close();
});

test('Punch In without note - success', async ({ page }) => {
    const punchPage = new punchInOutPage(page);
    await punchPage.isPunchInPageVisible();
    await punchPage.clickPunchIn();
    await page.waitForLoadState('domcontentloaded');
    await punchPage.isPunchOutPageVisible();
    await page.close();
});

test('Punch In with note - success', async ({ page }) => {
    const punchPage = new punchInOutPage(page);
    await punchPage.isPunchInPageVisible();
    await punchPage.enterNote('Automated punch in with note');
    await punchPage.clickPunchIn();
    await page.waitForLoadState('domcontentloaded');
    await punchPage.isPunchOutPageVisible();
    await page.close();
});

test('Punch Out after Punch In - success', async ({ page }) => {
    const punchPage = new punchInOutPage(page);
    // Punch In first
    await punchPage.isPunchInPageVisible();
    await punchPage.clickPunchIn();
    await page.waitForLoadState('domcontentloaded');
    // Verify page switches to Punch Out
    await punchPage.isPunchOutPageVisible();
    await punchPage.isPunchOutButtonVisible();
    // Punch Out
    await punchPage.clickPunchOut();
    await page.waitForLoadState('domcontentloaded');
    // After punching out, page should show Punch In again
    await punchPage.isPunchInPageVisible();
    await page.close();
});

test('Punch Out with note after Punch In - success', async ({ page }) => {
    const punchPage = new punchInOutPage(page);
    // Punch In first
    await punchPage.isPunchInPageVisible();
    await punchPage.clickPunchIn();
    await page.waitForLoadState('domcontentloaded');
    // Punch Out with note
    await punchPage.isPunchOutPageVisible();
    await punchPage.enterNote('Automated punch out with note');
    await punchPage.clickPunchOut();
    await page.waitForLoadState('domcontentloaded');
    await punchPage.isPunchInPageVisible();
    await page.close();
});
