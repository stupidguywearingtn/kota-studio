import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupReveals } from "../lib/reveal";
import { buildAiVisibilityJsonLd, aiVisibilityFaqs, PAGE_SCHEMA_ATTR } from "../lib/jsonld";
import { whatsapp } from "../data/content";
import Logo from "../components/Logo";
import Button from "../components/Button";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";

const SITE_URL = "https://kotastudio.fr";
const PAGE_PATH = "/apparaitre-dans-chatgpt-et-ia-site-local";
const META_TITLE = "Apparaître dans ChatGPT et les IA quand on a un site local | Kota Studio";
const META_DESCRIPTION =
  "Comment apparaître dans ChatGPT et les AI Overviews de Google : ce que disent Google et OpenAI, ce qui rend une page citable et ce que Kota Studio applique sur son site.";
const UPDATED_AT = "1er octobre 2026";

/* Les 5 questions/réponses affichées ci-dessous + reprises mot pour mot dans
   le JSON-LD FAQPage. Définies une seule fois dans lib/jsonld.js (source de
   vérité partagée avec le pré-rendu statique), réutilisées ici pour
   l'affichage sous le nom `faqs`. */
const faqs = aiVisibilityFaqs;

export default function AiVisibilityPage() {
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
     (même fonction buildAiVisibilityJsonLd) pour les crawlers sans JS — voir le
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
    script.setAttribute(PAGE_SCHEMA_ATTR, "ai-visibility");
    script.textContent = JSON.stringify(buildAiVisibilityJsonLd());
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
            <span className="text-encre">Apparaître dans ChatGPT et les IA</span>
          </nav>

          <span className="inline-flex items-center gap-2 tag-label">
            <span className="h-1.5 w-1.5 rounded-full bg-or" />
            Guide GEO
          </span>
          <h1 className="kota-title mt-6 text-4xl lg:text-6xl">
            Comment apparaître dans ChatGPT et les IA quand on a un site local ?
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-taupe">
            Ce que Google et OpenAI disent officiellement, ce qui rend une page facile à citer, et ce qu'on applique sur notre propre site — sans promesse de citation.
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

              {/* Q2 / Q3 -> sources officielles */}
              {i === 1 && (
                <p className="mt-4 text-sm">
                  <a
                    href="https://developers.google.com/search/docs/appearance/ai-features"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-or hover:underline"
                  >
                    Source : documentation Google sur les fonctionnalités IA →
                  </a>
                </p>
              )}
              {i === 2 && (
                <p className="mt-4 text-sm">
                  <a
                    href="https://developers.openai.com/api/docs/bots"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-or hover:underline"
                  >
                    Source : documentation OpenAI sur ses robots d'exploration →
                  </a>
                  <span className="ml-2 text-taupe/70">(consultée le 1er octobre 2026)</span>
                </p>
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
                <Link to="/site-sur-mesure-ou-wordpress-wix" className="font-semibold text-or hover:underline">
                  Site sur-mesure ou WordPress / Wix : que choisir ? →
                </Link>
              </li>
              <li>
                <Link to="/quelles-pages-pour-un-site-vitrine" className="font-semibold text-or hover:underline">
                  Quelles pages pour un site vitrine ? →
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
              Un site pensé pour Google et pour les IA ?
            </h2>
            <p className="mt-4 text-creme/70">
              15 minutes pour parler de votre projet. Sans engagement, et sans promesse de classement.
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
