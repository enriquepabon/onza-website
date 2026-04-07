"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function PhotoBreak({
  src,
  height = "50vh",
  mobileHeight,
  position = "center",
}: {
  src: string;
  height?: string;
  mobileHeight?: string;
  position?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { clipPath: "inset(8% 0% 8% 0%)", scale: 1.06 },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "top 20%",
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{
        // Use CSS custom properties for responsive height
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
      <Image
        src={src}
        alt=""
        fill
        className="object-cover"
        style={{ objectPosition: position }}
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/10" />
    </div>
  );
}
