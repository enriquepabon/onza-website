import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/ui/fade-in";

const STATS = [
  {
    value: "$40,500M",
    label: "Mercado IA en LATAM 2026",
    sublabel: "CAGR 37% hasta 2034",
  },
  {
    value: "95%",
    label: "de pilotos de IA no generan resultados medibles",
    sublabel: "El problema es integración, no tecnología",
  },
  {
    value: "54%",
    label: "de empresas colombianas aumentará inversión en IA",
    sublabel: "La pregunta no es si, sino cómo",
  },
  {
    value: "33%",
    label: "no sabe cómo integrar IA en sus procesos",
    sublabel: "Ahí es donde entramos nosotros",
  },
];

export function Stats() {
  return (
    <Section dark>
      <FadeIn>
        <p className="text-sm tracking-widest uppercase text-gray-500 mb-4">
          El contexto
        </p>
        <h2 className="text-section-mobile md:text-section font-light mb-16 max-w-3xl">
          La IA está transformando LATAM. La pregunta es si tu empresa lidera o
          se queda atrás.
        </h2>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {STATS.map((stat, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div>
              <p className="text-4xl md:text-5xl font-light text-brand-red mb-3">
                {stat.value}
              </p>
              <p className="text-sm text-gray-300 leading-relaxed">
                {stat.label}
              </p>
              <p className="text-xs text-gray-500 mt-2">{stat.sublabel}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
