import { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";
import MentionsLegales from "./pages/MentionsLegales";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import CreationSiteInternetSaintJulien from "./pages/CreationSiteInternetSaintJulien";

gsap.registerPlugin(ScrollTrigger);

/* Gère le scroll au changement de route :
   - ancre (#section) -> scroll fluide vers la cible (même après navigation)
   - sinon -> retour en haut. Puis refresh ScrollTrigger. */
function ScrollManager({ lenis }) {
  const location = useLocation();
  useEffect(() => {
    if (!lenis) return;
    if (location.hash) {
      let tries = 0;
      const go = () => {
        const el = document.querySelector(location.hash);
        if (el) lenis.scrollTo(el, { offset: -80, duration: 1.1 });
        else if (tries++ < 12) setTimeout(go, 60);
      };
      go();
    } else {
      lenis.scrollTo(0, { immediate: true });
    }
    const id = setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => clearTimeout(id);
  }, [location, lenis]);
  return null;
}

export default function App() {
  const lenisRef = useRef(null);
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    /* Lenis global (smooth scroll partagé entre toutes les pages) */
    const l = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    l.on("scroll", ScrollTrigger.update);
    const tick = (time) => l.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    lenisRef.current = l;
    setLenis(l);

    return () => {
      gsap.ticker.remove(tick);
      l.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <>
      <ScrollManager lenis={lenis} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projets/:slug" element={<ProjectPage />} />
        <Route
          path="/creation-site-internet-saint-julien-en-genevois"
          element={<CreationSiteInternetSaintJulien />}
        />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route
          path="/politique-de-confidentialite"
          element={<PolitiqueConfidentialite />}
        />
      </Routes>
    </>
  );
}
