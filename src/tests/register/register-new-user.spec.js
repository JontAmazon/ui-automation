import { test } from '../fixtures/test-fixtures.js';
import { REQUIRED_FIELDS } from '../../pages/account-creation-page.js';

async function cleanup({ accountCreatedPage, accountDeletedPage, cleanup = true }) {
  if (cleanup) {
    await accountCreatedPage.deleteAccount();
    await accountDeletedPage.expectAccountDeleted();
    await accountDeletedPage.continue();
  }
}

test.describe('Register User', () => {
  test('Signup with all fields', async ({
    openSignupLoginPage, accountCreationPage, accountCreatedPage, accountDeletedPage, user, // full user data
  }) => {
    await openSignupLoginPage.startSignup(user);
    await accountCreationPage.fillForm(user);
    await accountCreationPage.submitAccount();
    await accountCreatedPage.verifySignupSuccessful(user.firstName);
    await cleanup({ accountCreatedPage, accountDeletedPage });
  });
  
  test('Signup with required fields only', async ({
    openSignupLoginPage, accountCreationPage, accountCreatedPage, accountDeletedPage, user, // full user data
  }) => {
    await openSignupLoginPage.startSignup(user);
    await accountCreationPage.fillForm(user, { requiredOnly: true });
    await accountCreationPage.submitAccount();
    await accountCreatedPage.verifySignupSuccessful(user.firstName);
    await cleanup({ accountCreatedPage, accountDeletedPage });
  });

  test('Visible input alerts when required fields are missing', async ({
    /* alert: "please fill out this field" should be shown when a required field is missing. */
    openSignupLoginPage, accountCreationPage, user, // full user data
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
