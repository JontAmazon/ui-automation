import { expect } from '@playwright/test';
import { NavBar } from '../components/nav-bar';

export class AccountCreatedPage {
  constructor(page) {
    this.page = page;
    this.url = 'https://www.automationexercise.com/account_created';
    this.accountCreatedHeader = page.getByRole('heading', { name: 'Account Created!' });
    this.deleteAccountLink = page.getByRole('link', { name: ' Delete Account' });
    this.continueButton = page.getByRole('link', { name: 'Continue' });
    this.navBar = new NavBar(page);
  }

  async expectAccountCreated() {
    await expect(this.accountCreatedHeader).toBeVisible();
  }

  async expectOnPage() {
    await expect(this.page).toHaveURL(this.url);
  }

  async continue() {
    await this.continueButton.click();
  }

  async verifySignupSuccessful(userFirstName) {
    await this.expectOnPage();
    await this.expectAccountCreated();
    await this.continue();
    await this.navBar.expectLoggedInAs(userFirstName);
  }

  async deleteAccount() {
    await this.deleteAccountLink.click();
  }
}
