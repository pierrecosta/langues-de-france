---
name: design-system-accessibility
description: Procédure d'application du design system (tokens, thèmes Light/Dark, grille 4 px) et de contrôle d'accessibilité RGAA 4 / WCAG 2.1 AA.
---

# Skill design-system-accessibility

## Objectif

Appliquer le design system et contrôler l'accessibilité d'une interface, web ou mobile, de façon répétable.

## Périmètre

- Dans le périmètre : tokens, thèmes, espacements, contrôles d'accessibilité manuels et automatisés.
- Hors périmètre : logique applicative ([next-react-expert](../next-react-expert/SKILL.md), [android-compose](../android-compose/SKILL.md)) ; les règles elles-mêmes sont dans le [standard frontend](../../../docs/standards/frontend.md), le [standard d'accessibilité](../../../docs/standards/accessibility.md) et le [standard Android](../../../docs/standards/android.md).

## Entrées

Composants ou écrans à contrôler ; tokens existants.

## Procédure

1. **Inventorier** les valeurs de style des composants ; remplacer toute valeur en dur par un token existant, ou créer un token si aucun ne convient.
2. **Vérifier la grille** : tous les espacements sont des multiples de 4 px (4 dp sur Android).
3. **Vérifier les thèmes** : afficher chaque écran en Light puis en Dark ; contrastes et lisibilité conformes dans les deux.
4. **Vérifier la sémantique** : éléments HTML adaptés (ou composants Compose avec rôles), libellés des champs, titres hiérarchisés.
5. **Tester au clavier** (web) : parcours complet sans souris, focus visible, ordre logique, aucun piège.
6. **Auditer automatiquement** avec axe via `playwright` (web) ; avec l'outil d'accessibilité Android pour le mobile.
7. **Tester le lecteur d'écran** : TalkBack ou lecteur du navigateur sur le parcours principal.
8. **Corriger** chaque écart selon le standard d'accessibilité, puis relancer l'audit.
9. **Consigner** les écarts acceptés avec leur justification.

## Livrables

Composants conformes et rapport d'audit (violations corrigées, écarts acceptés).

## Critères de sortie

- Audit sans violation ; parcours clavier ou lecteur d'écran validé.
- Rendu validé en Light et en Dark.

## Voir aussi

- Agents : [frontend-react](../../agents/frontend-react.agent.md), [android-dev](../../agents/android-dev.agent.md)
- Standard : [accessibilité](../../../docs/standards/accessibility.md)
