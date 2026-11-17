import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupReveals } from "../lib/reveal";
import { buildArtisanSiteJsonLd, artisanSiteFaqs, PAGE_SCHEMA_ATTR } from "../lib/jsonld";
import { whatsapp } from "../data/content";
import Logo from "../components/Logo";
import Button from "../components/Button";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";

const SITE_URL = "https://kotastudio.fr";
const PAGE_PATH = "/creation-site-internet-artisan";
const META_TITLE = "Site internet pour artisan : contenu, prix et délai | Kota Studio";
const META_DESCRIPTION =
  "Site internet pour artisan : ce qu'il doit contenir, landing page ou site complet, prix (dès 790 €), délai de 14 jours et comment être trouvé sur Google et par les IA dans sa zone.";
const UPDATED_AT = "17 novembre 2026";

/* Les 6 questions/réponses affichées ci-dessous + reprises mot pour mot dans
   le JSON-LD FAQPage. Définies une seule fois dans lib/jsonld.js (source de
   vérité partagée avec le pré-rendu statique), réutilisées ici pour
   l'affichage sous le nom `faqs`. */
const faqs = artisanSiteFaqs;

export default function ArtisanSitePage() {
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
     (même fonction buildArtisanSiteJsonLd) pour les crawlers sans JS — voir le
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
    script.setAttribute(PAGE_SCHEMA_ATTR, "artisan-site");
    script.textContent = JSON.stringify(buildArtisanSiteJsonLd());
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
            <span className="text-encre">Site internet pour artisan</span>
          </nav>

          <span className="inline-flex items-center gap-2 tag-label">
            <span className="h-1.5 w-1.5 rounded-full bg-or" />
            Guide pratique
          </span>
          <h1 className="kota-title mt-6 text-4xl lg:text-6xl">
            Site internet pour artisan : quoi mettre, quel prix, quel délai ?
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-taupe">
            Plombier, électricien, maçon, paysagiste ou entreprise de travaux : ce qu'un site doit contenir pour transformer une recherche Google en demande de devis, et ce que ça coûte réellement chez Kota Studio.
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

              {/* Q2 : checklist des contenus */}
              {i === 1 && (
                <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    { title: "Prestations", text: "Une description par service : ce que vous faites, pour qui, avec quel matériel ou quelle garantie." },
                    { title: "Zone d'intervention", text: "Les communes couvertes et le rayon, écrits en toutes lettres (pas seulement une carte)." },
                    { title: "Photos de chantiers", text: "Vos vrais chantiers, avant / après si possible. Pas de photos de banque d'images." },
                    { title: "Bouton d'appel", text: "Visible sans scroller sur mobile : c'est là que vos clients vous cherchent." },
                    { title: "Demande de devis", text: "Un formulaire court : type de travaux, commune, délai souhaité, téléphone." },
                    { title: "Mentions légales", text: "Obligatoires sur tout site professionnel : identité de l'entreprise, hébergeur, contact." },
                  ].map((card) => (
                    <li
                      key={card.title}
                      className="rounded-2xl border border-encre/10 bg-creme px-5 py-4 shadow-soft"
                    >
                      <p className="text-sm font-bold uppercase tracking-widest text-or">{card.title}</p>
                      <p className="mt-2 text-sm text-taupe">{card.text}</p>
                    </li>
                  ))}
                </ul>
              )}

              {/* Q3 : exemple réel d'un site livré à une entreprise de travaux */}
              {i === 2 && (
                <div className="mt-6 overflow-hidden rounded-2xl border border-encre/10 bg-creme shadow-soft sm:flex sm:items-center">
                  <img
                    src="/realisations/site-hce.webp"
                    alt="Site internet de HCE BTP réalisé par Kota Studio"
                    loading="lazy"
                    className="block w-full sm:w-1/2"
                  />
                  <div className="px-5 py-4">
                    <p className="text-sm font-bold uppercase tracking-widest text-or">Exemple réel</p>
                    <p className="mt-2 text-sm text-taupe">
                      HCE BTP, entreprise d'enrobé et de travaux publics qui intervient dans le Jura et l'Ain : site réalisé par Kota Studio en 2026.
                    </p>
                    <a
                      href="https://www.hcetp.com"
                      target="_blank"
                      rel="noopener"
                      className="mt-3 inline-block text-sm font-semibold text-or hover:underline"
                    >
                      Voir le site en ligne : hcetp.com →
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </section>

        {/* ---- Maillage interne : prix + pages + réseaux + Haute-Savoie ---- */}
        <section className="reveal mx-auto max-w-4xl px-6 pb-24">
          <div className="rounded-2xl border border-encre/10 bg-sable/40 px-6 py-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-encre">
              Pour aller plus loin
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/combien-coute-un-site-internet" className="font-semibold text-or hover:underline">
                  Combien coûte un site internet ? Prix, délais et inclus détaillés →
                </Link>
              </li>
              <li>
                <Link to="/quelles-pages-pour-un-site-vitrine" className="font-semibold text-or hover:underline">
                  Quelles pages prévoir sur son site ? →
                </Link>
              </li>
              <li>
                <Link to="/site-internet-ou-reseaux-sociaux" className="font-semibold text-or hover:underline">
                  Site internet ou réseaux sociaux : faut-il les deux ? →
                </Link>
              </li>
              <li>
                <Link to="/creation-refonte-site-internet-haute-savoie" className="font-semibold text-or hover:underline">
                  Création et refonte de site internet en Haute-Savoie →
                </Link>
              </li>
            </ul>
          </div>
        </section>

        {/* ---- CTA final ---- */}
        <section className="reveal mx-auto max-w-4xl px-6 pb-24">
          <div className="rounded-[28px] bg-encre px-8 py-12 text-center shadow-soft-lg lg:px-14 lg:py-16">
            <h2 className="kota-title mt-0 text-3xl text-creme lg:text-4xl">
              Vos chantiers parlent pour vous. Donnons-leur une place sur Google.
            </h2>
            <p className="mt-4 text-creme/70">
              Un appel de 15 minutes pour voir si une landing page ou un site complet correspond à votre activité. Sans engagement.
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
