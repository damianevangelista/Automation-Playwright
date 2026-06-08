import { test, expect } from '@playwright/test';
import Dashboard from '../pages/dashboard';
import loginUtil from '../Utils/loginUtil';


test.beforeEach(async ({ page }) => {
    const login = new loginUtil(page);
    await login.login();
})

test('Verify Dashboard page is loaded successfully', async ({ page }) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const dashboard = new Dashboard(page);
    await dashboard.isUrlDashboard();
    await dashboard.dashboardTitle();
    await dashboard.cardPunchedOut();
    await dashboard.cardTimeAtWork();
    await dashboard.cardMyActions();
    await dashboard.cardQuickLaunch();
    await dashboard.cardBuzzLatestPost();
});

test('Go to Assign Leave Through Dashboard Quick Launch', async ({ page }) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const dashboard = new Dashboard(page);
    await dashboard.goToAssignLeave();
})

test('Go to Pending Self Review Through Dashboard My Actions', async ({ page }) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const dashboard = new Dashboard(page);
    await dashboard.goToPendingSelfReview();
})


