# SEO-JOURNAL.md — Kota Studio (kotastudio.fr)

Mémoire du run quotidien de maintenance SEO/GEO. Lire cette page en entier avant
toute action. Ne jamais refaire un chantier déjà listé ici comme fait.

---

## État des lieux

_Dernière mise à jour : 2026-09-07_

- Site React/Vite/GSAP, SPA sans SSR, déployé sur Vercel via GitHub. Un seul
  domaine `kotastudio.fr`, une seule vraie page de contenu avant ce run :
  l'accueil (9 sections figées) + 4 pages projet (`/projets/[slug]`, contenu
  encore en grande partie "Bientôt disponible") + 2 pages légales (placeholders
  non remplis : adresse, SIRET, etc.).
- Fondations SEO déjà en place avant ce run (commits antérieurs, non refaites) :
  robots.txt, sitemap.xml, llms.txt, meta OG/Twitter, JSON-LD ProfessionalService
  sur l'accueil, titres par page projet.
- Aucune page ne ciblait une requête commerciale locale ("création site internet
  + ville"). Aucune adresse/NAP visible nulle part sur le site (mentions légales
  encore en placeholder `[Adresse complète du siège]`).
- Fiche Google Business Profile mentionnée par Yanis (Kota Studio, Concepteur de
  sites Web, Saint-Julien-en-Genevois) — non vérifiable par recherche web ce
  jour (aucun résultat Google retourné pour "Kota Studio Saint-Julien-en-
  Genevois avis google" au moment du run, voir "Hypothèses à vérifier").

## Chantiers faits

### 2026-09-07 — Page locale "création site internet Saint-Julien-en-Genevois" (premier run)

**Mesure avant action (Étape 2)** — recherche Google (sans nom de marque) sur
les 7 requêtes cibles du brief :
- "création site internet Saint-Julien-en-Genevois" → Kota Studio absent des
  résultats retournés (Pagesjaunes, Abc Idea, Netivia, Leta Communication,
  Kreaxion, PappleWeb, Expressweb France en tête).
- "agence web Annemasse création site internet" → absent (Net Concept,
  Boondooa, Sortlist, Les Créavores, agence-web-annemasse.fr, Amadouh...).
- "création site internet Annecy agence" → absent (Boondooa, D2b Consulting,
  Wecomeback, Annecy Web, ConvertiLab...).
- "agence web Lyon création site vitrine sur-mesure" → absent (33 Degrés,
  Point-Web, Création Site Lyon, Web-Konseil, Les Globules...).
- "création site vitrine Haute-Savoie" → absent (Mont-Site, Kreaxion,
  Dieup'art, Alpaweb, Anonyme-Studio...).
- "freelance création site internet Genève" → absent (FastDigital, Pixelium,
  Amadouh, Jordan Armesto, Wecode...).
- "refonte site internet Haute-Savoie agence" → absent (SJ4WEB, Altimax,
  Alpaweb, Digicimes...).

Conclusion : le site est invisible sur les 7 requêtes, sans exception. Sur un
site mono-page sans contenu local, c'est cohérent — il n'y avait tout
simplement rien à faire remonter.

**Chantier choisi** : créer la première page locale, ciblant la ville du siège
du studio (Saint-Julien-en-Genevois) — la plus défendable (correspond
exactement à la fiche GBP existante), avant d'étendre aux autres villes
(Annemasse, Annecy, Genève, Lyon) les prochains jours. Angle choisi pour ce
run : "créer une page qui cible une requête réelle non couverte" (item 1 de
l'étape 3), en intégrant directement le volet GEO (étape 4) dès la création
plutôt qu'en repasse.

**Fait précisément** :
- Nouvelle route `/creation-site-internet-saint-julien-en-genevois`
  (`src/pages/CreationSiteInternetSaintJulien.jsx`), contenu centralisé dans
  `src/data/content.js` (export `localSeo`).
- Structure GEO : chaque H2 est une vraie question ("Combien coûte...",
  "Combien de temps...", "Pourquoi une agence basée à...", "Comment se
  déroule...") avec une réponse autonome de 2-3 phrases en tête, développement
  après — conforme à la doc trouvée ce jour (voir Techniques apprises).
- FAQ visible (5 questions) strictement identique au JSON-LD `FAQPage` associé
  (vérifié programmatiquement après build, voir ci-dessous).
- JSON-LD ajouté sur cette page : `BreadcrumbList`, `Service` (avec `provider`,
  `areaServed` multi-villes, `offers` 790€/1290€), `FAQPage`.
- JSON-LD `ProfessionalService` de l'accueil (`index.html`) enrichi : `address`
  (ville/CP/région — 74160 est le code postal public de Saint-Julien-en-
  Genevois, pas une donnée inventée ; pas de rue, inconnue), `areaServed`
  passé de `"FR"` à une liste de villes réelles (St-Julien, Annemasse, Annecy,
  Genève, Lyon, Haute-Savoie), `priceRange`.
- "Dernière mise à jour : 7 septembre 2026" visible sur la nouvelle page.
- Maillage interne : lien "Zone d'intervention" ajouté dans la colonne
  Navigation du footer (présent sur toutes les pages) → pointe vers la
  nouvelle page.
- `sitemap.xml` et `llms.txt` mis à jour avec la nouvelle URL.
- Aucune donnée inventée : prix (790€/1290€), délais (14 jours), inclus et
  étapes du process sont repris texto de `offer` et `process` déjà publiés sur
  l'accueil (pas de nouveau chiffre créé pour l'occasion).

**Contrôle qualité avant push (Étape 6)** :
- Build (`npm run build`) OK, aucune erreur.
- Vérifié en Playwright (Chromium headless, scroll réel pour déclencher les
  reveals GSAP/ScrollTrigger — un premier test sans scroll donnait une page
  vide en dessous du fold, faux négatif de méthode, pas un bug du site) :
  rendu correct en 390px (mobile) et 1440px (desktop), aucune erreur console
  liée au code (seulement des `ERR_CONNECTION_RESET` sur les CDN externes
  Google Fonts/Iconify, bloqués par le sandbox réseau de cet environnement —
  sans rapport avec le code, à revérifier une fois en ligne).
- Repéré et corrigé avant push : les 6 étapes du process s'affichaient deux
  fois (section "délai" + section "process" avaient toutes les deux la liste
  complète) → contenu redondant, sans valeur ajoutée. Corrigé : la section
  "délai" ne garde que la réponse courte, la liste complète des 6 étapes reste
  uniquement dans la section "process".
- JSON-LD `FAQPage` vérifié programmatiquement identique au texte visible
  (extrait du DOM rendu après build, comparé question par question).
- Navigation SPA testée (clic "Accueil" depuis la nouvelle page) : title, meta
  description, canonical et JSON-LD de page reviennent bien à l'état accueil
  (pas de pollution SEO si l'utilisateur navigue en interne).
- N'a pas touché aux 9 sections validées de l'accueil ni au slider
  avant/après du hero.

**Pas fait, volontairement** :
- Pages Annemasse / Annecy / Genève / Lyon : remises à des runs suivants (un
  chantier par jour mené à fond > cinq pages bâclées).
- Pas d'ajout d'adresse complète (rue) nulle part sur le site : donnée
  inconnue, non inventée (voir Hypothèses à vérifier).
- Pas de remplissage des pages projet (`Bientôt disponible`) : nécessite du
  contenu réel de Yanis (défi/approche/résultat par projet), pas un chantier
  SEO autonome.
- Pas de contenu de fond type "combien coûte un site" en page dédiée séparée :
  ce contenu existe déjà dans la nouvelle page locale (section prix) ; une
  page generique séparée ferait doublon tant qu'elle ne cible pas une requête
  distincte. À reconsidérer plus tard si une requête informationnelle dédiée
  ("combien coûte un site internet" sans ville) mérite sa propre page.

## Note technique — branche de push

Cette session Claude Code est configurée pour pousser sur la branche
`claude/cool-johnson-bec7y6` (politique de la session, pas une consigne du
brief) plutôt que directement sur `main`. Le commit de ce jour est donc sur
cette branche, à fusionner sur `main` pour être réellement en ligne sur
kotastudio.fr. Si un run futur constate que `main` n'a pas reçu ce commit,
c'est pour cette raison — vérifier si la fusion a eu lieu avant de considérer
le chantier comme "en ligne".

## Chantiers en attente

- Pages locales pour Annemasse, Annecy, Genève, Lyon (même gabarit que
  Saint-Julien, contenu et FAQ adaptés à chaque ville — pas de copier-coller
  pur, sinon risque de contenu dupliqué).
- Remplir le contenu réel des 4 pages projet (`Le défi/Notre approche/Le
  résultat/La recette Kota`) dès que Yanis fournit la matière — gros levier
  E-E-A-T/AI Overviews (voir Techniques apprises : "content comprehensiveness"
  et "topical authority" comptent parmi les facteurs de citation).
- Ajouter un contenu de fond "combien coûte un site internet / combien de
  temps / ce qui est inclus" en page autonome si une requête informationnelle
  distincte (hors ville) est identifiée comme non couverte.
- Vérifier l'indexation Bing (pas seulement Google) — condition nécessaire
  pour apparaître dans ChatGPT Search d'après la recherche du jour.
- Schema `HowTo` sur un futur contenu procédural (ex. "comment se déroule un
  projet de site internet") si un article dédié est créé.

## Hypothèses à vérifier

_Ce que Yanis doit fournir ou confirmer :_

1. **Adresse postale complète du studio.** Utilisée nulle part sur le site
   pour l'instant (mentions légales encore en placeholder `[Adresse complète
   du siège]`). Le JSON-LD `ProfessionalService`/`Service` utilise seulement
   ville (Saint-Julien-en-Genevois) + code postal public (74160) + région —
   aucune rue inventée. Si la fiche Google Business Profile affiche une
   adresse complète (rue) ou au contraire aucune adresse (zone de service
   masquée), il faut que le site affiche exactement la même chose (cohérence
   NAP stricte demandée dans le brief). Je n'ai pas pu confirmer le contenu de
   la fiche GBP par recherche web ce jour (aucun résultat retourné).
2. **Confirmer que le téléphone `+33668823396` est bien celui affiché sur la
   fiche GBP** (déjà utilisé partout sur le site — WhatsApp, JSON-LD, mentions
   légales — mais pas vérifié contre la fiche elle-même).
3. Toutes les hypothèses déjà connues et non résolues des chantiers
   précédents (avis clients, `liveUrl` des projets, logos clients, contenu des
   pages projet, SIRET/forme juridique) restent valables — voir
   `kota-suivi.md` à la racine du repo, qui gardait cette liste avant ce
   journal.

## Erreurs commises et corrigées

- **Faux négatif de test visuel (ce run)** : un premier screenshot Playwright
  "fullPage" sans scroll réel donnait une page quasi vide sous le premier
  H2 — les animations GSAP ScrollTrigger (`.reveal`, opacity:0 tant que le
  trigger n'est pas atteint) ne se déclenchent pas si le scroll ne se produit
  jamais réellement. Corrigé en scrollant par paliers de 300px avant la
  capture. À refaire de cette façon pour tout contrôle visuel futur d'une page
  qui utilise `setupReveals()`.
- **Contenu dupliqué repéré avant push (ce run)** : la liste des 6 étapes du
  process s'affichait deux fois sur la nouvelle page (section "délai" +
  section "process"). Corrigé avant commit — voir Étape 6 ci-dessus.

## Techniques apprises

### 2026-09-07 (lundi — veille hebdomadaire, Étape 5)

- **AI Overviews ne nécessitent pas la position #1.** Google puise
  fréquemment ses citations en positions 4 à 20 selon la qualité du passage
  et les signaux de confiance de la page — le classement global compte moins
  que la clarté du passage cité. Confirme l'approche "réponse directe en tête
  de chaque H2" plutôt que la course au #1 sur ces requêtes très concurrentielles.
  Source : SEOcrawl AI, "AI Overview Ranking Factors: SEO Guide (2026)",
  consulté le 07/09/2026.
- **E-E-A-T s'étend à toutes les catégories de contenu depuis le Core Update
  de décembre 2025**, plus seulement YMYL. Renforce l'intérêt de remplir les
  pages projet avec du contenu réel (voir Chantiers en attente) plutôt que de
  les laisser en placeholder.
  Source : eSEOspace / Walsh & Partners, consultés le 07/09/2026.
- **Pour être cité par ChatGPT Search, le site doit être indexé par Bing ET
  Google**, pas seulement Google. À vérifier (voir Chantiers en attente) —
  pas encore fait ce jour.
  Source : searchterms.com, "How to Get Cited by ChatGPT and Perplexity",
  consulté le 07/09/2026.
- **Perplexity favorise fortement le contenu frais** : un contenu publié dans
  les 30 derniers jours était cité dans 82% des cas selon une analyse 2026
  citée par plusieurs sources. Confirme l'intérêt du "Dernière mise à jour"
  visible et daté sur les pages de fond (déjà appliqué sur la nouvelle page et
  sur les pages légales) — à n'actualiser que quand le contenu change
  vraiment, jamais artificiellement.
  Source : ailabsaudit.com / presspilot.io, consultés le 07/09/2026.
- **robots.txt actuel (`User-agent: * / Allow: /`) ne bloque aucun bot IA**
  (GPTBot, ClaudeBot, PerplexityBot inclus) — vérifié en relisant le fichier,
  aucune modification nécessaire.
