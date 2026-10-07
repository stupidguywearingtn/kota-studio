import { promises } from "../data/content";

/* SECTION — NOS PROMESSES (version courte)
   4 engagements, un chiffre ou un mot fort + une ligne. Rien de plus. */
export default function Promises() {
  return (
    <section className="mat relative">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:py-16">
        <p className="k-eyebrow reveal mb-6">{promises.tag}</p>
        <div className="k-prom reveal-stagger">
          {promises.items.map((it) => (
            <div key={it.big}>
              <b>{it.big}</b>
              <span>{it.short}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
