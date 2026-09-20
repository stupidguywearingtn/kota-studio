/* ============================================================================
   KOTA STUDIO — PAGES VILLES (SEO local)
   Une entrée par page "création de site internet à <ville>". Le composant
   src/pages/CityPage.jsx affiche 5 sections en questions/réponses directes
   (format GEO : réponse en 2-3 phrases en tête de chaque H2), reprises telles
   quelles dans le JSON-LD FAQPage (aucun écart entre le texte visible et le
   schema.org).
   Les prix, délais et inclus viennent de `content.js` (offer/process) : une
   seule source de vérité, jamais dupliqués ici en dur.
   Pour ajouter une ville : nouvelle entrée + route automatique via
   /:citySlug dans App.jsx (aucune autre modif nécessaire).
   ============================================================================ */

export const cities = [
  {
    slug: "creation-site-internet-saint-julien-en-genevois",
    cityName: "Saint-Julien-en-Genevois",
    badge: "Saint-Julien-en-Genevois",
    metaTitle: "Création de site internet à Saint-Julien-en-Genevois | Kota Studio",
    metaDescription:
      "Agence basée à Saint-Julien-en-Genevois : sites vitrine et sites sur-mesure, livrés en 14 jours, révisions illimitées. Devis clair après un appel de 15 min.",
    h1: "Création de site internet à Saint-Julien-en-Genevois",
    intro:
      "Kota Studio conçoit des sites internet sur-mesure pour les entreprises, artisans et indépendants de Saint-Julien-en-Genevois et du Genevois haut-savoyard. Chaque site est codé à la main, sans template, et livré en 14 jours. L'agence est basée directement dans la commune.",
    updatedAt: "7 septembre 2026",
    faqs: [
      {
        q: "Pourquoi choisir une agence basée à Saint-Julien-en-Genevois ?",
        a: "Être implanté à Saint-Julien-en-Genevois permet un rendez-vous en présentiel et une vraie connaissance du bassin économique local (frontalier, Genève, Annemasse, Annecy). Vous avez un interlocuteur unique du premier appel à la mise en ligne, pas un ticket support anonyme.",
      },
      {
        q: "Combien coûte un site internet à Saint-Julien-en-Genevois ?",
        a: "Chez Kota Studio, une landing page démarre à 790 € et un site sur-mesure complet à partir de 1 290 €, tout compris. Le prix exact dépend du nombre de pages et des options choisies : un devis précis est donné après un appel de 15 minutes, sans engagement.",
      },
      {
        q: "Combien de temps pour avoir mon site ?",
        a: "Le délai annoncé dès le premier échange est de 14 jours, du brief initial à la mise en ligne. Ce délai est tenu grâce à un processus cadré en 6 étapes, présenté ci-dessous.",
      },
      {
        q: "Qu'est-ce qui est inclus dans un projet Kota Studio ?",
        a: "Chaque projet inclut un site 100% codé sur-mesure (aucun template), un design responsive mobile/tablette/desktop, un espace admin pour modifier le contenu, l'optimisation des performances et des révisions illimitées jusqu'à validation.",
      },
      {
        q: "Kota Studio intervient-il aussi à Annecy, Annemasse ou Genève ?",
        a: "Oui. Depuis Saint-Julien-en-Genevois, Kota Studio accompagne des clients dans tout le bassin genevois et en Haute-Savoie : Annemasse, Annecy, Genève (Suisse) et Lyon. Les échanges se font en visio ou en présentiel selon votre localisation.",
      },
    ],
  },
  {
    slug: "creation-site-internet-annecy",
    cityName: "Annecy",
    badge: "Annecy",
    metaTitle: "Création de site internet à Annecy | Kota Studio",
    metaDescription:
      "Sites vitrine et sites sur-mesure pour les entreprises d'Annecy, conçus par une agence basée à Saint-Julien-en-Genevois. Livrés en 14 jours, révisions illimitées.",
    h1: "Création de site internet à Annecy",
    intro:
      "Kota Studio conçoit des sites internet sur-mesure pour les entreprises, commerces et indépendants d'Annecy et du bassin annécien. L'agence est basée à Saint-Julien-en-Genevois, à moins d'une heure de route d'Annecy : les rendez-vous se font en visio ou en présentiel selon ce qui vous convient le mieux.",
    updatedAt: "9 septembre 2026",
    faqs: [
      {
        q: "Kota Studio a-t-il un bureau à Annecy ?",
        a: "Non, et il est plus honnête de le dire clairement : l'agence est basée à Saint-Julien-en-Genevois, pas à Annecy. Les clients annéciens sont suivis en visio pour l'essentiel du projet, avec un rendez-vous en présentiel possible si besoin (moins d'une heure de trajet). Ce qui compte pour votre site, c'est le travail livré, pas l'adresse du studio.",
      },
      {
        q: "Combien coûte un site internet à Annecy ?",
        a: "Une landing page démarre à 790 € et un site sur-mesure complet à partir de 1 290 €, tout compris, quel que soit votre secteur d'activité à Annecy. Le montant exact dépend du nombre de pages et des options : un devis précis est donné après un appel de 15 minutes, sans engagement.",
      },
      {
        q: "Combien de temps pour un site internet à Annecy ?",
        a: "14 jours du premier échange à la mise en ligne, avec un processus cadré en 6 étapes détaillé ci-dessous. Ce délai ne change pas selon la ville : il dépend du cadrage initial et de la rapidité des retours, pas de la localisation du client.",
      },
      {
        q: "Qu'est-ce qui est inclus dans un projet Kota Studio ?",
        a: "Un site 100% codé sur-mesure (aucun template), un design responsive pensé mobile en premier, un espace admin pour modifier le contenu vous-même, l'optimisation des performances et des révisions illimitées jusqu'à validation.",
      },
      {
        q: "Kota Studio travaille-t-il avec les commerces touristiques et l'immobilier autour du lac d'Annecy ?",
        a: "Oui, ce sont des secteurs fréquents pour les entreprises basées à Annecy : hôtellerie, restauration, activités de plein air, immobilier. Le principe reste le même quel que soit le secteur : un site sur-mesure pensé pour convertir, pas un template générique réutilisé d'un client à l'autre.",
      },
    ],
  },
  {
    slug: "agence-web-annemasse",
    cityName: "Annemasse",
    badge: "Annemasse",
    crossLinkLabel: "Agence web à Annemasse",
    metaTitle: "Agence web à Annemasse | Kota Studio",
    metaDescription:
      "Agence web basée à Saint-Julien-en-Genevois, à environ 30 minutes d'Annemasse : sites vitrine et sites sur-mesure pour les entreprises du Genevois. Livrés en 14 jours.",
    h1: "Agence web à Annemasse",
    intro:
      "Kota Studio conçoit des sites internet sur-mesure pour les entreprises, commerces et indépendants d'Annemasse et de l'agglomération genevoise. L'agence est basée à Saint-Julien-en-Genevois, de l'autre côté du bassin genevois : les rendez-vous se font en visio ou en présentiel selon ce qui vous convient le mieux.",
    updatedAt: "14 septembre 2026",
    faqs: [
      {
        q: "Kota Studio a-t-il une agence ou un bureau à Annemasse ?",
        a: "Non : Kota Studio est basé à Saint-Julien-en-Genevois, à environ 30 minutes de route d'Annemasse (un peu plus aux heures de pointe à la frontière). Les clients annemassiens sont suivis en visio pour l'essentiel du projet, avec un rendez-vous en présentiel possible si besoin. Ce qui compte pour votre site, c'est le travail livré, pas l'adresse exacte du studio.",
      },
      {
        q: "Combien coûte un site internet pour une entreprise à Annemasse ?",
        a: "Une landing page démarre à 790 € et un site sur-mesure complet à partir de 1 290 €, tout compris, quel que soit votre secteur d'activité. Le montant exact dépend du nombre de pages et des options choisies : un devis précis est donné après un appel de 15 minutes, sans engagement.",
      },
      {
        q: "Combien de temps pour un site internet à Annemasse ?",
        a: "14 jours du premier échange à la mise en ligne, avec un processus cadré en 6 étapes détaillé ci-dessous. Ce délai ne dépend pas de la ville du client : il dépend du cadrage initial du projet et de la rapidité des retours.",
      },
      {
        q: "Qu'est-ce qui est inclus dans un projet Kota Studio ?",
        a: "Un site 100% codé sur-mesure (aucun template), un design responsive pensé mobile en premier, un espace admin pour modifier le contenu vous-même, l'optimisation des performances et des révisions illimitées jusqu'à validation.",
      },
      {
        q: "Un site pour une clientèle transfrontalière France/Suisse change-t-il quelque chose ?",
        a: "Oui : beaucoup d'entreprises annemassiennes travaillent avec une clientèle des deux côtés de la frontière. Cela peut se traduire par un contenu adapté (zone d'intervention précisée, devis clairs en euros pour un client suisse) plutôt qu'un site générique. Ce point se discute dès le premier appel, selon votre activité.",
      },
    ],
  },
  {
    slug: "agence-web-lyon",
    cityName: "Lyon",
    badge: "Lyon",
    crossLinkLabel: "Agence web à Lyon",
    metaTitle: "Agence web à Lyon | Kota Studio",
    metaDescription:
      "Sites vitrine et sites sur-mesure pour les entreprises de Lyon, conçus par une agence basée en Haute-Savoie : prix fixes, livraison en 14 jours, révisions illimitées.",
    h1: "Agence web à Lyon",
    intro:
      "Kota Studio conçoit des sites internet sur-mesure pour les entreprises, commerces et indépendants de Lyon et de son agglomération. L'agence est basée à Saint-Julien-en-Genevois, à environ 1h30 de route de Lyon : les rendez-vous se font en visio, avec un présentiel possible si besoin.",
    updatedAt: "16 septembre 2026",
    faqs: [
      {
        q: "Kota Studio a-t-il une agence à Lyon ?",
        a: "Non : l'agence est basée à Saint-Julien-en-Genevois, à environ 1h30 de route de Lyon. Le suivi de projet se fait en visio du premier appel à la livraison, avec un rendez-vous en présentiel possible si votre activité le demande. Sur un projet de site internet, la distance géographique n'a pas d'impact sur la qualité du travail livré.",
      },
      {
        q: "Pourquoi choisir une agence de Haute-Savoie plutôt qu'une agence lyonnaise ?",
        a: "Lyon compte de nombreuses agences web bien installées, et c'est un argument légitime à considérer. La différence chez Kota Studio : un prix fixe annoncé dès le départ (pas seulement \"sur devis\"), un délai de 14 jours tenu par un process cadré en 6 étapes, et un seul interlocuteur du premier appel à la mise en ligne plutôt qu'un chef de projet qui répartit le travail dans une équipe.",
      },
      {
        q: "Combien coûte un site internet à Lyon ?",
        a: "Une landing page démarre à 790 € et un site sur-mesure complet à partir de 1 290 €, tout compris, quel que soit votre secteur d'activité. Le montant exact dépend du nombre de pages et des options choisies : un devis précis est donné après un appel de 15 minutes, sans engagement.",
      },
      {
        q: "Combien de temps pour un site internet à Lyon ?",
        a: "14 jours du premier échange à la mise en ligne, avec un processus cadré en 6 étapes détaillé ci-dessous. Ce délai ne dépend pas de la ville du client : il dépend du cadrage initial du projet et de la rapidité des retours.",
      },
      {
        q: "Qu'est-ce qui est inclus dans un projet Kota Studio ?",
        a: "Un site 100% codé sur-mesure (aucun template), un design responsive pensé mobile en premier, un espace admin pour modifier le contenu vous-même, l'optimisation des performances et des révisions illimitées jusqu'à validation.",
      },
    ],
  },
  {
    slug: "creation-refonte-site-internet-haute-savoie",
    cityName: "Haute-Savoie",
    badge: "Haute-Savoie",
    areaType: "AdministrativeArea",
    crossLinkLabel: "Création & refonte de site en Haute-Savoie",
    metaTitle: "Création et refonte de site internet en Haute-Savoie | Kota Studio",
    metaDescription:
      "Agence basée à Saint-Julien-en-Genevois : création et refonte de sites vitrine et sites sur-mesure pour toute la Haute-Savoie. Livraison en 14 jours, prix fixe, révisions illimitées.",
    h1: "Création et refonte de site internet en Haute-Savoie",
    intro:
      "Kota Studio conçoit et refond des sites internet sur-mesure pour les entreprises, artisans et indépendants de toute la Haute-Savoie. L'agence est basée à Saint-Julien-en-Genevois : les rendez-vous se font en visio pour l'essentiel du projet, avec un présentiel possible selon votre localisation dans le département.",
    updatedAt: "20 septembre 2026",
    faqs: [
      {
        q: "Kota Studio intervient-il dans toute la Haute-Savoie ?",
        a: "Oui. Basée à Saint-Julien-en-Genevois, l'agence conçoit des sites internet pour des entreprises, artisans et indépendants dans tout le département : Genevois, bassin annécien, Chablais, Faucigny (Annecy, Annemasse, Thonon-les-Bains, Cluses, Sallanches, La Roche-sur-Foron…). Des pages dédiées existent déjà pour Saint-Julien-en-Genevois, Annecy et Annemasse ; cette page centralise les informations valables pour le reste du département.",
      },
      {
        q: "Combien coûte un site internet en Haute-Savoie ?",
        a: "Une landing page démarre à 790 € et un site sur-mesure complet à partir de 1 290 €, tout compris, quelle que soit la commune de Haute-Savoie où vous êtes basé. Une refonte de site existant suit la même grille tarifaire qu'un site sur-mesure, le travail de conception et de code étant comparable : le montant exact est donné après un appel de 15 minutes, sans engagement.",
      },
      {
        q: "Combien de temps pour une création ou une refonte de site en Haute-Savoie ?",
        a: "14 jours du premier échange à la mise en ligne, que ce soit pour une création ou une refonte, grâce à un processus cadré en 6 étapes détaillé ci-dessous. Une refonte démarre par un audit rapide du site existant (contenu, structure, ce qui est conservé ou refait), sans rallonger ce délai dans la plupart des cas.",
      },
      {
        q: "Quelle est la différence entre une création et une refonte de site internet ?",
        a: "Une création part de zéro : arborescence, design et contenu sont pensés dès le départ pour votre activité. Une refonte reprend un site existant jugé daté, lent ou mal positionné sur Google, et le reconstruit avec le même niveau de soin (design, code, structure), en conservant ce qui fonctionne déjà (contenu, images, nom de domaine) plutôt que de tout jeter.",
      },
      {
        q: "Qu'est-ce qui est inclus dans un projet Kota Studio ?",
        a: "Un site 100% codé sur-mesure (aucun template), un design responsive pensé mobile en premier, un espace admin pour modifier le contenu vous-même, l'optimisation des performances et des révisions illimitées jusqu'à validation. Une refonte inclut les mêmes garanties, en plus d'une reprise de vos contenus existants quand ils sont valables.",
      },
    ],
  },
];
