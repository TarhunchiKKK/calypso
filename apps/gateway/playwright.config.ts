import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const useDockerGateway = process.env.E2E_USE_DOCKER === "true";
const baseURL = process.env.E2E_BASE_URL ?? (useDockerGateway ? "http://127.0.0.1:4000" : "http://127.0.0.1:3000");

export default defineConfig({
    testDir: "./e2e",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: "html",
    use: {
        baseURL,

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: "on-first-retry"
    },

    /* Configure projects for major browsers */
    projects: [
        { name: "setup", testMatch: /.*\.setup\.ts/ },
        {
            name: "main",
            use: {
                ...devices["Desktop Chrome"],
                storageState: "playwright/.auth/session.json"
            },
            dependencies: ["setup"]
        }
    ],

    /* Run gateway before tests (or reuse existing one locally). */
    ...(useDockerGateway
        ? {}
        : {
              webServer: {
                  command: "bun run start",
                  url: baseURL,
                  cwd: ".",
                  reuseExistingServer: !process.env.CI
              }
          })
});
