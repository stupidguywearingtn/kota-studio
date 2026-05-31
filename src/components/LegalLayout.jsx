import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupReveals } from "../lib/reveal";
import { legal } from "../data/content";
import Logo from "./Logo";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";

/* Surligne un champ à compléter ([entre crochets] dans content.js -> legal).
   Apparaît en doré pour que le client repère ce qu'il reste à remplir. */
export function Ph({ children }) {
  return (
    <span className="rounded bg-or/15 px-1.5 py-0.5 font-medium text-encre ring-1 ring-or/30">
      {children}
    </span>
  );
}

/* Section numérotée d'une page légale (titre doré + corps taupe). */
export function LegalSection({ n, title, children }) {
  return (
    <section className="reveal">
      <h2 className="kota-title flex items-baseline gap-2.5 text-xl lg:text-2xl">
        <span className="text-base font-bold text-or">{n}.</span>
        <span>{title}</span>
      </h2>
      <div className="mt-3 space-y-3 leading-relaxed text-taupe">{children}</div>
    </section>
  );
}

/* Gabarit commun aux pages légales — même DA crème/dorée que le reste du site,
   en-tête épuré (logo + retour), footer et bouton WhatsApp flottant. */
export default function LegalLayout({ title, intro, children }) {
  const mainRef = useRef(null);

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
      {/* En-tête : logo + retour accueil */}
      <header className="mx-auto flex max-w-4xl items-center justify-between px-6 py-6">
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

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-6 lg:pt-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-or/30 bg-creme/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-or shadow-soft">
          <span className="h-1.5 w-1.5 rounded-full bg-or" />
          Informations légales
        </span>
        <h1 className="kota-title mt-6 text-4xl lg:text-6xl">{title}</h1>
        {intro && <p className="mt-4 text-lg text-taupe">{intro}</p>}
        <p className="mt-3 text-sm text-taupe/80">
          Dernière mise à jour : <Ph>{legal.updatedAt}</Ph>
        </p>

        <div className="mt-10 space-y-10">{children}</div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
