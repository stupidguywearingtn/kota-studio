import { testimonials } from "../data/content";

/* SECTION 7 — TÉMOIGNAGES (Testimonials)
   Section claire, DA Kota Studio. Les avis ne sont pas encore là :
   chaque carte affiche un texte placeholder élégant "à venir". */
export default function Testimonials() {
  const stars = [0, 1, 2, 3, 4];

  return (
    <section
      id="temoignages"
      className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28"
    >
      {/* Halo doré décoratif en fond */}
      <div
        className="gold-halo pointer-events-none absolute -top-10 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 opacity-60"
        aria-hidden="true"
      ></div>

      {/* En-tête */}
      <div className="reveal mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-encre/10 bg-sable px-4 py-1.5 text-sm font-medium text-taupe">
          <iconify-icon
            icon="solar:chat-round-like-linear"
            class="text-base text-or"
            aria-hidden="true"
          ></iconify-icon>
          {testimonials.tag}
        </span>
        <h2 className="kota-title mt-6 text-4xl lg:text-5xl">
          {testimonials.title}
        </h2>
      </div>

      {/* Grille de cartes */}
      <div className="reveal-stagger mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
        {testimonials.items.map((item, i) => (
          <article
            key={i}
            className="lift flex flex-col gap-5 rounded-[28px] border border-encre/10 bg-creme p-8 shadow-soft"
          >
            {/* Guillemet d'ouverture doré */}
            <iconify-icon
              icon="solar:quote-up-bold"
              class="text-5xl text-or-soft"
              aria-hidden="true"
            ></iconify-icon>

            {/* 5 étoiles dorées */}
            <div className="flex items-center gap-1" aria-hidden="true">
              {stars.map((s) => (
                <iconify-icon
                  key={s}
                  icon="solar:star-bold"
                  class="text-xl text-or"
                ></iconify-icon>
              ))}
            </div>

            {/* Corps : avis à venir (placeholder) */}
            <p className="text-lg italic text-taupe">
              {testimonials.placeholderQuote}
            </p>

            {/* Séparateur fin doré */}
            <span
              className="mt-auto block h-px w-full bg-gradient-to-r from-or/30 via-encre/10 to-transparent"
              aria-hidden="true"
            ></span>

            {/* Bloc client */}
            <div className="flex items-center gap-3">
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-encre/10 bg-sable"
                aria-hidden="true"
              >
                <iconify-icon
                  icon="solar:user-rounded-linear"
                  class="text-xl text-taupe"
                ></iconify-icon>
              </span>
              <div className="flex flex-col">
                <span className="font-semibold text-encre">{item.name}</span>
                <span className="text-sm text-taupe">{item.activity}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
