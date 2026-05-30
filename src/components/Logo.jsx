import { Link } from "react-router-dom";
import { brand } from "../data/content";

/* Logo texte "Kota Studio" avec un point doré. Ramène toujours à l'accueil. */
export default function Logo({ className = "", onDark = false }) {
  return (
    <Link
      to="/"
      className={`inline-flex items-baseline gap-1 font-display font-extrabold tracking-title ${
        onDark ? "text-creme" : "text-encre"
      } ${className}`}
    >
      <span>{brand.name}</span>
      <span className="text-or">.</span>
      <span>{brand.suffix}</span>
    </Link>
  );
}
