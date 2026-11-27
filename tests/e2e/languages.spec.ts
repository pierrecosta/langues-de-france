import { expect, test } from '@playwright/test';

test.skip(!process.env.E2E_BASE_URL, 'Frontend non disponible : définir E2E_BASE_URL');

test('les cinq repères ouvrent une page explicite et le titre revient à la carte', async ({ page }) => {
  const languages = [
    ['Picard / ch’ti', 'picard'],
    ['Breton', 'breton'],
    ['Basque', 'basque'],
    ['Corse', 'corse'],
    ['Créole réunionnais', 'creole-reunionnais'],
  ];
  await page.goto('/carte');
  for (const [name, slug] of languages) {
    await page.getByRole('link', { name: `${name} : espace en construction` }).click();
    await expect(page).toHaveURL(new RegExp(`/langues/${slug}$`));
    await expect(page.getByRole('heading', { name })).toBeVisible();
    await expect(page.getByText(/en cours de construction/)).toBeVisible();
    await page.getByRole('link', { name: 'Langues de France' }).click();
    await expect(page).toHaveURL(/\/carte$/);
  }
  expect((await page.goto('/langues/inconnue'))?.status()).toBe(404);
});
