import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/ui/fade-in";
import Link from "next/link";

const SERVICES = [
  {
    number: "01",
    title: "Formaciones IA",
    subtitle: "Empresariales",
    description:
      "Tu equipo domina IA en semanas, no meses. Sesiones prácticas adaptadas a tu industria y nivel de madurez digital.",
    impact: "Equipos 3x más productivos con herramientas IA",
  },
  {
    number: "02",
    title: "Automatización",
    subtitle: "de Procesos",
    description:
      "Identificamos los procesos que más tiempo y dinero consumen. Diseñamos flujos automatizados que se integran con tus sistemas actuales.",
    impact: "Hasta 80% de reducción en tiempo de procesos repetitivos",
  },
  {
    number: "03",
    title: "Soluciones IA",
    subtitle: "a Medida",
    description:
      "Desde webs inteligentes hasta agentes de IA y plataformas de aprendizaje. Sistemas que tu equipo puede usar desde el día 1.",
    impact: "Soluciones funcionando en 3-8 semanas",
  },
  {
    number: "04",
    title: "Diagnóstico",
    subtitle: "Estratégico IA",
    description:
      "Descubre exactamente dónde la IA genera más impacto en tu operación. Diagnóstico de procesos con roadmap priorizado.",
    impact: "Claridad antes de invertir — ROI desde la primera decisión",
  },
];

export function ServicesOverview() {
  return (
    <Section>
      <FadeIn>
        <p className="text-sm tracking-widest uppercase text-brand-gray mb-4">
          Servicios
        </p>
        <h2 className="text-section-mobile md:text-section font-light mb-16 max-w-3xl">
          Cuatro formas de transformar tu operación con inteligencia artificial
        </h2>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200">
        {SERVICES.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1}>
            <div className="bg-white p-8 md:p-12 group">
              <span className="text-xs text-brand-gray tracking-widest">
                {service.number}
              </span>
              <h3 className="text-2xl font-light mt-3 mb-1">
                {service.title}
              </h3>
              <p className="text-lg text-brand-gray font-light mb-4">
                {service.subtitle}
              </p>
              <p className="text-brand-gray leading-relaxed mb-6">
                {service.description}
              </p>
              <p className="text-sm text-brand-red font-medium">
                {service.impact}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.4}>
        <div className="mt-12 text-center">
          <Link
            href="/servicios"
            className="text-sm tracking-wide uppercase text-brand-dark hover:text-brand-red transition-colors border-b border-brand-dark hover:border-brand-red pb-1"
          >
            Ver detalle de servicios →
          </Link>
        </div>
      </FadeIn>
    </Section>
  );
}
