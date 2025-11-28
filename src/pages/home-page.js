import { expect } from '@playwright/test';
import { NavBar } from '../components/nav-bar';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.url = 'https://www.automationexercise.com/';
    this.navBar = new NavBar(page);
  }

  async goto() {
    await this.page.goto('/');
    await this.acceptCookiesIfPresent();
  }

  async expectHomeVisible() {
    await expect(this.page.getByRole('link', { name: ' Home' })).toBeVisible();
    await expect(this.page.locator('#slider')).toBeVisible();
  }

  async expectOnPage() {
    await expect(this.page).toHaveURL(this.url);
  }

  async openSignupLogin() {
    await this.page.getByRole('link', { name: ' Signup / Login' }).click();
  }

  async acceptCookiesIfPresent() {
    // Handle consent modal shown on first visit.
    const tryClick = async (locator) => {
      try {
        if (await locator.isVisible()) {
          await locator.click();
          return true;
        }
      } catch (error) {
        return false;
      }
      return false;
    };

    if (await tryClick(this.page.getByRole('button', { name: 'Consent' }))) {
      return;
    }

    for (const frame of this.page.frames()) {
      if (frame === this.page.mainFrame()) continue;
      if (await tryClick(frame.getByRole('button', { name: 'Consent' }))) {
        return;
      }
    }
  }
}
