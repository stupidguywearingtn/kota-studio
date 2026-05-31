import { finalCta, whatsapp } from "../data/content";
import Button from "./Button";
import CalendlyEmbed from "./CalendlyEmbed";

// Lien WhatsApp (numéro + message pré-rempli, réglés dans content.js).
const whatsappHref =
  "https://wa.me/" + whatsapp.number + "?text=" + encodeURIComponent(whatsapp.message);

/* SECTION 9 — CTA FINAL + RÉSERVATION
   Section claire, lumineuse, halo doré. Ferme le site visuellement
   en écho au hero (anneaux dorés flottants).
   Contient le calendrier Calendly (embed inline) + l'encart WhatsApp "pressé ?". */
export default function FinalCta() {
  // Le dernier mot du titre est souligné en doré (piloté par content.js).
  const titleWords = finalCta.title.trim().split(" ");
  const lastWord = titleWords.pop();
  const titleHead = titleWords.join(" ");

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-16 sm:py-24 lg:py-32 text-center"
    >
      {/* Halos dorés décoratifs */}
      <div
        className="gold-halo pointer-events-none absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 opacity-80"
        aria-hidden="true"
      ></div>
      <div
        className="gold-halo pointer-events-none absolute -left-16 top-10 h-72 w-72 opacity-60"
        aria-hidden="true"
      ></div>
      <div
        className="gold-halo pointer-events-none absolute -right-10 bottom-0 h-80 w-80 opacity-50"
        aria-hidden="true"
      ></div>

      {/* Petits cercles dorés flottants (écho du hero) */}
      <div
        className="float-soft pointer-events-none absolute left-[12%] top-24 hidden lg:block"
        aria-hidden="true"
      >
        <div className="h-10 w-10 rounded-full border-2 border-or/40"></div>
      </div>
      <div
        className="float-soft-delayed pointer-events-none absolute right-[14%] bottom-28 hidden lg:block"
        aria-hidden="true"
      >
        <div className="h-6 w-6 rounded-full border-2 border-or/30"></div>
      </div>
      <div
        className="float-soft pointer-events-none absolute right-[22%] top-32 hidden lg:block"
        aria-hidden="true"
      >
        <div className="h-3 w-3 rounded-full bg-or/40"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Contenu principal */}
        <div className="reveal mx-auto max-w-3xl">
          {/* Badge pilule */}
          <span className="inline-flex items-center gap-2.5 rounded-full border border-or/30 bg-creme/70 px-5 py-2 text-sm font-semibold tracking-tight text-encre shadow-soft backdrop-blur-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-or/60"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-or"></span>
            </span>
            {finalCta.badge}
          </span>

          {/* Titre */}
          <h2 className="kota-title mt-7 text-5xl leading-[1.02] lg:text-7xl">
            {titleHead}{" "}
            <span className="gold-underline">{lastWord}</span>
          </h2>

          {/* Sous-titre */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-taupe lg:text-xl">
            {finalCta.subtitle}
          </p>

          {/* CTA */}
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={finalCta.cta.href} variant="primary">
              {finalCta.cta.label}
            </Button>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-taupe">
              <iconify-icon
                icon="solar:clock-circle-linear"
                class="text-lg text-or"
                aria-hidden="true"
              ></iconify-icon>
              {finalCta.ctaNote}
            </span>
          </div>
        </div>

        {/* =============================================================
            CALENDRIER CALENDLY (embed inline)
            Lien réglé dans content.js -> finalCta.calendlyUrl :
            - lien présent : le widget Calendly s'affiche ici (couleurs DA) ;
            - lien vide "" : le placeholder doré ci-dessous s'affiche à la place.
           ============================================================= */}
        {finalCta.calendlyUrl ? (
          <div className="reveal mx-auto mt-12 max-w-3xl overflow-hidden rounded-3xl border border-encre/10 bg-creme p-2 shadow-soft-lg sm:p-3">
            <CalendlyEmbed url={finalCta.calendlyUrl} height={720} />
          </div>
        ) : (
          <div className="reveal mx-auto mt-12 flex min-h-[420px] max-w-3xl flex-col items-center justify-center gap-4 rounded-3xl border border-encre/10 bg-creme p-10 shadow-soft-lg">
            <span className="flex h-20 w-20 items-center justify-center rounded-full border border-or/20 bg-sable">
              <iconify-icon
                icon="solar:calendar-linear"
                class="text-5xl text-or"
                aria-hidden="true"
              ></iconify-icon>
            </span>
            <p className="text-lg font-semibold tracking-tight text-encre">
              {finalCta.calendarPlaceholder}
            </p>
            <p className="max-w-sm text-sm text-taupe">{finalCta.calendarHint}</p>
            <span className="mt-2 inline-flex items-center gap-2 rounded-full border border-or/20 bg-sable px-4 py-1.5 text-xs font-medium text-taupe">
              <iconify-icon
                icon="solar:shield-check-linear"
                class="text-base text-or"
                aria-hidden="true"
              ></iconify-icon>
              {finalCta.calendarBadge}
            </span>
          </div>
        )}

        {/* -- Encart "Vous êtes pressé ?" : contact WhatsApp immédiat -------- */}
        <div className="reveal mx-auto mt-6 flex max-w-3xl flex-col items-center justify-between gap-5 rounded-3xl border border-or/25 bg-sable/60 p-7 text-center shadow-soft sm:flex-row sm:text-left">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-encre text-creme">
              <iconify-icon
                icon="mdi:whatsapp"
                class="text-2xl text-or"
                aria-hidden="true"
              ></iconify-icon>
            </span>
            <div>
              <p className="font-display text-lg font-extrabold text-encre">
                {finalCta.urgent.title}
              </p>
              <p className="mt-1 max-w-md text-sm text-taupe">
                {finalCta.urgent.text}
              </p>
            </div>
          </div>
          <Button
            href={whatsappHref}
            variant="primary"
            icon="mdi:whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            {finalCta.urgent.button}
          </Button>
        </div>
      </div>
    </section>
  );
}
