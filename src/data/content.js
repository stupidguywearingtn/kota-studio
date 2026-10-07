/* ============================================================================
   KOTA STUDIO — CONTENU CENTRALISÉ
   Modifie ce fichier pour changer TOUT le texte du site (titres, prix, liens…)
   sans toucher au code des composants.
   Les icônes utilisent la syntaxe Iconify (ex: "solar:phone-linear").
   ============================================================================ */

/* -- Identité / Navigation ------------------------------------------------- */
export const brand = {
  name: "Kota",          // 1re partie du logo
  suffix: "Studio",      // 2e partie du logo
  // un point doré sépare visuellement les deux mots
};

export const nav = {
  links: [
    { label: "Ce qu'on fait", href: "#ce-quon-fait" },
    { label: "Réalisations", href: "#realisations" },
    { label: "Process", href: "#process" },
    { label: "Offres", href: "#offre" },
    { label: "FAQ", href: "#faq" },
  ],
  cta: { label: "Réserver un appel", href: "#contact" },
};

/* -- 1. HERO --------------------------------------------------------------- */
export const hero = {
  // true = titre en MAJUSCULES (plus de punch), false = minuscules.
  uppercase: true,
  badge: "Studio de création de sites web · Genève & Haute-Savoie",
  // Le titre s'affiche : "Un site qui <MOT>" — <MOT> tourne en boucle.
  titleBefore: "Un ",
  outlineWord: "site",          // mot en effet texte-contour
  titleMiddle: " qui ",
  words: ["vend", "convertit", "attire", "fidélise", "performe"],
  subtitle:
    "On conçoit et on code des sites sur-mesure, pensés pour transformer vos visiteurs en clients. Basés à Saint-Julien-en-Genevois, on travaille partout en France et en Suisse.",
  primaryCta: { label: "Réserver un appel", href: "#contact" },
  secondaryCta: { label: "Voir nos offres", href: "#offre" },
  // Mini-dashboard animé (colonne droite). 4 paliers mensuels : la barre
  // monte, son % se compte, la courbe dorée se dessine. height = % de hauteur.
  dashboard: {
    label: "Performance",
    metricLabel: "de conversions",
    months: [
      { label: "Mois 1", pct: 24, height: 26 },
      { label: "Mois 2", pct: 76, height: 46 },
      { label: "Mois 3", pct: 142, height: 68 },
      { label: "Mois 4", pct: 218, height: 86 },
    ],
    note: "Score 99/100",
  },
};

/* -- 2. MARQUEE services + logos clients ----------------------------------- */
export const marquee = {
  services: [
    "Création de sites",
    "Landing pages",
    "Refonte",
    "Design",
    "SEO",
    "Sur-mesure",
  ],
};

export const logos = {
  label: "Ils nous font confiance",
  // Vrais clients livrés (noms en texte, en attendant les logos vectoriels).
  items: ["Tel & Cash", "Markus Immobilier", "Sensoria", "Margaux CDR", "HCE BTP", "Phone Lab", "Emir Wealth"],
};

/* -- 3. CE QU'ON FAIT ------------------------------------------------------ */
export const whatWeDo = {
  tag: "Ce qu'on fait",
  title: "Deux formules.",
  highlight: "Zéro template.",
  subtitle: "Une page qui va droit au but, ou un site complet qui porte toute votre activité. Dans les deux cas : codé à la main, pensé pour le téléphone.",
  cards: [
    {
      key: "landing",
      theme: "paper",
      num: "01",
      label: "Droit au but",
      title: "Landing page",
      price: "dès 790 €",
      text: "Une seule page, pensée pour une seule action : qu'on vous appelle, qu'on réserve, qu'on achète.",
      points: [
        "1 page, 1 objectif, 1 bouton qui convertit",
        "Idéale pour une offre, un lancement, une pub",
        "Livrée en 14 jours",
      ],
      video: "/illus/il-landing",
      bg: "#E3E1D8",
      cta: { label: "Je veux une landing", href: "#contact" },
    },
    {
      key: "site",
      theme: "mat",
      num: "02",
      label: "Le grand jeu",
      title: "Site sur-mesure",
      price: "dès 1 290 €",
      text: "Plusieurs pages pour toute votre activité : services, réalisations, équipe, blog, contact. Pensé pour Google et pour durer.",
      points: [
        "Autant de pages que votre activité en demande",
        "Espace admin pour modifier vos textes et photos",
        "SEO local + visibilité dans les IA inclus",
      ],
      video: "/illus/il-site",
      bg: "#1D4537",
      cta: { label: "Je veux un site complet", href: "#contact" },
    },
  ],
};

/* -- 4. NOS PROMESSES (fond encre) ----------------------------------------- */
export const promises = {
  tag: "Nos promesses",
  // big + short = version courte de l'accueil ; title + text = version longue
  // reprise par les pages guides (ne pas supprimer).
  items: [
    {
      big: "14 j",
      short: "de l'appel au site en ligne",
      title: "Livraison en 14 jours",
      text: "Un délai clair annoncé dès le départ. Vous savez exactement quand votre site sera en ligne.",
    },
    {
      big: "∞",
      short: "révisions, jusqu'à ce que ça vous plaise",
      title: "Révisions illimitées",
      text: "Aucune limite. On ajuste jusqu'à ce que vous soyez 100% satisfait de votre site.",
    },
    {
      big: "1 équipe",
      short: "joignable à chaque étape",
      title: "Une équipe à votre disposition",
      text: "Du premier appel à la mise en ligne, on reste joignables et impliqués à chaque étape.",
    },
    {
      big: "0",
      short: "fausse promesse sur Google",
      title: "Une base SEO solide, sans fausses promesses",
      text: "On pose les bonnes fondations techniques dès le départ (structure, vitesse, contenu). On ne vous vendra jamais un classement Google garanti : personne ne peut sérieusement s'engager là-dessus.",
    },
  ],
};

/* -- 5. NOS RÉALISATIONS --------------------------------------------------- */
export const work = {
  tag: "Nos réalisations",
  titleBefore: "Nos projets",
  titleHighlight: "préférés", // souligné doré
  cardCta: "Voir le projet",
};

/* Les 4 projets du portfolio.
   - cover : aperçu affiché sur la carte (fichier dans public/realisations/).
   - liveUrl : lien du vrai site en ligne ("#" = pas encore de lien public).
   - home: false = projet gardé en page, mais absent de la grille d'accueil.
   - intro / defi / approche / resultat / recette / shots : contenu des pages
     projet, en placeholder "Bientôt disponible" pour l'instant. */
export const projects = [
  {
    slug: "tel-and-cash",
    name: "Tel & Cash",
    sector: "E-commerce — smartphones reconditionnés",
    badge: "E-commerce",
    year: "2026",
    cover: "/realisations/site-6.webp",
    liveUrl: "https://www.telandcash.fr",
    intro: "Bientôt disponible",
    defi: "Bientôt disponible",
    approche: "Bientôt disponible",
    resultat: "Bientôt disponible",
    recette: ["Bientôt disponible", "Bientôt disponible", "Bientôt disponible"],
    shots: ["/realisations/site-6.webp"],
  },
  {
    slug: "markus-immobilier",
    name: "Markus Immobilier",
    sector: "Agence immobilière premium",
    badge: "Immobilier",
    year: "2026",
    cover: "/realisations/site-5.webp",
    liveUrl: "https://www.markusimmobilier.fr",
    intro: "Bientôt disponible",
    defi: "Bientôt disponible",
    approche: "Bientôt disponible",
    resultat: "Bientôt disponible",
    recette: ["Bientôt disponible", "Bientôt disponible", "Bientôt disponible"],
    shots: ["/realisations/site-5.webp"],
  },
  {
    slug: "hce-btp",
    name: "HCE BTP",
    sector: "Enrobé & travaux publics — Jura & Ain",
    badge: "BTP",
    year: "2026",
    cover: "/realisations/site-hce.webp",
    liveUrl: "https://www.hcetp.com",
    intro: "Bientôt disponible",
    defi: "Bientôt disponible",
    approche: "Bientôt disponible",
    resultat: "Bientôt disponible",
    recette: ["Bientôt disponible", "Bientôt disponible", "Bientôt disponible"],
    shots: ["/realisations/site-hce.webp"],
  },
  {
    slug: "sensoria",
    name: "Sensoria",
    sector: "Expérience immersive — escape game",
    badge: "Expérience",
    year: "2026",
    cover: "/realisations/site-1.webp",
    liveUrl: "#",
    home: false, // pas encore de lien public : gardé en page projet, retiré de la grille d'accueil
    intro: "Bientôt disponible",
    defi: "Bientôt disponible",
    approche: "Bientôt disponible",
    resultat: "Bientôt disponible",
    recette: ["Bientôt disponible", "Bientôt disponible", "Bientôt disponible"],
    shots: ["/realisations/site-1.webp"],
  },
  {
    slug: "margaux-cdr",
    name: "Margaux CDR",
    sector: "Soins du corps — beauté",
    badge: "Beauté",
    year: "2026",
    cover: "/realisations/site-3.webp",
    liveUrl: "https://margauxcdr.com",
    intro: "Bientôt disponible",
    defi: "Bientôt disponible",
    approche: "Bientôt disponible",
    resultat: "Bientôt disponible",
    recette: ["Bientôt disponible", "Bientôt disponible", "Bientôt disponible"],
    shots: ["/realisations/site-3.webp"],
  },
];

/* Libellés de la page projet (architecture en place, contenu à compléter). */
export const projectPage = {
  back: "Revenir au portfolio",
  liveCta: "Voir le site en ligne",
  comingSoon: "Bientôt disponible",
  sectionTitles: {
    defi: "Le défi",
    approche: "Notre approche",
    resultat: "Le résultat",
    recette: "La recette Kota",
  },
  sticky: {
    title: "C'est à votre tour ?",
    text: "On peut concevoir le même type de site pour votre marque. Parlons de votre projet.",
    primary: { label: "Réserver un appel", href: "/#contact" },
    secondary: { label: "Découvrir Kota Studio", href: "/" },
  },
};

/* -- 6. NOTRE PROCESS (fond encre, signature) ------------------------------ */
export const process = {
  tag: "Comment ça se passe",
  title: "De l'appel à votre site en ligne,",
  highlight: "en 5 étapes.",
  subtitle: "Un déroulé clair en 5 étapes, de l'appel découverte à la mise en ligne en 14 jours.",
  steps: [
    {
      day: "Jour 1",
      title: "On s'appelle",
      text: "15 minutes pour comprendre votre activité, vos clients et ce que vous aimez. Gratuit, sans engagement.",
    },
    {
      day: "Jour 2",
      title: "Devis clair, acompte de 50 %",
      text: "Un prix fixe, écrit noir sur blanc. L'acompte lance le projet, le solde se règle à la livraison.",
    },
    {
      day: "Jours 3 à 6",
      title: "Votre maquette",
      text: "On dessine votre site. Vous validez le style avant la moindre ligne de code.",
    },
    {
      day: "Jours 7 à 13",
      title: "On code, vous ajustez",
      text: "Développé à la main, écran par écran. Vous demandez, on ajuste, sans limite de révisions.",
    },
    {
      day: "Jour 14",
      title: "Mise en ligne",
      text: "Domaine, Google, visibilité IA et prise en main de votre espace admin. Votre site est à vous.",
    },
  ],
};

/* -- 7. TÉMOIGNAGES -------------------------------------------------------- */
export const testimonials = {
  tag: "Témoignages",
  title: "Ce qu'on dira bientôt de nous",
  placeholderQuote: "Avis à venir",
  items: [
    { name: "Nom du client", activity: "Activité, ville" },
    { name: "Nom du client", activity: "Activité, ville" },
    { name: "Nom du client", activity: "Activité, ville" },
  ],
};

/* -- 8. OFFRE / PRIX ------------------------------------------------------- */
export const offer = {
  tag: "Nos offres",
  title: "Un prix clair, tout compris",
  cta: { label: "Réserver un appel", href: "#contact" },
  // Colonne gauche : 2 cartes empilées
  leftCards: [
    {
      icon: "solar:lightbulb-bolt-linear",
      title: "Recherche & stratégie",
      points: [
        "Analyse de votre marché et de vos concurrents",
        "Définition de l'arborescence et des objectifs",
        "Recommandations de design et de contenu",
      ],
    },
    {
      icon: "solar:code-square-linear",
      title: "Développement sur-mesure",
      points: [
        "100% codé, aucun template",
        "Espace admin pour modifier votre contenu",
        "Performance et responsive soignés",
      ],
    },
  ],
  // Colonne droite haute : galerie 2 rangées (haut -> gauche, bas -> droite).
  // Déposez vos captures dans public/realisations/ (un placeholder s'affiche
  // tant qu'une image est absente).
  gallery: {
    top: [
      "/realisations/site-1.webp",
      "/realisations/site-2.webp",
      "/realisations/site-3.webp",
    ],
    bottom: [
      "/realisations/site-4.webp",
      "/realisations/site-5.webp",
      "/realisations/site-6.webp",
    ],
  },
  // Colonne droite basse : prix + inclus + extras
  plans: [
    { name: "Landing page", price: "à partir de 790 €" },
    { name: "Site sur-mesure", price: "à partir de 1 290 €" },
  ],
  includedTitle: "Ce qui est inclus",
  included: [
    "Site 100% codé sur-mesure",
    "Design responsive (mobile / tablette / desktop)",
    "Espace admin pour modifier votre contenu",
    "Optimisation des performances",
    "Révisions illimitées",
    "Livraison en 14 jours",
  ],
  extrasTitle: "Options en plus",
  extras: [
    { label: "Langue supplémentaire", price: "+390 €" },
    { label: "Logo & branding", price: "+490 €" },
    { label: "Rédaction de contenu", price: "+290 €" },
    { label: "SEO avancé", price: "sur devis" },
    { label: "Maintenance mensuelle", price: "sur devis" },
  ],
};

/* -- 9. CTA FINAL + CONTACT ------------------------------------------------ */
export const finalCta = {
  badge: "Parlons de votre projet",
  // Le DERNIER mot du titre reçoit automatiquement le soulignement doré.
  title: "Votre futur site commence par un appel",
  subtitle:
    "15 minutes pour comprendre votre projet et voir comment on peut vous aider. Sans engagement.",
  cta: { label: "Réserver un appel", href: "#contact" },
  ctaNote: "15 minutes, sans engagement",

  /* -- Calendrier Calendly (embed inline) -----------------------------------
     👉 TON LIEN CALENDLY : colle ici l'URL de ton type d'événement.
     Ex: "https://calendly.com/ton-compte/30min".
     Tant que ce champ est vide (""), un joli placeholder s'affiche à la place
     (le site ne paraît jamais cassé). Dès qu'un lien est présent, le widget
     Calendly officiel s'affiche directement dans la page, aux couleurs du site. */
  calendlyUrl: "https://calendly.com/yanisouammou063/30min",
  calendarPlaceholder: "Calendrier de réservation",
  calendarHint: "Choisissez le créneau qui vous arrange, on s'occupe du reste.",
  calendarBadge: "Réponse sous 24 h",

  /* -- Encart "Vous êtes pressé ?" sous le calendrier (WhatsApp direct) ------ */
  urgent: {
    title: "Vous êtes pressé ?",
    text: "Vous voulez une réponse immédiate ? Écrivez-nous directement sur WhatsApp, on vous répond au plus vite.",
    button: "Nous écrire sur WhatsApp",
  },
};

/* -- Bouton WhatsApp flottant (présent sur toute la page) ------------------ */
export const whatsapp = {
  // ⚠️ Remplace NUMERO par ton numéro au format international SANS "+" ni espaces.
  number: "33615802619",
  // Message pré-rempli à l'ouverture de WhatsApp.
  message:
    "Bonjour, je viens de votre site Kota Studio, j'aimerais des infos sur la création de mon site.",
  label: "Discuter sur WhatsApp",
};

/* -- Pages légales (Mentions légales + Politique de confidentialité) --------
   ⚠️ À COMPLÉTER : remplace chaque valeur entre [crochets] par tes vraies infos.
   Ces champs alimentent les 2 pages légales (/mentions-legales et
   /politique-de-confidentialite). Les valeurs entre [crochets] apparaissent
   surlignées en doré sur les pages pour que tu repères ce qu'il reste à remplir.
   L'hébergeur est déjà pré-rempli (Vercel). */
export const legal = {
  updatedAt: "07/10/2026",
  company: {
    name: "Kota Studio — Yanis Ouammou, entrepreneur individuel",
    legalForm: "Entreprise individuelle (micro-entreprise)",
    siret: "SIREN 901 733 022",
    rcs: "Non applicable (entreprise individuelle)",
    capital: "Non applicable (entreprise individuelle)",
    vat: "TVA non applicable, art. 293 B du CGI",
    address: "13 rue du Docteur Paluel, 74160 Saint-Julien-en-Genevois, France",
    email: "yanisouammou063@gmail.com",
    phone: "+33 6 15 80 26 19",
    director: "Yanis Ouammou",
  },
  // Hébergeur du site — pré-rempli car le site est déployé sur Vercel.
  host: {
    name: "Vercel Inc.",
    address: "340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis",
    contact: "https://vercel.com",
  },
};

/* -- Footer ---------------------------------------------------------------- */
export const footer = {
  tagline:
    "Studio de création de sites web sur-mesure. On code, on soigne, on livre.",
  columns: [
    {
      title: "Navigation",
      links: [
        { label: "Ce qu'on fait", href: "#ce-quon-fait" },
        { label: "Réalisations", href: "#realisations" },
        { label: "Process", href: "#process" },
        { label: "Offres", href: "#offre" },
        { label: "FAQ", href: "#faq" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Site sur-mesure", href: "#ce-quon-fait" },
        { label: "Landing page", href: "#ce-quon-fait" },
        { label: "Refonte", href: "#ce-quon-fait" },
        { label: "SEO", href: "#ce-quon-fait" },
      ],
    },
    {
      title: "Près de chez vous",
      links: [
        { label: "Site internet à Saint-Julien-en-Genevois", href: "/creation-site-internet-saint-julien-en-genevois" },
        { label: "Site internet à Annecy", href: "/creation-site-internet-annecy" },
        { label: "Agence web à Annemasse", href: "/agence-web-annemasse" },
        { label: "Agence web à Lyon", href: "/agence-web-lyon" },
        { label: "Création & refonte de site en Haute-Savoie", href: "/creation-refonte-site-internet-haute-savoie" },
      ],
    },
    {
      title: "Guides",
      links: [
        { label: "Combien coûte un site ?", href: "/combien-coute-un-site-internet" },
        { label: "Comment choisir une agence web ?", href: "/comment-choisir-une-agence-web" },
        { label: "Quand refaire son site internet ?", href: "/quand-refaire-son-site-internet" },
        { label: "Site sur-mesure ou WordPress / Wix ?", href: "/site-sur-mesure-ou-wordpress-wix" },
        { label: "Quelles pages pour un site vitrine ?", href: "/quelles-pages-pour-un-site-vitrine" },
        { label: "Qui possède mon site et mon domaine ?", href: "/nom-de-domaine-et-propriete-du-site" },
        { label: "Site internet ou réseaux sociaux ?", href: "/site-internet-ou-reseaux-sociaux" },
        { label: "Apparaître dans ChatGPT et les IA", href: "/apparaitre-dans-chatgpt-et-ia-site-local" },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: "Réserver un appel", href: "#contact" },
        { label: "WhatsApp", href: "#contact" },
        { label: "yanisouammou063@gmail.com", href: "mailto:yanisouammou063@gmail.com" },
      ],
    },
  ],
  legal: [
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
  ],
  copyright: "© 2026 Kota Studio. Tous droits réservés.",
};
