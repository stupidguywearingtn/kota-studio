import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App.jsx";

/* Rendu statique (sans navigateur, sans hydratation) du corps de page pour
   une route donnée. Utilisé uniquement par scripts/prerender-body.mjs
   (post-build, via vite.ssrLoadModule) pour injecter le texte visible dans
   le <body> du dist/<route>/index.html correspondant, au bénéfice des
   crawlers qui n'exécutent pas le JS (GPTBot, ClaudeBot, PerplexityBot...).
   N'est jamais chargé par le vrai site (main.jsx ne l'importe pas). */
export function renderPage(path) {
  return ReactDOMServer.renderToStaticMarkup(
    <StaticRouter location={path}>
      <App />
    </StaticRouter>
  );
}
