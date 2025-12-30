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
  test('Login User with correct email and password', async ({ homePage, openSignupLoginPage }) => {
    await openSignupLoginPage.login(loginUser);

    await homePage.expectOnPage();
    await homePage.navBar.expectLoggedIn();
    await homePage.navBar.expectLoggedInAs(validName);
    await homePage.navBar.logout();
  });

  test('Login User with incorrect email and password', async ({ openSignupLoginPage }) => {
    const invalid = buildInvalidCredentials();
    await openSignupLoginPage.loginWith(invalid.email, invalid.password);
    await openSignupLoginPage.expectInvalidLoginAlert();
  });

  test('Logout User', async ({ homePage, openSignupLoginPage }) => {
    await openSignupLoginPage.login(loginUser);
    await homePage.navBar.expectLoggedIn();
    await homePage.navBar.expectLoggedInAs(validName);

    await homePage.navBar.logout();
    await openSignupLoginPage.navBar.expectNotLoggedInAs(validName);
    await openSignupLoginPage.expectOnPage();
    await openSignupLoginPage.expectVisible();
  });
});
