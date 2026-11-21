import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupReveals } from "../lib/reveal";
import {
  buildShopifyStoreJsonLd,
  shopifyStoreFaqs,
  SHOPIFY_STORE_PATH,
  PAGE_SCHEMA_ATTR,
} from "../lib/jsonld";
import { whatsapp } from "../data/content";
import {
  KOTA_BOUTIQUE_SIREN,
  boutiquePacks,
  extraProductTiers,
  boutiqueOptions,
  boutiqueOtherPrices,
  boutiqueFollowUp,
  boutiqueClientCosts,
  PREMIUM_PER_PRODUCT,
  formatEuro,
} from "../data/kotaBoutique";
import Logo from "../components/Logo";
import Button from "../components/Button";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import "./ShopifyStorePage.css";

/* ============================================================================
   KOTA BOUTIQUE — /boutique-shopify
   Landing de vente des boutiques Shopify clé en main (offre du 21/11/2026).
   Page volontairement DISCRÈTE : pas de lien dans la navbar ni le hero de
   l'accueil, seulement dans le footer. Elle est servie par le trafic TikTok
   (mobile d'abord). Prix : src/data/kotaBoutique.js (source unique, reprise
   par le JSON-LD). FAQ : shopifyStoreFaqs (src/lib/jsonld.js), texte affiché
   = texte du schema FAQPage, mot pour mot.
   Ton : tutoiement, phrases courtes. Zéro faux avis, zéro prix barré, zéro
   fausse urgence, zéro promesse de revenus.
   ============================================================================ */

const SITE_URL = "https://kotastudio.fr";
const META_TITLE = "Boutique Shopify clé en main dès 79 € | Kota Boutique";
const META_DESCRIPTION =
  "Ta boutique Shopify clé en main dès 79 € : paiement, pages légales et domaine inclus, boutique à ton nom, livrée en 72 h. Entreprise française, prix affichés, zéro promesse de ventes.";

/* Paiement en ligne : pas encore actif (Stripe pas encore validé). Quand les
   liens de paiement Stripe existeront, les renseigner ici (un par pack) : le
   simulateur pourra alors proposer « Payer en ligne » en plus de WhatsApp.
   Tant que c'est vide, la commande passe uniquement par WhatsApp. */
const STRIPE_LINKS = {
  // lancement: "https://buy.stripe.com/...",
  // boutique: "https://buy.stripe.com/...",
  // marque: "https://buy.stripe.com/...",
};

/* SIREN avec espaces insécables : ne se coupe jamais en fin de ligne. */
const SIREN = KOTA_BOUTIQUE_SIREN.replace(/ /g, "\u00a0");

const fmt = (n) =>
  Number.isInteger(n)
    ? formatEuro(n)
    : `${n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/ | /g, " ")} €`;

const waLink = (text) => `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(text)}`;
const WA_GENERIC = waLink(
  "Salut Kota, je viens de ta page Kota Boutique. J'aimerais des infos pour ma boutique Shopify."
);

/* ---------------------------------------------------------------------------
   Téléphone + boutique démo, 100 % HTML/CSS (aucune image, aucune vraie marque)
   --------------------------------------------------------------------------- */
function DemoStorePhone() {
  return (
    <div className="kb-phone" aria-hidden="true">
      <div className="hero-phone-frame">
        <div className="kb-screen">
          <span className="island" />
          <div className="kb-status">
            <span>9:41</span>
            <span>●●● ▮</span>
          </div>
          <div className="kb-ann">Livraison offerte dès 49 €</div>
          <div className="kb-nav">
            <span className="ic">≡</span>
            <span className="brand">ARGILE</span>
            <span className="ic bag">
              <iconify-icon icon="solar:bag-3-linear"></iconify-icon>
              <i>1</i>
            </span>
          </div>
          <div className="kb-hero">
            <span className="sun" />
            <span className="shelf" />
            <span className="tag">Nouveau</span>
            <div className="kb-vase">
              <span className="shadow" />
              <span className="body" />
              <span className="neck" />
              <span className="lip" />
            </div>
          </div>
          <div className="kb-prod">
            <div className="row">
              <span className="t">Vase Dune, grès</span>
              <span className="p">32,00 €</span>
            </div>
            <p className="sub">Fait main · pièce unique</p>
            <div className="kb-swatch">
              <i className="on" style={{ background: "#8E6B54" }} />
              <i style={{ background: "#E9DFD0" }} />
              <i style={{ background: "#3B4A3F" }} />
            </div>
            <div className="kb-cta">Ajouter au panier</div>
            <p className="kb-safe">Paiement sécurisé · Retour sous 14 jours</p>
          </div>
          <div className="kb-grid">
            <div className="a"><span className="mug" /></div>
            <div className="b"><span className="bowl" /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Page
   --------------------------------------------------------------------------- */
export default function ShopifyStorePage() {
  const mainRef = useRef(null);
  const navigate = useNavigate();

  /* ---- état du simulateur ---- */
  const [packId, setPackId] = useState("boutique");
  const [extraIdx, setExtraIdx] = useState(0);
  const [premium, setPremium] = useState(false);
  const [opts, setOpts] = useState([]);
  const [followUp, setFollowUp] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => setupReveals(), mainRef);
    const id = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => {
      ctx.revert();
      clearTimeout(id);
    };
  }, []);

  /* SEO : titre, meta description, canonical + JSON-LD (BreadcrumbList,
     Service/Offer, FAQPage). Même logique que les autres pages : le JSON-LD
     est aussi pré-rendu statiquement par scripts/generate-static-heads.mjs
     (même fonction buildShopifyStoreJsonLd). */
  useEffect(() => {
    const pageUrl = `${SITE_URL}${SHOPIFY_STORE_PATH}`;

    const prevTitle = document.title;
    document.title = META_TITLE;

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc ? metaDesc.getAttribute("content") : null;
    if (metaDesc) metaDesc.setAttribute("content", META_DESCRIPTION);

    const canonical = document.querySelector('link[rel="canonical"]');
    const prevCanonical = canonical ? canonical.getAttribute("href") : null;
    if (canonical) canonical.setAttribute("href", pageUrl);

    document.querySelectorAll(`script[${PAGE_SCHEMA_ATTR}]`).forEach((el) => el.remove());
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute(PAGE_SCHEMA_ATTR, "shopify-store");
    script.textContent = JSON.stringify(buildShopifyStoreJsonLd());
    document.head.appendChild(script);

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc !== null) metaDesc.setAttribute("content", prevDesc);
      if (canonical && prevCanonical !== null) canonical.setAttribute("href", prevCanonical);
      script.remove();
    };
  }, []);

  /* ---- calcul du simulateur ---- */
  const quote = useMemo(() => {
    const pack = boutiquePacks.find((p) => p.id === packId);
    const extra = extraProductTiers[extraIdx];
    const totalProducts = pack.includedProducts + extra.qty;
    // Fiches premium : sur tous les produits qui ne le sont pas déjà
    // (pack Marque : ses 50 fiches sont déjà premium -> seulement les produits en plus).
    const premiumCount = premium ? (pack.premiumIncluded ? extra.qty : totalProducts) : 0;
    const premiumCost = premiumCount * PREMIUM_PER_PRODUCT;
    const activeOpts = boutiqueOptions.filter(
      (o) => opts.includes(o.id) && (!o.onlyFor || o.onlyFor.includes(pack.id))
    );
    const optsCost = activeOpts.reduce((s, o) => s + o.price, 0);
    const total = pack.price + extra.price + premiumCost + optsCost;
    const express = activeOpts.some((o) => o.id === "express");
    const delay = express ? "24 h" : pack.delay;
    const split = pack.id === "marque";
    return { pack, extra, totalProducts, premiumCount, premiumCost, activeOpts, total, delay, split };
  }, [packId, extraIdx, premium, opts]);

  const toggleOpt = (o) =>
    setOpts((cur) => {
      if (cur.includes(o.id)) return cur.filter((x) => x !== o.id);
      // options d'un même groupe (vidéos) : une seule à la fois
      const others = o.group
        ? cur.filter((x) => boutiqueOptions.find((b) => b.id === x)?.group !== o.group)
        : cur;
      return [...others, o.id];
    });

  const orderText = useMemo(() => {
    const q = quote;
    const lines = [
      "Salut Kota, je veux commander ma boutique Shopify :",
      `- Pack ${q.pack.name} : ${fmt(q.pack.price)} (${q.pack.includedProducts} produit${q.pack.includedProducts > 1 ? "s" : ""} inclus)`,
    ];
    if (q.extra.qty) lines.push(`- ${q.extra.qty} produits en plus : ${fmt(q.extra.price)}`);
    if (q.premiumCount)
      lines.push(`- Fiches premium x ${q.premiumCount} : ${fmt(q.premiumCost)}`);
    q.activeOpts.forEach((o) => lines.push(`- ${o.label} : ${fmt(o.price)}`));
    lines.push(`Total : ${fmt(q.total)}${q.split ? ` (50 % à la commande : ${fmt(q.total / 2)})` : ""}`);
    if (followUp) lines.push(`+ Suivi mensuel : ${boutiqueFollowUp.monthly} €/mois`);
    lines.push(`Délai : ${q.delay} à réception de mes éléments`);
    lines.push("", "(Récap fait sur kotastudio.fr/boutique-shopify)");
    return lines.join("\n");
  }, [quote, followUp]);

  const goSimulator = (id) => {
    if (id) setPackId(id);
    navigate({ hash: "#simulateur" });
  };

  const stripeLink = STRIPE_LINKS[quote.pack.id];

  /* overflow-x-clip (et non hidden) : hidden créerait un conteneur de
     défilement et casserait le position:sticky du récap du simulateur. */
  return (
    <div ref={mainRef} className="relative overflow-x-clip">
      <main>
        {/* =========================== 1. HERO =========================== */}
        <section className="mat relative overflow-hidden">
          <div className="pointer-events-none absolute left-0 right-0 top-[76px] h-px bg-[#E8D66C]/60" aria-hidden="true" />
          <div className="pointer-events-none absolute bottom-0 top-0 left-[8%] hidden w-px bg-[#E8D66C]/40 sm:block" aria-hidden="true" />

          <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-6">
            <Logo onDark className="text-2xl" />
            <a
              href="#packs"
              className="btn-3d inline-flex items-center gap-2 rounded-xl bg-creme px-4 py-2 text-sm font-semibold text-encre"
            >
              Les packs
            </a>
          </header>

          <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-10 sm:px-6 lg:grid-cols-[1.12fr_.88fr] lg:gap-6 lg:pb-28 lg:pt-16">
            <div>
              <div className="mb-7 inline-flex -rotate-2 items-center gap-2 rounded-lg bg-creme px-3 py-2 font-mono text-[12px] uppercase tracking-[.12em] text-encre shadow-[3px_3px_0_#141714]">
                <i className="h-2 w-2 rounded-full bg-hot" aria-hidden="true" />
                Kota Boutique · par Kota Studio
              </div>

              <h1 className="font-display font-black uppercase leading-[.9] tracking-[-.05em] text-onmat text-[2.35rem] min-[400px]:text-[2.6rem] sm:text-[4rem] lg:text-[4.1rem] xl:text-[4.6rem]">
                <span className="block">Ta boutique</span>
                <span className="block">
                  <span className="hero-outline">Shopify.</span>
                </span>
                <span className="block">Clé en main.</span>
                <span className="kb-price-block">Dès 79 €</span>
              </h1>

              <p className="mt-8 max-w-[36ch] text-lg leading-relaxed text-onmat sm:text-xl">
                Tout ce qui est obligatoire est inclus. La boutique est à ton nom. Livrée en 72 h.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Button href="#packs" variant="primary">
                  Choisir mon pack
                </Button>
                <Button href={WA_GENERIC} variant="light" icon="mdi:whatsapp" target="_blank" rel="noopener noreferrer">
                  Poser une question
                </Button>
              </div>

              <ul className="mt-10 flex max-w-[620px] flex-col gap-x-6 gap-y-2.5 font-mono text-[12px] uppercase tracking-[.1em] text-onmat2 sm:flex-row sm:flex-wrap">
                <li>✦ Paiement + pages légales inclus</li>
                <li>✦ Boutique à ton nom</li>
                <li>✦ Entreprise française · SIREN{"\u00a0"}{SIREN}</li>
                <li>✦ Livrée en 72 h</li>
              </ul>
            </div>

            {/* Visuel : téléphone + boutique démo codée */}
            <div className="relative mx-auto w-full max-w-[440px] py-4">
              <span className="kb-sticker left-[2%] top-[6%] -rotate-6 sm:left-[4%]">Boutique démo</span>
              <DemoStorePhone />
              <div className="kb-checklist bottom-[1%] left-0 w-[150px] -rotate-3 sm:left-[-2%] sm:w-[168px]">
                <p>Inclus dès 79 €</p>
                <ul>
                  <li>Paiement</li>
                  <li>Pages légales</li>
                  <li>Domaine</li>
                </ul>
              </div>
              <div className="postit absolute right-0 top-[14%] z-20 w-[112px] rotate-[6deg] rounded-[3px] p-3 sm:right-[-2%] sm:w-[132px] sm:p-3.5">
                <p className="font-display text-[22px] font-black leading-none sm:text-[26px]">72 H</p>
                <p className="mt-1 text-[12px] font-medium leading-tight">à réception de tes éléments</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== 2. 37 € AILLEURS / 79 € ===================== */}
        <section className="k-paper relative">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:py-24">
            <header className="reveal max-w-4xl">
              <p className="k-eyebrow">Le vrai prix</p>
              <h2 className="k-h2 !text-[clamp(28px,5vw,60px)]">
                37 € affichés. <span className="k-hl">≈ 72 € réels.</span>
              </h2>
              <p className="mt-5 max-w-[58ch] text-lg text-taupe">
                Ailleurs, le paiement, les pages légales et le domaine sont « à prévoir séparément ». Chez Kota, ils sont dans les 79 €.
              </p>
            </header>

            <div className="kb-vs reveal mt-12">
              <div className="kb-bill else">
                <p className="who">Ailleurs · offre à 37 €</p>
                <p className="big">37 €</p>
                <ul>
                  <li>Boutique Shopify <b>37 €</b></li>
                  <li>Paiement configuré <b>à prévoir séparément</b></li>
                  <li>Pages légales <b>à prévoir séparément</b></li>
                  <li>Domaine connecté <b>à prévoir séparément</b></li>
                </ul>
                <div className="tot">
                  <span>Total réel</span>
                  <b>≈ 72 €</b>
                </div>
              </div>

              <div className="kb-vs-badge" aria-hidden="true">VS</div>

              <div className="kb-bill kota">
                <p className="who">Chez Kota · pack Lancement</p>
                <p className="big">79 €</p>
                <ul>
                  <li>Boutique Shopify à ton nom <b>inclus</b></li>
                  <li>Paiement configuré <b>inclus</b></li>
                  <li>Pages légales <b>incluses</b></li>
                  <li>Domaine connecté <b>inclus</b></li>
                </ul>
                <div className="tot">
                  <span>Total</span>
                  <b>79 €</b>
                </div>
              </div>
            </div>

            <p className="reveal mt-8 max-w-[62ch] text-[15px] text-taupe">
              Environ 7 € d'écart, et rien d'obligatoire à aller chercher toi-même. Comparaison indicative, faite sur des offres à 37 € vues en ligne en novembre 2026.
            </p>
          </div>
        </section>

        {/* =========================== 3. PACKS =========================== */}
        <section id="packs" className="mat relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:py-28">
            <header className="reveal max-w-5xl">
              <p className="k-eyebrow">Les packs</p>
              <h2 className="k-h2">
                3 packs. <span className="k-hl">Prix fixe.</span>
              </h2>
              <p className="mt-5 max-w-[60ch] text-lg text-onmat2">
                Paiement, pages légales et domaine dans les trois. Tu choisis selon ton nombre de produits et le niveau de finition.
              </p>
            </header>

            <div className="kb-plans reveal-stagger mt-14">
              {boutiquePacks.map((p) => {
                const variant = p.id === "lancement" ? "rc" : p.id === "boutique" ? "pi" : "cc";
                return (
                  <article key={p.id} className={`k-plan ${variant}`}>
                    {variant === "pi" && <span className="tape" />}
                    {variant === "pi" && <span className="h font-hand">Recommandé</span>}
                    {variant === "cc" ? (
                      <div className="flex items-center justify-between">
                        <span className="chipc" aria-hidden="true" />
                        <span className="nm text-onmat2">Pack {p.name}</span>
                      </div>
                    ) : (
                      <p className="nm">Pack {p.name}</p>
                    )}
                    <p className="pr">
                      {variant === "pi" ? (
                        <span className="k-ringed">
                          {formatEuro(p.price)}
                          <svg viewBox="0 0 240 90" preserveAspectRatio="none" fill="none" aria-hidden="true">
                            <path d="M40 10C95 0 205 2 228 26c16 18 4 44-36 54-60 14-160 10-182-14C-6 46 8 18 52 8" stroke="#C8412C" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                          </svg>
                        </span>
                      ) : (
                        formatEuro(p.price)
                      )}
                    </p>
                    <p className="tl">{p.tagline}</p>
                    <div className="meta">
                      <span>Livrée en {p.delay}</span>
                      <span>{p.id === "marque" ? "50 / 50" : "Payé à la commande"}</span>
                    </div>
                    {variant === "rc" && <div className="dash" />}
                    <ul>
                      {p.features.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                    <Button
                      variant={variant === "pi" ? "light" : variant === "cc" ? "primary" : "secondary"}
                      className="mt-2 w-full"
                      onClick={() => goSimulator(p.id)}
                    >
                      Choisir {p.name}
                    </Button>
                  </article>
                );
              })}
            </div>

            <p className="reveal mx-auto mt-12 max-w-[78ch] text-center text-[14px] leading-relaxed text-onmat2">
              Pages légales des 3 packs : modèles Shopify intégrés + formulaire de rétractation + checklist à valider. Délais comptés à réception de tous tes éléments ; en retard, l'express t'est remboursé. Prix nets, TVA non applicable (art. 293 B du CGI).
            </p>

            {/* Tarifs à la carte : repliés par défaut (le simulateur les reprend),
                mais présents dans le HTML pré-rendu pour les crawlers. */}
            <details className="kb-fold reveal mt-14">
              <summary>
                <span>Tous les prix à la carte</span>
                <span className="font-mono text-[11.5px] uppercase tracking-[.12em] text-onmat2">produits en plus · options</span>
              </summary>
            <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2">
              <div className="k-cmp kb-nowrap">
                <table className="!min-w-0">
                  <thead>
                    <tr>
                      <th>Produits en plus (import standard)</th>
                      <th className="text-right">Prix</th>
                    </tr>
                  </thead>
                  <tbody>
                    {extraProductTiers.filter((t) => t.qty).map((t) => (
                      <tr key={t.qty}>
                        <td>+{t.qty.toLocaleString("fr-FR").replace(/ | /g, " ")} produits</td>
                        <td>{formatEuro(t.price)}</td>
                      </tr>
                    ))}
                    <tr>
                      <td>Fiche premium (texte de vente relu, photos détourées fond uni, titre et description Google)</td>
                      <td>+{PREMIUM_PER_PRODUCT} € / produit</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="k-cmp kb-nowrap">
                <table className="!min-w-0">
                  <thead>
                    <tr>
                      <th>Options</th>
                      <th className="text-right">Prix</th>
                    </tr>
                  </thead>
                  <tbody>
                    {boutiqueOptions.map((o) => (
                      <tr key={o.id}>
                        <td>
                          {o.label}
                          {o.note ? <span className="text-onmat2"> · {o.note}</span> : null}
                        </td>
                        <td>{formatEuro(o.price)}</td>
                      </tr>
                    ))}
                    {boutiqueOtherPrices.map((o) => (
                      <tr key={o.label}>
                        <td>{o.label}</td>
                        <td>{o.price}</td>
                      </tr>
                    ))}
                  </tbody>
                  <caption>Produit sourcé : sans garantie de rentabilité.</caption>
                </table>
              </div>
            </div>
            </details>
          </div>
        </section>

        {/* ========================= 4. SIMULATEUR ========================= */}
        <section id="simulateur" className="k-paper relative">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:py-24">
            <header className="reveal max-w-4xl">
              <p className="k-eyebrow">Simulateur</p>
              <h2 className="k-h2 !text-[clamp(28px,5vw,60px)]">
                Calcule ton prix. <span className="k-hl">En direct.</span>
              </h2>
              <p className="mt-5 max-w-[56ch] text-lg text-taupe">
                Tu composes ta boutique, le total se met à jour. Tu commandes sur WhatsApp avec le récap déjà écrit.
              </p>
            </header>

            <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,.75fr)] lg:gap-14">
              {/* ---- contrôles ---- */}
              <div>
                {/* 1. pack */}
                <div className="kb-step">
                  <h3><em>01</em>Ton pack</h3>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Choix du pack">
                    {boutiquePacks.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        role="radio"
                        aria-checked={packId === p.id}
                        onClick={() => setPackId(p.id)}
                        className="kb-choice flex items-center justify-between gap-3 px-4 py-3 text-left sm:block"
                      >
                        <span className="block font-display text-[15px] font-bold tracking-[-.02em]">{p.name}</span>
                        <span className="block text-right font-mono text-[12px] sm:mt-1 sm:text-left">
                          {formatEuro(p.price)} · {p.includedProducts} produit{p.includedProducts > 1 ? "s" : ""}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. produits en plus */}
                <div className="kb-step">
                  <h3><em>02</em>Produits en plus</h3>
                  <div className="grid grid-cols-3 gap-2.5" role="radiogroup" aria-label="Nombre de produits en plus">
                    {extraProductTiers.map((t, i) => (
                      <button
                        key={t.qty}
                        type="button"
                        role="radio"
                        aria-checked={extraIdx === i}
                        aria-label={t.qty ? `+${t.qty} produits, ${formatEuro(t.price)}` : "Aucun produit en plus"}
                        onClick={() => setExtraIdx(i)}
                        className="kb-choice px-2 py-2.5 text-center"
                      >
                        <span className="block font-display text-[15px] font-bold tracking-[-.02em]">
                          {t.qty ? `+${t.qty.toLocaleString("fr-FR").replace(/ | /g, " ")}` : "Aucun"}
                        </span>
                        <span className="block font-mono text-[11.5px]">{t.qty ? formatEuro(t.price) : "0 €"}</span>
                      </button>
                    ))}
                  </div>
                  <p className="mt-3 text-sm text-taupe">
                    Total : <b className="text-encre">{quote.totalProducts.toLocaleString("fr-FR").replace(/ | /g, " ")} produit{quote.totalProducts > 1 ? "s" : ""}</b> dans ta boutique.
                  </p>

                  <label className="kb-choice mt-4 flex items-start gap-3 px-4 py-3.5">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={premium}
                      disabled={quote.pack.premiumIncluded && !quote.extra.qty}
                      onChange={(e) => setPremium(e.target.checked)}
                    />
                    <span className="kb-box mt-0.5" aria-hidden="true">{premium && !(quote.pack.premiumIncluded && !quote.extra.qty) ? "✓" : ""}</span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-baseline justify-between gap-x-3">
                        <span className="font-semibold">Fiches premium</span>
                        <span className="font-mono text-[12.5px]">+{PREMIUM_PER_PRODUCT} € / produit</span>
                      </span>
                      <span className="mt-1 block text-[13.5px] leading-snug text-taupe">
                        {quote.pack.premiumIncluded
                          ? "Déjà incluses pour les 50 produits du pack Marque. S'applique aux produits en plus."
                          : "Texte de vente réécrit et relu, photos détourées fond uni, titre et description Google."}
                      </span>
                    </span>
                  </label>
                </div>

                {/* 3. options */}
                <div className="kb-step">
                  <h3><em>03</em>Options</h3>
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {boutiqueOptions.map((o) => {
                      const available = !o.onlyFor || o.onlyFor.includes(quote.pack.id);
                      const checked = available && opts.includes(o.id);
                      const why =
                        !available && o.id === "logo"
                          ? "Déjà inclus dans le pack Marque"
                          : !available
                          ? o.note
                          : o.note;
                      return (
                        <label key={o.id} className="kb-choice flex items-start gap-3 px-4 py-3">
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={checked}
                            disabled={!available}
                            onChange={() => toggleOpt(o)}
                          />
                          <span className="kb-box mt-0.5" aria-hidden="true">{checked ? "✓" : ""}</span>
                          <span className="min-w-0 flex-1">
                            <span className="flex items-baseline justify-between gap-3">
                              <span className="text-[14.5px] font-semibold leading-snug">{o.label}</span>
                              <span className="font-mono text-[12.5px]">{formatEuro(o.price)}</span>
                            </span>
                            {why && <span className="mt-0.5 block text-[12.5px] text-taupe">{why}</span>}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* 4. suivi */}
                <div className="kb-step">
                  <h3><em>04</em>Après la livraison</h3>
                  <label className="kb-choice flex items-start gap-3 px-4 py-3.5">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={followUp}
                      onChange={(e) => setFollowUp(e.target.checked)}
                    />
                    <span className="kb-box mt-0.5" aria-hidden="true">{followUp ? "✓" : ""}</span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-baseline justify-between gap-x-3">
                        <span className="font-semibold">Suivi mensuel, sans engagement</span>
                        <span className="font-mono text-[12.5px]">{boutiqueFollowUp.monthly} € / mois</span>
                      </span>
                      <span className="mt-1 block text-[13.5px] leading-snug text-taupe">
                        3 modifications + 10 produits par mois + mises à jour. Payé à part, chaque mois.
                      </span>
                    </span>
                  </label>
                </div>

                {/* barre de total collante (mobile) */}
                <div className="kb-total-bar lg:hidden">
                  <a
                    href="#recap"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate({ hash: "#recap" });
                    }}
                    className="btn-3d flex items-center justify-between gap-3 rounded-xl bg-encre px-4 py-3 text-creme"
                  >
                    <span className="font-mono text-[11.5px] uppercase tracking-[.12em] text-onmat2">Total</span>
                    <span className="font-display text-[20px] font-black tracking-[-.04em] text-hi">{fmt(quote.total)}</span>
                    <span className="text-sm font-semibold">Voir le récap ↓</span>
                  </a>
                </div>
              </div>

              {/* ---- récap / ticket ---- */}
              <aside id="recap" className="lg:sticky lg:top-8" aria-live="polite">
                <div className="kb-receipt">
                  <p className="text-[12px] uppercase tracking-[.14em]">Kota Boutique · ton récap</p>
                  <div className="dash" />
                  <div className="ln">
                    <span>Pack {quote.pack.name} ({quote.pack.includedProducts} produit{quote.pack.includedProducts > 1 ? "s" : ""})</span>
                    <span>{fmt(quote.pack.price)}</span>
                  </div>
                  {quote.extra.qty > 0 && (
                    <div className="ln">
                      <span>+{quote.extra.qty.toLocaleString("fr-FR").replace(/ | /g, " ")} produits</span>
                      <span>{fmt(quote.extra.price)}</span>
                    </div>
                  )}
                  {quote.premiumCount > 0 && (
                    <div className="ln">
                      <span>Fiches premium × {quote.premiumCount}</span>
                      <span>{fmt(quote.premiumCost)}</span>
                    </div>
                  )}
                  {quote.activeOpts.map((o) => (
                    <div className="ln" key={o.id}>
                      <span>{o.label}</span>
                      <span>{fmt(o.price)}</span>
                    </div>
                  ))}
                  <div className="dash" />
                  <div className="total">
                    <span className="text-[12px] uppercase tracking-[.14em]">Total</span>
                    <b>{fmt(quote.total)}</b>
                  </div>
                  {quote.split ? (
                    <p className="mt-2 text-[12px] leading-snug">
                      50 % à la commande ({fmt(quote.total / 2)}), 50 % à la livraison.
                    </p>
                  ) : (
                    <p className="mt-2 text-[12px] leading-snug">Payé à la commande.</p>
                  )}
                  {followUp && (
                    <p className="mt-1 text-[12px] leading-snug">+ suivi mensuel : {boutiqueFollowUp.monthly} € / mois, à part.</p>
                  )}
                  <div className="dash" />
                  <div className="ln">
                    <span>Délai</span>
                    <span>{quote.delay}</span>
                  </div>
                  <p className="text-[11.5px] leading-snug opacity-75">
                    À réception de tous tes éléments.
                    {quote.extra.qty >= 100 ? " Gros volume de produits : on te confirme le délai sur WhatsApp avant de commencer." : ""}
                  </p>
                  <p className="mt-1 text-[11.5px] leading-snug opacity-75">TVA non applicable, art. 293 B du CGI.</p>

                  <div className="mt-6 grid gap-3 font-sans">
                    <Button
                      href={waLink(orderText)}
                      variant="primary"
                      icon="mdi:whatsapp"
                      className="w-full"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Commander sur WhatsApp
                    </Button>
                    {stripeLink && (
                      <Button href={stripeLink} variant="secondary" className="w-full" target="_blank" rel="noopener noreferrer">
                        Payer en ligne
                      </Button>
                    )}
                  </div>
                  <p className="mt-3 font-sans text-[12.5px] leading-snug text-taupe">
                    Le message est pré-rempli avec ton récap. On te répond, on valide ensemble, puis tu règles ta commande.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ========================= 5. ÉTAPES ========================= */}
        <section className="mat relative">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:py-24">
            <header className="reveal max-w-4xl">
              <p className="k-eyebrow">Comment ça se passe</p>
              <h2 className="k-h2">
                4 étapes. <span className="k-hl">Zéro prise de tête.</span>
              </h2>
            </header>
            <ol className="kb-steps reveal-stagger mt-12 list-none p-0">
              <li>
                <span className="n">1</span>
                <b>Tu choisis</b>
                <p>Ton pack et ton nombre de produits. Tu commandes sur WhatsApp, on valide ensemble et tu règles ta commande.</p>
              </li>
              <li>
                <span className="n">2</span>
                <b>Tu remplis un formulaire</b>
                <p>5 minutes : ton produit, tes couleurs, des exemples que tu aimes, tes accès.</p>
              </li>
              <li>
                <span className="n">3</span>
                <b>On construit</b>
                <p>Le délai démarre dès qu'on a reçu tous tes éléments.</p>
              </li>
              <li>
                <span className="n">4</span>
                <b>Tu reçois ta boutique</b>
                <p>Avec une vidéo de prise en main. Tu valides, on ajuste.</p>
              </li>
            </ol>
          </div>
        </section>

        {/* ===================== 6. TRANSPARENCE ===================== */}
        <section className="k-paper relative">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:py-24">
            <header className="reveal max-w-4xl">
              <p className="k-eyebrow">Transparence</p>
              <h2 className="k-h2 !text-[clamp(28px,5vw,60px)]">
                Ce qu'on fait. <span className="k-hl">Ce qui dépend de toi.</span>
              </h2>
            </header>

            <div className="reveal mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="kb-card">
                <h3>On s'occupe de</h3>
                <ul className="kb-list ok">
                  <li>Le design de ta boutique, à tes couleurs</li>
                  <li>Le paiement configuré</li>
                  <li>Les pages légales : modèles Shopify, formulaire de rétractation, checklist</li>
                  <li>La connexion de ton nom de domaine</li>
                  <li>L'import de tes produits</li>
                  <li>La vidéo de prise en main et les retouches de ton pack</li>
                </ul>
              </div>
              <div className="kb-card">
                <h3>Ça dépend de toi</h3>
                <ul className="kb-list you">
                  <li>Nous envoyer tes éléments : le délai démarre à réception</li>
                  <li>Ton abonnement Shopify et ton nom de domaine, à ton nom</li>
                  <li>Relire et valider tes pages légales avec la checklist</li>
                  <li>Ton stock ou ton fournisseur, tes envois, ton service client</li>
                  <li>Faire connaître ta boutique : réseaux, vidéos, pub</li>
                </ul>
              </div>
              <div className="kb-card y">
                <h3>Ce qu'on promet</h3>
                <ul className="kb-list ok">
                  <li>Le délai respecté à réception de tes éléments. En retard, l'express t'est remboursé.</li>
                  <li>La boutique à ton nom, avec tous les accès</li>
                  <li>Un design jamais revendu</li>
                  <li>Rien d'obligatoire caché en option</li>
                  <li>Une entreprise française, SIREN{"\u00a0"}{SIREN}</li>
                </ul>
              </div>
              <div className="kb-card k">
                <h3>Ce qu'on ne promet pas</h3>
                <ul className="kb-list no">
                  <li>Des ventes</li>
                  <li>Un chiffre d'affaires</li>
                  <li>Un « produit gagnant »</li>
                </ul>
                <p className="mt-5 text-[15px] leading-relaxed text-[#B9C2BC]">
                  Personne d'honnête ne peut te les promettre. Tes ventes dépendent de ton produit, de ton prix et de la façon dont tu le fais connaître.
                </p>
              </div>
            </div>

            <div className="reveal mt-8 flex flex-col gap-3 rounded-2xl border-[1.5px] border-dashed border-encre/40 px-5 py-5 sm:flex-row sm:items-start sm:gap-5">
              <span className="tag-label shrink-0 self-start">Légal</span>
              <p className="text-[15px] leading-relaxed text-taupe">
                On intègre les modèles de pages légales de Shopify, un formulaire de rétractation et une checklist à valider. On ne rédige pas de CGV sur mesure : c'est le travail des professionnels du droit.
              </p>
            </div>
          </div>
        </section>

        {/* ===================== 7. COÛTS À PRÉVOIR ===================== */}
        <section className="mat relative">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:py-24">
            <header className="reveal max-w-4xl">
              <p className="k-eyebrow">À prévoir de ton côté</p>
              <h2 className="k-h2 !text-[clamp(28px,5vw,60px)]">
                Les autres frais. <span className="k-hl">Annoncés avant.</span>
              </h2>
              <p className="mt-5 max-w-[58ch] text-lg text-onmat2">
                Une boutique Shopify a des frais à elle. Tu les payes directement aux plateformes, pas à Kota.
              </p>
            </header>
            <div className="k-cmp kb-nowrap reveal mt-10">
              <table className="!min-w-0">
                <thead>
                  <tr>
                    <th>Frais</th>
                    <th className="text-right">Combien</th>
                  </tr>
                </thead>
                <tbody>
                  {boutiqueClientCosts.map((c) => (
                    <tr key={c.label}>
                      <td>
                        <span className="block font-semibold text-onmat">{c.label}</span>
                        <span className="mt-0.5 block text-[13.5px] text-onmat2">{c.note}</span>
                      </td>
                      <td className="align-top">{c.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ===================== 8. SUIVI MENSUEL ===================== */}
        <section className="k-paper relative">
          <div className="mx-auto max-w-7xl px-5 pt-20 sm:px-6 lg:pt-24">
            <div className="reveal kb-card y kb-follow !p-7 lg:!p-10">
              <p className="amt">
                {boutiqueFollowUp.monthly} €<small>/ mois</small>
              </p>
              <div>
                <p className="k-eyebrow">Suivi mensuel · sans engagement</p>
                <p className="mt-2 font-display text-[clamp(18px,2.2vw,24px)] font-bold leading-tight tracking-[-.03em]">
                  On garde un œil sur ta boutique.
                </p>
                <ul className="kb-list ok mt-4">
                  {boutiqueFollowUp.includes.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <p className="mt-3 text-[14px]">Ou {boutiqueFollowUp.yearly} € pour l'année.</p>
              </div>
              <Button
                variant="secondary"
                onClick={() => {
                  setFollowUp(true);
                  goSimulator();
                }}
              >
                L'ajouter à mon récap
              </Button>
            </div>
          </div>
        </section>

        {/* =========================== 9. FAQ =========================== */}
        <section id="faq" className="k-paper relative">
          <div className="k-faq mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:py-24">
            <header className="reveal mb-10 max-w-4xl">
              <p className="k-eyebrow">Tes questions</p>
              <h2 className="k-h2 !text-[clamp(28px,5vw,60px)]">
                Ce qu'on nous <span className="k-hl">demande en commentaire.</span>
              </h2>
            </header>
            {shopifyStoreFaqs.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ========================= 10. CTA FINAL ========================= */}
        <section className="k-paper relative">
          <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-6">
            <div className="reveal mat relative overflow-hidden rounded-[28px] px-6 py-12 text-center shadow-soft-lg sm:px-10 lg:px-16 lg:py-16">
              <h2 className="k-h2 !text-[clamp(28px,5.4vw,64px)] text-onmat">
                <span className="block">Ta boutique.</span>
                <span className="block">À ton nom.</span>
                <span className="k-hl">En 72 h.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-[46ch] text-lg text-onmat2">
                Dès 79 €, tout l'obligatoire inclus. Une question avant de te lancer ? Écris-nous, on répond vite.
              </p>
              <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
                <Button href="#packs" variant="primary">
                  Choisir mon pack
                </Button>
                <Button href={WA_GENERIC} variant="light" icon="mdi:whatsapp" target="_blank" rel="noopener noreferrer">
                  Écrire sur WhatsApp
                </Button>
              </div>
              <p className="mt-9 font-mono text-[11.5px] uppercase tracking-[.12em] text-onmat2">
                Kota Studio · micro-entreprise française · SIREN{"\u00a0"}{SIREN} · Saint-Julien-en-Genevois
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
