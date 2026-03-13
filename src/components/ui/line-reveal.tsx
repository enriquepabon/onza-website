"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type LineRevealProps = {
  className?: string;
  color?: string;
  direction?: "left" | "center";
};

export function LineReveal({
  className = "",
  color = "bg-brand-red",
  direction = "left",
}: LineRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const anim = gsap.fromTo(
      el,
      {
        scaleX: 0,
        transformOrigin: direction === "left" ? "left center" : "center center",
      },
      {
        scaleX: 1,
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      anim.kill();
    };
  }, [direction]);

  return <div ref={ref} className={`h-px ${color} ${className}`} />;
}
