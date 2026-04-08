import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { LineReveal } from "@/components/ui/line-reveal";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "IA para Logística y Supply Chain en LATAM — Onza",
  description:
    "Soluciones de inteligencia artificial para operaciones logísticas: trazabilidad automatizada, predicción de demanda, optimización de rutas y clasificación de incidencias.",
  openGraph: {
    title: "IA para Logística y Supply Chain en LATAM — Onza",
    description:
      "Trazabilidad, predicción de demanda, rutas optimizadas. IA que resuelve problemas reales de logística en LATAM.",
    url: "https://onzaai.com/industrias/logistica",
  },
  keywords: [
    "IA logística LATAM",
    "inteligencia artificial supply chain",
    "automatización logística Colombia",
    "IA cadena de suministro",
    "predicción demanda IA",
    "optimización rutas inteligencia artificial",
  ],
  alternates: {
    canonical: "https://onzaai.com/industrias/logistica",
  },
};

const USE_CASES = [
  {
    title: "Trazabilidad automatizada",
    description:
      "Un agente de IA conectado a tus sistemas de tracking, WMS y ERP responde en segundos dónde está cada pedido. Tu equipo deja de ser un call center interno.",
    metric: "50+",
    metricLabel: "consultas diarias resueltas sin humano",
  },
  {
    title: "Predicción de demanda",
    description:
      "Un modelo entrenado con tus ventas históricas, estacionalidad y variables locales mejora la precisión de planificación. Menos sobrestock, menos ventas perdidas.",
    metric: "20-35%",
    metricLabel: "mejora en precisión de pedidos",
  },
  {
    title: "Clasificación de incidencias",
    description:
      "Entregas tardías, productos dañados, errores de documentación. La IA clasifica cada caso por tipo, urgencia y área responsable. El operador recibe el caso listo.",
    metric: "70%",
    metricLabel: "reducción en tiempo de clasificación",
  },
  {
    title: "Optimización de rutas",
    description:
      "Modelos que entienden pico y placa en Bogotá, derrumbes en temporada de lluvias y restricciones de entrega por cliente. Rutas optimizadas con variables locales reales.",
    metric: "15-25%",
    metricLabel: "reducción en tiempos de entrega",
  },
];

const FAQ = [
  {
    question: "¿Qué datos necesito para empezar?",
    answer:
      "Depende del caso de uso. Para trazabilidad, acceso a tu WMS/TMS y ERP. Para predicción de demanda, al menos 12 meses de datos de ventas. Para clasificación de incidencias, los reportes que ya generas. No necesitas datos perfectos, pero necesitan existir.",
  },
  {
    question: "¿La IA reemplaza al equipo de logística?",
    answer:
      "No. Funciona como copiloto: sugiere, clasifica, predice. Pero el humano revisa y decide. El equipo deja de hacer trabajo repetitivo y se enfoca en decisiones que requieren criterio.",
  },
  {
    question: "¿Se integra con nuestro WMS/ERP actual?",
    answer:
      "Sí. Nos integramos con SAP, Oracle, Dynamics, Siesa y la mayoría de sistemas logísticos. La solución se conecta a lo que ya tienes.",
  },
  {
    question: "¿Funciona para operaciones en Colombia específicamente?",
    answer:
      "Sí. Nuestros modelos incorporan variables locales: pico y placa, feriados regionales, restricciones de carga, condiciones viales por temporada. No es un optimizador genérico.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "IA para Logística y Supply Chain",
  description:
    "Soluciones de inteligencia artificial para operaciones logísticas en LATAM: trazabilidad, predicción de demanda, optimización de rutas y clasificación de incidencias.",
  provider: {
    "@type": "Organization",
    name: "Onza",
    url: "https://onzaai.com",
  },
  areaServed: ["CO", "MX", "PE", "CL", "AR", "UY"],
  url: "https://onzaai.com/industrias/logistica",
};

export default function LogisticaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", href: "/" },
          { name: "Industrias", href: "/industrias/logistica" },
          { name: "Logística", href: "/industrias/logistica" },
        ]}
      />
      <FAQJsonLd items={FAQ} />

      {/* Header */}
      <Section dark className="pt-32 pb-16">
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-brand-red" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-brand-red font-display">
              Industria
            </span>
          </div>
        </Reveal>
        <TextReveal
          as="h1"
          className="text-hero-mobile md:text-hero font-light max-w-4xl"
        >
          Inteligencia artificial para logística y supply chain
        </TextReveal>
        <Reveal delay={0.3}>
          <p className="text-lg text-[#555] max-w-xl leading-relaxed mt-8 font-light">
            La logística en LATAM tiene problemas que no existen en otros
            mercados. La IA no resuelve la infraestructura vial, pero sí
            resuelve bastante de lo demás.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mt-10">
            <MagneticButton
              href="/contacto?utm_source=industria-logistica&utm_medium=cta&utm_content=hero"
              className="px-10 py-4 bg-brand-red text-white hover:bg-red-600 text-sm"
            >
              Agenda una conversación
            </MagneticButton>
          </div>
        </Reveal>
      </Section>

      {/* Use cases */}
      <Section>
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-brand-red" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-brand-red font-display">
              Casos de uso
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-light mb-16">
            Donde la IA ya genera resultados en logística
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {USE_CASES.map((uc, i) => (
            <Reveal key={uc.title} delay={i * 0.08}>
              <div className="py-8">
                <div className="flex items-baseline gap-4 mb-4">
                  <p className="text-3xl font-light text-brand-red">
                    {uc.metric}
                  </p>
                  <p className="text-xs text-brand-gray tracking-wide uppercase">
                    {uc.metricLabel}
                  </p>
                </div>
                <h3 className="text-xl font-light text-brand-dark mb-3">
                  {uc.title}
                </h3>
                <p className="text-sm text-brand-gray leading-relaxed">
                  {uc.description}
                </p>
              </div>
              <LineReveal />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Honest limits */}
      <Section cream>
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              Lo que la IA no hace todavía en logística LATAM
            </h2>
            <div className="space-y-4 text-brand-gray leading-relaxed">
              <p>
                Un sistema que tome decisiones de compra sin supervisión, que
                negocie con proveedores automáticamente o que rediseñe tu red de
                distribución solo. No. La calidad de datos y la complejidad del
                contexto local no lo permiten hoy.
              </p>
              <p>
                Lo que sí funciona es IA como copiloto. Sugiere, clasifica,
                predice. El humano revisa y decide. Eso ya genera resultados
                medibles.
              </p>
            </div>
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
            Sobre IA en logística
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
            ¿Tu operación logística podría beneficiarse de IA?
          </TextReveal>
          <Reveal delay={0.2}>
            <p className="text-[#777] mb-10 max-w-xl mx-auto leading-relaxed">
              En 30 minutos identificamos los procesos con mayor potencial en
              tu cadena de suministro.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <MagneticButton
              href="/contacto?utm_source=industria-logistica&utm_medium=cta&utm_content=cta-final"
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
