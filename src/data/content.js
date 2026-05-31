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
  ],
  cta: { label: "Réserver un appel", href: "#contact" },
};

/* -- 1. HERO --------------------------------------------------------------- */
export const hero = {
  // true = titre en MAJUSCULES (plus de punch), false = minuscules.
  uppercase: true,
  badge: "Studio de création de sites web",
  // Le titre s'affiche : "Un site qui <MOT>" — <MOT> tourne en boucle.
  titleBefore: "Un ",
  outlineWord: "site",          // mot en effet texte-contour
  titleMiddle: " qui ",
  words: ["vend", "convertit", "attire", "fidélise", "performe"],
  subtitle:
    "On conçoit et on code des sites sur-mesure, pensés pour transformer vos visiteurs en clients. Pas de template, que du fait-main.",
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
  label: "Ils nous feront confiance",
  // Placeholders — remplace par tes vrais logos (texte ou <img>).
  items: ["LOGO", "LOGO", "LOGO", "LOGO", "LOGO", "LOGO"],
};

/* -- 3. CE QU'ON FAIT ------------------------------------------------------ */
export const whatWeDo = {
  tag: "Ce qu'on fait",
  titleStrong: "Deux façons",
  titleLight: "de vous démarquer",
  cards: [
    {
      theme: "creme", // carte crème
      label: "Le grand jeu",
      title: "Site sur-mesure",
      text: "Un site complet, codé à la main, à votre image. Structure, design et performances pensés pour durer.",
      cta: { label: "Réserver un appel", href: "#contact" },
      browser: { url: "votre-marque.fr", accent: "or" },
    },
    {
      theme: "encre", // carte encre / sombre
      label: "Droit au but",
      title: "Landing page",
      text: "Une page unique, redoutablement efficace, taillée pour une offre et un seul objectif : convertir.",
      cta: { label: "Réserver un appel", href: "#contact" },
      browser: { url: "votre-offre.fr", accent: "or" },
    },
  ],
};

/* -- 4. NOS PROMESSES (fond encre) ----------------------------------------- */
export const promises = {
  tag: "Nos promesses",
  title: "Ce sur quoi on s'engage",
  items: [
    {
      icon: "solar:refresh-circle-linear",
      title: "Révisions illimitées",
      text: "Aucune limite. On ajuste jusqu'à ce que vous soyez 100% satisfait de votre site.",
    },
    {
      icon: "solar:calendar-mark-linear",
      title: "Livraison en 14 jours",
      text: "Un délai clair annoncé dès le départ. Vous savez exactement quand votre site sera en ligne.",
    },
    {
      icon: "solar:users-group-rounded-linear",
      title: "Une équipe à votre disposition",
      text: "Du premier appel à la mise en ligne, on reste joignables et impliqués à chaque étape.",
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
   - liveUrl : lien du vrai site (À REMPLIR — laisser "#" en attendant).
   - intro / defi / approche / resultat / recette / shots : contenu des pages
     projet, en placeholder "Bientôt disponible" pour l'instant. */
export const projects = [
  {
    slug: "tel-and-cash",
    name: "Tel & Cash",
    sector: "E-commerce — smartphones reconditionnés",
    badge: "E-commerce",
    year: "2026",
    cover: "/realisations/site-6.png",
    liveUrl: "#",
    intro: "Bientôt disponible",
    defi: "Bientôt disponible",
    approche: "Bientôt disponible",
    resultat: "Bientôt disponible",
    recette: ["Bientôt disponible", "Bientôt disponible", "Bientôt disponible"],
    shots: ["/realisations/site-6.png"],
  },
  {
    slug: "markus-immobilier",
    name: "Markus Immobilier",
    sector: "Agence immobilière premium",
    badge: "Immobilier",
    year: "2026",
    cover: "/realisations/site-5.png",
    liveUrl: "#",
    intro: "Bientôt disponible",
    defi: "Bientôt disponible",
    approche: "Bientôt disponible",
    resultat: "Bientôt disponible",
    recette: ["Bientôt disponible", "Bientôt disponible", "Bientôt disponible"],
    shots: ["/realisations/site-5.png"],
  },
  {
    slug: "sensoria",
    name: "Sensoria",
    sector: "Expérience immersive — escape game",
    badge: "Expérience",
    year: "2026",
    cover: "/realisations/site-1.png",
    liveUrl: "#",
    intro: "Bientôt disponible",
    defi: "Bientôt disponible",
    approche: "Bientôt disponible",
    resultat: "Bientôt disponible",
    recette: ["Bientôt disponible", "Bientôt disponible", "Bientôt disponible"],
    shots: ["/realisations/site-1.png"],
  },
  {
    slug: "margaux-cdr",
    name: "Margaux CDR",
    sector: "Soins du corps — beauté",
    badge: "Beauté",
    year: "2026",
    cover: "/realisations/site-3.png",
    liveUrl: "#",
    intro: "Bientôt disponible",
    defi: "Bientôt disponible",
    approche: "Bientôt disponible",
    resultat: "Bientôt disponible",
    recette: ["Bientôt disponible", "Bientôt disponible", "Bientôt disponible"],
    shots: ["/realisations/site-3.png"],
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
  tag: "Notre process",
  // Titre sur 2 lignes : ligne 1 normale, ligne 2 (titleHighlight) en doré.
  titleLine1: "De l'idée au site en ligne,",
  titleHighlight: "en 14 jours",
  subtitle: "Un déroulé clair, étape par étape. Vous savez toujours où on en est.",
  steps: [
    {
      day: "Jour 1",
      title: "Appel découverte",
      text: "On récolte toutes les infos sur votre projet, vos objectifs et votre univers.",
      icons: ["logos:whatsapp-icon", "logos:google-meet"],
    },
    {
      day: "Jour 2",
      title: "Questionnaire structuré",
      text: "Un formulaire guidé pour cadrer le contenu, le ton et les besoins précis.",
      icons: ["logos:typeform-icon", "logos:notion-icon"],
    },
    {
      day: "Jours 3-6",
      title: "La magie opère",
      text: "Design et développement : on donne vie à votre site, écran par écran.",
      icons: ["logos:figma", "simple-icons:webflow", "logos:framer"],
    },
    {
      day: "Jour 7",
      title: "Présentation de votre V1",
      text: "On vous présente une première version complète, navigable et fonctionnelle.",
      icons: ["logos:google-meet"],
    },
    {
      day: "Jours 8-13",
      title: "On peaufine ensemble",
      text: "Retours, ajustements, finitions. On affine jusqu'au moindre détail.",
      icons: ["logos:figma", "logos:framer"],
    },
    {
      day: "Jour 14",
      title: "Livraison de votre site",
      text: "Mise en ligne, prise en main de l'espace admin. Votre site est à vous.",
      icons: ["solar:rocket-2-bold"],
      gold: true, // bloc doré plein — l'aboutissement
    },
  ],
  badges: [
    "SEO",
    "Webflow",
    "Framer",
    "Design UX/UI",
    "Conversion",
    "Responsive",
    "Sur-mesure",
    "Performance",
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
      "/realisations/site-1.png",
      "/realisations/site-2.png",
      "/realisations/site-3.png",
    ],
    bottom: [
      "/realisations/site-4.png",
      "/realisations/site-5.png",
      "/realisations/site-6.png",
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
  number: "33668823396",
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
  updatedAt: "[JJ/MM/2026]",
  company: {
    name: "[Nom de l'entreprise / Kota Studio]",
    legalForm: "[Forme juridique — ex : micro-entreprise / SASU]",
    siret: "[Numéro SIRET]",
    rcs: "[RCS + ville d'immatriculation — si société]",
    capital: "[Capital social — si société]",
    vat: "[N° TVA intracommunautaire — si applicable]",
    address: "[Adresse complète du siège]",
    email: "[adresse e-mail de contact]",
    phone: "+33 6 68 82 33 96",
    director: "[Nom du directeur / de la directrice de la publication]",
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
      title: "Contact",
      links: [
        { label: "Réserver un appel", href: "#contact" },
        { label: "WhatsApp", href: "#contact" },
        { label: "hello@kota.studio", href: "mailto:hello@kota.studio" },
      ],
    },
  ],
  legal: [
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
  ],
  copyright: "© 2026 Kota Studio. Tous droits réservés.",
};
