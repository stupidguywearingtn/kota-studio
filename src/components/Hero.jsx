import { hero, projects } from "../data/content";
import Button from "./Button";

/* APRÈS = le vrai site Tel & Cash, réutilise EXACTEMENT l'asset déjà affiché
   dans la section « Nos réalisations » (même cover, pas de régénération). */
const telAndCash = projects.find((p) => p.slug === "tel-and-cash");
const afterSrc = telAndCash?.cover ?? "/realisations/site-6.png";
const afterName = telAndCash?.name ?? "Tel & Cash";

export default function Hero() {
  const d = hero.dashboard;

  return (
    <section id="top" className="relative mx-auto max-w-7xl px-6 pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* halos dorés d'ambiance */}
      <div className="pointer-events-none absolute -top-10 -left-24 h-72 w-72 gold-halo opacity-60" />
      <div className="pointer-events-none absolute top-1/3 right-0 h-80 w-80 gold-halo opacity-40" />

      <div className="relative z-10 grid items-center gap-10 sm:gap-14 lg:grid-cols-2 lg:gap-16">
        {/* Colonne texte */}
        <div className="hero-content max-w-xl">
          <div className="badge-3d mb-[clamp(24px,4vw,32px)] inline-flex items-center gap-2.5 rounded-full border border-or/40 bg-creme px-5 py-2.5 text-sm font-semibold text-encre/80">
            {/* Étoile gold 4 branches — rotation lente continue (voir .badge-star) */}
            <svg
              className="badge-star h-4 w-4 shrink-0"
              viewBox="0 0 24 24"
              fill="#C8A24E"
              aria-hidden="true"
            >
              <path d="M12 0 L14.4 9.6 L24 12 L14.4 14.4 L12 24 L9.6 14.4 L0 12 L9.6 9.6 Z" />
            </svg>
            {hero.badge}
          </div>

          <h1
            className={`mb-8 font-display font-black leading-[0.9] tracking-[-0.04em] text-[3rem] sm:text-[4.2rem] lg:text-[5.5rem] ${
              hero.uppercase ? "uppercase" : ""
            }`}
          >
            <span className="block">
              {hero.titleBefore}
              <span className="text-outline">{hero.outlineWord}</span>
              {hero.titleMiddle}
            </span>

            {/* Mot rotatif : carte blanche qui épouse le mot + halo gold qui pulse.
               Largeur de carte, mot et halo sont synchronisés par UNE timeline GSAP
               (voir Home.jsx). Carte ancrée à gauche -> croît vers la droite. */}
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

          <p className="mb-10 max-w-lg text-lg leading-relaxed text-taupe sm:text-xl">
            {hero.subtitle}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button href={hero.primaryCta.href} variant="primary">
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="secondary">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>

        {/* Colonne illustration — comparateur AVANT / APRÈS animé (piloté par Home.jsx) */}
        <div className="hero-illustration relative flex items-center justify-center">
          <div className="pointer-events-none absolute inset-8 gold-halo opacity-50" aria-hidden="true" />

          {/* Fenêtre navigateur (mockup conservé : 3 dots + barre, ombre premium) */}
          <div className="hero-browser relative z-10 w-[94%] rounded-[26px] border border-encre/10 bg-creme p-3 sm:p-4 lg:p-5">
            {/* Barre de fenêtre */}
            <div className="mb-3 flex items-center justify-between px-1 sm:mb-4">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-or/70" />
                <span className="h-3 w-3 rounded-full bg-encre/15" />
                <span className="h-3 w-3 rounded-full bg-encre/15" />
              </div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-taupe sm:text-sm">
                <iconify-icon
                  icon="solar:transfer-horizontal-bold"
                  class="text-base text-or sm:text-lg"
                  aria-hidden="true"
                ></iconify-icon>
                Avant / Après
              </span>
            </div>

            {/* Comparateur : les deux visuels se superposent dans le même cadre.
               Sens de lecture gauche -> droite : AVANT (moche) à GAUCHE, APRÈS
               (Tel & Cash) à DROITE.
               - AVANT (maquette générique) = calque de fond, pleine largeur.
               - APRÈS (Tel & Cash) = calque du dessus, RÉVÉLÉ à droite (clippé).
               La ligne (.compare-divider) et le clip (.compare-after) sont balayés
               par UNE timeline GSAP dans Home.jsx (sine.inOut, boucle douce). */}
            <div
              className="compare relative w-full overflow-hidden rounded-2xl"
              style={{ aspectRatio: "1902 / 929" }}
            >
              {/* AVANT — faux site de vente de téléphones "PhoneShop", volontairement
                 daté/template (à GAUCHE). Même secteur que Tel & Cash, qualité opposée.
                 Tout en Arial système, palette gris-bleu froide, aucune personnalité. */}
              <div className="compare-base absolute inset-0">
                <div
                  className="generic-hero flex h-full w-full flex-col bg-[#f4f6f8] text-[#222]"
                  style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
                >
                  {/* En-tête */}
                  <div className="flex items-center justify-between border-b border-[#e1e6ec] px-[5%] py-[2.6%]">
                    <span className="text-[clamp(9px,1.6vw,19px)] font-bold text-[#1a3d6b]">
                      PhoneShop
                    </span>
                    <span className="text-[clamp(6px,0.95vw,12px)] text-[#8a949f]">
                      Accueil&nbsp;·&nbsp;Produits&nbsp;·&nbsp;Contact
                    </span>
                  </div>

                  {/* Corps : texte à gauche + placeholder photo téléphone à droite */}
                  <div className="flex flex-1 items-center gap-[4%] px-[5%] py-[3%]">
                    <div className="flex-1">
                      <h3 className="text-[clamp(12px,2.25vw,30px)] font-bold leading-tight text-[#1d1d1d]">
                        Les meilleurs téléphones au meilleur prix&nbsp;!
                      </h3>
                      <p className="mt-[3.5%] text-[clamp(7px,1.15vw,14px)] leading-snug text-[#717b86]">
                        Smartphones neufs et reconditionnés. Livraison rapide.
                        Paiement en plusieurs fois disponible.
                      </p>
                      <span
                        className="mt-[6%] inline-block bg-[#2d6cdf] px-[7%] py-[3.2%] text-[clamp(7px,1.1vw,13px)] font-bold text-white"
                        style={{ borderRadius: "3px" }}
                      >
                        Acheter maintenant
                      </span>
                    </div>

                    {/* Placeholder photo de téléphone — gris, basique / mal détouré */}
                    <div className="flex h-[78%] w-[30%] shrink-0 items-center justify-center rounded-[4px] bg-[#dde3ea]">
                      <div className="h-[78%] w-[42%] rounded-[5px] border border-[#c4ccd6] bg-[#cdd5df]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* APRÈS — le vrai site, propre et premium (révélé à DROITE) */}
              <img
                src={afterSrc}
                alt={`Site ${afterName} réalisé par Kota Studio`}
                className="compare-after absolute inset-0 h-full w-full object-cover object-top"
                draggable="false"
              />

              {/* Ligne de séparation + poignée gold */}
              <div className="compare-divider pointer-events-none absolute inset-y-0 z-20">
                <span className="compare-handle">
                  <iconify-icon icon="solar:alt-arrow-left-linear" aria-hidden="true"></iconify-icon>
                  <iconify-icon icon="solar:alt-arrow-right-linear" aria-hidden="true"></iconify-icon>
                </span>
              </div>

              {/* Labels — avant à GAUCHE (terne), après à DROITE (gold) */}
              <span className="compare-tag absolute left-2 top-2 z-10 rounded-full bg-creme/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-taupe shadow-soft sm:text-xs">
                avant
              </span>
              <span className="compare-tag absolute right-2 top-2 z-10 rounded-full bg-creme/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-or shadow-soft sm:text-xs">
                après
              </span>
            </div>
          </div>

          {/* Badge Score flottant — conservé */}
          <div className="float-soft absolute -right-3 top-4 z-20 flex items-center gap-2 rounded-2xl bg-encre px-4 py-3 text-creme shadow-soft-lg">
            <iconify-icon
              icon="solar:bolt-circle-bold"
              class="text-xl text-or"
              aria-hidden="true"
            ></iconify-icon>
            <span className="text-sm font-semibold">{d.note}</span>
          </div>

          {/* Curseur flottant — conservé */}
          <div className="float-soft-delayed absolute -left-3 bottom-8 z-20 flex h-12 w-12 items-center justify-center rounded-2xl bg-or text-encre shadow-soft-or">
            <iconify-icon
              icon="solar:cursor-bold"
              class="text-2xl"
              aria-hidden="true"
            ></iconify-icon>
          </div>
        </div>
      </div>
    </section>
  );
}
