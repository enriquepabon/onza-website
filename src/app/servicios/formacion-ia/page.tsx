import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { LineReveal } from "@/components/ui/line-reveal";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Formación y Capacitación en IA para Empresas — Onza",
  description:
    "Formaciones prácticas en inteligencia artificial para equipos directivos y operativos. Tu equipo usa IA desde la primera sesión. Programas de 2 a 4 semanas con acompañamiento.",
  openGraph: {
    title: "Formación y Capacitación en IA para Empresas — Onza",
    description:
      "Formaciones prácticas en IA. Tu equipo usa IA desde la primera sesión. Programas de 2 a 4 semanas.",
    url: "https://onzaai.com/servicios/formacion-ia",
  },
  keywords: [
    "formación IA empresas",
    "capacitación inteligencia artificial corporativa",
    "curso IA para empresas Colombia",
    "workshop IA empresarial LATAM",
    "formación ChatGPT empresas",
  ],
  alternates: {
    canonical: "https://onzaai.com/servicios/formacion-ia",
  },
};

const FORMATS = [
  {
    title: "Formación ejecutiva",
    audience: "Directivos y gerentes",
    duration: "2-4 horas",
    description:
      "Lo que un líder necesita saber para tomar decisiones sobre IA: qué puede pedir, cuánto cuesta, cómo evaluar si funcionó, y qué no creerle a los proveedores.",
  },
  {
    title: "Workshops operativos",
    audience: "Equipos del día a día",
    duration: "1-2 días",
    description:
      "Herramientas concretas para el trabajo diario: cómo usar ChatGPT, Claude o Copilot para redactar reportes, analizar documentos, crear prompts consistentes. Con los datos reales de la empresa.",
  },
  {
    title: "Acompañamiento mensual",
    audience: "Todo el equipo",
    duration: "3-6 meses",
    description:
      "Sesiones mensuales donde el equipo trae sus casos reales, se resuelven dudas y se ajustan los prompts. La adopción real pasa entre la semana 3 y la 6. Sin seguimiento, la herramienta se deja de usar.",
  },
];

const FAQ = [
  {
    question: "¿La formación es genérica o se adapta a mi empresa?",
    answer:
      "Se adapta. Usamos los documentos, procesos y casos reales de tu empresa como material de práctica. No es una charla sobre qué es machine learning. Es un taller donde tu equipo resuelve problemas reales con IA.",
  },
  {
    question: "¿Qué herramientas se enseñan?",
    answer:
      "ChatGPT, Claude, Gemini, Copilot y herramientas de automatización. La selección depende de lo que ya use tu empresa y de lo que tenga más sentido para tu operación.",
  },
  {
    question: "¿Cuántas personas pueden participar?",
    answer:
      "Desde equipos de 5 personas hasta programas para 500+. Lo que cambia es el formato: grupos pequeños son más prácticos, grupos grandes requieren sesiones tipo conferencia con talleres en subgrupos.",
  },
  {
    question: "¿La formación es presencial o remota?",
    answer:
      "Ambas. Para equipos en Colombia ofrecemos presencial. Para el resto de LATAM, sesiones remotas con la misma metodología práctica.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Formación en IA para Empresas",
  description:
    "Capacitaciones prácticas en inteligencia artificial para equipos directivos y operativos en empresas de LATAM. Programas de 2 a 4 semanas con acompañamiento mensual.",
  provider: {
    "@type": "Organization",
    name: "Onza",
    url: "https://onzaai.com",
  },
  areaServed: ["CO", "MX", "PE", "CL", "AR", "UY"],
  url: "https://onzaai.com/servicios/formacion-ia",
};

export default function FormacionIAPage() {
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
          { name: "Formación IA", href: "/servicios/formacion-ia" },
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
          Formación en inteligencia artificial para empresas
        </TextReveal>
        <Reveal delay={0.3}>
          <p className="text-lg text-[#555] max-w-xl leading-relaxed mt-8 font-light">
            Tu equipo domina IA en semanas, no meses. Formaciones prácticas
            adaptadas a tu industria, con tus datos reales.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mt-10">
            <MagneticButton
              href="/contacto?utm_source=formacion-ia&utm_medium=cta&utm_content=hero"
              className="px-10 py-4 bg-brand-red text-white hover:bg-red-600 text-sm"
            >
              Agenda una conversación
            </MagneticButton>
          </div>
        </Reveal>
      </Section>

      {/* Problem */}
      <Section narrow>
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Por qué la mayoría de formaciones en IA no funcionan
          </h2>
          <div className="space-y-4 text-brand-gray leading-relaxed max-w-2xl">
            <p>
              La formación genérica empieza explicando qué es machine learning
              y la historia de la IA desde Alan Turing. Después de 4 horas, el
              gerente de operaciones sabe qué es un transformer pero no tiene
              idea de cómo aplicarlo el lunes.
            </p>
            <p>
              Nuestras formaciones son diferentes. El director general aprende
              qué puede pedir y cómo evaluarlo. El equipo operativo sale con
              herramientas concretas para su trabajo diario. Usando sus propios
              documentos, no ejemplos ficticios.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* Formats */}
      <Section dark>
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-brand-red" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-brand-red font-display">
              Formatos
            </span>
          </div>
        </Reveal>
        <TextReveal
          as="h2"
          className="text-section-mobile md:text-section font-light text-white mb-16 max-w-3xl"
        >
          Tres formatos según lo que necesites
        </TextReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {FORMATS.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1}>
              <div className="border border-[#1F1F1F] p-8 md:p-10 h-full">
                <p className="text-xs text-brand-gold tracking-wide uppercase mb-1">
                  {f.audience}
                </p>
                <p className="text-xs text-[#555] tracking-wide uppercase mb-6">
                  {f.duration}
                </p>
                <h3 className="text-xl font-light text-white mb-3">
                  {f.title}
                </h3>
                <p className="text-sm text-[#777] leading-relaxed">
                  {f.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Case */}
      <Section narrow>
        <Reveal>
          <div className="border-l-2 border-brand-gold pl-8">
            <p className="text-xs text-brand-red tracking-[0.2em] uppercase font-display mb-4">
              Caso real
            </p>
            <h3 className="text-2xl font-light mb-4">
              Grupo México — 500+ personas formadas
            </h3>
            <p className="text-brand-gray leading-relaxed mb-4">
              Programa de formación en IA y Microsoft Copilot para equipos
              operativos y directivos a escala nacional. No empezamos con las
              sesiones. Empezamos entendiendo qué necesitaba cada nivel.
            </p>
            <p className="text-sm text-brand-gray">
              Los directivos aprendieron qué pedirle a la IA. Los operativos
              salieron con herramientas concretas para su trabajo diario.
            </p>
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
            Sobre las formaciones
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
            ¿Tu equipo necesita aprender a usar IA?
          </TextReveal>
          <Reveal delay={0.2}>
            <p className="text-[#777] mb-10 max-w-xl mx-auto leading-relaxed">
              Diseñamos un programa adaptado a tu industria y al nivel de tu
              equipo. Resultados desde la primera sesión.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <MagneticButton
              href="/contacto?utm_source=formacion-ia&utm_medium=cta&utm_content=cta-final"
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
