import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* Reveals au scroll, à appeler DANS un gsap.context(scope) :
   les sélecteurs sont relatifs au scope (donc à la page courante). */
export function setupReveals() {
  gsap.utils.toArray(".reveal").forEach((el) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: "top 86%" },
      y: 48,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  });

  gsap.utils.toArray(".reveal-stagger").forEach((container) => {
    gsap.from(container.children, {
      scrollTrigger: { trigger: container, start: "top 82%" },
      y: 56,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: "power3.out",
    });
  });
}
