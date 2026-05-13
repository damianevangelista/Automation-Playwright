import { Page } from "@playwright/test";

class Dashboard {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async isUrlDashboard() {
        return this.page.url().includes('dashboard')
    }
}

export default Dashboard