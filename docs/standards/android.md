# Standard Android (mobile)

Source unique des règles de l'application Android. Appliqué par l'agent [android-dev](../../.github/agents/android-dev.agent.md) et contrôlé par [reviewer](../../.github/agents/reviewer.agent.md). L'accessibilité relève du [standard d'accessibilité](./accessibility.md) ; le format des données du [standard des contenus](./game-content.md).

## Cible

- **Téléphone Android uniquement**, orientation portrait. Pas de tablette, web, iOS ni Wear.
- `minSdk` 26 par défaut (à confirmer par ADR), `targetSdk` = dernière version stable.
- Application jouable hors ligne ; le contenu publié est embarqué dans les assets.
- Le réseau est limité à la connexion au compte et à la synchronisation des scores. L'authentification est décrite dans l'[ADR-004](../architecture/adr/ADR-004-authentification.md).

## Règles

- Kotlin, Jetpack Compose, Material 3, un seul module au départ.
- Architecture : `ui` (écrans Compose) → `ViewModel` (état unique, `StateFlow`) → `data` (lecture du pack de contenu). Un écran = un état immuable.
- Une classe de jeu par template (`quiz`, `qcm`, `true-false`, `matching`, `word-find`, `speed-challenge`), logique pure testable sans Android.
- Données : `kotlinx.serialization` sur le [pack de contenu](./game-content.md) ; échec de lecture = écran d'erreur lisible.
- Synchronisation : les résultats terminés hors ligne sont mis en attente et synchronisés au retour du réseau sous le compte d'origine. La file est supprimée à la déconnexion ; un résultat d'une version de contenu périmée est supprimé après le refus du serveur.
- Authentification : l'application propose la connexion uniquement ; inscription et récupération de compte se font sur le site. Les jetons natifs sont stockés dans le stockage sécurisé Android et ne sont jamais journalisés.
- Ergonomie : cibles tactiles ≥ 48 dp, une action principale par écran, usage à une main, retour visuel et vibration légère sur la réponse, textes ≥ 16 sp.
- Thèmes clair et sombre, couleurs et espacements via le thème Material (aucune valeur en dur), grille de 4 dp.
- TalkBack : `contentDescription` sur toute image ; aucune information portée par la couleur seule.
- Dépendances minimales, versions via catalogue Gradle, aucun secret dans le dépôt.
- Tests : JUnit pour la logique des jeux, tests Compose pour les écrans clés ; lint Android (`./gradlew lint`) sans erreur.

## Critère de conformité

`./gradlew lint test` passe ; chaque template s'ouvre et se joue hors ligne sur un téléphone ou émulateur. Les parcours de connexion et de synchronisation sont vérifiés en ligne ; un score en attente n'est jamais envoyé sous un autre compte après déconnexion.

## Environnement

Le [devcontainer](../../.devcontainer/README.md) n'embarque pas le SDK Android. Compiler et lancer l'émulateur depuis Android Studio sur l'hôte, ou via une image dédiée si un ADR le décide.
