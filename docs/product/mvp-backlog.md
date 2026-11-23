# Backlog produit — vision et quatre MVP cumulatifs

## Objectif et valeur

**Vision finale :** une plateforme web pour découvrir, préserver et transmettre les langues régionales françaises, avec des contenus éditoriaux et des expériences de découverte. Le produit s'ouvre progressivement : les quatre MVP ci-dessous sont des incréments publiables séparément, et non la livraison de toute la vision.

**Objectif de la séquence :** permettre d'abord la consultation des mots provençaux, puis l'apprentissage par QCM, la découverte du territoire sur une carte et la consultation d'un agenda public.

**Indicateur de réussite à mesurer :** part des personnes d'un test d'usage qui accomplissent sans aide les parcours de consultation propres au MVP publié (MVP1 : trouver et ouvrir un mot ; MVP2 : terminer un QCM ; MVP3 : ouvrir le territoire depuis la carte ; MVP4 : trouver la fiche d'un événement). La méthode de test est observable et reproductible ; **la cible chiffrée et la fréquence de mesure restent à valider par le porteur**.

## Décisions produit actées

- Ordre cumulatif : **MVP1 dictionnaire de mots → MVP2 quiz → MVP3 carte interactive → MVP4 agenda d'événements**. Chaque MVP peut être publié seul après satisfaction des prérequis communs de publication ci-dessous.
- MVP1 porte sur les **mots seulement**. Les expressions restent dans la vision finale et sont reportées.
- MVP2 : QCM anonyme fondé sur des mots publiés ; ni compte utilisateur, ni sauvegarde de score.
- MVP3 : carte de France dont seule la Provence est interactive ; aucun autre territoire n'est présenté comme ouvert.
- MVP4 : agenda public consultable, administré par le porteur ; ni inscription ni paiement d'événement. Les événements en cours ou à venir sont affichés publiquement ; les événements passés restent accessibles en administration.
- Les mini-jeux supplémentaires, les comptes et la progression, les territoires supplémentaires et les autres besoins déjà exprimés restent au backlog ultérieur ; ils ne sont pas supprimés.

## Personas et périmètre

- **Curieux/apprenant** : consulte le dictionnaire, puis découvre les contenus et le territoire sans devoir créer un compte.
- **Porteur / administrateur éditorial** : publie les mots et les événements de l'agenda. Les moyens d'administration existants sont à confirmer pour chaque type de contenu.
- **Contributeur culturel** : persona de la vision finale ; la contribution communautaire n'est pas incluse dans ces quatre MVP.

Le périmètre territorial initial est le provençal, avec une attention particulière au Var. Les MVP n'ouvrent pas les autres langues ou territoires.

## Prérequis communs de publication — applicables séparément à MVP1, MVP2, MVP3 et MVP4

Ce sont des **conditions de mise en ligne**, pas des fonctionnalités produit supplémentaires. Aucun MVP ne dépend de la livraison des trois suivants.

| Domaine | Critères de passage vérifiables |
|---|---|
| Sécurité | Le site public et l'administration sont servis en HTTPS avec un certificat valide ; les requêtes HTTP ne transmettent pas de données en clair. Les parcours publics ne permettent pas d'écrire/modifier du contenu. Toute action éditoriale est refusée à un visiteur non autorisé (réponse de refus vérifiée). Les secrets de production sont fournis hors du dépôt ; les contrôles de sécurité prévus pour la version candidate sont exécutés et leurs résultats sont examinés, avec aucun problème bloquant non résolu ou accepté explicitement par le porteur. |
| Protection des données | Avant publication, un inventaire indique pour le périmètre du MVP les données traitées, leurs finalités, accès et durées de conservation, y compris les journaux et mesures d'audience. Les données non nécessaires ne sont pas collectées. Le texte d'information et les mentions applicables correspondent aux traitements réellement activés. Aucun traceur ou dispositif d'audience non approuvé n'est activé. Pour le QCM MVP2, aucun compte, résultat nominatif ou score persistant n'est créé. |
| Exploitation | Une procédure décrit déploiement, contrôle de santé, diagnostic et retour arrière. Une sauvegarde de la base et des médias effectivement utilisés est disponible hors serveur ; sa restauration sur une copie est exécutée et le parcours public du MVP candidat est vérifié après restauration. Les contrôles de santé et les principales pages/API du périmètre répondent après déploiement. |
| Publication | Le porteur valide les contenus publiés et les droits des médias éventuels. Le domaine, les informations légales et les textes d'information sont vérifiés avant ouverture publique. Le résultat de chaque contrôle est consigné pour le MVP concerné. |

Les éléments de conservation, responsable de traitement, mentions légales et seuils de gravité des alertes de sécurité doivent être précisés dans les procédures et documents appropriés ; aucun de ces choix n'est considéré comme déjà acté ici.

## Roadmap et stories

Les critères ci-dessous décrivent la cible produit. « Présent dans le code » n'équivaut pas à « livré ». Aucun des quatre MVP n'est déclaré livré par la seule inspection documentaire.

### MVP1 — Dictionnaire provençal de mots

**Valeur / priorité : Must.** C'est le premier service autonome et le socle de contenu des incréments suivants. Il ne contient pas les expressions.

**Inclus :** consultation anonyme d'une liste et des fiches de mots publiés, recherche de base, administration éditoriale des mots.
**Limites :** pas d'expressions, de comptes, de contribution publique, de jeux, de carte, d'événement, ni d'autres territoires. La tolérance aux fautes, les filtres avancés et les fonctions de progression sont reportés.

#### US-M1-01 — Publier des mots provençaux

**En tant que** porteur, **je veux** gérer un mot en brouillon puis le publier ou le dépublier, **afin de** maîtriser ce qui est présenté au public.

- Étant donné un mot en brouillon, quand un administrateur autorisé le publie, alors il devient accessible dans la liste publique et sa fiche est consultable.
- Étant donné un brouillon ou un mot dépublié, quand un visiteur demande sa fiche ou le cherche, alors il n'est pas exposé et la fiche répond comme absente (404).
- Étant donné un visiteur non autorisé, quand il tente une action de publication, alors l'action est refusée (403 ou équivalent de refus documenté).
- Étant donné un champ facultatif vide, quand la fiche publique s'affiche, alors ce champ n'apparaît pas comme une valeur inventée ou un faux contenu.
- **Dépendances :** administrateur autorisé, contenu éditorial vérifié, critères de publication et éventuels droits des sources.
- **État vide/erreur :** aucun brouillon n'est confondu avec un mot publié ; une erreur de publication est signalée à l'administrateur et ne rend pas le mot public.

#### US-M1-02 — Parcourir les mots publiés sans compte

**En tant que** curieux, **je veux** parcourir les mots et ouvrir une fiche, **afin de** découvrir le provençal sans m'inscrire.

- Étant donné au moins un mot publié, quand j'ouvre le dictionnaire, alors seuls des mots publiés sont listés et chaque élément ouvre sa fiche.
- Étant donné une fiche publiée, quand je l'ouvre, alors les formes provençale et française sont présentées ; les autres champs ne sont affichés que s'ils ont une valeur.
- Étant donné un mot inexistant, un brouillon ou un slug inconnu, quand j'ouvre son URL publique, alors la page indique que le mot est introuvable et ne révèle pas son contenu.
- Étant donné qu'aucun mot n'est publié, quand j'ouvre le dictionnaire, alors un état vide indique qu'aucun mot n'est encore disponible, sans erreur technique ni contenu de brouillon.
- Étant donné une indisponibilité du service de données, quand j'ouvre la liste ou une fiche, alors un état d'indisponibilité est distinct de « aucun résultat ».
- **Dépendances :** US-M1-01 ; service de données du dictionnaire.

#### US-M1-03 — Rechercher un mot

**En tant que** curieux, **je veux** rechercher dans les formes provençales et françaises, **afin de** retrouver un mot sans parcourir toute la liste.

- Étant donné un mot publié contenant la chaîne recherchée dans sa forme provençale ou française, quand je lance la recherche, alors ce mot apparaît dans les résultats.
- Étant donné une recherche sans correspondance, quand les résultats s'affichent, alors un message sans ambiguïté indique qu'aucun mot ne correspond et permet de revenir à la liste.
- Étant donné un résultat correspondant à un brouillon, quand je lance la recherche, alors ce brouillon n'apparaît pas.
- **Dépendances :** US-M1-01 et US-M1-02.
- **Limite :** la recherche approximative, les filtres et les règles de pagination restent à préciser/étendre ; l'équivalence accents et fautes légères fait partie des décisions à valider ci-dessous.

**Sortie observable MVP1 :** une personne sans compte peut consulter et chercher des mots provençaux publiés ; l'administrateur peut contrôler leur publication. États vide et indisponibilité vérifiés.

### MVP2 — QCM anonyme sur les mots publiés

**Prototype local uniquement :** un quiz de démonstration utilise les mots du
jeu de données frontend, sans API ni garantie de validation éditoriale. Il ne
constitue pas encore le MVP 2 sur mots publiés. Le parcours propose une
question français → provençal, une correction immédiate et un score
temporaire ; aucune partie n'est sauvegardée. La source publiée, les
retraits et la validation linguistique des distracteurs restent à réaliser
avant publication.

**Valeur / priorité : Must après MVP1.** Propose une première activité pédagogique à partir du dictionnaire publié, sans introduire de comptes ni de conservation de scores.

**Inclus :** QCM en session anonyme, contenu tiré de mots publiés.
**Limites :** pas de matching, vrai/faux ou autre mini-jeu ; pas de compte, de profil, d'historique, de progression ou de score sauvegardé. Le retour temporaire et les autres règles détaillées du QCM restent à préciser.

#### US-M2-01 — Jouer à un QCM à partir de mots publiés

**En tant que** curieux, **je veux** répondre à un QCM sur des mots provençaux publiés, **afin de** réviser le vocabulaire sans créer de compte.

- Étant donné un contenu de QCM éditorialement validé et fondé sur des mots publiés, quand je démarre une partie, alors les questions affichées proviennent de ce contenu.
- Étant donné un QCM affiché, quand je choisis une proposition, alors ma réponse est traitée pour la session en cours et aucun compte n'est requis.
- Étant donné au moins cinq mots publiés éligibles permettant chacun trois distracteurs distincts et non ambigus tirés des mots publiés, quand je démarre, alors la partie présente cinq questions distinctes avec quatre choix dont un seul correct.
- Étant donné exactement quatre mots éligibles permettant ces choix, quand je démarre, alors la partie est réduite à quatre questions distinctes.
- Étant donné moins de quatre mots éligibles ou des distracteurs ambigus, quand une partie ne peut être composée avec quatre choix valides, alors les questions concernées sont exclues et le quiz est indisponible si moins de quatre mots restent éligibles ; aucun faux mot n'est inventé.
- Étant donné qu'un mot utilisé par le QCM est dépublié, quand le contenu du QCM est servi pour une nouvelle partie, alors ce mot ne fournit plus de question publique.
- Étant donné qu'aucun contenu de QCM validé et exploitable n'est disponible, quand j'ouvre le quiz, alors un état vide explique qu'il n'y a pas de quiz disponible et ne déclenche pas d'erreur.
- Étant donné une erreur de chargement, quand j'ouvre ou poursuis le quiz, alors un état d'erreur permet de comprendre que le service est indisponible et ne présente pas l'erreur comme une partie terminée.
- Étant donné une partie terminée, quand je quitte puis rouvre le quiz, alors aucun score sauvegardé ni historique de partie ne m'est présenté.
- **Dépendances :** MVP1, mots publiés et contenu de QCM validé ; décisions de contenu et de règles ci-dessous.
- **Limites :** aucune question provenant d'une expression, d'un brouillon ou d'un mot non publié ; aucune soumission de score persistante ni collecte d'identité du joueur.

**Sortie observable MVP2 :** le MVP1 reste utilisable et une personne anonyme peut jouer à un QCM ; aucune sauvegarde de score n'est ajoutée.

### MVP3 — Carte interactive des territoires

**Valeur / priorité : Must après MVP2.** Rend visible l'ancrage territorial et donne accès au territoire ouvert sans laisser croire que d'autres territoires sont disponibles.

**Inclus :** une carte de France sur laquelle seule la Provence est interactive. Les autres parties de la carte ne sont pas proposées comme territoires ouverts ou sélectionnables.
**Limites :** cette représentation ne définit pas de frontière linguistique ni de délimitation de la Provence ; ne pas en inventer. La source et la licence de la géométrie de la carte doivent être validées avant publication.

#### US-M3-01 — Ouvrir le territoire provençal depuis la carte

**En tant que** curieux, **je veux** voir et sélectionner le territoire provençal sur une carte interactive, **afin de** découvrir l'espace linguistique actuellement ouvert.

- Étant donné que la carte est disponible, quand je l'ouvre, alors elle représente la France et seule la Provence y est interactive ; aucune autre partie n'est présentée comme un territoire ouvert.
- Étant donné que je sélectionne la Provence, quand j'active sa zone interactive, alors je peux ouvrir l'espace provençal du produit.
- Étant donné que les autres territoires ne sont pas ouverts, quand je consulte la carte, alors les autres parties de la France ne proposent ni sélection, ni lien, ni indication d'ouverture.
- Étant donné que les données cartographiques ne peuvent être chargées, quand j'ouvre la carte, alors un état d'erreur explicite est affiché et un accès textuel à l'espace provençal reste disponible.
- **Dépendances :** MVP1 et MVP2 conservés dans le produit ; source/licence de la carte de France et manière de représenter interactivement la Provence à valider, sans inventer de frontière linguistique ou de données géographiques.
- **État vide :** l'espace provençal reste clairement identifiable ; aucune sélection territoriale ne conduit à une page vide.

**Sortie observable MVP3 :** l'ensemble des usages des MVP1 et MVP2 reste disponible ; la carte propose seulement le territoire provençal.

**Prototype local :** la page `/carte` représente la métropole et les territoires ultramarins en encarts à des échelles différentes. Un repère situé à Marseille et un lien textuel ouvrent l'espace provençal, sans dessiner de frontière linguistique ; les autres territoires ne sont pas sélectionnables. Les contours sont embarqués avec l'application : ils ne nécessitent ni service cartographique ni téléchargement au moment de la consultation. Le prototype ne constitue pas une validation éditoriale ou juridique de la carte pour publication.

**Source et reproduction :** contours régionaux généralisés, millésime 2026, du jeu [Contours administratifs de data.gouv.fr](https://www.data.gouv.fr/datasets/contours-administratifs), sous [ODbL 1.0](https://opendatacommons.org/licenses/odbl/1-0/). La source combine notamment Admin Express de l'IGN, © les contributeurs OpenStreetMap et, pour la Polynésie française et la Nouvelle-Calédonie, des jeux territoriaux identifiés dans la fiche source. Fichiers utilisés : [regions-1000m.geojson](https://contours-administratifs.s3.rbx.io.cloud.ovh.net/2026/geojson/regions-1000m.geojson) (SHA-256 : `2a48c8a4a38532053f07045e6d5a8ba0b1b6ff20d9d883f155ba9ea2abdbe685`) et [regions-100m.geojson](https://contours-administratifs.s3.rbx.io.cloud.ovh.net/2026/geojson/regions-100m.geojson) (SHA-256 : `f85fe769841120140cdf0dc8fb9536926ad884157fd8e26f74aec58b18994ba4`), ce dernier pour Saint-Barthélemy, Saint-Martin et Clipperton. Après téléchargement et vérification des fichiers, régénérer avec `python scripts/generate_map_data.py chemin/regions-1000m.geojson chemin/regions-100m.geojson frontend/src/lib/map-data.json`. Les contours et les échelles sont simplifiés ; vérifier la couverture, les droits et la représentation avant publication.

### MVP4 — Agenda public d'événements

**Valeur / priorité : Must après MVP3.** Permet au public de consulter les rendez-vous publiés et au porteur de tenir l'agenda à jour.

**Inclus :** agenda consultable publiquement ; administration des événements par le porteur.
**Limites :** aucune inscription, réservation, billetterie, paiement ou compte visiteur ; l'agenda n'est pas un service transactionnel.

#### US-M4-01 — Administrer et publier un événement

**En tant que** porteur, **je veux** saisir, corriger, publier ou retirer un événement, **afin de** maintenir un agenda public fiable.

- Étant donné un événement non publié, quand le porteur le publie, alors il devient consultable dans l'agenda public.
- Étant donné un événement non publié ou retiré, quand un visiteur consulte l'agenda ou sa fiche, alors cet événement n'est pas exposé.
- Étant donné un utilisateur non autorisé, quand il tente de modifier ou publier un événement, alors l'action est refusée.
- Étant donné qu'une donnée requise par le contrat éditorial validé manque, quand le porteur tente de publier, alors l'événement n'est pas publié et le champ à corriger est signalé.
- **Dépendances :** MVP1 à MVP3 conservés ; autorisation de l'administrateur et contrat éditorial des événements à confirmer.
- **Limite :** la manière précise dont l'administration est fournie n'est pas présumée par cette story.

#### US-M4-02 — Consulter l'agenda sans inscription

**En tant que** visiteur, **je veux** consulter les événements publiés et leur fiche, **afin de** découvrir les rendez-vous annoncés.

- Étant donné un événement publié, quand j'ouvre l'agenda puis sa fiche, alors les informations éditoriales publiées et les dates renseignées sont consultables sans compte.
- Étant donné un événement publié en cours ou à venir, quand j'ouvre l'agenda, alors il peut y être consulté ; un événement terminé n'apparaît plus dans l'agenda public et reste consultable par l'administrateur.
- Étant donné qu'aucun événement n'est publié, quand j'ouvre l'agenda, alors un état vide indique qu'aucun événement n'est annoncé.
- Étant donné un événement absent, non publié, retiré ou terminé, quand j'ouvre sa fiche publique, alors elle est indiquée comme indisponible sans révéler son contenu.
- Étant donné une indisponibilité du service, quand je consulte l'agenda, alors un état d'erreur est distinct de l'agenda vide.
- Étant donné un événement affiché, quand je consulte ses actions disponibles, alors aucune inscription, réservation ou paiement n'est proposé.
- **Dépendances :** US-M4-01 et contrat des données d'événement.

**Sortie observable MVP4 :** les MVP précédents restent disponibles ; le public consulte l'agenda et le porteur administre les événements, sans inscription ni paiement.

**Prototype local :** `/provencal/evenement` présente trois événements fictifs, avec fiches et dates calculées à 7, 14 et 21 jours à partir de la date UTC courante ; ces dates changent chaque jour. Les titres, descriptions et lieux ne correspondent à aucune annonce réelle. Aucune inscription ni paiement ne sont proposés. Les données sont embarquées et il n'y a pas d'administration, d'API ou de persistance : les règles de publication, de retrait et de masquage des événements passés restent à construire et à tester avant livraison.

## Après ces quatre MVP — besoins conservés, non supprimés

Les sujets suivants proviennent de la vision finale, du cahier des charges et du backlog antérieur. Ils sont **ultérieurs ou à reprioriser**, et ne doivent pas être considérés comme livrés par MVP4 :

- Expressions provençales (objectif de vision : 500 par territoire), malgré leur présence dans le modèle et les interfaces existants.
- Recherche avancée : fautes légères, filtres, pagination cible de 25 résultats ; affichage et options de variantes.
- Autres mini-jeux (matching, vrai/faux, recherche de mots, défi chronométré) et parcours d'apprentissage.
- Comptes, profils, historique, sauvegarde de progression, XP, niveaux, statistiques personnelles et badges.
- Contributions communautaires, invitations, workflow de proposition/refus et récompenses.
- Contenus culturels, histoire, cartographie enrichie, tourisme, lieux et activités, gastronomie, médias et liens externes.
- Ouverture des autres territoires ciblés à terme : Ch'ti/Picard, breton, basque, corse et créole réunionnais ; leur ordre et leurs dates restent à décider.
- Objectifs de volume de contenu (notamment 5 000 mots par territoire), portail France/DROM complet et autres extensions de la vision.
- PWA et application mobile native : hors de ces quatre MVP ; le cahier des charges place le mobile après le MVP.

## Décisions à valider — ne pas traiter comme acquises

1. Cible chiffrée, population, fréquence et méthode formelle de l'indicateur de réussite de la séquence.
2. Champs obligatoires d'un mot avant publication, provenance/droits des seeds et médias, ordre de grandeur éditorial souhaité avant ouverture.
3. Contrat de recherche MVP1 : accents, casse, recherche dans variantes, tolérance aux fautes, volume/pagination et comportement de liste longue.
4. QCM : sens de la question, mode de sélection, présentation de la bonne réponse, possibilité de rejouer, score temporaire éventuel et procédure éditoriale de validation des distracteurs. La partie vise cinq questions à quatre choix ; si quatre mots éligibles seulement sont disponibles, elle compte quatre questions, et reste indisponible en dessous.
5. Carte : source/licence et périmètre de la carte de France ; mode de représentation interactive de la Provence sans inventer de limite linguistique ; inclusion éventuelle des DROM dans le fond cartographique, navigation clavier/alternative textuelle et comportement au zoom.
6. Agenda : champs obligatoires, dates et fuseau permettant de déterminer la fin d'un événement, traitement des annulations et récurrences, tri, éventuelle recherche, médias/liens et règles de publication/retrait.
7. Identité opérationnelle du « porteur » pour administrer l'agenda, délégations éventuelles et modalités d'accès ; cela ne signifie pas la création de comptes publics.
8. Responsable de traitement, durées de conservation, contenu légal précis, éventuelles mesures d'audience, seuils de sécurité et cible de restauration/exploitation.

## Risques, dépendances et hypothèses

| Risque | Impact | Probabilité | Réponse |
|---|---|---|---|
| Confusion entre incrément publié et vision finale | Attentes de fonctionnalités non livrées | Moyenne | Présenter le périmètre et les reports à chaque publication ; ne déclarer livrée que la tranche vérifiée. |
| Peu de mots ou événements validés | Dictionnaire ou agenda vide à l'ouverture | Moyenne | Rendre l'état vide explicite ; publication seulement de contenus vérifiés, sans inventer de volume minimal. |
| Contenu QCM inadapté ou insuffisant | Quiz absent, erroné ou trompeur | Moyenne | Définir le contrat de contenu et faire valider questions/réponses avant publication. |
| Carte ou emprise contestée | Représentation géographique inexacte | Moyenne | Valider source, droits et périmètre avant MVP3. |
| Écarts entre code existant et contrat de publication | Brouillon exposé, faux état vide ou recherche trompeuse | Moyenne | Tester les parcours API et navigateur contre les critères de chaque tranche, dont les erreurs de service. |
| Documentation actuelle continue d'annoncer un MVP monolithique | Portée contradictoire pour produit et équipe | Haute | Aligner les documents listés dans « Incohérences à traiter ailleurs ». |
| Dépendance à une seule personne pour publication/exploitation | Blocage ou indisponibilité prolongée | Moyenne | Procédure de publication, sauvegarde restaurable et délégations à décider. |

**Hypothèses de travail non validées :** pas de date imposée ; les contenus sont vérifiés par le porteur ; l'absence de source externe n'invalide pas automatiquement une forme linguistique ; les événements sont édités avant diffusion. Aucune hypothèse ne crée un compte visiteur, une inscription ou un paiement.

## État observé du dépôt (inspection documentaire/code, pas une recette)

| Tranche | Présent / repéré | Livré ? |
|---|---|---|
| MVP1 | Modèle Word, administration, API publique filtrant les brouillons, pages liste/fiche et recherche côté interface repérés ; tests de modèle/API présents dans l'arbre. | **Non vérifié** : tests non exécutés ici, données réellement publiées, scénarios complets, déploiement et gates communs non contrôlés. |
| MVP2 | Un prototype de QCM anonyme utilise des données locales de démonstration ; une spécification historique de mini-jeux existe dans `docs/product/game-spec-mvp.md`. | **Non déclaré livré** : le prototype n'utilise pas les mots publiés de l'API ; validation linguistique, retraits et critères de publication restent à traiter. |
| MVP3 | Prototype de carte locale avec accès provençal et encarts ultramarins ; contours administratifs attribués. | **Non déclaré livré** : validation de la représentation, des droits et des prérequis communs encore nécessaire. |
| MVP4 | Prototype local d'agenda et de fiches sur des événements fictifs ; aucune administration ni donnée réelle. | **Non déclaré livré** : administration, publication, retrait, filtrage des événements passés et prérequis communs restent à réaliser et vérifier. |

La présence d'une fonctionnalité dans le dépôt, d'un test ou d'une spécification ne prouve ni que la recette passe ni qu'elle est publiée.

## Incohérences à traiter dans les autres documents / le produit

- La [spécification de jeu historique](./game-spec-mvp.md) documente plusieurs jeux et la progression future ; adapter ses règles détaillées au QCM anonyme et au choix de distracteurs avant publication.
- Le code web contient des chemins d'expressions et la page d'accueil annonce expressions/culture. Ce code ne change pas la décision MVP1 « mots uniquement » et n'autorise pas à déclarer ces éléments livrés dans MVP1.
- La recherche côté web envoie `q` à l'API ; le chemin API générique observé ne montre pas de filtrage par `q`. De plus, le client prévoit un repli sur une fixture locale lors d'une indisponibilité, ce qui peut confondre panne et absence de contenu publié. À vérifier/corriger dans les composants et tests, hors de ce changement documentaire.
- La revue sécurité ciblée signale aussi des points à vérifier avant ouverture : transitions de statut via le formulaire d'administration pouvant contourner le motif de retrait ; cache de 60 secondes et repli local susceptibles de réexposer un mot retiré ; configuration effective de HTTPS, cookies et limitation de débit ; pages légales. Ces constats sont issus d'une lecture, pas d'un audit de production ; prévoir corrections et tests avant de déclarer les critères satisfaits.
- Les tests et procédures de publication doivent être adaptés aux critères et prérequis ci-dessus. Les précisions de séquencement ont été ajoutées aux ADR concernés.
