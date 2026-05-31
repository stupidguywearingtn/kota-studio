import { useEffect, useMemo } from "react";

/* Embed INLINE officiel Calendly (widget.js).
   - Le calendrier s'affiche DIRECTEMENT dans la page (pas un bouton/onglet).
   - Le script officiel n'est chargé qu'une seule fois.
   - Les couleurs de la DA Kota (crème / encre / doré) sont appliquées au widget.
   Lien réglé dans content.js -> finalCta.calendlyUrl. */
export default function CalendlyEmbed({ url, className = "", height = 700 }) {
  // On applique les couleurs de la DA via les paramètres d'URL Calendly
  // (hex SANS le #). hide_gdpr_banner = bandeau cookies Calendly masqué.
  const dataUrl = useMemo(() => {
    if (!url) return "";
    const sep = url.includes("?") ? "&" : "?";
    return `${url}${sep}hide_gdpr_banner=1&background_color=fbf6ec&text_color=241a12&primary_color=c8a24e`;
  }, [url]);

  useEffect(() => {
    if (!url) return;
    const SRC = "https://assets.calendly.com/assets/external/widget.js";

    // Script déjà chargé (navigation SPA) -> on (ré)initialise les widgets.
    if (window.Calendly?.initInlineWidgets) {
      window.Calendly.initInlineWidgets();
      return;
    }
    // Sinon on l'injecte une seule fois (il auto-initialise les widgets présents).
    if (!document.querySelector(`script[src="${SRC}"]`)) {
      const s = document.createElement("script");
      s.src = SRC;
      s.async = true;
      document.body.appendChild(s);
    }
  }, [url, dataUrl]);

  if (!url) return null;

  return (
    <div
      className={`calendly-inline-widget ${className}`}
      data-url={dataUrl}
      style={{ minWidth: "320px", height: `${height}px` }}
    />
  );
}
