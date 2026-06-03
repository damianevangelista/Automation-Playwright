import { test, expect } from '@playwright/test';
import loginPage from '../pages/loginPage';
import dashboard from '../pages/dashboard';
import errorMessage from '../Datas/errorMessage.json';


test.beforeEach(async ({ page }) => {
  const login = new loginPage(page);
  await login.openBrowser();
})

test('Login with Valid username and valid password', async ({ page }) => {
  const login = new loginPage(page);
  await page.waitForLoadState('domcontentloaded');
  await login.Login(process.env.user!, process.env.password!);
  await page.waitForLoadState('domcontentloaded');
  const dash = new dashboard(page);
  await dash.isUrlDashboard()
  await page.close()
})

test('Login with wrong password', async ({ page }) => {
  const login = new loginPage(page);
  await page.waitForLoadState('domcontentloaded');
  await login.Login(process.env.user!, process.env.wrongpassword!);
  expect(await login.getErrorMessageInvalidCredencial()).toContain(errorMessage[0].message);
  await page.close()
})

test('Login with wrong username', async ({ page }) => {
  const login = new loginPage(page);
  await page.waitForLoadState('domcontentloaded');
  await login.Login(process.env.wronguser!, process.env.password!);
  expect(await login.getErrorMessageInvalidCredencial()).toContain(errorMessage[0].message);
  await page.close()
})

test('Login with empty username', async ({ page }) => {
  const login = new loginPage(page);
  await page.waitForLoadState('domcontentloaded');
  await login.Login('', process.env.password!);
  expect(await login.getErrorMessageUsernameRequired()).toContain(errorMessage[1].message);
  await page.close()
})

test('Login with empty password', async ({ page }) => {
  const login = new loginPage(page);
  await page.waitForLoadState('domcontentloaded');
  await login.Login(process.env.user!, '');
  expect(await login.getErrorMessagePasswordRequired()).toContain(errorMessage[1].message);
  await page.close()
})

test('Login with empty username and password', async ({ page }) => {
  const login = new loginPage(page);
  await page.waitForLoadState('domcontentloaded');
  await login.Login('', '');
  expect(await login.getErrorMessageUsernameRequired()).toContain(errorMessage[1].message);
  expect(await login.getErrorMessagePasswordRequired()).toContain(errorMessage[1].message);
  await page.close()
})
