import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { BreadcrumbJsonLd, FAQJsonLd, JsonLd } from "@/components/seo/json-ld";
import { LeadForm } from "./lead-form";

const TITULO = "Cobrador digital | Onza";
const DESCRIPCION =
  "Cobra cada factura vencida con sistema: estados de cuenta, acuerdos de pago y conciliación contra tu banco. Tu equipo solo aprueba.";
const URL = "https://onzaai.com/cobrador";
const IMAGEN_OG = {
  url: "https://onzaai.com/og/cobrador.jpg",
  width: 1200,
  height: 630,
  alt: "Contrata tu primer cobrador digital · Onza",
};

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRIPCION,
  openGraph: {
    title: "Contrata tu primer cobrador digital",
    description: DESCRIPCION,
    url: URL,
    siteName: "Onza",
    locale: "es_CO",
    type: "website",
    images: [IMAGEN_OG],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contrata tu primer cobrador digital",
    description: DESCRIPCION,
    images: [IMAGEN_OG.url],
  },
  alternates: { canonical: URL },
};

const PASOS = [
  {
    titulo: "Nos entregas tu cartera vencida.",
    texto: "Un Excel exportado de tu sistema y listo: no tocamos tu ERP.",
  },
  {
    titulo: "El cobrador diagnostica cada factura.",
    texto:
      "¿Está frenada por un trámite, por una disputa, por caja del cliente o por costumbre? Cada causa tiene su tratamiento.",
  },
  {
    titulo: "Cobra a nombre de tu empresa.",
    texto:
      "Por correo y WhatsApp, con tu jefe de cartera aprobando. Nunca llama a tus clientes: las llamadas las hace tu gente, con la ficha lista.",
  },
  {
    titulo: "Cada mes recibes el libro de resultados.",
    texto:
      "Lo recuperado, conciliado contra tu extracto bancario. Si no está en el banco, no cuenta.",
  },
];

const NUNCA = [
  "Nunca contacta referencias personales.",
  "Nunca escribe fuera del horario legal.",
  "Nunca negocia más de lo que tú autorices.",
];

const PRECIOS = [
  {
    concepto: "Arranque",
    valor: "$2.000.000",
    unidad: "COP",
    detalle: "Incluye diagnóstico completo de tu cartera y puesta en marcha.",
  },
  {
    concepto: "Mensualidad",
    valor: "$1.200.000",
    unidad: "COP",
    detalle: "Sin contrato de permanencia.",
  },
  {
    concepto: "Variable",
    valor: "20%",
    unidad: "",
    detalle: "De lo recuperado de cartera vencida, conciliado contra tu banco.",
  },
];

const FAQ = [
  {
    question: "¿Mis clientes sabrán que es un tercero?",
    answer:
      "No. El correo sale de un buzón de tu dominio y el WhatsApp va a nombre de tu empresa. Onza opera por detrás.",
  },
  {
    question: "¿Qué pasa si una factura está en disputa?",
    answer:
      "Se saca del cobro, se documenta y se gestiona aparte. Lo no disputado se cobra de inmediato.",
  },
  {
    question: "¿Cómo sé cuánto recuperaron de verdad?",
    answer:
      "Todo se concilia contra tu extracto bancario. El 20% se calcula solo sobre lo conciliado.",
  },
  {
    question: "¿Hay contrato de permanencia?",
    answer: "No. Es mensual, con un piloto de 30 a 60 días.",
  },
  {
    question: "¿Qué necesito entregar para empezar?",
    answer:
      "Un Excel con tu cartera, el extracto del banco y una persona tuya que apruebe. Nada más.",
  },
];

// Ejemplo del diagnóstico por factura que se ve en el hero. Montos ficticios.
const FICHAS = [
  {
    factura: "FV-10482",
    dias: 47,
    monto: "$12,4 M",
    causa: "Trámite",
    tono: "border-brand-gold/50 text-brand-gold",
    motivo: "Falta la orden de compra",
    accion: "Pedirla al área de compras",
  },
  {
    factura: "FV-10517",
    dias: 63,
    monto: "$8,9 M",
    causa: "Disputa",
    tono: "border-brand-red/50 text-brand-red",
    motivo: "Diferencia en cantidades",
    accion: "Sale del cobro y se documenta",
  },
  {
    factura: "FV-10533",
    dias: 92,
    monto: "$21,0 M",
    causa: "Caja",
    tono: "border-brand-cream/40 text-brand-cream",
    motivo: "El cliente pidió plazo",
    accion: "Acuerdo de pago en 3 cuotas",
  },
  {
    factura: "FV-10561",
    dias: 38,
    monto: "$4,2 M",
    causa: "Costumbre",
    tono: "border-[#555] text-[#999]",
    motivo: "Paga cuando le recuerdan",
    accion: "Recordatorio por WhatsApp",
  },
];

// Segundo bloque, apagado al lanzar. Si la compuerta del 11-nov falla y el
// 12-nov la oferta pasa a 3 cargos, llena OTROS_CARGOS con los dos cargos
// nuevos y cambia MOSTRAR_OTROS_CARGOS a true. Con la lista vacía no se pinta.
const MOSTRAR_OTROS_CARGOS = false;
const OTROS_CARGOS: { cargo: string; descripcion: string }[] = [
  // { cargo: "…", descripcion: "…" },
];

const servicioSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Cobrador digital",
  serviceType: "Cobranza de cartera B2B",
  description: DESCRIPCION,
  provider: { "@type": "Organization", name: "Onza", url: "https://onzaai.com" },
  areaServed: { "@type": "Country", name: "Colombia" },
  url: URL,
  offers: {
    "@type": "Offer",
    priceCurrency: "COP",
    price: "1200000",
    description:
      "Mensualidad de $1.200.000 COP, arranque de $2.000.000 COP y 20% de lo recuperado conciliado contra el banco.",
  },
};

function Kicker({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="h-px w-8 bg-brand-red" />
      <span className="text-[10px] tracking-[0.3em] uppercase font-display text-brand-red">
        {children}
      </span>
    </div>
  );
}

function BotonDiagnostico({ className = "" }: { className?: string }) {
  return (
    <a
      href="#diagnostico"
      className={`inline-flex items-center justify-center px-8 py-4 bg-brand-red text-white text-sm tracking-[0.12em] uppercase hover:bg-red-600 transition-colors text-center ${className}`}
    >
      Quiero saber cuánto puedo recuperar
    </a>
  );
}

function FichaEjemplo() {
  return (
    <div className="border border-[#1F1F1F] bg-[#101010]">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#1F1F1F]">
        <p className="text-[10px] tracking-[0.25em] uppercase text-[#888]">
          Diagnóstico por factura
        </p>
        <p className="text-[10px] tracking-[0.25em] uppercase text-[#555]">Ejemplo</p>
      </div>
      <ul>
        {FICHAS.map((f) => (
          <li key={f.factura} className="px-5 py-4 border-b border-[#1A1A1A]">
            <div className="flex items-baseline justify-between gap-4 text-xs text-[#777] tabular-nums">
              <span>
                {f.factura} · {f.dias} días
              </span>
              <span className="text-white text-sm">{f.monto}</span>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span
                className={`border px-2 py-0.5 text-[10px] tracking-[0.15em] uppercase ${f.tono}`}
              >
                {f.causa}
              </span>
              <span className="text-sm text-[#bbb]">{f.motivo}</span>
            </div>
            <p className="mt-1.5 text-xs text-[#666]">→ {f.accion}</p>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between gap-4 px-5 py-4">
        <p className="text-xs text-[#999] leading-snug">
          3 mensajes listos
          <span className="block text-[#555]">Esperan tu aprobación</span>
        </p>
        <span
          className="px-4 py-2 text-[10px] tracking-[0.2em] uppercase bg-white text-brand-black"
          aria-hidden="true"
        >
          Aprobar
        </span>
      </div>
    </div>
  );
}

function OtrosCargos() {
  if (!MOSTRAR_OTROS_CARGOS || OTROS_CARGOS.length === 0) return null;
  return (
    <Section cream>
      <Reveal>
        <Kicker>Empleados digitales</Kicker>
        <h2 className="text-3xl md:text-4xl font-light mb-12 max-w-2xl">
          Otros empleados digitales
        </h2>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 border border-brand-dark">
          <p className="text-xs tracking-[0.15em] uppercase text-brand-red mb-3">Disponible</p>
          <h3 className="text-xl font-light mb-3">Cobrador digital</h3>
          <p className="text-sm text-brand-gray leading-relaxed">
            Cobra cada factura vencida con sistema y te firma cada mes cuánta plata entró.
          </p>
        </div>
        {OTROS_CARGOS.map((c) => (
          <div key={c.cargo} className="bg-white p-8">
            <h3 className="text-xl font-light mb-3">{c.cargo}</h3>
            <p className="text-sm text-brand-gray leading-relaxed">{c.descripcion}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default function CobradorPage() {
  return (
    <>
      <JsonLd data={servicioSchema} />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", href: "/" },
          { name: "Cobrador digital", href: "/cobrador" },
        ]}
      />
      <FAQJsonLd items={FAQ} />

      {/* 1. Hero: pinta con CSS para que el texto aparezca con el HTML,
          sin esperar a que cargue el JavaScript (llega desde WhatsApp). */}
      <section className="vx-hero relative overflow-hidden bg-brand-black text-white pt-28 pb-20 md:pt-40 md:pb-28">
        <div className="noise-overlay" />
        <div className="container-wide relative z-[2] grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-14 lg:gap-20 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="vx-rule h-px w-8 bg-brand-red" style={{ ["--d" as string]: "0.1s" }} />
              <span
                className="vx-kicker text-[10px] uppercase text-brand-red font-display"
                style={{ ["--d" as string]: "0.15s" }}
              >
                Cobranza B2B
              </span>
            </div>
            <h1 className="text-[2.1rem] leading-[1.12] min-[400px]:text-hero-mobile sm:text-6xl lg:text-hero font-light">
              <span className="vx-mask">
                <span className="vx-line" style={{ ["--d" as string]: "0.2s" }}>
                  Contrata tu primer
                </span>
              </span>
              <span className="vx-mask">
                <span className="vx-line" style={{ ["--d" as string]: "0.32s" }}>
                  cobrador digital
                </span>
              </span>
            </h1>
            <p
              className="vx-blur-in mt-8 max-w-xl text-lg md:text-xl text-[#9a9a9a] font-light leading-relaxed"
              style={{ ["--d" as string]: "0.5s" }}
            >
              Cobra cada factura vencida con sistema: estados de cuenta, acuerdos
              de pago y conciliación contra tu banco. Tu equipo solo aprueba. Y
              cada mes te firmamos cuánta plata entró.
            </p>
            <div
              className="vx-blur-in mt-10 flex flex-col sm:flex-row sm:items-center gap-5"
              style={{ ["--d" as string]: "0.65s" }}
            >
              <BotonDiagnostico className="w-full sm:w-auto" />
              <a
                href="#precio"
                className="text-xs tracking-[0.2em] uppercase text-[#888] hover:text-white transition-colors text-center"
              >
                Ver el precio
              </a>
            </div>
          </div>
          <div className="vx-blur-in" style={{ ["--d" as string]: "0.85s" }}>
            <FichaEjemplo />
          </div>
        </div>
      </section>

      {/* 2. El problema */}
      <Section narrow>
        <Reveal>
          <Kicker>El problema</Kicker>
          <p className="text-2xl md:text-4xl font-light leading-snug text-brand-dark">
            La cartera vencida no crece porque tus clientes sean malos.{" "}
            <span className="text-brand-gray">
              Crece porque nadie cobra con constancia: el auxiliar tiene diez
              tareas más, las promesas de pago se pierden en el chat y hay
              facturas frenadas por un papel que nadie ha pedido.
            </span>
          </p>
        </Reveal>
      </Section>

      {/* 3. Cómo funciona */}
      <Section dark>
        <Reveal>
          <Kicker>Cómo funciona</Kicker>
        </Reveal>
        <TextReveal
          as="h2"
          className="text-section-mobile md:text-section font-light text-white max-w-3xl"
        >
          De tu Excel al extracto del banco
        </TextReveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-[#777] leading-relaxed">
            Un servicio de cobranza operado con agentes de IA. Las decisiones
            las toma tu equipo.
          </p>
        </Reveal>

        <ol className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1F1F1F] border border-[#1F1F1F]">
          {PASOS.map((paso, i) => (
            <li key={paso.titulo} className="bg-brand-black">
              <Reveal delay={i * 0.08} className="h-full p-8 md:p-10">
                <p className="text-sm font-display tracking-[0.2em] text-brand-gold mb-6">
                  0{i + 1}
                </p>
                <h3 className="text-xl md:text-2xl font-light text-white mb-3 leading-snug">
                  {paso.titulo}
                </h3>
                <p className="text-[#888] leading-relaxed">{paso.texto}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      {/* 4. Lo que nunca hace */}
      <Section cream>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-20">
          <Reveal>
            <Kicker>Límites</Kicker>
            <h2 className="text-3xl md:text-4xl font-light text-brand-dark">
              Lo que nunca hace
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="border-t border-brand-dark/15">
              {NUNCA.map((linea) => (
                <li
                  key={linea}
                  className="flex items-start gap-4 py-5 border-b border-brand-dark/15 text-lg md:text-xl font-light text-brand-dark"
                >
                  <span className="mt-3 h-px w-4 shrink-0 bg-brand-red" aria-hidden="true" />
                  {linea}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-lg md:text-xl font-light leading-relaxed text-brand-dark">
              Y los primeros 30 días, ningún mensaje sale sin tu aprobación
              diaria.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* 5. Precio */}
      <section id="precio" className="section-padding bg-white scroll-mt-16 md:scroll-mt-20">
        <div className="container-wide">
          <Reveal>
            <Kicker>Precio</Kicker>
            <h2 className="text-3xl md:text-4xl font-light text-brand-dark mb-12 md:mb-16">
              Lo que cuesta
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
            {PRECIOS.map((p, i) => (
              <div key={p.concepto} className="bg-white">
                <Reveal delay={i * 0.08} className="h-full p-8 md:p-10">
                  <p className="text-xs tracking-[0.2em] uppercase text-brand-gray mb-6">
                    {p.concepto}
                  </p>
                  <p className="text-4xl md:text-[2.75rem] font-light text-brand-dark tabular-nums leading-none">
                    {p.valor}
                    {p.unidad && (
                      <span className="ml-2 text-sm tracking-[0.15em] text-brand-gray">
                        {p.unidad}
                      </span>
                    )}
                  </p>
                  <p className="mt-5 text-sm text-brand-gray leading-relaxed">{p.detalle}</p>
                </Reveal>
              </div>
            ))}
          </div>
          <Reveal delay={0.1}>
            <div className="mt-8 border-l-2 border-brand-gold bg-brand-cream px-6 py-6 md:px-10 md:py-8">
              <p className="text-xs tracking-[0.2em] uppercase text-[#8a7323] mb-3">
                Garantía de servicio
              </p>
              <p className="text-lg md:text-xl font-light text-brand-dark leading-relaxed max-w-3xl">
                Si en 10 días hábiles no hemos gestionado toda tu lista, la
                mensualidad siguiente va por nuestra cuenta.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-12">
              <BotonDiagnostico className="w-full sm:w-auto" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6. Formulario */}
      <section id="diagnostico" className="section-padding bg-brand-black text-white scroll-mt-16 md:scroll-mt-20">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20">
          <div>
            <Kicker>Diagnóstico</Kicker>
            <h2 className="text-section-mobile md:text-section font-light text-white">
              Pide el diagnóstico de tu cartera
            </h2>
            <p className="mt-6 max-w-md text-[#777] leading-relaxed">
              Seis datos y listo. Te escribimos por WhatsApp en menos de un día
              hábil.
            </p>
          </div>
          <LeadForm />
        </div>
      </section>

      {/* 7. Preguntas frecuentes */}
      <Section narrow>
        <Reveal>
          <Kicker>Preguntas frecuentes</Kicker>
          <h2 className="text-3xl md:text-4xl font-light text-brand-dark mb-10">
            Lo que suelen preguntar
          </h2>
        </Reveal>
        <div className="border-t border-gray-200">
          {FAQ.map((item) => (
            <details key={item.question} className="group border-b border-gray-200">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-lg font-light text-brand-dark [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  className="mt-1 text-xl leading-none text-brand-red transition-transform duration-300 group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="pb-6 pr-10 text-brand-gray leading-relaxed">{item.answer}</p>
            </details>
          ))}
        </div>
      </Section>

      <OtrosCargos />

      {/* 8. Cierre */}
      <Section dark className="border-b border-[#1A1A1A]">
        <Reveal>
          <p className="max-w-4xl text-section-mobile md:text-section font-light text-white">
            El cobrador es el primero de los empleados digitales de Onza.
          </p>
          <div className="mt-12">
            <BotonDiagnostico className="w-full sm:w-auto" />
          </div>
        </Reveal>
      </Section>
    </>
  );
}
