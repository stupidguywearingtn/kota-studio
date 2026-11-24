import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupReveals } from "../lib/reveal";
import { whatsapp } from "../data/content";
import Logo from "../components/Logo";
import Button from "../components/Button";

/* Page portfolio perso de Yanis (communication / contenu / IA), envoyée dans
   les candidatures. Non listée : noindex + absente du sitemap.
   VIDÉOS : remplir `src` (fichier dans /public/yanis/) ou `embed` (lien
   TikTok/Instagram) dans le tableau VIDEOS ci-dessous. Vide = emplacement
   « Vidéo à venir ». */

const CV_URL = "/yanis/CV_Yanis_Ouammou_Com_Marketing_IA.pdf";
const EMAIL = "yanisouammou063@gmail.com";
const PHONE = "+33 6 68 82 33 96";

const STATS = [
  { n: "1,9M", l: "vues sur une seule vidéo" },
  { n: "9,7M", l: "vues/an sur un compte e-commerce" },
  { n: "+57 %", l: "d'abonnés en 2 mois (9k → 22k)" },
  { n: "20+", l: "marques accompagnées" },
];

const VIDEOS = [
  { tag: "Restaurant / bar", title: "Vidéo promo — Café de la Pointe", views: "", src: "", embed: "" },
  { tag: "Viral", title: "Vidéo à +1M de vues", views: "", src: "", embed: "" },
  { tag: "E-commerce", title: "Contenu compte e-commerce", views: "", src: "", embed: "" },
  { tag: "Kota Studio", title: "Format avant / après", views: "", src: "", embed: "" },
  { tag: "Drone", title: "Prises de vues aériennes — Genève", views: "", src: "", embed: "" },
  { tag: "IA · Motion", title: "Vidéo produite avec l'IA", views: "", src: "", embed: "" },
];

const IDEAS = [
  {
    sector: "Restaurant · kebab",
    title: "Le braquage qui finit à table",
    hook: "« Il venait pour la caisse… »",
    text: "Caméra de surveillance, un homme cagoulé entre pour braquer, goûte le kebab, enlève sa cagoule et s'assoit. La semaine suivante, ses trois complices font la queue.",
    why: "Rupture d'attente + série : on attend l'épisode 2.",
  },
  {
    sector: "Restaurant · food",
    title: "La chute, plat en main",
    hook: "Le meme que tout le monde connaît",
    text: "On recrée une chute virale culte, puis on coupe sur le serveur dans la même position au sol, l'assiette intacte en main. Chaque meme devient une pub pour la carte.",
    why: "La tendance fait le travail, la marque récupère l'attention.",
  },
  {
    sector: "Loisirs · aquatique",
    title: "Le commentateur au spa",
    hook: "« Il entre dans le jacuzzi… INCROYABLE »",
    text: "Un client entre dans le jacuzzi, commenté comme une finale de Ligue des champions. Le même commentateur revient au bowling, à l'escalade, aux toboggans.",
    why: "Incongruité de registre + personnage récurrent.",
  },
  {
    sector: "Séjours sport",
    title: "Kevin de la compta part surfer",
    hook: "Jour 1 : il n'a jamais vu une vague",
    text: "On suit pendant 7 jours un employé de bureau qui n'a jamais surfé, de sa mallette sur la plage à sa première vague au ralenti. Une télé-réalité qu'on suit épisode par épisode.",
    why: "Identification + feuilleton = abonnements.",
  },
  {
    sector: "Station · montagne",
    title: "Le confessionnal du télésiège",
    hook: "6 minutes, impossible de fuir",
    text: "Je m'assois à côté d'inconnus sur le télésiège avec une seule question décalée. Ils ne peuvent pas partir, le paysage fait le reste.",
    why: "Format interview facile à répéter tout l'hiver.",
  },
  {
    sector: "Tech · IA",
    title: "L'IA contre le stagiaire",
    hook: "Chrono lancé. Qui gagne ?",
    text: "L'IA de l'entreprise affronte le stagiaire sur des tâches réelles. L'IA gagne tout… jusqu'à l'épreuve du café.",
    why: "Montre le produit sans faire de pub.",
  },
];

const METHOD = [
  { t: "Un hook dans la 1re seconde", d: "Texte écran court, image qui intrigue. Si on ne s'arrête pas, le reste n'existe pas." },
  { t: "Une rupture d'attente", d: "Le spectateur croit savoir où ça va. On l'emmène ailleurs : c'est ce qui se partage." },
  { t: "Une série, pas un coup", d: "Un format récurrent avec un personnage : le public revient, l'algorithme suit." },
  { t: "Une suite au buzz", d: "Offre limitée, réservation, menu secret : les vues deviennent des clients sans saturer le lieu." },
];

const SKILLS = [
  { icon: "solar:videocamera-record-linear", t: "Contenu & vidéo", d: "Concepts, scripts, tournage, montage, drone. Reels et TikTok pensés pour l'algorithme." },
  { icon: "solar:magic-stick-3-linear", t: "IA appliquée", d: "Image, vidéo, voix et motion design par IA, automatisation : plus de contenu, même qualité." },
  { icon: "solar:graph-up-linear", t: "Stratégie & marketing", d: "Calendrier éditorial, analyse des performances, Meta Ads, SEO et visibilité dans les IA." },
  { icon: "solar:pallete-2-linear", t: "Design & web", d: "Identités visuelles, affiches, sites sur-mesure : la com tient debout de bout en bout." },
];

const PATH = [
  { y: "2021 →", t: "Fondateur de Kota Studio", d: "Agence de contenu et de sites web. Clients trouvés grâce à mes propres vidéos TikTok/Instagram." },
  { y: "2025", t: "Videographer & content strategist — DVD.production", d: "Comptes entrepreneurs et e-commerce, vidéos à 1,3M / 1,6M / 1,9M vues." },
  { y: "2024", t: "Community manager — Café de la Pointe, Genève", d: "Stratégie Instagram/TikTok, vidéos promo, affiches d'événements." },
  { y: "—", t: "Télépilote de drone — événement à Genève", d: "Prises de vues aériennes pour la communication de l'événement." },
  { y: "—", t: "Création et communication de jeux vidéo", d: "Direction artistique, contenus courts, mise en avant sur les réseaux." },
  { y: "2024", t: "Bachelor Marketing & Communication — Ynov Lyon", d: "" },
];

function VideoSlot({ v }) {
  return (
    <div className="reveal flex flex-col">
      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl border-[1.5px] border-encre bg-sable/60 shadow-soft">
        {v.src ? (
          <video src={v.src} className="h-full w-full object-cover" controls playsInline preload="metadata" />
        ) : v.embed ? (
          <iframe src={v.embed} title={v.title} className="h-full w-full" allow="autoplay; encrypted-media" allowFullScreen />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 p-4 text-center">
            <iconify-icon icon="solar:play-circle-linear" class="text-5xl text-encre/40" aria-hidden="true"></iconify-icon>
            <span className="text-xs font-semibold uppercase tracking-widest text-taupe">Vidéo à venir</span>
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-hi px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-encre">
          {v.tag}
        </span>
      </div>
      <p className="mt-3 text-sm font-semibold text-encre">{v.title}</p>
      {v.views && <p className="text-xs text-taupe">{v.views} vues</p>}
    </div>
  );
}

export default function YanisPage() {
  const mainRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => setupReveals(), mainRef);
    const id = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => {
      ctx.revert();
      clearTimeout(id);
    };
  }, []);

  /* Titre + noindex (page perso non référencée) */
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Yanis Ouammou — Communication, contenu viral & IA";
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex, follow";
    document.head.appendChild(robots);
    return () => {
      document.title = prevTitle;
      robots.remove();
    };
  }, []);

  const whatsappHref =
    "https://wa.me/" + whatsapp.number + "?text=" + encodeURIComponent("Bonjour Yanis, j'ai vu ton portfolio");

  return (
    <div ref={mainRef} className="relative overflow-x-hidden">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link to="/" aria-label="Kota Studio">
          <Logo className="text-2xl" />
        </Link>
        <a
          href={`mailto:${EMAIL}`}
          className="hidden rounded-full border border-encre/15 bg-creme px-5 py-2.5 text-sm font-semibold text-encre shadow-soft hover:border-encre/30 sm:inline-flex"
        >
          {EMAIL}
        </a>
      </header>

      <main>
        {/* ---- Hero ---- */}
        <section className="reveal mx-auto max-w-6xl px-6 pb-16 pt-6 lg:pt-14">
          <span className="inline-flex items-center gap-2 tag-label">
            <span className="h-1.5 w-1.5 rounded-full bg-or" />
            Communication · Contenu viral · IA
          </span>
          <h1 className="kota-title mt-6 text-4xl sm:text-5xl lg:text-7xl">
            Je ne fais pas des vidéos.
            <br />
            <span className="bg-hi px-2">Je fais des vidéos qu'on partage.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-taupe">
            Yanis Ouammou, fondateur de Kota Studio. Bars, restaurants, commerces, e-commerce :
            je trouve l'idée, je la tourne, je la monte, et j'utilise l'IA pour aller plus vite.
            Basé à Saint-Julien-en-Genevois, disponible à Genève et en Haute-Savoie.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={CV_URL} variant="primary" icon="solar:download-linear" download reloadDocument>
              Télécharger mon CV
            </Button>
            <Button href={`mailto:${EMAIL}`} variant="secondary" icon="solar:letter-linear">
              M'écrire
            </Button>
            <Button href={whatsappHref} variant="secondary" icon="mdi:whatsapp" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </Button>
          </div>

          <div className="reveal-stagger mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.l} className="rounded-2xl border-[1.5px] border-encre bg-creme px-5 py-5 shadow-[4px_4px_0_#141714]">
                <p className="kota-title text-3xl lg:text-4xl">{s.n}</p>
                <p className="mt-2 text-sm text-taupe">{s.l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---- Vidéos ---- */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="reveal mb-10">
            <span className="tag-label">Réalisations</span>
            <h2 className="kota-title mt-4 text-3xl lg:text-5xl">Ce que j'ai déjà tourné</h2>
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
            {VIDEOS.map((v, i) => (
              <VideoSlot key={i} v={v} />
            ))}
          </div>
        </section>

        {/* ---- Idées ---- */}
        <section className="mat relative py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="reveal mb-12 max-w-2xl">
              <span className="tag-label text-onmat2">Idées</span>
              <h2 className="kota-title mt-4 text-3xl text-onmat lg:text-5xl">
                Six idées que je tournerais demain
              </h2>
              <p className="mt-4 text-onmat2">
                Réalisables avec un smartphone et petit budget. Chacune repose sur une mécanique
                qui a déjà fait ses preuves en 2025-2026, adaptée à votre lieu.
              </p>
            </div>
            <div className="reveal-stagger grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {IDEAS.map((idea) => (
                <article key={idea.title} className="flex flex-col rounded-2xl bg-creme p-6 text-encre shadow-soft-lg">
                  <span className="text-xs font-bold uppercase tracking-widest text-or">{idea.sector}</span>
                  <h3 className="kota-title mt-3 text-xl">{idea.title}</h3>
                  <p className="mt-3 inline-block self-start bg-hi px-2 py-0.5 text-sm font-semibold">{idea.hook}</p>
                  <p className="mt-4 text-sm leading-relaxed text-taupe">{idea.text}</p>
                  <p className="mt-auto pt-5 text-sm font-semibold text-encre">→ {idea.why}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Méthode ---- */}
        <section className="mx-auto max-w-6xl px-6 py-24">
          <div className="reveal mb-10">
            <span className="tag-label">Méthode</span>
            <h2 className="kota-title mt-4 text-3xl lg:text-5xl">Pourquoi une vidéo devient virale</h2>
          </div>
          <div className="reveal-stagger grid grid-cols-1 gap-4 sm:grid-cols-2">
            {METHOD.map((m, i) => (
              <div key={m.t} className="rounded-2xl border border-encre/10 bg-creme p-6 shadow-soft">
                <p className="font-mono text-sm text-or">0{i + 1}</p>
                <h3 className="mt-2 text-lg font-bold text-encre">{m.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-taupe">{m.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---- Compétences ---- */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="reveal mb-10">
            <span className="tag-label">Compétences</span>
            <h2 className="kota-title mt-4 text-3xl lg:text-5xl">Une seule personne, toute la chaîne</h2>
          </div>
          <div className="reveal-stagger grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SKILLS.map((s) => (
              <div key={s.t} className="rounded-2xl border-[1.5px] border-encre bg-creme p-6">
                <iconify-icon icon={s.icon} class="text-3xl text-or" aria-hidden="true"></iconify-icon>
                <h3 className="mt-4 text-lg font-bold text-encre">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-taupe">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---- Parcours ---- */}
        <section className="mx-auto max-w-4xl px-6 pb-24">
          <div className="reveal mb-10">
            <span className="tag-label">Parcours</span>
            <h2 className="kota-title mt-4 text-3xl lg:text-5xl">D'où je viens</h2>
          </div>
          <ol className="reveal-stagger space-y-4">
            {PATH.map((p) => (
              <li key={p.t} className="grid grid-cols-[72px_1fr] gap-4 rounded-2xl border border-encre/10 bg-creme px-5 py-4 shadow-soft">
                <span className="font-mono text-sm font-bold text-or">{p.y}</span>
                <div>
                  <p className="font-bold text-encre">{p.t}</p>
                  {p.d && <p className="mt-1 text-sm text-taupe">{p.d}</p>}
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ---- CTA ---- */}
        <section className="reveal mx-auto max-w-4xl px-6 pb-24">
          <div className="mat rounded-[28px] px-8 py-12 text-center shadow-soft-lg lg:px-14 lg:py-16">
            <h2 className="kota-title text-3xl text-onmat lg:text-4xl">
              Une idée pour votre marque ? J'en ai déjà trois.
            </h2>
            <p className="mt-4 text-onmat2">
              15 minutes d'appel et je vous présente les concepts que je tournerais chez vous. En poste ou en mission.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href={`mailto:${EMAIL}`} variant="light" icon="solar:letter-linear">
                {EMAIL}
              </Button>
              <Button href={`tel:${PHONE.replace(/\s/g, "")}`} variant="light" icon="solar:phone-linear">
                {PHONE}
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
