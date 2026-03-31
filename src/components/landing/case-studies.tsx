"use client";

import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { LineReveal } from "@/components/ui/line-reveal";

const CASES = [
  {
    client: "Grupo México",
    sector: "Manufactura",
    country: "México",
    service: "Formación IA",
    duration: "8 semanas",
    result: "500+ personas formadas en IA y Copilot",
    detail:
      "Programa nacional de adopción de IA para equipos operativos y directivos. Desde planta hasta sala de juntas.",
    metric: "500+",
    metricLabel: "personas formadas",
  },
  {
    client: "Oleoflores",
    sector: "Agroindustria",
    country: "Colombia",
    service: "Automatización + Aplicativos",
    duration: "6 meses",
    result: "8 aplicativos en producción, 100+ colaboradores certificados",
    detail:
      "Suite de apps para supply chain y trazabilidad. Programa de certificación para personal operativo en herramientas IA.",
    metric: "8",
    metricLabel: "aplicativos desplegados",
  },
  {
    client: "LaTroupe",
    sector: "Hospitalidad",
    country: "Europa",
    service: "IA Operacional",
    duration: "4 sesiones",
    result: "7 hoteles, 1 estándar operativo",
    detail:
      "Playbook unificado para 7 sedes en 3 países. Agente IA que cualquier colaborador consulta en tiempo real.",
    metric: "7",
    metricLabel: "hoteles estandarizados",
  },
  {
    client: "Language for Living",
    sector: "Educación",
    country: "Colombia",
    service: "Solución IA a Medida",
    duration: "6 semanas",
    result: "Plataforma web completa con IA integrada",
    detail:
      "Test de nivel adaptativo, registro de estudiantes y automatización de procesos internos. Funcionando desde el día 1.",
    metric: "6",
    metricLabel: "semanas a producción",
  },
];

export function CaseStudies() {
  return (
    <section className="bg-brand-black py-24 md:py-32 lg:py-40 relative overflow-hidden">
      <div className="noise-overlay" />
      <div className="container-wide relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-brand-red" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-brand-red font-display">
                  Proyectos
                </span>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <TextReveal
              as="h2"
              className="text-section-mobile md:text-section font-light text-white"
            >
              Soluciones que ya están operando
            </TextReveal>
          </div>
        </div>

        <div className="space-y-0">
          {CASES.map((c, i) => (
            <Reveal key={c.client} delay={i * 0.08}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-10 md:py-14 items-center">

                {/* Client + sector */}
                <div className="md:col-span-3">
                  <p className="text-xs text-brand-red tracking-[0.25em] uppercase font-display mb-2">
                    {c.sector} · {c.country}
                  </p>
                  <h3 className="text-2xl font-light text-white">{c.client}</h3>
                  <p className="text-xs text-[#555] mt-1">{c.service} · {c.duration}</p>
                </div>

                {/* Detail */}
                <div className="md:col-span-5">
                  <p className="text-sm text-[#777] leading-relaxed">{c.detail}</p>
                </div>

                {/* Metric */}
                <div className="md:col-span-4 md:text-right">
                  <p className="text-4xl md:text-5xl font-light text-brand-gold tabular-nums">
                    {c.metric}
                  </p>
                  <p className="text-xs text-[#555] tracking-[0.15em] uppercase mt-1">
                    {c.metricLabel}
                  </p>
                </div>
              </div>
              <LineReveal color="bg-[#1F1F1F]" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
