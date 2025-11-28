import { expect } from '@playwright/test';

export class AccountDeletedPage {
  constructor(page) {
    this.page = page;
    this.url = 'https://www.automationexercise.com/delete_account';
    this.accountDeletedHeader = page.getByRole('heading', { name: 'Account Deleted!' });
    this.continueButton = page.getByRole('link', { name: 'Continue' });
  }

  async expectAccountDeleted() {
    await expect(this.accountDeletedHeader).toBeVisible();
  }

  async expectOnPage() {
    await expect(this.page).toHaveURL(this.url);
  }

  async continue() {
    await this.continueButton.click();
  }
}
