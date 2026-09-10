import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupReveals } from "../lib/reveal";
import { offer, process, whatWeDo, promises, whatsapp } from "../data/content";
import { cities } from "../data/cities";
import Logo from "../components/Logo";
import Button from "../components/Button";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";

const SITE_URL = "https://kotastudio.fr";
const PAGE_PATH = "/combien-coute-un-site-internet";
const META_TITLE = "Combien coûte un site internet ? Prix, délais, inclus | Kota Studio";
const META_DESCRIPTION =
  "Prix réels d'un site internet chez Kota Studio : landing page à partir de 790 €, site sur-mesure à partir de 1 290 €. Délai de 14 jours, ce qui est inclus, ce qui est en option.";
const UPDATED_AT = "10 septembre 2026";

/* Les 5 questions/réponses affichées ci-dessous + reprises mot pour mot dans
   le JSON-LD FAQPage (voir useEffect). Toute donnée chiffrée vient de
   content.js (offer / process / whatWeDo / promises) : une seule source de
   vérité, jamais dupliquée en dur. Même principe que CityPage.jsx. */
const faqs = [
  {
    q: "Combien coûte un site internet chez Kota Studio ?",
    a: `Une landing page démarre à ${offer.plans[0].price.replace("à partir de ", "")} et un site sur-mesure complet à partir de ${offer.plans[1].price.replace("à partir de ", "")}, tout compris. Le montant exact dépend du nombre de pages et des options choisies (langue supplémentaire, logo, rédaction de contenu…). Un devis précis est donné après un appel de 15 minutes, sans engagement.`,
  },
  {
    q: "Combien de temps faut-il pour avoir son site ?",
    a: "Le délai annoncé dès le premier échange est de 14 jours, du brief initial à la mise en ligne. Ce délai est tenu grâce à un processus cadré en 6 étapes, détaillé ci-dessous.",
  },
  {
    q: "Qu'est-ce qui est inclus dans le prix, sans surprise ?",
    a: "Chaque projet Kota Studio inclut un site 100% codé sur-mesure (aucun template), un design responsive mobile/tablette/desktop, un espace admin pour modifier le contenu, l'optimisation des performances et des révisions illimitées jusqu'à validation. Rien de cette liste n'est facturé en supplément.",
  },
  {
    q: "Landing page ou site sur-mesure : lequel choisir ?",
    a: "Une landing page est une page unique, taillée pour une offre et un seul objectif : convertir — adaptée à un lancement, une offre ponctuelle ou un test rapide. Un site sur-mesure est un site complet, structuré en plusieurs pages, pensé pour représenter toute l'activité sur la durée. Le choix dépend du nombre de messages à faire passer, pas seulement du budget.",
  },
  {
    q: "Le prix inclut-il le référencement (SEO) ?",
    a: "Oui pour les fondations : chaque site part avec une base technique SEO soignée (structure, vitesse, contenu) posée dès le développement. Mais Kota Studio ne vend jamais de classement Google garanti — personne ne peut sérieusement s'engager là-dessus. Pour un accompagnement SEO plus poussé que les fondations de base, l'option « SEO avancé » est disponible sur devis.",
  },
];

export default function PricingGuidePage() {
  const mainRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => setupReveals(), mainRef);
    const id = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => {
      ctx.revert();
      clearTimeout(id);
    };
  }, []);

  /* SEO : titre, meta description, canonical + JSON-LD (BreadcrumbList, FAQPage,
     HowTo) — même pattern que CityPage.jsx / ProjectPage.jsx (SPA sans SSR,
     donc injecté côté client au montage, retiré au démontage). Le FAQPage et
     le HowTo reprennent mot pour mot le texte affiché plus bas. */
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

    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Combien coûte un site internet ?", item: pageUrl },
          ],
        },
        {
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
        {
          "@type": "HowTo",
          name: "Comment se déroule un projet de création de site avec Kota Studio",
          description: process.subtitle,
          totalTime: "P14D",
          step: process.steps.map((s) => ({
            "@type": "HowToStep",
            name: s.title,
            text: s.text,
          })),
        },
      ],
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-pricing-guide-schema", "true");
    script.textContent = JSON.stringify(jsonLd);
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
            <span className="text-encre">Combien coûte un site internet ?</span>
          </nav>

          <span className="inline-flex items-center gap-2 rounded-full border border-or/30 bg-creme/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-or shadow-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-or" />
            Guide prix & délais
          </span>
          <h1 className="kota-title mt-6 text-4xl lg:text-6xl">
            Combien coûte un site internet ?
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-taupe">
            Prix, délai et inclus expliqués sans jargon : de quoi évaluer une offre de création de
            site sans avoir besoin d'appeler d'abord. Tous les chiffres ci-dessous sont ceux
            réellement pratiqués par Kota Studio.
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

              {/* Q1 (prix) -> tableau plans + options (source : content.js > offer) */}
              {i === 0 && (
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-or">
                      Nos deux formules
                    </h3>
                    <ul className="mt-3 space-y-3">
                      {offer.plans.map((plan) => (
                        <li key={plan.name} className="rounded-2xl border border-encre/10 bg-creme px-4 py-3 shadow-soft">
                          <p className="text-sm font-semibold text-encre">{plan.name}</p>
                          <p className="mt-0.5 font-display text-lg font-extrabold text-or">{plan.price}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-or">
                      {offer.extrasTitle}
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {offer.extras.map((item) => (
                        <li
                          key={item.label}
                          className="flex items-center justify-between gap-3 text-sm text-taupe"
                        >
                          <span>{item.label}</span>
                          <span className="font-semibold text-encre">{item.price}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Q2 (délai) -> étapes du process (source : content.js > process) */}
              {i === 1 && (
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {process.steps.map((step) => (
                    <div
                      key={step.day}
                      className="flex items-center gap-3 rounded-2xl border border-encre/10 bg-creme px-4 py-3 shadow-soft"
                    >
                      <span className="shrink-0 rounded-full bg-or/15 px-2.5 py-1 text-xs font-bold text-or">
                        {step.day}
                      </span>
                      <span className="text-sm font-medium text-encre">{step.title}</span>
                    </div>
                  ))}
                  <Link
                    to="/#process"
                    className="text-sm font-semibold text-or hover:underline sm:col-span-2"
                  >
                    Voir le déroulé complet du process →
                  </Link>
                </div>
              )}

              {/* Q3 (inclus) -> liste inclus (source : content.js > offer) */}
              {i === 2 && (
                <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
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

              {/* Q4 (landing vs sur-mesure) -> les 2 cartes (source : content.js > whatWeDo) */}
              {i === 3 && (
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {whatWeDo.cards.map((card) => (
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

              {/* Q5 (SEO) -> promesse exacte (source : content.js > promises) */}
              {i === 4 && (
                <div className="mt-6 rounded-2xl border border-or/20 bg-creme px-5 py-4 shadow-soft">
                  <p className="text-sm font-bold uppercase tracking-widest text-or">
                    {promises.items[3].title}
                  </p>
                  <p className="mt-2 text-sm text-taupe">{promises.items[3].text}</p>
                </div>
              )}
            </div>
          ))}
        </section>

        {/* ---- Maillage interne : pages villes ---- */}
        <section className="reveal mx-auto max-w-4xl px-6 pb-24">
          <div className="rounded-2xl border border-encre/10 bg-sable/40 px-6 py-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-encre">
              Vous cherchez une agence près de chez vous ?
            </h3>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {cities.map((city) => (
                <li key={city.slug}>
                  <Link to={`/${city.slug}`} className="font-semibold text-or hover:underline">
                    Création de site internet à {city.cityName} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---- CTA final ---- */}
        <section className="reveal mx-auto max-w-4xl px-6 pb-24">
          <div className="rounded-[28px] bg-encre px-8 py-12 text-center shadow-soft-lg lg:px-14 lg:py-16">
            <h2 className="kota-title mt-0 text-3xl text-creme lg:text-4xl">
              Un devis précis pour votre projet
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
