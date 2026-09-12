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
    metaTitle: "Agence web à Annemasse | Kota Studio",
    metaDescription:
      "Agence web pour les entreprises d'Annemasse et de l'agglomération frontalière : sites sur-mesure livrés en 14 jours, révisions illimitées. Basée à Saint-Julien-en-Genevois.",
    h1: "Agence web à Annemasse",
    intro:
      "Kota Studio conçoit des sites internet sur-mesure pour les entreprises, commerces et indépendants d'Annemasse et de l'agglomération d'Annemasse-les-Voirons. L'agence est basée à Saint-Julien-en-Genevois, de l'autre côté du bassin genevois : les échanges se font en visio pour l'essentiel du projet, avec un rendez-vous en présentiel possible selon votre disponibilité.",
    updatedAt: "12 septembre 2026",
    faqs: [
      {
        q: "Kota Studio a-t-il une agence à Annemasse ?",
        a: "Non : l'agence est basée à Saint-Julien-en-Genevois, pas à Annemasse. Les deux communes font partie du même bassin genevois, à environ 30 minutes de route l'une de l'autre. Le suivi de projet se fait en visio, avec un rendez-vous en présentiel possible si besoin — ce qui compte, c'est le site livré, pas l'adresse du studio.",
      },
      {
        q: "Combien coûte un site internet pour une entreprise d'Annemasse ?",
        a: "Une landing page démarre à 790 € et un site sur-mesure complet à partir de 1 290 €, tout compris, quel que soit votre secteur d'activité. Le montant exact dépend du nombre de pages et des options choisies : un devis précis est donné après un appel de 15 minutes, sans engagement.",
      },
      {
        q: "Combien de temps pour un site internet à Annemasse ?",
        a: "14 jours du premier échange à la mise en ligne, avec un processus cadré en 6 étapes détaillé ci-dessous. Ce délai ne dépend pas de la ville du client : il dépend du cadrage initial et de la rapidité des retours sur les révisions.",
      },
      {
        q: "Qu'est-ce qui est inclus dans un projet Kota Studio ?",
        a: "Un site 100% codé sur-mesure (aucun template), un design responsive pensé mobile en premier, un espace admin pour modifier le contenu vous-même, l'optimisation des performances et des révisions illimitées jusqu'à validation.",
      },
      {
        q: "Kota Studio travaille-t-il avec des entreprises tournées vers la clientèle frontalière ?",
        a: "Oui : Annemasse est une des principales communes frontalières de l'agglomération genevoise, avec de nombreux commerces, artisans et professions de service qui s'adressent autant à une clientèle française que frontalière. Le site est pensé sur-mesure selon votre clientèle réelle, sans partir d'un gabarit générique.",
      },
    ],
  },
];
