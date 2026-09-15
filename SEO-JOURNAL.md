# SEO-JOURNAL.md — Kota Studio (kotastudio.fr)

Ce fichier est la SEULE mémoire du run SEO/GEO quotidien automatisé. Chaque run
commence par le lire en entier avant d'agir. Ne jamais refaire un chantier déjà
listé ici comme fait.

---

## État des lieux

_(mis à jour à chaque run — reflète l'état réel constaté, pas des suppositions)_

**Au 2026-09-15 :**

- Vérifié en production avant d'agir : `git log` confirmait que rien n'avait
  bougé depuis le commit de journal du 09-14 (`7ee625b`). `curl` sur les 3
  pages villes, la page prix et une page projet : title/description/
  canonical toujours corrects. Recherche des 7 requêtes commerciales + 2
  informationnelles (détail sous "Historique des positions mesurées") :
  **kotastudio.fr toujours absent partout**, attendu (1 jour depuis le
  dernier run, largement sous le délai d'indexation). Kreaxion toujours
  présent sur plusieurs requêtes Haute-Savoie/Genevois, rien de nouveau.
- Chantier du jour : **prerendering du contenu texte (corps de page)**,
  priorité 2 de "Chantiers en attente" depuis le 09-07/09-08, jusqu'ici
  bloqué par le risque perçu (Playwright/Chromium indisponible dans le
  build Vercel). Résolu aujourd'hui sans cette dépendance — voir
  "Chantiers faits" pour le détail technique. C'est un chantier technique,
  pas une page ville, ce qui respecte la règle d'alternance (dernier
  chantier, 09-14, était une page ville).

**Au 2026-09-14 (lundi — 4 jours depuis le dernier run, pas de run les 11/12/13) :**

- Vérifié en production avant d'agir (pas seulement le journal) : les 2
  pages villes, la page prix (`/combien-coute-un-site-internet`) et
  `/projets/tel-and-cash` renvoient toujours title/description/canonical
  corrects en `curl`. `sitemap.xml` et `llms.txt` conformes à ce qui est
  documenté le 09-10. Rien n'a bougé côté code entre le 09-10 et
  aujourd'hui (`git log` : dernier commit avant ce run = `d949e34`, le
  commit de journal du 09-10). Placeholders légaux (`legal.company.*`
  dans `content.js`) toujours non remplis — aucune info fournie par Yanis
  depuis le dernier run.
- Recherche des 7 requêtes commerciales + les 2 requêtes informationnelles
  liées à la page prix (`combien coûte un site internet`, `combien coûte
  un site vitrine`) : **kotastudio.fr absent partout**, sans surprise (7
  jours depuis Saint-Julien, 5 depuis Annecy, 4 depuis la page prix —
  toujours sous le délai d'indexation Google de plusieurs semaines).
  Détail dans "Historique des positions mesurées". Nouveau concurrent
  observé plusieurs fois sur les requêtes Haute-Savoie/Saint-Julien :
  **Kreaxion** (apparaît sur 3 des 7 requêtes) — à surveiller, pas
  d'action requise pour l'instant.
- Recherche du lundi (étape 5) faite avant de choisir le chantier :
  **FAQ rich results supprimés par Google depuis le 7 mai 2026** (le
  déroulant FAQ dans les résultats de recherche n'existe plus, quelle que
  soit la présence du JSON-LD `FAQPage`). Détail et implication pour ce
  site sous "Techniques apprises".

**Au 2026-09-10 :**

- Vérifié en production avant d'agir : les fixes canonical (09-08) et les 2
  pages villes (09-07, 09-09) tiennent toujours — `curl` sur les 2 pages
  villes et `/projets/tel-and-cash` renvoie title/description/canonical
  corrects. `sitemap.xml`, `llms.txt`, `robots.txt` conformes. Corps de
  page toujours vide dans le HTML brut sur toutes les routes (SPA sans
  SSR) — problème GEO de fond non résolu, inchangé depuis le 09-07.
- Nouvelle page de fond ajoutée aujourd'hui : `/combien-coute-un-site-internet`
  (prix, délais, inclus, landing vs sur-mesure, SEO). Voir "Chantiers
  faits" pour le détail.
- `npm run build` échouait avant tout (`vite: not found`) — `node_modules`
  absent au démarrage de cette session, comme le 09-09. `npm install` fait
  en début de run (dépendances de `package-lock.json` existant, rien
  changé côté versions). Se reproduit à chaque session sans état
  persistant — à ne plus noter comme un "problème", c'est structurel à cet
  environnement, juste refaire `npm install` avant tout `npm run build`.

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

### 2026-09-15 — Prerendering du contenu texte (corps de page) pour les crawlers sans JS

**Pourquoi ce chantier :** priorité n°2 de "Chantiers en attente" depuis le
09-07/09-08 — le problème GEO le plus fondamental du site, affectant TOUTES
les pages (home incluse) : le HTML brut servi à n'importe quel crawler
n'exécutant pas le JS (GPTBot, ClaudeBot, PerplexityBot, et la première
passe non-rendue de Googlebot) ne contenait qu'un `<div id="root"></div>`
vide, quel que soit le `<head>` correct par route déjà en place depuis le
09-08. Autrement dit : aucun de ces crawlers ne pouvait lire ni citer le
moindre mot du site. Ce chantier était resté bloqué 3 runs de suite (09-08,
09-09, 09-10) avec la même raison notée à chaque fois : "risque réel de
casser le build Vercel si Chromium/Playwright n'est pas disponible dans
l'environnement de build" — non vérifiable sans tenter un vrai déploiement.

**Ce qui a changé aujourd'hui :** au lieu d'un rendu par navigateur headless
(Playwright/Chromium), utilisation de `ReactDOMServer.renderToStaticMarkup`
— rendu React 100% en JavaScript pur, sans navigateur, sans aucune nouvelle
dépendance binaire. Le risque précédemment identifié (Chromium indisponible
au build Vercel) ne s'applique donc plus : `react-dom/server` fait partie de
`react-dom`, déjà une dépendance du projet. Vérifié explicitement avant
d'écrire le code : tous les composants de page (`CityPage`, `Home`,
`PricingGuidePage`, `ProjectPage`, `Footer`, `CalendlyEmbed`...) ne touchent
au DOM/`window`/`document` que dans des `useEffect` (animations GSAP,
titre/meta/JSON-LD, scripts tiers) — **jamais dans le corps du rendu** —
donc un rendu statique sans navigateur ne pouvait pas planter sur du code
qui suppose un DOM présent. Vérifié aussi que `main.jsx` utilise
`ReactDOM.createRoot(...).render()` (pas `hydrateRoot()`) : React remplace
simplement le HTML pré-rendu par le même rendu côté client au montage, sans
risque d'erreur d'hydratation React — le visiteur humain réel ne voit
aucune différence de comportement.

**Fait précisément :**
- `src/entry-server.jsx` (nouveau) : exporte `renderPage(path)`, qui rend
  `<App/>` (le même composant que le vrai site) dans un `<StaticRouter>`
  (au lieu du `<BrowserRouter>` de `main.jsx`) via
  `ReactDOMServer.renderToStaticMarkup`. Jamais importé par `main.jsx` —
  n'existe que pour le script de build, zéro impact sur le bundle client.
- `scripts/prerender-body.mjs` (nouveau), ajouté à la fin du script `build`
  de `package.json` (après `vite build` et `generate-static-heads.mjs`) :
  1. Construit un bundle SSR autonome (`vite build --ssr src/entry-server.jsx
     --outDir dist-server`) — testé, fonctionne proprement (le chargement
     "à chaud" de `react-router-dom` via `vite.ssrLoadModule` en dev
     échouait sur un conflit d'interop CJS/ESM propre à ce paquet en v7 ;
     un vrai build `--ssr` bundle tout correctement et évite le problème).
  2. Importe le bundle généré et appelle `renderPage()` pour chacune des 11
     routes connues (accueil, 3 pages villes, 4 pages projet, page prix, 2
     pages légales).
  3. Injecte le HTML obtenu dans le `<div id="root"></div>` (encore vide) du
     `dist/<route>/index.html` déjà généré par `generate-static-heads.mjs`
     (ou `dist/index.html` pour l'accueil).
  4. **Robustesse du build, testée explicitement** : toute erreur à
     n'importe quelle étape (build SSR, import du bundle, rendu d'une route
     précise) est catchée, loguée, et le script se termine avec un code de
     sortie 0 (succès) — jamais d'échec de `npm run build` à cause de ce
     chantier. Si une route précise plante, elle est simplement ignorée
     (body vide, exactement le comportement d'avant) pendant que les
     autres routes continuent d'être traitées normalement.
  5. Nettoie systématiquement `dist-server/` (dossier de build SSR
     intermédiaire, jamais servi) à la fin, succès ou échec.
- `.gitignore` : ajout de `dist-server` par précaution (le dossier
  s'autonettoie toujours en fin de script, mais au cas où un run futur
  interromprait le script au milieu).
- Aucune page, composant ou donnée modifiée : uniquement 2 nouveaux
  fichiers (script + entry SSR) et une ligne dans `package.json`
  (`scripts.build`).

**Contrôle qualité fait avant de pousser :**
- `npm run build` complet (après `npm install`, `node_modules` absent au
  démarrage de cette session comme systématiquement) : les 3 étapes
  (`vite build`, `generate-static-heads.mjs`, `prerender-body.mjs`)
  s'enchaînent sans erreur, les 11 routes rapportent un nombre de
  caractères HTML injectés cohérent (de ~12 000 pour les pages projet à
  ~87 000 pour l'accueil), `dist-server/` bien supprimé à la fin.
- `curl` sur `dist` servi en local (`serve dist`, sans JS) : le texte réel
  de la page (FAQ, prix, intro, footer) est maintenant présent dans le HTML
  brut sur les pages villes/prix/projet — vérifié explicitement en extrayant
  le texte du HTML brut sans exécuter de JS, confirmé pour Annecy ("Kota
  Studio a-t-il un bureau à Annecy ?" présent tel quel dans le `curl`).
- Playwright (Chromium préinstallé `/opt/pw-browsers/chromium`, technique
  déjà documentée les runs précédents), viewport mobile 390×844, sur les 6
  routes principales **y compris l'accueil** :
  - `waitUntil: networkidle` puis lecture du DOM : **0 erreur console**
    (`pageerror`/`console.error`) sur chacune des 6 routes.
  - `H1` correct sur chaque route après hydratation.
  - Nombre d'enfants de `#root` après hydratation cohérent (React a bien
    remonté proprement, pas de DOM dupliqué ni de crash silencieux).
  - Screenshots mobile de l'accueil et d'Annecy : mise en page crème/encre/
    or intacte, hero + slider avant/après + toutes les sections de l'accueil
    rendus normalement, rien de cassé visuellement.
- Script automatique (même pattern que le 09-10) : JSON-LD `FAQPage` de la
  page Annecy comparé mot pour mot au texte visible du DOM après
  hydratation — **0 écart**, ce chantier ne touchant ni la génération du
  JSON-LD (toujours injecté côté client uniquement, voir "Ce qui reste")
  ni le texte des FAQ.
- `git diff --stat` avant commit : uniquement les 2 nouveaux fichiers +
  `package.json` (1 ligne) + `.gitignore` (1 ligne). Aucune page, aucun
  composant, aucune donnée (`content.js`, `cities.js`) touchés — home et
  ses 9 sections, slider avant/après inclus, inchangés au sens strict du
  code (seul le mécanisme de build change, pas le JSX).

**Commit :** `7703663` — poussé sur `main`.

**Ce qui n'a pas été fait, et pourquoi :**
- Le JSON-LD (`Service`/`BreadcrumbList`/`FAQPage`/`ProfessionalService`)
  reste injecté **uniquement côté client** (`useEffect`), donc toujours
  invisible pour les crawlers sans JS malgré ce chantier — seul le texte
  visible (corps de page) est maintenant pré-rendu, pas les balises
  `<script type="application/ld+json">` ajoutées dynamiquement. Champ
  différent du "corps de page" ciblé aujourd'hui ; l'étendre aurait demandé
  de dupliquer ou refactorer la logique de construction du JSON-LD (répétée
  dans 4 composants de page) pour qu'elle soit calculable de façon pure et
  réutilisable côté serveur — plus risqué et hors scope du chantier du
  jour. Noté ci-dessous comme prochaine étape naturelle.

**Ce qui reste, et pourquoi :**
- **Prerendering du JSON-LD structuré** (voir ci-dessus) : logique
  actuellement dupliquée par page (`CityPage.jsx`, `PricingGuidePage.jsx`,
  `ProjectPage.jsx`) et couplée à `useEffect`/manipulation directe du DOM.
  Passe en tête des "Chantiers en attente" — impact GEO réel (Google et les
  crawlers IA qui lisent le JSON-LD sans exécuter le JS y gagneraient), mais
  demande un refactor plus large (extraire le calcul du JSON-LD en fonction
  pure par page, appelable à la fois côté client et dans
  `entry-server.jsx`) à faire avec soin sur un run dédié plutôt qu'ajouté à
  la hâte aujourd'hui.
- Pas de nouvelle page ville (Lyon) aujourd'hui : chantier technique
  choisi à la place pour respecter la règle d'alternance après la page
  Annemasse du 09-14. Lyon reste en tête de la liste des pages villes.

---

### 2026-09-14 — Troisième page ville : "Agence web à Annemasse"

**Pourquoi ce chantier :** priorité n°1 de la liste "Chantiers en attente"
laissée le 09-10 (Annemasse était en tête, avec l'angle explicitement noté
"agence web Annemasse"). Continue le pattern d'alternance observé sur les 4
runs précédents (ville → technique → ville → fond) en revenant sur une page
ville. Recherche du lundi (étape 5, voir "Techniques apprises") faite avant
de choisir : rien trouvé qui remette en cause l'approche pages-villes en
cours (le principal changement trouvé — dépréciation des FAQ rich results
Google — ne change rien à la stratégie GEO/JSON-LD déjà appliquée, voir
détail plus bas).

**Point d'attention traité explicitement (même règle anti-doorway-page que
pour Annecy le 09-09) :** Kota Studio n'a pas de bureau à Annemasse non
plus. La FAQ #1 pose la question directement et répond honnêtement (pas de
bureau, ~30 min de route de Saint-Julien-en-Genevois, suivi visio +
présentiel possible). Contenu non dupliqué depuis les 2 pages existantes :
angle de la page recentré sur "agence web" (et non "création de site
internet") pour matcher la requête réelle différente, et la 5e FAQ
(clientèle transfrontalière France/Suisse) est propre à Annemasse — sujet
absent des pages Saint-Julien et Annecy, pertinent ici car Annemasse est
la principale ville française frontalière avec Genève côté est.

**Fait précisément :**
- `src/data/cities.js` : nouvelle entrée `agence-web-annemasse` (5 FAQ,
  intro et meta title/description propres à Annemasse, angle "agence web").
  Réutilise le gabarit `CityPage.jsx` existant — route `/:citySlug`
  automatique, aucune modification de composant nécessaire. Prix/délai/
  inclus toujours importés de `content.js` (`offer`, `process`), jamais
  dupliqués en dur. Nouveau champ optionnel `crossLinkLabel` ajouté sur les
  entrées villes (defaulté à "Création de site internet à {cityName}" côté
  `PricingGuidePage.jsx` si absent) pour que le maillage interne affiche le
  bon intitulé ("Agence web à Annemasse") plutôt qu'un texte générique qui
  ne correspondrait pas au vrai H1 de la page.
- `src/pages/PricingGuidePage.jsx` : une ligne modifiée pour lire ce nouveau
  champ (`city.crossLinkLabel || ...`), rétrocompatible avec les 2 entrées
  existantes qui n'ont pas ce champ.
- `src/data/content.js` : lien "Agence web à Annemasse" ajouté dans le
  footer, colonne "Services" (même colonne que les 2 pages villes
  existantes et le guide prix).
- `public/sitemap.xml` et `public/llms.txt` : nouvelle page ajoutée, avec
  mention explicite de l'absence de bureau à Annemasse dans `llms.txt`
  (cohérence GEO, même pratique que pour Annecy).
- `scripts/generate-static-heads.mjs` : aucune modification nécessaire, il
  boucle déjà sur `cities.js` (confirmé dans les logs de build : le nouveau
  head statique `/agence-web-annemasse` est généré automatiquement).

**Contrôle qualité fait avant de pousser :**
- `npm install` (node_modules absent au démarrage de cette session, comme
  à chaque run précédent — comportement structurel de l'environnement, pas
  un problème) puis `npm run build` : OK, le nouveau head statique généré
  et listé dans les logs de build.
- Script Playwright (Chromium préinstallé `/opt/pw-browsers/chromium`,
  symlink local du module `playwright`, technique documentée le 09-10)
  contre `serve dist` en local, viewport mobile 390×844 :
  - Comparaison programmatique JSON-LD `FAQPage` vs texte visible du DOM :
    **0 écart** sur les 5 questions/réponses.
  - `Service.areaServed` correct (`Annemasse`), `BreadcrumbList` à 2
    niveaux correct.
  - Lien croisé vers le guide prix présent sur la page Annemasse ; sur la
    page guide prix, le nouveau `crossLinkLabel` s'affiche bien ("Agence
    web à Annemasse →") au lieu du texte générique.
  - Navigation SPA testée par clic programmatique depuis le guide prix vers
    `/agence-web-annemasse` : URL et H1 corrects après clic, pas de
    rechargement complet.
  - Screenshot pleine page après scroll par paliers (déclenchement des
    animations `.reveal`) : mise en page crème/encre/or intacte, tableau
    prix/inclus/options, étapes du process, FAQ transfrontalière et footer
    (avec le nouveau lien) tous rendus correctement sur mobile.
  - Erreurs console observées : uniquement des `ERR_CONNECTION_RESET` sur
    ressources externes (fonts, Iconify — blocage réseau du bac à sable,
    déjà noté les runs précédents) et un 404 sur `/vite.svg` (favicon par
    défaut Vite, présent sur **toutes** les pages du site avant ce run,
    vérifié — pas une régression de ce chantier, hors scope aujourd'hui).
- `git diff --stat` avant commit : seuls les 5 fichiers attendus modifiés
  (`cities.js`, `content.js`, `PricingGuidePage.jsx`, `sitemap.xml`,
  `llms.txt`). Aucune section de la home, aucun composant partagé
  (`CityPage.jsx`, `App.jsx`) touché.
- Après déploiement sur `main` (push direct), revérifié en production avec
  `curl` : title/description/canonical corrects sur `/agence-web-annemasse`,
  `sitemap.xml` et `llms.txt` à jour, page d'accueil inchangée (title
  identique à avant).

**Commit :** `7bf15d8` — poussé sur `main`, déployé et vérifié en prod.

**Ce qui n'a pas été fait, et pourquoi :**
- Pas de nettoyage du 404 `/vite.svg` : hors scope du chantier du jour
  (pré-existant sur tout le site, pas lié aux pages villes), et modifier
  `index.html`/favicon n'était pas le chantier choisi — à considérer un
  jour dédié si jugé prioritaire (impact SEO/GEO probablement nul, plutôt
  un détail de propreté technique).

**Ce qui reste, et pourquoi :**
- Pas de 4e page ville (Lyon, Genève, Haute-Savoie) : une page ville
  vérifiée correctement vaut mieux qu'enchaîner, pattern déjà établi les
  runs précédents. Lyon passe en tête de la liste "Chantiers en attente".
- Prerendering du corps de page pour les crawlers IA : toujours en
  attente, inchangé depuis le 09-08.

---

### 2026-09-10 — Page de fond "Combien coûte un site internet ?" (prix/délais/inclus)

**Pourquoi ce chantier :** liste "Chantiers en attente" laissée le 09-09, item 3.
Les 3 derniers chantiers étaient soit techniques (canonical) soit des pages
villes (Saint-Julien, Annecy) — même angle deux jours de suite. Pour alterner
comme demandé, ce run traite un contenu de fond informationnel plutôt qu'une
3e page ville. Autre raison : les pages villes ciblent des requêtes locales
("création site internet + ville"), mais une partie du volume (et des
questions posées à ChatGPT/Perplexity) porte sur le prix et le délai en
général, sans mention de ville — non couvert avant ce run (seulement présent
en résumé sur la home, section Offre, sans page dédiée ni JSON-LD FAQ/HowTo).

**Mesuré avant d'agir (étape 2) :** `curl` en prod sur les 2 pages villes et
`/projets/tel-and-cash` : canonical/title/description corrects (le fix du
09-08 tient toujours). Corps de page toujours vide dans le HTML brut
(`<div id="root"></div>` seul) — le problème GEO de fond (item 2 des
"Chantiers en attente") n'est pas résolu, inchangé. Recherche web sur les 7
requêtes cibles : kotastudio.fr absent partout, sans surprise (3 jours
depuis la page Saint-Julien, 1 jour depuis Annecy — délai d'indexation
Google de plusieurs semaines encore loin d'être écoulé). Marché confirmé
occupé sur chaque requête (mêmes agences que le 09-09 pour Annecy, plus
Beaucoup/Digital Unicorn/Alteo pour Lyon, Mont-Site/Alpaweb pour Haute-Savoie,
Fast Digital/Pixelium pour Genève).

**Fait précisément :**
- `src/pages/PricingGuidePage.jsx` (nouveau) : page statique (pas de
  paramètre d'URL, contrairement à `CityPage`/`ProjectPage`), route fixe
  `/combien-coute-un-site-internet` dans `App.jsx`. Même pattern de tête SEO
  que `CityPage.jsx` (title/description/canonical mis à jour en `useEffect`,
  restaurés au démontage).
- 5 questions/réponses format GEO (réponse directe 2-3 phrases en tête de
  chaque H2) : combien ça coûte, combien de temps, ce qui est inclus,
  landing page vs sur-mesure, le prix inclut-il le SEO. **Aucun chiffre
  inventé** : tout est importé de `content.js` (`offer.plans`, `offer.extras`,
  `offer.included`, `process.steps`, `whatWeDo.cards`, `promises.items[3]`
  — la promesse SEO exacte, mot pour mot, pas reformulée).
- JSON-LD `BreadcrumbList` + `FAQPage` + **`HowTo`** (nouveau type, pas
  encore utilisé sur le site — les 6 étapes du process, contenu procédural
  comme demandé à l'étape 4). Le `FAQPage` reprend mot pour mot le texte
  affiché (vérifié automatiquement, voir contrôle qualité).
- Maillage interne à double sens : bloc "Vous cherchez une agence près de
  chez vous ?" en bas du guide avec liens vers les 2 pages villes existantes
  (généré depuis `cities.js`, pas en dur — s'étend automatiquement aux
  prochaines villes) ; bloc "Envie de comparer avant d'appeler ?" ajouté sur
  `CityPage.jsx` (donc sur Saint-Julien ET Annecy) vers ce nouveau guide ;
  lien "Combien coûte un site ?" ajouté dans `footer.columns` (colonne
  Services, `content.js`).
- `public/sitemap.xml`, `public/llms.txt`, `scripts/generate-static-heads.mjs`
  mis à jour pour la nouvelle route (même mécanisme que les pages villes,
  aucune modification du script nécessaire au-delà d'un `writeRoute()` de
  plus).

**Ce qui n'a pas été fait, et pourquoi (décidé pour rester dans la règle
"ne rien inventer") :** pas de section "coût de la maintenance" ni "coût du
pack SEO" sur cette page, alors que la structure s'y prêtait bien (le sujet
est directement lié aux prix). Ces montants n'existent nulle part dans
`content.js` ni ailleurs sur le site — les inventer aurait été le genre
exact d'erreur que la règle interdit. Noté sous "Hypothèses à vérifier"
pour que Yanis fournisse ces chiffres ; la page pourra être complétée avec
une 6e question dès qu'ils existent, sans changement de structure.

**Contrôle qualité fait avant de pousser :**
- `npm run build` : OK (après `npm install`, `node_modules` absent au
  démarrage de cette session comme le 09-09), le nouveau `<head>` statique
  `/combien-coute-un-site-internet` généré dans les logs de build.
- Testé avec Playwright (Chromium préinstallé de cette session, pas de
  problème réseau cette fois contrairement au 09-08) contre `serve dist`
  en local, viewport mobile 390×844 (priorité TikTok) :
  - Script de vérification automatique : les 5 réponses visibles dans le
    DOM comparées programmatiquement au texte du JSON-LD `FAQPage` —
    **0 écart**. Les 6 `HowToStep` correspondent aux 6 étapes de
    `process.steps`. Aucune erreur console/page.
  - Screenshot pleine page après scroll par paliers (pour déclencher les
    animations ScrollTrigger `.reveal`) : mise en page crème/encre/or
    intacte, tableau prix, options, étapes du process, comparatif landing
    vs sur-mesure et bloc SEO tous rendus correctement.
  - Sur les pages villes (Saint-Julien testée en screenshot, Annecy par
    lecture de code identique) : le nouveau bloc de maillage interne
    s'affiche correctement sans rien décaler ; clic sur le lien vérifié
    par script → navigation SPA propre vers `/combien-coute-un-site-internet`
    (pas de rechargement complet, `H1` correct après clic).
- Après déploiement sur `main` (push direct, pratique établie confirmée par
  le journal du 09-08), revérifié en production avec `curl` : title/
  description/canonical corrects sur `/combien-coute-un-site-internet`,
  `sitemap.xml` et `llms.txt` à jour, page d'accueil inchangée.
- Home.jsx et tous les composants des 9 sections de la home (`Offer.jsx`
  inclus, où j'ai été tenté d'ajouter un lien vers ce guide) **non
  modifiés** : vérifié avec `git diff --stat` avant de commit, seuls
  `CityPage.jsx`, `App.jsx`, `content.js` (footer), `PricingGuidePage.jsx`
  (nouveau), `sitemap.xml`, `llms.txt`, `generate-static-heads.mjs`
  apparaissent dans le diff.

**Commit :** `7e81d46` — poussé sur `main`, déployé et vérifié en prod.

**Ce qui reste, et pourquoi :**
- Pas de 3e page ville (Annemasse) : reste en tête de la liste "Chantiers en
  attente" pour demain — le chantier de fond était la priorité du jour pour
  alterner l'angle.
- Pas de prerendering du contenu (corps de page) pour les crawlers IA :
  toujours en attente, priorité 2, inchangé.
- La page ne mentionne pas le coût de la maintenance ni du pack SEO (voir
  ci-dessus, "Hypothèses à vérifier").

---

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
   2026-09-09, Annemasse faite le 2026-09-14** (voir "Chantiers faits") :
   - Lyon → angle "agence web Lyon"
   - Genève → angle "freelance création site internet Genève" (ton freelance/
     indépendant, pas agence — la requête réelle est différente)
   - Haute-Savoie (page régionale, pas une ville) → angle "création site
     vitrine Haute-Savoie" / "refonte site internet Haute-Savoie" (deux
     intentions différentes : création vs refonte — possiblement 2 pages,
     à trancher un de ces jours selon le volume constaté)
2. ~~Prerendering du CONTENU (corps de page)~~ — **fait le 2026-09-15**
   (voir "Chantiers faits") : `scripts/prerender-body.mjs` +
   `src/entry-server.jsx`, `ReactDOMServer.renderToStaticMarkup` sans
   Chromium/Playwright. **Reste ouvert, en tête de liste** :
   prerendering du **JSON-LD structuré** (`Service`/`BreadcrumbList`/
   `FAQPage`/`ProfessionalService`), toujours injecté uniquement côté
   client (`useEffect`) donc toujours invisible pour les crawlers sans JS
   — voir "Ce qui reste" du 09-15 pour le détail technique (nécessite un
   refactor de la logique JSON-LD en fonctions pures réutilisables côté
   serveur).
3. ~~Contenu de fond "combien coûte un site / combien de temps / ce qui est
   inclus" en page dédiée~~ — **fait le 2026-09-10** (voir "Chantiers
   faits") : page `/combien-coute-un-site-internet`.
4. Remplir les 4 pages projet (`Le défi / Notre approche / Le résultat / La
   recette Kota`, actuellement "Bientôt disponible") — bloqué sur du
   contenu que seul Yanis peut fournir (voir Hypothèses à vérifier).
5. Rubrique témoignages (actuellement placeholders "Nom du client, Activité,
   ville") — bloqué sur de vrais avis clients.
6. Ajouter une 6e question "coût de la maintenance / du pack SEO" sur la
   page `/combien-coute-un-site-internet` dès que Yanis fournit ces
   montants (voir "Hypothèses à vérifier") — la page est structurée pour
   accueillir cet ajout sans refonte.

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
- **Coût de la maintenance mensuelle et du pack SEO** (2026-09-10) :
  `content.js > offer.extras` liste "Maintenance mensuelle" et "SEO avancé"
  avec le prix "sur devis" pour les deux — jamais un montant réel. La
  nouvelle page `/combien-coute-un-site-internet` répond à "le prix
  inclut-il le SEO ?" mais ne peut pas donner de montant. Dès que Yanis
  fournit un prix (ou une fourchette) pour ces deux options, une 6e
  question peut être ajoutée à cette page sans changer sa structure.

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
ChatGPT / Perplexity)_

- **2026-09-14 (recherche du lundi)** — **Google a supprimé les FAQ rich
  results (le déroulant FAQ dans les résultats de recherche) le 7 mai
  2026**, confirmé par plusieurs sources sérieuses et concordantes
  (Search Engine Land, Search Engine Journal, et la documentation
  officielle Google Search Central qui porte maintenant un bandeau de
  dépréciation sur la page `FAQPage`). Le support dans Search Console et
  le Rich Results Test s'arrête en juin 2026, l'API Search Console en août
  2026. **Point important, vérifié explicitement** : le type `FAQPage`
  reste valide au sens schema.org, Google dit explicitement qu'il n'y a
  aucun problème à laisser le balisage en place, et la documentation
  technique complète reste publiée — seul l'affichage SERP disparaît.
  Implication concrète pour ce site : le JSON-LD `FAQPage` déjà posé sur
  les 3 pages villes et la page prix ne produira plus jamais de snippet
  enrichi dans Google Search (objectif qu'on visait en partie à l'origine,
  09-07/09-09), mais reste pertinent pour l'objectif GEO (extraction de
  passages par les LLM/AI Overviews, sujet distinct de l'affichage SERP
  classique) — **aucun changement de pratique nécessaire**, continuer à
  poser du `FAQPage` correspondant mot pour mot au contenu visible, mais
  ne plus le présenter comme un levier de rich snippet Google dans les
  futurs comptes-rendus. Rappel utile trouvé au passage (déjà su, pas
  nouveau) : les rich results `HowTo` étaient déjà réduits/supprimés par
  Google depuis 2023 — le `HowTo` posé sur la page prix le 09-10 n'a donc
  jamais eu vocation à produire un rich snippet, seulement à servir le
  volet GEO, ce qui reste valable.
  Sources : [Google to no longer support FAQ rich results](https://searchengineland.com/google-to-no-longer-support-faq-rich-results-476957),
  [Google Drops FAQ Rich Results From Search](https://www.searchenginejournal.com/google-drops-faq-rich-results-from-search/574429/),
  page officielle [Mark Up FAQs with Structured Data](https://developers.google.com/search/docs/appearance/structured-data/faqpage) (bandeau de dépréciation daté).
- **Mise en garde méthodologique (2026-09-14)** : une partie des résultats
  de recherche du lundi sur "comment ChatGPT/Perplexity choisissent leurs
  sources" provient de blogs SEO avec des statistiques très précises mais
  invérifiables (ex. "score de 8.5/10 en complétude sémantique = 4.2x plus
  de citations", "corrélation r=0.18 avec l'autorité de domaine") — ce
  sont très probablement des chiffres inventés ou extrapolés par un LLM
  pour ces articles eux-mêmes, pas des études sourcées. **Non retenu** dans
  ce journal, conformément à la consigne "sources sérieuses uniquement, pas
  des blogs de contenu recyclé". Seul le point vérifiable par une source
  officielle (dépréciation FAQ Google, ci-dessus) a été gardé. Pour les
  prochains lundis : privilégier les recherches croisées avec la
  documentation officielle (`developers.google.com/search`) ou des médias
  spécialisés reconnus (Search Engine Land/Journal) plutôt que des guides
  "2026" génériques dont le titre contient déjà l'année en cours (signal
  fréquent de contenu produit en masse).

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
- **2026-09-10** — Automatiser le contrôle "FAQPage JSON-LD == texte
  visible" plutôt que de le vérifier à l'œil : un petit script Playwright
  qui extrait le texte du DOM après chaque `<h2>` et le compare
  programmatiquement à `mainEntity[].acceptedAnswer.text` du JSON-LD rend
  le contrôle qualité de l'étape 6 fiable et rapide (quelques secondes),
  au lieu d'une relecture manuelle sujette à erreur. À réutiliser
  systématiquement pour toute future page avec `FAQPage`/`HowTo`.
- **2026-09-10** — Playwright n'est pas dans les dépendances du projet
  (`package.json`), seulement préinstallé globalement dans certains
  environnements de session (`/opt/pw-browsers` + le paquet npm global).
  Pour l'utiliser en script de test ponctuel (jamais commité), pointer
  `executablePath: '/opt/pw-browsers/chromium'` et, si `import "playwright"`
  échoue en ESM malgré `NODE_PATH`, créer un `node_modules/playwright`
  symlink vers le paquet global dans le dossier du script — plus simple et
  plus fiable que de dépendre de `NODE_PATH` avec les imports ESM.

---

- **2026-09-15** — Sur une SPA React (Vite) sans SSR, il n'est pas
  nécessaire de dépendre de Playwright/Chromium pour prérendre le CONTENU
  texte d'une page (pas seulement le `<head>`) : `ReactDOMServer.
  renderToStaticMarkup()` (partie de `react-dom`, déjà une dépendance
  standard) suffit tant que les composants ne touchent au DOM que dans des
  `useEffect` — ce qui est le cas ici pour toutes les pages (vérifié
  composant par composant avant d'écrire le code, voir "Chantiers faits"
  09-15). Condition supplémentaire qui rend ce remplacement sûr sans
  aucun changement de comportement pour le vrai visiteur : le point de
  montage client doit utiliser `createRoot().render()` (remplacement
  inconditionnel du DOM) et non `hydrateRoot()` (qui exigerait une
  correspondance exacte serveur/client, source d'erreurs). À retenir pour
  tout futur site SPA similaire : le vrai blocage à un prerendering léger
  n'est presque jamais "il faut un navigateur", c'est souvent une fausse
  piste — d'abord vérifier si un simple rendu `ReactDOMServer` suffit.
- **2026-09-15** — Piège technique rencontré et contourné : `vite.
  ssrLoadModule()` (le mode "SSR à chaud" habituellement utilisé pour du
  prerendering léger en un seul script, sans étape de build séparée) plante
  sur ce projet à cause d'un conflit d'interop CommonJS/ESM propre à
  `react-router-dom` v7 (son point d'entrée `node` résout vers un fichier
  CJS que le pipeline de transformation "à chaud" de Vite n'arrive pas à
  charger proprement, avec ou sans `ssr.noExternal`). Contournement fiable :
  faire un vrai build SSR isolé (`vite build --ssr src/entry-server.jsx
  --outDir <dossier>`) puis importer le fichier `.js` déjà bundlé avec un
  `import()` Node classique — le bundling Rollup gère l'interop CJS/ESM
  correctement là où le chargement à chaud échoue. Génère un dossier de
  build intermédiaire à nettoyer après usage (`dist-server/`, jamais servi
  ni commité). À réutiliser si un futur run a besoin d'un rendu React côté
  serveur ponctuel sur ce projet, plutôt que de retenter `ssrLoadModule`.

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

### 2026-09-10

| Requête | Position kotastudio.fr |
|---|---|
| création site internet Saint-Julien-en-Genevois | absent |
| agence web Annemasse | absent |
| création site internet Annecy | absent |
| agence web Lyon | absent |
| création site vitrine Haute-Savoie | absent |
| freelance création site internet Genève | absent |
| refonte site internet Haute-Savoie | absent |

Toujours absent partout, attendu (3 jours depuis Saint-Julien, 1 jour
depuis Annecy — toujours largement sous le délai d'indexation de plusieurs
semaines). Ce run n'a pas ajouté de nouvelle page ville, donc pas de
changement attendu sur ces 7 requêtes précises avant le prochain relevé.
Le contenu ajouté aujourd'hui (page prix/délais) cible des requêtes
informationnelles différentes, non suivies dans ce tableau — à surveiller
séparément une fois indexé (ex. "combien coûte un site internet",
"combien coûte un site vitrine"). Premier relevé qui comptera vraiment
pour le tableau ci-dessus : toujours dans plusieurs semaines.

### 2026-09-14

| Requête | Position kotastudio.fr |
|---|---|
| création site internet Saint-Julien-en-Genevois | absent |
| agence web Annemasse | absent |
| création site internet Annecy | absent |
| agence web Lyon | absent |
| création site vitrine Haute-Savoie | absent |
| freelance création site internet Genève | absent |
| refonte site internet Haute-Savoie | absent |
| combien coûte un site internet (informationnelle, page du 09-10) | absent |
| combien coûte un site vitrine (informationnelle, page du 09-10) | absent |

Toujours absent partout — attendu, aucun run entre le 09-10 et aujourd'hui
(4 jours d'écart), et 7 jours depuis Saint-Julien / 5 depuis Annecy / 4
depuis la page prix restent sous le délai d'indexation Google de plusieurs
semaines évoqué depuis le premier relevé. Mesure faite via l'outil de
recherche web de cette session (résultats non garantis géolocalisés
France/Haute-Savoie et limités à ~5-8 liens par requête, pas un vrai
rank-tracker) — traiter comme un signal de visibilité approximatif, pas
une position exacte. Concurrents récurrents observés sur les requêtes
Haute-Savoie/Saint-Julien : **Kreaxion** (3 requêtes sur 7), PappleWeb (2),
Boondooa (2), PagesJaunes (2) — première fois que Kreaxion apparaît dans
ce suivi, à garder à l'œil. Sur les 2 requêtes informationnelles liées à
la page prix, la première page est dominée par de gros sites de contenu
(Wix, plateformes) et d'autres guides d'agences, pas d'annuaires locaux —
cohérent avec le caractère national/générique de ces requêtes. Premier
relevé qui comptera vraiment sur les 7 requêtes locales : toujours dans
plusieurs semaines à partir des dates de mise en ligne de chaque page.

---

### 2026-09-15

| Requête | Position kotastudio.fr |
|---|---|
| création site internet Saint-Julien-en-Genevois | absent |
| agence web Annemasse | absent |
| création site internet Annecy | absent |
| agence web Lyon | absent |
| création site vitrine Haute-Savoie | absent |
| freelance création site internet Genève | absent |
| refonte site internet Haute-Savoie | absent |
| combien coûte un site internet (informationnelle) | absent |
| combien coûte un site vitrine (informationnelle) | absent |

Toujours absent partout — attendu, un seul jour depuis le dernier relevé
(09-14) et aucune nouvelle page ville ajoutée aujourd'hui (chantier du jour :
technique, prerendering du corps de page, voir "Chantiers faits"). Kreaxion
toujours présent sur plusieurs requêtes Haute-Savoie/Genevois (Saint-Julien,
vitrine Haute-Savoie, refonte Haute-Savoie), cohérent avec le 09-14, rien de
nouveau à signaler côté concurrence. Premier relevé qui comptera vraiment sur
les 7 requêtes locales : toujours dans plusieurs semaines à partir des dates
de mise en ligne de chaque page (la plus récente, Annemasse, date du 09-14).

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
6. Coût de la maintenance mensuelle et du pack SEO avancé (actuellement
   "sur devis" dans `content.js > offer.extras`) — permettrait de compléter
   la page `/combien-coute-un-site-internet` avec une réponse chiffrée.
