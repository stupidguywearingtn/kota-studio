import { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupReveals } from "../lib/reveal";
import { projects, projectPage } from "../data/content";
import Logo from "../components/Logo";
import Button from "../components/Button";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";

/* Bloc placeholder "Bientôt disponible" (contenu à compléter plus tard). */
function ComingSoon({ height = "h-auto" }) {
  return (
    <div className={`mt-4 flex items-center gap-2.5 rounded-2xl border border-dashed border-encre/15 bg-sable/50 px-5 py-5 ${height}`}>
      <iconify-icon icon="solar:hourglass-line-linear" class="text-lg text-or" aria-hidden="true"></iconify-icon>
      <span className="text-sm font-medium italic text-taupe">{projectPage.comingSoon}</span>
    </div>
  );
}

export default function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const mainRef = useRef(null);
  const t = projectPage;

  useEffect(() => {
    if (!project) return;
    const ctx = gsap.context(() => setupReveals(), mainRef);
    const id = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => {
      ctx.revert();
      clearTimeout(id);
    };
  }, [slug, project]);

  /* Projet introuvable */
  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-or">404</span>
        <h1 className="kota-title text-4xl lg:text-5xl">Projet introuvable</h1>
        <Button href="/#realisations" variant="primary" icon="solar:arrow-left-linear">
          {t.back}
        </Button>
      </div>
    );
  }

  const isLive = project.liveUrl && project.liveUrl !== "#";
  const liveProps = isLive ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <div ref={mainRef} className="relative overflow-x-hidden">
      {/* ---- Barre du haut : logo + retour ---- */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Logo className="text-2xl" />
        <Link
          to="/#realisations"
          className="group inline-flex items-center gap-2 rounded-full border border-encre/15 bg-creme px-5 py-2.5 text-sm font-semibold text-encre shadow-soft transition-colors hover:border-encre/30"
        >
          <iconify-icon
            icon="solar:arrow-left-linear"
            class="text-lg transition-transform group-hover:-translate-x-0.5"
            aria-hidden="true"
          ></iconify-icon>
          {t.back}
        </Link>
      </header>

      <main>
        {/* ---- Hero projet ---- */}
        <section className="reveal mx-auto max-w-7xl px-6 pt-6 pb-10 lg:pt-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-encre px-3.5 py-1.5 text-xs font-bold text-creme">
              {project.badge}
            </span>
            <span className="rounded-full border border-encre/15 px-3.5 py-1.5 text-xs font-bold text-taupe">
              {project.year}
            </span>
          </div>
          <h1 className="kota-title mt-5 text-5xl lg:text-7xl">{project.name}</h1>
          <p className="mt-3 max-w-2xl text-lg text-taupe">{project.sector}</p>
          <div className="mt-7">
            <Button
              href={project.liveUrl}
              variant="primary"
              icon="solar:arrow-right-up-linear"
              {...liveProps}
            >
              {t.liveCta}
            </Button>
          </div>
        </section>

        {/* ---- Rangée de captures ---- */}
        <section className="reveal mx-auto max-w-7xl px-6 pb-14">
          {/* Capture principale */}
          <div className="overflow-hidden rounded-[28px] border border-encre/10 shadow-soft-lg">
            <img
              src={project.cover}
              alt={`Aperçu du site ${project.name}`}
              className="aspect-[16/8] w-full object-cover object-top"
            />
          </div>
          {/* Vues supplémentaires (placeholders à compléter) */}
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[0, 1, 2].map((k) => (
              <div
                key={k}
                className="flex aspect-[16/10] items-center justify-center rounded-2xl border border-dashed border-encre/15 bg-sable/50"
              >
                <span className="inline-flex items-center gap-2 text-sm font-medium italic text-taupe">
                  <iconify-icon icon="solar:gallery-wide-linear" class="text-lg text-or/60" aria-hidden="true"></iconify-icon>
                  {t.comingSoon}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ---- Contenu : 2 colonnes (descriptions + carte sticky) ---- */}
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-12">
            {/* Colonne gauche : descriptions */}
            <div className="space-y-10 lg:col-span-2">
              <div className="reveal">
                <h2 className="kota-title text-2xl lg:text-3xl">{t.sectionTitles.defi}</h2>
                <ComingSoon />
              </div>
              <div className="reveal">
                <h2 className="kota-title text-2xl lg:text-3xl">{t.sectionTitles.approche}</h2>
                <ComingSoon />
              </div>
              <div className="reveal">
                <h2 className="kota-title text-2xl lg:text-3xl">{t.sectionTitles.resultat}</h2>
                <ComingSoon />
              </div>

              {/* La recette Kota */}
              <div className="reveal rounded-[28px] border border-encre/10 bg-creme p-7 shadow-soft lg:p-8">
                <h2 className="kota-title text-2xl lg:text-3xl">{t.sectionTitles.recette}</h2>
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {project.recette.map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 rounded-2xl border border-dashed border-or/30 bg-sable/40 px-4 py-4"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-or/15 text-xs font-bold text-or">
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium italic text-taupe">{t.comingSoon}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Colonne droite : carte sticky CTA */}
            <aside className="lg:col-span-1">
              <div className="reveal rounded-[28px] border border-encre/10 bg-creme p-7 shadow-soft-lg lg:sticky lg:top-24">
                <span className="inline-flex items-center gap-2 rounded-full border border-or/30 bg-or/10 px-3.5 py-1.5 text-xs font-semibold text-or">
                  <span className="h-1.5 w-1.5 rounded-full bg-or" />
                  Kota Studio
                </span>
                <h3 className="kota-title mt-5 text-2xl lg:text-3xl">{t.sticky.title}</h3>
                <p className="mt-3 text-taupe">{t.sticky.text}</p>
                <div className="mt-6 flex flex-col gap-3">
                  <Button href={t.sticky.primary.href} variant="primary" className="w-full">
                    {t.sticky.primary.label}
                  </Button>
                  <Button href={t.sticky.secondary.href} variant="secondary" className="w-full">
                    {t.sticky.secondary.label}
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
