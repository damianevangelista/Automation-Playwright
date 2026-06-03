import { test, expect } from '@playwright/test';
import Dashboard from '../pages/dashboard';
import loginPage from '../pages/loginPage';
import { clearScreenDown } from 'node:readline';

test.beforeEach(async ({ page }) => {
    const login = new loginPage(page);
    await login.openBrowser();
    await login.Login(process.env.user!, process.env.password!);
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


