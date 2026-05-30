import { whatWeDo } from "../data/content";
import Button from "./Button";

/* SECTION 3 — CE QU'ON FAIT
   Deux cartes (crème / encre) présentant les deux formules,
   chacune avec un mockup navigateur prêt à recevoir une capture. */
export default function WhatWeDo() {
  return (
    <section
      id="ce-quon-fait"
      className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28"
    >
      {/* Halo doré décoratif */}
      <div
        className="gold-halo pointer-events-none absolute -top-10 right-0 h-72 w-72"
        aria-hidden="true"
      ></div>

      {/* En-tête */}
      <header className="reveal relative max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-encre/10 bg-sable px-4 py-1.5 text-sm font-medium text-taupe">
          <span className="h-2 w-2 rounded-full bg-or" aria-hidden="true"></span>
          {whatWeDo.tag}
        </span>
        <h2 className="kota-title mt-6 text-4xl leading-[1.05] lg:text-6xl">
          <span>{whatWeDo.titleStrong}</span>{" "}
          <span className="font-light text-taupe">{whatWeDo.titleLight}</span>
        </h2>
      </header>

      {/* Grille des deux formules */}
      <div className="reveal-stagger mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {whatWeDo.cards.map((card, i) => {
          const isDark = card.theme === "encre";
          const floatClass = i % 2 === 0 ? "float-soft" : "float-soft-delayed";

          return (
            <article
              key={card.title}
              className={`lift relative flex flex-col rounded-[28px] p-8 lg:p-10 ${
                isDark
                  ? "bg-encre text-creme shadow-soft-lg"
                  : "bg-creme border border-encre/10 shadow-soft"
              }`}
            >
              {/* Label */}
              <p className="text-sm font-medium uppercase tracking-widest text-or">
                {card.label}
              </p>

              {/* Titre */}
              <h3
                className={`kota-title mt-3 text-3xl lg:text-4xl ${
                  isDark ? "text-creme" : ""
                }`}
              >
                {card.title}
              </h3>

              {/* Mockup navigateur — wrapper flottant, jamais sur l'élément 3D */}
              <div className={`${floatClass} mt-8`}>
                <div
                  className={`mockup-3d overflow-hidden rounded-2xl border shadow-soft ${
                    isDark
                      ? "bg-encre-soft border-creme/10"
                      : "bg-white border-encre/10"
                  }`}
                >
                  {/* Barre du navigateur */}
                  <div
                    className={`flex items-center gap-3 border-b px-4 py-3 ${
                      isDark
                        ? "border-creme/10 bg-encre"
                        : "border-encre/5 bg-sable"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span
                        className="h-2.5 w-2.5 rounded-full bg-or"
                        aria-hidden="true"
                      ></span>
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          isDark ? "bg-creme/20" : "bg-encre/15"
                        }`}
                        aria-hidden="true"
                      ></span>
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          isDark ? "bg-creme/20" : "bg-encre/15"
                        }`}
                        aria-hidden="true"
                      ></span>
                    </div>
                    {/* Pilule URL centrée */}
                    <div
                      className={`flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-1 text-xs text-taupe ${
                        isDark ? "bg-encre-soft" : "bg-creme"
                      }`}
                    >
                      <iconify-icon
                        icon="solar:lock-keyhole-minimalistic-linear"
                        class="text-xs text-or"
                        aria-hidden="true"
                      ></iconify-icon>
                      {card.browser.url}
                    </div>
                  </div>

                  {/* Corps : maquette stylisée abstraite */}
                  {/* Remplacer par une vraie capture */}
                  <div className="p-5">
                    <div className="flex items-start gap-4">
                      {/* Bloc d'accent doré */}
                      <div className="h-12 w-12 shrink-0 rounded-xl bg-or"></div>
                      <div className="flex-1 space-y-2 pt-1">
                        <div
                          className={`h-3 w-3/4 rounded-full ${
                            isDark ? "bg-creme/15" : "bg-sable"
                          }`}
                        ></div>
                        <div
                          className={`h-3 w-1/2 rounded-full ${
                            isDark ? "bg-creme/10" : "bg-creme"
                          }`}
                        ></div>
                      </div>
                    </div>

                    <div
                      className={`mt-5 h-24 rounded-xl ${
                        isDark ? "bg-creme/5" : "bg-sable"
                      }`}
                    ></div>

                    <div className="mt-4 grid grid-cols-3 gap-3">
                      <div
                        className={`h-12 rounded-lg ${
                          isDark ? "bg-creme/10" : "bg-creme"
                        }`}
                      ></div>
                      <div
                        className={`h-12 rounded-lg ${
                          isDark ? "bg-creme/10" : "bg-creme"
                        }`}
                      ></div>
                      <div className="h-12 rounded-lg border border-or/40 bg-or-soft/30"></div>
                    </div>

                    {/* Mini-pilule dorée (CTA simulé) */}
                    <div className="mt-5 flex justify-end">
                      <div className="h-7 w-24 rounded-full bg-or"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Texte */}
              <p
                className={`mt-8 text-base leading-relaxed ${
                  isDark ? "text-creme/70" : "text-taupe"
                }`}
              >
                {card.text}
              </p>

              {/* CTA */}
              <div className="mt-7">
                <Button
                  href={card.cta.href}
                  variant={isDark ? "light" : "primary"}
                >
                  {card.cta.label}
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
