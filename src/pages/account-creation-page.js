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

  async fillForm(user, { requiredOnly = false, omitField } = {}) {
    const requiredFields = new Set([
      'password',
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

    await this.expectAccountFormVisible();

    if (shouldFill('title')) {
      await this.titleMr.check();
    }
    if (shouldFill('password')) {
      await this.passwordInput.fill(user.password);
    }
    if (shouldFill('day')) {
      await this.daysDropdown.selectOption(user.dateOfBirth.day);
    }
    if (shouldFill('month')) {
      await this.monthsDropdown.selectOption(user.dateOfBirth.month);
    }
    if (shouldFill('year')) {
      await this.yearsDropdown.selectOption(user.dateOfBirth.year);
    }

    if (shouldFill('newsletter')) {
      await this.newsletterCheckbox.check();
    }
    if (shouldFill('offers')) {
      await this.offersCheckbox.check();
    }

    if (shouldFill('firstName')) {
      await this.firstNameInput.fill(user.firstName);
    } else {
      await this.firstNameInput.fill('');
    }
    if (shouldFill('lastName')) {
      await this.lastNameInput.fill(user.lastName);
    } else {
      await this.lastNameInput.fill('');
    }
    if (shouldFill('company')) {
      await this.companyInput.fill(user.company);
    }
    if (shouldFill('address1')) {
      await this.address1Input.fill(user.address1);
    } else {
      await this.address1Input.fill('');
    }
    if (shouldFill('address2')) {
      await this.address2Input.fill(user.address2);
    }
    if (shouldFill('country')) {
      await this.countrySelect.selectOption(user.country);
    }
    if (shouldFill('state')) {
      await this.stateInput.fill(user.state);
    } else {
      await this.stateInput.fill('');
    }
    if (shouldFill('city')) {
      await this.cityInput.fill(user.city);
    } else {
      await this.cityInput.fill('');
    }
    if (shouldFill('zipCode')) {
      await this.zipcodeInput.fill(user.zipCode);
    } else {
      await this.zipcodeInput.fill('');
    }
    if (shouldFill('mobileNumber')) {
      await this.mobileNumberInput.fill(user.mobileNumber);
    } else {
      await this.mobileNumberInput.fill('');
    }
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
    expect(validationMessage).toMatch(/please fill out this field/i);
  }
}
