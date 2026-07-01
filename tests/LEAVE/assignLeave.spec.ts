import { test, expect } from '@playwright/test';
import loginUtil from '../../Utils/loginUtil';
import assignLeavePage from '../../pages/Leave/assignLeavePage';
import MenuPage from '../../pages/menuOption';
import addEmployeesPage from '../../pages/PIM/addEmployeesPage';
import entitlementsPage from '../../pages/Leave/entitlementsPage';


test.beforeEach(async ({ page }) => {
    const loginutil = new loginUtil(page);
    await loginutil.login();
    const menuPage = new MenuPage(page);
    await menuPage.clickPim();
})

test('Assign Leave', async ({ page }) => {
    test.setTimeout(90000);
    const timestamp = Date.now().toString().slice(-6);
    const lastName = `DAMI${timestamp}`;
    const username = `DamianDoe${timestamp}`;
    const fullName = `Daniel ${lastName}`;

    const addEmployee = new addEmployeesPage(page);
    await addEmployee.addEmployeewithLogin("Daniel", lastName, username, "John@123", "Enabled");
    
    // Wait for the save to fully process and redirect to personal details page
    await expect(page).toHaveURL(/.*personal.*/i, { timeout: 15000 });

    const menuPage = new MenuPage(page);
    await menuPage.clickLeave();

    // Ensure we are actually on the Leave page before looking for Entitlements
    await page.waitForURL(/.*leave.*/, { timeout: 15000 });

    const entitlements = new entitlementsPage(page);
    await entitlements.addEntitlement(fullName, 'CAN - FMLA', '2026-01-01 - 2026-31-12', '2');

    const assignLeave = new assignLeavePage(page);
    await assignLeave.assignLeave(fullName, 'CAN - FMLA', '2026-01-02', '2026-01-02', 'Half Day - Morning', 'Vacation');
})
