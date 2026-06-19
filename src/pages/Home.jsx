import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupReveals } from "../lib/reveal";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import MarqueeLogos from "../components/MarqueeLogos";
import WhatWeDo from "../components/WhatWeDo";
import Promises from "../components/Promises";
import Work from "../components/Work";
import Process from "../components/Process";
import Testimonials from "../components/Testimonials";
import Offer from "../components/Offer";
import FinalCta from "../components/FinalCta";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";

export default function Home() {
  const mainRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Entrée du hero */
      const heroTl = gsap.timeline();
      heroTl
        .from(".hero-content > *", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.4)",
        })
        .from(
          ".hero-illustration",
          { scale: 0.92, opacity: 0, duration: 1, ease: "power3.out" },
          "-=0.6"
        );

      /* ---- Comparateur AVANT / APRÈS du hero — balayage auto en boucle ----
         UNE timeline GSAP pilote la ligne (.compare-divider, left%) et le clip
         du calque AVANT (.compare-before, clip-path). Easing sinusoïdal très
         doux, pauses aux extrémités, on part du moche pour RÉVÉLER le beau. */
      const after = mainRef.current?.querySelector(".compare-after");
      const divider = mainRef.current?.querySelector(".compare-divider");
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (after && divider && !reduceMotion) {
        const MIN = 8; // ligne à gauche -> APRÈS (beau) occupe presque tout, à droite
        const MAX = 92; // ligne à droite -> AVANT (moche) dominant à gauche
        const SWEEP = 5.5; // durée d'un balayage (lent et fluide, identique aller/retour)
        const HOLD_AFTER = 1.8; // s'attarde côté APRÈS (Tel & Cash) pour le mettre en valeur
        const HOLD_BEFORE = 0.6; // court arrêt côté AVANT, jamais bloqué
        // AVANT à gauche / APRÈS à droite. clip-path inset(0 0 0 p%) ne montre
        // l'APRÈS (calque du dessus) qu'à DROITE de la ligne ; le balayage vers
        // la gauche agrandit l'APRÈS => révèle le beau de façon flatteuse.
        const pos = { p: MAX }; // démarre côté moche pour ensuite révéler le beau
        const apply = () => {
          after.style.clipPath = `inset(0 0 0 ${pos.p}%)`;
          divider.style.left = `${pos.p}%`;
        };
        apply();
        const sweep = gsap.timeline({
          repeat: -1,
          defaults: { ease: "sine.inOut", onUpdate: apply },
        });
        sweep
          .to(pos, { p: MIN, duration: SWEEP }) // révèle le beau (APRÈS s'agrandit)
          .to(pos, { p: MIN, duration: HOLD_AFTER }) // s'attarde sur l'APRÈS
          .to(pos, { p: MAX, duration: SWEEP }) // revient vers le moche
          .to(pos, { p: MAX, duration: HOLD_BEFORE }); // court arrêt côté AVANT
      }

      /* Reveals au scroll */
      setupReveals();

      /* Ligne de progression dorée du Process (si présente) */
      const line = mainRef.current?.querySelector(".process-line");
      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: "left center",
            ease: "none",
            scrollTrigger: { trigger: line, start: "top 85%", end: "+=420", scrub: true },
          }
        );
      }
    }, mainRef);

    /* ============================================================
       MOT ROTATIF "gender reveal" Kota — UNE seule timeline GSAP
       qui synchronise sur les MÊMES keyframes :
         • le mot sortant qui monte + s'efface,
         • la largeur de la carte blanche qui épouse le mot suivant,
         • le halo gold qui respire (largeur + opacité),
         • le mot entrant qui glisse depuis le bas (léger chevauchement).
       Hors gsap.context() car la mesure des largeurs attend le chargement
       de la police (document.fonts.ready) et on réagit au resize. */
    const root = mainRef.current;
    const words = gsap.utils.toArray(".hero-word");
    const card = root?.querySelector(".hero-card");
    const halo = root?.querySelector(".hero-halo");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let wordTl = null;
    let resizeTimer = null;
    let killed = false;

    // Largeur de carte = largeur naturelle du mot + padding horizontal réel
    // (clamp() résolu en px par getComputedStyle -> s'adapte au responsive).
    const measure = () => {
      let padX = 80;
      if (card) {
        const cs = getComputedStyle(card);
        padX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
      }
      return words.map((w) => Math.round(w.getBoundingClientRect().width + padX));
    };

    const buildRotor = () => {
      if (killed || !words.length || !card || !halo) return;
      if (wordTl) {
        wordTl.kill();
        wordTl = null;
      }

      const cardW = measure();
      const maxW = Math.max(...cardW);
      const haloW = (w) => Math.round(w * 1.3);
      const haloOp = (w) => 0.32 + (w / maxW) * 0.18; // mot long = halo + présent

      // prefers-reduced-motion : mot statique, carte au plus large, aucune anim.
      if (reduce) {
        gsap.set(words, { yPercent: 0, opacity: 0 });
        gsap.set(words[0], { opacity: 1 });
        gsap.set(card, { width: maxW });
        gsap.set(halo, { width: haloW(maxW), opacity: 0.42 });
        return;
      }

      const n = words.length;
      const HOLD = 2.4; // temps d'affichage (≈ HOLD - OVERLAP ≈ 2,2 s visible)
      const DUR = 0.7; // durée du "rouleau"
      const OVERLAP = 0.18; // léger chevauchement sortie/entrée
      const SLIDE = 120; // % de la hauteur du mot (clippé par la carte)
      const STEP = HOLD + DUR; // période par mot — STRICTEMENT identique pour tous

      // État initial : seul le 1er mot est posé (calé à gauche), les autres en bas.
      gsap.set(words, { yPercent: SLIDE, opacity: 0 });
      gsap.set(words[0], { yPercent: 0, opacity: 1 });
      gsap.set(card, { width: cardW[0] });
      gsap.set(halo, { width: haloW(cardW[0]), opacity: haloOp(cardW[0]) });

      // Boucle VRAIMENT infinie et homogène :
      //   • chaque sortie est placée à i*STEP -> espacement constant ;
      //   • repeat:-1 sans aucun repeatDelay ;
      //   • durée épinglée à n*STEP -> l'enchaînement "dernier -> premier" est
      //     EXACTEMENT identique aux autres (le mot 0 dispose du même temps
      //     d'affichage avant que la boucle ne reparte, zéro carte vide) ;
      //   • delay:HOLD = simple latence d'affichage initiale (ne se répète pas).
      wordTl = gsap.timeline({
        repeat: -1,
        delay: HOLD,
        defaults: { duration: DUR, ease: "power3.inOut" },
      });

      words.forEach((word, i) => {
        const ni = (i + 1) % n; // après le dernier mot -> retour à l'index 0
        const next = words[ni];
        const at = i * STEP;
        // sortie du mot + redimensionnement carte + respiration halo : MÊME instant
        wordTl.to(word, { yPercent: -SLIDE, opacity: 0 }, at);
        wordTl.to(card, { width: cardW[ni] }, at);
        wordTl.to(halo, { width: haloW(cardW[ni]), opacity: haloOp(cardW[ni]) }, at);
        // entrée du mot suivant par le bas, léger chevauchement.
        // immediateRender:false => l'état "from" n'est PAS rendu au build
        // (sinon les mots seraient masqués au repos -> carte vide).
        wordTl.fromTo(
          next,
          { yPercent: SLIDE, opacity: 0 },
          { yPercent: 0, opacity: 1, immediateRender: false },
          at + OVERLAP
        );
      });

      // Épingle la durée totale à n*STEP : la dernière entrée (mot 0) obtient
      // le MÊME temps d'affichage que les autres avant le rebouclage. Aucun trou.
      wordTl.to({}, { duration: 0 }, n * STEP);
    };

    // Mesure fiable une fois la police Bricolage chargée.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => buildRotor());
    } else {
      buildRotor();
    }

    // Resize : les largeurs changent avec la taille de police responsive.
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => buildRotor(), 200);
    };
    window.addEventListener("resize", onResize);

    const refreshId = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      killed = true;
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      if (wordTl) wordTl.kill();
      ctx.revert();
      clearTimeout(refreshId);
    };
  }, []);

  return (
    <div ref={mainRef} className="relative overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <MarqueeLogos />
        <WhatWeDo />
        <Promises />
        <Work />
        <Process />
        <Testimonials />
        <Offer />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
