---
name: android-compose
description: Procédure de portage post-MVP des mini-jeux web vers une application Android Kotlin/Jetpack Compose.
---

# Skill android-compose

## Objectif

Après le MVP web, porter les mini-jeux en application Android de façon régulière, testable et accessible, avec une logique de jeu indépendante de l'interface.

## Périmètre

- Dans le périmètre post-MVP : structure du projet, couche données, portage des règles web, écrans Compose, navigation, tests.
- Hors périmètre : règles normatives ([standard Android](../../../docs/standards/android.md)), conception des jeux ([minigame-templates](../minigame-templates/SKILL.md)), contrôles d'accessibilité détaillés ([design-system-accessibility](../design-system-accessibility/SKILL.md)).

## Entrées

[Spécification multiplateforme](../../templates/game-spec-template.md), export Android du pack (`content-pack.json`, `images/`), contrat d'authentification.

## Procédure

1. **Vérifier** que le portage mobile est engagé après le MVP web, puis consulter `context7` pour les versions et API de Compose, Material 3, Navigation, Gradle, `kotlinx.serialization`.
2. **Créer le projet** : module unique, catalogue de versions Gradle, `minSdk` et `targetSdk` selon le standard ; limiter l'accès réseau à la connexion et à la synchronisation prévues par le standard.
3. **Intégrer l'export versionné** dans `assets/` ; couche `data` : lecture, désérialisation, validation des références (objectifs, sources, faits). Échec = écran d'erreur lisible.
4. **Modéliser la logique** : une classe pure par template (état, actions, score) sans dépendance Android ; générateur aléatoire injectable pour des tests déterministes.
5. **Tester la logique** (JUnit) : cas nominal, fin de partie, score, cas limites listés dans la spécification.
6. **Construire les écrans** : accueil → choix du jeu → intro → partie → résultat ; un `ViewModel` par écran avec état unique immuable ; navigation Compose.
7. **Appliquer** thème clair et sombre, tokens du thème Material, cibles tactiles, descriptions TalkBack, retours ludiques (animation courte, vibration légère).
8. **Contrôler** : `./gradlew lint test`, puis essais sur émulateur en mode avion avec le pack complet et minimal, et en ligne pour connexion/synchronisation, déconnexion et résultats périmés.
9. **Vérifier** un à un les critères d'acceptation de la spécification.

## Livrables

Projet Android, tests, notes de build et de lancement.

## Critères de sortie

- Critère de conformité du [standard Android](../../../docs/standards/android.md) rempli.
- Critères d'acceptation de la spécification vérifiés.

## Voir aussi

- Agent : [android-dev](../../agents/android-dev.agent.md)
- Prompt : [create-android-game](../../prompts/create-android-game.prompt.md)
- Skills : [design-system-accessibility](../design-system-accessibility/SKILL.md), [minigame-templates](../minigame-templates/SKILL.md)
