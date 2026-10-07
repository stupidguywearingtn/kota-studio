import { useEffect, useRef } from "react";
import { whatWeDo } from "../data/content";
import Button from "./Button";

/* Vidéo d'illustration 3D (rendue en amont, boucle parfaite) : ne se charge
   et ne joue que lorsqu'elle est à l'écran. */
function LoopVideo({ base, label }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (v.preload !== "auto") {
            v.preload = "auto";
            v.load();
          }
          v.play().catch(() => {});
        } else v.pause();
      },
      { rootMargin: "200px" }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={`${base}-poster.webp`}
      aria-label={label}
    >
      <source src={`${base}.webm`} type="video/webm" />
      <source src={`${base}.mp4`} type="video/mp4" />
    </video>
  );
}

/* SECTION — CE QU'ON FAIT
   Deux formules clairement différentes, chacune avec son illustration 3D :
   - Landing page : UNE page, un bouton, une demande qui tombe.
   - Site sur-mesure : un vrai site de plusieurs pages (Markus Immobilier). */
export default function WhatWeDo() {
  return (
    <section id="ce-quon-fait" className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:py-28">
      <header className="reveal max-w-5xl">
        <p className="k-eyebrow">{whatWeDo.tag}</p>
        <h2 className="k-h2">
          {whatWeDo.title} <span className="k-hl">{whatWeDo.highlight}</span>
        </h2>
        <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-taupe">{whatWeDo.subtitle}</p>
      </header>

      <div className="reveal-stagger mt-12 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-2 lg:gap-10">
        {whatWeDo.cards.map((c) => {
          const dark = c.theme === "mat";
          return (
            <article key={c.key} className={`k-offer ${dark ? "matc" : "paper"}`}>
              <div className="ill" style={{ background: c.bg }}>
                <LoopVideo
                  base={c.video}
                  label={dark ? "Illustration 3D : les pages d'un site sur-mesure" : "Illustration 3D : une landing page et son bouton d'action"}
                />
              </div>

              <div className="flex flex-1 flex-col px-3 pb-3 pt-6 sm:px-5 sm:pb-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className={`k-eyebrow ${dark ? "text-hi" : "text-hot"}`}>
                      Formule {c.num} · {c.label}
                    </p>
                    <h3 className="mt-2 font-display text-[28px] font-extrabold uppercase leading-none tracking-[-.04em] sm:text-[34px]">
                      {c.title}
                    </h3>
                  </div>
                  <span className="price mt-1">{c.price}</span>
                </div>

                <p className={`mt-4 text-[16px] leading-relaxed ${dark ? "text-onmat2" : "text-taupe"}`}>{c.text}</p>

                <ul className="mt-5">
                  {c.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>

                <div className="mt-7 pt-1 lg:mt-auto lg:pt-8">
                  <Button href={c.cta.href} variant={dark ? "primary" : "secondary"}>
                    {c.cta.label}
                  </Button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <p className="reveal mt-10 text-center font-hand text-[24px] text-encre/80">
        Pas sûr de la formule ? On vous conseille pendant l'appel, c'est gratuit.
      </p>
    </section>
  );
}
