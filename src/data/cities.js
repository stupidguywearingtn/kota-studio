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
];
