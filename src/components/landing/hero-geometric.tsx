"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { COMPANY } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

// The 3 paths that form the Onza V-mark
const MARK_PATHS = [
  "M 68,90 L 108,90 L 301,468 L 299,468 Z",
  "M 492,90 L 532,90 L 301,468 L 299,468 Z",
  "M 328,100 L 340,100 C 330,250 312,380 301,468 L 299,468 C 308,380 320,250 328,100 Z",
];

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

function FloatingMark({
  className,
  size = 200,
  initialRotate = 0,
  entryFrom = "top",
  delay = 0,
  floatY = 18,
  floatDuration = 10,
  rotateDrift = 4,
  opacity = 0.06,
  color = "white",
  paths = MARK_PATHS,
}: {
  className?: string;
  size?: number;
  initialRotate?: number;
  entryFrom?: "top" | "bottom" | "left" | "right";
  delay?: number;
  floatY?: number;
  floatDuration?: number;
  rotateDrift?: number;
  opacity?: number;
  color?: string;
  paths?: string[];
}) {
  const entryOffset = {
    top:    { y: -120, x: 0 },
    bottom: { y: 120, x: 0 },
    left:   { y: 0, x: -120 },
    right:  { y: 0, x: 120 },
  }[entryFrom];

  return (
    <div
      className={`absolute pointer-events-none select-none mark-entry ${className ?? ""}`}
      style={{
        ["--mark-x" as string]: `${entryOffset.x}px`,
        ["--mark-y" as string]: `${entryOffset.y}px`,
        ["--mark-rotate" as string]: `${initialRotate}deg`,
        ["--mark-delay" as string]: `${delay}s`,
      }}
    >
      {/* Loop: float + gentle rotate drift */}
      <div
        className="mark-float"
        style={{
          ["--float-y" as string]: `${floatY}px`,
          ["--float-duration" as string]: `${floatDuration}s`,
          ["--rotate-drift" as string]: `${rotateDrift}deg`,
        }}
      >
        <svg
          viewBox="0 0 600 600"
          width={size}
          height={size}
          aria-hidden="true"
          style={{ opacity }}
        >
          {paths.map((d, i) => (
            <path key={i} d={d} fill={color} />
          ))}
        </svg>
      </div>
    </div>
  );
}

export function HeroGeometric({ videoSrc }: { videoSrc?: string } = {}) {
  const videoBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = videoBgRef.current;
    if (!el) return;
    // Parallax: video moves at 40% of scroll speed (upward)
    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: el.closest("section"),
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-brand-black">

      {/* Background — video when available, static image fallback */}
      <div ref={videoBgRef} className="absolute inset-0 pointer-events-none" style={{ willChange: "transform" }}>
        {videoSrc ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/images/sections/hero-bg.png"
            className="absolute inset-0 w-full h-full object-cover opacity-[0.22]"
            style={{ objectPosition: "center 40%" }}
          >
            <source src={videoSrc} type="video/mp4" media="(min-width: 768px)" />
          </video>
        ) : (
          <Image
            src="/images/sections/hero-bg.png"
            alt=""
            fill
            className="object-cover opacity-[0.12]"
            style={{ objectPosition: "center 40%" }}
            sizes="100vw"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black/60" />
      </div>

      {/* Red glow anchored behind large right mark */}
      <div className="absolute top-[10%] right-[-5%] w-[520px] h-[520px] bg-brand-red/[0.07] blur-[100px] rounded-full pointer-events-none" />

      {/* ── Floating Onza marks ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        {/* Large ghost mark — right, shifted down */}
        <FloatingMark
          size={500}
          initialRotate={18}
          entryFrom="top"
          delay={0.2}
          floatY={38}
          floatDuration={14}
          rotateDrift={9}
          opacity={0.08}
          className="right-[2%] top-[15%]"
        />

        {/* Centered mark — lower half */}
        <FloatingMark
          size={280}
          initialRotate={-6}
          entryFrom="bottom"
          delay={0.6}
          floatY={30}
          floatDuration={15}
          rotateDrift={6}
          opacity={0.04}
          className="left-[calc(50%-140px)] bottom-[-5%]"
        />

        {/* Medium mark — bottom left, counter-tilted */}
        <FloatingMark
          size={240}
          initialRotate={-22}
          entryFrom="bottom"
          delay={0.5}
          floatY={28}
          floatDuration={11}
          rotateDrift={10}
          opacity={0.04}
          className="left-[-4%] bottom-[5%]"
        />

        {/* Small mark — top left area */}
        <FloatingMark
          size={140}
          initialRotate={35}
          entryFrom="left"
          delay={0.7}
          floatY={22}
          floatDuration={9}
          rotateDrift={14}
          opacity={0.05}
          className="left-[12%] top-[8%]"
        />

        {/* Tiny mark — right mid, red tint */}
        <FloatingMark
          size={100}
          initialRotate={-40}
          entryFrom="right"
          delay={0.9}
          floatY={18}
          floatDuration={8}
          rotateDrift={16}
          opacity={0.08}
          color="#FF3B30"
          className="right-[22%] top-[20%]"
        />

        {/* Medium mark — lower right, red tint */}
        <FloatingMark
          size={180}
          initialRotate={-15}
          entryFrom="right"
          delay={0.4}
          floatY={32}
          floatDuration={13}
          rotateDrift={8}
          opacity={0.04}
          color="#FF3B30"
          className="right-[-2%] bottom-[18%]"
        />

        {/* Single left-arm path only — bottom center, very faint */}
        <FloatingMark
          size={200}
          initialRotate={170}
          entryFrom="bottom"
          delay={1.1}
          floatY={24}
          floatDuration={16}
          rotateDrift={6}
          opacity={0.035}
          paths={[MARK_PATHS[0]]}
          className="left-[40%] bottom-[-6%]"
        />
      </div>

      <div className="noise-overlay" />

      {/* ── Content ── */}
      {/* pb amplio: reserva espacio para el marquee de logos (absolute bottom) */}
      <div className="relative z-10 container-wide w-full pt-24 pb-48 md:pb-52">
        <div className="max-w-5xl">

          <div
            className="hero-fade flex items-center gap-4 mb-10"
            style={{ ["--hero-delay" as string]: "0.5s" }}
          >
            <div className="h-px w-10 bg-brand-red flex-shrink-0" />
            <p className="text-xs tracking-[0.3em] uppercase text-[#999] font-display">
              Arquitectura de Soluciones IA
            </p>
          </div>

          <h1
            className="hero-fade text-[2.8rem] md:text-[4.5rem] lg:text-[5.8rem] font-light leading-[1.0] mb-8"
            style={{ ["--hero-delay" as string]: "0.7s" }}
          >
            <span className="block text-white">Tu operación</span>
            <span className="block text-white">pierde tiempo</span>
            <span className="block text-brand-red">y dinero.</span>
          </h1>

          <p
            className="hero-fade text-base md:text-lg text-[#999] max-w-lg leading-relaxed mb-10 font-light"
            style={{ ["--hero-delay" as string]: "0.9s" }}
          >
            Diseñamos arquitectura de soluciones IA con impacto financiero medible.
          </p>

          <div
            className="hero-fade flex flex-wrap items-center gap-5"
            style={{ ["--hero-delay" as string]: "1.1s" }}
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

      {/* ── Client logos marquee — bottom of hero ── */}
      <div
        className="hero-fade absolute bottom-16 left-0 right-0 z-10"
        style={{ ["--hero-delay" as string]: "1.3s" }}
      >
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#999] mb-5 font-display text-center">
          Empresas que confían en nosotros
        </p>
        <div className="overflow-hidden">
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

      {/* Scroll hint — hidden, logos take this space */}

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-black to-transparent pointer-events-none" />

      <style jsx global>{`
        @keyframes scrollPulse {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
      `}</style>
    </section>
  );
}
