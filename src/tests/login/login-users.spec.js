import { test } from '../fixtures/test-fixtures.js';
import { buildUserProfile, buildInvalidCredentials } from '../../utils/random-data.js';

const validEmail = process.env.VALID_LOGIN_EMAIL;
const validPassword = process.env.VALID_LOGIN_PASSWORD;
const validName = process.env.VALID_LOGIN_NAME;

if (!validEmail || !validPassword || !validName) {
  throw new Error('VALID_LOGIN_EMAIL, VALID_LOGIN_PASSWORD, and VALID_LOGIN_NAME must be set in the environment.');
}

const loginUser = {
  ...buildUserProfile(),
  email: validEmail,
  password: validPassword,
  firstName: validName,
};

test.describe('Login flows', () => {
  test('Login User with correct email and password', async ({
    homePage,
    signupLoginPage,
  }) => {
    await homePage.goto();
    await homePage.openSignupLogin();

    await signupLoginPage.expectVisible();
    await signupLoginPage.login(loginUser);

    await homePage.expectOnPage();
    await homePage.navBar.expectLoggedIn();
    await homePage.navBar.expectLoggedInAs(validName);
    await homePage.navBar.logout();
  });

  test('Login User with incorrect email and password', async ({
    homePage,
    signupLoginPage,
  }) => {
    const invalid = buildInvalidCredentials();
    await homePage.goto();
    await homePage.openSignupLogin();

    await signupLoginPage.expectVisible();
    await signupLoginPage.loginWith(invalid.email, invalid.password);
    await signupLoginPage.expectInvalidLoginAlert();
  });

  test('Logout User', async ({ homePage, signupLoginPage }) => {
    await homePage.goto();
    await homePage.openSignupLogin();

    await signupLoginPage.expectVisible();
    await signupLoginPage.login(loginUser);
    await homePage.navBar.expectLoggedIn();
    await homePage.navBar.expectLoggedInAs(validName);

    await homePage.navBar.logout();
    await signupLoginPage.navBar.expectNotLoggedInAs(validName);
    await signupLoginPage.expectOnPage();
    await signupLoginPage.expectVisible();
  });
});
