"use client";

import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";

const DIFFERENTIATORS = [
  {
    number: "01",
    title: "Negocio primero, tecnología después",
    description:
      "Ingeniero Industrial, MBA, 15 años en operaciones reales. Sabemos lo que cuesta un proceso mal diseñado antes de hablar de IA.",
  },
  {
    number: "02",
    title: "Hablamos el idioma del negocio",
    description:
      "Cuántas horas pierdes en esto. Cuánto te cuesta este error. En cuánto tiempo ves retorno. El CFO entiende, el COO entiende.",
  },
  {
    number: "03",
    title: "Semanas, no meses",
    description:
      "Sin capas de gestión ni procesos de aprobación interminables. Entramos, entendemos, construimos. La mayoría de proyectos están en producción antes de los 60 días.",
  },
  {
    number: "04",
    title: "Experiencia en sectores complejos",
    description:
      "Manufactura, supply chain, farmacéutica. En planta, negociando convenciones, abriendo mercados desde cero.",
  },
  {
    number: "05",
    title: "Sistemas que funcionan, no decks",
    description:
      "Cada proyecto termina con algo que tu equipo puede usar desde el día 1. No con un PDF de recomendaciones.",
  },
  {
    number: "06",
    title: "Discreción absoluta",
    description:
      "Tus procesos y ventajas competitivas son tuyos. Trabajamos con NDAs y manejamos la información de cada cliente con el mismo cuidado que esperarías de un socio de largo plazo.",
  },
];

export function Differentiators() {
  return (
    <section className="bg-brand-cream py-24 md:py-32 lg:py-40 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 40px, #1A1A1A 40px, #1A1A1A 41px)`,
        }}
      />

      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-5 lg:col-start-2">
            <Reveal>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-brand-red" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-brand-red font-display">
                  Por qué Onza
                </span>
              </div>
            </Reveal>
            <TextReveal
              as="h2"
              className="text-section-mobile md:text-section font-light text-brand-dark"
            >
              No somos una agencia. Hemos estado en tu lugar.
            </TextReveal>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {DIFFERENTIATORS.map((item, i) => (
            <Reveal
              key={item.number}
              delay={i * 0.08}
              className=""
            >
              <div className="group bg-white p-8 md:p-10 hover:bg-brand-dark transition-colors duration-700 cursor-default">
                <span className="text-brand-red text-xs tracking-[0.3em] font-display">
                  {item.number}
                </span>
                <h3 className="text-xl font-light mt-4 mb-3 text-brand-dark group-hover:text-white transition-colors duration-700">
                  {item.title}
                </h3>
                <p className="text-sm text-brand-gray leading-relaxed group-hover:text-[#969696] transition-colors duration-700">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
