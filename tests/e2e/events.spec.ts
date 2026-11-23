import { expect, test } from '@playwright/test';

test.skip(!process.env.E2E_BASE_URL, 'Frontend non disponible : définir E2E_BASE_URL');

test('consulter un événement fictif et revenir à l’agenda', async ({ page }) => {
  const response = await page.goto('/provencal/evenement');
  expect(response?.status()).toBe(200);
  await expect(page.getByRole('heading', { name: 'Agenda provençal' })).toBeVisible();
  await expect(page.getByText(/événements et leurs lieux sont fictifs/)).toBeVisible();
  await expect(page.getByText(/dates changent chaque jour/)).toBeVisible();
  await expect(page.locator('main article')).toHaveCount(3);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);

  const event = page.getByRole('link', { name: 'Atelier de découverte du provençal' });
  const date = await event.locator('..').locator('..').locator('time').getAttribute('datetime');
  for (let index = 0; index < 20 && !(await event.evaluate((element) => document.activeElement === element)); index++) {
    await page.keyboard.press('Tab');
  }
  await expect(event).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/provencal\/evenement\/atelier-decouverte$/);
  await expect(page.getByRole('heading', { name: 'Atelier de découverte du provençal' })).toBeVisible();
  await expect(page.getByText(/événements et leurs lieux sont fictifs/)).toBeVisible();
  await expect(page.locator('main time')).toHaveAttribute('datetime', date!);
  await expect(page.getByText('Date fictive')).toBeVisible();
  await expect(page.getByText('Lieu fictif')).toBeVisible();
  await expect(page.getByRole('link', { name: /inscri|réserv|paiement/i })).toHaveCount(0);
  await page.getByRole('link', { name: /Retour à l’agenda/ }).click();
  await expect(page.getByRole('heading', { name: 'Agenda provençal' })).toBeVisible();
  expect((await page.goto('/provencal/evenement/inconnu'))?.status()).toBe(404);
});
