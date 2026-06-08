import { test, Page } from "@playwright/test";
import addEmployeesPage from "../../pages/PIM/addEmployeesPage";
import loginUtil from "../../Utils/loginUtil";

test.beforeEach(async ({ page }) => {
    const login = new loginUtil(page);
    await login.loginAndClickPIM();
})

test('Add Employee', async ({ page }) => {
    const addEmployees = new addEmployeesPage(page);
    await addEmployees.addEmployee('John', 'Doe', '123456');
    await page.pause();
})