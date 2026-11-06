import { defineConfig, devices } from '@playwright/test';

// URL du frontend à tester (docker compose ou dev server). Sans elle, les parcours sont ignorés.
const baseURL = process.env.E2E_BASE_URL;

export default defineConfig({
  testDir: '.',
  timeout: 30_000,
  retries: 0, // pas de retry : un test instable doit être corrigé, pas masqué
  reporter: [['list']],
  use: { baseURL, trace: 'retain-on-failure' },
  projects: [
    { name: 'mobile-light', use: { ...devices['Pixel 5'], colorScheme: 'light' } },
    { name: 'mobile-dark', use: { ...devices['Pixel 5'], colorScheme: 'dark' } },
    { name: 'desktop-light', use: { ...devices['Desktop Chrome'], colorScheme: 'light' } },
  ],
});
