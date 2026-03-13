import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { LineReveal } from "@/components/ui/line-reveal";

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
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-brand-red" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-brand-red font-display">
              Nosotros
            </span>
          </div>
        </Reveal>
        <TextReveal
          as="h1"
          className="text-hero-mobile md:text-hero font-light max-w-4xl"
        >
          Construimos soluciones de IA con mentalidad de operador
        </TextReveal>
      </Section>

      {/* Story */}
      <Section narrow>
        <Reveal>
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
                <p className="text-xs tracking-[0.15em] uppercase text-brand-gray mb-4">
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
        </Reveal>
      </Section>

      {/* Experience */}
      <Section cream>
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-brand-red" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-brand-red font-display">
              Trayectoria
            </span>
          </div>
        </Reveal>
        <TextReveal
          as="h2"
          className="text-section-mobile md:text-section font-light mb-12 max-w-3xl"
        >
          Experiencia real en sectores complejos
        </TextReveal>

        <div className="space-y-0">
          {EXPERIENCE.map((exp, i) => (
            <Reveal key={exp.company} delay={i * 0.08}>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 py-6">
                <h3 className="text-lg font-medium md:w-48 shrink-0">
                  {exp.company}
                </h3>
                <p className="text-brand-gray md:flex-1">{exp.role}</p>
                <p className="text-sm text-brand-red md:text-right shrink-0">
                  {exp.highlight}
                </p>
              </div>
              <LineReveal color="bg-gray-300/30" />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Values */}
      <Section narrow>
        <TextReveal
          as="h2"
          className="text-section-mobile md:text-section font-light mb-12 max-w-3xl"
        >
          Cómo pensamos
        </TextReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Impacto sobre tecnología",
              text: "La IA es un medio, no un fin. Cada decisión se mide por su impacto en la operación y las finanzas del cliente.",
            },
            {
              title: "Claridad sobre complejidad",
              text: "Simplificamos lo complejo. Nuestros clientes entienden exactamente qué estamos construyendo y por qué.",
            },
            {
              title: "Resultados sobre promesas",
              text: "Entregamos sistemas funcionando, no presentaciones con recomendaciones. El equipo usa la solución desde el día 1.",
            },
          ].map((value, i) => (
            <Reveal key={value.title} delay={i * 0.1}>
              <div className="group bg-white p-8 hover:bg-brand-dark transition-colors duration-700 cursor-default border border-gray-100">
                <h3 className="text-lg font-medium mb-3 group-hover:text-white transition-colors duration-700">
                  {value.title}
                </h3>
                <p className="text-brand-gray leading-relaxed text-sm group-hover:text-[#969696] transition-colors duration-700">
                  {value.text}
                </p>
              </div>
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
            ¿Quieres saber cómo aplicamos esto en tu empresa?
          </TextReveal>
          <Reveal delay={0.2}>
            <MagneticButton
              href="/contacto"
              className="px-10 py-4 text-sm bg-brand-red text-white hover:bg-red-600"
            >
              Conversemos
            </MagneticButton>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
