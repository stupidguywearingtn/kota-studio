import { Link } from "react-router-dom";
import { footer, whatsapp } from "../data/content";
import Logo from "./Logo";

const whatsappHref =
  "https://wa.me/" + whatsapp.number + "?text=" + encodeURIComponent(whatsapp.message);

export default function Footer() {
  return (
    <footer id="footer" className="relative overflow-hidden bg-encre text-creme pt-20 pb-28 md:pb-10">
      {/* Decorative gold halo */}
      <div className="gold-halo pointer-events-none absolute -top-24 right-0 h-72 w-72" aria-hidden="true"></div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Top block */}
        <div className="reveal grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Logo + tagline + WhatsApp */}
          <div className="flex flex-col items-start gap-6">
            <Logo onDark className="text-3xl" />
            <p className="max-w-sm text-creme/60 leading-relaxed">{footer.tagline}</p>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={whatsapp.label}
              className="lift inline-flex items-center gap-2 rounded-full border border-or/30 px-5 py-2.5 text-creme transition-colors hover:border-or/60 hover:text-or"
            >
              <iconify-icon icon="mdi:whatsapp" class="text-or text-xl" aria-hidden="true"></iconify-icon>
              <span className="text-sm font-medium">{whatsapp.label}</span>
            </a>
          </div>

          {/* Right: columns */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
            {footer.columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-or text-xs font-bold uppercase tracking-widest">{column.title}</h3>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => {
                    // Ancre de section -> route home + ancre (fonctionne depuis
                    // n'importe quelle page via le ScrollManager). Lien interne
                    // ("/creation-site-...") -> Link router (SPA, pas de reload).
                    const isAnchor = link.href.startsWith("#") && link.href.length > 1;
                    const isInternalPath = link.href.startsWith("/");
                    const cls =
                      "text-sm text-creme/80 transition-colors hover:text-or";
                    return (
                      <li key={link.label}>
                        {isAnchor ? (
                          <Link to={"/" + link.href} className={cls}>
                            {link.label}
                          </Link>
                        ) : isInternalPath ? (
                          <Link to={link.href} className={cls}>
                            {link.label}
                          </Link>
                        ) : (
                          <a href={link.href} className={cls}>
                            {link.label}
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-creme/10"></div>

        {/* Bottom row */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <p className="text-sm text-creme/50">{footer.copyright}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {footer.legal.map((item) => {
              const cls =
                "text-sm text-creme/50 transition-colors hover:text-creme";
              // Liens internes ("/mentions-legales"…) -> Link router (SPA).
              return item.href.startsWith("/") ? (
                <Link key={item.label} to={item.href} className={cls}>
                  {item.label}
                </Link>
              ) : (
                <a key={item.label} href={item.href} className={cls}>
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
