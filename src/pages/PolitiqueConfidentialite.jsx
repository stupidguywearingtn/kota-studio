import { legal } from "../data/content";
import LegalLayout, { LegalSection, Ph } from "../components/LegalLayout";

const c = legal.company;

/* Page /politique-de-confidentialite — RGPD. Infos éditables dans content.js
   (objet `legal`). Les valeurs entre [crochets] s'affichent surlignées. */
export default function PolitiqueConfidentialite() {
  return (
    <LegalLayout
      title="Politique de confidentialité"
      intro="Comment nous collectons, utilisons et protégeons vos données personnelles, conformément au RGPD."
    >
      <LegalSection n={1} title="Responsable du traitement">
        <p>
          Le responsable du traitement des données collectées sur ce site est{" "}
          <Ph>{c.name}</Ph>, joignable à l'adresse <Ph>{c.email}</Ph>.
        </p>
      </LegalSection>

      <LegalSection n={2} title="Données que nous collectons">
        <p>
          Nous collectons uniquement les données que vous nous transmettez
          volontairement, notamment lorsque vous :
        </p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>
            réservez un appel via le calendrier en ligne (nom, e-mail et
            informations que vous renseignez) ;
          </li>
          <li>nous contactez par WhatsApp, e-mail ou téléphone ;</li>
          <li>
            naviguez sur le site (données techniques : adresse IP, type de
            navigateur, pages consultées, via la mesure d'audience).
          </li>
        </ul>
      </LegalSection>

      <LegalSection n={3} title="Finalités">
        <p>
          Vos données sont utilisées pour répondre à vos demandes, organiser et
          assurer le suivi des rendez-vous, établir un devis ou réaliser une
          prestation, et améliorer le site. Elles ne sont jamais vendues à des
          tiers.
        </p>
      </LegalSection>

      <LegalSection n={4} title="Base légale">
        <p>
          Les traitements reposent sur votre consentement (prise de
          rendez-vous, prise de contact), l'exécution de mesures
          précontractuelles ou contractuelles (devis, prestation) et notre
          intérêt légitime (sécurité et amélioration du site).
        </p>
      </LegalSection>

      <LegalSection n={5} title="Destinataires et sous-traitants">
        <p>
          Vos données peuvent être traitées par nos prestataires techniques,
          strictement pour le fonctionnement du service :
        </p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>
            <strong className="font-semibold text-encre">Calendly</strong> —
            prise de rendez-vous en ligne ;
          </li>
          <li>
            <strong className="font-semibold text-encre">Meta (WhatsApp)</strong>{" "}
            — si vous nous contactez via WhatsApp ;
          </li>
          <li>
            <strong className="font-semibold text-encre">
              {legal.host.name}
            </strong>{" "}
            — hébergement du site.
          </li>
        </ul>
      </LegalSection>

      <LegalSection n={6} title="Durée de conservation">
        <p>
          Vos données sont conservées le temps nécessaire au traitement de votre
          demande, puis archivées ou supprimées dans le respect des délais
          légaux (en général 3 ans à compter du dernier contact pour les
          prospects).
        </p>
      </LegalSection>

      <LegalSection n={7} title="Vos droits">
        <p>
          Conformément au RGPD, vous disposez d'un droit d'accès, de
          rectification, d'effacement, de limitation, d'opposition et de
          portabilité de vos données. Pour les exercer, écrivez-nous à{" "}
          <Ph>{c.email}</Ph>.
        </p>
        <p>
          Vous pouvez également introduire une réclamation auprès de la CNIL (
          <a
            href="https://www.cnil.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-or underline-offset-2 hover:underline"
          >
            www.cnil.fr
          </a>
          ).
        </p>
      </LegalSection>

      <LegalSection n={8} title="Cookies">
        <p>
          Le site utilise des cookies de fonctionnement et, le cas échéant, de
          mesure d'audience. Les outils intégrés (comme le calendrier Calendly)
          peuvent déposer leurs propres cookies. Vous pouvez à tout moment
          configurer votre navigateur pour les bloquer.
        </p>
      </LegalSection>

      <LegalSection n={9} title="Sécurité">
        <p>
          Le site est servi en HTTPS et nous mettons en œuvre des mesures
          techniques raisonnables pour protéger vos données contre tout accès
          non autorisé.
        </p>
      </LegalSection>

      <LegalSection n={10} title="Contact">
        <p>
          Pour toute question relative à cette politique ou à vos données,
          contactez-nous à <Ph>{c.email}</Ph> ou au {c.phone}.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
