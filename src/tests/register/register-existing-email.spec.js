import { test } from '../fixtures/test-fixtures.js';
import { buildUserProfile } from '../../utils/random-data.js';

const existingEmail = process.env.VALID_LOGIN_EMAIL;

if (!existingEmail) {
  throw new Error('VALID_LOGIN_EMAIL must be set in the environment.');
}

const existingUser = {
  ...buildUserProfile(),
  email: existingEmail,
};

test.describe('Register User with existing email', () => {
  test('Should block registration when email already exists', async ({
    openSignupLoginPage,
  }) => {
    await openSignupLoginPage.startSignup(existingUser);
    await openSignupLoginPage.expectExistingEmailAlert();
  });
});
