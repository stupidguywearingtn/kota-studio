/* Génère dist/404.html — page servie par Vercel avec un VRAI statut HTTP 404
   pour toute URL qui ne correspond à aucun fichier de dist/.

   Pourquoi (2026-11-13) : vercel.json réécrivait toute URL inconnue vers
   /index.html, donc /n-importe-quoi répondait 200 avec le HTML, le title et le
   canonical de l'accueil (soft 404 : Google et les crawlers IA voyaient une
   infinité d'URLs « accueil » en 200). Les 21 routes réelles sont toutes
   pré-rendues en fichiers statiques (dist/<route>/index.html) et Vercel sert
   le système de fichiers AVANT toute réécriture : la réécriture ne servait
   donc qu'aux URLs inexistantes. Elle est supprimée ; Vercel sert ce fichier.

   La page part du gabarit dist/index.html (mêmes CSS/JS hashés, même DA) :
   - title/description « Page introuvable », robots noindex ;
   - canonical, Open Graph/Twitter et JSON-LD de l'accueil retirés ;
   - #root vidé : React (createRoot, pas d'hydratation) affiche ensuite le
     composant « Page introuvable » existant (CityPage / route "*"). */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const dist = resolve(process.cwd(), "dist");
let html = readFileSync(resolve(dist, "index.html"), "utf8");

const replaceOnce = (re, by, label) => {
  if (!re.test(html)) throw new Error(`generate-404 : motif introuvable (${label})`);
  html = html.replace(re, by);
};

replaceOnce(/<title>[^<]*<\/title>/, "<title>Page introuvable | Kota Studio</title>", "title");
replaceOnce(
  /<meta name="description" content="[^"]*"\s*\/?>/,
  '<meta name="description" content="Cette page n\'existe pas ou a été déplacée." />\n    <meta name="robots" content="noindex" />',
  "description"
);
replaceOnce(/\s*<link rel="canonical"[^>]*>/, "", "canonical");
html = html.replace(/\s*<meta (?:property="og:|name="twitter:)[^>]*>/g, "");
html = html.replace(/\s*<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g, "");

const rootStart = html.indexOf('<div id="root">');
const bodyEnd = html.lastIndexOf("</body>");
if (rootStart === -1 || bodyEnd === -1) throw new Error("generate-404 : #root introuvable");
// Le contenu pré-rendu de l'accueil va de <div id="root"> au dernier </div>
// avant </body> (le script module Vite est dans <head>) : on le remplace par
// un #root vide.
const segment = html.slice(rootStart, bodyEnd);
const lastDiv = segment.lastIndexOf("</div>");
if (lastDiv === -1) throw new Error("generate-404 : fin de #root introuvable");
html = html.slice(0, rootStart) + '<div id="root"></div>' + segment.slice(lastDiv + 6) + html.slice(bodyEnd);

writeFileSync(resolve(dist, "404.html"), html);
console.log("dist/404.html généré (noindex, sans canonical ni JSON-LD).");
