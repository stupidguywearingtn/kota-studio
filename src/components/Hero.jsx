import { hero } from "../data/content";
import Button from "./Button";

/* Courbe lissée (Catmull-Rom -> Bézier) passant par le sommet des barres :
   une seule ligne continue qui « serpente » de Mois 1 à Mois 4. */
function smoothPath(pts) {
  if (pts.length < 2) return "";
  const d = [`M${pts[0][0]},${pts[0][1]}`];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d.push(`C${c1x},${c1y} ${c2x},${c2y} ${p2[0]},${p2[1]}`);
  }
  return d.join(" ");
}

export default function Hero() {
  const d = hero.dashboard;
  const n = d.months.length;
  const trendPath = smoothPath(
    d.months.map((m, i) => [(i + 0.5) * (100 / n), 100 - m.height])
  );
  const lastPct = d.months[n - 1].pct;

  return (
    <section id="top" className="relative mx-auto max-w-7xl px-6 pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* halos dorés d'ambiance */}
      <div className="pointer-events-none absolute -top-10 -left-24 h-72 w-72 gold-halo opacity-60" />
      <div className="pointer-events-none absolute top-1/3 right-0 h-80 w-80 gold-halo opacity-40" />

      <div className="relative z-10 grid items-center gap-10 sm:gap-14 lg:grid-cols-2 lg:gap-16">
        {/* Colonne texte */}
        <div className="hero-content max-w-xl">
          <div className="badge-3d mb-7 inline-flex items-center gap-2.5 rounded-full border border-or/40 bg-creme px-5 py-2.5 text-sm font-semibold text-encre/80">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-or/50" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-or" />
            </span>
            {hero.badge}
          </div>

          <h1
            className={`mb-8 font-display font-black leading-[0.9] tracking-[-0.04em] text-[3rem] sm:text-[4.2rem] lg:text-[5.5rem] ${
              hero.uppercase ? "uppercase" : ""
            }`}
          >
            {hero.titleBefore}
            <span className="text-outline">{hero.outlineWord}</span>
            {hero.titleMiddle}
            <span className="hero-word-wrap">
              <span className="hero-word-clip">
                {hero.words.map((word, i) => (
                  <span className="hero-word" key={word} data-index={i}>
                    {word}
                  </span>
                ))}
              </span>
              {/* Soulignement en vague dorée */}
              <span className="hero-wave" aria-hidden="true">
                <svg viewBox="0 0 120 12" preserveAspectRatio="none">
                  <path
                    d="M0 6 Q 7.5 0 15 6 T 30 6 T 45 6 T 60 6 T 75 6 T 90 6 T 105 6 T 120 6"
                    fill="none"
                    stroke="#C8A24E"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
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

        {/* Colonne illustration — dashboard animé (piloté par App.jsx) */}
        <div className="hero-illustration relative flex h-[420px] items-center justify-center sm:h-[480px] lg:h-[560px]">
          <div className="pointer-events-none absolute inset-8 gold-halo opacity-50" aria-hidden="true" />

          {/* Fenêtre navigateur */}
          <div className="relative z-10 w-[94%] rounded-[26px] border border-encre/10 bg-creme p-5 shadow-soft-lg lg:p-7">
            {/* Barre de fenêtre */}
            <div className="mb-5 flex items-center justify-between border-b border-encre/10 pb-4">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-or/70" />
                <span className="h-3 w-3 rounded-full bg-encre/15" />
                <span className="h-3 w-3 rounded-full bg-encre/15" />
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-taupe">
                <iconify-icon
                  icon="solar:graph-up-linear"
                  class="text-lg text-or"
                  aria-hidden="true"
                ></iconify-icon>
                {d.label}
              </span>
            </div>

            {/* Zone graphique — calques empilés proprement :
               barres (z-10) < courbe (z-20) < points + labels (z-30).
               Rien ne dépasse du cadre (barres plafonnées + overflow-hidden). */}
            <div className="relative h-[230px] lg:h-[260px]">
              {/* Barres */}
              <div className="absolute inset-0 z-10 flex items-end justify-between gap-3 px-1">
                {d.months.map((m, i) => {
                  const last = i === n - 1;
                  return (
                    <div
                      key={m.label}
                      className="flex h-full w-1/4 items-end justify-center"
                    >
                      <div
                        className={`dash-bar w-[64%] rounded-t-lg ${
                          last
                            ? "bg-encre"
                            : "bg-gradient-to-t from-[#ECDCB2] to-or"
                        }`}
                        style={{ height: `${m.height}%` }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Courbe de tendance dorée — au-dessus des barres, se dessine */}
              <svg
                className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  className="dash-trend"
                  d={trendPath}
                  pathLength="1"
                  fill="none"
                  stroke="#C8A24E"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {/* Points (nodes) au sommet de chaque barre + label % (compteur) */}
              <div className="pointer-events-none absolute inset-0 z-30">
                {d.months.map((m, i) => {
                  const last = i === n - 1;
                  return (
                    <div key={m.label}>
                      {/* node circulaire (HTML -> reste rond) */}
                      <span
                        className="dash-dot absolute h-3.5 w-3.5 -translate-x-1/2 translate-y-1/2 rounded-full border-2 border-or bg-creme shadow-soft"
                        style={{
                          left: `${(i + 0.5) * (100 / n)}%`,
                          bottom: `${m.height}%`,
                        }}
                      />
                      {/* label de pourcentage */}
                      <div
                        className="dash-pct absolute -translate-x-1/2 whitespace-nowrap"
                        style={{
                          left: `${(i + 0.5) * (100 / n)}%`,
                          bottom: `calc(${m.height}% + 16px)`,
                        }}
                      >
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold shadow-soft ${
                            last ? "bg-encre text-creme" : "bg-creme text-or ring-1 ring-or/30"
                          }`}
                        >
                          +<span className="dash-num" data-target={m.pct}>0</span>%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Labels des mois */}
            <div className="mt-3 flex justify-between px-1 text-xs font-medium text-taupe">
              {d.months.map((m) => (
                <span key={m.label} className="w-1/4 text-center">
                  {m.label}
                </span>
              ))}
            </div>

            {/* Métrique principale */}
            <div className="dash-total mt-4 flex items-center gap-2 border-t border-encre/10 pt-4 text-sm text-taupe">
              <span className="font-display text-xl font-extrabold text-or">
                +<span className="dash-total-num" data-target={lastPct}>0</span>%
              </span>
              {d.metricLabel}
            </div>
          </div>

          {/* Badge Score flottant */}
          <div className="float-soft absolute -right-3 top-6 z-20 flex items-center gap-2 rounded-2xl bg-encre px-4 py-3 text-creme shadow-soft-lg">
            <iconify-icon
              icon="solar:bolt-circle-bold"
              class="text-xl text-or"
              aria-hidden="true"
            ></iconify-icon>
            <span className="text-sm font-semibold">{d.note}</span>
          </div>

          {/* Curseur flottant */}
          <div className="float-soft-delayed absolute -left-3 bottom-12 z-20 flex h-12 w-12 items-center justify-center rounded-2xl bg-or text-encre shadow-soft-or">
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
