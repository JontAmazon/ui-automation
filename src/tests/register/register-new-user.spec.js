import { test } from '../fixtures/test-fixtures.js';
import { REQUIRED_FIELDS } from '../../pages/account-creation-page.js';

async function initiateSignup({ homePage, signupLoginPage, user }) {
  /* Start registration with name and email. */
  await homePage.goto();
  await homePage.expectHomeVisible();
  await homePage.openSignupLogin();

  await signupLoginPage.expectVisible();
  await signupLoginPage.signup(user);
}

async function fillSignup({ accountCreationPage, user, formOptions = {} }) {
  await accountCreationPage.expectAccountFormVisible();
  await accountCreationPage.fillForm(user, formOptions);
}

async function submitSignup({
  accountCreationPage,
  accountCreatedPage,
  accountDeletedPage,
  user, // full user data - email, password, address, etc.
  cleanup = true,
}) {
  await accountCreationPage.submitAccount();

  await accountCreatedPage.expectOnPage();
  await accountCreatedPage.expectAccountCreated();
  await accountCreatedPage.continue();
  await accountCreatedPage.navBar.expectLoggedInAs(user.firstName);

  if (cleanup) {
    await accountCreatedPage.deleteAccount();
    await accountDeletedPage.expectAccountDeleted();
    await accountDeletedPage.continue();
  }
}

test.describe('Register User', () => {
  test('Signup with all fields', async ({
    homePage,
    signupLoginPage,
    accountCreationPage,
    accountCreatedPage,
    accountDeletedPage,
    user, // full user data
  }) => {
    await initiateSignup({ homePage, signupLoginPage, user });
    await fillSignup({ accountCreationPage, user, formOptions: { requiredOnly: false } });
    await submitSignup({ accountCreationPage, accountCreatedPage, accountDeletedPage, user });
  });

  test('Signup with required fields only', async ({
    homePage,
    signupLoginPage,
    accountCreationPage,
    accountCreatedPage,
    accountDeletedPage,
    user, // full user data
  }) => {
    await initiateSignup({ homePage, signupLoginPage, user });
    await fillSignup({ accountCreationPage, user, formOptions: { requiredOnly: true } });
    await submitSignup({ accountCreationPage, accountCreatedPage, accountDeletedPage, user });
  });

  test('Visible input alerts when required fields are missing', async ({
    /* 'please fill out this field' should be shown when a required field is missing. */
    homePage,
    signupLoginPage,
    accountCreationPage,
    user,
  }) => {
    await initiateSignup({ homePage, signupLoginPage, user });
    await accountCreationPage.expectAccountFormVisible();
    for (const field of REQUIRED_FIELDS) {
      await accountCreationPage.fillForm(user, { requiredOnly: true, omitField: field });
      await accountCreationPage.submitAccount();
      await accountCreationPage.expectRequiredFieldValidation(field);
    }
  });  
});
