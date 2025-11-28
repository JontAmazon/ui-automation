import { expect } from '@playwright/test';
import { NavBar } from '../components/nav-bar';

export class SignupLoginPage {

  constructor(page) {
    this.page = page;
    this.url = 'https://www.automationexercise.com/login';
    this.signupName = page.getByPlaceholder('Name');
    this.signupEmail = page.locator('form[action="/signup"] input[name="email"]');
    this.signupButton = page.getByRole('button', { name: 'Signup' });
    this.loginEmail = page.locator('form[action="/login"] input[name="email"]');
    this.loginPassword = page.locator('form[action="/login"] input[name="password"]');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.incorrectCredentialAlert = page.getByText('Your email or password is incorrect!');
    this.existingEmailAlert = page.getByText('Email Address already exist!');
    this.navBar = new NavBar(page);
  }

  async expectVisible() {
    await expect(this.page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
  }

  async expectOnPage() {
    await expect(this.page).toHaveURL(this.url);
  }

  async signup(user) {
    await this.signupName.fill(user.firstName);
    await this.signupEmail.fill(user.email);
    await this.signupButton.click();
  }

  async login(user) {
    await this.loginEmail.fill(user.email);
    await this.loginPassword.fill(user.password);
    await this.loginButton.click();
  }

  async loginWith(email, password) {
    await this.loginEmail.fill(email);
    await this.loginPassword.fill(password);
    await this.loginButton.click();
  }

  async expectInvalidLoginAlert() {
    await expect(this.incorrectCredentialAlert).toBeVisible();
  }

  async expectExistingEmailAlert() {
    await expect(this.existingEmailAlert).toBeVisible();
  }
}
