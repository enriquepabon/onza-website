"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function VideoBreak({
  src,
  poster,
  height = "50vh",
  mobileHeight,
}: {
  src: string;
  poster?: string;
  height?: string;
  mobileHeight?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    const overlay = overlayRef.current;
    if (!container || !video || !overlay) return;

    const ctx = gsap.context(() => {
      // Phase 1: clip-path wipe open + container scale as it enters
      gsap.fromTo(
        container,
        { clipPath: "inset(8% 0% 8% 0%)", scale: 1.04 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top 88%",
            end: "top 15%",
            scrub: 1,
          },
        }
      );

      // Phase 2: parallax — video content travels at -30% inside fixed container
      gsap.fromTo(
        video,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Phase 3: brand color overlay breathes in when centered, out when leaving
      gsap.fromTo(
        overlay,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top 60%",
            end: "center center",
            scrub: 1,
          },
        }
      );
      gsap.fromTo(
        overlay,
        { opacity: 1 },
        {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "center center",
            end: "bottom 40%",
            scrub: 1,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{
        ["--pb-height" as string]: height,
        ["--pb-mobile-height" as string]: mobileHeight || height,
      }}
    >
      <style jsx>{`
        div {
          height: var(--pb-mobile-height);
        }
        @media (min-width: 768px) {
          div {
            height: var(--pb-height);
          }
        }
      `}</style>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ willChange: "transform" }}
      >
        <source src={src} type="video/mp4" media="(min-width: 768px)" />
      </video>

      {/* Gradient edges — always present */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/10 pointer-events-none" />

      {/* Brand color pulse — fades in/out as section centers in viewport */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 60% 50%, rgba(255,59,48,0.08) 0%, transparent 70%)",
          opacity: 0,
        }}
      />
    </div>
  );
}
