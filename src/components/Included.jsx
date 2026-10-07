/* SECTION — TOUT EST INCLUS (bento façon « What's in every kit » du Wow Sites Club)
   Chaque case = une chose réellement livrée avec chaque site. */
export default function Included() {
  return (
    <section id="inclus" className="k-paper relative">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:py-28">
        <header className="reveal max-w-5xl">
          <p className="k-eyebrow">Dans chaque site</p>
          <h2 className="k-h2">
            Tout est inclus. <span className="k-hl">Rien à gérer.</span>
          </h2>
        </header>

        <div className="k-bento reveal-stagger mt-12">
          <div className="k-bx k wide tall">
            <b>Codé à la main, ligne par ligne</b>
            <p>Pas de thème acheté, pas de constructeur. Un code propre, rapide, qui vous appartient.</p>
            <code>{`<section class="hero">
  <h1>Un site qui <em>vend</em></h1>
  <p>Pensé pour vos clients,
     pas pour un template.</p>
  <a href="#appel">Réserver un appel</a>
</section>

/* chargé en moins d'une seconde,
   lisible par Google et par les IA */`}</code>
          </div>

          <div className="k-bx y">
            <span className="big">14 j</span>
            <b>de l'appel à la mise en ligne</b>
            <p>Un calendrier clair, annoncé dès le départ.</p>
          </div>

          <div className="k-bx">
            <b>Révisions illimitées</b>
            <p>On ajuste jusqu'à ce que le site vous ressemble vraiment.</p>
          </div>

          <div className="k-bx wide">
            <b>Pensé d'abord pour le téléphone</b>
            <p>C'est là que vos clients vous découvrent. Chaque écran est testé sur mobile.</p>
            <div className="phones">
              <img src="/realisations/mobile-tc.webp" alt="Tel & Cash sur mobile" loading="lazy" />
              <img src="/realisations/mobile-mk.webp" alt="Markus Immobilier sur mobile" loading="lazy" />
              <img src="/realisations/mobile-mg.webp" alt="Margaux CDR sur mobile" loading="lazy" />
              <img src="/realisations/mobile-hce.webp" alt="HCE BTP sur mobile" loading="lazy" />
            </div>
          </div>

          <div className="k-bx">
            <b>SEO local</b>
            <p>Titres, balises, sitemap, fiche Google : les bonnes bases posées dès le premier jour.</p>
          </div>
          <div className="k-bx">
            <b>Visible dans les IA</b>
            <p>Un site structuré pour que ChatGPT & co comprennent qui vous êtes et où vous travaillez.</p>
          </div>
          <div className="k-bx">
            <b>Espace admin</b>
            <p>Modifiez vos textes et vos photos vous-même, sans nous appeler.</p>
          </div>
          <div className="k-bx">
            <b>Mise en ligne gérée</b>
            <p>Domaine, hébergement, réglages techniques : on s'occupe de tout.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
