import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { LineReveal } from "@/components/ui/line-reveal";

export const metadata: Metadata = {
  title: "Chatbot IA para Empresas — Onza",
  description:
    "Agentes conversacionales con IA que responden preguntas de tu equipo o tus clientes 24/7, alimentados con tu información real. Funcionando en 3 a 6 semanas.",
  openGraph: {
    title: "Chatbot IA para Empresas — Onza",
    description:
      "Agentes conversacionales con IA que responden 24/7, alimentados con tu información real. En producción en semanas.",
    url: "https://onzaai.com/servicios/chatbot-ia",
  },
  keywords: [
    "chatbot IA empresarial",
    "agente IA conversacional",
    "chatbot inteligencia artificial",
    "atención al cliente con IA",
    "chatbot servicio al cliente Colombia",
  ],
};

const USE_CASES = [
  {
    title: "Atención al cliente 24/7",
    description:
      "Resuelve las consultas más frecuentes sin intervención humana. Cuando no puede, escala al agente correcto con todo el contexto de la conversación.",
    metric: "70-80%",
    metricLabel: "de consultas resueltas sin humano",
  },
  {
    title: "Consulta operativa interna",
    description:
      "Tu equipo le pregunta al agente cómo hacer un proceso, cuál es la política vigente o dónde encontrar un documento. Responde en segundos, a cualquier hora.",
    metric: "24/7",
    metricLabel: "disponibilidad sin sobrecoste",
  },
  {
    title: "Calificación de leads",
    description:
      "Recibe la primera consulta de un potencial cliente, hace las preguntas correctas y lo clasifica antes de pasarlo al equipo comercial. El vendedor recibe el lead listo.",
    metric: "3x",
    metricLabel: "más leads calificados por vendedor",
  },
];

const INCLUDES = [
  "Diseño de flujo conversacional adaptado a tu operación",
  "Conexión con tu base de conocimiento (Notion, Drive, documentos internos)",
  "Integración con canales: web, WhatsApp, Slack o el que necesites",
  "Panel de monitoreo para ver qué preguntan y qué responde",
  "Entrenamiento iterativo las primeras 2 semanas post-lanzamiento",
  "Escalamiento a humano con contexto completo",
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Chatbot IA para Empresas",
  description:
    "Agentes conversacionales con IA alimentados con información real de la empresa. Atención al cliente, consulta operativa y calificación de leads.",
  provider: {
    "@type": "Organization",
    name: "Onza",
    url: "https://onzaai.com",
  },
  areaServed: "LATAM",
  url: "https://onzaai.com/servicios/chatbot-ia",
};

export default function ChatbotIAPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

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
          Chatbot IA que responde con tu información, no con genéricos
        </TextReveal>
        <Reveal delay={0.3}>
          <p className="text-lg text-[#555] max-w-xl leading-relaxed mt-8 font-light">
            Un agente conversacional alimentado con tus documentos, procesos y
            datos reales. Funciona 24/7. En producción en 3 a 6 semanas.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mt-10">
            <MagneticButton
              href="/contacto?utm_source=chatbot-ia&utm_medium=cta&utm_content=hero"
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-light mb-6">
                El problema que resuelve
              </h2>
              <div className="space-y-4 text-brand-gray leading-relaxed">
                <p>
                  Tu equipo responde las mismas preguntas todos los días. Tus
                  clientes esperan horas para una respuesta que está en un
                  documento que nadie encuentra. Tu call center atiende
                  consultas que se podrían resolver solas.
                </p>
                <p>
                  No es un problema de personas. Es un problema de acceso a la
                  información. Y la IA lo resuelve bien, siempre que el agente
                  tenga acceso a información real y actualizada, no a un FAQ
                  estático.
                </p>
              </div>
            </div>
            <div className="bg-brand-cream p-8 space-y-6">
              <p className="text-xs tracking-[0.15em] uppercase text-brand-gray mb-2">
                Entrega típica
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-2xl font-light text-brand-dark">3-6 semanas</p>
                  <p className="text-xs text-brand-gray mt-1">De la primera conversación a producción</p>
                </div>
                <div className="h-px bg-gray-200" />
                <div>
                  <p className="text-2xl font-light text-brand-dark">RAG + LLM</p>
                  <p className="text-xs text-brand-gray mt-1">Consulta tus documentos antes de responder</p>
                </div>
                <div className="h-px bg-gray-200" />
                <div>
                  <p className="text-2xl font-light text-brand-dark">Multicanal</p>
                  <p className="text-xs text-brand-gray mt-1">Web, WhatsApp, Slack, el que necesites</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Use cases */}
      <Section dark>
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-brand-red" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-brand-red font-display">
              Casos de uso
            </span>
          </div>
        </Reveal>
        <TextReveal
          as="h2"
          className="text-section-mobile md:text-section font-light text-white mb-16 max-w-3xl"
        >
          Tres formas en las que empresas lo están usando hoy
        </TextReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {USE_CASES.map((uc, i) => (
            <Reveal key={uc.title} delay={i * 0.1}>
              <div className="border border-[#1F1F1F] p-8 md:p-10 h-full">
                <p className="text-4xl font-light text-brand-gold mb-1">
                  {uc.metric}
                </p>
                <p className="text-xs text-[#555] tracking-wide uppercase mb-6">
                  {uc.metricLabel}
                </p>
                <h3 className="text-xl font-light text-white mb-3">
                  {uc.title}
                </h3>
                <p className="text-sm text-[#777] leading-relaxed">
                  {uc.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* What's included */}
      <Section cream>
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-light mb-12">
            Qué incluye
          </h2>
        </Reveal>
        <div className="space-y-0">
          {INCLUDES.map((item, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="flex gap-4 items-start py-5">
                <span className="text-brand-red mt-1 text-xs shrink-0">●</span>
                <p className="text-brand-dark">{item}</p>
              </div>
              <LineReveal color="bg-gray-300/30" />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Case reference */}
      <Section narrow>
        <Reveal>
          <div className="border-l-2 border-brand-gold pl-8">
            <p className="text-xs text-brand-red tracking-[0.2em] uppercase font-display mb-4">
              Caso real
            </p>
            <h3 className="text-2xl font-light mb-4">
              LaTroupe — 7 hoteles, 1 agente
            </h3>
            <p className="text-brand-gray leading-relaxed mb-4">
              Red de hoteles boutique en Europa con operación en 3 países.
              Implementamos un agente alimentado con el playbook operativo de
              las 7 sedes. Cualquier colaborador consulta procedimientos,
              políticas o checklists en tiempo real, en cualquier idioma.
            </p>
            <p className="text-sm text-brand-gray">
              En 4 sesiones pasaron de procesos dispersos en documentos sueltos
              a un estándar operativo consultable 24/7.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* CTA */}
      <Section dark className="text-center relative overflow-hidden">
        <div className="noise-overlay" />
        <div className="relative z-10">
          <TextReveal
            as="h2"
            className="text-section-mobile md:text-section font-light mb-6 max-w-2xl mx-auto"
          >
            ¿Tu equipo o tus clientes podrían usar algo así?
          </TextReveal>
          <Reveal delay={0.2}>
            <p className="text-[#777] mb-10 max-w-xl mx-auto leading-relaxed">
              En 30 minutos te decimos si tiene sentido para tu operación y
              cuánto tomaría implementarlo.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <MagneticButton
              href="/contacto?utm_source=chatbot-ia&utm_medium=cta&utm_content=cta-final"
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
