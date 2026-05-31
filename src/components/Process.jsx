import { process } from "../data/content";

/* ============================================================================
   SECTION 6 — NOTRE PROCESS (id="process")
   Calendrier visuel des 14 jours (façon Clickway, en DA crème/dorée sur encre).
   On voit le temps s'écouler de gauche à droite : les jours avec étape ont un
   bloc, les jours "off" sont des cases vides discrètes.
   ============================================================================ */

/* Position de chaque étape dans la grille calendrier (7 colonnes × 2 rangées).
   Aligné sur l'ordre des steps dans content.js. */
const LAYOUT = [
  { col: 1, span: 1, row: 1 }, // Jour 1    — Appel découverte
  { col: 2, span: 1, row: 1 }, // Jour 2    — Questionnaire
  { col: 3, span: 4, row: 1 }, // Jours 3-6 — La magie opère (s'étale sur 4 cases)
  { col: 7, span: 1, row: 1 }, // Jour 7    — Présentation V1
  { col: 1, span: 6, row: 2 }, // Jours 8-13 — On peaufine (s'étale sur 6 cases)
  { col: 7, span: 1, row: 2 }, // Jour 14   — Livraison (doré)
];

/* Chip d'icône d'outil : relief + flottement doux. Logos colorés (logos:*). */
function ToolIcon({ icon, i, gold }) {
  return (
    <div className={i % 2 === 0 ? "float-soft" : "float-soft-delayed"}>
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-xl shadow-soft ${
          gold ? "bg-encre" : "bg-creme"
        }`}
      >
        <iconify-icon
          icon={icon}
          class={`text-2xl ${
            icon.startsWith("logos:")
              ? "" /* logos multicolores */
              : icon === "simple-icons:webflow"
              ? "text-[#146EF5]" /* bleu Webflow */
              : "text-or"
          }`}
          aria-hidden="true"
        ></iconify-icon>
      </span>
    </div>
  );
}

function StepBlock({ step, showText }) {
  const gold = step.gold === true;
  return (
    <div
      className={`flex h-full flex-col rounded-2xl p-4 ${
        gold
          ? "bg-or text-encre shadow-soft-or"
          : "border border-creme/10 bg-encre-soft shadow-soft-lg"
      }`}
    >
      <span
        className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-bold ${
          gold ? "bg-encre text-or" : "bg-or/20 text-or"
        }`}
      >
        {step.day}
      </span>

      <h3
        className={`mt-3 font-display font-bold leading-tight ${
          gold ? "text-encre" : "text-creme"
        } ${showText ? "text-lg" : "text-base"}`}
      >
        {step.title}
      </h3>

      {showText && (
        <p className={`mt-1.5 text-sm ${gold ? "text-encre/80" : "text-creme/65"}`}>
          {step.text}
        </p>
      )}

      <div className="mt-auto flex flex-wrap gap-2 pt-4">
        {step.icons.map((icon, i) => (
          <ToolIcon key={icon} icon={icon} i={i} gold={gold} />
        ))}
      </div>

      {gold && (
        <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-encre/10 px-3 py-1 text-xs font-bold text-encre">
          <iconify-icon
            icon="solar:check-circle-bold"
            class="text-base text-encre"
            aria-hidden="true"
          ></iconify-icon>
          C&apos;est en ligne
        </span>
      )}
    </div>
  );
}

export default function Process() {
  return (
    <section id="process" className="relative bg-encre text-creme py-16 sm:py-24 lg:py-32">
      {/* Halo doré décoratif */}
      <div
        className="gold-halo pointer-events-none absolute left-1/2 top-24 -translate-x-1/2 opacity-40"
        aria-hidden="true"
      ></div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* En-tête */}
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-or/30 bg-or/10 px-4 py-1.5 text-sm font-semibold text-or">
            <iconify-icon
              icon="solar:calendar-linear"
              class="text-base text-or"
              aria-hidden="true"
            ></iconify-icon>
            {process.tag}
          </span>
          <h2 className="kota-title mt-6 text-4xl text-creme lg:text-5xl">
            {process.titleLine1}
            <br />
            <span className="text-or">{process.titleHighlight}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-creme/70">{process.subtitle}</p>
        </div>

        {/* ---- Calendrier (desktop) : grille 7 × 2 ---- */}
        <div className="mt-14 hidden rounded-[28px] border border-creme/10 bg-encre-soft/30 p-4 lg:block">
          <div
            className="grid grid-cols-7 gap-3"
            style={{ gridTemplateRows: "repeat(2, minmax(178px, auto))" }}
          >
            {/* Les étapes s'étalent sur leurs jours et remplissent toute la
               grille (plus de cases vides). */}
            {process.steps.map((step, idx) => {
              const L = LAYOUT[idx];
              return (
                <div
                  key={step.title}
                  className="reveal relative"
                  style={{
                    gridColumn: `${L.col} / span ${L.span}`,
                    gridRow: L.row,
                    zIndex: 2,
                  }}
                >
                  <StepBlock step={step} showText={L.span >= 3} />
                </div>
              );
            })}
          </div>
        </div>

        {/* ---- Version mobile : pile verticale des étapes ---- */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:hidden">
          {process.steps.map((step) => (
            <div key={step.title} className="reveal">
              <StepBlock step={step} showText />
            </div>
          ))}
        </div>

        {/* ---- Bandeau de badges en défilement infini (4 copies, seamless) ---- */}
        <div className="reveal mt-16 overflow-hidden edge-fade">
          <div className="flex w-max mq-ltr">
            {Array(4)
              .fill(process.badges)
              .flat()
              .map((badge, i) => (
                <span
                  key={i}
                  aria-hidden={i >= process.badges.length ? "true" : undefined}
                  className="mx-7 inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-or/30 px-6 py-2.5 text-sm font-semibold text-creme/90"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-or" />
                  {badge}
                </span>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
