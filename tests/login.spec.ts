import { test, expect } from '@playwright/test';
import loginPage from '../pages/loginPage';
import dashboard from '../pages/dashboard';
import errorMessage from '../Datas/errorMessage.json';

test.beforeEach(async ({ page }) => {
  await page.goto(process.env.baseurl!)
})

test('Login Valid', async ({ page }) => {
  const login = new loginPage(page);
  await login.Login(process.env.user!, process.env.password!);
  await page.waitForTimeout(2000);
  const dash = new dashboard(page);
  expect(await dash.isUrlDashboard()).toBe(true)
  await page.close()
})

test('Login with wrong password', async ({ page }) => {
  const login = new loginPage(page);
  await login.Login(process.env.user!, process.env.wrongpassword!);
  expect(await login.getErrorMessageInvalidCredencial()).toContain(errorMessage[0].message);
  await page.close()
})

test('Login with wrong username', async ({ page }) => {
  const login = new loginPage(page);
  await login.Login(process.env.wronguser!, process.env.password!);
  expect(await login.getErrorMessageInvalidCredencial()).toContain(errorMessage[0].message);
  await page.close()
})

test('Login with empty username', async ({ page }) => {
  const login = new loginPage(page);
  await login.Login('', process.env.password!);
  expect(await login.getErrorMessageUsernameRequired()).toContain(errorMessage[1].message);
  await page.close()
})

test('Login with empty password', async ({ page }) => {
  const login = new loginPage(page);
  await login.Login(process.env.user!, '');
  expect(await login.getErrorMessagePasswordRequired()).toContain(errorMessage[1].message);
  await page.close()
})

test('Login with empty username and password', async ({ page }) => {
  const login = new loginPage(page);
  await login.Login('', '');
  expect(await login.getErrorMessageUsernameRequired()).toContain(errorMessage[1].message);
  expect(await login.getErrorMessagePasswordRequired()).toContain(errorMessage[1].message);
  await page.close()
})
