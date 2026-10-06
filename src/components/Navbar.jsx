import { useState } from "react";
import { nav } from "../data/content";
import Logo from "./Logo";
import Button from "./Button";

/* Barre de navigation « atelier » : bande vert foncé collante, comme Wow Sites Club. */
export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-grid2 bg-mat2/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-8 px-5 sm:px-6">
        <Logo onDark className="text-lg sm:text-xl" />

        <div className="hidden items-center gap-7 text-[14px] font-medium text-onmat2 lg:flex">
          {nav.links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-onmat">
              {l.label}
            </a>
          ))}
        </div>

        <div className="ml-auto hidden lg:block">
          <Button href={nav.cta.href} variant="light" className="!px-4 !py-2.5 !text-sm">
            {nav.cta.label}
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-lg border border-grid2 text-onmat lg:hidden"
        >
          <iconify-icon
            icon={open ? "solar:close-circle-linear" : "solar:hamburger-menu-linear"}
            class="text-2xl"
            aria-hidden="true"
          ></iconify-icon>
        </button>
      </div>

      {open && (
        <div className="absolute left-3 right-3 top-full z-50 mt-2 flex flex-col gap-1 rounded-xl border-[1.5px] border-encre bg-creme p-3 text-encre shadow-soft-lg lg:hidden">
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-3 text-base font-semibold transition-colors hover:bg-sable"
            >
              {l.label}
            </a>
          ))}
          <Button href={nav.cta.href} variant="primary" onClick={() => setOpen(false)} className="mt-2 w-full">
            {nav.cta.label}
          </Button>
        </div>
      )}
    </nav>
  );
}
