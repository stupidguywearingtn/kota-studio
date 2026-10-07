import { useEffect, useRef, useState } from "react";
import { process } from "../data/content";

const DUR = 5200; // durée d'affichage de chaque étape (ms)

/* ---------- visuels des 5 étapes (HTML/CSS, aucun asset lourd) ---------- */
function SceneCall() {
  return (
    <div className="relative w-full max-w-[420px]">
      <div className="rounded-2xl border-[1.5px] border-encre bg-white p-5 shadow-[6px_6px_0_#141714]">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-encre font-display text-lg font-black text-hi">K.</span>
          <div className="min-w-0">
            <p className="font-semibold">Kota Studio</p>
            <p className="font-mono text-[11px] uppercase tracking-[.12em] text-taupe">Appel découverte · 15 min</p>
          </div>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-[#1F6B50] px-2.5 py-1 font-mono text-[11px] text-white">
            <i className="h-1.5 w-1.5 animate-pulse rounded-full bg-hi" /> en cours
          </span>
        </div>
        <div className="k-wave mt-6 flex h-14 items-center justify-center gap-[5px]" aria-hidden="true">
          {Array.from({ length: 28 }).map((_, i) => (
            <i key={i} style={{ animationDelay: `${(i % 7) * 0.11}s` }} />
          ))}
        </div>
        <div className="mt-5 flex justify-center gap-3" aria-hidden="true">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-sable text-lg">🎙</span>
          <span className="grid h-11 w-11 place-items-center rounded-full bg-hot text-lg text-white">✕</span>
        </div>
      </div>
      <div className="postit absolute -bottom-10 -right-4 w-[190px] rotate-[4deg] rounded-[3px] p-4 sm:-right-10">
        <p className="font-hand text-[22px] leading-[1.05]">
          ✓ votre activité<br />✓ vos clients<br />✓ les sites que vous aimez
        </p>
      </div>
    </div>
  );
}

function SceneQuote() {
  const Row = ({ l, r, strong }) => (
    <div className={`flex items-baseline gap-2 ${strong ? "font-bold" : ""}`}>
      <span>{l}</span>
      <span className="flex-1 translate-y-[-3px] border-b-[1.5px] border-dotted border-encre/35" />
      <span>{r}</span>
    </div>
  );
  return (
    <div className="relative w-full max-w-[400px]">
      <div className="k-plan rc !gap-3 !shadow-[0_14px_26px_#0004]">
        <p className="nm">Devis · exemple</p>
        <Row l="Site sur-mesure" r="1 290 €" />
        <Row l="Options choisies" r="0 €" />
        <div className="dash" />
        <Row l="Total" r="1 290 €" strong />
        <div className="rounded-md bg-hi px-2 py-1.5">
          <Row l="Acompte 50 %" r="645 €" strong />
        </div>
        <Row l="Solde à la livraison" r="645 €" />
        <p className="text-[11.5px] opacity-70">Prix fixe. TVA non applicable, art. 293 B du CGI.</p>
      </div>
      <span className="stamp-ink pointer-events-none absolute -right-2 top-10 rotate-[-14deg] rounded-md border-[3px] border-current px-3 py-1 font-display text-[22px] font-black">
        VALIDÉ
      </span>
    </div>
  );
}

function SceneMockup() {
  return (
    <div className="relative w-full max-w-[470px]">
      <div className="overflow-hidden rounded-xl border-[1.5px] border-encre bg-[#2C2C2C] shadow-[6px_6px_0_#141714]">
        <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2 font-mono text-[11px] text-white/70">
          <span className="h-2.5 w-2.5 rounded-sm bg-[#A259FF]" /> Maquette · Accueil
          <span className="ml-auto rounded bg-white/10 px-1.5">100 %</span>
        </div>
        <div className="p-4">
          <div className="relative overflow-hidden rounded-md ring-2 ring-[#0D99FF]">
            <img src="/realisations/site-6.webp" alt="" loading="lazy" className="block aspect-[16/9] w-full object-cover object-top" />
            <span className="absolute left-0 top-0 -translate-y-full bg-[#0D99FF] px-1.5 font-mono text-[10px] text-white">Desktop · 1440</span>
          </div>
          <div className="mt-3 flex items-center gap-2">
            {["#0F172A", "#2563EB", "#F8FAFC", "#F1E25A"].map((c) => (
              <span key={c} className="h-6 w-6 rounded-full border border-white/30" style={{ background: c }} />
            ))}
            <span className="ml-2 font-display text-lg font-black text-white">Aa</span>
          </div>
        </div>
      </div>
      <div className="absolute -left-3 top-16 max-w-[190px] rounded-2xl rounded-bl-sm border-[1.5px] border-encre bg-white px-3 py-2 text-[13.5px] shadow-[3px_3px_0_#141714] sm:-left-10">
        « On garde ce bleu, il colle à la marque »
      </div>
      <span className="absolute -bottom-4 right-4 rotate-[3deg] rounded-lg border-[1.5px] border-encre bg-hi px-3 py-1.5 font-display text-[15px] font-black shadow-[3px_3px_0_#141714]">
        ✓ Style validé
      </span>
    </div>
  );
}

function SceneCode() {
  return (
    <div className="relative grid w-full max-w-[480px] grid-cols-[1.25fr_.75fr] items-end gap-4">
      <pre className="m-0 overflow-hidden rounded-xl bg-[#0b0d0b] p-4 font-mono text-[11.5px] leading-[1.6] text-[#dfe6e1] shadow-[6px_6px_0_#141714]">
        <span className="text-[#7C8A82]">{"// fait main, sans template"}</span>{"\n"}
        <span className="text-hi">{"<section"}</span>{' class="hero">'}{"\n"}
        {"  "}<span className="text-hi">{"<h1>"}</span>{"Un site qui "}<span className="text-hot">{"vend"}</span><span className="text-hi">{"</h1>"}</span>{"\n"}
        {"  "}<span className="text-hi">{"<a"}</span>{' href="#appel">'}{"\n"}
        {"    Réserver un appel"}{"\n"}
        {"  "}<span className="text-hi">{"</a>"}</span>{"\n"}
        <span className="text-hi">{"</section>"}</span>
        <span className="k-caret" />
      </pre>
      <div className="relative mx-auto w-full max-w-[150px] rounded-[22px] bg-[#0b0c0b] p-[5px] shadow-[0_16px_28px_-10px_#0008]">
        <img src="/realisations/mobile-tc.webp" alt="" loading="lazy" className="block aspect-[390/844] w-full rounded-[18px] object-cover object-top" />
      </div>
      <span className="absolute -top-4 right-2 rotate-[4deg] rounded-full border-[1.5px] border-encre bg-white px-3 py-1 font-mono text-[11.5px] shadow-[2px_2px_0_#141714]">
        retour n°3 → corrigé ✓
      </span>
    </div>
  );
}

function SceneLive() {
  return (
    <div className="relative w-full max-w-[470px]">
      <div className="overflow-hidden rounded-xl border-[1.5px] border-encre bg-white shadow-[6px_6px_0_#141714]">
        <div className="flex items-center gap-1.5 border-b border-encre/10 bg-[#F2F1EC] px-3 py-2">
          <i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="mx-auto rounded-md bg-white px-3 py-0.5 font-mono text-[11px] text-taupe">🔒 telandcash.fr</span>
        </div>
        <img src="/realisations/site-6.webp" alt="" loading="lazy" className="block aspect-[16/9] w-full object-cover object-top" />
      </div>
      <ul className="absolute -bottom-8 -right-2 grid gap-1.5 rounded-xl border-[1.5px] border-encre bg-hi p-3 font-mono text-[12px] shadow-[4px_4px_0_#141714] sm:-right-8">
        <li>✓ nom de domaine branché</li>
        <li>✓ sitemap envoyé à Google</li>
        <li>✓ espace admin en main</li>
      </ul>
      <span className="absolute -left-3 -top-4 rotate-[-4deg] rounded-full bg-[#1F6B50] px-3 py-1 font-mono text-[12px] text-white shadow-[3px_3px_0_#141714]">
        ● en ligne
      </span>
    </div>
  );
}

const SCENES = [SceneCall, SceneQuote, SceneMockup, SceneCode, SceneLive];

/* SECTION — COMMENT ÇA SE PASSE (id="process")
   Même mécanique que « How it works » du Wow Sites Club : liste des 5 étapes
   à gauche (l'étape active s'ouvre, une barre jaune se remplit), visuel de
   l'étape à droite. Avance tout seul, pause au survol, clic pour choisir. */
export default function Process() {
  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(false);
  const [seen, setSeen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.25 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!seen || paused) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setTimeout(() => setCur((c) => (c + 1) % process.steps.length), DUR);
    return () => clearTimeout(id);
  }, [cur, seen, paused]);

  return (
    <section id="process" ref={ref} className="mat relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:py-28">
        <header className="reveal max-w-5xl">
          <p className="k-eyebrow">{process.tag}</p>
          <h2 className="k-h2">
            {process.title} <span className="k-hl">{process.highlight}</span>
          </h2>
        </header>

        <div
          className={`k-how mt-12 grid items-center gap-12 lg:mt-16 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] ${paused ? "paused" : ""}`}
          style={{ "--dur": `${DUR}ms` }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <ol>
            {process.steps.map((s, i) => (
              <li key={s.title} className={i === cur ? "on" : ""}>
                <button type="button" onClick={() => setCur(i)} aria-current={i === cur ? "step" : undefined}>
                  <em className={i === cur ? "" : "k-outline"}>{i + 1}</em>
                  <div>
                    <small>{s.day}</small>
                    <b>{s.title}</b>
                    <span>{s.text}</span>
                  </div>
                </button>
                <div className="bar"><i key={`${cur}-${i}`} /></div>
              </li>
            ))}
          </ol>

          <div className="k-stage order-first lg:order-none" aria-live="polite">
            <span className="tape" />
            <div className="relative h-[420px] sm:h-[440px]">
              {SCENES.map((Scene, i) => (
                <div key={i} className={`k-scene ${i === cur ? "on" : ""}`} aria-hidden={i !== cur}>
                  <Scene />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
