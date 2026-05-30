import { offer } from "../data/content";
import Button from "./Button";

/* SECTION 8 — OFFRE / PRIX
   Section claire (crème). Grille 2 colonnes :
   - Gauche : titre + CTA + 2 cartes (recherche & stratégie / développement sur-mesure)
   - Droite : galerie défilante (2 marquees) + bloc tarifaire (plans / inclus / options) */

export default function Offer() {
  // 4 copies de chaque rangée -> boucle marquee invisible (pas de saut/trou).
  const topRow = Array(4).fill(offer.gallery.top).flat();
  const bottomRow = Array(4).fill(offer.gallery.bottom).flat();

  // Vignette d'une réalisation : l'image se pose sur un placeholder sable.
  // Si l'image est absente (404), onError la masque -> le placeholder reste.
  const GalleryBox = ({ src }) => (
    <div className="relative mx-3 h-28 w-44 shrink-0 overflow-hidden rounded-2xl border border-encre/10 bg-sable">
      <span className="absolute inset-0 flex items-center justify-center">
        <iconify-icon
          icon="solar:gallery-wide-linear"
          class="text-3xl text-taupe/50"
          aria-hidden="true"
        ></iconify-icon>
      </span>
      <img
        src={src}
        alt="Réalisation Kota Studio"
        loading="lazy"
        className="relative h-full w-full object-cover"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    </div>
  );

  return (
    <section
      id="offre"
      className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28"
    >
      {/* Halo doré décoratif en fond */}
      <div
        className="gold-halo pointer-events-none absolute -top-10 right-0 h-72 w-72"
        aria-hidden="true"
      ></div>

      <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* ===================== COLONNE GAUCHE ===================== */}
        <div className="reveal flex flex-col">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-or/30 bg-or/10 px-4 py-1.5 text-sm font-semibold text-or">
            <iconify-icon
              icon="solar:tag-price-linear"
              class="text-base"
              aria-hidden="true"
            ></iconify-icon>
            {offer.tag}
          </span>

          <h2 className="kota-title mt-5 text-4xl lg:text-5xl">
            {offer.title}
          </h2>

          <div className="mt-7">
            <Button href={offer.cta.href} variant="primary">
              {offer.cta.label}
            </Button>
          </div>

          {/* Les 2 cartes empilées */}
          <div className="mt-9 flex flex-col gap-5">
            {offer.leftCards.map((card) => (
              <div
                key={card.title}
                className="lift rounded-3xl border border-encre/10 bg-creme p-7 shadow-soft"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-or/15 text-2xl text-or">
                  <iconify-icon
                    icon={card.icon}
                    aria-hidden="true"
                  ></iconify-icon>
                </div>

                <h3 className="kota-title mt-5 text-2xl">{card.title}</h3>

                <ul className="mt-4 flex flex-col gap-3">
                  {card.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <iconify-icon
                        icon="solar:check-circle-bold"
                        class="mt-0.5 shrink-0 text-xl text-or"
                        aria-hidden="true"
                      ></iconify-icon>
                      <span className="text-taupe">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ===================== COLONNE DROITE ===================== */}
        <div className="flex flex-col gap-8">
          {/* --- DROITE HAUT : galerie (2 marquees, sens opposés) --- */}
          <div className="reveal flex flex-col gap-4">
            {/* Rangée 1 : défile vers la GAUCHE (4 copies, boucle invisible) */}
            <div className="overflow-hidden edge-fade">
              <div className="flex w-max mq-ltr">
                {topRow.map((src, i) => (
                  <GalleryBox key={`top-${i}`} src={src} />
                ))}
              </div>
            </div>

            {/* Rangée 2 : défile vers la DROITE (4 copies, boucle invisible) */}
            <div className="overflow-hidden edge-fade">
              <div className="flex w-max mq-rtl">
                {bottomRow.map((src, i) => (
                  <GalleryBox key={`bot-${i}`} src={src} />
                ))}
              </div>
            </div>
          </div>

          {/* --- DROITE BAS : bloc tarifaire --- */}
          <div className="reveal rounded-3xl border border-encre/10 bg-creme p-7 shadow-soft lg:p-8">
            {/* Plans */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {offer.plans.map((plan) => (
                <div
                  key={plan.name}
                  className="rounded-2xl border border-encre/10 bg-sable/60 p-5"
                >
                  <p className="font-semibold text-encre">{plan.name}</p>
                  <p className="mt-1 font-display text-lg font-extrabold text-or">
                    {plan.price}
                  </p>
                </div>
              ))}
            </div>

            {/* Séparateur doré fin */}
            <div className="mt-7 flex items-center gap-3">
              <span className="h-px flex-1 bg-encre/10"></span>
              <iconify-icon
                icon="solar:diamonds-bold"
                class="text-sm text-or"
                aria-hidden="true"
              ></iconify-icon>
              <span className="h-px flex-1 bg-encre/10"></span>
            </div>

            {/* Ce qui est inclus */}
            <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-encre">
              {offer.includedTitle}
            </h3>
            <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {offer.included.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <iconify-icon
                    icon="solar:check-circle-bold"
                    class="mt-0.5 shrink-0 text-lg text-or"
                    aria-hidden="true"
                  ></iconify-icon>
                  <span className="text-sm text-taupe">{item}</span>
                </li>
              ))}
            </ul>

            {/* Options en plus */}
            <h3 className="mt-8 text-sm font-bold uppercase tracking-wide text-encre">
              {offer.extrasTitle}
            </h3>
            <ul className="mt-3">
              {offer.extras.map((extra) => (
                <li
                  key={extra.label}
                  className="flex items-center justify-between border-t border-encre/10 py-2.5"
                >
                  <span className="flex items-center gap-2.5 text-encre">
                    <iconify-icon
                      icon="solar:add-circle-linear"
                      class="text-base text-or/80"
                      aria-hidden="true"
                    ></iconify-icon>
                    {extra.label}
                  </span>
                  <span className="font-semibold text-or">{extra.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
