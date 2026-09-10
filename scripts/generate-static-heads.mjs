/* ============================================================================
   Post-build : génère un dist/<route>/index.html par route avec un <head>
   corrigé (title, meta description, canonical, OG, Twitter) dans le HTML
   BRUT (non-JS).

   Pourquoi : le site est une SPA React sans SSR. Le dist/index.html unique
   sert de fallback pour toutes les routes (vercel.json rewrites), donc le
   <link rel="canonical"> brut vaut "https://kotastudio.fr/" (l'accueil)
   pour N'IMPORTE QUELLE URL — y compris les pages ville et projet. Ce
   canonical n'est corrigé qu'au runtime (useEffect côté client), donc :
   - tout crawler qui n'exécute pas le JS (GPTBot, PerplexityBot, ClaudeBot,
     et la première passe non-rendue de Googlebot) voit un canonical qui dit
     explicitement "cette page = l'accueil", ce qui peut empêcher son
     indexation propre.
   - les pages projet (ProjectPage.jsx) ne corrigeaient même pas le
     canonical côté client avant ce script (bug corrigé au passage).

   Ce script ne fait PAS de prerendering complet (pas de Playwright/Chromium,
   donc aucun risque de casser le build Vercel) : il ne réécrit que le
   <head> du même dist/index.html, en gardant le même <div id="root"> et les
   mêmes <script> — le SPA s'hydrate ensuite normalement. Vercel sert un
   fichier statique existant dans outputDirectory avant d'appliquer les
   rewrites de vercel.json, donc dist/<route>/index.html prend le dessus sur
   le fallback SPA pour cette route exacte.
   ============================================================================ */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { cities } from "../src/data/cities.js";
import { projects } from "../src/data/content.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, "..", "dist");
const SITE_URL = "https://kotastudio.fr";

const template = readFileSync(path.join(distDir, "index.html"), "utf-8");

function escapeAttr(str) {
  return String(str).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}
function escapeText(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderHead(html, { title, description, url }) {
  const t = escapeText(title);
  const d = escapeAttr(description);
  const u = escapeAttr(url);
  let out = html;
  out = out.replace(/<title>.*?<\/title>/, () => `<title>${t}</title>`);
  out = out.replace(
    /<meta name="description" content=".*?" \/>/,
    () => `<meta name="description" content="${d}" />`
  );
  out = out.replace(
    /<link rel="canonical" href=".*?" \/>/,
    () => `<link rel="canonical" href="${u}" />`
  );
  out = out.replace(
    /<meta property="og:title" content=".*?" \/>/,
    () => `<meta property="og:title" content="${t}" />`
  );
  out = out.replace(
    /<meta property="og:description" content=".*?" \/>/,
    () => `<meta property="og:description" content="${d}" />`
  );
  out = out.replace(
    /<meta property="og:url" content=".*?" \/>/,
    () => `<meta property="og:url" content="${u}" />`
  );
  out = out.replace(
    /<meta name="twitter:title" content=".*?" \/>/,
    () => `<meta name="twitter:title" content="${t}" />`
  );
  out = out.replace(
    /<meta name="twitter:description" content=".*?" \/>/,
    () => `<meta name="twitter:description" content="${d}" />`
  );
  return out;
}

function writeRoute(routePath, { title, description }) {
  const url = `${SITE_URL}${routePath}`;
  const html = renderHead(template, { title, description, url });
  const dir = path.join(distDir, routePath.replace(/^\//, ""));
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, "index.html"), html);
  console.log(`  ${routePath} -> ${title}`);
}

console.log("Génération des <head> statiques par route (title/description/canonical/OG)...");

for (const city of cities) {
  writeRoute(`/${city.slug}`, {
    title: city.metaTitle,
    description: city.metaDescription,
  });
}

for (const project of projects) {
  writeRoute(`/projets/${project.slug}`, {
    title: `${project.name} — ${project.sector} | Kota Studio`,
    description: `${project.name} (${project.sector}) — réalisation Kota Studio, agence de création de sites web sur-mesure.`,
  });
}

writeRoute("/combien-coute-un-site-internet", {
  title: "Combien coûte un site internet ? Prix, délais, inclus | Kota Studio",
  description:
    "Prix réels d'un site internet chez Kota Studio : landing page à partir de 790 €, site sur-mesure à partir de 1 290 €. Délai de 14 jours, ce qui est inclus, ce qui est en option.",
});

writeRoute("/mentions-legales", {
  title: "Mentions légales | Kota Studio",
  description:
    "Mentions légales du site Kota Studio : éditeur, hébergement, propriété intellectuelle.",
});

writeRoute("/politique-de-confidentialite", {
  title: "Politique de confidentialité | Kota Studio",
  description:
    "Politique de confidentialité et RGPD de Kota Studio : données collectées, finalités, droits des utilisateurs.",
});

console.log("Terminé.");
