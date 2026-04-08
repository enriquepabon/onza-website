import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { LineReveal } from "@/components/ui/line-reveal";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "IA para Retail y Comercio en LATAM — Onza",
  description:
    "Inteligencia artificial para retail: atención al cliente por WhatsApp con IA, personalización, gestión de inventario inteligente y análisis de precios competitivos.",
  openGraph: {
    title: "IA para Retail y Comercio en LATAM — Onza",
    description:
      "Atención por WhatsApp con IA, personalización, inventario inteligente. Soluciones para retail en LATAM.",
    url: "https://onzaai.com/industrias/retail",
  },
  keywords: [
    "IA retail LATAM",
    "inteligencia artificial comercio",
    "chatbot WhatsApp retail",
    "personalización con IA",
    "gestión inventario inteligencia artificial",
    "IA experiencia cliente Colombia",
  ],
  alternates: {
    canonical: "https://onzaai.com/industrias/retail",
  },
};

const USE_CASES = [
  {
    title: "Atención al cliente por WhatsApp",
    description:
      "El 83% de interacciones de servicio al cliente en LATAM pasan por WhatsApp. Un agente de IA en WhatsApp que resuelve el 60-70% de consultas sin humano cambia la economía de tu equipo de atención.",
    metric: "60-70%",
    metricLabel: "consultas resueltas sin intervención humana",
  },
  {
    title: "Personalización real",
    description:
      "Analiza comportamiento de compra (qué compró, qué vio, qué abandonó en el carrito) y recomienda productos relevantes. Integrado en tu email marketing o WhatsApp sin necesitar un equipo de data science.",
    metric: "15-30%",
    metricLabel: "incremento en conversión de campañas",
  },
  {
    title: "Gestión de inventario inteligente",
    description:
      "Un modelo de predicción alimentado con tus datos históricos, estacionalidad, calendario de promociones y variables locales. Menos sobrestock, menos ventas perdidas.",
    metric: "20-35%",
    metricLabel: "mejora en precisión de pedidos",
  },
  {
    title: "Monitoreo de precios competitivos",
    description:
      "Seguimiento automatizado de precios de competidores con detección de patrones y sugerencias de ajuste. Visibilidad que antes solo tenían las grandes cadenas.",
    metric: "24/7",
    metricLabel: "monitoreo sin intervención manual",
  },
];

const FAQ = [
  {
    question: "¿El chatbot funciona en WhatsApp Business?",
    answer:
      "Sí. Se integra con la API de WhatsApp Business. El agente responde consultas sobre productos, estado de pedidos, políticas de devolución y disponibilidad. Cuando no puede resolver, escala a un humano con todo el contexto.",
  },
  {
    question: "¿Necesito un equipo técnico grande para implementar esto?",
    answer:
      "No. Nosotros implementamos y configuramos todo. Tu equipo necesita definir las reglas de negocio (qué responder, cuándo escalar, qué productos recomendar) y alimentar la información base. La parte técnica es nuestra.",
  },
  {
    question: "¿Funciona para e-commerce y tiendas físicas?",
    answer:
      "Ambos. La atención por WhatsApp y la personalización funcionan igual para canales digitales y físicos. La gestión de inventario se adapta a si operas con una o múltiples sedes.",
  },
  {
    question: "¿Cuánto toma implementar la primera solución?",
    answer:
      "Un chatbot de atención al cliente por WhatsApp toma 3-6 semanas. La personalización de campañas, 4-6 semanas. La predicción de inventario requiere 8-12 semanas porque necesita datos históricos para entrenar el modelo.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "IA para Retail y Comercio",
  description:
    "Soluciones de inteligencia artificial para retail en LATAM: atención al cliente por WhatsApp, personalización, gestión de inventario y análisis de precios competitivos.",
  provider: {
    "@type": "Organization",
    name: "Onza",
    url: "https://onzaai.com",
  },
  areaServed: ["CO", "MX", "PE", "CL", "AR", "UY"],
  url: "https://onzaai.com/industrias/retail",
};

export default function RetailPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", href: "/" },
          { name: "Industrias", href: "/industrias/retail" },
          { name: "Retail", href: "/industrias/retail" },
        ]}
      />
      <FAQJsonLd items={FAQ} />

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
          Inteligencia artificial para retail y comercio
        </TextReveal>
        <Reveal delay={0.3}>
          <p className="text-lg text-[#555] max-w-xl leading-relaxed mt-8 font-light">
            Los consumidores en LATAM son digitales. Las operaciones de retail,
            no. La IA cierra esa brecha con soluciones concretas que impactan
            ventas hoy.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mt-10">
            <MagneticButton
              href="/contacto?utm_source=industria-retail&utm_medium=cta&utm_content=hero"
              className="px-10 py-4 bg-brand-red text-white hover:bg-red-600 text-sm"
            >
              Agenda una conversación
            </MagneticButton>
          </div>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-brand-red" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-brand-red font-display">
              Casos de uso
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-light mb-16">
            Lo que ya funciona en retail LATAM
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

      <Section>
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-brand-red" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-brand-red font-display">
              Preguntas frecuentes
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-light mb-12">
            Sobre IA en retail
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

      <Section dark className="text-center relative overflow-hidden">
        <div className="noise-overlay" />
        <div className="relative z-10">
          <TextReveal
            as="h2"
            className="text-section-mobile md:text-section font-light mb-6 max-w-2xl mx-auto"
          >
            ¿Tu operación de retail está lista para IA?
          </TextReveal>
          <Reveal delay={0.2}>
            <p className="text-[#777] mb-10 max-w-xl mx-auto leading-relaxed">
              En 30 minutos evaluamos dónde la IA puede impactar tus ventas y
              tu operación de forma concreta.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <MagneticButton
              href="/contacto?utm_source=industria-retail&utm_medium=cta&utm_content=cta-final"
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
