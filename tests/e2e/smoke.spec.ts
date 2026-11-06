import { test, expect } from '@playwright/test';

// Squelette L0 : ignoré tant que le frontend n'est pas déployé (E2E_BASE_URL absent).
test.skip(!process.env.E2E_BASE_URL, 'Frontend non disponible : définir E2E_BASE_URL (lot L1)');

test('chemin nominal : la page d’accueil répond et est noindex', async ({ page }) => {
  const response = await page.goto('/');
  expect(response?.status()).toBe(200);
  await expect(page.locator('main')).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
});

test('chemin d’erreur : une URL inconnue affiche une page 404 lisible', async ({ page }) => {
  const response = await page.goto('/provencal/mot/slug-inexistant-zzz');
  expect(response?.status()).toBe(404);
  await expect(page.locator('main')).toBeVisible();
});

// À compléter dès L1 (voir docs/product/mvp-backlog.md) : recherche d'un mot, fiche /provencal/mot/{slug}.
