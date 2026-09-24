import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupReveals } from "../lib/reveal";
import { buildAgencyGuideJsonLd, agencyGuideFaqs, PAGE_SCHEMA_ATTR } from "../lib/jsonld";
import { promises, whatsapp } from "../data/content";
import { cities } from "../data/cities";
import Logo from "../components/Logo";
import Button from "../components/Button";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";

const SITE_URL = "https://kotastudio.fr";
const PAGE_PATH = "/comment-choisir-une-agence-web";
const META_TITLE = "Comment choisir une agence de création de site internet ? | Kota Studio";
const META_DESCRIPTION =
  "Les critères concrets pour choisir une agence web (prix, délai, interlocuteur, signaux d'alerte) et les 5 questions à poser avant de signer, en Haute-Savoie ou ailleurs.";
const UPDATED_AT = "24 septembre 2026";

/* Les 5 questions/réponses affichées ci-dessous + reprises mot pour mot dans
   le JSON-LD FAQPage. Définies une seule fois dans lib/jsonld.js (source de
   vérité partagée avec le pré-rendu statique), réutilisées ici pour
   l'affichage sous le nom `faqs`. */
const faqs = agencyGuideFaqs;

export default function ChooseAgencyGuidePage() {
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
     (même fonction buildAgencyGuideJsonLd) pour les crawlers sans JS — voir le
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
    script.setAttribute(PAGE_SCHEMA_ATTR, "agency-guide");
    script.textContent = JSON.stringify(buildAgencyGuideJsonLd());
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
            <span className="text-encre">Comment choisir une agence de création de site internet ?</span>
          </nav>

          <span className="inline-flex items-center gap-2 rounded-full border border-or/30 bg-creme/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-or shadow-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-or" />
            Guide pour bien choisir
          </span>
          <h1 className="kota-title mt-6 text-4xl lg:text-6xl">
            Comment choisir une agence de création de site internet ?
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-taupe">
            Les critères qui comptent vraiment, les signaux qui doivent alerter, et les questions à
            poser avant de signer — de quoi comparer les offres sans avoir besoin d'appeler dix
            agences d'affilée.
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

              {/* Q1 (comment choisir) -> les 4 critères qui comptent le plus */}
              {i === 0 && (
                <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                  {[
                    "Prix clair, annoncé dès le premier échange (pas seulement «sur devis»)",
                    "Délai de livraison précisé avant de signer",
                    "Un seul interlocuteur, du premier appel à la mise en ligne",
                    "Un accompagnement prévu après la mise en ligne",
                  ].map((item) => (
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

              {/* Q2 (agence vs freelance vs plateforme) -> comparatif à 3 colonnes */}
              {i === 1 && (
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {[
                    { title: "Plateforme (Wix, Shopify…)", text: "Le moins cher, en autonomie totale, mais sur un template que vous gérez seul." },
                    { title: "Freelance indépendant", text: "Souvent accessible sur le prix, mais dépend d'une seule personne et de sa disponibilité." },
                    { title: "Agence / studio structuré", text: "Interlocuteur unique et site sur-mesure, avec un process cadré (délai annoncé, étapes définies)." },
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

              {/* Q3 (proximité géographique) -> maillage vers les pages villes */}
              {i === 2 && (
                <div className="mt-6 rounded-2xl border border-encre/10 bg-sable/40 px-6 py-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-encre">
                    Villes où Kota Studio accompagne déjà des clients
                  </h3>
                  <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    {cities.map((city) => (
                      <li key={city.slug}>
                        <Link to={`/${city.slug}`} className="font-semibold text-or hover:underline">
                          {city.crossLinkLabel || `Création de site internet à ${city.cityName}`} →
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Q4 (signaux d'alerte) -> liste des 3 signaux + promesse SEO exacte (source : content.js > promises) */}
              {i === 3 && (
                <>
                  <ul className="mt-6 space-y-2.5">
                    {[
                      "Un prix qui reste «sur devis» sans jamais donner le moindre ordre de grandeur",
                      "Une absence totale de délai chiffré («on verra selon la charge»)",
                      "Une promesse de classement Google garanti",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <iconify-icon
                          icon="solar:danger-triangle-bold"
                          class="mt-0.5 shrink-0 text-lg text-or"
                          aria-hidden="true"
                        ></iconify-icon>
                        <span className="text-sm text-taupe">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 rounded-2xl border border-or/20 bg-creme px-5 py-4 shadow-soft">
                    <p className="text-sm font-bold uppercase tracking-widest text-or">
                      {promises.items[3].title}
                    </p>
                    <p className="mt-2 text-sm text-taupe">{promises.items[3].text}</p>
                  </div>
                </>
              )}

              {/* Q5 (questions à poser) -> checklist imprimable */}
              {i === 4 && (
                <ul className="mt-6 space-y-2.5">
                  {[
                    "Le prix est-il fixe ou variable selon des critères précis ?",
                    "Quel est le délai réel, pas juste indicatif ?",
                    "Qui sera mon interlocuteur pendant le projet ?",
                    "Que se passe-t-il après la mise en ligne (support, modifications) ?",
                    "Le référencement de base est-il inclus dans le prix ou facturé en option ?",
                  ].map((item, idx) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-or/15 text-xs font-bold text-or">
                        {idx + 1}
                      </span>
                      <span className="text-sm text-taupe">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>

        {/* ---- Maillage interne : guide prix ---- */}
        <section className="reveal mx-auto max-w-4xl px-6 pb-24">
          <div className="rounded-2xl border border-encre/10 bg-sable/40 px-6 py-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-encre">
              Envie de voir les chiffres précis chez Kota Studio ?
            </h3>
            <p className="mt-2 text-sm text-taupe">
              Prix, délai et inclus détaillés, tout compris.
            </p>
            <Link
              to="/combien-coute-un-site-internet"
              className="mt-3 inline-block text-sm font-semibold text-or hover:underline"
            >
              Combien coûte un site internet ? →
            </Link>
          </div>
        </section>

        {/* ---- CTA final ---- */}
        <section className="reveal mx-auto max-w-4xl px-6 pb-24">
          <div className="rounded-[28px] bg-encre px-8 py-12 text-center shadow-soft-lg lg:px-14 lg:py-16">
            <h2 className="kota-title mt-0 text-3xl text-creme lg:text-4xl">
              Envie de comparer directement avec Kota Studio ?
            </h2>
            <p className="mt-4 text-creme/70">
              15 minutes pour comprendre votre besoin et vous donner un prix exact. Sans
              engagement.
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
