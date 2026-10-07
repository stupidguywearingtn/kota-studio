/* Scène 3D du hero Kota Studio : MacBook Pro (film motion de Thomas à l'écran)
   + iPhone 15 Pro Max (vrai site client qui défile).
   Modèles Sketchfab CC BY 4.0 — crédits dans le footer du site.
   Chargé en import dynamique : three.js n'entre jamais dans le bundle initial. */
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const MAC_SCREEN = "Object_123";
const MAC_LID = "VCQqxpxkUlzqcJI";
const PHONE_SCREEN = "xXDHkMplTIDAXLN";

export function mountHeroScene(container, opts = {}) {
  const {
    macUrl = "/3d/macbook.glb",
    phoneUrl = "/3d/iphone.glb",
    videoSources = [
      { src: "/video/kota-motion-1610.webm", type: "video/webm" },
      { src: "/video/kota-motion-1610.mp4", type: "video/mp4" },
    ],
    phoneShotUrl = "/3d/telandcash-mobile.webp",
    onReady = () => {},
    manual = false, // true = pas de boucle rAF (rendu image par image pour les tests)
  } = opts;

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, innerWidth < 768 ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const canvas = renderer.domElement;
  canvas.style.cssText = "display:block;width:100%;height:100%;";
  canvas.setAttribute("aria-hidden", "true");
  container.appendChild(canvas);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.9;

  const cam = new THREE.PerspectiveCamera(24, 1, 0.05, 50);

  // Lumières : clé chaude qui porte l'ombre, contre-jour jaune (accent du site), débouchage froid.
  const key = new THREE.DirectionalLight(0xfff4e2, 2.1);
  key.position.set(-1.6, 3.2, 2.2);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -1.2; key.shadow.camera.right = 1.2;
  key.shadow.camera.top = 1.2; key.shadow.camera.bottom = -1.2;
  key.shadow.camera.near = 0.5; key.shadow.camera.far = 8;
  key.shadow.radius = 6; key.shadow.bias = -0.0004;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xf1e25a, 1.6);
  rim.position.set(2.2, 1.2, -2.4);
  scene.add(rim);
  const fill = new THREE.DirectionalLight(0xcfe3da, 0.5);
  fill.position.set(2, 0.6, 2.5);
  scene.add(fill);

  // Sol invisible qui ne reçoit que l'ombre : les appareils « posent » sur le tapis vert.
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(6, 6), new THREE.ShadowMaterial({ opacity: 0.32, color: 0x06130d }));
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  const world = new THREE.Group();
  scene.add(world);

  // --- écran du MacBook : la vidéo de Thomas (format 16:10, rien n'est rogné)
  const video = document.createElement("video");
  Object.assign(video, { muted: true, loop: true, playsInline: true, preload: "auto", crossOrigin: "anonymous" });
  video.setAttribute("playsinline", "");
  video.setAttribute("muted", "");
  const pick = videoSources.find((v) => video.canPlayType(v.type)) || videoSources[videoSources.length - 1];
  video.src = pick.src;
  const vtex = new THREE.VideoTexture(video);
  vtex.colorSpace = THREE.SRGBColorSpace;
  vtex.flipY = true;
  const macScreenMat = new THREE.MeshBasicMaterial({ color: 0x111111, toneMapped: false });

  // --- écran de l'iPhone : capture longue d'un vrai site client qui défile
  const phoneScreenMat = new THREE.MeshBasicMaterial({ color: 0xf2f2f2, toneMapped: false });
  let shotTex = null;
  const VIEW = 0.248; // part de la capture visible à l'écran (ratio écran / hauteur capture)

  const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  const load = (u) => new Promise((res, rej) => loader.load(u, res, undefined, rej));

  let mac = null, lid = null, phone = null, ready = false;
  const LID_OPEN = 0;
  const LID_CLOSED = 1.93;

  Promise.all([load(macUrl), load(phoneUrl)]).then(([gm, gp]) => {
    // MacBook normalisé : largeur 1 unité
    mac = gm.scene;
    const mb = new THREE.Box3().setFromObject(mac);
    const ms = mb.getSize(new THREE.Vector3());
    const k = 1 / ms.x;
    mac.scale.setScalar(k);
    mac.updateMatrixWorld(true);
    const mb2 = new THREE.Box3().setFromObject(mac);
    const mc = mb2.getCenter(new THREE.Vector3());
    mac.position.set(-mc.x, -mb2.min.y, -mc.z);
    mac.traverse((o) => {
      if (!o.isMesh) return;
      o.castShadow = true;
      if (o.name === MAC_SCREEN) o.material = macScreenMat;
    });
    const macWrap = new THREE.Group();
    macWrap.add(mac);
    macWrap.position.set(-0.08, 0, -0.08);
    macWrap.rotation.y = 0.42;
    world.add(macWrap);

    // charnière : on ré-accroche l'écran à un pivot sur son arête basse
    mac.traverse((o) => { if (!lid && o.name && o.name.startsWith(MAC_LID)) lid = o; });
    if (lid) {
      mac.updateMatrixWorld(true);
      const lb = new THREE.Box3().setFromObject(lid);
      const hingeW = new THREE.Vector3(0, lb.min.y, lb.max.z);
      const parent = lid.parent;
      const hingeL = parent.worldToLocal(hingeW.clone());
      const pivot = new THREE.Group();
      pivot.position.copy(hingeL);
      parent.add(pivot);
      pivot.attach(lid);
      lid = pivot;
    }

    // iPhone : hauteur 0.46 (proportion réelle face au 16 pouces)
    phone = gp.scene;
    const pb = new THREE.Box3().setFromObject(phone);
    const ps = pb.getSize(new THREE.Vector3());
    const pk = 0.56 / ps.y;
    phone.scale.setScalar(pk);
    phone.updateMatrixWorld(true);
    const pb2 = new THREE.Box3().setFromObject(phone);
    const pc = pb2.getCenter(new THREE.Vector3());
    phone.position.sub(pc);
    phone.traverse((o) => {
      if (!o.isMesh) return;
      o.castShadow = true;
      if (o.name === PHONE_SCREEN) o.material = phoneScreenMat;
    });
    const phoneWrap = new THREE.Group();
    const phoneTilt = new THREE.Group();
    phoneTilt.add(phone);
    phone.rotation.y = Math.PI; // le modèle est exporté de dos
    phoneWrap.add(phoneTilt);
    phoneWrap.position.set(0.4, 0.31, 0.34);
    phoneTilt.rotation.set(-0.05, -0.32, -0.08);
    world.add(phoneWrap);
    phone.userData.wrap = phoneWrap;
    phone.userData.tilt = phoneTilt;

    ready = true;
    resize();
  }).catch((e) => console.warn("[hero3d]", e));

  new THREE.TextureLoader().load(phoneShotUrl, (t) => {
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    t.repeat.set(1, VIEW);
    t.offset.set(0, 1 - VIEW);
    shotTex = t;
    phoneScreenMat.map = t;
    phoneScreenMat.color.set(0xffffff);
    phoneScreenMat.needsUpdate = true;
  });

  video.addEventListener("playing", () => {
    macScreenMat.map = vtex;
    macScreenMat.color.set(0xffffff);
    macScreenMat.needsUpdate = true;
  });

  // --- cadrage
  let W = 1, H = 1;
  function resize() {
    W = Math.max(1, container.clientWidth);
    H = Math.max(1, container.clientHeight);
    renderer.setSize(W, H, false);
    cam.aspect = W / H;
    // plus l'écran est étroit, plus on recule
    const a = W / H;
    const d = 2.72 + Math.max(0, 1.35 - a) * 1.25;
    cam.position.set(0.22, 1.0, d);
    cam.lookAt(0.05, 0.3, 0);
    cam.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(resize);
  ro.observe(container);

  // --- interaction
  let tx = 0, ty = 0, rx = 0, ry = 0;
  const onMove = (e) => {
    tx = (e.clientX / innerWidth - 0.5);
    ty = (e.clientY / innerHeight - 0.5);
  };
  addEventListener("pointermove", onMove, { passive: true });

  let visible = true;
  const io = new IntersectionObserver(([en]) => {
    visible = en.isIntersecting;
    if (visible) video.play().catch(() => {});
    else video.pause();
  });
  io.observe(container);

  // --- animation
  const ease = (x) => 1 - Math.pow(1 - Math.min(Math.max(x, 0), 1), 3);
  const easeIO = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  let t0 = null;
  let started = false;
  let announced = false;

  function frame(tMs) {
    if (!ready) return;
    if (t0 === null) t0 = tMs;
    const t = (tMs - t0) / 1000;

    if (!started && t > 0.2) {
      started = true;
      video.play().catch(() => {});
    }

    // ouverture du capot (entrée)
    const open = reduce ? 1 : ease((t - 0.15) / 1.5);
    if (lid) lid.rotation.x = LID_CLOSED + (LID_OPEN - LID_CLOSED) * open;

    // l'iPhone arrive après, par le bas
    const pin = reduce ? 1 : ease((t - 0.9) / 1.1);
    const pw = phone.userData.wrap;
    pw.position.y = 0.31 - (1 - pin) * 0.35 + (reduce ? 0 : Math.sin(t * 1.3) * 0.012);
    pw.scale.setScalar(0.6 + 0.4 * pin);
    phone.userData.tilt.rotation.z = -0.08 + (reduce ? 0 : Math.sin(t * 0.9) * 0.02);

    // défilement du site sur l'iPhone : 4 s de lecture, 3 s de scroll, retour
    if (shotTex) {
      const max = 1 - VIEW;
      const cyc = 14;
      const c = t < 2 ? 0 : (t - 2) % cyc;
      let p;
      if (c < 3) p = 0;
      else if (c < 6) p = easeIO((c - 3) / 3) * 0.45;
      else if (c < 8) p = 0.45;
      else if (c < 11) p = 0.45 + easeIO((c - 8) / 3) * 0.55;
      else if (c < 12.2) p = 1;
      else p = 1 - easeIO((c - 12.2) / 1.8);
      shotTex.offset.y = max - p * max;
    }

    // parallaxe souris
    ry += (tx - ry) * 0.05;
    rx += (ty - rx) * 0.05;
    world.rotation.y = ry * 0.22 + (reduce ? 0 : Math.sin(t * 0.25) * 0.03);
    world.rotation.x = rx * 0.05;

    renderer.render(scene, cam);
    if (!announced) {
      announced = true;
      onReady(); // l'image fixe ne s'efface qu'après la 1re image 3D réellement dessinée
    }
  }

  let raf = 0;
  const loop = (ts) => {
    raf = requestAnimationFrame(loop);
    if (visible && !document.hidden) frame(ts);
  };
  if (!manual) raf = requestAnimationFrame(loop);

  return {
    renderAt(sec) { t0 = 0; frame(sec * 1000); },
    video,
    dispose() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      removeEventListener("pointermove", onMove);
      video.pause();
      video.removeAttribute("src");
      renderer.dispose();
      pmrem.dispose();
      canvas.remove();
    },
  };
}
