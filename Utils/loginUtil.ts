import { Page } from "@playwright/test";
import LoginPage from "../pages/loginPage";
import menuOption from "../pages/menuOption";

class loginUtil {
    page: Page;
    loginPage: LoginPage;
    menuOption: menuOption;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.menuOption = new menuOption(page);
    }

    async login() {
        await this.loginPage.openBrowser();
        await this.loginPage.Login(process.env.user!, process.env.password!);
    }

    async loginAndClickPIM() {
        await this.login();
        await this.menuOption.clickPim();
    }

    async loginAndClickAdmin() {
        await this.login();
        await this.menuOption.clickAdmin();
    }





}

export default loginUtil;
