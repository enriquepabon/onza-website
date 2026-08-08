import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { LineReveal } from "@/components/ui/line-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { CASOS } from "@/lib/casos";

export const metadata: Metadata = {
  title: "Casos de Éxito — Consultoría IA para Empresas | Onza",
  description:
    "Proyectos de IA en producción: 500+ personas formadas en Grupo México, 8 aplicativos para Avicanna, 7 hoteles estandarizados con un agente IA. Resultados reales en semanas.",
  keywords: [
    "casos de éxito IA",
    "proyectos inteligencia artificial empresas",
    "consultoría IA resultados",
    "implementación IA casos reales",
  ],
  openGraph: {
    title: "Casos de Éxito — Consultoría IA para Empresas | Onza",
    description:
      "Proyectos de IA en producción con resultados medibles: formación, automatización, agentes y soluciones a medida.",
    url: "https://onzaai.com/casos",
  },
  alternates: {
    canonical: "https://onzaai.com/casos",
  },
};

export default function CasosPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", href: "/" },
          { name: "Casos", href: "/casos" },
        ]}
      />

      <Section dark className="pt-32 pb-16">
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-brand-red" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-brand-red font-display">
              Casos
            </span>
          </div>
        </Reveal>
        <TextReveal
          as="h1"
          className="text-hero-mobile md:text-hero font-light max-w-4xl"
        >
          Soluciones que ya están operando
        </TextReveal>
        <Reveal delay={0.3}>
          <p className="text-lg text-[#555] max-w-xl leading-relaxed mt-8 font-light">
            Proyectos reales, con clientes que puedes verificar y resultados
            que se pueden contar. Esto es lo que entregamos.
          </p>
        </Reveal>
      </Section>

      <Section>
        <div className="space-y-0">
          {CASOS.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.08}>
              <Link href={`/casos/${c.slug}`} className="block group">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-10 md:py-14 items-center">
                  <div className="md:col-span-3">
                    <p className="text-xs text-brand-red tracking-[0.25em] uppercase font-display mb-2">
                      {c.sector} · {c.country}
                    </p>
                    <h2 className="text-2xl font-light text-brand-dark group-hover:text-brand-red transition-colors">
                      {c.client}
                    </h2>
                    <p className="text-xs text-brand-gray mt-1">
                      {c.service} · {c.duration}
                    </p>
                  </div>
                  <div className="md:col-span-5">
                    <p className="text-sm text-brand-gray leading-relaxed">
                      {c.resumen}
                    </p>
                  </div>
                  <div className="md:col-span-3 md:text-right">
                    <p className="text-4xl md:text-5xl font-light text-brand-gold tabular-nums">
                      {c.metric}
                    </p>
                    <p className="text-xs text-brand-gray tracking-[0.15em] uppercase mt-1">
                      {c.metricLabel}
                    </p>
                  </div>
                  <div className="md:col-span-1 flex md:justify-end">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 group-hover:border-brand-red transition-colors">
                      <svg
                        className="w-4 h-4 text-brand-gray group-hover:text-brand-red transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
              <LineReveal />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section dark className="text-center relative overflow-hidden">
        <div className="noise-overlay" />
        <div className="relative z-10">
          <TextReveal
            as="h2"
            className="text-section-mobile md:text-section font-light mb-6 max-w-2xl mx-auto"
          >
            ¿Tu operación podría ser el siguiente caso?
          </TextReveal>
          <Reveal delay={0.2}>
            <p className="text-[#777] mb-10 max-w-xl mx-auto leading-relaxed">
              En 30 minutos te decimos si tiene sentido para tu empresa y
              cuánto tomaría implementarlo.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <MagneticButton
              href="/contacto?utm_source=casos&utm_medium=cta&utm_content=cta-final"
              className="px-10 py-4 text-sm bg-brand-red text-white hover:bg-red-600"
            >
              Agenda una conversación
            </MagneticButton>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
