/* ============================================================================
   KOTA BOUTIQUE — boutiques Shopify clé en main (offre décidée le 21/11/2026).
   Source de vérité UNIQUE des prix de la page /boutique-shopify : utilisée par
   l'affichage (ShopifyStorePage.jsx), le simulateur et le JSON-LD
   (src/lib/jsonld.js, lu aussi par scripts/generate-static-heads.mjs).
   Changer un prix ici le change partout. Aucun prix barré, aucune promo.
   ============================================================================ */

export const KOTA_BOUTIQUE_SIREN = "901 733 022";

/* Les 3 packs. `includedProducts` = produits importés inclus ;
   `premiumIncluded` = les fiches du pack sont déjà premium (pack Marque). */
export const boutiquePacks = [
  {
    id: "lancement",
    name: "Lancement",
    price: 79,
    includedProducts: 1,
    premiumIncluded: false,
    delay: "72 h",
    payment: "100 % à la commande",
    tagline: "Pour lancer un premier produit, proprement.",
    features: [
      "1 produit importé",
      "Thème Shopify personnalisé à tes couleurs",
      "Logo typographique simple",
      "Paiement configuré, pages légales et domaine connecté",
      "Vidéo de prise en main",
      "1 tour de retouches",
      "Livrée en 72 h",
    ],
  },
  {
    id: "boutique",
    name: "Boutique",
    price: 249,
    includedProducts: 20,
    premiumIncluded: false,
    delay: "5 jours",
    payment: "100 % à la commande",
    featured: true, // badge « Recommandé » (jamais « le plus choisi » : faux tant qu'il n'y a pas de clients)
    tagline: "Une vraie boutique complète, prête à vendre.",
    features: [
      "20 produits importés",
      "Thème à tes couleurs + sections animées, bannières, page À propos + FAQ",
      "Logo pro",
      "Paiement configuré, pages légales et domaine connecté",
      "App d'avis + pixel TikTok",
      "Vidéo de prise en main",
      "2 tours de retouches",
      "Livrée en 5 jours",
    ],
  },
  {
    id: "marque",
    name: "Marque",
    price: 549,
    includedProducts: 50,
    premiumIncluded: true,
    delay: "10 jours",
    payment: "50 % à la commande, 50 % à la livraison",
    tagline: "Une marque entière, de l'identité aux vidéos.",
    features: [
      "50 produits en fiches premium",
      "Identité complète (logo, palette, typos) + accueil premium",
      "Logo + mini charte",
      "Paiement configuré, pages légales et domaine connecté",
      "App d'avis + pixel TikTok",
      "3 vidéos produit prêtes à poster",
      "Vidéo de prise en main + appel de 30 min",
      "3 tours de retouches",
      "Livrée en 10 jours",
    ],
  },
];

/* Ajout de produits au-delà du pack (import standard). */
export const extraProductTiers = [
  { qty: 0, price: 0 },
  { qty: 5, price: 19 },
  { qty: 10, price: 29 },
  { qty: 25, price: 59 },
  { qty: 50, price: 99 },
  { qty: 100, price: 169 },
  { qty: 250, price: 299 },
  { qty: 500, price: 449 },
  { qty: 1000, price: 690 },
];

/* Fiche premium : texte de vente réécrit et relu, photos détourées fond uni,
   titre/description Google. */
export const PREMIUM_PER_PRODUCT = 4;
/* Produit sourcé : produit + fournisseur vérifié, délai Europe, marge calculée
   (sans garantie de rentabilité). Hors simulateur : se commande sur WhatsApp. */
export const SOURCED_PER_PRODUCT = 19;

/* Options du simulateur. `onlyFor` = packs où l'option est proposée ;
   `group` = options exclusives entre elles (une seule cochée). */
export const boutiqueOptions = [
  { id: "express", label: "Express 24 h", price: 29, note: "Pack Lancement uniquement", onlyFor: ["lancement"] },
  { id: "video1", label: "1 vidéo produit prête à poster", price: 49, group: "video" },
  { id: "video3", label: "Pack 3 vidéos produit", price: 129, group: "video" },
  { id: "tiktokshop", label: "TikTok Shop connecté", price: 79 },
  { id: "traduction", label: "Traduction de la boutique (1 langue)", price: 39 },
  { id: "logo", label: "Logo pro + mini charte", price: 89, onlyFor: ["lancement", "boutique"] },
  { id: "mail", label: "Mail pro configuré", price: 19 },
  { id: "coaching", label: "Coaching lancement (1 h)", price: 59 },
];

/* Tarifs affichés hors simulateur (tableau des options). */
export const boutiqueOtherPrices = [
  { label: "Produit sourcé (produit + fournisseur vérifié, délai Europe, marge calculée)", price: "19 € / produit" },
  { label: "Refonte d'une boutique Shopify existante", price: "dès 149 €" },
];

export const boutiqueFollowUp = {
  monthly: 29,
  yearly: 249,
  includes: ["3 modifications par mois", "10 produits ajoutés par mois", "Mises à jour de la boutique"],
};

/* Coûts payés directement par le client (pas à Kota). */
export const boutiqueClientCosts = [
  {
    label: "Abonnement Shopify (Basic)",
    price: "≈ 36 € / mois",
    note: "Ou 1 € / mois pendant 3 mois si tu crées toi-même ton compte (offre Shopify du moment).",
  },
  { label: "Nom de domaine", price: "≈ 10 à 15 € / an", note: "Payé au registraire, à ton nom." },
  { label: "Apps payantes", price: "si tu en veux", note: "Facultatif, selon les fonctions que tu veux ajouter." },
  { label: "Publicité (TikTok, Meta…)", price: "ton budget", note: "Facultatif. Tu décides combien et quand." },
];

export const formatEuro = (n) => `${n.toLocaleString("fr-FR").replace(/ | /g, " ")} €`;
