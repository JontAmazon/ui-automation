import { defineConfig, devices } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

loadEnv();

function loadEnv() {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const envPath = path.join(dirname, '.env');
  try {
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf-8');
      content
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean)
        .forEach((line) => {
          const [key, ...rest] = line.split('=');
          const value = rest.join('=');
          if (key && value && !process.env[key]) {
            process.env[key] = value;
          }
        });
    }
  } catch (error) {
    console.warn('Could not load .env file', error);
  }
}

const baseURL = process.env.BASE_URL || 'https://www.automationexercise.com';

export default defineConfig({
  testDir: './src/tests',
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], ['html']],
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    /*
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    */
  ],
  outputDir: 'test-results',
  forbidOnly: !!process.env.CI,
  workers: process.env.CI ? 2 : undefined,
});
