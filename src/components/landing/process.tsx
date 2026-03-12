import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/ui/fade-in";

const STEPS = [
  {
    number: "01",
    title: "Descubrimiento",
    description:
      "Entendemos tu dolor, mapeamos procesos, definimos alcance.",
  },
  {
    number: "02",
    title: "Diseño",
    description:
      "Arquitectura de la solución con blueprint visual claro.",
  },
  {
    number: "03",
    title: "Construcción",
    description:
      "Desarrollo e implementación con las mejores herramientas de IA.",
  },
  {
    number: "04",
    title: "Entrega + Adopción",
    description:
      "Deploy, capacitación a tu equipo, documentación completa.",
  },
  {
    number: "05",
    title: "Soporte",
    description: "Ajustes post-launch y acompañamiento continuo.",
  },
];

export function Process() {
  return (
    <Section>
      <FadeIn>
        <p className="text-sm tracking-widest uppercase text-brand-gray mb-4">
          Cómo trabajamos
        </p>
        <h2 className="text-section-mobile md:text-section font-light mb-16 max-w-3xl">
          De la idea al impacto en 3 a 8 semanas
        </h2>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {STEPS.map((step, i) => (
          <FadeIn key={step.number} delay={i * 0.1}>
            <div className="relative">
              <span className="text-6xl font-light text-gray-100 absolute -top-4 -left-2">
                {step.number}
              </span>
              <div className="relative pt-10">
                <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                <p className="text-sm text-brand-gray leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
