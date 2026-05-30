import { marquee, logos } from "../data/content";

// 4 copies identiques d'une liste (pour une boucle marquee invisible).
const repeat4 = (arr) => Array(4).fill(arr).flat();

export default function MarqueeLogos() {
  const services = repeat4(marquee.services);
  const logoItems = repeat4(logos.items);

  return (
    <>
      {/* PART A — bandeau services : le BLOC ENTIER (fond encre + texte) est
         incliné ensemble (-2°), débordant (120%) pour couvrir toute la largeur.
         Track en w-max + 4 copies + translateX -25% = défilement TRULY INFINITE
         (jamais de saut ni de trou, quelle que soit la largeur d'écran). */}
      <div className="relative overflow-hidden py-12 md:py-16">
        <div className="-ml-[10%] w-[120%] -rotate-2 bg-encre py-6 text-creme md:py-7">
          <div className="flex w-max mq-ltr">
            {services.map((service, i) => (
              <div
                key={i}
                aria-hidden={i >= marquee.services.length ? "true" : undefined}
                className="flex shrink-0 items-center gap-12 px-12"
              >
                <span className="font-display font-extrabold tracking-title text-4xl md:text-6xl whitespace-nowrap">
                  {service}
                </span>
                {/* Séparateur : étoile pleine dorée (style SocioSpark) */}
                <iconify-icon
                  icon="mdi:star"
                  class="text-or text-4xl md:text-5xl"
                  aria-hidden="true"
                ></iconify-icon>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PART B — logos clients (section claire) */}
      <section className="relative mx-auto max-w-7xl px-6 py-16">
        <p className="reveal mb-10 text-center text-sm uppercase tracking-widest text-taupe">
          {logos.label}
        </p>

        {/* Même système : 4 copies + w-max + mq-slow (lent). Fondu sur les bords. */}
        <div className="reveal overflow-hidden edge-fade">
          <div className="flex w-max mq-slow">
            {logoItems.map((logo, i) => (
              /* Remplacer "LOGO" par un vrai <img src="..." alt="Nom du client" className="h-10 object-contain" /> */
              <div
                key={i}
                aria-hidden={i >= logos.items.length ? "true" : undefined}
                className="mx-4 flex h-16 min-w-[140px] shrink-0 items-center justify-center rounded-2xl border border-encre/10 bg-creme text-xl font-display font-extrabold tracking-title text-taupe shadow-soft"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
