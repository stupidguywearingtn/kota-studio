# SEO-JOURNAL.md — Kota Studio (kotastudio.fr)

Ce fichier est la SEULE mémoire du run SEO/GEO quotidien automatisé. Chaque run
commence par le lire en entier avant d'agir. Ne jamais refaire un chantier déjà
listé ici comme fait.

---

## État des lieux

_(mis à jour à chaque run — reflète l'état réel constaté, pas des suppositions)_

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

## Chantiers en attente

Par ordre de priorité pour les prochains runs :

1. **Pages villes suivantes** (gabarit déjà prêt dans `cities.js` +
   `CityPage.jsx`) — un jour = une ville, angle de requête différent à
   respecter (ne pas copier-coller le même texte) :
   - Annecy → angle "création site internet Annecy"
   - Annemasse → angle "agence web Annemasse"
   - Lyon → angle "agence web Lyon"
   - Genève → angle "freelance création site internet Genève" (ton freelance/
     indépendant, pas agence — la requête réelle est différente)
   - Haute-Savoie (page régionale, pas une ville) → angle "création site
     vitrine Haute-Savoie" / "refonte site internet Haute-Savoie" (deux
     intentions différentes : création vs refonte — possiblement 2 pages,
     à trancher un de ces jours selon le volume constaté)
2. **Prerendering / SSR partiel** pour résoudre le problème GEO de fond
   (SPA sans contenu dans le HTML brut). Piste envisagée : script de
   prerendering post-build (Playwright/Puppeteer) qui génère un
   `dist/<route>/index.html` statique par route, servi en priorité par
   Vercel (les fichiers statiques du dossier de sortie passent avant les
   `rewrites` de `vercel.json`) pendant que les vrais visiteurs continuent
   à charger la SPA normalement. **Non fait aujourd'hui** : risque réel de
   casser le déploiement Vercel si Chromium/Playwright n'est pas disponible
   dans l'environnement de build Vercel (contrairement à cet environnement
   de dev qui l'a préinstallé) — impossible à vérifier sans tester un vrai
   déploiement. À ne tenter qu'après validation par Yanis, ou en testant
   d'abord sur une preview branch Vercel avant `main`.
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

_(vide pour l'instant — premier run avec ce journal)_

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
