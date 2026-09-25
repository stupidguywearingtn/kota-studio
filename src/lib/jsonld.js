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
