import { promises } from "../data/content";

export default function Promises() {
  return (
    <section
      id="promesses"
      className="relative overflow-hidden bg-encre text-creme py-16 sm:py-24 lg:py-32"
    >
      {/* Décor : halo doré diffus */}
      <div
        className="gold-halo pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2"
        aria-hidden="true"
      ></div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* En-tête centré */}
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-or/30 bg-or/10 px-4 py-1.5 text-sm font-semibold tracking-tight text-or">
            <iconify-icon
              icon="solar:hand-shake-linear"
              class="text-base text-or"
              aria-hidden="true"
            ></iconify-icon>
            {promises.tag}
          </span>
          <h2 className="kota-title text-creme mt-6 text-4xl lg:text-5xl">
            {promises.title}
          </h2>
        </div>

        {/* Trois colonnes avec fins séparateurs dorés */}
        <div className="reveal-stagger mt-16 grid grid-cols-1 md:grid-cols-3">
          {promises.items.map((item, i) => (
            <div
              key={item.title}
              className={`flex flex-col items-center px-8 py-6 text-center md:items-start md:text-left ${
                i > 0 ? "md:border-l md:border-or/30" : ""
              }`}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-or/30 bg-or/5">
                <iconify-icon
                  icon={item.icon}
                  class="text-5xl text-or"
                  aria-hidden="true"
                ></iconify-icon>
              </div>
              <h3 className="kota-title text-creme mt-6 text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 leading-relaxed text-creme/70">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
