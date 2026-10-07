import { offer } from "../data/content";
import Button from "./Button";

/* SECTION — TARIFS (id="offre"), mise en scène du Wow Sites Club :
   ticket de caisse / post-it entouré au feutre / carte noire, puis tableau
   des options. Prix réels de content.js (offer). */
export default function Offer() {
  return (
    <section id="offre" className="mat relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:py-28">
        <header className="reveal max-w-5xl">
          <p className="k-eyebrow">Tarifs</p>
          <h2 className="k-h2">
            Un prix clair. <span className="k-hl">Tout compris.</span>
          </h2>
          <p className="mt-5 max-w-[60ch] text-lg text-onmat2">
            Prix fixe validé avant de commencer. Acompte de 50 % pour lancer le projet, le solde à la livraison.
          </p>
        </header>

        <div className="k-plans reveal-stagger mt-14">
          {/* Ticket de caisse */}
          <div className="k-plan rc">
            <p className="nm">Reçu · Landing page</p>
            <p className="from">à partir de</p>
            <p className="pr">790 €</p>
            <div className="dash" />
            <ul>
              <li>1 page pensée pour convertir</li>
              <li>Design sur-mesure, mobile d'abord</li>
              <li>Formulaire, WhatsApp ou réservation</li>
              <li>SEO de base + mise en ligne</li>
            </ul>
            <Button href="#contact" variant="secondary" className="mt-2 w-full">
              Réserver un appel
            </Button>
          </div>

          {/* Post-it entouré */}
          <div className="k-plan pi">
            <span className="tape" />
            <span className="h font-hand">le plus complet</span>
            <p className="nm">Site sur-mesure</p>
            <p className="from">à partir de</p>
            <p className="pr">
              <span className="k-ringed">
                1 290 €
                <svg viewBox="0 0 240 90" preserveAspectRatio="none" fill="none" aria-hidden="true">
                  <path d="M40 10C95 0 205 2 228 26c16 18 4 44-36 54-60 14-160 10-182-14C-6 46 8 18 52 8" stroke="#C8412C" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                </svg>
              </span>
            </p>
            <ul>
              <li>Toutes les pages de votre activité</li>
              <li>Espace admin pour tout modifier</li>
              <li>SEO local + visibilité dans les IA</li>
              <li>Révisions illimitées, livré en 14 jours</li>
            </ul>
            <Button href="#contact" variant="light" className="mt-2 w-full">
              Lancer mon site
            </Button>
          </div>

          {/* Carte noire */}
          <div className="k-plan cc">
            <div className="flex items-center justify-between">
              <span className="chipc" aria-hidden="true" />
              <span className="nm text-onmat2">Projet · sur devis</span>
            </div>
            <p className="pr !text-[42px] sm:!text-[48px]">Sur devis</p>
            <ul>
              <li>Boutique en ligne sur-mesure</li>
              <li>Application mobile</li>
              <li>Outils métier : CRM, réservation…</li>
              <li>Refonte d'un site existant</li>
            </ul>
            <Button href="#contact" variant="primary" className="mt-2 w-full">
              Parlons-en
            </Button>
          </div>
        </div>

        {/* Options */}
        <div className="k-cmp reveal mt-16">
          <table>
            <thead>
              <tr>
                <th>{offer.extrasTitle}</th>
                <th className="text-right">Prix</th>
              </tr>
            </thead>
            <tbody>
              {offer.extras.map((x) => (
                <tr key={x.label}>
                  <td>{x.label}</td>
                  <td>{x.price}</td>
                </tr>
              ))}
            </tbody>
            <caption>Prix nets, TVA non applicable (art. 293 B du CGI). Paiement par virement : 50 % à la commande, 50 % à la livraison.</caption>
          </table>
        </div>
      </div>
    </section>
  );
}
