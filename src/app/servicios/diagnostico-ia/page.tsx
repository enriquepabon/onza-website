import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { LineReveal } from "@/components/ui/line-reveal";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Diagnóstico de Madurez IA para Empresas — Onza",
  description:
    "Analizamos tu operación e identificamos dónde la IA genera impacto financiero medible. Roadmap priorizado en 2 a 4 semanas. El costo se acredita si contratas la implementación.",
  openGraph: {
    title: "Diagnóstico de Madurez IA para Empresas — Onza",
    description:
      "Identificamos dónde la IA genera mayor impacto en tu operación. Roadmap en 2-4 semanas.",
    url: "https://onzaai.com/servicios/diagnostico-ia",
  },
  keywords: [
    "diagnóstico IA empresarial",
    "consultoría estratégica IA",
    "evaluación madurez inteligencia artificial",
    "roadmap IA empresa Colombia",
    "diagnóstico transformación digital IA",
  ],
  alternates: {
    canonical: "https://onzaai.com/servicios/diagnostico-ia",
  },
};

const DELIVERABLES = [
  {
    title: "Mapa de oportunidades",
    description: "Procesos con mayor potencial de IA, ordenados por impacto financiero y complejidad de implementación.",
  },
  {
    title: "Estimación de ahorro",
    description: "Cuánto te cuesta cada proceso hoy en horas-persona, errores y tiempo. Cuánto ahorrarías con IA.",
  },
  {
    title: "Roadmap de 90 días",
    description: "Fases, costos, métricas de éxito y prioridades claras. Lo que convence al CFO.",
  },
];

const FAQ = [
  {
    question: "¿Qué incluye el diagnóstico?",
    answer:
      "Entrevistas con tu equipo, mapeo de procesos, análisis financiero de cada oportunidad y un roadmap priorizado. No es una auditoría tecnológica. Es un análisis de tu operación para identificar dónde la IA genera impacto financiero medible.",
  },
  {
    question: "¿Cuánto cuesta el diagnóstico?",
    answer:
      "El costo varía según el tamaño de la empresa y el alcance. Pero el costo del diagnóstico se acredita al 100% si contratas la implementación. Es decir, si decides avanzar, el diagnóstico te salió gratis.",
  },
  {
    question: "¿Cuánto toma?",
    answer:
      "Entre 2 y 4 semanas. Incluye entrevistas, análisis y presentación de resultados. No es un proceso de meses. Es lo suficientemente rápido para tomar decisiones, lo suficientemente profundo para que sean las correctas.",
  },
  {
    question: "¿Y si el diagnóstico dice que no necesito IA?",
    answer:
      "Te lo decimos. A veces el problema se resuelve con automatización simple, no con IA. A veces la empresa necesita documentar procesos antes de automatizarlos. Te damos el camino correcto, no el que nos genera más facturación.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Diagnóstico de Madurez IA Empresarial",
  description:
    "Análisis de operación empresarial para identificar oportunidades de IA con impacto financiero medible. Roadmap priorizado en 2-4 semanas.",
  provider: {
    "@type": "Organization",
    name: "Onza",
    url: "https://onzaai.com",
  },
  areaServed: ["CO", "MX", "PE", "CL", "AR", "UY"],
  url: "https://onzaai.com/servicios/diagnostico-ia",
};

export default function DiagnosticoIAPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", href: "/" },
          { name: "Servicios", href: "/servicios" },
          { name: "Diagnóstico IA", href: "/servicios/diagnostico-ia" },
        ]}
      />
      <FAQJsonLd items={FAQ} />

      {/* Header */}
      <Section dark className="pt-32 pb-16">
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-brand-red" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-brand-red font-display">
              Servicio
            </span>
          </div>
        </Reveal>
        <TextReveal
          as="h1"
          className="text-hero-mobile md:text-hero font-light max-w-4xl"
        >
          Diagnóstico estratégico de inteligencia artificial
        </TextReveal>
        <Reveal delay={0.3}>
          <p className="text-lg text-[#555] max-w-xl leading-relaxed mt-8 font-light">
            Antes de invertir, claridad. Analizamos tu operación e identificamos
            exactamente dónde la IA genera impacto financiero medible.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mt-10">
            <MagneticButton
              href="/contacto?utm_source=diagnostico-ia&utm_medium=cta&utm_content=hero"
              className="px-10 py-4 bg-brand-red text-white hover:bg-red-600 text-sm"
            >
              Solicitar diagnóstico
            </MagneticButton>
          </div>
        </Reveal>
      </Section>

      {/* Problem */}
      <Section narrow>
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-light mb-6">
                Por qué empezar con un diagnóstico
              </h2>
              <div className="space-y-4 text-brand-gray leading-relaxed">
                <p>
                  La mayoría de gerentes nos dicen lo mismo: saben que la IA
                  es importante, pero no saben por dónde empezar. Y la
                  respuesta correcta no es por todas partes ni por la
                  herramienta más nueva.
                </p>
                <p>
                  Un diagnóstico te da el mapa: dónde está el impacto, cuánto
                  cuesta no hacer nada, y qué se puede resolver en semanas
                  versus qué requiere meses. Convierte la vaguedad en un plan
                  con números reales.
                </p>
              </div>
            </div>
            <div className="bg-brand-cream p-8 space-y-6">
              <p className="text-xs tracking-[0.15em] uppercase text-brand-gray mb-2">
                Entrega típica
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-2xl font-light text-brand-dark">2-4 semanas</p>
                  <p className="text-xs text-brand-gray mt-1">Entrevistas, análisis y roadmap</p>
                </div>
                <div className="h-px bg-gray-200" />
                <div>
                  <p className="text-2xl font-light text-brand-dark">100%</p>
                  <p className="text-xs text-brand-gray mt-1">Acreditable si contratas implementación</p>
                </div>
                <div className="h-px bg-gray-200" />
                <div>
                  <p className="text-2xl font-light text-brand-dark">90 días</p>
                  <p className="text-xs text-brand-gray mt-1">Roadmap con fases y métricas</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Deliverables */}
      <Section dark>
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-brand-red" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-brand-red font-display">
              Entregables
            </span>
          </div>
        </Reveal>
        <TextReveal
          as="h2"
          className="text-section-mobile md:text-section font-light text-white mb-16 max-w-3xl"
        >
          Lo que recibes al final del diagnóstico
        </TextReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {DELIVERABLES.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.1}>
              <div className="border border-[#1F1F1F] p-8 md:p-10 h-full">
                <p className="text-xs text-brand-gold tracking-wide uppercase mb-6">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="text-xl font-light text-white mb-3">
                  {d.title}
                </h3>
                <p className="text-sm text-[#777] leading-relaxed">
                  {d.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Free tool */}
      <Section cream>
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              ¿Quieres una primera lectura gratuita?
            </h2>
            <p className="text-brand-gray leading-relaxed mb-8">
              Nuestro test de madurez IA toma 2 minutos. Son 6 preguntas que te
              dan una primera lectura de dónde está tu empresa y dónde la IA
              puede generar mayor impacto. Sin compromiso, sin datos de tarjeta.
            </p>
            <MagneticButton
              href="/recursos/diagnostico-ia"
              className="px-10 py-4 bg-brand-dark text-white hover:bg-black text-sm"
            >
              Hacer el test gratuito
            </MagneticButton>
          </div>
        </Reveal>
      </Section>

      {/* FAQ */}
      <Section>
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-brand-red" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-brand-red font-display">
              Preguntas frecuentes
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-light mb-12">
            Sobre el diagnóstico
          </h2>
        </Reveal>
        <div className="space-y-0">
          {FAQ.map((faq, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="py-6">
                <h3 className="text-lg font-light text-brand-dark mb-2">
                  {faq.question}
                </h3>
                <p className="text-brand-gray leading-relaxed text-sm">
                  {faq.answer}
                </p>
              </div>
              <LineReveal />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section dark className="text-center relative overflow-hidden">
        <div className="noise-overlay" />
        <div className="relative z-10">
          <TextReveal
            as="h2"
            className="text-section-mobile md:text-section font-light mb-6 max-w-2xl mx-auto"
          >
            ¿Listo para saber dónde está el impacto real?
          </TextReveal>
          <Reveal delay={0.2}>
            <p className="text-[#777] mb-10 max-w-xl mx-auto leading-relaxed">
              Un diagnóstico de 2 a 4 semanas te da la claridad que necesitas
              para invertir con confianza.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <MagneticButton
              href="/contacto?utm_source=diagnostico-ia&utm_medium=cta&utm_content=cta-final"
              className="px-10 py-4 text-sm bg-brand-red text-white hover:bg-red-600"
            >
              Solicitar diagnóstico
            </MagneticButton>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
