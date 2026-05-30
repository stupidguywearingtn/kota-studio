# Kota Studio — Suivi du projet

_Site d'agence de création de sites web. Base technique : export React SocioSpark transformé (React 18 + Vite + GSAP/ScrollTrigger + Lenis + Tailwind + react-router-dom). DA crème/dorée/encre._

**🌐 En ligne : https://kota-studio.vercel.app** — **🛠 Local : `npm run dev` → http://localhost:5173**

---

## Direction artistique (validée)
- **Fonds** : crème/sable chaud (#FBF6EC → #F6EDDC) + **grille dorée subtile** (au niveau du `body`, visible sur toutes les sections crème). Sections sombres = encre #241A12.
- **Titres** : Bricolage Grotesque 800/900, lettres serrées (-0.03/-0.04em), encre. Texte courant : #7a6c5a.
- **Accent doré #C8A24E** : soulignement en vague, icônes, badges, points, détails.
- **Boutons** : composant unique `Button` réutilisé partout. Effet de profondeur (ombre encre décalée au repos, s'enfonce au survol). Principal = pilule encre + texte crème ; secondaire = pilule crème + contour encre.
- **Effet texte-contour** sur un mot des titres (poids 800, tracé net).
- **Marquees** : système 4 copies + translateX(-25%) = boucle vraiment infinie (classes `.mq-ltr/.mq-rtl/.mq-slow`). Fondu sur les bords (`.edge-fade`).

---

## Sections — état d'avancement

| # | Section | État |
|---|---------|------|
| 1 | **Hero** | ✅ FAIT — titre "Un site qui [mot animé]" (largeur fixe, jamais de décalage), badge SocioSpark-style incliné, fond quadrillé, soulignement vague, **dashboard animé** (barres + courbe dorée au-dessus + points + compteurs, boucle ~12s) |
| 2 | **Marquee + Logos** | ✅ FAIT — bandeau encre incliné -2°, gros texte + étoiles dorées, défilement infini fluide, logos avec fondu (placeholders "LOGO") |
| 3 | **Ce qu'on fait** | ✅ FAIT — 2 cartes (Site sur-mesure / Landing page), mockups navigateur animés, contraste crème/encre |
| 4 | **Nos promesses** | ✅ FAIT — 3 colonnes fond encre, icônes dorées |
| 5 | **Nos projets préférés** | ✅ FAIT — 4 cartes (vrais aperçus) cliquables → **pages projet `/projets/[slug]`** ; hover élégant |
| 6 | **Notre process** | ✅ FAIT — calendrier 14 jours fond encre, icônes outils colorées flottantes, badges infinis, titre 2 lignes (mot doré) |
| 7 | **Témoignages** | ⏳ À FAIRE — "Ce qu'on dira bientôt de nous", 3 cartes placeholder |
| 8 | **Offre / prix** | ⏳ À PEAUFINER — structure en place (2 cartes gauche, galerie 2 rangées, prix 790€/1290€, inclus, 5 extras) |
| 9 | **CTA final + contact** | ⏳ À FAIRE — fond crème + halo, grand titre, **embed Cal.com** (emplacement réservé), formes flottantes |

### Pages projet `/projets/[slug]` — ✅ architecture complète, contenu placeholder
4 pages : `tel-and-cash`, `markus-immobilier`, `sensoria`, `margaux-cdr`. Layout : back bar, hero projet, capture + vues supplémentaires, **Le défi / Notre approche / Le résultat / La recette Kota**, carte sticky "C'est à votre tour ?". Contenu en "Bientôt disponible" → à remplir dans `src/data/content.js` (`projects[]`).

---

## Obligatoire (transversal)
- [x] Bouton WhatsApp flottant fixe
- [x] Footer Kota Studio propre
- [x] Zéro erreur console (vérifié)
- [x] Routing react-router (pages projet) + rewrites SPA Vercel
- [x] **Déployé sur Vercel** (https://kota-studio.vercel.app)
- [ ] Embed Cal.com à brancher
- [ ] Passe responsive mobile complète sur toutes les sections

---

## Contenu à fournir par le client
- Vrais **logos clients** (section réassurance — actuellement "LOGO")
- **Descriptions + screens supplémentaires** des 4 pages projet (Le défi / Notre approche / Le résultat / La recette Kota)
- **`liveUrl`** de chaque projet (lien du vrai site — actuellement "#" dans `content.js`)
- Vrais **témoignages**
- **Numéro WhatsApp** + message préfait (placeholder `33600000000` dans `content.js`)
- **Lien/compte Cal.com**

---

## Déploiement & dev
- **Prod** : https://kota-studio.vercel.app (compte Vercel `stupidguywearingtn`, projet `kota-studio`).
- **Redéployer** après modif : `npx vercel --prod`
- **Dev local** : `npm run dev`
- **Tout le contenu textuel** est centralisé dans `src/data/content.js` (titres, prix, projets, WhatsApp, footer…).

---

## Journal des modifications
- Transformation SocioSpark → Kota Studio (9 sections, DA crème/dorée).
- Lenis (smooth scroll) + GSAP centralisé.
- Hero : mot animé largeur fixe, dashboard animé, badge relief, contour net.
- Marquee : inclinaison, étoiles dorées, boucle infinie robuste (4 copies).
- Process : refonte calendrier 14 jours + icônes outils colorées + badges espacés.
- Réalisations : 4 cartes projet + pages projet `/projets/[slug]` (routing react-router).
- Déploiement Vercel + config SPA + push GitHub.
