import { expect } from '@playwright/test';

export class NavBar {
  constructor(page) {
    this.page = page;
    this.loggedInLabel = page.locator('li').filter({ hasText: 'Logged in as' });
    this.logoutLink = page.getByRole('link', { name: ' Logout' });
  }

  async expectLoggedIn() {
    await expect(this.loggedInLabel).toBeVisible();
  }

  async expectLoggedInAs(name) {
    await expect(this.loggedInLabel).toContainText(name);
  }

  async expectNotLoggedInAs(name) {
    await expect(this.page.getByText(`Logged in as ${name}`)).not.toBeVisible();
  }

  async logout() {
    await this.logoutLink.click();
  }
}
