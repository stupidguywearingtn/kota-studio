import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupReveals } from "../lib/reveal";
import {
  GUIDE_DATES,
  buildGoogleDelayJsonLd,
  googleDelayFaqs,
  GOOGLE_DELAY_PATH,
  AI_VISIBILITY_PATH,
  PRICING_GUIDE_PATH,
  SOCIAL_VS_SITE_PATH,
  PAGE_SCHEMA_ATTR,
} from "../lib/jsonld";
import { whatsapp } from "../data/content";
import Logo from "../components/Logo";
import Button from "../components/Button";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";

const SITE_URL = "https://kotastudio.fr";
const PAGE_PATH = GOOGLE_DELAY_PATH;
const META_TITLE = "Combien de temps pour apparaître sur Google ? | Kota Studio";
const META_DESCRIPTION =
  "Délai réel pour qu'un nouveau site apparaisse sur Google, indexation ou classement, comment l'accélérer, Google Maps, ChatGPT et AI Overviews : ce que dit Google, sans promesse.";
const UPDATED_AT = GUIDE_DATES[PAGE_PATH].updated;

/* Les 7 questions/réponses affichées ci-dessous + reprises mot pour mot dans
   le JSON-LD FAQPage. Définies une seule fois dans lib/jsonld.js (source de
   vérité partagée avec le pré-rendu statique), réutilisées ici pour
   l'affichage sous le nom `faqs`. */
const faqs = googleDelayFaqs;

/* Sources officielles citées dans les réponses (consultées le 28/11/2026). */
const SOURCES = [
  { label: "Google Search Central — Inclure votre site Web sur Google", href: "https://developers.google.com/search/docs/fundamentals/get-on-google?hl=fr" },
  { label: "Google Search Central — Demander à Google d'explorer à nouveau vos URL", href: "https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl?hl=fr" },
  { label: "Google Search Central — Fonctionnement de la recherche Google", href: "https://developers.google.com/search/docs/fundamentals/how-search-works?hl=fr" },
  { label: "Google Search Central — Créer et envoyer un sitemap", href: "https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=fr" },
  { label: "Aide Google Business Profile — Améliorer son classement local", href: "https://support.google.com/business/answer/7091?hl=fr" },
  { label: "OpenAI — Overview of OpenAI Crawlers", href: "https://platform.openai.com/docs/bots" },
];

export default function GoogleDelayPage() {
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
     (même fonction buildGoogleDelayJsonLd) pour les crawlers sans JS — voir le
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
    script.setAttribute(PAGE_SCHEMA_ATTR, "google-delay");
    script.textContent = JSON.stringify(buildGoogleDelayJsonLd());
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
            <span className="text-encre">Combien de temps pour apparaître sur Google ?</span>
          </nav>

          <span className="inline-flex items-center gap-2 tag-label">
            <span className="h-1.5 w-1.5 rounded-full bg-or" />
            Guide pratique
          </span>
          <h1 className="kota-title mt-6 text-4xl lg:text-6xl">
            Combien de temps pour apparaître sur Google après la mise en ligne ?
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-taupe">
            Indexation, classement, Google Maps, ChatGPT : ce que Google dit réellement des délais, ce qui accélère vraiment les choses, ce qui ne dépend de personne, et ce que Kota Studio fait le jour de la mise en ligne. Sans promesse de position.
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

              {/* Q3 : les 3 gestes Search Console */}
              {i === 2 && (
                <ol className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[
                    { title: "1. Search Console", text: "Ajouter le site à Google Search Console et valider la propriété (fichier, balise ou enregistrement DNS)." },
                    { title: "2. Sitemap", text: "Soumettre l'adresse du sitemap.xml dans le menu « Sitemaps » : une indication pour Google, pas une obligation." },
                    { title: "3. Inspection d'URL", text: "Demander l'indexation de l'accueil et des pages clés, une seule fois par page : répéter n'accélère rien." },
                  ].map((card) => (
                    <li
                      key={card.title}
                      className="rounded-2xl border border-encre/10 bg-creme px-5 py-4 shadow-soft"
                    >
                      <p className="text-sm font-bold uppercase tracking-widest text-or">{card.title}</p>
                      <p className="mt-2 text-sm text-taupe">{card.text}</p>
                    </li>
                  ))}
                </ol>
              )}

              {/* Q4 : checklist des causes fréquentes */}
              {i === 3 && (
                <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    { title: "Site très récent", text: "Quelques jours en ligne : Google ne l'a peut-être pas encore découvert." },
                    { title: "Pas de Search Console", text: "Aucune propriété validée : aucun sitemap soumis, aucune donnée sur ce que Google voit." },
                    { title: "Aucun lien entrant", text: "Ni fiche Google, ni annuaire, ni partenaire ne pointe vers le site." },
                    { title: "Blocage des robots", text: "Une balise « noindex » oubliée ou une règle « Disallow » dans robots.txt." },
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

              {/* Q5 : renvoi vers le guide site / réseaux sociaux (fiche Google) */}
              {i === 4 && (
                <p className="mt-4 text-sm">
                  <Link to={SOCIAL_VS_SITE_PATH} className="font-semibold text-or hover:underline">
                    Site internet ou réseaux sociaux : faut-il les deux ? →
                  </Link>
                </p>
              )}

              {/* Q6 : renvoi vers le guide GEO */}
              {i === 5 && (
                <p className="mt-4 text-sm">
                  <Link to={AI_VISIBILITY_PATH} className="font-semibold text-or hover:underline">
                    Comment apparaître dans ChatGPT et les IA quand on a un site local ? →
                  </Link>
                </p>
              )}

              {/* Q7 : renvoi vers le guide prix */}
              {i === 6 && (
                <p className="mt-4 text-sm">
                  <Link to={PRICING_GUIDE_PATH} className="font-semibold text-or hover:underline">
                    Combien coûte un site internet ? Prix, délais et inclus détaillés →
                  </Link>
                </p>
              )}
            </div>
          ))}
        </section>

        {/* ---- Sources officielles (datées) ---- */}
        <section className="reveal mx-auto max-w-4xl px-6 pb-10">
          <h3 className="text-sm font-bold uppercase tracking-widest text-encre">
            Sources (consultées le 28 novembre 2026)
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-taupe">
            {SOURCES.map((src) => (
              <li key={src.href} className="break-words">
                <a href={src.href} target="_blank" rel="noopener noreferrer" className="underline decoration-encre/20 underline-offset-2 hover:text-or">
                  {src.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* ---- Maillage interne : choisir une agence + refonte + préparer + Haute-Savoie ---- */}
        <section className="reveal mx-auto max-w-4xl px-6 pb-24">
          <div className="rounded-2xl border border-encre/10 bg-sable/40 px-6 py-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-encre">
              Pour aller plus loin
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/comment-choisir-une-agence-web" className="font-semibold text-or hover:underline">
                  Comment choisir une agence de création de site internet ? →
                </Link>
              </li>
              <li>
                <Link to="/quand-refaire-son-site-internet" className="font-semibold text-or hover:underline">
                  Quand refaire son site internet ? (et comment ne pas perdre son référencement) →
                </Link>
              </li>
              <li>
                <Link to="/que-preparer-avant-de-creer-son-site-internet" className="font-semibold text-or hover:underline">
                  Que préparer avant de faire créer son site internet ? →
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
              Un site à mettre en ligne, ou un site qui reste invisible ?
            </h2>
            <p className="mt-4 text-creme/70">
              15 minutes pour faire le point sur votre projet ou sur ce qui bloque, sans promesse de position. Sans engagement.
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
