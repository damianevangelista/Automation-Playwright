import { test, Page } from "@playwright/test";
import addEmployeesPage from "../../pages/PIM/addEmployeesPage";
import loginUtil from "../../Utils/loginUtil";

test.beforeEach(async ({ page }) => {
    const login = new loginUtil(page);
    await login.loginAndClickPIM();
})

test.skip('Add Employee Without Login', async ({ page }) => {
    const addEmployees = new addEmployeesPage(page);
    await addEmployees.addEmployeeWithoutLogin('John', 'Doe');
    await page.pause();
})

test('Add Employee with Login Enabled', async ({ page }) => {
    const addEmployees = new addEmployeesPage(page);
    await addEmployees.addEmployeewithLogin('John', 'Doe', 'JohnDoe', 'John@123', 'Enabled');
    await page.pause();
})

test.skip('Add Employee with Login Disabled', async ({ page }) => {
    const addEmployees = new addEmployeesPage(page);
    await addEmployees.addEmployeewithLogin('John', 'Doe', 'JohnDoe', 'John@123', 'Disabled');
    await page.pause();
})