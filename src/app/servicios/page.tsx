import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { LineReveal } from "@/components/ui/line-reveal";

export const metadata: Metadata = {
  title: "Servicios — Onza",
  description:
    "Formaciones IA, automatización de procesos, soluciones a medida y consultoría estratégica. Transformamos operaciones con impacto medible.",
};

const SERVICES_DETAIL = [
  {
    id: "formaciones",
    number: "01",
    title: "Formaciones IA Empresariales",
    tagline: "Tu equipo domina IA en semanas, no meses",
    description:
      "Capacitaciones prácticas adaptadas a tu industria y nivel de madurez digital. Desde directivos que necesitan visión estratégica hasta equipos operativos que necesitan herramientas concretas.",
    formats: [
      "Sesiones mensuales de acompañamiento",
      "Workshops intensivos de un día",
      "Webinars temáticos",
      "Talleres prácticos con herramientas IA",
    ],
    results: [
      "Equipos usando IA en su día a día desde la primera sesión",
      "Identificación de quick wins específicos para tu operación",
      "Reducción de curva de aprendizaje de meses a semanas",
    ],
  },
  {
    id: "automatizacion",
    number: "02",
    title: "Automatización de Procesos con IA",
    tagline: "Procesos que tomaban horas, resueltos en minutos",
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
    description:
      "Antes de construir, hay que entender. Analizamos tu operación, identificamos los puntos de mayor impacto, y te entregamos un roadmap priorizado. Sabrás exactamente dónde invertir y qué retorno esperar.",
    formats: [
      "Diagnóstico de procesos con entrevistas y mapeo",
      "Identificación de quick wins y oportunidades de IA",
      "Roadmap priorizado con estimaciones de impacto",
      "Advisory mensual para ejecutar el plan",
    ],
    results: [
      "Visibilidad completa de oportunidades de IA en tu operación",
      "Decisiones de inversión basadas en datos, no en intuición",
      "Roadmap accionable con prioridades claras",
    ],
  },
];

export default function ServiciosPage() {
  return (
    <>
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
                <span className="text-xs text-brand-red tracking-[0.3em] font-display">
                  {service.number}
                </span>
                <h2 className="text-3xl md:text-4xl font-light mt-3 mb-4">
                  {service.title}
                </h2>
                <p className="text-xl text-brand-red font-light mb-6">
                  {service.tagline}
                </p>
                <p className="text-brand-gray leading-relaxed">
                  {service.description}
                </p>
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
