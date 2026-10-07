import { useEffect, useRef, useState } from "react";
import { hero } from "../data/content";
import Button from "./Button";

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/* HERO « atelier » — tapis de découpe vert, titre Unbounded, mot rotatif en
   bloc surligneur jaune, et à droite une vraie scène 3D : MacBook qui joue le
   film motion design du studio (réalisé avec Thomas) + iPhone avec un site client. Le mot rotatif reste piloté par Home.jsx
   (.hero-word / .hero-card / .hero-halo). */
export default function Hero() {
  const stageRef = useRef(null);
  const [ready, setReady] = useState(false);

  // La scène 3D (three.js + modèles) se charge APRÈS l'affichage de la page :
  // l'image fixe s'affiche tout de suite, la 3D prend le relais en fondu.
  useEffect(() => {
    if (!stageRef.current || !hasWebGL()) return;
    let handle = null;
    let cancelled = false;
    const start = () =>
      import("../three/heroScene.js").then(({ mountHeroScene }) => {
        if (cancelled || !stageRef.current) return;
        handle = mountHeroScene(stageRef.current, { onReady: () => !cancelled && setReady(true) });
      });
    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 600));
    const id = idle(start, { timeout: 2000 });
    return () => {
      cancelled = true;
      if (window.cancelIdleCallback && typeof id === "number") window.cancelIdleCallback(id);
      handle?.dispose();
    };
  }, []);

  return (
    <section id="top" className="mat relative overflow-hidden">
      {/* règle jaune du tapis */}
      <div className="pointer-events-none absolute left-0 right-0 top-[64px] h-px bg-[#E8D66C]/60" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 top-0 left-[8%] w-px bg-[#E8D66C]/40" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 pt-12 pb-20 sm:px-6 lg:grid-cols-[1.08fr_.92fr] lg:gap-4 lg:pt-20 lg:pb-28">
        {/* Colonne texte */}
        <div className="hero-content">
          <div className="mb-7 inline-flex -rotate-2 items-center gap-2 rounded-lg bg-creme px-3 py-2 font-mono text-[12px] uppercase tracking-[.12em] text-encre shadow-[3px_3px_0_#141714]">
            <i className="h-2 w-2 animate-pulse rounded-full bg-hot" aria-hidden="true" />
            {hero.badge}
          </div>

          <h1 className="hero-title font-display font-black uppercase leading-[.86] tracking-[-.05em] text-onmat text-[2.9rem] sm:text-[4.4rem] lg:text-[4.6rem] xl:text-[5.1rem]">
            <span className="block">
              {hero.titleBefore}
              <span className="hero-outline">{hero.outlineWord}</span>
              {hero.titleMiddle}
            </span>
            <span className="hero-rotor">
              <span className="hero-halo" aria-hidden="true" />
              <span className="hero-card">
                <span className="hero-word-stage">
                  {hero.words.map((word) => (
                    <span className="hero-word" key={word}>
                      {word}
                    </span>
                  ))}
                </span>
              </span>
            </span>
          </h1>

          <p className="mt-8 max-w-[34ch] text-lg leading-relaxed text-onmat sm:text-xl">
            {hero.subtitle}
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button href={hero.primaryCta.href} variant="primary">
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="light">
              {hero.secondaryCta.label}
            </Button>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[12px] uppercase tracking-[.12em] text-onmat2">
            <li>✦ Sur-mesure, codé à la main</li>
            <li>✦ Livré en 14 jours</li>
            <li>✦ SEO + visibilité IA inclus</li>
          </ul>
        </div>

        {/* Colonne visuel : vrai MacBook 3D (film de Thomas, format ordinateur,
            rien n'est rogné) + vrai iPhone 3D (site Tel & Cash qui défile). */}
        <div className="hero-illustration relative mx-auto w-full max-w-[640px] lg:-mr-[8%] lg:w-[112%] lg:max-w-none">
          <span className="hand pointer-events-none absolute -left-6 top-2 z-20 hidden -rotate-6 text-[26px] leading-none text-hi lg:block">
            notre film, en 36 s ↓
          </span>

          <div className="hero-3d relative aspect-[16/15] w-full">
            <img
              src="/3d/hero-poster.webp"
              alt="MacBook et iPhone montrant le film de Kota Studio et le site Tel & Cash"
              className={`hero-3d-poster absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}
              width="1280"
              height="1200"
              fetchpriority="high"
            />
            <div
              ref={stageRef}
              className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
            />
          </div>

          {/* post-it */}
          <div className="postit absolute bottom-[3%] left-0 z-20 w-[118px] -rotate-[5deg] lg:bottom-auto lg:left-auto lg:right-[3%] lg:top-[4%] lg:w-[128px] lg:rotate-[6deg] rounded-[3px] p-3.5 sm:w-[150px] sm:p-4">
            <p className="font-display text-[20px] font-black leading-none sm:text-[22px]">14 JOURS</p>
            <p className="mt-1 text-[12px] font-medium leading-tight sm:text-[13px]">de l'appel au site en ligne</p>
          </div>
        </div>
      </div>
    </section>
  );
}
