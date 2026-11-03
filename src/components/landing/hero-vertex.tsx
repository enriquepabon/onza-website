"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { COMPANY } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

// La V de Onza: tres trazos que convergen en un vértice (300,468).
// El hero la dibuja como un sistema de líneas que llegan a un solo punto:
// muchas señales, una decisión.
const MARK_PATHS = [
  "M 68,90 L 108,90 L 301,468 L 299,468 Z",
  "M 492,90 L 532,90 L 301,468 L 299,468 Z",
  "M 328,100 L 340,100 C 330,250 312,380 301,468 L 299,468 C 308,380 320,250 328,100 Z",
];

// Eje central de cada trazo, por donde viajan los pulsos hacia el vértice
const ARM_LINES = [
  "M 88,90 L 300,468",
  "M 512,90 L 300,468",
  "M 334,100 C 325,250 310,380 300,468",
];

// Haz de líneas finas que nace arriba y converge en el vértice
const RAY_ORIGINS = [-150, -60, 30, 120, 210, 300, 390, 480, 570, 660, 750];

// Algunos rayos llevan una señal tenue, a destiempo de los trazos
const RAY_SIGNALS = [
  { ray: 2, duration: 6.5, delay: 3.4 },
  { ray: 4, duration: 8, delay: 5.1 },
  { ray: 7, duration: 7.2, delay: 4.2 },
  { ray: 9, duration: 9, delay: 6.3 },
];

// Cola del pulso: tramos superpuestos, cada vez más cortos y opacos,
// que comparten el mismo frente. El último es la cabeza blanca.
const PULSE_STACK = [
  { len: 0.22, opacity: 0.12, width: 3, color: "#FF3B30" },
  { len: 0.12, opacity: 0.3, width: 3, color: "#FF3B30" },
  { len: 0.05, opacity: 0.7, width: 3, color: "#FF3B30" },
  { len: 0.012, opacity: 1, width: 4, color: "#FFFFFF" },
];

const VERTEX = { x: 300, y: 468 };

const CLIENT_LOGOS = [
  { name: "Grupo México", file: "white-grupomexico.png", tall: true },
  { name: "LaTroupe", file: "white-latroupe.svg", tall: false },
  { name: "Avicanna", file: "white-avicanna.png", tall: true },
  { name: "Language for Living", file: "white-languageforliving.svg", tall: false },
  { name: "Medcann", file: "white-medcann.png", tall: false },
  { name: "Success Drivers", file: "white-successdrivers.png", tall: false },
  { name: "Ticketmaster", file: "white-ticketmaster.png", tall: true },
];

const MARQUEE_LOGOS = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

// Offsets de un tramo de longitud `len` (con pathLength=1): frente justo antes
// del inicio (así la punta redondeada no asoma), frente en el vértice y cola
// ya absorbida por el vértice.
function pulseOffsets(len: number) {
  return {
    ["--d0" as string]: len + 0.02,
    ["--d1" as string]: len - 1,
    ["--d2" as string]: len - 1.25,
  };
}

function VertexMark() {
  return (
    <svg
      viewBox="-150 -100 900 640"
      className="w-full h-auto overflow-visible"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="vx-ray" gradientUnits="userSpaceOnUse" x1="0" y1="-100" x2="0" y2={VERTEX.y}>
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0.07" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="vx-signal" gradientUnits="userSpaceOnUse" x1="0" y1="-100" x2="0" y2={VERTEX.y}>
          <stop offset="0.15" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="0.25" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="vx-fill" gradientUnits="userSpaceOnUse" x1="0" y1="90" x2="0" y2={VERTEX.y}>
          <stop offset="0" stopColor="#fff" stopOpacity="0.03" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.16" />
        </linearGradient>
        <radialGradient id="vx-glow">
          <stop offset="0" stopColor="#FF3B30" stopOpacity="0.5" />
          <stop offset="0.35" stopColor="#FF3B30" stopOpacity="0.14" />
          <stop offset="1" stopColor="#FF3B30" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Haz convergente */}
      <g fill="none" stroke="url(#vx-ray)" strokeWidth="1" vectorEffect="non-scaling-stroke">
        {RAY_ORIGINS.map((x, i) => (
          <path
            key={x}
            d={`M ${x},-100 L ${VERTEX.x},${VERTEX.y}`}
            pathLength={1}
            vectorEffect="non-scaling-stroke"
            className="vx-draw"
            style={{ ["--d" as string]: `${0.1 + i * 0.06}s` }}
          />
        ))}
      </g>

      {/* Señales tenues sobre algunos rayos */}
      <g fill="none" stroke="url(#vx-signal)" strokeLinecap="round">
        {RAY_SIGNALS.map(({ ray, duration, delay }) => (
          <path
            key={ray}
            d={`M ${RAY_ORIGINS[ray]},-100 L ${VERTEX.x},${VERTEX.y}`}
            pathLength={1}
            strokeWidth="1.4"
            vectorEffect="non-scaling-stroke"
            strokeDasharray="0.09 3"
            className="vx-pulse"
            style={{
              ...pulseOffsets(0.09),
              ["--pulse-duration" as string]: `${duration}s`,
              ["--pulse-delay" as string]: `${delay}s`,
            }}
          />
        ))}
      </g>

      {/* La marca: relleno translúcido + contorno que se dibuja */}
      <g className="vx-fade" style={{ ["--d" as string]: "1.6s" }}>
        {MARK_PATHS.map((d) => (
          <path key={d} d={d} fill="url(#vx-fill)" />
        ))}
      </g>
      <g fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="1" strokeLinejoin="round">
        {MARK_PATHS.map((d, i) => (
          <path
            key={d}
            d={d}
            pathLength={1}
            vectorEffect="non-scaling-stroke"
            className="vx-draw vx-draw-slow"
            style={{ ["--d" as string]: `${0.5 + i * 0.15}s` }}
          />
        ))}
      </g>

      {/* Pulsos: los tres trazos llegan juntos al vértice */}
      <g fill="none" strokeLinecap="round">
        {ARM_LINES.map((d) =>
          PULSE_STACK.map((p) => (
            <path
              key={`${d}-${p.len}`}
              d={d}
              pathLength={1}
              stroke={p.color}
              strokeOpacity={p.opacity}
              strokeWidth={p.width}
              strokeDasharray={`${p.len} 3`}
              className="vx-pulse vx-pulse-arm"
              style={pulseOffsets(p.len)}
            />
          ))
        )}
      </g>

      {/* Vértice */}
      <g className="vx-fade" style={{ ["--d" as string]: "2.2s" }}>
        <circle cx={VERTEX.x} cy={VERTEX.y} r="110" fill="url(#vx-glow)" className="vx-flare" />
        <circle
          cx={VERTEX.x}
          cy={VERTEX.y}
          r="6"
          fill="none"
          stroke="#FF3B30"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          className="vx-ring"
        />
        <circle cx={VERTEX.x} cy={VERTEX.y} r="3.2" fill="#FF3B30" />
      </g>
    </svg>
  );
}

export function HeroVertex({ videoSrc }: { videoSrc?: string } = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoBgRef = useRef<HTMLDivElement>(null);
  const markScrollRef = useRef<HTMLDivElement>(null);
  const markTiltRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Parallax de scroll: el video sube lento, la marca se aleja y el texto se va
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const scrollTrigger = {
      trigger: section,
      start: "top top",
      end: "bottom top",
      scrub: true,
    };
    const ctx = gsap.context(() => {
      gsap.to(videoBgRef.current, { yPercent: -20, ease: "none", scrollTrigger });
      gsap.to(markScrollRef.current, { yPercent: 14, scale: 1.08, opacity: 0.3, ease: "none", scrollTrigger });
      gsap.to(contentRef.current, { y: -70, opacity: 0.15, ease: "none", scrollTrigger });
    }, section);
    return () => ctx.revert();
  }, []);

  // Inclinación de la marca y luz que sigue al cursor (solo con mouse)
  useEffect(() => {
    const section = sectionRef.current;
    const tilt = markTiltRef.current;
    if (!section || !tilt) return;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;

    const tick = () => {
      current.x += (target.x - current.x) * 0.06;
      current.y += (target.y - current.y) * 0.06;
      tilt.style.setProperty("--ry", `${current.x * 7}deg`);
      tilt.style.setProperty("--rx", `${current.y * -5}deg`);
      tilt.style.setProperty("--tx", `${current.x * 14}px`);
      tilt.style.setProperty("--ty", `${current.y * 10}px`);
      const settled =
        Math.abs(target.x - current.x) < 0.001 && Math.abs(target.y - current.y) < 0.001;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      target.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      target.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      section.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      section.style.setProperty("--my", `${e.clientY - rect.top}px`);
      section.classList.add("vx-lit");
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      section.classList.remove("vx-lit");
      if (!frame) frame = requestAnimationFrame(tick);
    };

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Las animaciones en bucle se pausan cuando el hero sale de pantalla
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      section.classList.toggle("vx-paused", !entry.isIntersecting);
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="vx-hero relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-brand-black"
    >
      {/* Fondo — video cuando existe, imagen fija como respaldo */}
      <div ref={videoBgRef} className="absolute inset-0 pointer-events-none" style={{ willChange: "transform" }}>
        {videoSrc ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/images/sections/hero-bg.png"
            className="absolute inset-0 w-full h-full object-cover opacity-[0.16]"
            style={{ objectPosition: "center 40%" }}
          >
            <source src={videoSrc} type="video/mp4" media="(min-width: 768px)" />
          </video>
        ) : (
          <Image
            src="/images/sections/hero-bg.png"
            alt=""
            fill
            className="object-cover opacity-[0.1]"
            style={{ objectPosition: "center 40%" }}
            sizes="100vw"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black/60" />
      </div>

      {/* Luz que sigue al cursor */}
      <div className="vx-spotlight" />

      {/* ── Marca convergente ── */}
      <div
        ref={markScrollRef}
        className="absolute pointer-events-none right-[-42%] top-[4%] w-[135vw] md:right-[-8%] md:top-[9%] md:w-[70vw] lg:right-[-4%] lg:w-[60vw] max-w-[920px]"
      >
        <div ref={markTiltRef} className="vx-tilt opacity-55 md:opacity-100">
          <VertexMark />
        </div>
      </div>

      <div className="noise-overlay" />

      {/* ── Contenido ── */}
      {/* pb amplio: reserva espacio para el marquee de logos (absolute bottom) */}
      <div ref={contentRef} className="relative z-10 container-wide w-full pt-24 pb-48 md:pb-52">
        <div className="max-w-5xl">

          <div className="flex items-center gap-4 mb-10">
            <div className="vx-rule h-px w-10 bg-brand-red flex-shrink-0" style={{ ["--d" as string]: "0.1s" }} />
            <p
              className="vx-kicker text-xs uppercase text-[#999] font-display"
              style={{ ["--d" as string]: "0.25s" }}
            >
              Arquitectura de Soluciones IA
            </p>
          </div>

          <h1 className="text-[2.8rem] md:text-[4.5rem] lg:text-[5.8rem] font-light leading-[1.0] mb-8">
            <span className="vx-mask">
              <span className="vx-line text-white" style={{ ["--d" as string]: "0.2s" }}>Tu operación</span>
            </span>
            <span className="vx-mask">
              <span className="vx-line text-white" style={{ ["--d" as string]: "0.32s" }}>pierde tiempo</span>
            </span>
            <span className="vx-mask">
              <span className="vx-line text-brand-red" style={{ ["--d" as string]: "0.44s" }}>y dinero.</span>
            </span>
          </h1>

          <p
            className="vx-blur-in text-base md:text-lg text-[#999] max-w-lg leading-relaxed mb-10 font-light"
            style={{ ["--d" as string]: "0.8s" }}
          >
            Diseñamos arquitectura de soluciones IA con impacto financiero medible.
          </p>

          <div
            className="vx-blur-in flex flex-wrap items-center gap-5"
            style={{ ["--d" as string]: "0.95s" }}
          >
            <MagneticButton
              href={COMPANY.calendar}
              className="px-10 py-4 bg-brand-red text-white hover:bg-red-600 text-sm inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              Agenda una conversación
            </MagneticButton>
            <MagneticButton
              href="/servicios?utm_source=homepage&utm_medium=cta&utm_content=hero-secondary"
              className="px-10 py-4 border border-[#333] text-[#999] hover:border-white hover:text-white text-sm"
            >
              Conoce nuestros servicios
            </MagneticButton>
          </div>

        </div>
      </div>

      {/* ── Logos de clientes — base del hero ── */}
      <div
        className="vx-blur-in absolute bottom-16 left-0 right-0 z-10"
        style={{ ["--d" as string]: "1.2s" }}
      >
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#999] mb-5 font-display text-center">
          Empresas que confían en nosotros
        </p>
        <div className="vx-marquee-mask overflow-hidden">
          <div className="flex animate-marquee hover:[animation-play-state:paused]">
            {MARQUEE_LOGOS.map((logo, i) => (
              <div
                key={`${logo.name}-${i}`}
                className="flex-shrink-0 mx-10 md:mx-14 flex items-center"
              >
                <Image
                  src={`/images/client-logos/${logo.file}`}
                  alt={logo.name}
                  width={140}
                  height={48}
                  className="h-8 md:h-10 w-auto object-contain opacity-30 hover:opacity-60 transition-opacity duration-500 grayscale"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-black to-transparent pointer-events-none" />
    </section>
  );
}
