"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";
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

      // Stroke-draw animation for the logo mark
      if (markRef.current) {
        const paths = markRef.current.querySelectorAll(".mark-path");

        // Initial state: hidden stroke, no fill
        paths.forEach((el) => {
          const geom = el as unknown as SVGGeometryElement;
          const len = geom.getTotalLength?.() || 800;
          gsap.set(el, {
            strokeDashoffset: len,
            strokeDasharray: len,
            fill: "transparent",
            stroke: "rgba(255,255,255,0.6)",
            strokeWidth: 2,
          });
        });
        gsap.set(markRef.current, { opacity: 1 });

        // Phase 1: Draw strokes one by one
        tl.to(
          paths,
          {
            strokeDashoffset: 0,
            duration: 2,
            ease: "power2.inOut",
            stagger: 0.3,
          },
          0
        );

        // Phase 2: Flash bright then settle — stroke fades, fill appears
        tl.to(
          paths,
          {
            stroke: "rgba(255,255,255,0.8)",
            strokeWidth: 3,
            duration: 0.3,
            ease: "power2.in",
          },
          2.2
        );
        tl.to(
          paths,
          {
            fill: "rgba(255,255,255,0.04)",
            stroke: "rgba(255,255,255,0)",
            strokeWidth: 0,
            duration: 1.5,
            ease: "power3.out",
          },
          2.5
        );

        // Phase 3: Continuous breathing glow
        tl.call(() => {
          gsap.to(paths, {
            fill: "rgba(255,255,255,0.05)",
            duration: 3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            stagger: 0.4,
          });
        }, [], 4.2);
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
      {/* Background photo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-bg-v3.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/75 to-brand-black/20" />
      </div>

      <svg
        ref={markRef}
        viewBox="0 0 600 600"
        className="absolute right-[-5%] lg:right-[2%] top-1/2 -translate-y-1/2 w-[38vh] h-[38vh] lg:w-[44vh] lg:h-[44vh] opacity-0 pointer-events-none"
        aria-hidden="true"
      >
        <path className="mark-path" d="M 68,90 L 108,90 L 301,468 L 299,468 Z" />
        <path className="mark-path" d="M 492,90 L 532,90 L 301,468 L 299,468 Z" />
        <path className="mark-path" d="M 328,100 L 340,100 C 330,250 312,380 301,468 L 299,468 C 308,380 320,250 328,100 Z" />
      </svg>

      <div className="noise-overlay" />

      <div className="container-wide relative z-20 pt-32 pb-20">
        <div className="max-w-5xl">
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
