import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { LineReveal } from "@/components/ui/line-reveal";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Agentes de IA para Empresas — Onza",
  description:
    "Diseñamos agentes de inteligencia artificial que ejecutan tareas operativas: onboarding, incidencias, reportería, gestión de proveedores. Supervisión humana, resultados reales.",
  openGraph: {
    title: "Agentes de IA para Empresas — Onza",
    description:
      "Agentes de IA que ejecutan tareas, no solo responden preguntas. Con supervisión humana y resultados reales.",
    url: "https://onzaai.com/servicios/agentes-ia",
  },
  keywords: [
    "agentes IA empresas",
    "agentes inteligencia artificial",
    "agentes autónomos IA empresarial",
    "agentes IA Colombia LATAM",
    "implementar agentes IA",
  ],
  alternates: {
    canonical: "https://onzaai.com/servicios/agentes-ia",
  },
};

const EXAMPLES = [
  {
    title: "Agente de onboarding",
    description:
      "Recibe documentación del nuevo cliente, verifica que esté completa, la clasifica, crea la cuenta en el CRM, genera el contrato y lo envía para firma. Si falta algo, lo pide. Si hay inconsistencias, escala.",
    metric: "75%",
    metricLabel: "menos tiempo de onboarding",
  },
  {
    title: "Agente de incidencias",
    description:
      "Recibe un reporte de problema, lo clasifica por tipo y urgencia, busca soluciones anteriores en la base de conocimiento, sugiere una resolución o escala al equipo correcto con todo el contexto.",
    metric: "60%",
    metricLabel: "resolución sin intervención humana",
  },
  {
    title: "Agente de reportería",
    description:
      "Recopila datos de múltiples sistemas, genera el reporte consolidado, detecta anomalías, las marca y distribuye el reporte. Si algo no cuadra, alerta al responsable antes de enviar.",
    metric: "100%",
    metricLabel: "automatización de reportes periódicos",
  },
];

const FAQ = [
  {
    question: "¿Cuál es la diferencia entre un chatbot y un agente de IA?",
    answer:
      "Un chatbot responde preguntas. Un agente ejecuta acciones: consulta bases de datos, toma decisiones intermedias, ejecuta tareas en otros sistemas y notifica a las personas correctas. El chatbot informa, el agente resuelve.",
  },
  {
    question: "¿Los agentes operan sin supervisión humana?",
    answer:
      "No completamente. Diseñamos los agentes con límites claros: qué pueden decidir solos, cuándo deben escalar a un humano, y qué acciones requieren aprobación. La supervisión disminuye a medida que el agente demuestra confiabilidad.",
  },
  {
    question: "¿Cuánto toma implementar un agente?",
    answer:
      "Entre 4 y 8 semanas dependiendo de la complejidad. Un agente simple (reportería, clasificación) toma 4 semanas. Un agente que cruza múltiples sistemas y toma decisiones toma 6-8 semanas.",
  },
  {
    question: "¿Qué sistemas pueden conectarse a un agente?",
    answer:
      "CRM (Salesforce, HubSpot), ERP (SAP, Oracle, Dynamics), herramientas de comunicación (Slack, Teams, WhatsApp), bases de datos, Google Workspace, y prácticamente cualquier sistema con API.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Agentes de IA para Empresas",
  description:
    "Diseño e implementación de agentes de inteligencia artificial que ejecutan tareas operativas con supervisión humana para empresas en LATAM.",
  provider: {
    "@type": "Organization",
    name: "Onza",
    url: "https://onzaai.com",
  },
  areaServed: ["CO", "MX", "PE", "CL", "AR", "UY"],
  url: "https://onzaai.com/servicios/agentes-ia",
};

export default function AgentesIAPage() {
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
          { name: "Agentes IA", href: "/servicios/agentes-ia" },
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
          Agentes de inteligencia artificial para tu operación
        </TextReveal>
        <Reveal delay={0.3}>
          <p className="text-lg text-[#555] max-w-xl leading-relaxed mt-8 font-light">
            No solo responden preguntas. Ejecutan tareas, toman decisiones
            intermedias y escalan cuando es necesario. Con supervisión humana.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mt-10">
            <MagneticButton
              href="/contacto?utm_source=agentes-ia&utm_medium=cta&utm_content=hero"
              className="px-10 py-4 bg-brand-red text-white hover:bg-red-600 text-sm"
            >
              Agenda una conversación
            </MagneticButton>
          </div>
        </Reveal>
      </Section>

      {/* Difference */}
      <Section narrow>
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-light mb-6">
                Chatbot vs. agente: la diferencia que importa
              </h2>
              <div className="space-y-4 text-brand-gray leading-relaxed">
                <p>
                  Un chatbot te dice cuál es el estado de tu pedido. Un agente
                  detecta que tu pedido está retrasado, contacta al proveedor,
                  actualiza el sistema y te notifica. Sin que nadie se lo pida.
                </p>
                <p>
                  La diferencia es que el agente puede decidir qué hacer
                  basándose en contexto. Si el proveedor no responde en 2 horas,
                  prueba otro canal. Si el retraso es menor a un día, no escala.
                  Si es mayor, sí.
                </p>
              </div>
            </div>
            <div className="bg-brand-cream p-8 space-y-6">
              <p className="text-xs tracking-[0.15em] uppercase text-brand-gray mb-2">
                Entrega típica
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-2xl font-light text-brand-dark">4-8 semanas</p>
                  <p className="text-xs text-brand-gray mt-1">Diseño, implementación y puesta en marcha</p>
                </div>
                <div className="h-px bg-gray-200" />
                <div>
                  <p className="text-2xl font-light text-brand-dark">Multi-sistema</p>
                  <p className="text-xs text-brand-gray mt-1">CRM, ERP, Slack, WhatsApp, bases de datos</p>
                </div>
                <div className="h-px bg-gray-200" />
                <div>
                  <p className="text-2xl font-light text-brand-dark">Supervisado</p>
                  <p className="text-xs text-brand-gray mt-1">Límites claros y escalamiento a humano</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Examples */}
      <Section dark>
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-brand-red" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-brand-red font-display">
              Ejemplos
            </span>
          </div>
        </Reveal>
        <TextReveal
          as="h2"
          className="text-section-mobile md:text-section font-light text-white mb-16 max-w-3xl"
        >
          Agentes que ya están operando en empresas
        </TextReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {EXAMPLES.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.1}>
              <div className="border border-[#1F1F1F] p-8 md:p-10 h-full">
                <p className="text-4xl font-light text-brand-gold mb-1">
                  {e.metric}
                </p>
                <p className="text-xs text-[#555] tracking-wide uppercase mb-6">
                  {e.metricLabel}
                </p>
                <h3 className="text-xl font-light text-white mb-3">
                  {e.title}
                </h3>
                <p className="text-sm text-[#777] leading-relaxed">
                  {e.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
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
            Sobre agentes de IA
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
            ¿Tienes procesos que cruzan sistemas y consumen tiempo?
          </TextReveal>
          <Reveal delay={0.2}>
            <p className="text-[#777] mb-10 max-w-xl mx-auto leading-relaxed">
              En 30 minutos evaluamos si un agente de IA tiene sentido para tu
              operación y cuánto tomaría implementarlo.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <MagneticButton
              href="/contacto?utm_source=agentes-ia&utm_medium=cta&utm_content=cta-final"
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
