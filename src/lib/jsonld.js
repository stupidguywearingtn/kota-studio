/* ============================================================================
   JSON-LD partagé entre le rendu client (useEffect, CityPage.jsx /
   PricingGuidePage.jsx) et le pré-rendu statique post-build
   (scripts/generate-static-heads.mjs). Fonctions pures, aucune dépendance au
   DOM : mêmes objets produits des deux côtés, donc aucun risque d'écart entre
   ce qu'un crawler sans JS reçoit (HTML statique) et ce qu'un navigateur reçoit
   après hydratation (JS). Le FAQPage reprend mot pour mot le texte affiché —
   `pricingGuideFaqs` est la seule source de vérité pour la page prix, utilisée
   à la fois pour l'affichage et pour le schema.
   ============================================================================ */

import { offer, process, promises } from "../data/content.js";

export const SITE_URL = "https://kotastudio.fr";

/* Attribut commun utilisé pour identifier le <script> JSON-LD spécifique à la
   page courante (en plus du ProfessionalService générique, toujours présent
   en dur dans index.html). Sert à la fois côté serveur (injection statique)
   et côté client (un seul de ces scripts doit exister à la fois : le client
   retire l'ancien, qu'il vienne du pré-rendu statique ou d'une page
   précédente visitée en SPA, avant d'ajouter le sien). */
export const PAGE_SCHEMA_ATTR = "data-page-schema";

export function buildCityJsonLd(city) {
  const pageUrl = `${SITE_URL}/${city.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: city.h1, item: pageUrl },
        ],
      },
      {
        "@type": "Service",
        serviceType: "Création de site internet sur-mesure",
        name: city.h1,
        url: pageUrl,
        areaServed: { "@type": city.areaType || "City", name: city.cityName },
        provider: {
          "@type": "ProfessionalService",
          name: "Kota Studio",
          url: `${SITE_URL}/`,
          telephone: "+33668823396",
        },
        offers: offer.plans.map((p) => ({
          "@type": "Offer",
          name: p.name,
          price: p.price.replace(/[^\d]/g, ""),
          priceCurrency: "EUR",
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: city.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

export const PRICING_GUIDE_PATH = "/combien-coute-un-site-internet";

/* Les 5 questions/réponses affichées sur PricingGuidePage.jsx, reprises mot
   pour mot dans le JSON-LD FAQPage — même principe que cities.js pour les
   pages villes. */
export const pricingGuideFaqs = [
  {
    q: "Combien coûte un site internet chez Kota Studio ?",
    a: `Une landing page démarre à ${offer.plans[0].price.replace("à partir de ", "")} et un site sur-mesure complet à partir de ${offer.plans[1].price.replace("à partir de ", "")}, tout compris. Le montant exact dépend du nombre de pages et des options choisies (langue supplémentaire, logo, rédaction de contenu…). Un devis précis est donné après un appel de 15 minutes, sans engagement.`,
  },
  {
    q: "Combien de temps faut-il pour avoir son site ?",
    a: "Le délai annoncé dès le premier échange est de 14 jours, du brief initial à la mise en ligne. Ce délai est tenu grâce à un processus cadré en 6 étapes, détaillé ci-dessous.",
  },
  {
    q: "Qu'est-ce qui est inclus dans le prix, sans surprise ?",
    a: "Chaque projet Kota Studio inclut un site 100% codé sur-mesure (aucun template), un design responsive mobile/tablette/desktop, un espace admin pour modifier le contenu, l'optimisation des performances et des révisions illimitées jusqu'à validation. Rien de cette liste n'est facturé en supplément.",
  },
  {
    q: "Landing page ou site sur-mesure : lequel choisir ?",
    a: "Une landing page est une page unique, taillée pour une offre et un seul objectif : convertir — adaptée à un lancement, une offre ponctuelle ou un test rapide. Un site sur-mesure est un site complet, structuré en plusieurs pages, pensé pour représenter toute l'activité sur la durée. Le choix dépend du nombre de messages à faire passer, pas seulement du budget.",
  },
  {
    q: "Le prix inclut-il le référencement (SEO) ?",
    a: "Oui pour les fondations : chaque site part avec une base technique SEO soignée (structure, vitesse, contenu) posée dès le développement. Mais Kota Studio ne vend jamais de classement Google garanti — personne ne peut sérieusement s'engager là-dessus. Pour un accompagnement SEO plus poussé que les fondations de base, l'option « SEO avancé » est disponible sur devis.",
  },
];

export function buildPricingGuideJsonLd() {
  const pageUrl = `${SITE_URL}${PRICING_GUIDE_PATH}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Combien coûte un site internet ?", item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: pricingGuideFaqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "HowTo",
        name: "Comment se déroule un projet de création de site avec Kota Studio",
        description: process.subtitle,
        totalTime: "P14D",
        step: process.steps.map((s) => ({
          "@type": "HowToStep",
          name: s.title,
          text: s.text,
        })),
      },
    ],
  };
}

export const AGENCY_GUIDE_PATH = "/comment-choisir-une-agence-web";

/* Les 5 questions/réponses affichées sur ChooseAgencyGuidePage.jsx, reprises
   mot pour mot dans le JSON-LD FAQPage — même principe que pricingGuideFaqs.
   Contenu volontairement générique (conseils valables pour choisir N'IMPORTE
   quelle agence, pas seulement Kota Studio) sauf quand une affirmation porte
   spécifiquement sur Kota Studio : dans ce cas elle reprend un fait déjà
   publié ailleurs sur le site (prix, délai, promesse SEO citée mot pour mot
   depuis `promises.items[3]`), jamais une donnée inventée pour l'occasion. */
export const agencyGuideFaqs = [
  {
    q: "Comment choisir une agence de création de site internet ?",
    a: "Le plus fiable est de comparer sur des critères concrets plutôt que sur le seul visuel du portfolio : un prix annoncé clairement (pas uniquement «sur devis»), un délai de livraison précisé avant de signer, un interlocuteur unique identifié pour tout le projet, et un accompagnement prévu après la mise en ligne. Le reste — style graphique, technologies utilisées — compte aussi, mais vient après ces bases.",
  },
  {
    q: "Agence, freelance ou plateforme (Wix, Shopify…) : quelle différence ?",
    a: "Une plateforme comme Wix ou Shopify est la solution la moins chère et la plus rapide en autonomie, mais le site reste construit sur un template que vous gérez seul. Un freelance est souvent plus accessible sur le prix, mais le projet dépend d'une seule personne, avec une disponibilité qui peut varier. Une agence ou un studio structuré garde un interlocuteur unique et un site sur-mesure, avec en plus un process cadré (délai annoncé, étapes définies) qui manque parfois côté freelance indépendant.",
  },
  {
    q: "Faut-il absolument choisir une agence proche de chez soi ?",
    a: "Non : la proximité géographique compte moins que la clarté des échanges pendant le projet. Kota Studio accompagne par exemple des clients à Annecy, Annemasse ou Lyon sans y avoir de bureau, en visio pour l'essentiel du projet avec un rendez-vous en présentiel possible selon la distance. Ce qui détermine la qualité du résultat, c'est le travail livré, pas l'adresse du studio.",
  },
  {
    q: "Quels signaux doivent alerter avant de signer avec une agence web ?",
    a: `Trois signaux méritent d'être creusés avant de signer : un prix qui reste "sur devis" sans jamais donner le moindre ordre de grandeur, une absence totale de délai chiffré, et une promesse de classement Google garanti. Sur ce dernier point, chez Kota Studio comme ailleurs, personne ne peut sérieusement s'engager là-dessus : "${promises.items[3].text}" Aucun de ces signaux ne signifie automatiquement un problème, mais chacun mérite une question directe posée à l'agence avant d'avancer.`,
  },
  {
    q: "Quelles questions poser avant de vous engager avec une agence web ?",
    a: "Cinq questions suffisent en général à clarifier une offre : le prix est-il fixe ou variable selon des critères précis ? Quel est le délai réel, pas juste indicatif ? Qui sera mon interlocuteur pendant le projet ? Que se passe-t-il après la mise en ligne (support, modifications) ? Le référencement de base est-il inclus dans le prix ou facturé en option ?",
  },
];

/* Portfolio (ProjectPage.jsx) : jusqu'ici aucune donnée structurée (ni
   client, ni pré-rendue) sur les 4 pages projet — trouvé le 2026-09-25 en
   auditant chaque type de page individuellement (leçon du 09-08 : ne jamais
   supposer qu'un pattern posé sur un type de page est appliqué partout).
   CreativeWork reprend uniquement des champs déjà affichés sur la page
   (nom, secteur, année, visuel) — jamais de `url` externe tant que
   `project.liveUrl` reste "#" (placeholder), pour ne pas publier un lien
   cassé ou trompeur dans le schema. */
export function buildProjectJsonLd(project) {
  const pageUrl = `${SITE_URL}/projets/${project.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Réalisations", item: `${SITE_URL}/#realisations` },
          { "@type": "ListItem", position: 3, name: project.name, item: pageUrl },
        ],
      },
      {
        "@type": "CreativeWork",
        name: project.name,
        description: `${project.sector} — réalisation Kota Studio, agence de création de sites web sur-mesure.`,
        url: pageUrl,
        image: `${SITE_URL}${project.cover}`,
        dateCreated: project.year,
        genre: project.badge,
        creator: { "@type": "ProfessionalService", name: "Kota Studio", url: `${SITE_URL}/` },
      },
    ],
  };
}

export function buildAgencyGuideJsonLd() {
  const pageUrl = `${SITE_URL}${AGENCY_GUIDE_PATH}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: "Comment choisir une agence de création de site internet ?",
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: agencyGuideFaqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

export const REFONTE_SIGNS_PATH = "/quand-refaire-son-site-internet";

/* Les 5 questions/réponses affichées sur RefonteSignsPage.jsx, reprises mot
   pour mot dans le JSON-LD FAQPage — même principe que pricingGuideFaqs /
   agencyGuideFaqs. Page trouvée le 2026-09-27 par recherche ciblée (requête
   réelle et non couverte, angle différent de la page Haute-Savoie qui traite
   déjà prix/délai/différence création-refonte pour la requête "refonte site
   internet Haute-Savoie" : cette page répond à la question amont, "est-ce que
   j'ai besoin d'une refonte", avant qu'un prospect ne cherche un prestataire.
   Q4 réutilise les faits déjà publiés sur la page Haute-Savoie (grille
   tarifaire, délai, audit de départ) reformulés brièvement + lien vers cette
   page pour le détail, afin de ne pas dupliquer le même texte à l'identique
   sur deux pages. Q5 reprend mot pour mot `promises.items[3].text`, comme
   `agencyGuideFaqs[3]`. */
export const refonteSignsFaqs = [
  {
    q: "Faut-il refaire son site internet ?",
    a: "Il n'existe pas de durée de vie fixée à l'avance : un site a besoin d'une refonte quand plusieurs signes concrets s'accumulent en même temps, pas à cause d'un seul détail isolé. Si vous n'en repérez qu'un dans la liste ci-dessous, une simple mise à jour suffit généralement. Si plusieurs se cumulent, une refonte complète devient la meilleure option.",
  },
  {
    q: "Quels sont les signes qu'une refonte est nécessaire ?",
    a: "Six signes reviennent le plus souvent : un site pas adapté au mobile, un chargement lent, un design visiblement daté, un contenu impossible à modifier sans appeler un prestataire, un site qui ne reflète plus l'activité actuelle, et des prospects qui hésitent à cause du site avant même de contacter. Passez-les en revue un par un ci-dessous.",
  },
  {
    q: "Refonte complète ou simple mise à jour : comment choisir ?",
    a: "Si la base technique est saine — le site est déjà rapide, adapté au mobile et bien structuré — et qu'il s'agit seulement de rafraîchir des textes ou quelques visuels, une mise à jour suffit, sans tout reconstruire. Si plusieurs signes de la liste précédente sont réunis en même temps, une refonte complète devient plus pertinente qu'un rafistolage progressif.",
  },
  {
    q: "Comment se passe une refonte de site internet chez Kota Studio ?",
    a: "Une refonte suit la même grille tarifaire qu'un site sur-mesure et le même délai de 14 jours, en démarrant par un audit rapide du site existant. Ce qui fonctionne déjà — contenu, images, nom de domaine — est repris plutôt que jeté ; le reste est reconstruit avec le même niveau de soin qu'une création.",
  },
  {
    q: "Perdre son référencement Google en changeant de site, un vrai risque ?",
    a: `C'est un risque réel si la refonte est mal préparée (pages qui rankaient supprimées, URLs cassées), mais pas une fatalité : conserver la structure d'URL existante ou mettre en place les redirections nécessaires évite l'essentiel de la perte. Chez Kota Studio, les fondations techniques (structure, vitesse, contenu) sont posées avec le même soin lors d'une refonte que pour une création — mais comme ailleurs, personne ne peut sérieusement promettre un classement Google garanti : "${promises.items[3].text}"`,
  },
];

export function buildRefonteSignsJsonLd() {
  const pageUrl = `${SITE_URL}${REFONTE_SIGNS_PATH}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: "Quand refaire son site internet ?",
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: refonteSignsFaqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

export const CUSTOM_VS_CMS_PATH = "/site-sur-mesure-ou-wordpress-wix";

/* Les 5 questions/réponses affichées sur CustomVsCmsPage.jsx, reprises mot
   pour mot dans le JSON-LD FAQPage (même principe que les autres guides).
   Page ajoutée le 2026-09-29 : requête réelle non couverte ("site sur-mesure
   ou WordPress / Wix"), vérifiée absente des autres pages. Aucun prix ni
   chiffre concurrent n'est cité (non sourcé) : seuls les faits publiés par
   Kota Studio dans content.js (offre, inclus, délai, admin, promesse SEO)
   sont chiffrés. */
export const customVsCmsFaqs = [
  {
    q: "Site sur-mesure ou WordPress / Wix : quelle différence ?",
    a: "Un site Wix ou WordPress part d'un modèle (template ou thème) que l'on personnalise ; un site sur-mesure est conçu et codé à partir d'une page blanche, autour de votre activité et de vos objectifs. Le premier est plus rapide à démarrer, le second offre plus de liberté de design et de structure, sans les contraintes d'un modèle.",
  },
  {
    q: "Quand un site Wix ou WordPress suffit-il ?",
    a: "Si vous avez besoin de tester une idée, d'un site très simple à petit budget ou d'une présence en ligne provisoire, un outil de création clé en main est une option raisonnable, surtout si vous êtes à l'aise pour l'installer et le maintenir vous-même. Le sur-mesure devient pertinent quand le site est un vrai outil d'acquisition de clients et doit se démarquer.",
  },
  {
    q: "Un site sur-mesure coûte-t-il plus cher qu'un site Wix ou WordPress ?",
    a: `À la création, un site sur-mesure demande généralement un budget de départ plus élevé qu'un modèle prêt à l'emploi. Chez Kota Studio, le site sur-mesure démarre ${offer.plans[1].price} et la landing page ${offer.plans[0].price}, avec livraison en 14 jours. Comparez toujours le coût total sur la durée (abonnements, extensions, temps passé à le gérer), pas seulement le prix de départ.`,
  },
  {
    q: "Un site sur-mesure est-il mieux référencé sur Google ?",
    a: `Pas automatiquement : le référencement dépend surtout du contenu, de la structure et de la vitesse, pas de l'outil utilisé. Un site sur-mesure permet en revanche de maîtriser ces points sans être limité par un modèle. Personne ne peut promettre un classement garanti : "${promises.items[3].text}"`,
  },
  {
    q: "Pourrai-je modifier moi-même mon site sur-mesure ?",
    a: "Oui. Chez Kota Studio, un espace admin pour modifier votre contenu est inclus dans l'offre, et sa prise en main a lieu à la livraison, au jour 14. Vous n'avez pas besoin d'appeler un développeur pour changer un texte ou une photo.",
  },
];

export function buildCustomVsCmsJsonLd() {
  const pageUrl = `${SITE_URL}${CUSTOM_VS_CMS_PATH}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: "Site sur-mesure ou WordPress / Wix : que choisir ?",
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: customVsCmsFaqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

export const SITE_PAGES_PATH = "/quelles-pages-pour-un-site-vitrine";

/* Les 5 questions/réponses affichées sur SitePagesGuidePage.jsx, reprises mot
   pour mot dans le JSON-LD FAQPage. Page ajoutée le 2026-09-30 : requête
   réelle ("quelles pages pour un site vitrine", "combien de pages") non
   couverte ailleurs. Aucun chiffre concurrent ni statistique : conseils de
   structure généraux + faits publiés par Kota Studio dans content.js. */
export const sitePagesFaqs = [
  {
    q: "Quelles pages faut-il sur un site vitrine ?",
    a: "Un site vitrine tient l'essentiel en cinq pages : une page d'accueil, une page services (ou offres), une page « à propos », une page réalisations ou références, et une page contact. À cela s'ajoute la page de mentions légales, obligatoire pour un site professionnel en France.",
  },
  {
    q: "Combien de pages pour un site vitrine ?",
    a: "Il n'y a pas de nombre magique : le bon nombre de pages est celui qui répond à chaque question que se pose un prospect avant de vous contacter. Pour une petite activité, quelques pages bien construites valent mieux qu'un site de vingt pages creuses. Le nombre monte quand vous avez plusieurs services distincts, chacun méritant sa propre page.",
  },
  {
    q: "Une seule page (landing page) suffit-elle ?",
    a: `Oui, si vous n'avez qu'une offre et un seul objectif : un lancement, une offre ponctuelle, un lien en bio à partager. Une landing page est une page unique pensée pour convertir. Chez Kota Studio, elle démarre ${offer.plans[0].price}. Dès que vous avez plusieurs services ou besoin de rassurer avec des références, un site en plusieurs pages (${offer.plans[1].price}) devient plus adapté.`,
  },
  {
    q: "Pourquoi prévoir une page par service pour être trouvé sur Google ?",
    a: `Parce qu'une page répond à une seule intention de recherche : un visiteur qui cherche un service précis atterrit plus facilement sur une page dédiée que sur une page d'accueil qui parle de tout. Cela n'assure aucun classement : "${promises.items[3].text}"`,
  },
  {
    q: "Comment Kota Studio définit-il les pages de mon site ?",
    a: "Le projet démarre par une phase de recherche et de stratégie : analyse de votre marché et de vos concurrents, puis définition de l'arborescence (la liste et l'organisation des pages) et des objectifs, avant tout design. La livraison a lieu en 14 jours, avec des révisions illimitées.",
  },
];

export function buildSitePagesJsonLd() {
  const pageUrl = `${SITE_URL}${SITE_PAGES_PATH}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: "Quelles pages pour un site vitrine ?",
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: sitePagesFaqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

export const AI_VISIBILITY_PATH = "/apparaitre-dans-chatgpt-et-ia-site-local";

/* Les 5 questions/réponses affichées sur AiVisibilityPage.jsx, reprises mot
   pour mot dans le JSON-LD FAQPage. Page ajoutée le 2026-10-01 (GEO) : seules
   affirmations externes = documentation officielle Google (« Top ways to
   ensure your content performs well in Google's AI experiences », màj
   10 déc. 2025) et OpenAI (« Overview of OpenAI Crawlers »), consultées le
   2026-10-01. Les faits "propres au studio" sont vérifiables dans le dépôt
   (robots.txt, sitemap, llms.txt, JSON-LD, pré-rendu). Aucune promesse de
   citation par une IA. */
export const aiVisibilityFaqs = [
  {
    q: "Comment apparaître dans les réponses de ChatGPT et des IA quand on a une entreprise locale ?",
    a: "Il n'existe pas de bouton magique : les moteurs IA reprennent des pages qu'ils peuvent explorer, lire et comprendre. Concrètement, il faut un site indexable, des pages en texte lisible qui répondent directement à des questions précises, et des informations vérifiables (prix, délais, zone d'intervention, date de mise à jour). Aucune méthode ne garantit d'être cité.",
  },
  {
    q: "Faut-il un fichier ou un balisage spécial pour apparaître dans les AI Overviews de Google ?",
    a: "Non. Selon la documentation officielle de Google (mise à jour le 10 décembre 2025), il n'y a pas d'exigence supplémentaire pour apparaître dans les AI Overviews ou l'AI Mode, ni de fichier, de texte « IA » ou de schema.org spécifique à ajouter. Il faut qu'une page soit indexée et éligible à l'affichage avec un extrait dans Google Search. Les données structurées restent utiles à condition de correspondre au texte visible de la page.",
  },
  {
    q: "Faut-il autoriser les robots d'OpenAI dans le fichier robots.txt ?",
    a: "Si vous voulez pouvoir être affiché dans les réponses de recherche de ChatGPT, oui : OpenAI indique qu'un site qui bloque OAI-SearchBot n'apparaît pas dans ces réponses (il peut seulement rester accessible par lien). OpenAI précise aussi que GPTBot sert à l'entraînement de ses modèles, et qu'un changement de robots.txt peut mettre environ 24 heures à être pris en compte.",
  },
  {
    q: "Qu'est-ce qui rend une page facile à citer pour une IA ?",
    a: "Une réponse nette dès le début de chaque section, des titres formulés comme de vraies questions, des chiffres précis et datés, et un contenu que personne d'autre ne publie (vos délais réels, votre méthode, ce qui est inclus ou non). Une IA extrait des passages isolés : un passage qui ne se comprend pas seul est rarement repris.",
  },
  {
    q: "Que fait Kota Studio sur son propre site, et peut-il me garantir d'être cité par ChatGPT ?",
    a: `Non, aucune garantie : ${promises.items[3].text} Sur son propre site, Kota Studio autorise tous les robots dans robots.txt, publie un sitemap et un fichier llms.txt, affiche des FAQ visibles reprises à l'identique dans des données structurées FAQPage, et rend le texte de chaque page directement dans le HTML, lisible sans JavaScript. Le délai de livraison d'un site est de 14 jours.`,
  },
];

export function buildAiVisibilityJsonLd() {
  const pageUrl = `${SITE_URL}${AI_VISIBILITY_PATH}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: "Apparaître dans ChatGPT et les IA",
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: aiVisibilityFaqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}
