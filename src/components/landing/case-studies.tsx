"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    expanded:
      "Diseñamos un programa escalonado de formación en inteligencia artificial para una de las empresas más grandes de México. El programa abarcó desde operarios de planta hasta directivos C-level, con módulos adaptados a cada nivel. Incluimos talleres prácticos con Microsoft Copilot y herramientas de IA generativa aplicadas a sus procesos reales de manufactura.",
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
    expanded:
      "Desarrollamos 8 aplicativos que digitalizaron procesos críticos de la cadena de suministro: desde trazabilidad de materia prima hasta reportes automatizados de producción. Paralelamente, certificamos a más de 100 colaboradores en el uso de herramientas de IA, creando autonomía tecnológica dentro de la organización.",
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
    expanded:
      "Creamos un playbook operativo unificado para una cadena de 7 hoteles boutique distribuidos en 3 países europeos. Implementamos un agente de IA que permite a cualquier colaborador — desde recepción hasta housekeeping — consultar procedimientos, políticas y mejores prácticas en tiempo real, en su idioma.",
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
    expanded:
      "Diseñamos y desplegamos una plataforma web completa que integra un test de nivel adaptativo impulsado por IA, sistema de registro de estudiantes, y automatización de procesos administrativos internos. La plataforma estuvo operativa desde el día 1, eliminando procesos manuales que antes tomaban horas.",
    metric: "6",
    metricLabel: "semanas a producción",
  },
];

function CaseCard({ c, index }: { c: typeof CASES[number]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Reveal delay={index * 0.08}>
      <div
        className="cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setIsOpen(!isOpen)}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-10 md:py-14 items-center">

          {/* Client + sector */}
          <div className="md:col-span-3">
            <p className="text-xs text-brand-red tracking-[0.25em] uppercase font-display mb-2">
              {c.sector} · {c.country}
            </p>
            <h3 className="text-2xl font-light text-white">{c.client}</h3>
            <p className="text-xs text-[#777] mt-1">{c.service} · {c.duration}</p>
          </div>

          {/* Detail */}
          <div className="md:col-span-4">
            <p className="text-sm text-[#888] leading-relaxed">{c.detail}</p>
          </div>

          {/* Metric + chevron */}
          <div className="md:col-span-4 md:text-right">
            <p className="text-4xl md:text-5xl font-light text-brand-gold tabular-nums">
              {c.metric}
            </p>
            <p className="text-xs text-[#777] tracking-[0.15em] uppercase mt-1">
              {c.metricLabel}
            </p>
          </div>

          {/* Chevron */}
          <div className="md:col-span-1 flex md:justify-end">
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-[#333] group-hover:border-[#555] transition-colors"
            >
              <svg className="w-4 h-4 text-[#666]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Expandable detail */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="pb-10 md:pb-14 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
                <div className="md:col-span-3" />
                <div className="md:col-span-8">
                  <div className="border-l-2 border-brand-gold/40 pl-6">
                    <p className="text-sm text-[#999] leading-relaxed mb-4">
                      {c.expanded}
                    </p>
                    <p className="text-xs text-brand-gold tracking-[0.15em] uppercase">
                      Resultado: {c.result}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <LineReveal color="bg-[#1F1F1F]" />
    </Reveal>
  );
}

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
            <CaseCard key={c.client} c={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
