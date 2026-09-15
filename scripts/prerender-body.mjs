/* ============================================================================
   Post-build (après vite build ET generate-static-heads.mjs) : injecte le
   VRAI contenu texte de chaque page (titres, FAQ, prix, footer...) dans le
   <div id="root"> du dist/<route>/index.html correspondant, pour les
   crawlers qui n'exécutent pas le JavaScript (GPTBot, ClaudeBot,
   PerplexityBot...) et qui, jusqu'ici, ne voyaient qu'un <div id="root">
   vide sur absolument toutes les routes du site (SPA sans SSR).

   Comment : `src/entry-server.jsx` exporte une fonction `renderPage(path)`
   qui fait un rendu React 100% statique (ReactDOMServer.renderToStaticMarkup,
   AUCUN Playwright/Chromium) de la même arborescence de composants que le
   site réel (<App/> avec <StaticRouter> au lieu de <BrowserRouter>). Comme
   tous les composants de page ne touchent au DOM (gsap, ScrollTrigger,
   document.title...) que dans des useEffect — jamais dans le corps du
   rendu — ce rendu statique est fiable et ne modifie NI le JSX NI le
   comportement runtime du site : `main.jsx` utilise `createRoot().render()`
   (pas `hydrateRoot()`), donc React remplace simplement ce HTML pré-rendu
   par le même rendu côté client au montage, sans erreur d'hydratation
   possible, pour le visiteur humain réel (le JS s'exécute normalement,
   Lenis/GSAP/animations inchangés).

   Sécurité du build : ce script ne doit JAMAIS faire échouer `npm run
   build`. Si l'étape SSR échoue pour une raison quelconque (environnement
   de build Vercel sans un module, régression future...), il logue
   l'erreur et s'arrête proprement — le site reste déployé avec le <head>
   par route déjà correct (généré par generate-static-heads.mjs) et un
   corps de page vide, exactement le comportement d'avant ce chantier.
   ============================================================================ */

import { execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

import { cities } from "../src/data/cities.js";
import { projects } from "../src/data/content.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const ssrOutDir = path.join(rootDir, "dist-server");

/* Même liste de routes que generate-static-heads.mjs (+ "/", l'accueil,
   qui n'a pas besoin de <head> par route puisque dist/index.html porte déjà
   le bon <head> par défaut). */
const routes = [
  { routePath: "/", filePath: path.join(distDir, "index.html") },
  ...cities.map((c) => ({
    routePath: `/${c.slug}`,
    filePath: path.join(distDir, c.slug, "index.html"),
  })),
  ...projects.map((p) => ({
    routePath: `/projets/${p.slug}`,
    filePath: path.join(distDir, "projets", p.slug, "index.html"),
  })),
  {
    routePath: "/combien-coute-un-site-internet",
    filePath: path.join(distDir, "combien-coute-un-site-internet", "index.html"),
  },
  {
    routePath: "/mentions-legales",
    filePath: path.join(distDir, "mentions-legales", "index.html"),
  },
  {
    routePath: "/politique-de-confidentialite",
    filePath: path.join(distDir, "politique-de-confidentialite", "index.html"),
  },
];

function cleanup() {
  rmSync(ssrOutDir, { recursive: true, force: true });
}

function fail(step, error) {
  console.warn(`[prerender-body] Étape "${step}" échouée, contenu du <body> non pré-rendu (le <head> par route reste correct) :`);
  console.warn(error?.stack || error);
  cleanup();
  process.exit(0);
}

console.log("Pré-rendu du contenu texte par route (ReactDOMServer, sans navigateur)...");

try {
  execSync(`npx vite build --ssr src/entry-server.jsx --outDir dist-server`, {
    cwd: rootDir,
    stdio: "inherit",
  });
} catch (error) {
  fail("build SSR (vite build --ssr)", error);
}

let renderPage;
try {
  const mod = await import(pathToFileURL(path.join(ssrOutDir, "entry-server.js")).href);
  renderPage = mod.renderPage;
  if (typeof renderPage !== "function") throw new Error("renderPage n'est pas exporté par entry-server.js");
} catch (error) {
  fail("import du bundle SSR", error);
}

let ok = 0;
let skipped = 0;

for (const { routePath, filePath } of routes) {
  if (!existsSync(filePath)) {
    console.warn(`[prerender-body] ${routePath} : fichier ${filePath} introuvable (generate-static-heads.mjs a-t-il tourné avant ?), ignoré.`);
    skipped++;
    continue;
  }
  try {
    const bodyHtml = renderPage(routePath);
    const html = readFileSync(filePath, "utf-8");
    if (!html.includes('<div id="root"></div>')) {
      console.warn(`[prerender-body] ${routePath} : <div id="root"></div> vide introuvable dans ${filePath}, ignoré (déjà pré-rendu ?).`);
      skipped++;
      continue;
    }
    const updated = html.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);
    writeFileSync(filePath, updated);
    console.log(`  ${routePath} -> ${bodyHtml.length} caractères de HTML injectés`);
    ok++;
  } catch (error) {
    console.warn(`[prerender-body] ${routePath} : rendu échoué, page laissée avec un <body> vide (comportement identique à avant ce chantier).`);
    console.warn(error?.stack || error);
    skipped++;
  }
}

cleanup();
console.log(`Terminé : ${ok} route(s) pré-rendue(s), ${skipped} ignorée(s).`);
