import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupReveals } from "../lib/reveal";
import { buildCustomVsCmsJsonLd, customVsCmsFaqs, PAGE_SCHEMA_ATTR } from "../lib/jsonld";
import { offer, promises, whatsapp } from "../data/content";
import Logo from "../components/Logo";
import Button from "../components/Button";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";

const SITE_URL = "https://kotastudio.fr";
const PAGE_PATH = "/site-sur-mesure-ou-wordpress-wix";
const META_TITLE = "Site sur-mesure ou WordPress / Wix : que choisir ? | Kota Studio";
const META_DESCRIPTION =
  "Site sur-mesure ou WordPress / Wix : différences, budget, référencement, autonomie. Quand un modèle suffit, quand le sur-mesure vaut le coup, et ce que propose Kota Studio.";
const UPDATED_AT = "29 septembre 2026";

/* Les 5 questions/réponses affichées ci-dessous + reprises mot pour mot dans
   le JSON-LD FAQPage. Définies une seule fois dans lib/jsonld.js (source de
   vérité partagée avec le pré-rendu statique), réutilisées ici pour
   l'affichage sous le nom `faqs`. */
const faqs = customVsCmsFaqs;

export default function CustomVsCmsPage() {
  const mainRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => setupReveals(), mainRef);
    const id = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => {
      ctx.revert();
      clearTimeout(id);
    };
  }, []);

  /* SEO : titre, meta description, canonical + JSON-LD (BreadcrumbList, FAQPage).
     Le JSON-LD est aussi pré-rendu statiquement par scripts/generate-static-heads.mjs
     (même fonction buildCustomVsCmsJsonLd) pour les crawlers sans JS — voir le
     commentaire équivalent dans CityPage.jsx pour pourquoi on retire d'abord tout
     <script data-page-schema> existant avant d'ajouter le sien. Le FAQPage reprend
     mot pour mot le texte affiché plus bas. */
  useEffect(() => {
    const pageUrl = `${SITE_URL}${PAGE_PATH}`;

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
    script.setAttribute(PAGE_SCHEMA_ATTR, "custom-vs-cms");
    script.textContent = JSON.stringify(buildCustomVsCmsJsonLd());
    document.head.appendChild(script);

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc !== null) metaDesc.setAttribute("content", prevDesc);
      if (canonical && prevCanonical !== null) canonical.setAttribute("href", prevCanonical);
      script.remove();
    };
  }, []);

  const whatsappHref =
    "https://wa.me/" + whatsapp.number + "?text=" + encodeURIComponent(whatsapp.message);

  return (
    <div ref={mainRef} className="relative overflow-x-hidden">
      {/* ---- Barre du haut : logo + retour ---- */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Logo className="text-2xl" />
        <Link
          to="/"
          className="group inline-flex items-center gap-2 rounded-full border border-encre/15 bg-creme px-5 py-2.5 text-sm font-semibold text-encre shadow-soft transition-colors hover:border-encre/30"
        >
          <iconify-icon
            icon="solar:arrow-left-linear"
            class="text-lg transition-transform group-hover:-translate-x-0.5"
            aria-hidden="true"
          ></iconify-icon>
          Retour à l'accueil
        </Link>
      </header>

      <main>
        {/* ---- Intro ---- */}
        <section className="reveal mx-auto max-w-4xl px-6 pb-14 pt-6 lg:pt-12">
          <nav aria-label="Fil d'Ariane" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-taupe">
            <Link to="/" className="hover:text-or">Accueil</Link>
            <span aria-hidden="true">/</span>
            <span className="text-encre">Site sur-mesure ou WordPress / Wix ?</span>
          </nav>

          <span className="inline-flex items-center gap-2 tag-label">
            <span className="h-1.5 w-1.5 rounded-full bg-or" />
            Guide technique
          </span>
          <h1 className="kota-title mt-6 text-4xl lg:text-6xl">
            Site sur-mesure ou WordPress / Wix : que choisir ?
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-taupe">
            Ce qui change vraiment entre un modèle prêt à l'emploi et un site conçu sur mesure :
            budget, liberté de design, référencement, autonomie — pour choisir sans avoir
            besoin d'appeler d'abord.
          </p>
          <p className="mt-3 text-sm text-taupe/70">Dernière mise à jour : {UPDATED_AT}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/#contact" variant="primary">
              Réserver un appel
            </Button>
            <Button href={whatsappHref} variant="secondary" icon="mdi:whatsapp">
              Discuter sur WhatsApp
            </Button>
          </div>
        </section>

        {/* ---- Questions / réponses directes (format GEO) ---- */}
        <section className="mx-auto max-w-4xl space-y-14 px-6 pb-24">
          {faqs.map((f, i) => (
            <div key={f.q} className="reveal">
              <h2 className="kota-title text-2xl lg:text-3xl">{f.q}</h2>
              <p className="mt-4 leading-relaxed text-taupe">{f.a}</p>

              {/* Q1 -> comparatif à 2 colonnes */}
              {i === 0 && (
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[
                    {
                      title: "Wix / WordPress (modèle)",
                      text: "Démarrage rapide à partir d'un thème, design et structure encadrés par le modèle choisi.",
                    },
                    {
                      title: "Site sur-mesure",
                      text: "Conçu et codé à partir d'une page blanche, autour de votre activité, sans template.",
                    },
                  ].map((card) => (
                    <div
                      key={card.title}
                      className="rounded-2xl border border-encre/10 bg-creme px-5 py-4 shadow-soft"
                    >
                      <p className="text-sm font-bold uppercase tracking-widest text-or">{card.title}</p>
                      <p className="mt-2 text-sm text-taupe">{card.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Q3 (budget) -> prix réels (source : content.js > offer) + lien détail */}
              {i === 2 && (
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {offer.plans.map((plan) => (
                    <span
                      key={plan.name}
                      className="rounded-full border border-encre/10 bg-creme px-4 py-2 text-sm font-semibold text-encre shadow-soft"
                    >
                      {plan.name} {plan.price}
                    </span>
                  ))}
                  <Link to="/combien-coute-un-site-internet" className="text-sm font-semibold text-or hover:underline">
                    Voir ce qui est inclus →
                  </Link>
                </div>
              )}

              {/* Q4 (référencement) -> promesse SEO exacte (source : content.js > promises) */}
              {i === 3 && (
                <div className="mt-6 rounded-2xl border border-or/20 bg-creme px-5 py-4 shadow-soft">
                  <p className="text-sm font-bold uppercase tracking-widest text-or">
                    {promises.items[3].title}
                  </p>
                  <p className="mt-2 text-sm text-taupe">{promises.items[3].text}</p>
                </div>
              )}

              {/* Q5 (autonomie) -> liste réelle des inclus (source : content.js > offer.included) */}
              {i === 4 && (
                <ul className="mt-6 space-y-2.5">
                  {offer.included.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <iconify-icon
                        icon="solar:check-circle-bold"
                        class="mt-0.5 shrink-0 text-lg text-or"
                        aria-hidden="true"
                      ></iconify-icon>
                      <span className="text-sm text-taupe">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>

        {/* ---- Maillage interne : page Haute-Savoie + guide prix ---- */}
        <section className="reveal mx-auto max-w-4xl px-6 pb-24">
          <div className="rounded-2xl border border-encre/10 bg-sable/40 px-6 py-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-encre">
              Prêt à passer à l'étape suivante ?
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  to="/creation-refonte-site-internet-haute-savoie"
                  className="font-semibold text-or hover:underline"
                >
                  Création & refonte de site en Haute-Savoie →
                </Link>
              </li>
              <li>
                <Link to="/comment-choisir-une-agence-web" className="font-semibold text-or hover:underline">
                  Comment choisir une agence de création de site internet ? →
                </Link>
              </li>
              <li>
                <Link to="/combien-coute-un-site-internet" className="font-semibold text-or hover:underline">
                  Combien coûte un site internet ? Prix, délais et inclus détaillés →
                </Link>
              </li>
            </ul>
          </div>
        </section>

        {/* ---- CTA final ---- */}
        <section className="reveal mx-auto max-w-4xl px-6 pb-24">
          <div className="rounded-[28px] bg-encre px-8 py-12 text-center shadow-soft-lg lg:px-14 lg:py-16">
            <h2 className="kota-title mt-0 text-3xl text-creme lg:text-4xl">
              Un conseil honnête sur votre projet
            </h2>
            <p className="mt-4 text-creme/70">
              15 minutes pour voir si un site sur-mesure est adapté à votre projet, ou non. Sans engagement.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/#contact" variant="light">
                Réserver un appel
              </Button>
              <Button href={whatsappHref} variant="light" icon="mdi:whatsapp">
                WhatsApp
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
