import { useState } from "react";
import { nav } from "../data/content";
import Logo from "./Logo";
import Button from "./Button";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative z-50 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
      <Logo className="text-2xl" />

      <div className="hidden items-center gap-9 rounded-full border border-encre/10 bg-creme/80 px-8 py-3 text-[15px] font-semibold text-encre/80 shadow-soft backdrop-blur lg:flex">
        {nav.links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="transition-colors hover:text-or"
          >
            {l.label}
          </a>
        ))}
      </div>

      <div className="hidden lg:block">
        <Button href={nav.cta.href} variant="primary">
          {nav.cta.label}
        </Button>
      </div>

      {/* Burger mobile */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Menu"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-encre/15 bg-creme/70 text-encre backdrop-blur lg:hidden"
      >
        <iconify-icon
          icon={open ? "solar:close-circle-linear" : "solar:hamburger-menu-linear"}
          class="text-2xl"
          aria-hidden="true"
        ></iconify-icon>
      </button>

      {/* Panneau mobile */}
      {open && (
        <div className="absolute left-4 right-4 top-full z-50 mt-2 flex flex-col gap-1 rounded-3xl border border-encre/10 bg-creme p-4 shadow-soft-lg lg:hidden">
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 text-base font-semibold text-encre transition-colors hover:bg-sable"
            >
              {l.label}
            </a>
          ))}
          <Button
            href={nav.cta.href}
            variant="primary"
            onClick={() => setOpen(false)}
            className="mt-2 w-full"
          >
            {nav.cta.label}
          </Button>
        </div>
      )}
    </nav>
  );
}
