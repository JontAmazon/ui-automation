# UI Automation with Playwright

Playwright UI automation test suite.

Application under test: https://www.automationexercise.com/


## Test Coverage:
1. Register User
    - sign up with all fields
    - sign up with required fields only
    - visible input alerts when required fields are missing
2. Register User with existing email
3. Login User with correct email and password
4. Login User with incorrect email and password
5. Logout User

Test cases 2, 3, and 5 use an existing account, credentials must be set in .env.

## Project structure

```
.github/workflows/ci.yml
.env
node_modules
package.json
package-lock.json
playwright.config.js
test-results
playwright-report
src
├── components/nav-bar.js
├── pages
│   ├── home-page.js
│   ├── signup-login-page.js
│   ├── account-creation-page.js
│   ├── account-created-page.js
│   ├── account-deleted-page.js
├── tests
│   ├── fixtures
│   └── data
│   ├── register
│   ├── login
└── utils
```

## Setup

1. Install [Node.js](https://nodejs.org/) 20+.

2. Install dependencies and Playwright browsers:

```bash
npm install
npx playwright install --with-deps
```

## Set environment variables
Before running tests, register a new user [here](https://www.automationexercise.com/login). Then create .env and configure email, password, and name. (See .env.example).

## Running tests

Run the full suite headless:

```bash
npm test
```

Run tests headed for debugging:

```bash
npm run test:headed
```

View the last HTML report (after a test run):

```bash
npm run test:report
```

## CI

GitHub Actions runs on every push and pull request. It installs dependencies, runs the Playwright suite, and uploads the HTML report as a build artifact.

