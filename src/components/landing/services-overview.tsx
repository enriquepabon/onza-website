"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { LineReveal } from "@/components/ui/line-reveal";

const SERVICES = [
  {
    number: "01",
    title: "Formaciones IA Empresariales",
    description:
      "Tu equipo domina IA en semanas, no meses. Sesiones prácticas adaptadas a tu industria.",
    impact: "Equipos 3x más productivos con herramientas IA",
    href: "/servicios#formaciones",
  },
  {
    number: "02",
    title: "Automatización de Procesos",
    description:
      "Identificamos los procesos que más tiempo y dinero consumen. Flujos automatizados que se integran con tus sistemas.",
    impact: "Hasta 80% de reducción en tiempo de procesos",
    href: "/servicios#automatizacion",
  },
  {
    number: "03",
    title: "Soluciones IA a Medida",
    description:
      "Webs inteligentes, agentes de IA, plataformas de aprendizaje. Sistemas que tu equipo usa desde el día 1.",
    impact: "Funcionando en 3-8 semanas",
    href: "/servicios#soluciones",
  },
  {
    number: "04",
    title: "Diagnóstico Estratégico IA",
    description:
      "Descubre exactamente dónde la IA genera más impacto en tu operación. Roadmap priorizado.",
    impact: "Claridad antes de invertir",
    href: "/servicios#diagnostico",
  },
];

export function ServicesOverview() {
  return (
    <section className="bg-white py-24 md:py-32 lg:py-40">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-brand-red" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-brand-red font-display">
                  Servicios
                </span>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <TextReveal
              as="h2"
              className="text-section-mobile md:text-section font-light text-brand-dark"
            >
              Cuatro formas de transformar tu operación con inteligencia artificial
            </TextReveal>
          </div>
        </div>

        <div className="space-y-0">
          {SERVICES.map((service, i) => (
            <Reveal key={service.number} delay={i * 0.1}>
              <Link href={service.href} className="group block">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-10 md:py-14 items-start">
                  <div className="md:col-span-1">
                    <span className="text-xs text-brand-red tracking-widest font-display">
                      {service.number}
                    </span>
                  </div>
                  <div className="md:col-span-4">
                    <h3 className="text-2xl md:text-3xl font-light group-hover:text-brand-red transition-colors duration-500">
                      {service.title}
                    </h3>
                  </div>
                  <div className="md:col-span-4">
                    <p className="text-brand-gray leading-relaxed text-sm">
                      {service.description}
                    </p>
                  </div>
                  <div className="md:col-span-3 md:text-right">
                    <p className="text-xs text-brand-gold tracking-wide uppercase">
                      {service.impact}
                    </p>
                    <span className="inline-block mt-3 text-xs text-brand-gray group-hover:text-brand-red group-hover:translate-x-2 transition-all duration-500">
                      →
                    </span>
                  </div>
                </div>
                <LineReveal color="bg-gray-200" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
