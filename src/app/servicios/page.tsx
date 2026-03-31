import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { LineReveal } from "@/components/ui/line-reveal";

export const metadata: Metadata = {
  title: "Servicios de Consultoría IA para Empresas — Onza",
  description:
    "Automatización de procesos, diagnóstico IA, formaciones corporativas y soluciones a medida. Resultados medibles en 2 a 8 semanas para empresas en LATAM.",
  openGraph: {
    title: "Servicios de Consultoría IA para Empresas — Onza",
    description:
      "Automatización de procesos, diagnóstico IA, formaciones corporativas y soluciones a medida. Resultados en 2 a 8 semanas.",
    url: "https://onzaai.com/servicios",
  },
};

const SERVICES_DETAIL = [
  {
    id: "formaciones",
    number: "01",
    title: "Formaciones IA Empresariales",
    tagline: "Tu equipo domina IA en semanas, no meses",
    duration: "2–4 semanas",
    description:
      "Capacitaciones prácticas adaptadas a tu industria. Directivos que necesitan saber qué pedirle a la IA y qué no. Equipos operativos que necesitan herramientas concretas para su trabajo del día a día.",
    formats: [
      "Sesiones mensuales de acompañamiento",
      "Workshops intensivos de un día",
      "Webinars temáticos",
      "Talleres prácticos con herramientas IA",
    ],
    results: [
      "Equipos usando IA en su trabajo desde la primera sesión",
      "Lista concreta de dónde aplicar IA en tu operación específica",
      "Lo que tomaba meses de ensayo y error, resuelto en semanas",
    ],
  },
  {
    id: "automatizacion",
    number: "02",
    title: "Automatización de Procesos con IA",
    tagline: "Procesos que tomaban horas, resueltos en minutos",
    duration: "4–8 semanas",
    description:
      "Identificamos los procesos que más tiempo y dinero consumen en tu operación. Diseñamos e implementamos flujos automatizados que se integran con tus sistemas actuales — ERP, CRM, herramientas de comunicación.",
    formats: [
      "Diagnóstico de procesos automatizables",
      "Diseño de arquitectura de automatización",
      "Implementación e integración con sistemas existentes",
      "Capacitación y puesta en marcha",
    ],
    results: [
      "Hasta 80% de reducción en tiempo de procesos repetitivos",
      "Eliminación de errores manuales en flujos críticos",
      "ROI visible desde las primeras semanas de operación",
    ],
  },
  {
    id: "soluciones",
    number: "03",
    title: "Soluciones IA a Medida",
    tagline: "Sistemas que tu equipo puede usar desde el día 1",
    duration: "3–8 semanas",
    description:
      "Arquitectura y construcción de soluciones digitales con IA integrada. Desde sitios web inteligentes con chatbots y personalización, hasta agentes de IA y plataformas de aprendizaje adaptativo.",
    formats: [
      "Webs inteligentes con IA integrada",
      "Agentes de IA y asistentes conversacionales",
      "Sistemas RAG y bases de conocimiento",
      "Plataformas de aprendizaje con IA",
    ],
    results: [
      "Soluciones funcionando en 3-8 semanas",
      "Tecnología que el equipo adopta sin fricción",
      "Sistemas escalables que crecen con tu empresa",
    ],
  },
  {
    id: "diagnostico",
    number: "04",
    title: "Diagnóstico y Consultoría Estratégica IA",
    tagline: "Claridad antes de invertir",
    duration: "2–4 semanas",
    acreditable: true,
    description:
      "Antes de construir, hay que entender. Analizamos tu operación, identificamos los puntos de mayor impacto, y te entregamos un roadmap priorizado. Sabrás exactamente dónde invertir y qué retorno esperar.",
    formats: [
      "Diagnóstico de procesos con entrevistas y mapeo",
      "Identificación de oportunidades de IA por área",
      "Roadmap priorizado con estimaciones de impacto",
      "Advisory mensual para ejecutar el plan",
    ],
    results: [
      "Sabes exactamente dónde invertir y cuánto retorno esperar",
      "Decisiones de inversión con datos, no con corazonadas",
      "Un roadmap con prioridades reales, no una lista de deseos",
    ],
  },
];

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Servicios de Consultoría IA — Onza",
  itemListElement: SERVICES_DETAIL.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.title,
      description: s.description,
      provider: {
        "@type": "Organization",
        name: "Onza",
        url: "https://onzaai.com",
      },
      areaServed: "LATAM",
      url: `https://onzaai.com/servicios#${s.id}`,
    },
  })),
};

export default function ServiciosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />

      {/* Header */}
      <Section dark className="pt-32 pb-16">
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-brand-red" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-brand-red font-display">
              Servicios
            </span>
          </div>
        </Reveal>
        <TextReveal
          as="h1"
          className="text-hero-mobile md:text-hero font-light max-w-4xl"
        >
          Cuatro formas de transformar tu operación con IA
        </TextReveal>
      </Section>

      {/* Service Details */}
      {SERVICES_DETAIL.map((service, i) => (
        <Section key={service.id} id={service.id} cream={i % 2 === 1}>
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-xs text-brand-red tracking-[0.3em] font-display">
                    {service.number}
                  </span>
                  <span className="text-xs text-brand-gray tracking-[0.15em] font-display uppercase border border-gray-200 px-2 py-0.5">
                    {service.duration}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-light mt-1 mb-4">
                  {service.title}
                </h2>
                <p className="text-xl text-brand-red font-light mb-6">
                  {service.tagline}
                </p>
                <p className="text-brand-gray leading-relaxed">
                  {service.description}
                </p>
                {"acreditable" in service && service.acreditable && (
                  <p className="mt-5 text-sm text-brand-gray border-l-2 border-brand-gold pl-4">
                    El costo del diagnóstico se acredita al 100% si contratas
                    la implementación.
                  </p>
                )}
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xs tracking-[0.15em] uppercase text-brand-gray mb-4">
                    Qué incluye
                  </h3>
                  <ul className="space-y-3">
                    {service.formats.map((f) => (
                      <li
                        key={f}
                        className="flex gap-3 items-start text-brand-dark"
                      >
                        <span className="text-brand-red mt-1.5 text-xs">
                          ●
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs tracking-[0.15em] uppercase text-brand-gray mb-4">
                    Resultados esperados
                  </h3>
                  <ul className="space-y-3">
                    {service.results.map((r) => (
                      <li
                        key={r}
                        className="flex gap-3 items-start text-brand-dark"
                      >
                        <span className="text-brand-gold mt-1.5 text-xs">
                          ▸
                        </span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
          <LineReveal color={i % 2 === 1 ? "bg-gray-300/30" : "bg-gray-200"} />
        </Section>
      ))}

      {/* CTA */}
      <Section dark className="text-center relative overflow-hidden">
        <div className="noise-overlay" />
        <div className="relative z-10">
          <TextReveal
            as="h2"
            className="text-section-mobile md:text-section font-light mb-6 max-w-2xl mx-auto"
          >
            ¿No sabes por dónde empezar?
          </TextReveal>
          <Reveal delay={0.2}>
            <p className="text-[#777] mb-10 max-w-xl mx-auto leading-relaxed">
              Un diagnóstico rápido nos da la claridad. En una conversación
              identificamos las oportunidades de mayor impacto para tu operación.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <MagneticButton
              href="/contacto"
              className="px-10 py-4 text-sm bg-brand-red text-white hover:bg-red-600"
            >
              Agenda tu diagnóstico
            </MagneticButton>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
