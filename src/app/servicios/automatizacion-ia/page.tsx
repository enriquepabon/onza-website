import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { LineReveal } from "@/components/ui/line-reveal";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Automatización de Procesos con IA para Empresas — Onza",
  description:
    "Automatizamos procesos operativos con inteligencia artificial. Hasta 80% de reducción en tiempos. Integración con ERP, CRM y sistemas existentes. Resultados en 4 a 8 semanas.",
  openGraph: {
    title: "Automatización de Procesos con IA para Empresas — Onza",
    description:
      "Procesos que tomaban horas, resueltos en minutos. Integración con tus sistemas existentes. Resultados en semanas.",
    url: "https://onzaai.com/servicios/automatizacion-ia",
  },
  keywords: [
    "automatización procesos con IA",
    "automatización inteligente empresas",
    "automatización IA Colombia",
    "RPA inteligencia artificial",
    "automatizar procesos empresa LATAM",
  ],
  alternates: {
    canonical: "https://onzaai.com/servicios/automatizacion-ia",
  },
};

const PROCESSES = [
  {
    title: "Reportería automatizada",
    description:
      "Los reportes que tu equipo arma a mano todos los días, extraídos de 4 sistemas y formateados en Excel. Una automatización con IA lo hace en minutos, sin errores, a la hora que definas.",
    metric: "2-4h",
    metricLabel: "liberadas por día",
  },
  {
    title: "Procesamiento de documentos",
    description:
      "Facturas, contratos, órdenes de compra. La IA extrae los datos relevantes, los clasifica y los ingresa a tu sistema. Sin copiar y pegar, sin errores de transcripción.",
    metric: "95%",
    metricLabel: "menos errores de ingreso",
  },
  {
    title: "Flujos de aprobación inteligentes",
    description:
      "Solicitudes que hoy pasan por 5 correos y 3 días de espera. Un flujo automatizado las clasifica, las asigna al aprobador correcto y las escala si no se responden a tiempo.",
    metric: "70%",
    metricLabel: "reducción en tiempo de aprobación",
  },
];

const INCLUDES = [
  "Diagnóstico de procesos automatizables en tu operación",
  "Diseño de arquitectura de automatización",
  "Integración con ERP, CRM, herramientas de comunicación y bases de datos",
  "Implementación con IA donde se necesite juicio (clasificación, extracción, análisis)",
  "Automatización clásica para todo lo demás (reglas fijas, triggers, notificaciones)",
  "Capacitación del equipo y puesta en marcha",
];

const FAQ = [
  {
    question: "¿Qué procesos se pueden automatizar con IA?",
    answer:
      "Cualquier proceso repetitivo que consuma horas-persona: reportería, procesamiento de documentos, clasificación de correos, ingreso de datos, flujos de aprobación, conciliación de información entre sistemas. Si tu equipo lo hace a mano y sigue patrones, se puede automatizar.",
  },
  {
    question: "¿Necesito cambiar mis sistemas actuales?",
    answer:
      "No. Nos integramos con tus sistemas existentes (SAP, Oracle, Dynamics, Salesforce, HubSpot, Google Workspace, etc.). La automatización se conecta a lo que ya tienes, no lo reemplaza.",
  },
  {
    question: "¿Cuál es la diferencia entre automatización clásica e IA?",
    answer:
      "La automatización clásica sigue reglas fijas (si pasa X, haz Y). La IA entra cuando se necesita interpretar, clasificar o decidir algo. En la práctica, la mayoría de proyectos combinan ambas: IA para las partes que necesitan juicio, automatización simple para conectar todo lo demás.",
  },
  {
    question: "¿Cuánto toma ver resultados?",
    answer:
      "Entre 4 y 8 semanas desde el diagnóstico hasta la primera automatización en producción. Empezamos por el proceso con mayor impacto y menor complejidad para generar resultados visibles rápido.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Automatización de Procesos con IA",
  description:
    "Automatización inteligente de procesos operativos para empresas en LATAM. Integración con ERP, CRM y sistemas existentes. Resultados medibles en 4 a 8 semanas.",
  provider: {
    "@type": "Organization",
    name: "Onza",
    url: "https://onzaai.com",
  },
  areaServed: ["CO", "MX", "PE", "CL", "AR", "UY"],
  url: "https://onzaai.com/servicios/automatizacion-ia",
};

export default function AutomatizacionIAPage() {
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
          { name: "Automatización IA", href: "/servicios/automatizacion-ia" },
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
          Automatización de procesos con inteligencia artificial
        </TextReveal>
        <Reveal delay={0.3}>
          <p className="text-lg text-[#555] max-w-xl leading-relaxed mt-8 font-light">
            Procesos que tomaban horas, resueltos en minutos. Integrados con
            tus sistemas actuales. En producción en 4 a 8 semanas.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mt-10">
            <MagneticButton
              href="/contacto?utm_source=automatizacion-ia&utm_medium=cta&utm_content=hero"
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
                  Tu equipo pasa horas copiando datos entre sistemas, armando
                  reportes a mano, procesando documentos uno por uno. Son
                  personas calificadas haciendo trabajo que una máquina hace
                  mejor, más rápido y sin errores.
                </p>
                <p>
                  No todo necesita IA. A veces una automatización simple conecta
                  dos sistemas y resuelve el 80% del problema. Pero cuando el
                  proceso requiere interpretar, clasificar o decidir algo, ahí
                  la IA marca la diferencia.
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
                  <p className="text-xs text-brand-gray mt-1">Del diagnóstico a producción</p>
                </div>
                <div className="h-px bg-gray-200" />
                <div>
                  <p className="text-2xl font-light text-brand-dark">80%</p>
                  <p className="text-xs text-brand-gray mt-1">Reducción típica en tiempo de proceso</p>
                </div>
                <div className="h-px bg-gray-200" />
                <div>
                  <p className="text-2xl font-light text-brand-dark">ERP + CRM</p>
                  <p className="text-xs text-brand-gray mt-1">Integración con tus sistemas actuales</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Processes */}
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
          Procesos que automatizamos con frecuencia
        </TextReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PROCESSES.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div className="border border-[#1F1F1F] p-8 md:p-10 h-full">
                <p className="text-4xl font-light text-brand-gold mb-1">
                  {p.metric}
                </p>
                <p className="text-xs text-[#555] tracking-wide uppercase mb-6">
                  {p.metricLabel}
                </p>
                <h3 className="text-xl font-light text-white mb-3">
                  {p.title}
                </h3>
                <p className="text-sm text-[#777] leading-relaxed">
                  {p.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Includes */}
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
            Sobre automatización con IA
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
            ¿Tu equipo pierde tiempo en procesos que deberían ser automáticos?
          </TextReveal>
          <Reveal delay={0.2}>
            <p className="text-[#777] mb-10 max-w-xl mx-auto leading-relaxed">
              En 30 minutos identificamos los procesos con mayor potencial de
              automatización en tu operación.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <MagneticButton
              href="/contacto?utm_source=automatizacion-ia&utm_medium=cta&utm_content=cta-final"
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
