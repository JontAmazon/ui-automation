import { test as base, expect } from '@playwright/test';
import { HomePage } from '../../pages/home-page.js';
import { SignupLoginPage } from '../../pages/signup-login-page.js';
import { AccountCreationPage } from '../../pages/account-creation-page.js';
import { AccountCreatedPage } from '../../pages/account-created-page.js';
import { AccountDeletedPage } from '../../pages/account-deleted-page.js';
import { buildUserProfile } from '../../utils/random-data.js';

export const test = base.extend({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  signupLoginPage: async ({ page }, use) => {
    await use(new SignupLoginPage(page));
  },
  accountCreationPage: async ({ page }, use) => {
    await use(new AccountCreationPage(page));
  },
  accountCreatedPage: async ({ page }, use) => {
    await use(new AccountCreatedPage(page));
  },
  accountDeletedPage: async ({ page }, use) => {
    await use(new AccountDeletedPage(page));
  },
  user: async ({}, use) => {
    await use(buildUserProfile());
  },
});

export { expect };
