/* SECTION — QUESTIONS (id="faq"), style accordéon du Wow Sites Club.
   Les mêmes réponses alimentent le JSON-LD FAQPage (lu par Google et les IA). */
export const homeFaqs = [
  {
    q: "Combien coûte un site avec Kota Studio ?",
    a: "Une landing page démarre à 790 €, un site sur-mesure à 1 290 €. Après l'appel, vous recevez un prix fixe, écrit noir sur blanc, avant que quoi que ce soit commence. Les options (langue, logo, rédaction…) sont affichées à part.",
  },
  {
    q: "En combien de temps mon site est-il en ligne ?",
    a: "Notre process est calé sur 14 jours, de l'appel découverte à la mise en ligne : maquette, développement, vos retours, puis publication.",
  },
  {
    q: "Comment se passe le paiement ?",
    a: "Par virement : 50 % d'acompte pour lancer le projet, le solde à la livraison. TVA non applicable (art. 293 B du CGI).",
  },
  {
    q: "Est-ce que je pourrai modifier mon site moi-même ?",
    a: "Oui. Chaque site est livré avec un espace admin pour changer vos textes et vos photos sans nous appeler. On vous montre comment l'utiliser à la livraison.",
  },
  {
    q: "Vous me garantissez la première place sur Google ?",
    a: "Non, et personne ne peut sérieusement le promettre. On pose des bases solides (structure, vitesse, balises, sitemap, fiche Google) et on vous explique ce qui dépend de vous : avis clients, photos, activité.",
  },
  {
    q: "C'est quoi la visibilité dans les IA ?",
    a: "De plus en plus de gens demandent à ChatGPT ou Perplexity « un bon … près de chez moi ». On structure votre site pour que ces IA comprennent clairement ce que vous faites et où vous travaillez.",
  },
  {
    q: "Et après la mise en ligne ?",
    a: "Le site est à vous. Si vous voulez qu'on s'en occupe ensuite (mises à jour, suivi SEO, petites modifications), une maintenance mensuelle est possible, sur devis.",
  },
  {
    q: "Vous travaillez avec qui, et où ?",
    a: "Artisans, commerces, indépendants et PME. On est basés à Saint-Julien-en-Genevois, près de Genève, et on travaille partout en France, en Suisse et en Belgique : tout se fait à distance.",
  },
];

export default function Faq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <section id="faq" className="k-paper relative">
      <div className="k-faq mx-auto max-w-7xl px-5 pb-24 pt-4 sm:px-6">
        <p className="k-eyebrow mb-4">Questions</p>
        {homeFaqs.map((f, i) => (
          <details key={f.q} open={i === 0}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  );
}
