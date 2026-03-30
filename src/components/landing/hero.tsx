"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Phase 1: Stroke-draw animation for the logo mark
      if (markRef.current) {
        const paths = markRef.current.querySelectorAll(".mark-path");
        // Set initial state: stroked, not filled
        paths.forEach((el) => {
          const geom = el as unknown as SVGGeometryElement;
          const len = geom.getTotalLength?.() || 800;
          gsap.set(el, {
            strokeDashoffset: len,
            strokeDasharray: len,
            fill: "transparent",
            stroke: "rgba(255,255,255,0.15)",
            strokeWidth: 1.5,
          });
        });
        gsap.set(markRef.current, { opacity: 1 });

        // Draw the strokes
        tl.to(
          paths,
          {
            strokeDashoffset: 0,
            duration: 1.8,
            ease: "power2.inOut",
            stagger: 0.2,
          },
          0
        );

        // Fade stroke to fill
        tl.to(
          paths,
          {
            fill: "rgba(255,255,255,0.08)",
            stroke: "rgba(255,255,255,0.03)",
            duration: 1.2,
            ease: "power2.out",
          },
          1.4
        );

        // Continuous breathing glow
        tl.call(() => {
          gsap.to(paths, {
            fill: "rgba(255,255,255,0.12)",
            duration: 3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            stagger: 0.3,
          });
        }, [], 3);
      }

      tl.fromTo(
        labelRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
        0.2
      );

      tl.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 1, ease: "power3.inOut" },
        0.4
      );

      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll(".word");
        tl.fromTo(
          words,
          { y: "110%", rotateX: -40 },
          {
            y: "0%",
            rotateX: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.04,
          },
          0.5
        );
      }

      tl.fromTo(
        subtextRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        1.2
      );

      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        1.5
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const headlineText = "Tu operación pierde tiempo y dinero cada día.";
  const accentText = "Nosotros lo resolvemos con IA.";
  const allWords = [...headlineText.split(" "), ...accentText.split(" ")];
  const accentStartIndex = headlineText.split(" ").length;

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center bg-brand-black overflow-hidden"
    >
      <svg
        ref={markRef}
        viewBox="0 0 600 600"
        className="absolute right-[2%] md:right-[5%] lg:right-[8%] top-1/2 -translate-y-1/2 w-[50vh] h-[50vh] lg:w-[60vh] lg:h-[60vh] opacity-0 pointer-events-none"
        aria-hidden="true"
      >
        <polygon className="mark-path" points="68,90 108,90 301,468 299,468" />
        <polygon className="mark-path" points="492,90 532,90 301,468 299,468" />
        <path className="mark-path" d="M 328,100 L 340,100 C 330,250 312,380 301,468 L 299,468 C 308,380 320,250 328,100 Z" />
      </svg>

      <div className="noise-overlay" />

      <div className="container-wide relative z-20 pt-32 pb-20">
        <div className="max-w-5xl mx-auto lg:mx-0 lg:ml-[5%] xl:ml-[8%]">
          <div className="flex items-center gap-4 mb-10">
            <div ref={lineRef} className="h-px w-12 bg-brand-red" />
            <p
              ref={labelRef}
              className="text-xs tracking-[0.3em] uppercase text-brand-gray font-display"
            >
              Arquitectura de Soluciones IA
            </p>
          </div>

          <h1
            ref={headlineRef}
            className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] xl:text-[5.5rem] font-light leading-[1.05] mb-10"
            style={{ perspective: "1000px" }}
          >
            {allWords.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
                <span
                  className={`word inline-block ${
                    i >= accentStartIndex ? "text-brand-red" : "text-white"
                  }`}
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <p
            ref={subtextRef}
            className="text-lg md:text-xl text-[#969696] max-w-xl leading-relaxed mb-12 font-light"
          >
            Diseñamos soluciones de inteligencia artificial que transforman
            operaciones — reduciendo costos, eliminando errores y acelerando
            procesos con impacto financiero medible.
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-5">
            <MagneticButton
              href="/contacto"
              className="px-10 py-4 bg-brand-red text-white hover:bg-red-600 text-sm"
            >
              Agenda una conversación
            </MagneticButton>
            <MagneticButton
              href="/servicios"
              className="px-10 py-4 border border-[#333] text-[#999] hover:border-white hover:text-white text-sm"
            >
              Conoce nuestros servicios
            </MagneticButton>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-black to-transparent z-10" />
    </section>
  );
}
