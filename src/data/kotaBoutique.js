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
    maxExtra: 10, // au-delà de +10 produits : pack Boutique
    payment: "100 % à la commande",
    tagline: "Pour lancer un premier produit, proprement.",
    features: [
      "1 produit importé",
      "Thème Shopify personnalisé à tes couleurs",
      "Logo typographique simple",
      "Configuration du paiement, modèles de pages légales et connexion du domaine",
      "Bandeau cookies Shopify configuré",
      "Vidéo de prise en main",
      "1 tour de retouches",
      "Livrée 72 h après réception de tes éléments",
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
      "Configuration du paiement, modèles de pages légales et connexion du domaine",
      "Bandeau cookies Shopify configuré",
      "App d'avis + pixel TikTok installé avec ton bandeau cookies",
      "Vidéo de prise en main",
      "2 tours de retouches",
      "Livrée 5 jours après réception de tes éléments",
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
      "Configuration du paiement, modèles de pages légales et connexion du domaine",
      "Bandeau cookies Shopify configuré",
      "App d'avis + pixel TikTok installé avec ton bandeau cookies",
      "3 vidéos produit prêtes à poster",
      "Vidéo de prise en main + appel de 30 min",
      "3 tours de retouches",
      "Livrée 10 jours après réception de tes éléments",
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
  {
    id: "express",
    label: "Express 24 h",
    price: 29,
    note: "Pack Lancement uniquement, jusqu'à +10 produits",
    onlyFor: ["lancement"],
    maxExtra: 10,
  },
  { id: "video1", label: "1 vidéo produit prête à poster", price: 49, group: "video" },
  { id: "video3", label: "Pack 3 vidéos produit", price: 129, group: "video" },
  { id: "tiktokshop", label: "TikTok Shop connecté", price: 79 },
  { id: "traduction", label: "Traduction de la boutique (1 langue)", price: 39 },
  /* Logo : prix selon le pack (le pack Boutique inclut déjà un logo pro ->
     seule la mini charte est proposée ; le pack Marque inclut tout). */
  {
    id: "logo",
    label: "Logo pro + mini charte",
    price: 89,
    onlyFor: ["lancement", "boutique"],
    variants: { boutique: { label: "Mini charte (palette + typos)", price: 49 } },
  },
  { id: "mail", label: "Mail pro configuré", price: 19 },
  { id: "coaching", label: "Coaching lancement (1 h)", price: 59 },
];

/* Option telle que proposée pour un pack donné (libellé/prix selon le pack),
   ou null si elle n'est pas disponible pour ce pack / ce nombre de produits. */
export function optionFor(option, packId, extraQty = 0) {
  if (option.onlyFor && !option.onlyFor.includes(packId)) return null;
  if (option.maxExtra != null && extraQty > option.maxExtra) return null;
  return { ...option, ...(option.variants?.[packId] || {}) };
}

/* Délai affiché, compté à réception de tous les éléments :
   Lancement 72 h (24 h en Express) ; Boutique 5 jours ; Marque 10 jours ;
   + 2 jours ouvrés par tranche de 50 produits en plus au-delà de 50 ;
   + 2 jours ouvrés si fiches premium sur plus de 25 produits. */
export function computeDelay({ packId, extraQty = 0, premiumCount = 0, express = false }) {
  const pack = boutiquePacks.find((p) => p.id === packId);
  const base = packId === "lancement" && express ? "24 h" : pack.delay;
  let extraDays = 0;
  if (extraQty > 50) extraDays += Math.ceil((extraQty - 50) / 50) * 2;
  if (premiumCount > 25) extraDays += 2;
  return {
    base,
    extraDays,
    label: extraDays ? `${base} + ${extraDays} jours ouvrés` : base,
  };
}

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
    note: "Tu crées ton compte Shopify toi-même (on te guide) : tu profites de l'offre de Shopify du moment (souvent 1 € / mois pendant 3 mois), puis environ 36 € / mois en Basic.",
  },
  {
    label: "Frais par vente (Shopify Payments)",
    price: "≈ 1,5 à 2,9 % + 0,25 €",
    note: "Environ 1,5 % à 2,9 % + 0,25 € selon la carte, voir la page tarifs de Shopify.",
    href: "https://www.shopify.com/fr/tarifs",
  },
  { label: "Nom de domaine", price: "≈ 10 à 15 € / an", note: "Payé au registraire, à ton nom." },
  { label: "Apps payantes", price: "si tu en veux", note: "Facultatif, selon les fonctions que tu veux ajouter." },
  { label: "Publicité (TikTok, Meta…)", price: "ton budget", note: "Facultatif. Tu décides combien et quand." },
];

export const formatEuro = (n) => `${n.toLocaleString("fr-FR").replace(/ | /g, " ")} €`;
