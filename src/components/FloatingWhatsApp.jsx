import { whatsapp } from "../data/content";

/* Bouton WhatsApp flottant — fixe en bas à droite, visible partout. */
export default function FloatingWhatsApp() {
  const link = `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(
    whatsapp.message
  )}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={whatsapp.label}
      className="group fixed bottom-6 right-6 z-[60] flex items-center gap-0 overflow-hidden rounded-full bg-encre py-3.5 pl-3.5 pr-3.5 text-creme shadow-soft-lg transition-all duration-300 hover:gap-2 hover:pr-5"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-or text-encre">
        <iconify-icon icon="mdi:whatsapp" class="text-2xl" aria-hidden="true"></iconify-icon>
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:max-w-[180px] group-hover:opacity-100">
        {whatsapp.label}
      </span>
    </a>
  );
}
