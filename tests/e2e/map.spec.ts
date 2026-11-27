import { expect, test } from '@playwright/test';

test.skip(!process.env.E2E_BASE_URL, 'Frontend non disponible : définir E2E_BASE_URL');

test('la racine ouvre la carte comme point d’entrée', async ({ page }) => {
  const response = await page.goto('/');
  expect(response?.status()).toBe(200);
  await expect(page).toHaveURL(/\/carte$/);
  await expect(page.getByRole('heading', { name: 'Carte des territoires' })).toBeVisible();
});

test('la carte distingue les langues en construction et ouvre le provençal au clavier', async ({ page }) => {
  const response = await page.goto('/carte');
  expect(response?.status()).toBe(200);
  await expect(page.getByRole('heading', { name: 'Carte des territoires' })).toBeVisible();
  const overseas = page.getByRole('region', { name: 'France d’outre-mer' });
  await expect(overseas.getByRole('listitem')).toHaveCount(13);
  await expect(overseas.getByRole('link')).toHaveCount(1);
  await expect(overseas.getByRole('link', { name: 'Créole réunionnais : espace en construction' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  const marker = page.getByRole('link', { name: 'Ouvrir l’espace provençal depuis la carte' });
  for (let index = 0; index < 12 && !(await marker.evaluate((element) => document.activeElement === element)); index++) {
    await page.keyboard.press('Tab');
  }
  await expect(marker).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/provencal$/);
  await expect(page.getByRole('heading', { name: 'Le provençal' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Parcourir les mots' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Essayer le quiz de démonstration' })).toBeVisible();
});
