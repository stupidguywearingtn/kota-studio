# SEO-JOURNAL.md — Kota Studio (kotastudio.fr)

Ce fichier est la SEULE mémoire du run SEO/GEO quotidien automatisé. Chaque run
commence par le lire en entier avant d'agir. Ne jamais refaire un chantier déjà
listé ici comme fait.

---

## État des lieux

_(mis à jour à chaque run — reflète l'état réel constaté, pas des suppositions)_

**Au 2026-09-09 :**

- Vérifié en production avant d'agir : le bug de canonical corrigé hier
  (`63ea7a5`) tient bien — `curl` sur la page ville Saint-Julien-en-Genevois
  et sur `/projets/tel-and-cash` renvoie le canonical, title et meta
  description corrects, pas ceux de l'accueil. `sitemap.xml`, `llms.txt` et
  `robots.txt` conformes à ce qui est documenté hier.
- `npm run build` échouait avant tout (`vite: not found`) car
  `node_modules` n'existait pas dans cet environnement de session — `npm
  install` fait au début du run (dépendances du `package-lock.json`
  existant, rien de changé côté versions). À refaire si un futur run
  démarre aussi sans `node_modules`.

**Au 2026-09-08 :**

- Vérifié en production (`curl` sur `kotastudio.fr`) : le commit d'hier
  (page ville Saint-Julien-en-Genevois) est bien live sur `main` et déployé.
  Mais en inspectant le HTML brut de cette page ville et des pages projet,
  **le `<link rel="canonical">` valait toujours `https://kotastudio.fr/`
  (l'accueil), sur toutes les routes sans exception** — corrigé aujourd'hui,
  voir "Chantiers faits". Voir aussi la note de processus ci-dessous.
- Note de processus (pas un fait sur le site, mais sur ce run) : les
  instructions génériques de la session assignaient une branche de travail
  dédiée, mais les deux commits d'hier (`9c1d00a`, `f4df48c`) étaient déjà
  sur `main` sans commit de merge — confirmant que la pratique établie de
  cette routine SEO quotidienne est bien le push direct sur `main`, comme
  demandé explicitement dans les instructions de tâche ("Commit direct sur
  main"). Ce run a suivi la même pratique.

**Au 2026-09-07 :**

- Le site est une **SPA React pure, sans SSR ni prerendering** (Vite build
  standard). Vérifié en `curl`-ant `https://kotastudio.fr/` directement : le
  HTML brut servi ne contient **que `<div id="root"></div>` vide** — tout le
  contenu (titres, textes, sections) n'existe qu'après exécution du JS côté
  client. Googlebot sait rendre le JS (avec un délai, "second wave" indexing)
  donc ce n'est pas bloquant à 100% pour Google, mais c'est un **problème réel
  et non résolu pour le volet GEO** : GPTBot, ClaudeBot, PerplexityBot et la
  plupart des crawlers IA n'exécutent généralement PAS le JavaScript et ne
  verront donc **rien** sur n'importe quelle page du site tant que ce n'est
  pas corrigé. Voir "Chantiers en attente" — non traité aujourd'hui, trop
  risqué pour un run non supervisé (voir raisons plus bas).
- Avant ce run, le site ne ciblait **aucune requête géographique commerciale** :
  aucune page ne mentionnait Saint-Julien-en-Genevois, Annecy, Annemasse,
  Genève ou Lyon dans son contenu (seule mention dans le JSON-LD global :
  `areaServed: "FR"`, générique). Seules pages existantes : accueil, 4 pages
  projet (`/projets/:slug`), mentions légales, politique de confidentialité.
- NAP (nom/adresse/téléphone) : téléphone cohérent partout où il apparaît
  (+33 6 68 82 33 96 — JSON-LD, WhatsApp, mentions légales). **Adresse
  postale absente du site** : le champ `legal.company.address` dans
  `content.js` est un placeholder `[Adresse complète du siège]`, jamais
  rempli. Impossible de vérifier la cohérence NAP avec la fiche Google
  Business tant que cette adresse n'est pas fournie — voir "Hypothèses à
  vérifier".
- Fondations SEO déjà en place (commits antérieurs, avant ce journal) :
  `robots.txt`, `sitemap.xml`, `llms.txt`, meta OG/Twitter, JSON-LD
  `ProfessionalService` de base, titres par page projet (mis à jour côté
  client, cf. `ProjectPage.jsx`).

---

## Chantiers faits

### 2026-09-07 — Page ville "Création de site internet à Saint-Julien-en-Genevois"

**Pourquoi ce chantier :** mesure à l'étape 2 (voir positions ci-dessous) :
le site est absent des 7 requêtes commerciales cibles. La cause la plus
évidente et la plus actionnable est qu'aucune page ne cible ces requêtes —
plus fondamental que n'importe quel réglage technique. Saint-Julien-en-
Genevois choisi en premier car c'est le siège réel de l'agence (signal local
le plus défendable, correspond à la fiche Google Business).

**Fait précisément :**
- `src/data/cities.js` : structure de données pour les pages villes
  (réutilisable pour Annecy/Annemasse/Genève/Lyon les prochains jours —
  ajouter une entrée suffit, la route existe déjà).
- `src/pages/CityPage.jsx` : nouvelle page, route `/:citySlug` dans
  `App.jsx` (404 propre si slug inconnu, même logique que `/projets/:slug`
  existant pour `ProjectPage`).
- Contenu 100% factuel, aucune donnée inventée : les prix (790€/1290€),
  le délai (14 jours), les inclus/extras et les 6 étapes du process sont
  **importés directement de `content.js`** (`offer`, `process`), jamais
  dupliqués en dur — une seule source de vérité.
- Format GEO appliqué : chaque H2 est une vraie question, réponse directe de
  2-3 phrases en tête, "Dernière mise à jour" visible.
- JSON-LD `Service` + `BreadcrumbList` + `FAQPage` injectés dynamiquement
  (SPA sans SSR, même pattern que `ProjectPage.jsx` pour title/description).
  Le `FAQPage` reprend **mot pour mot** le texte des réponses affichées
  (vérifié en lisant le JSON-LD généré après rendu — voir contrôle qualité).
- `Footer.jsx` : bug corrigé au passage — les liens internes commençant par
  `/` (pas seulement `#ancre`) passent maintenant par le routeur React
  (`<Link>`) au lieu d'un `<a>` classique qui rechargeait toute la page.
  Nécessaire pour que le nouveau lien de maillage interne fonctionne
  proprement en SPA.
- Lien de maillage interne ajouté dans le footer, colonne "Services".
- `sitemap.xml` et `llms.txt` mis à jour avec la nouvelle page.

**Contrôle qualité fait avant de pousser :**
- `npm run build` : OK, aucune erreur.
- Testé avec Playwright/Chromium headless (viewport mobile 390×844, le
  trafic vient majoritairement de TikTok) : H1 correct, 5 sections FAQ + CTA
  rendues, JSON-LD valide et identique au texte visible, canonical et meta
  description mis à jour dynamiquement, navigation SPA depuis le footer
  fonctionnelle (plus de rechargement complet de page).
- Les seules erreurs console observées en test (Google Fonts, API Iconify)
  viennent du blocage réseau du bac à sable de développement, pas d'un bug
  applicatif — ces ressources sont accessibles en production.
- Le contenu apporte une vraie réponse (prix réels, délai réel, process
  réel) — un prospect de Saint-Julien-en-Genevois peut évaluer l'offre sans
  appeler. Rien de généré au hasard : chaque chiffre existait déjà
  publiquement ailleurs sur le site.
- Aucune des 9 sections validées de la page d'accueil touchée. Aucun
  changement visuel sur les pages existantes hors le lien footer ajouté.

**Commit :** `9c1d00a` — poussé sur `main`.

---

### 2026-09-08 — Correction du canonical erroné servi aux crawlers sans JS (bug technique)

**Pourquoi ce chantier :** à l'étape 2, en vérifiant en production (pas
seulement dans le journal) ce que voient réellement les crawlers sur la
page ville créée hier, j'ai trouvé que le `<link rel="canonical">` du HTML
brut (avant exécution du JS) vaut **toujours** `https://kotastudio.fr/`
(l'accueil), quelle que soit la route demandée — y compris sur la page
ville et sur les 4 pages projet. Seul `CityPage.jsx` corrigeait ce
canonical, et seulement **côté client** (`useEffect` après montage) ;
`ProjectPage.jsx` ne le corrigeait même pas côté client. Un canonical qui
dit explicitement "cette URL = l'accueil" est un signal fort qui peut
empêcher un moteur ou un LLM d'indexer/citer la page séparément —
c'est un problème plus fondamental et plus urgent que d'ajouter une 6e
page ville tant qu'il n'est pas corrigé, puisqu'il affecte (et affectera)
toutes les pages villes déjà faites et à venir. Choisi à la place d'une
nouvelle page ville pour cette raison.

**Fait précisément :**
- `scripts/generate-static-heads.mjs` (nouveau) : script Node exécuté après
  `vite build` (`package.json` : `"build": "vite build && node
  scripts/generate-static-heads.mjs"`). Il lit `dist/index.html` déjà
  buildé et génère, pour chaque route connue (pages villes depuis
  `cities.js`, pages projet depuis `content.js`, mentions légales,
  politique de confidentialité), un fichier `dist/<route>/index.html` avec
  un `<head>` corrigé : `<title>`, meta description, canonical, og:title,
  og:description, og:url, twitter:title, twitter:description. Le `<body>`
  et les balises `<script>`/`<link>` (bundle JS/CSS hashé) restent
  strictement identiques à `dist/index.html` — le SPA s'hydrate ensuite
  normalement, aucun changement de comportement pour le visiteur réel.
- **Aucun Playwright/Chromium** dans ce script — contrairement au
  prerendering complet évoqué hier (chantier en attente #2), qui restait
  risqué pour le build Vercel. Ici c'est de la manipulation de chaînes de
  caractères sur un fichier déjà buildé : zéro dépendance nouvelle, zéro
  risque de casser le build.
- Ce mécanisme s'appuie sur le comportement standard de Vercel : un fichier
  statique existant dans `outputDirectory` est servi avant l'application
  des `rewrites` de `vercel.json`. Donc `dist/<route>/index.html` prend le
  dessus sur le fallback SPA pour cette route exacte, tandis que les routes
  inconnues (slug ville invalide, etc.) continuent de tomber sur le
  fallback SPA comme avant (vérifié en prod, voir contrôle qualité).
- Bug corrigé au passage dans `src/pages/ProjectPage.jsx` : le canonical
  n'était jamais mis à jour côté client (contrairement à `CityPage.jsx`),
  donc même dans le DOM rendu vu par Google (qui exécute le JS), les 4
  pages projet affichaient un canonical pointant vers l'accueil. Même
  pattern que `CityPage.jsx` réutilisé (restauration au démontage incluse).

**Contrôle qualité fait avant de pousser :**
- `npm run build` : OK, script exécuté sans erreur, 7 fichiers `<head>`
  générés (1 ville, 4 projets, 2 pages légales).
- Vérifié le HTML généré : titres/descriptions correctement échappés en
  HTML (testé spécifiquement `Tel & Cash` → `Tel &amp; Cash`), URLs
  canoniques exactes par route, chemins vers le JS/CSS hashé identiques aux
  fichiers réellement présents dans `dist/assets/`.
- Testé le mécanisme de priorité fichier-statique-avant-rewrite avec un
  serveur statique local (`serve dist`, sans mode SPA) : la route ville
  sert bien le fichier généré (title/canonical corrects), une route
  inconnue renvoie 404 (comportement attendu — c'est `vercel.json` qui
  fournit le fallback SPA en prod, absent de ce test local minimal).
- Après déploiement (push sur `main`, Vercel a redéployé en ~30s) :
  **revérifié directement en production** avec `curl` sur `kotastudio.fr`
  — canonical, title et og:url corrects sur la page ville et sur
  `/projets/tel-and-cash` (avec `&` bien échappé), accueil inchangée, route
  inconnue toujours 200 avec fallback SPA (comportement identique à avant
  pour tout ce qui n'est pas dans la liste des routes connues).
- Tentative de vérification visuelle (Playwright + Chromium préinstallé,
  viewport mobile 390×844) sur la page ville en production : **échec
  réseau** (`ERR_CONNECTION_RESET` via le proxy sortant du bac à sable),
  pas un problème du site. Vérification de substitution faite à la place :
  le bundle JS/CSS servi sur les nouvelles pages est byte-identique (même
  hash de fichier) à celui déjà en production avant ce changement, et
  aucune modification de code de rendu n'a été faite (seul un `useEffect`
  supplémentaire dans `ProjectPage.jsx`, qui reprend exactement le pattern
  déjà validé hier dans `CityPage.jsx`) — risque de casse visuelle jugé
  nul, mais **pas de screenshot mobile réel obtenu ce run**, à refaire au
  prochain run si l'outil réseau le permet.
- Rien touché sur les 9 sections de la home, le slider avant/après, ni sur
  le contenu visible d'aucune page — uniquement le `<head>` brut par route
  et un `useEffect` de correction de canonical.

**Commit :** `63ea7a5` — poussé sur `main`, déployé et vérifié en prod.

---

### 2026-09-09 — Deuxième page ville : "Création de site internet à Annecy"

**Pourquoi ce chantier :** priorité n°1 de la liste "Chantiers en attente"
laissée hier. Le bug de canonical (bloquant pour toutes les pages villes,
existantes et futures) est corrigé et vérifié en prod ce matin avant de
commencer — plus de raison de retarder une nouvelle page ville. Annecy
choisi en premier parmi les villes restantes (Annemasse, Lyon, Genève,
Haute-Savoie) : plus gros bassin de population et de recherche de la zone
ciblée, requête "création site internet Annecy" confirmée comme
concurrentielle et réelle (7 agences/freelances déjà positionnés dessus,
vu en résultats de recherche à l'étape 2 — Boondooa, D2b Consulting,
WeComeBack, Webies, Teaminfo, Alpaweb, Julie Web Concept).

**Point d'attention traité explicitement (risque de doorway page) :**
Kota Studio n'a qu'une seule adresse réelle (Saint-Julien-en-Genevois).
Une page "création de site internet à Annecy" qui laisserait croire à une
implantation locale à Annecy serait non seulement un mensonge (interdit
par la règle "n'invente jamais"), mais aussi le genre de doorway page que
Google pénalise (pages quasi-identiques, seul le nom de ville change).
Pour éviter ça sur le fond, pas seulement sur la forme :
- La FAQ #1 de la page Annecy pose directement la question ("Kota Studio
  a-t-il un bureau à Annecy ?") et répond honnêtement : non, l'agence est
  à Saint-Julien-en-Genevois, suivi client en visio + présentiel possible
  (moins d'1h de route). Aucune affirmation d'implantation locale.
- Contenu non dupliqué mot pour mot depuis la page Saint-Julien : intro
  reformulée, FAQ #1 structurellement différente (question d'implantation
  au lieu de "pourquoi une agence locale"), et une 5e FAQ propre à Annecy
  sur les secteurs tourisme/immobilier autour du lac — absente de la page
  Saint-Julien.

**Fait précisément :**
- `src/data/cities.js` : nouvelle entrée `creation-site-internet-annecy`
  (5 FAQ, intro et meta title/description propres à Annecy). Réutilise le
  même gabarit `CityPage.jsx` que Saint-Julien — route `/:citySlug`
  automatique dans `App.jsx`, aucune autre modif de composant nécessaire.
  Prix/délai/inclus toujours importés de `content.js` (`offer`, `process`),
  jamais dupliqués en dur.
- `src/data/content.js` : lien "Site internet à Annecy" ajouté dans le
  footer, colonne "Services" (maillage interne, même colonne que le lien
  Saint-Julien-en-Genevois déjà présent).
- `public/sitemap.xml` et `public/llms.txt` : nouvelle page ajoutée. La
  fiche `llms.txt` mentionne explicitement l'absence de bureau à Annecy,
  pour que les crawlers IA aient la même info honnête que les visiteurs
  humains (cohérence GEO).
- `scripts/generate-static-heads.mjs` n'a pas eu besoin d'être modifié :
  il boucle déjà sur `cities` depuis `cities.js`, donc la nouvelle route a
  automatiquement généré son `dist/creation-site-internet-annecy/index.html`
  avec le bon `<head>` (title/description/canonical/OG) au build.

**Contrôle qualité fait avant de pousser :**
- Session sans `node_modules` au départ (`vite: not found`) — `npm
  install` fait avant tout, puis `npm run build` : OK, le nouveau head
  statique `/creation-site-internet-annecy` généré correctement dans la
  sortie du script (vérifié dans les logs de build).
- Testé avec Playwright/Chromium (viewport mobile 390×844, priorité TikTok)
  contre un `serve dist` local : H1, title, canonical et JSON-LD corrects ;
  JSON-LD `FAQPage` comparé mot pour mot au texte des `<h2>` visibles via
  script — identique, aucun mismatch.
- Premier screenshot plein-page pris sans scroll : sections FAQ et CTA
  apparaissaient vides (opacity 0). Pas un bug — chaque bloc `.reveal` est
  animé par ScrollTrigger (`src/lib/reveal.js`), qui ne se déclenche qu'au
  scroll réel, comportement déjà présent et voulu sur la page Saint-Julien.
  Refait avec un script qui scrolle la page par paliers avant la capture :
  les 5 FAQ (avec le tableau prix/inclus et les étapes du process), le CTA
  final et le footer (avec le nouveau lien Annecy) s'affichent
  correctement, mise en page crème/encre/or intacte, rien de cassé.
  Fichiers de test temporaires supprimés après vérification (pas commités).
- Après déploiement sur `main`, revérifié en production avec `curl` :
  `/creation-site-internet-annecy` renvoie 200, canonical/title/meta
  description corrects dans le HTML brut (avant JS), `sitemap.xml` et
  `llms.txt` à jour.
- Rien touché sur les 9 sections de la home ni sur le slider avant/après.
  Seule modification visible ailleurs que la nouvelle page : un lien
  supplémentaire dans le footer.

**Commit :** `39ca550` — poussé sur `main`.

**Ce qui n'a pas été fait aujourd'hui, et pourquoi :**
- Pas de 3e page ville (Annemasse) : une page ville par jour, pour laisser
  le temps de vérifier chacune correctement plutôt que d'enchaîner vite et
  mal. Annemasse reste en tête de la liste "Chantiers en attente".
- Pas de lien croisé inline entre les pages Saint-Julien et Annecy dans le
  corps du texte des FAQ (seulement via le footer et le breadcrumb) : le
  texte des `f.a` est actuellement du texte brut, pas du JSX — ajouter un
  lien cliquable dedans demanderait de changer la structure de données
  (passer d'une string à du JSX ou à un mini-format à parser), ce qui
  touche le composant partagé par toutes les pages villes. Trop risqué
  pour un ajout mineur de maillage interne un jour où la priorité était la
  nouvelle page — à reconsidérer si le maillage interne devient un vrai
  chantier dédié.
- Pas de prerendering du contenu (corps de page) pour les crawlers IA :
  toujours en attente, priorité 2, inchangé depuis hier.

**Ce qui n'a pas été fait aujourd'hui, et pourquoi :**
- Pas de nouvelle page ville (Annecy, etc.) : le bug de canonical touchant
  déjà toutes les pages existantes et futures, le corriger d'abord évite de
  construire du contenu supplémentaire sur une fondation cassée.
- Pas de prerendering complet du contenu (corps de page) pour les crawlers
  IA : ce chantier ne règle que le `<head>` (title/description/canonical/
  OG), pas le texte visible de la page, qui reste invisible pour
  GPTBot/ClaudeBot/PerplexityBot tant que le contenu lui-même n'est pas
  prérendu. Le vrai prerendering de contenu reste risqué pour le build
  Vercel (dépendance Chromium) — non tenté, reste en attente (voir
  ci-dessous, remonté en priorité 2 avec ce complément).
- Pas de screenshot mobile réel (voir contrôle qualité) : échec réseau du
  bac à sable, pas un choix — à refaire.

---

## Chantiers en attente

Par ordre de priorité pour les prochains runs :

1. **Pages villes suivantes** (gabarit déjà prêt dans `cities.js` +
   `CityPage.jsx`) — un jour = une ville, angle de requête différent à
   respecter (ne pas copier-coller le même texte). **Annecy faite le
   2026-09-09** (voir "Chantiers faits") :
   - Annemasse → angle "agence web Annemasse"
   - Lyon → angle "agence web Lyon"
   - Genève → angle "freelance création site internet Genève" (ton freelance/
     indépendant, pas agence — la requête réelle est différente)
   - Haute-Savoie (page régionale, pas une ville) → angle "création site
     vitrine Haute-Savoie" / "refonte site internet Haute-Savoie" (deux
     intentions différentes : création vs refonte — possiblement 2 pages,
     à trancher un de ces jours selon le volume constaté)
2. **Prerendering du CONTENU (corps de page)** pour résoudre le problème
   GEO de fond (SPA sans texte dans le HTML brut, seulement `<div
   id="root"></div>`). **Mise à jour 2026-09-08** : le mécanisme de
   fichiers statiques par route (`dist/<route>/index.html` prioritaire sur
   le rewrite Vercel) est maintenant en place et validé en prod
   (`scripts/generate-static-heads.mjs`), mais il ne couvre que le
   `<head>` (title/description/canonical/OG) — le corps de page reste vide
   dans le HTML brut, donc GPTBot/ClaudeBot/PerplexityBot ne voient
   toujours aucun texte. Piste pour aller plus loin : réutiliser le même
   script/mécanisme mais avec un vrai rendu (Playwright/Puppeteer) pour
   injecter le texte visible dans le `<body>` de chaque
   `dist/<route>/index.html`. **Non fait aujourd'hui** : risque réel de
   casser le déploiement Vercel si Chromium/Playwright n'est pas disponible
   dans l'environnement de build Vercel (contrairement à cet environnement
   de dev qui l'a préinstallé) — impossible à vérifier sans tester un vrai
   déploiement. À ne tenter qu'après validation par Yanis, ou en testant
   d'abord sur une preview branch Vercel avant `main`. Le mécanisme de
   routing/priorité fichier-statique étant déjà prouvé aujourd'hui, il ne
   reste que la partie rendu à risque, pas le mécanisme dans son ensemble.
3. Contenu de fond "combien coûte un site / combien de temps / ce qui est
   inclus" en page dédiée (actuellement seulement dans l'offre de la home
   et maintenant dupliqué en partie sur la page ville) — utile pour capter
   les recherches informationnelles génériques en plus des recherches
   locales.
4. Remplir les 4 pages projet (`Le défi / Notre approche / Le résultat / La
   recette Kota`, actuellement "Bientôt disponible") — bloqué sur du
   contenu que seul Yanis peut fournir (voir Hypothèses à vérifier).
5. Rubrique témoignages (actuellement placeholders "Nom du client, Activité,
   ville") — bloqué sur de vrais avis clients.

---

## Hypothèses à vérifier

_Ce que Yanis doit fournir — rien n'a été inventé pour combler ces trous :_

- **Adresse postale complète du siège** (mentions légales `legal.company.address`
  est un placeholder). Nécessaire pour : cohérence NAP avec la fiche Google
  Business, et pour renforcer le JSON-LD `ProfessionalService`/`Service` avec
  une vraie `PostalAddress` (actuellement absente, ce qui affaiblit le signal
  local SEO).
- SIRET, forme juridique, capital social, TVA intracommunautaire, email de
  contact, nom du directeur de publication (tous placeholders dans
  `legal.company`).
- Confirmer que la fiche Google Business Profile ("Kota Studio, Concepteur
  de sites Web, Saint-Julien-en-Genevois") porte bien le même nom exact,
  la même adresse et le même téléphone que ceux qui seront publiés sur le
  site une fois l'adresse fournie.
- Vrais logos clients (actuellement "LOGO" en placeholder dans la marquee).
- `liveUrl` de chaque projet du portfolio (actuellement `"#"`).
- Descriptions réelles des 4 projets (défi / approche / résultat / recette).
- Vrais témoignages clients.
- Confirmation de l'angle pour la page "Genève" : Kota Studio se
  positionne-t-il comme freelance ou agence pour ce marché suisse ? La
  requête réelle ("freelance création site internet Genève") suggère un
  positionnement différent de "agence" utilisé ailleurs — à clarifier avant
  d'écrire cette page pour ne pas sonner faux.

---

## Erreurs commises et corrigées

- **2026-09-08** — Ce n'est pas une technique appliquée par un run
  précédent qui s'est avérée mauvaise, mais un gap trouvé dans du code
  antérieur au journal : `ProjectPage.jsx` (page projet, existante avant le
  début du suivi SEO/GEO) ne corrigeait jamais le `<link rel="canonical">`
  côté client, contrairement à `CityPage.jsx` créé hier qui le faisait pour
  les pages villes. Leçon pour les prochains runs : sur ce site (SPA sans
  SSR), ne pas supposer qu'un pattern SEO appliqué sur un type de page
  (title/description/canonical mis à jour en JS) est forcément appliqué de
  façon cohérente sur les autres types de page — vérifier chaque
  composant de page individuellement, pas seulement le plus récent.

---

## Techniques apprises

_(à compléter chaque lundi après recherche sur l'état de l'art AI Overviews /
ChatGPT / Perplexity — pas encore fait, ce run n'était pas un lundi)_

- **2026-09-07** — Constat technique (pas une "technique" au sens recherche,
  mais un apprentissage structurel important sur CE site) : sur une SPA
  React sans SSR, les balises `<meta>`/`<title>`/JSON-LD ne peuvent être
  mises à jour par page qu'au runtime (`useEffect` + manipulation directe du
  DOM), pas via un système de "Head" déclaratif classique — c'est déjà le
  pattern utilisé par `ProjectPage.jsx` avant ce run, réutilisé à l'identique
  dans `CityPage.jsx` pour rester cohérent avec le reste du code.
  Fonctionne pour Google (qui exécute le JS) mais pas pour les crawlers IA
  qui ne le font pas — d'où la priorité n°2 des chantiers en attente.
- **2026-09-08** — Sur Vercel, un fichier statique présent dans
  `outputDirectory` (ici `dist/<route>/index.html`) est servi en priorité
  sur une règle de `rewrites` de `vercel.json` qui matche le même chemin.
  Confirmé aujourd'hui par un vrai test en production (pas seulement en
  théorie) : `dist/creation-site-internet-saint-julien-en-genevois/index.html`
  a bien pris le dessus sur le fallback SPA (`/(.*)  → /index.html`) une
  fois déployé, sans rien changer à `vercel.json`. C'est le mécanisme qui
  permettra, plus tard, de faire du vrai prerendering de contenu (pas
  seulement du `<head>`) sans avoir besoin de configuration Vercel
  supplémentaire — seul le générateur de fichiers doit évoluer.
- **2026-09-08** — Sur une SPA sans SSR servie derrière un rewrite
  catch-all, ne jamais supposer que le `<link rel="canonical">` (ni le
  title/meta description) du HTML brut est correct juste parce qu'il est
  correct sur l'accueil : par construction, TOUTES les routes reçoivent le
  même `index.html` tant qu'aucun mécanisme par-route n'existe. Un
  canonical erroné pointant vers l'accueil sur une page qu'on essaie de
  faire ranker séparément est un signal activement contre-productif (pas
  juste "neutre"/"pas encore optimisé") — à vérifier en priorité sur
  n'importe quel nouveau type de page ajouté à l'avenir.

---

## Historique des positions mesurées

_(recherche Google, sans connexion, requêtes commerciales pures — jamais le
nom de marque. Position = rang observé dans les résultats organiques,
"absent" = hors de ce qui a été retourné par la recherche.)_

### 2026-09-07 (premier relevé)

| Requête | Position kotastudio.fr |
|---|---|
| création site internet Saint-Julien-en-Genevois | absent |
| agence web Annemasse | absent |
| création site internet Annecy | absent |
| agence web Lyon | absent |
| création site vitrine Haute-Savoie | absent |
| freelance création site internet Genève | absent |
| refonte site internet Haute-Savoie | absent |

Absent partout — attendu, puisqu'aucune page ne ciblait ces requêtes avant
ce run. Premier point de comparaison pour les prochains runs. Le site étant
nouveau, il faut aussi laisser le temps à Google d'indexer et d'évaluer la
nouvelle page (généralement plusieurs semaines avant d'espérer un
mouvement, même avec un contenu pertinent) — ne pas s'inquiéter si le
relevé de demain est identique.

### 2026-09-08

| Requête | Position kotastudio.fr |
|---|---|
| création site internet Saint-Julien-en-Genevois | absent |
| agence web Annemasse | absent |
| création site internet Annecy | absent |
| agence web Lyon | absent |
| création site vitrine Haute-Savoie | absent |
| freelance création site internet Genève | absent |
| refonte site internet Haute-Savoie | absent |

Identique à hier — attendu, un seul jour s'est écoulé depuis la mise en
ligne de la page ville (indexation Google : plusieurs semaines en général).
Ce run n'a pas ajouté de nouvelle page ciblant ces requêtes ; il a corrigé
un bug technique (canonical erroné, voir "Chantiers faits") qui aurait pu
empêcher la page Saint-Julien-en-Genevois de jamais ranker séparément de
l'accueil, indépendamment du temps d'indexation. Le prochain relevé qui
comptera vraiment est celui de dans plusieurs semaines, une fois Google
repassé sur la page avec le canonical corrigé.

### 2026-09-09

| Requête | Position kotastudio.fr |
|---|---|
| création site internet Saint-Julien-en-Genevois | absent |
| agence web Annemasse | absent |
| création site internet Annecy | absent |
| agence web Lyon | absent |
| création site vitrine Haute-Savoie | absent |
| freelance création site internet Genève | absent |
| refonte site internet Haute-Savoie | absent |

Toujours absent partout, attendu (2 jours depuis la page Saint-Julien, 0
jour depuis la page Annecy créée aujourd'hui — largement en dessous du
délai d'indexation Google de plusieurs semaines évoqué hier). Les
résultats obtenus pour "création site internet Annecy" montrent un
marché déjà occupé par 7 agences/freelances établis (Boondooa, D2b
Consulting, WeComeBack, Webies, Teaminfo, Alpaweb, Julie Web Concept) —
s'attendre à un ranking plus lent et plus difficile que sur Saint-Julien-
en-Genevois, marché moins disputé. Premier relevé qui comptera vraiment :
dans plusieurs semaines, une fois Google indexé et évalué les 2 pages
villes actuelles.

---

## Ce que Yanis doit fournir (résumé, voir aussi "Hypothèses à vérifier")

1. Adresse postale complète du siège (mentions légales + cohérence Google
   Business).
2. Infos légales manquantes (SIRET, forme juridique, capital, TVA, email,
   directeur de publication).
3. Confirmation NAP exact de la fiche Google Business.
4. Logos clients réels, `liveUrl` des projets, contenu réel des 4 pages
   projet, vrais témoignages.
5. Positionnement à clarifier pour la future page Genève (freelance vs
   agence).
