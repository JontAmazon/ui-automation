# UI Automation with Playwright

Playwright UI automation test suite.

Application under test: https://www.automationexercise.com/

## Test Coverage:
1. Register User
    - with all fields
    - with required fields only
    - visible input alerts when required fields are missing
    - with already existing email
2. Login:
    - with correct email and password
    - with incorrect email and password
    - logout

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

### Set environment variables
Before running tests, register a new user [here](https://www.automationexercise.com/login). Then create .env and configure email, password, and name (see .env.example). These credentials will be used in all test cases featuring an already existing/correct account.

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

