import { useState } from "react";
import { finalCta, whatsapp, legal } from "../data/content";
import CalendlyEmbed from "./CalendlyEmbed";

const TYPES = ["Landing page", "Site sur-mesure", "Boutique en ligne", "Refonte de mon site", "Je ne sais pas encore"];
const BUDGETS = ["Moins de 1 000 €", "1 000 – 2 000 €", "2 000 – 5 000 €", "Plus de 5 000 €", "À définir ensemble"];

/* SECTION — CONTACT (id="contact"), façon « Done for you » du Wow Sites Club.
   Le formulaire n'a pas besoin de serveur : il prépare un message WhatsApp
   déjà rempli. Le calendrier Calendly ne se charge que si on le demande. */
export default function FinalCta() {
  const [f, setF] = useState({ name: "", biz: "", type: TYPES[1], budget: BUDGETS[1], msg: "" });
  const [cal, setCal] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const send = (e) => {
    e.preventDefault();
    const lines = [
      "Bonjour Kota Studio,",
      f.name && `Je m'appelle ${f.name}${f.biz ? ` (${f.biz})` : ""}.`,
      `Projet : ${f.type}`,
      `Budget : ${f.budget}`,
      f.msg && `\n${f.msg}`,
    ].filter(Boolean);
    const url = "https://wa.me/" + whatsapp.number + "?text=" + encodeURIComponent(lines.join("\n"));
    window.open(url, "_blank", "noopener");
  };

  return (
    <section id="contact" className="k-paper relative">
      <div className="mx-auto grid max-w-7xl items-start gap-14 px-5 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <div className="reveal">
          <p className="k-eyebrow">{finalCta.badge}</p>
          <h2 className="k-h2">
            Un projet ? <span className="k-hl">On s'en occupe.</span>
          </h2>
          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-taupe">
            Dites-nous en deux lignes ce que vous faites. On vous rappelle pour en parler 15 minutes, gratuitement et sans engagement.
          </p>
          <ul className="mt-6 grid gap-2 pl-5 text-[16px] text-taupe [list-style:disc]">
            <li>Réponse sous 24 h</li>
            <li>Un prix fixe annoncé avant de commencer</li>
            <li>Site en ligne en 14 jours</li>
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => setCal((v) => !v)} className="btn-3d inline-flex items-center gap-2 rounded-xl bg-[#141714] px-5 py-3 text-[15px] font-semibold text-creme">
              📅 {cal ? "Masquer le calendrier" : "Choisir un créneau d'appel"}
            </button>
            <a href={`mailto:${legal.company.email}`} className="font-mono text-[13px] text-taupe underline-offset-4 hover:underline">
              {legal.company.email}
            </a>
          </div>
        </div>

        <form className="k-form reveal" onSubmit={send}>
          <span className="tape" />
          <div className="grid gap-3 sm:grid-cols-2">
            <label>
              Votre nom
              <input value={f.name} onChange={set("name")} placeholder="Camille Martin" autoComplete="name" />
            </label>
            <label>
              Votre activité
              <input value={f.biz} onChange={set("biz")} placeholder="Institut de beauté, Annecy" />
            </label>
            <label>
              Votre projet
              <select value={f.type} onChange={set("type")}>
                {TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </label>
            <label>
              Budget
              <select value={f.budget} onChange={set("budget")}>
                {BUDGETS.map((t) => <option key={t}>{t}</option>)}
              </select>
            </label>
          </div>
          <label>
            Ce que le site doit faire
            <textarea value={f.msg} onChange={set("msg")} placeholder="Présenter mes soins, prendre des rendez-vous, apparaître sur Google…" />
          </label>
          <button type="submit" className="btn-3d mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-hi px-6 py-4 text-[16px] font-semibold text-encre">
            Envoyer sur WhatsApp →
          </button>
          <p className="font-mono text-[11.5px] text-taupe">Le message s'ouvre dans WhatsApp, prêt à envoyer. Rien n'est enregistré sur ce site.</p>
        </form>

        {cal && finalCta.calendlyUrl && (
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-2xl border-[1.5px] border-encre bg-white shadow-[6px_6px_0_#141714]">
              <CalendlyEmbed url={finalCta.calendlyUrl} height={700} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
