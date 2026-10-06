import { Link } from "react-router-dom";

/* Bouton pilule — DA Kota Studio.
   variant: "primary"  = pilule encre + texte crème
            "secondary"= pilule contour encre, fond transparent
            "light"    = pilule crème (sur fond sombre)
   La flèche avance au survol (classe .arrow-advance + group). */
export default function Button({
  children,
  href,
  variant = "primary",
  icon = "solar:arrow-right-linear",
  showIcon = true,
  className = "",
  ...rest
}) {
  // .btn-3d = effet de profondeur partagé (ombre encre décalée au repos,
  // s'enfonce au survol/clic). Appliqué à TOUS les boutons du site.
  const base =
    "btn-3d group inline-flex items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 text-[15px] font-semibold tracking-tight cursor-pointer";

  const variants = {
    primary: "bg-hi text-encre", // principal : bloc jaune surligneur + ombre encre
    secondary: "border-[1.5px] border-encre text-encre bg-creme", // secondaire : papier + contour encre
    light: "bg-creme text-encre", // sur fond vert : bloc papier
  };

  const cls = `${base} ${variants[variant] || variants.primary} ${className}`;

  const inner = (
    <>
      <span>{children}</span>
      {showIcon && (
        <iconify-icon
          icon={icon}
          class="arrow-advance text-xl"
          aria-hidden="true"
        ></iconify-icon>
      )}
    </>
  );

  if (href) {
    // Liens internes ("/", "/projets/...", "/#contact") -> Link router (SPA).
    if (href.startsWith("/")) {
      return (
        <Link to={href} className={cls} {...rest}>
          {inner}
        </Link>
      );
    }
    // Ancres de la même page ("#contact") ou liens externes -> <a>.
    return (
      <a href={href} className={cls} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" className={cls} {...rest}>
      {inner}
    </button>
  );
}
