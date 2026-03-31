"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { MagneticButton } from "@/components/ui/magnetic-button";

gsap.registerPlugin(ScrollTrigger);

const scenes = [
  {
    label: "El problema",
    headline: ["Tu operación", "pierde tiempo", "y dinero."],
    accentLine: -1,
    sub: null,
    ctas: false,
  },
  {
    label: "El contexto",
    headline: ["95% de los pilotos", "de IA no generan", "resultados."],
    accentLine: -1,
    sub: "El problema no es la tecnología — es la integración.",
    ctas: false,
  },
  {
    label: "La solución",
    headline: ["Nosotros lo", "resolvemos", "con IA."],
    accentLine: 2,
    sub: "Diseñamos arquitectura de soluciones IA con impacto financiero medible.",
    ctas: true,
  },
];

export function HeroScrollPin() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const s0 = useRef<HTMLDivElement>(null);
  const s1 = useRef<HTMLDivElement>(null);
  const s2 = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = wrapperRef.current;
      if (!wrapper || !s0.current || !s1.current || !s2.current) return;

      // Each scene segment = 100vh of the 300vh wrapper
      // Scene 0 stays: first 100vh of scroll
      // Scene 0 → 1: 100vh–200vh of scroll
      // Scene 1 → 2: 200vh–300vh of scroll
      const vh = window.innerHeight;

      // Scene 0 → 1: scroll 100vh–200vh into the wrapper
      ScrollTrigger.create({
        trigger: wrapper,
        start: `top+=${vh * 0.1}px top`,
        end: `top+=${vh * 0.9}px top`,
        scrub: 0.6,
        onUpdate(self) {
          const p = self.progress;
          if (p < 0.4) {
            gsap.set(s0.current, { opacity: 1 - p / 0.4, y: (p / 0.4) * -40 });
            gsap.set(s1.current, { opacity: 0, y: 50 });
          } else {
            gsap.set(s0.current, { opacity: 0 });
            gsap.set(s1.current, { opacity: (p - 0.4) / 0.6, y: 50 - ((p - 0.4) / 0.6) * 50 });
          }
        },
      });

      // Scene 1 → 2: scroll 100vh–200vh into the wrapper
      ScrollTrigger.create({
        trigger: wrapper,
        start: `top+=${vh * 1.1}px top`,
        end: `top+=${vh * 1.9}px top`,
        scrub: 0.6,
        onUpdate(self) {
          const p = self.progress;
          if (p < 0.4) {
            gsap.set(s1.current, { opacity: 1 - p / 0.4, y: (p / 0.4) * -40 });
            gsap.set(s2.current, { opacity: 0, y: 50 });
          } else {
            gsap.set(s1.current, { opacity: 0 });
            gsap.set(s2.current, { opacity: (p - 0.4) / 0.6, y: 50 - ((p - 0.4) / 0.6) * 50 });
          }
        },
      });

      // Image reveal
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 90%",
              end: "top 15%",
              scrub: 1.2,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ─── SCROLL SECTION: 300vh tall ─── */}
      {/* CSS sticky handles the pin — no GSAP pin needed */}
      <div ref={wrapperRef} style={{ height: "300vh" }} className="relative">
        <div className="sticky top-0 h-screen bg-brand-black overflow-hidden flex items-center">
          <div className="noise-overlay" />

          {/* Onza mark — static */}
          <svg
            viewBox="0 0 600 600"
            className="absolute right-0 top-1/2 -translate-y-1/2 w-[38vh] h-[38vh] pointer-events-none select-none"
            aria-hidden="true"
          >
            <path d="M 68,90 L 108,90 L 301,468 L 299,468 Z"
              fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <path d="M 492,90 L 532,90 L 301,468 L 299,468 Z"
              fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <path d="M 328,100 L 340,100 C 330,250 312,380 301,468 L 299,468 C 308,380 320,250 328,100 Z"
              fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          </svg>

          {/* Scenes */}
          <div className="container-wide relative z-10 w-full pt-24">
            <div className="relative">

              {/* Invisible spacer so container has height */}
              <div className="invisible pointer-events-none" aria-hidden="true">
                <SceneContent scene={scenes[2]} />
              </div>

              {/* Scene 0 */}
              <div ref={s0} className="absolute inset-0" style={{ willChange: "opacity, transform" }}>
                <SceneContent scene={scenes[0]} />
              </div>

              {/* Scene 1 — starts hidden */}
              <div ref={s1} className="absolute inset-0" style={{ opacity: 0, willChange: "opacity, transform" }}>
                <SceneContent scene={scenes[1]} />
              </div>

              {/* Scene 2 — starts hidden */}
              <div ref={s2} className="absolute inset-0" style={{ opacity: 0, willChange: "opacity, transform" }}>
                <SceneContent scene={scenes[2]} />
              </div>
            </div>
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-25 select-none">
            <span className="text-[9px] tracking-[0.35em] uppercase text-white font-display">Scroll</span>
            <div className="w-px h-6 overflow-hidden relative bg-white/20">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-white"
                style={{ animation: "scrollPulse 1.6s ease-in-out infinite" }} />
            </div>
          </div>
        </div>
      </div>

      {/* ─── IMAGE REVEAL ─── */}
      <div
        ref={imageRef}
        className="relative h-[60vh] overflow-hidden"
        style={{ clipPath: "inset(100% 0% 0% 0%)" }}
      >
        <Image
          src="/images/hero/hero-scrollpin-a.jpg"
          alt=""
          fill
          className="object-cover object-center scale-110"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/60 via-transparent to-brand-black/90" />
        <div className="absolute inset-0 flex items-end justify-center pb-14 z-10">
          <div className="flex items-center gap-5">
            <div className="h-px w-12 bg-brand-red" />
            <p className="text-[10px] tracking-[0.4em] uppercase text-white/40 font-display">
              Arquitectura de Soluciones IA
            </p>
            <div className="h-px w-12 bg-brand-red" />
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scrollPulse {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
      `}</style>
    </>
  );
}

function SceneContent({ scene }: { scene: (typeof scenes)[number] }) {
  return (
    <div className="max-w-5xl">
      <div className="flex items-center gap-4 mb-10">
        <div className="h-px w-10 bg-brand-red flex-shrink-0" />
        <p className="text-xs tracking-[0.3em] uppercase text-brand-gray font-display">
          {scene.label}
        </p>
      </div>

      <h1 className="text-[2.8rem] md:text-[4.5rem] lg:text-[5.8rem] font-light leading-[1.0] mb-8">
        {scene.headline.map((line, i) => (
          <span key={i} className={`block ${scene.accentLine === i ? "text-brand-red" : "text-white"}`}>
            {line}
          </span>
        ))}
      </h1>

      {scene.sub && (
        <p className="text-base md:text-lg text-[#555] max-w-lg leading-relaxed mb-10 font-light">
          {scene.sub}
        </p>
      )}

      {scene.ctas && (
        <div className="flex flex-wrap gap-5">
          <MagneticButton href="/contacto" className="px-10 py-4 bg-brand-red text-white hover:bg-red-600 text-sm">
            Agenda una conversación
          </MagneticButton>
          <MagneticButton href="/servicios" className="px-10 py-4 border border-[#333] text-[#999] hover:border-white hover:text-white text-sm">
            Conoce nuestros servicios
          </MagneticButton>
        </div>
      )}
    </div>
  );
}
