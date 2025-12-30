import { test } from '../fixtures/test-fixtures.js';
import { REQUIRED_FIELDS } from '../../pages/account-creation-page.js';

async function fillSignupForm({ accountCreationPage, user, formOptions = {} }) {
  await accountCreationPage.expectAccountFormVisible();
  await accountCreationPage.fillForm(user, formOptions);
}

async function submitSignupForm({
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
    openSignupLoginPage,
    accountCreationPage,
    accountCreatedPage,
    accountDeletedPage,
    user, // full user data
  }) => {
    await openSignupLoginPage.startSignup(user);
    await fillSignupForm({ accountCreationPage, user });
    await submitSignupForm({ accountCreationPage, accountCreatedPage, accountDeletedPage, user });
  });

  test('Signup with required fields only', async ({
    openSignupLoginPage,
    accountCreationPage,
    accountCreatedPage,
    accountDeletedPage,
    user, // full user data
  }) => {
    await openSignupLoginPage.startSignup(user);
    await fillSignupForm({ accountCreationPage, user, formOptions: { requiredOnly: true } });
    await submitSignupForm({ accountCreationPage, accountCreatedPage, accountDeletedPage, user });
  });

  test('Visible input alerts when required fields are missing', async ({
    /* 'please fill out this field' should be shown when a required field is missing. */
    openSignupLoginPage,
    accountCreationPage,
    user,
  }) => {
    await openSignupLoginPage.startSignup(user);
    await accountCreationPage.expectAccountFormVisible();
    for (const field of REQUIRED_FIELDS) {
      await accountCreationPage.fillForm(user, { requiredOnly: true, omitField: field });
      await accountCreationPage.submitAccount();
      await accountCreationPage.expectRequiredFieldValidation(field);
    }
  });  
});
