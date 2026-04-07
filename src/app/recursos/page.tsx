import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Recursos gratuitos de IA para empresas — Onza",
  description:
    "Herramientas y guías para entender dónde la IA genera impacto en tu operación. Diagnóstico de madurez IA, guía de implementación y más.",
  openGraph: {
    title: "Recursos gratuitos de IA para empresas — Onza",
    description:
      "Diagnóstico de madurez IA, guía de implementación y más. Gratis, sin compromiso.",
    url: "https://onzaai.com/recursos",
  },
  alternates: {
    canonical: "https://onzaai.com/recursos",
  },
};

const RESOURCES = [
  {
    label: "Herramienta",
    title: "Diagnóstico de madurez IA",
    description:
      "6 preguntas, 2 minutos. Descubre dónde la IA genera más impacto en tu operación y qué tan lista está tu empresa para implementarla.",
    href: "/recursos/diagnostico-ia",
    cta: "Hacer el diagnóstico",
    highlight: true,
  },
  {
    label: "Guía descargable",
    title: "Guía para implementar IA en tu empresa",
    description:
      "Lo que hemos aprendido en manufactura, hospitalidad y operaciones. Framework de diagnóstico, checklists y errores comunes.",
    href: "/recursos/guia-ia",
    cta: "Descargar guía",
    highlight: false,
  },
];

export default function RecursosPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", href: "/" },
          { name: "Recursos", href: "/recursos" },
        ]}
      />
      <Section dark className="pt-32 pb-16">
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-brand-red" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-brand-red font-display">
              Recursos
            </span>
          </div>
        </Reveal>
        <TextReveal
          as="h1"
          className="text-hero-mobile md:text-hero font-light max-w-4xl"
        >
          Herramientas para tomar mejores decisiones sobre IA
        </TextReveal>
      </Section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {RESOURCES.map((r, i) => (
            <Reveal key={r.href} delay={i * 0.1}>
              <Link href={r.href} className="group block h-full">
                <div
                  className={`p-8 md:p-10 h-full flex flex-col transition-colors duration-500 ${
                    r.highlight
                      ? "bg-brand-dark group-hover:bg-brand-black border border-[#1F1F1F]"
                      : "bg-brand-cream group-hover:bg-white"
                  }`}
                >
                  <span
                    className={`text-[10px] tracking-[0.25em] uppercase font-display mb-4 block ${
                      r.highlight ? "text-brand-red" : "text-brand-red"
                    }`}
                  >
                    {r.label}
                  </span>
                  <h2
                    className={`text-2xl md:text-3xl font-light mb-4 ${
                      r.highlight
                        ? "text-white"
                        : "text-brand-dark"
                    }`}
                  >
                    {r.title}
                  </h2>
                  <p
                    className={`text-sm leading-relaxed flex-1 mb-8 ${
                      r.highlight ? "text-[#777]" : "text-brand-gray"
                    }`}
                  >
                    {r.description}
                  </p>
                  <span
                    className={`text-xs tracking-[0.15em] uppercase group-hover:translate-x-2 transition-all duration-500 ${
                      r.highlight
                        ? "text-brand-gold"
                        : "text-brand-red"
                    }`}
                  >
                    {r.cta} →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
