import { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupReveals } from "../lib/reveal";
import { cities } from "../data/cities";
import { offer, process, whatsapp } from "../data/content";
import Logo from "../components/Logo";
import Button from "../components/Button";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";

const SITE_URL = "https://kotastudio.fr";

export default function CityPage() {
  const { citySlug } = useParams();
  const city = cities.find((c) => c.slug === citySlug);
  const mainRef = useRef(null);

  useEffect(() => {
    if (!city) return;
    const ctx = gsap.context(() => setupReveals(), mainRef);
    const id = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => {
      ctx.revert();
      clearTimeout(id);
    };
  }, [citySlug, city]);

  /* SEO : titre, meta description, canonical + JSON-LD (Service, BreadcrumbList,
     FAQPage) par ville. SPA sans SSR -> injectés côté client au montage, retirés
     au démontage. Le FAQPage reprend mot pour mot le texte affiché (city.faqs). */
  useEffect(() => {
    if (!city) return;
    const pageUrl = `${SITE_URL}/${city.slug}`;

    const prevTitle = document.title;
    document.title = city.metaTitle;

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc ? metaDesc.getAttribute("content") : null;
    if (metaDesc) metaDesc.setAttribute("content", city.metaDescription);

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
            { "@type": "ListItem", position: 2, name: city.h1, item: pageUrl },
          ],
        },
        {
          "@type": "Service",
          serviceType: "Création de site internet sur-mesure",
          name: city.h1,
          url: pageUrl,
          areaServed: { "@type": "City", name: city.cityName },
          provider: {
            "@type": "ProfessionalService",
            name: "Kota Studio",
            url: `${SITE_URL}/`,
            telephone: "+33668823396",
          },
          offers: offer.plans.map((p) => ({
            "@type": "Offer",
            name: p.name,
            price: p.price.replace(/[^\d]/g, ""),
            priceCurrency: "EUR",
          })),
        },
        {
          "@type": "FAQPage",
          mainEntity: city.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
      ],
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-city-schema", city.slug);
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc !== null) metaDesc.setAttribute("content", prevDesc);
      if (canonical && prevCanonical !== null) canonical.setAttribute("href", prevCanonical);
      script.remove();
    };
  }, [city]);

  /* Ville inconnue -> 404 propre (comme ProjectPage pour un slug de projet invalide) */
  if (!city) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-or">404</span>
        <h1 className="kota-title text-4xl lg:text-5xl">Page introuvable</h1>
        <Button href="/" variant="primary" icon="solar:arrow-left-linear">
          Retour à l'accueil
        </Button>
      </div>
    );
  }

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
            <span className="text-encre">{city.cityName}</span>
          </nav>

          <span className="inline-flex items-center gap-2 rounded-full border border-or/30 bg-creme/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-or shadow-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-or" />
            {city.badge}
          </span>
          <h1 className="kota-title mt-6 text-4xl lg:text-6xl">{city.h1}</h1>
          <p className="mt-5 text-lg leading-relaxed text-taupe">{city.intro}</p>
          <p className="mt-3 text-sm text-taupe/70">
            Dernière mise à jour : {city.updatedAt}
          </p>

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
          {city.faqs.map((f, i) => (
            <div key={f.q} className="reveal">
              <h2 className="kota-title text-2xl lg:text-3xl">{f.q}</h2>
              <p className="mt-4 leading-relaxed text-taupe">{f.a}</p>

              {/* Question prix -> détail inclus / extras (source : content.js > offer) */}
              {i === 1 && (
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-or">
                      {offer.includedTitle}
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {offer.included.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-taupe">
                          <iconify-icon
                            icon="solar:check-circle-linear"
                            class="mt-0.5 shrink-0 text-base text-or"
                            aria-hidden="true"
                          ></iconify-icon>
                          {item}
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

              {/* Question délai -> étapes du process (source : content.js > process) */}
              {i === 2 && (
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
            </div>
          ))}
        </section>

        {/* ---- Maillage interne : guide prix/délais ---- */}
        <section className="reveal mx-auto max-w-4xl px-6 pb-24">
          <div className="rounded-2xl border border-encre/10 bg-sable/40 px-6 py-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-encre">
              Envie de comparer avant d'appeler ?
            </h3>
            <p className="mt-2 text-sm text-taupe">
              <Link to="/combien-coute-un-site-internet" className="font-semibold text-or hover:underline">
                Combien coûte un site internet ? Prix, délais et inclus détaillés →
              </Link>
            </p>
          </div>
        </section>

        {/* ---- CTA final ---- */}
        <section className="reveal mx-auto max-w-4xl px-6 pb-24">
          <div className="rounded-[28px] bg-encre px-8 py-12 text-center shadow-soft-lg lg:px-14 lg:py-16">
            <h2 className="kota-title mt-0 text-3xl text-creme lg:text-4xl">
              Parlons de votre projet
            </h2>
            <p className="mt-4 text-creme/70">
              15 minutes pour comprendre votre besoin et voir comment on peut vous aider. Sans
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
