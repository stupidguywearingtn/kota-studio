import { Link } from "react-router-dom";
import { work, projects } from "../data/content";

/* SECTION 5 — NOS RÉALISATIONS (id="realisations")
   4 cartes projet avec aperçu réel, hover élégant, lien vers la page projet. */
export default function Work() {
  return (
    <section id="realisations" className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28">
      {/* En-tête */}
      <div className="reveal mb-12 lg:mb-16">
        <span className="inline-flex items-center gap-2 rounded-full border border-or/30 bg-or/10 px-4 py-1.5 text-sm font-semibold text-or">
          <iconify-icon icon="solar:gallery-favourite-linear" class="text-base text-or" aria-hidden="true"></iconify-icon>
          {work.tag}
        </span>
        <h2 className="kota-title mt-6 text-4xl lg:text-6xl">
          {work.titleBefore}{" "}
          <span className="gold-underline">{work.titleHighlight}</span>
        </h2>
      </div>

      {/* Grille 2×2 */}
      <div className="reveal-stagger grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
        {projects.map((p) => (
          <Link
            key={p.slug}
            to={`/projets/${p.slug}`}
            aria-label={`Voir le projet ${p.name}`}
            className="lift group block overflow-hidden rounded-[28px] border border-encre/10 bg-creme shadow-soft"
          >
            {/* Aperçu */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={p.cover}
                alt={`Aperçu du site ${p.name}`}
                loading="lazy"
                className="h-full w-full object-cover object-top transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
              />
              {/* Voile doré au survol */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-encre/55 via-or/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden="true"
              ></div>

              {/* Badge catégorie + année */}
              <div className="absolute inset-x-4 top-4 flex items-center justify-between">
                <span className="rounded-full bg-encre/90 px-3 py-1 text-xs font-bold text-creme backdrop-blur">
                  {p.badge}
                </span>
                <span className="rounded-full bg-creme/85 px-3 py-1 text-xs font-bold text-encre backdrop-blur">
                  {p.year}
                </span>
              </div>

              {/* "Voir le projet" — apparaît au survol */}
              <div className="absolute inset-x-4 bottom-4 flex translate-y-3 items-center justify-between opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-sm font-semibold text-creme drop-shadow">
                  {work.cardCta}
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-or text-encre shadow-soft-or">
                  <iconify-icon icon="solar:arrow-right-up-linear" class="arrow-advance text-xl" aria-hidden="true"></iconify-icon>
                </span>
              </div>
            </div>

            {/* Nom + secteur */}
            <div className="flex items-center justify-between gap-4 p-5 lg:p-6">
              <div>
                <h3 className="kota-title text-xl lg:text-2xl">{p.name}</h3>
                <p className="mt-1 text-sm text-taupe">{p.sector}</p>
              </div>
              <iconify-icon
                icon="solar:arrow-right-linear"
                class="arrow-advance shrink-0 text-2xl text-encre/40"
                aria-hidden="true"
              ></iconify-icon>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
