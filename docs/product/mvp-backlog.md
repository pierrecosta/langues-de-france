# Backlog du MVP provençal

## Objectif

Publier le provençal seul, avec consultation, comptes, mini-jeux web et contribution validée, sur une architecture prête pour six territoires. Source de vérité du « quoi » ; le « comment » est dans les [ADR](../architecture/adr/).

## Périmètre

- **Inclus** : consultation publique (dictionnaire, expressions), comptes, mini-jeux web (qcm, matching, true-false), XP et badges, contribution validée par un administrateur, culture/tourisme/gastronomie, mise en production.
- **Exclu (Won't)** : application Android, PWA, jeu hors ligne, speed-challenge, carte de France, galerie photo, contrôle de taille de police dédié, écran de contribution dédié (l'admin Django suffit), autres territoires.
- Décisions et valeurs provisoires : mémoire du projet (« Décisions PO — tour de clarification 2026-10-26 »).

## Prérequis

- [Cahier des charges](../../objectif_initial.md), [architecture](../architecture/README.md), [standard des contenus](../standards/game-content.md).

## Personas

- **Curieux** (50 ans et plus) : consulte et joue sans compte, veut une lecture claire.
- **Transmetteur** (60 ans, Var) : valide les contenus et contribue ; non technicien, travaille dans l'admin et les fichiers JSON de données.

## Roadmap par lots

| Lot | Contenu | Sortie observable |
|-----|---------|-------------------|
| L0 | Fondations : ADR acceptés, doc alignée, squelettes backend/frontend, standards de test et de sécurité | Les deux squelettes démarrent, `lint_pack.py` passe |
| L1 | Consultation : US-001 à US-004 | Un visiteur lit un mot publié sur une URL partageable |
| L2 | Comptes, jeux, XP : US-005 à US-008 | Un compte joue, gagne de l'XP, retrouve sa progression |
| L3 | Contribution, validation, badges : US-009 à US-011 | Une contribution validée est publiée et donne un badge |
| L4 | Culture/tourisme/gastronomie, légal, production : US-012 à US-014 | Le site est en ligne sur `le-provencal.ovh` |

## User stories

### US-001 — Importer les seeds en brouillon (Must, L1)

**En tant que** transmetteur, **je veux** que les seeds provençales soient chargées en brouillon, **afin de** les valider sans rien retaper.

- Étant donné `word.json` (200 entrées) et `expression.json` (42), quand l'import est lancé, alors toutes les entrées existent avec le statut brouillon et aucune n'est publiée.
- Étant donné une entrée éditée dans l'admin, quand l'import est relancé, alors l'édition est conservée et aucun doublon n'est créé.
- Étant donné une entrée sans champ obligatoire, quand l'import est lancé, alors elle est importée en brouillon avec le champ vide, sans valeur inventée.

Dépendance : ADR-007 (identité stable).

### US-002 — Valider et publier une entrée (Must, L1)

**En tant qu'** administrateur territorial, **je veux** publier ou dépublier une entrée avec un motif, **afin de** ne montrer que du contenu validé.

- Étant donné un brouillon, quand je le publie, alors il devient visible publiquement et l'historique garde auteur et date.
- Étant donné une entrée publiée contestée, quand je la dépublie avec un motif, alors elle disparaît du public et le motif est conservé.
- Étant donné un utilisateur non administrateur, quand il tente de publier, alors l'action est refusée (403).

### US-003 — Consulter mots et expressions sans compte (Must, L1)

**En tant que** curieux, **je veux** parcourir et ouvrir un mot ou une expression, **afin de** découvrir le provençal sans m'inscrire.

- Étant donné des entrées publiées, quand j'ouvre `/provencal/mot/{slug}`, alors la fiche s'affiche en moins de 2 s avec la forme principale, les variantes et la traduction.
- Étant donné un brouillon, quand j'ouvre son URL, alors la réponse est 404.
- Étant donné un ancien slug, quand je l'ouvre, alors je suis redirigé vers le slug actuel.
- Étant donné un mobile de 360 px de large, quand je navigue au clavier ou au lecteur d'écran, alors tout est atteignable et sans violation axe.

### US-004 — Rechercher un mot (Should, L1)

**En tant que** curieux, **je veux** chercher un mot avec ou sans accent, **afin de** le trouver malgré une faute légère.

- Étant donné le mot « été », quand je cherche « ete », alors la fiche figure dans les résultats.
- Étant donné une recherche sans résultat, quand elle est lancée, alors un message clair propose de parcourir la liste.

### US-005 — Créer un compte et me connecter (Must, L2)

**En tant que** visiteur, **je veux** créer un compte avec e-mail et pseudo, **afin de** sauvegarder ma progression.

- Étant donné un e-mail valide, quand je m'inscris, alors le compte existe et je suis connecté (cookies Secure, HttpOnly, CSRF).
- Étant donné trop de tentatives de connexion, quand la limite est dépassée, alors la connexion est temporairement refusée.
- Étant donné un compte, quand je le supprime, alors mes données personnelles et ma progression sont effacées.

### US-006 — Jouer à un mini-jeu sans compte (Must, L2)

**En tant que** curieux, **je veux** jouer à qcm, matching ou true-false, **afin de** apprendre en m'amusant.

- Étant donné un pack validé, quand je lance une partie, alors elle compte 5 questions, sans chronomètre, issues de faits publiés.
- Étant donné une partie finie, quand elle se termine, alors mon score et un retour par réponse s'affichent.
- Étant donné aucun pack validé, quand j'ouvre les jeux, alors un message l'indique sans erreur.

Dépendance : pack de contenu validé, spec des jeux.

### US-007 — Sauvegarder mon score et gagner de l'XP (Must, L2)

**En tant que** joueur connecté, **je veux** que mon score soit enregistré, **afin de** suivre ma progression.

- Étant donné un score valide, quand il est envoyé, alors il est enregistré une fois (le même `submission_id` ne compte pas deux fois).
- Étant donné un score hors bornes ou une clé inconnue, quand il est envoyé, alors il est refusé (400).
- Étant donné un mot déjà consulté, quand je le reconsulte, alors aucun XP supplémentaire n'est donné.

### US-008 — Terminer un parcours par un quiz (Should, L2)

**En tant que** joueur connecté, **je veux** un quiz final de 5 questions, **afin de** valider un parcours.

- Étant donné 4 bonnes réponses sur 5, quand je termine, alors le parcours est réussi et l'XP de parcours est donnée une seule fois.
- Étant donné 3 bonnes réponses, quand je termine, alors je peux recommencer sans limite.

### US-009 — Contribuer via l'administration (Must, L3)

**En tant que** contributeur invité, **je veux** proposer une entrée, **afin de** enrichir le dictionnaire.

- Étant donné une invitation à usage unique (48 h), quand je l'utilise, alors je deviens contributeur ; après expiration, elle est refusée.
- Étant donné une contribution, quand je l'enregistre, alors elle est en attente et invisible du public.
- Étant donné une absence de source externe, quand je soumets, alors la contribution n'est pas bloquée.

### US-010 — Valider une contribution (Must, L3)

**En tant qu'** administrateur territorial, **je veux** accepter ou refuser une contribution, **afin de** garantir la qualité.

- Étant donné une contribution en attente, quand je l'accepte, alors elle est publiée et le contributeur reçoit 30 XP.
- Étant donné un refus, quand je refuse, alors un motif est enregistré et rien n'est publié.

### US-011 — Obtenir des badges (Should, L3)

**En tant que** joueur, **je veux** des badges, **afin de** voir mes progrès.

- Étant donné ma première contribution validée, quand elle est publiée, alors j'obtiens « Contributeur ».
- Étant donné 20 puis 100 mots distincts consultés, quand le seuil est atteint, alors j'obtiens « Découvreur » puis « Collectionneur ».
- Étant donné un seul territoire ouvert, quand je vois « Ambassadeur », alors il est affiché verrouillé.

### US-012 — Consulter culture, tourisme, gastronomie (Should, L4)

**En tant que** curieux, **je veux** lire des fiches lieux, recettes et activités publiées, **afin de** découvrir la culture provençale.

- Étant donné une fiche publiée, quand je l'ouvre, alors titre, histoire et source facultative s'affichent.
- Étant donné une fiche incomplète, quand je la cherche, alors elle n'est pas visible.

### US-013 — Informations légales (Must, L4)

**En tant que** visiteur, **je veux** lire mentions légales et politique de confidentialité, **afin de** savoir quelles données sont traitées.

- Étant donné toute page, quand je regarde le pied de page, alors les deux liens sont présents et mènent à une page lisible.

### US-014 — Mettre en production (Must, L4)

**En tant que** porteur, **je veux** déployer en HTTPS avec sauvegardes, **afin de** publier le site.

- Étant donné le domaine `le-provencal.ovh`, quand j'ouvre le site, alors il est en HTTPS et la page d'accueil répond en moins de 2 s.
- Étant donné une sauvegarde quotidienne hors serveur, quand je la restaure sur une copie, alors le site fonctionne.
- Étant donné une mesure de fréquentation, quand je la consulte, alors elle est agrégée, sans donnée personnelle.

## Risques, dépendances, hypothèses

| Risque | Impact | Probabilité | Réponse |
|--------|--------|-------------|---------|
| Peu de contenu validé (un seul validateur) | Site presque vide | Haute | Ouvrir avec peu d'entrées : le volume n'est pas bloquant ; publier par petits lots |
| MVP large pour une équipe réduite | Retard | Haute | Lots ordonnés, Should repoussables après L2 |
| Exploitation par une seule personne | Panne longue | Moyenne | Sauvegardes testées, retour arrière documenté |
| Droits de `src_dict.csv` et des médias non confirmés | Blocage de publication | Moyenne | Vérification avant publication, aucun média sans droit |
| Valeurs d'XP provisoires | Rééquilibrage | Faible | Validation du porteur avant production |

Hypothèses : pas de date imposée ; le validateur relit au rythme de sa disponibilité ; une entrée sans source externe reste acceptée.

## Vérification

Chaque story livrée a ses critères couverts par un test automatisé ou un parcours Playwright, et la documentation concernée est à jour.
