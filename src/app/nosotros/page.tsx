import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Nosotros — Onza",
  description:
    "Firma boutique de consultoría en arquitectura de soluciones IA. 15+ años de experiencia transformando operaciones en LATAM.",
};

const EXPERIENCE = [
  {
    company: "General Motors",
    role: "Project Manager Manufactura",
    highlight: "Proyectos por ~$43M USD",
  },
  {
    company: "Owens-Illinois",
    role: "Controller Financiero de Planta",
    highlight: "Reducción 20% costo/tonelada",
  },
  {
    company: "Avicanna",
    role: "Director de Supply Chain",
    highlight: "+$15M USD en compras",
  },
  {
    company: "YVY Life Sciences",
    role: "Gerente de Operaciones → GM Colombia",
    highlight: "Apertura de mercados Uruguay, Colombia, Suiza",
  },
  {
    company: "Medcann Pharma",
    role: "Gerente Desarrollo de Negocios",
    highlight: "Cartera +300% en primer año",
  },
];

export default function NosotrosPage() {
  return (
    <>
      {/* Header */}
      <Section dark className="pt-32 pb-16">
        <FadeIn>
          <p className="text-sm tracking-widest uppercase text-gray-400 mb-4">
            Nosotros
          </p>
          <h1 className="text-hero-mobile md:text-hero font-light max-w-4xl">
            Construimos soluciones de IA con mentalidad de operador
          </h1>
        </FadeIn>
      </Section>

      {/* Story */}
      <Section narrow>
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-3">
              <h2 className="text-3xl font-light mb-8">
                No somos consultores teóricos. Hemos estado en planta.
              </h2>
              <div className="space-y-6 text-brand-gray leading-relaxed">
                <p>
                  Onza nace de una convicción: la inteligencia artificial solo
                  genera valor cuando alguien entiende la operación. No basta
                  con saber de tecnología — hay que saber de negocio, de
                  procesos, de personas.
                </p>
                <p>
                  Nuestro fundador, Enrique Pabón, es Ingeniero Industrial de
                  la Universidad de los Andes con MBA de EAE Business School en
                  Madrid. Ha liderado operaciones, supply chain y
                  transformación en multinacionales durante más de 15 años.
                </p>
                <p>
                  Ha negociado convenciones colectivas, ejecutado proyectos de
                  capital por decenas de millones de dólares, abierto mercados
                  en tres continentes y construido equipos desde cero. Esa
                  experiencia es lo que hace diferente a Onza: diseñamos IA que
                  resuelve problemas reales de operación, no demos para
                  impresionar en una sala de juntas.
                </p>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="bg-brand-cream p-8 space-y-2">
                <p className="text-xs tracking-widest uppercase text-brand-gray mb-4">
                  Credenciales
                </p>
                <p className="text-sm text-brand-dark">
                  Ing. Industrial — Universidad de los Andes
                </p>
                <p className="text-sm text-brand-dark">
                  MBA — EAE Business School, Madrid
                </p>
                <p className="text-sm text-brand-dark">
                  15+ años en operaciones y transformación
                </p>
                <p className="text-sm text-brand-dark">
                  Bilingüe español/inglés
                </p>
                <p className="text-sm text-brand-dark">
                  Colombia + LATAM + Europa
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* Experience */}
      <Section cream>
        <FadeIn>
          <p className="text-sm tracking-widest uppercase text-brand-gray mb-4">
            Trayectoria
          </p>
          <h2 className="text-section-mobile md:text-section font-light mb-12 max-w-3xl">
            Experiencia real en sectores complejos
          </h2>
        </FadeIn>

        <div className="space-y-6">
          {EXPERIENCE.map((exp, i) => (
            <FadeIn key={exp.company} delay={i * 0.08}>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 border-b border-gray-300/50 pb-6">
                <h3 className="text-lg font-medium md:w-48 shrink-0">
                  {exp.company}
                </h3>
                <p className="text-brand-gray md:flex-1">{exp.role}</p>
                <p className="text-sm text-brand-red md:text-right shrink-0">
                  {exp.highlight}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Values */}
      <Section narrow>
        <FadeIn>
          <h2 className="text-section-mobile md:text-section font-light mb-12 max-w-3xl">
            Cómo pensamos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <h3 className="text-lg font-medium mb-3">
                Impacto sobre tecnología
              </h3>
              <p className="text-brand-gray leading-relaxed text-sm">
                La IA es un medio, no un fin. Cada decisión se mide por su
                impacto en la operación y las finanzas del cliente.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3">
                Claridad sobre complejidad
              </h3>
              <p className="text-brand-gray leading-relaxed text-sm">
                Simplificamos lo complejo. Nuestros clientes entienden
                exactamente qué estamos construyendo y por qué.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3">
                Resultados sobre promesas
              </h3>
              <p className="text-brand-gray leading-relaxed text-sm">
                Entregamos sistemas funcionando, no presentaciones con
                recomendaciones. El equipo usa la solución desde el día 1.
              </p>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* CTA */}
      <Section dark className="text-center">
        <FadeIn>
          <h2 className="text-section-mobile md:text-section font-light mb-6 max-w-2xl mx-auto">
            ¿Quieres saber cómo aplicamos esto en tu empresa?
          </h2>
          <Button href="/contacto" size="lg">
            Conversemos
          </Button>
        </FadeIn>
      </Section>
    </>
  );
}
