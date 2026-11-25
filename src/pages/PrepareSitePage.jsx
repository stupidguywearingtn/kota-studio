import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupReveals } from "../lib/reveal";
import { buildPrepareSiteJsonLd, prepareSiteFaqs, PAGE_SCHEMA_ATTR } from "../lib/jsonld";
import { whatsapp } from "../data/content";
import Logo from "../components/Logo";
import Button from "../components/Button";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";

const SITE_URL = "https://kotastudio.fr";
const PAGE_PATH = "/que-preparer-avant-de-creer-son-site-internet";
const META_TITLE = "Que préparer avant de faire créer son site internet ? | Kota Studio";
const META_DESCRIPTION =
  "Ce qu'il faut préparer avant de faire créer son site : infos pour le devis, éléments à fournir, domaine, cahier des charges, ce qui retarde un projet et budget réel.";
const UPDATED_AT = "25 novembre 2026";

/* Les 6 questions/réponses affichées ci-dessous + reprises mot pour mot dans
   le JSON-LD FAQPage. Définies une seule fois dans lib/jsonld.js (source de
   vérité partagée avec le pré-rendu statique), réutilisées ici pour
   l'affichage sous le nom `faqs`. */
const faqs = prepareSiteFaqs;

export default function PrepareSitePage() {
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
     (même fonction buildPrepareSiteJsonLd) pour les crawlers sans JS — voir le
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
    script.setAttribute(PAGE_SCHEMA_ATTR, "prepare-site");
    script.textContent = JSON.stringify(buildPrepareSiteJsonLd());
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
            <span className="text-encre">Que préparer avant de créer son site ?</span>
          </nav>

          <span className="inline-flex items-center gap-2 tag-label">
            <span className="h-1.5 w-1.5 rounded-full bg-or" />
            Guide pratique
          </span>
          <h1 className="kota-title mt-6 text-4xl lg:text-6xl">
            Que préparer avant de faire créer son site internet ?
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-taupe">
            Ce qu'il faut avoir en tête avant le premier appel, ce que vous devrez fournir, ce que l'agence fait à votre place et ce qui fait glisser un planning : la liste de ce que Kota Studio demande réellement à ses clients.
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

              {/* Q2 : checklist de ce que le client apporte */}
              {i === 1 && (
                <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    { title: "Logo", text: "Le fichier d'origine si vous l'avez. Pas de logo ? L'option logo & branding est à +490 €." },
                    { title: "Photos réelles", text: "Vos réalisations, vos locaux, votre équipe : ce qu'aucune banque d'images ne montre." },
                    { title: "Prestations ou produits", text: "La liste de ce que vous vendez, avec ce qui vous distingue pour chacun." },
                    { title: "Coordonnées et horaires", text: "Nom, adresse et téléphone écrits exactement comme sur votre fiche Google." },
                    { title: "Textes ou informations", text: "Vos textes, ou les informations brutes à faire passer : l'option rédaction est à +290 €." },
                    { title: "Accès existants", text: "Si vous avez déjà un nom de domaine ou un ancien site : l'accès au compte où ils sont enregistrés." },
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

              {/* Q3 : renvoi vers le guide propriété du domaine */}
              {i === 2 && (
                <p className="mt-4 text-sm">
                  <Link to="/nom-de-domaine-et-propriete-du-site" className="font-semibold text-or hover:underline">
                    Qui est propriétaire de mon site et de mon nom de domaine ? →
                  </Link>
                </p>
              )}

              {/* Q4 : renvoi vers le guide des pages */}
              {i === 3 && (
                <p className="mt-4 text-sm">
                  <Link to="/quelles-pages-pour-un-site-vitrine" className="font-semibold text-or hover:underline">
                    Quelles pages prévoir sur son site ? →
                  </Link>
                </p>
              )}

              {/* Q6 : renvoi vers le guide prix */}
              {i === 5 && (
                <p className="mt-4 text-sm">
                  <Link to="/combien-coute-un-site-internet" className="font-semibold text-or hover:underline">
                    Combien coûte un site internet ? Prix, délais et inclus détaillés →
                  </Link>
                </p>
              )}
            </div>
          ))}
        </section>

        {/* ---- Maillage interne : choisir une agence + artisan + réseaux + Haute-Savoie ---- */}
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
                <Link to="/creation-site-internet-artisan" className="font-semibold text-or hover:underline">
                  Site internet pour artisan : quoi mettre, quel prix, quel délai ? →
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
              Pas encore tout prêt ? L'appel sert justement à faire le point.
            </h2>
            <p className="mt-4 text-creme/70">
              15 minutes pour voir ce que vous avez déjà, ce qui manque et ce qui peut être pris en option. Sans engagement.
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
