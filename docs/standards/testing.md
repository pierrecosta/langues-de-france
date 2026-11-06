# Standard de test

Source unique de l'organisation des tests. Appliqué par [qa-tests](../../.github/agents/qa-tests.agent.md) ; les règles propres à chaque pile restent dans les standards [backend](./backend.md) et [frontend](./frontend.md).

## Où vivent les tests

| Niveau | Auteur | Emplacement | Outil |
|---|---|---|---|
| Unitaire backend | backend-python | `backend/` (à côté du code) | `pytest` |
| Unitaire frontend | frontend-react | `frontend/` (à côté du code) | Vitest + Testing Library |
| Données (seeds) et contrats | qa-tests | `tests/seeds/` | `pytest` |
| Intégration (API + base) | qa-tests | `tests/integration/` | `pytest` |
| Bout en bout | qa-tests | `tests/e2e/` | Playwright (`@playwright/test`) |

## Règles

- Un test est indépendant, déterministe, sans réseau externe ni horloge réelle.
- Chaque critère d'acceptation de `docs/product/mvp-backlog.md` est couvert par au moins un test ; la matrice critère → test est tenue dans le rapport d'exécution.
- Données de test : jeux minimaux créés par le test ou une fixture, dans une base dédiée ; jamais de données de production. `src_init/` est lu en lecture seule, jamais modifié.
- Les seeds sont des brouillons : les tests exigent clés, types, identifiants non vides, unicité et absence de doublons ; une valeur facultative vide n'échoue pas.
- E2E : chemin nominal et un chemin d'erreur au minimum ; mobile (Pixel 5) Light et Dark, plus bureau ; aucun retry automatique.
- Un test ignoré porte une raison écrite (`skip` avec message). Les anomalies sont notées dans `memory`.

## Seuils

- Backend : couverture ≥ 80 % du code métier (voir [backend](./backend.md)).
- Frontend : composants testés ; parcours critiques couverts en e2e.
- Aucun test en échec ou ignoré sans raison pour clore un lot.

## Commandes

- Seeds : `python -m pytest tests/seeds`
- E2E : `cd tests/e2e && npm install && npx playwright install chromium && E2E_BASE_URL=http://localhost:3000 npx playwright test`
