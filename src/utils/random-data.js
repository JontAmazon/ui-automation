const countries = ['Canada', 'India', 'United States', 'Australia', 'Israel'];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomString(length) {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(randomInt(0, chars.length - 1));
  }
  return result;
}

export function buildUserProfile() {
  const firstName = `Jonatan${randomString(3)}`;
  const lastName = `QA${randomString(3)}`;
  const timestamp = Date.now();
  return {
    firstName,
    lastName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}+${timestamp}@example.com`,
    password: `P@ssw0rd${randomInt(100, 999)}`,
    dateOfBirth: {
      day: `${randomInt(1, 28)}`,
      month: `${randomInt(1, 12)}`,
      year: `${randomInt(1990, 2000)}`,
    },
    company: 'Automation QA Ltd',
    address1: `${randomInt(10, 999)} Test Street`,
    address2: 'Second Test Street',
    country: countries[randomInt(0, countries.length - 1)],
    state: 'Test State',
    city: 'Malaga',
    zipCode: `${randomInt(10000, 99999)}`,
    mobileNumber: `+34${randomInt(1000000000, 9999999999)}`,
  };
}

export function buildInvalidCredentials() {
  return {
    email: `invalid-${Date.now()}@example.com`,
    password: `Wrong${randomString(6)}`,
  };
}
