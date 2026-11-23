import { test, expect } from '@playwright/test';
import words from '../../frontend/src/lib/words-fixture.json';

test.skip(!process.env.E2E_BASE_URL, 'Frontend non disponible : définir E2E_BASE_URL');

test('quiz de démonstration : réponses, résultat et nouvelle partie', async ({ page }) => {
  const writes: string[] = [];
  page.on('request', (request) => {
    if (!['GET', 'HEAD', 'OPTIONS'].includes(request.method())) writes.push(request.url());
  });

  const response = await page.goto('/provencal/quiz');
  expect(response?.status()).toBe(200);
  await expect(page.getByText(/mots locaux de test/)).toBeVisible();
  await page.getByRole('button', { name: 'Commencer le quiz' }).click();

  for (let index = 0; index < 5; index++) {
    await expect(page.getByRole('heading', { name: `Question ${index + 1} sur 5` })).toBeFocused();
    const text = await page.getByText(/Comment dit-on/).textContent();
    const word = words.find((item) => text?.includes(`« ${item.french} »`));
    if (!word) throw new Error('Mot de démonstration introuvable.');
    const choices = page.getByRole('group', { name: 'Choisissez une réponse' }).getByRole('button');
    const wrong = (await choices.allTextContents()).find((choice) => choice !== word.local);
    if (!wrong) throw new Error('Distracteur introuvable.');
    await page.getByRole('button', { name: index === 0 ? wrong : word.local, exact: true }).click();
    await expect(page.getByRole('status')).toContainText(index === 0 ? 'pas la bonne réponse' : 'Bonne réponse');
    const next = page.getByRole('button', { name: index === 4 ? 'Voir le résultat' : 'Question suivante' });
    await expect(next).toBeFocused();
    await next.press('Enter');
  }

  await expect(page.getByRole('heading', { name: 'Partie terminée' })).toBeFocused();
  await expect(page.getByText(/Votre score : 4 sur 5/)).toBeVisible();
  await expect(page.getByText('Ce résultat n’est pas enregistré.')).toBeVisible();
  await page.getByRole('button', { name: 'Rejouer' }).click();
  await expect(page.getByRole('heading', { name: 'Question 1 sur 5' })).toBeFocused();
  expect(writes).toEqual([]);
});
