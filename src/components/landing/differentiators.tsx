import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/ui/fade-in";

const DIFFERENTIATORS = [
  {
    title: "Perfil híbrido negocio + tecnología",
    description:
      "Ingeniero Industrial con MBA y 15 años liderando operaciones en multinacionales. Diseñamos soluciones de IA que resuelven problemas reales de negocio, no demos bonitas.",
  },
  {
    title: "Hablamos el idioma del negocio",
    description:
      "No llegamos con jerga técnica. Llegamos con: cuántas horas pierdes en esto, cuánto te cuesta este error, en cuánto tiempo ves retorno. El CFO entiende, el COO entiende.",
  },
  {
    title: "Delivery rápido y eficiente",
    description:
      "Usamos las herramientas de IA más avanzadas del mercado para entregar soluciones en semanas, no meses. Resultados rápidos, sin burocracia.",
  },
  {
    title: "Experiencia real en sectores complejos",
    description:
      "Manufactura, supply chain, farmacéutica. Hemos estado en planta, hemos negociado con sindicatos, hemos abierto mercados desde cero.",
  },
  {
    title: "Entregamos soluciones funcionando",
    description:
      "Cada proyecto termina con algo que tu equipo puede usar desde el día 1. No con un PDF de recomendaciones.",
  },
];

export function Differentiators() {
  return (
    <Section cream>
      <FadeIn>
        <p className="text-sm tracking-widest uppercase text-brand-gray mb-4">
          Por qué Onza
        </p>
        <h2 className="text-section-mobile md:text-section font-light mb-16 max-w-3xl">
          No somos una agencia. Somos tu socio estratégico en IA.
        </h2>
      </FadeIn>

      <div className="space-y-8">
        {DIFFERENTIATORS.map((item, i) => (
          <FadeIn key={i} delay={i * 0.08}>
            <div className="flex gap-6 md:gap-10 items-start border-b border-gray-300/50 pb-8">
              <span className="text-xs text-brand-gray tracking-widest mt-1 shrink-0 w-8">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-xl font-light mb-2">{item.title}</h3>
                <p className="text-brand-gray leading-relaxed max-w-2xl">
                  {item.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
