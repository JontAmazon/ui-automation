export const REQUIRED_FIELDS = [
  'password',
  'firstName',
  'lastName',
  'address1',
  // 'country', // required, but always has a value, e.g. default
  'state',
  'city',
  'zipCode',
  'mobileNumber',
];

import { expect } from '@playwright/test';

export class AccountCreationPage {
  constructor(page) {
    this.page = page;
    this.url = 'https://www.automationexercise.com/signup';
    this.accountInfoHeader = page.getByRole('heading', { name: 'Enter Account Information' });
    this.passwordInput = page.locator('#password');
    this.titleMr = page.locator('#id_gender1');
    this.titleMrs = page.locator('#id_gender2');
    this.daysDropdown = page.locator('#days');
    this.monthsDropdown = page.locator('#months');
    this.yearsDropdown = page.locator('#years');
    this.newsletterCheckbox = page.locator('#newsletter');
    this.offersCheckbox = page.locator('#optin');

    this.firstNameInput = page.locator('#first_name');
    this.lastNameInput = page.locator('#last_name');
    this.companyInput = page.locator('#company');
    this.address1Input = page.locator('#address1');
    this.address2Input = page.locator('#address2');
    this.countrySelect = page.locator('#country');
    this.stateInput = page.locator('#state');
    this.cityInput = page.locator('#city');
    this.zipcodeInput = page.locator('#zipcode');
    this.mobileNumberInput = page.locator('#mobile_number');
    this.createAccountButton = page.getByRole('button', { name: 'Create Account' });
    this.continueButton = page.getByRole('link', { name: 'Continue' });
  }

  async expectAccountFormVisible() {
    await expect(this.accountInfoHeader).toBeVisible();
  }

  async expectOnPage() {
    await expect(this.page).toHaveURL(this.url);
  }

  async fillForm(user, { omitField = null, requiredOnly = false } = {}) {
    const requiredFields = new Set([
      'title',
      'password',
      'day',
      'month',
      'year',
      'firstName',
      'lastName',
      'address1',
      'country',
      'state',
      'city',
      'zipCode',
      'mobileNumber',
    ]);

    const shouldFill = (field) => {
      if (omitField === field) return false;
      if (!requiredOnly) return true;
      return requiredFields.has(field);
    };

    const fillAndConfirm = async (field, locator, value, { clearWhenSkipped = false } = {}) => {
      if (shouldFill(field)) {
        await locator.fill(String(value));
        await expect(locator).toHaveValue(String(value));
      } else if (clearWhenSkipped) {
        await locator.fill('');
        await expect(locator).toHaveValue('');
      }
    };

    const selectAndConfirm = async (field, locator, value) => {
      if (shouldFill(field)) {
        await locator.selectOption({ value: String(value) });
        await expect(locator).toHaveValue(String(value));
      }
    };

    const checkAndConfirm = async (field, locator) => {
      if (shouldFill(field)) {
        await locator.check();
        await expect(locator).toBeChecked();
      }
    };

    await this.expectAccountFormVisible();

    await expect(this.createAccountButton).toBeVisible();
    await expect(this.createAccountButton).toBeEnabled();

    await checkAndConfirm('title', this.titleMr);
    await fillAndConfirm('password', this.passwordInput, user.password);

    await selectAndConfirm('day', this.daysDropdown, user.dateOfBirth.day);
    await selectAndConfirm('month', this.monthsDropdown, user.dateOfBirth.month);
    await selectAndConfirm('year', this.yearsDropdown, user.dateOfBirth.year);

    await checkAndConfirm('newsletter', this.newsletterCheckbox);
    await checkAndConfirm('offers', this.offersCheckbox);

    await fillAndConfirm('firstName', this.firstNameInput, user.firstName, { clearWhenSkipped: true });
    await fillAndConfirm('lastName', this.lastNameInput, user.lastName, { clearWhenSkipped: true });
    await fillAndConfirm('company', this.companyInput, user.company);
    await fillAndConfirm('address1', this.address1Input, user.address1, { clearWhenSkipped: true });
    await fillAndConfirm('address2', this.address2Input, user.address2);
    await selectAndConfirm('country', this.countrySelect, user.country);
    await fillAndConfirm('state', this.stateInput, user.state, { clearWhenSkipped: true });
    await fillAndConfirm('city', this.cityInput, user.city, { clearWhenSkipped: true });
    await fillAndConfirm('zipCode', this.zipcodeInput, user.zipCode, { clearWhenSkipped: true });
    await fillAndConfirm('mobileNumber', this.mobileNumberInput, user.mobileNumber, { clearWhenSkipped: true });

    // await expect(this.page.locator(':invalid')).toHaveCount(0);
  }

  async submitAccount() {
    await this.createAccountButton.click();
  }

  async continueToAccount() {
    await this.continueButton.click();
  }

  getFieldLocator(field) {
    const map = {
      title: this.titleMr,
      password: this.passwordInput,
      day: this.daysDropdown,
      month: this.monthsDropdown,
      year: this.yearsDropdown,
      firstName: this.firstNameInput,
      lastName: this.lastNameInput,
      address1: this.address1Input,
      country: this.countrySelect,
      state: this.stateInput,
      city: this.cityInput,
      zipCode: this.zipcodeInput,
      mobileNumber: this.mobileNumberInput,
    };
    return map[field];
  }

  async expectRequiredFieldValidation(field) {
    /* Verify that the given field is showing a 'please fill out this field' warning. */
    const locator = this.getFieldLocator(field);
    await expect(locator).toBeVisible();
    const isActive = await locator.evaluate((el) => document.activeElement === el);
    expect(isActive).toBe(true);
    const validationMessage = await locator.evaluate((el) => el.validationMessage);
    expect(validationMessage).not.toBe('');
    expect(validationMessage).toMatch(/please fill/i);
  }
}
