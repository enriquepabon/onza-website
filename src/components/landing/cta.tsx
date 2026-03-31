"use client";

import Image from "next/image";
import { TextReveal } from "@/components/ui/text-reveal";
import { Reveal } from "@/components/ui/reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { COMPANY } from "@/lib/constants";

export function CTA() {
  return (
    <section className="relative bg-brand-black py-24 md:py-32 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image src="/images/sections/abstract-d.jpg" alt="" fill className="object-cover object-right opacity-25" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/90 via-brand-black/70 to-brand-black/50" />
      </div>
      <div className="noise-overlay" />

      <svg
        viewBox="0 0 600 600"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vh] h-[40vh] text-white opacity-[0.03] pointer-events-none"
        aria-hidden="true"
      >
        <g fill="currentColor">
          <polygon points="68,90 108,90 301,468 299,468" />
          <polygon points="492,90 532,90 301,468 299,468" />
          <path d="M 328,100 L 340,100 C 330,250 312,380 301,468 L 299,468 C 308,380 320,250 328,100 Z" />
        </g>
      </svg>

      <div className="container-narrow relative z-10 text-center">
        <TextReveal as="h2" className="text-section-mobile md:text-section font-light text-white mb-8">
          Una conversación. Sin compromiso.
        </TextReveal>

        <Reveal delay={0.3}>
          <p className="text-lg text-[#8899AA] max-w-xl mx-auto mb-12 leading-relaxed font-light">
            En 30 minutos podemos darte claridad sobre dónde la IA genera más impacto en tu operación y qué costaría resolverlo.
          </p>
        </Reveal>

        <Reveal delay={0.5}>
          <div className="flex flex-wrap gap-5 justify-center">
            <MagneticButton
              href={COMPANY.calendar}
              className="px-12 py-5 bg-brand-red text-white hover:bg-red-600 text-sm"
              strength={0.4}
            >
              Agenda una conversación
            </MagneticButton>
            <MagneticButton
              href="/recursos/diagnostico-ia?utm_source=homepage&utm_medium=cta&utm_content=cta-diagnostico"
              className="px-10 py-5 border border-[#333] text-[#999] hover:border-white hover:text-white text-sm"
              strength={0.3}
            >
              Haz el diagnóstico gratis
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
