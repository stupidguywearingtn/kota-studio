import { Link } from "react-router-dom";
import { legal } from "../data/content";
import LegalLayout, { LegalSection, Ph } from "../components/LegalLayout";

const c = legal.company;

/* Page /mentions-legales — contenu standard, infos éditables dans content.js
   (objet `legal`). Les valeurs entre [crochets] s'affichent surlignées. */
export default function MentionsLegales() {
  return (
    <LegalLayout
      title="Mentions légales"
      intro="Informations légales relatives à l'éditeur et à l'hébergeur du site."
    >
      <LegalSection n={1} title="Éditeur du site">
        <p>Le présent site est édité par :</p>
        <ul className="mt-2 space-y-1.5">
          <li>Raison sociale : <Ph>{c.name}</Ph></li>
          <li>Forme juridique : <Ph>{c.legalForm}</Ph></li>
          <li>SIRET : <Ph>{c.siret}</Ph></li>
          <li>RCS : <Ph>{c.rcs}</Ph></li>
          <li>Capital social : <Ph>{c.capital}</Ph></li>
          <li>N° TVA intracommunautaire : <Ph>{c.vat}</Ph></li>
          <li>Siège social : <Ph>{c.address}</Ph></li>
          <li>E-mail : <Ph>{c.email}</Ph></li>
          <li>Téléphone : {c.phone}</li>
          <li>Directeur de la publication : <Ph>{c.director}</Ph></li>
        </ul>
      </LegalSection>

      <LegalSection n={2} title="Hébergement">
        <p>Le site est hébergé par :</p>
        <ul className="mt-2 space-y-1.5">
          <li>{legal.host.name}</li>
          <li>{legal.host.address}</li>
          <li>
            <a
              href={legal.host.contact}
              target="_blank"
              rel="noopener noreferrer"
              className="text-or underline-offset-2 hover:underline"
            >
              {legal.host.contact}
            </a>
          </li>
        </ul>
      </LegalSection>

      <LegalSection n={3} title="Propriété intellectuelle">
        <p>
          L'ensemble des contenus présents sur ce site (textes, visuels, logos,
          éléments graphiques, code et structure) sont, sauf mention contraire,
          la propriété exclusive de <Ph>{c.name}</Ph> ou de ses partenaires.
          Toute reproduction, représentation, modification ou exploitation,
          totale ou partielle, sans autorisation écrite préalable est interdite
          et constitue une contrefaçon.
        </p>
      </LegalSection>

      <LegalSection n={4} title="Responsabilité">
        <p>
          <Ph>{c.name}</Ph> s'efforce d'assurer l'exactitude des informations
          diffusées sur ce site, sans pouvoir en garantir l'exhaustivité ni
          l'absence d'erreur, et ne saurait être tenue responsable d'une
          indisponibilité temporaire. Les liens externes éventuels n'engagent
          pas la responsabilité de l'éditeur quant à leur contenu.
        </p>
      </LegalSection>

      <LegalSection n={5} title="Données personnelles">
        <p>
          Le traitement de vos données personnelles est détaillé dans notre{" "}
          <Link
            to="/politique-de-confidentialite"
            className="text-or underline-offset-2 hover:underline"
          >
            Politique de confidentialité
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection n={6} title="Cookies">
        <p>
          Ce site peut déposer des cookies de fonctionnement et de mesure
          d'audience, ainsi que ceux des outils intégrés (par exemple le
          calendrier de réservation). Vous pouvez configurer votre navigateur
          pour les refuser. Plus de détails dans la{" "}
          <Link
            to="/politique-de-confidentialite"
            className="text-or underline-offset-2 hover:underline"
          >
            Politique de confidentialité
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection n={7} title="Droit applicable">
        <p>
          Les présentes mentions légales sont régies par le droit français. En
          cas de litige, et à défaut de résolution amiable, les tribunaux
          français seront seuls compétents.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
