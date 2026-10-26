---
description: Implémenter des mini-jeux Android jouables hors ligne avec authentification et synchronisation des scores.
agent: android-dev
---

# Prompt create-android-game

## Objectif

Développer l'application Android correspondant à la spécification.

## Entrées

- Spécification : ${input:specification:Chemin de la spécification multiplateforme}
- Export Android versionné : ${input:pack:Chemin du pack de contenu}

## Consigne

1. Relis la spécification et le pack ; liste d'abord les ambiguïtés à renvoyer au game-designer, sans coder avant réponse.
2. Vérifie via Context7 les versions de Compose, Material 3 et Gradle.
3. Applique le skill android-compose : projet, couche données, logique par jeu avec tests, écrans, navigation.
4. Applique accessibilité et thèmes clair et sombre.
5. Vérifie chaque critère : jeu et contenu en mode avion ; connexion et synchronisation en ligne ; déconnexion ; résultat d'une version périmée.
6. Lance `./gradlew lint test` et documente le build.

Résultat attendu : application jouable hors ligne, synchronisation conforme au standard, tests qui passent et critères d'acceptation vérifiés.

## Voir aussi

- Agent : [android-dev](../agents/android-dev.agent.md)
- Standard : [Android](../../docs/standards/android.md)
