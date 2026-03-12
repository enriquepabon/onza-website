"use client";

import { useState } from "react";
import Link from "next/link";
import { COMPANY, NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="container-wide flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <svg viewBox="0 0 600 600" className="h-8 w-8" aria-hidden="true">
            <g fill="currentColor">
              <polygon points="68,90 108,90 301,468 299,468" />
              <polygon points="492,90 532,90 301,468 299,468" />
              <path d="M 328,100 L 340,100 C 330,250 312,380 301,468 L 299,468 C 308,380 320,250 328,100 Z" />
            </g>
          </svg>
          <span className="font-display font-light text-lg tracking-logo">
            {COMPANY.name.toUpperCase()}
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide text-brand-gray hover:text-brand-dark transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Button href="/contacto" size="sm">
            Hablemos
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menú"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span
              className={`block h-px bg-brand-dark transition-transform ${isOpen ? "rotate-45 translate-y-[3.5px]" : ""}`}
            />
            <span
              className={`block h-px bg-brand-dark transition-opacity ${isOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px bg-brand-dark transition-transform ${isOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-6">
          <div className="container-wide flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg text-brand-gray hover:text-brand-dark"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button href="/contacto" className="mt-2 w-fit">
              Hablemos
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
