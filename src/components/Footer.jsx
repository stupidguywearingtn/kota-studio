import { Link } from "react-router-dom";
import { footer, whatsapp } from "../data/content";
import Logo from "./Logo";

const whatsappHref =
  "https://wa.me/" + whatsapp.number + "?text=" + encodeURIComponent(whatsapp.message);

export default function Footer() {
  return (
    <footer id="footer" className="mat relative overflow-hidden pt-20 pb-28 md:pb-10">
      {/* Decorative gold halo */}
      
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Top block */}
        <div className="reveal grid grid-cols-1 gap-12">
          {/* Left: Logo + tagline + WhatsApp */}
          <div className="flex flex-col items-start gap-6">
            <Logo onDark className="text-3xl" />
            <p className="max-w-sm leading-relaxed text-onmat2">{footer.tagline}</p>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={whatsapp.label}
              className="btn-3d inline-flex items-center gap-2 rounded-xl bg-hi px-5 py-2.5 text-encre"
            >
              <iconify-icon icon="mdi:whatsapp" class="text-xl" aria-hidden="true"></iconify-icon>
              <span className="text-sm font-medium">{whatsapp.label}</span>
            </a>
          </div>

          {/* Right: columns */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
            {footer.columns.map((column) => (
              <div key={column.title}>
                <h3 className="k-eyebrow text-hi">{column.title}</h3>
                <ul className="mt-5 space-y-2.5">
                  {column.links.map((link) => {
                    // Ancre de section -> route home + ancre (fonctionne depuis
                    // n'importe quelle page via le ScrollManager). Lien interne
                    // ("/creation-site-...") -> Link router (SPA, pas de reload).
                    const isAnchor = link.href.startsWith("#") && link.href.length > 1;
                    const isInternalPath = link.href.startsWith("/");
                    const cls =
                      "text-sm text-onmat/85 transition-colors hover:text-hi";
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

        {/* Grand mot détouré, façon Wow Sites Club */}
        <div className="k-bigw k-outline mt-16 select-none" aria-hidden="true">KOTA</div>

        {/* Bottom row */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm text-onmat2">{footer.copyright}</p>
            <p className="mt-1 text-[11.5px] text-onmat2/70">
              Modèles 3D : « macbook pro M3 16 inch 2024 » par{" "}
              <a className="underline" href="https://sketchfab.com/jackbaeten" target="_blank" rel="noopener">jackbaeten</a>, « Apple iPhone 15 Pro Max Black » par{" "}
              <a className="underline" href="https://sketchfab.com/Polyman_3D" target="_blank" rel="noopener">polyman</a> —{" "}
              <a className="underline" href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">CC BY 4.0</a>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {footer.legal.map((item) => {
              const cls =
                "text-sm text-onmat2 transition-colors hover:text-hi";
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
