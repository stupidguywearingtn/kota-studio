import { hero } from "../data/content";
import Button from "./Button";

/* HERO « atelier » — tapis de découpe vert, titre Unbounded, mot rotatif en
   bloc surligneur jaune, et à droite un iPhone qui joue le film motion design
   du studio (réalisé avec Thomas). Le mot rotatif reste piloté par Home.jsx
   (.hero-word / .hero-card / .hero-halo). */
export default function Hero() {
  return (
    <section id="top" className="mat relative overflow-hidden">
      {/* règle jaune du tapis */}
      <div className="pointer-events-none absolute left-0 right-0 top-[64px] h-px bg-[#E8D66C]/60" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 top-0 left-[8%] w-px bg-[#E8D66C]/40" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 pt-12 pb-20 sm:px-6 lg:grid-cols-[1.15fr_.85fr] lg:gap-10 lg:pt-20 lg:pb-28">
        {/* Colonne texte */}
        <div className="hero-content">
          <div className="mb-7 inline-flex -rotate-2 items-center gap-2 rounded-lg bg-creme px-3 py-2 font-mono text-[12px] uppercase tracking-[.12em] text-encre shadow-[3px_3px_0_#141714]">
            <i className="h-2 w-2 animate-pulse rounded-full bg-hot" aria-hidden="true" />
            {hero.badge}
          </div>

          <h1 className="hero-title font-display font-black uppercase leading-[.86] tracking-[-.05em] text-onmat text-[2.9rem] sm:text-[4.4rem] lg:text-[5.4rem]">
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

        {/* Colonne visuel : iPhone qui joue le film du studio */}
        <div className="hero-illustration relative mx-auto w-full max-w-[300px] lg:max-w-[310px]">
          <span className="hand absolute -left-24 top-16 hidden -rotate-6 text-[26px] leading-none text-hi lg:block">
            notre film,<br />en 36 s →
          </span>

          <div className="hero-phone relative">
            <span className="tape" style={{ top: -14, left: "calc(50% - 48px)", transform: "rotate(-4deg)" }} />
            <div className="hero-phone-frame">
              <div className="hero-phone-island" aria-hidden="true" />
              <video
                className="hero-phone-screen"
                src="/video/kota-motion.mp4"
                poster="/video/kota-motion-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Film motion design de Kota Studio"
              />
            </div>
          </div>

          {/* post-it */}
          <div className="postit absolute -right-6 bottom-16 w-[150px] rotate-[5deg] rounded-[3px] p-4 sm:-right-14">
            <p className="font-display text-[22px] font-black leading-none">14 JOURS</p>
            <p className="mt-1 text-[13px] font-medium leading-tight">de l'appel au site en ligne</p>
          </div>

          {/* tampon */}
          <svg className="stamp-ink pointer-events-none absolute -left-20 bottom-24 hidden sm:block h-[104px] w-[104px] -rotate-12" viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="4" />
            <circle cx="60" cy="60" r="44" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <defs><path id="sc" d="M60,60 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" /></defs>
            <text fontFamily="JetBrains Mono, monospace" fontSize="10.5" letterSpacing="2.6" fill="currentColor">
              <textPath href="#sc">FAIT MAIN · SANS TEMPLATE · </textPath>
            </text>
            <text x="60" y="68" textAnchor="middle" fontFamily="Unbounded, sans-serif" fontWeight="900" fontSize="22" fill="currentColor">OK</text>
          </svg>
        </div>
      </div>
    </section>
  );
}
