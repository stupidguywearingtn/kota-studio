import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupReveals } from "../lib/reveal";
import { localSeo, offer, process as processData } from "../data/content";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";

/* SEO : titre + meta description + JSON-LD spécifiques à cette page.
   SPA sans SSR -> mise à jour côté client, comme sur les pages projet. */
function usePageSeo() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = localSeo.metaTitle;

    let metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc ? metaDesc.getAttribute("content") : null;
    if (metaDesc) metaDesc.setAttribute("content", localSeo.metaDescription);

    let canonical = document.querySelector('link[rel="canonical"]');
    const prevCanonical = canonical ? canonical.getAttribute("href") : null;
    if (canonical) {
      canonical.setAttribute(
        "href",
        `https://kotastudio.fr/${localSeo.slug}`
      );
    }

    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Accueil",
              item: "https://kotastudio.fr/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: localSeo.h1,
              item: `https://kotastudio.fr/${localSeo.slug}`,
            },
          ],
        },
        {
          "@type": "Service",
          serviceType: "Création de site internet",
          name: localSeo.h1,
          description: localSeo.metaDescription,
          provider: {
            "@type": "ProfessionalService",
            name: "Kota Studio",
            telephone: "+33668823396",
            url: "https://kotastudio.fr/",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Saint-Julien-en-Genevois",
              postalCode: "74160",
              addressRegion: "Haute-Savoie",
              addressCountry: "FR",
            },
          },
          areaServed: [
            { "@type": "City", name: "Saint-Julien-en-Genevois" },
            { "@type": "City", name: "Annemasse" },
            { "@type": "City", name: "Annecy" },
            { "@type": "City", name: "Genève" },
            { "@type": "City", name: "Lyon" },
            { "@type": "AdministrativeArea", name: "Haute-Savoie" },
          ],
          offers: [
            {
              "@type": "Offer",
              name: "Landing page",
              price: "790",
              priceCurrency: "EUR",
            },
            {
              "@type": "Offer",
              name: "Site sur-mesure",
              price: "1290",
              priceCurrency: "EUR",
            },
          ],
        },
        {
          "@type": "FAQPage",
          mainEntity: localSeo.faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        },
      ],
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-page-schema", localSeo.slug);
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc !== null) metaDesc.setAttribute("content", prevDesc);
      if (canonical && prevCanonical !== null) canonical.setAttribute("href", prevCanonical);
      script.remove();
    };
  }, []);
}

export default function CreationSiteInternetSaintJulien() {
  const mainRef = useRef(null);
  usePageSeo();

  useEffect(() => {
    const ctx = gsap.context(() => setupReveals(), mainRef);
    const id = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => {
      ctx.revert();
      clearTimeout(id);
    };
  }, []);

  return (
    <div ref={mainRef} className="relative overflow-x-hidden">
      <Navbar />

      <main className="mx-auto max-w-4xl px-6 pb-24 pt-6 lg:pt-10">
        {/* Fil d'ariane */}
        <nav aria-label="Fil d'ariane" className="reveal text-sm text-taupe">
          <Link to="/" className="hover:text-or">Accueil</Link>
          <span className="mx-2 text-taupe/50">/</span>
          <span className="text-encre">{localSeo.h1}</span>
        </nav>

        {/* Hero */}
        <div className="reveal mt-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-or/30 bg-creme/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-or shadow-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-or" />
            {localSeo.badge}
          </span>
          <h1 className="kota-title mt-6 text-4xl lg:text-6xl">{localSeo.h1}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-taupe">
            {localSeo.intro}
          </p>
          <p className="mt-4 text-sm text-taupe/70">
            Dernière mise à jour : {localSeo.updatedAt}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/#contact" variant="primary">Réserver un appel</Button>
            <Button href="/#offre" variant="secondary" showIcon={false}>
              Voir les tarifs
            </Button>
          </div>
        </div>

        {/* Sections question/réponse — réponse directe en tête, développement après */}
        <div className="mt-16 space-y-12">
          {localSeo.sections.map((s) => (
            <section key={s.id} className="reveal">
              <h2 className="kota-title text-2xl lg:text-3xl">{s.question}</h2>
              <p className="mt-3 leading-relaxed text-taupe">{s.answer}</p>

              {s.body === "offer-included" && (
                <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {offer.included.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 rounded-2xl border border-encre/10 bg-creme px-4 py-3 text-sm text-encre/85"
                    >
                      <iconify-icon
                        icon="solar:check-circle-linear"
                        class="mt-0.5 shrink-0 text-lg text-or"
                        aria-hidden="true"
                      ></iconify-icon>
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {s.body === "process-steps" && (
                <ol className="mt-5 space-y-2.5">
                  {processData.steps.map((step) => (
                    <li
                      key={step.day}
                      className="flex items-start gap-3 rounded-2xl border border-encre/10 bg-creme px-4 py-3 text-sm"
                    >
                      <span className="shrink-0 rounded-full bg-encre px-2.5 py-1 text-xs font-bold text-creme">
                        {step.day}
                      </span>
                      <span className="text-encre/85">
                        <strong className="font-semibold">{step.title}</strong> — {step.text}
                      </span>
                    </li>
                  ))}
                </ol>
              )}
            </section>
          ))}
        </div>

        {/* FAQ visible — DOIT correspondre exactement au FAQPage JSON-LD */}
        <section className="reveal mt-16">
          <h2 className="kota-title text-2xl lg:text-3xl">Questions fréquentes</h2>
          <div className="mt-6 space-y-4">
            {localSeo.faq.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-encre/10 bg-creme px-5 py-4 shadow-soft"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-encre">
                  {item.q}
                  <iconify-icon
                    icon="solar:alt-arrow-down-linear"
                    class="shrink-0 text-xl text-or transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  ></iconify-icon>
                </summary>
                <p className="mt-3 leading-relaxed text-taupe">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA final */}
        <section className="reveal mt-16 rounded-[28px] border border-encre/10 bg-encre p-8 text-creme shadow-soft-lg lg:p-10">
          <h2 className="kota-title text-2xl lg:text-3xl">{localSeo.cta.title}</h2>
          <p className="mt-3 max-w-xl text-creme/70">{localSeo.cta.text}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/#contact" variant="light">Réserver un appel</Button>
            <Button href="/#realisations" variant="light" showIcon={false}>
              Voir nos réalisations
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
