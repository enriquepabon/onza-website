import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { LineReveal } from "@/components/ui/line-reveal";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "IA para Manufactura y Producción en LATAM — Onza",
  description:
    "Inteligencia artificial para plantas de manufactura: mantenimiento predictivo, control de calidad visual, reportería automatizada y optimización de procesos productivos.",
  openGraph: {
    title: "IA para Manufactura y Producción en LATAM — Onza",
    description:
      "Mantenimiento predictivo, calidad visual, reportería automatizada. IA que genera ROI en manufactura.",
    url: "https://onzaai.com/industrias/manufactura",
  },
  keywords: [
    "IA manufactura LATAM",
    "inteligencia artificial producción",
    "mantenimiento predictivo IA",
    "control calidad inteligencia artificial",
    "automatización manufactura Colombia",
  ],
  alternates: {
    canonical: "https://onzaai.com/industrias/manufactura",
  },
};

const USE_CASES = [
  {
    title: "Mantenimiento predictivo",
    description:
      "Los equipos generan señales antes de fallar: vibración, temperatura, consumo eléctrico. Un modelo entrenado con tu historial anticipa problemas semanas antes de que ocurran.",
    metric: "$5-50M",
    metricLabel: "COP/hora de parada no planificada evitada",
  },
  {
    title: "Control de calidad visual",
    description:
      "Un sistema de visión con IA inspecciona cada pieza con el mismo criterio, 24 horas al día. Detecta microgrietas, variaciones de color y dimensiones fuera de tolerancia.",
    metric: "40-60%",
    metricLabel: "reducción de defectos que llegan al cliente",
  },
  {
    title: "Reportería automatizada",
    description:
      "Los reportes de producción que tu equipo arma a mano todos los días, extraídos de 4 sistemas y formateados en Excel. Automatizados, consistentes y distribuidos sin intervención.",
    metric: "2-4h",
    metricLabel: "liberadas diariamente del equipo",
  },
  {
    title: "Optimización de parámetros",
    description:
      "Un modelo que analiza la relación entre parámetros de proceso y resultados de calidad sugiere la configuración óptima. El operador nuevo rinde como el experimentado, más rápido.",
    metric: "15-20%",
    metricLabel: "mejora en rendimiento de línea",
  },
];

const FAQ = [
  {
    question: "¿Necesito sensores IoT para empezar?",
    answer:
      "Depende del caso de uso. Para mantenimiento predictivo, sí necesitas sensores en los equipos críticos. Si no los tienes, el primer paso es instalarlos. Para reportería automatizada o control de calidad, no necesitas sensores adicionales.",
  },
  {
    question: "¿Funciona con los sistemas que ya tenemos?",
    answer:
      "Sí. Nos integramos con SAP, Oracle, Siesa, sistemas SCADA, PLCs y bases de datos de producción. La solución se conecta a lo que ya tienes, no lo reemplaza.",
  },
  {
    question: "¿La IA puede operar equipos de forma autónoma?",
    answer:
      "Hoy no lo recomendamos. Los datos no son lo suficientemente limpios y las consecuencias de un error son demasiado caras. Lo que funciona es IA como herramienta de apoyo: sugiere parámetros, alerta sobre anomalías, genera reportes. El operador decide.",
  },
  {
    question: "¿Cuánto toma ver resultados?",
    answer:
      "La reportería automatizada genera impacto en 4 semanas. El control de calidad visual toma 6-8 semanas. El mantenimiento predictivo requiere 8-12 semanas porque necesita datos históricos de fallas para entrenar el modelo.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "IA para Manufactura y Producción",
  description:
    "Inteligencia artificial para plantas de manufactura en LATAM: mantenimiento predictivo, control de calidad visual, reportería automatizada y optimización de procesos.",
  provider: {
    "@type": "Organization",
    name: "Onza",
    url: "https://onzaai.com",
  },
  areaServed: ["CO", "MX", "PE", "CL", "AR", "UY"],
  url: "https://onzaai.com/industrias/manufactura",
};

export default function ManufacturaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", href: "/" },
          { name: "Industrias", href: "/industrias/manufactura" },
          { name: "Manufactura", href: "/industrias/manufactura" },
        ]}
      />
      <FAQJsonLd items={FAQ} />

      <Section dark className="pt-32 pb-16">
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-brand-red" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-brand-red font-display">
              Industria
            </span>
          </div>
        </Reveal>
        <TextReveal
          as="h1"
          className="text-hero-mobile md:text-hero font-light max-w-4xl"
        >
          Inteligencia artificial para manufactura y producción
        </TextReveal>
        <Reveal delay={0.3}>
          <p className="text-lg text-[#555] max-w-xl leading-relaxed mt-8 font-light">
            La manufactura genera datos todo el día. Sensores, registros de
            producción, reportes de calidad. Cuando empiezas a cruzarlos con
            IA, aparecen cosas interesantes.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mt-10">
            <MagneticButton
              href="/contacto?utm_source=industria-manufactura&utm_medium=cta&utm_content=hero"
              className="px-10 py-4 bg-brand-red text-white hover:bg-red-600 text-sm"
            >
              Agenda una conversación
            </MagneticButton>
          </div>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-brand-red" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-brand-red font-display">
              Casos de uso
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-light mb-16">
            Donde la IA ya genera ROI en manufactura
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {USE_CASES.map((uc, i) => (
            <Reveal key={uc.title} delay={i * 0.08}>
              <div className="py-8">
                <div className="flex items-baseline gap-4 mb-4">
                  <p className="text-3xl font-light text-brand-red">
                    {uc.metric}
                  </p>
                  <p className="text-xs text-brand-gray tracking-wide uppercase">
                    {uc.metricLabel}
                  </p>
                </div>
                <h3 className="text-xl font-light text-brand-dark mb-3">
                  {uc.title}
                </h3>
                <p className="text-sm text-brand-gray leading-relaxed">
                  {uc.description}
                </p>
              </div>
              <LineReveal />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-brand-red" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-brand-red font-display">
              Preguntas frecuentes
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-light mb-12">
            Sobre IA en manufactura
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

      <Section dark className="text-center relative overflow-hidden">
        <div className="noise-overlay" />
        <div className="relative z-10">
          <TextReveal
            as="h2"
            className="text-section-mobile md:text-section font-light mb-6 max-w-2xl mx-auto"
          >
            ¿Tu planta genera datos que nadie está aprovechando?
          </TextReveal>
          <Reveal delay={0.2}>
            <p className="text-[#777] mb-10 max-w-xl mx-auto leading-relaxed">
              En 30 minutos evaluamos dónde la IA puede generar mayor impacto
              en tu operación productiva.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <MagneticButton
              href="/contacto?utm_source=industria-manufactura&utm_medium=cta&utm_content=cta-final"
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
