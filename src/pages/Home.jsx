import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupReveals } from "../lib/reveal";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import MarqueeLogos from "../components/MarqueeLogos";
import WhatWeDo from "../components/WhatWeDo";
import Promises from "../components/Promises";
import Work from "../components/Work";
import Process from "../components/Process";
import Testimonials from "../components/Testimonials";
import Offer from "../components/Offer";
import FinalCta from "../components/FinalCta";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";

export default function Home() {
  const mainRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Entrée du hero */
      const heroTl = gsap.timeline();
      heroTl
        .from(".hero-content > *", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.4)",
        })
        .from(
          ".hero-illustration",
          { scale: 0.92, opacity: 0, duration: 1, ease: "power3.out" },
          "-=0.6"
        );

      /* Boucle du mot du hero — largeur fixe (CSS) => jamais de décalage. */
      const words = gsap.utils.toArray(".hero-word");
      if (words.length) {
        gsap.set(words, { opacity: 0, yPercent: 60 });
        gsap.set(words[0], { opacity: 1, yPercent: 0 });
        const wordTl = gsap.timeline({ repeat: -1 });
        words.forEach((word, i) => {
          const next = words[(i + 1) % words.length];
          wordTl
            // 1) l'ancien mot disparaît COMPLÈTEMENT (fade out + glisse vers le haut)
            .to(
              word,
              { opacity: 0, yPercent: -60, duration: 0.4, ease: "power2.in" },
              "+=1.8"
            )
            // 2) PUIS SEULEMENT le nouveau mot apparaît. ">0.12" = 0,12 s APRÈS la
            //    fin du fade out -> jamais les deux en même temps (mode "wait",
            //    aucun chevauchement pendant la transition).
            .fromTo(
              next,
              { opacity: 0, yPercent: 60 },
              { opacity: 1, yPercent: 0, duration: 0.5, ease: "power2.out" },
              ">0.12"
            );
        });
      }

      /* ---- Dashboard animé du hero (timeline en boucle ~12s) ---- */
      const dBars = gsap.utils.toArray(".dash-bar");
      if (dBars.length) {
        const root = mainRef.current;
        const dNums = gsap.utils.toArray(".dash-num");
        const dPcts = gsap.utils.toArray(".dash-pct");
        const dDots = gsap.utils.toArray(".dash-dot");
        const trend = root.querySelector(".dash-trend");
        const total = root.querySelector(".dash-total");
        const totalNum = root.querySelector(".dash-total-num");
        const SP = 1.4;
        const proxies = dNums.map(() => ({ v: 0 }));
        const totalProxy = { v: 0 };

        gsap.set(dBars, { scaleY: 0, transformOrigin: "bottom center" });
        gsap.set(dPcts, { opacity: 0, y: 12 });
        gsap.set(dDots, { scale: 0, transformOrigin: "center center" });
        if (total) gsap.set(total, { opacity: 0, y: 8 });
        if (trend) gsap.set(trend, { strokeDasharray: 1, strokeDashoffset: 1 });

        const dash = gsap.timeline({ repeat: -1, repeatDelay: 0.7, delay: 1 });

        dash.set(dBars, { scaleY: 0 }, 0).set(dPcts, { opacity: 0, y: 12 }, 0);
        dash.set(dDots, { scale: 0 }, 0);
        proxies.forEach((p) => dash.set(p, { v: 0 }, 0));
        dash.set(totalProxy, { v: 0 }, 0);
        if (total) dash.set(total, { opacity: 0, y: 8 }, 0);
        if (trend) dash.set(trend, { strokeDashoffset: 1 }, 0);

        dBars.forEach((bar, i) => {
          const at = 0.4 + i * SP;
          dash.to(bar, { scaleY: 1, duration: 0.9, ease: "power3.out" }, at);
          if (dDots[i]) {
            dash.to(dDots[i], { scale: 1, duration: 0.4, ease: "back.out(2)" }, at + 0.55);
          }
          if (dPcts[i]) {
            dash.to(dPcts[i], { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, at + 0.5);
          }
          if (dNums[i]) {
            dash.to(
              proxies[i],
              {
                v: +dNums[i].dataset.target,
                duration: 0.8,
                ease: "power1.out",
                onUpdate: () => {
                  dNums[i].textContent = Math.round(proxies[i].v);
                },
              },
              at + 0.5
            );
          }
        });

        if (trend) {
          const drawStart = 0.7;
          const drawEnd = 0.4 + (dBars.length - 1) * SP + 1;
          dash.to(trend, { strokeDashoffset: 0, ease: "none", duration: drawEnd - drawStart }, drawStart);
        }

        const lastAt = 0.4 + (dBars.length - 1) * SP;
        if (total) dash.to(total, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, lastAt + 0.5);
        if (totalNum) {
          dash.to(
            totalProxy,
            {
              v: +totalNum.dataset.target,
              duration: 1,
              ease: "power1.out",
              onUpdate: () => {
                totalNum.textContent = Math.round(totalProxy.v);
              },
            },
            lastAt + 0.5
          );
        }

        const resetAt = lastAt + 1 + 4.3;
        dash.to(dPcts, { opacity: 0, y: 8, duration: 0.5, ease: "power2.in" }, resetAt);
        dash.to(dDots, { scale: 0, duration: 0.5, ease: "power2.in" }, resetAt);
        if (total) dash.to(total, { opacity: 0, duration: 0.5, ease: "power2.in" }, resetAt);
        dash.to(dBars, { scaleY: 0, duration: 0.7, ease: "power2.inOut", stagger: 0.05 }, resetAt + 0.1);
        if (trend) dash.to(trend, { strokeDashoffset: 1, duration: 0.7, ease: "power2.inOut" }, resetAt + 0.1);
      }

      /* Reveals au scroll */
      setupReveals();

      /* Ligne de progression dorée du Process (si présente) */
      const line = mainRef.current?.querySelector(".process-line");
      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: "left center",
            ease: "none",
            scrollTrigger: { trigger: line, start: "top 85%", end: "+=420", scrub: true },
          }
        );
      }
    }, mainRef);

    const refreshId = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      ctx.revert();
      clearTimeout(refreshId);
    };
  }, []);

  return (
    <div ref={mainRef} className="relative overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <MarqueeLogos />
        <WhatWeDo />
        <Promises />
        <Work />
        <Process />
        <Testimonials />
        <Offer />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
