"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COMPANY, NAV_LINKS } from "@/lib/constants";
import { MagneticButton } from "@/components/ui/magnetic-button";

gsap.registerPlugin(ScrollTrigger);

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-brand-black/80 backdrop-blur-xl border-b border-[#1A1A1A]"
          : "bg-transparent"
      }`}
    >
      <div className="container-wide flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-3 group">
          <svg viewBox="0 0 600 600" className="h-7 w-7 text-white" aria-hidden="true">
            <g fill="currentColor">
              <polygon points="68,90 108,90 301,468 299,468" />
              <polygon points="492,90 532,90 301,468 299,468" />
              <path d="M 328,100 L 340,100 C 330,250 312,380 301,468 L 299,468 C 308,380 320,250 328,100 Z" />
            </g>
          </svg>
          <span className="font-display font-light text-base tracking-logo text-white">
            {COMPANY.name.toUpperCase()}
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs tracking-[0.15em] uppercase text-[#777] hover:text-white transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
          <MagneticButton
            href="/contacto"
            className="px-5 py-2.5 text-xs bg-brand-red text-white hover:bg-red-600"
            strength={0.2}
          >
            Hablemos
          </MagneticButton>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menú"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-px bg-white transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
            <span className={`block h-px bg-white transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px bg-white transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-brand-black/95 backdrop-blur-xl border-t border-[#1A1A1A] py-8">
          <div className="container-wide flex flex-col gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg text-[#777] hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <MagneticButton
              href="/contacto"
              className="mt-2 w-fit px-6 py-3 bg-brand-red text-white text-sm"
            >
              Hablemos
            </MagneticButton>
          </div>
        </div>
      )}
    </nav>
  );
}
