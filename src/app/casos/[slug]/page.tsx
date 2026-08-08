import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { LineReveal } from "@/components/ui/line-reveal";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { CASOS, getCasoBySlug } from "@/lib/casos";

export function generateStaticParams() {
  return CASOS.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const caso = getCasoBySlug(params.slug);
  if (!caso) return {};

  return {
    title: `${caso.title} — Onza`,
    description: caso.description,
    openGraph: {
      title: `${caso.title} — Onza`,
      description: caso.description,
      url: `https://onzaai.com/casos/${caso.slug}`,
    },
    alternates: {
      canonical: `https://onzaai.com/casos/${caso.slug}`,
    },
  };
}

export default function CasoPage({ params }: { params: { slug: string } }) {
  const caso = getCasoBySlug(params.slug);
  if (!caso) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: caso.title,
    description: caso.description,
    url: `https://onzaai.com/casos/${caso.slug}`,
    author: {
      "@type": "Organization",
      name: "Onza",
      url: "https://onzaai.com",
    },
    about: {
      "@type": "Service",
      name: caso.serviceLabel,
      provider: { "@type": "Organization", name: "Onza" },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", href: "/" },
          { name: "Casos", href: "/casos" },
          { name: caso.client, href: `/casos/${caso.slug}` },
        ]}
      />

      {/* Header */}
      <Section dark className="pt-32 pb-16">
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-brand-red" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-brand-red font-display">
              Caso · {caso.sector} · {caso.country}
            </span>
          </div>
        </Reveal>
        <TextReveal
          as="h1"
          className="text-hero-mobile md:text-hero font-light max-w-4xl"
        >
          {caso.title}
        </TextReveal>
        <Reveal delay={0.3}>
          <div className="flex flex-wrap gap-x-10 gap-y-4 mt-10 text-sm text-[#777]">
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#555] mb-1">
                Cliente
              </p>
              <p className="text-white font-light">{caso.client}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#555] mb-1">
                Servicio
              </p>
              <p className="text-white font-light">{caso.service}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#555] mb-1">
                Duración
              </p>
              <p className="text-white font-light">{caso.duration}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#555] mb-1">
                Resultado
              </p>
              <p className="text-brand-gold font-light">
                {caso.metric} {caso.metricLabel}
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Contexto */}
      <Section narrow>
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-light mb-6">El punto de partida</h2>
          <div className="space-y-4 text-brand-gray leading-relaxed max-w-3xl">
            {caso.contexto.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Solución */}
      <Section cream>
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-light mb-6">Qué hicimos</h2>
          <div className="space-y-4 text-brand-gray leading-relaxed max-w-3xl">
            {caso.solucion.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Resultados */}
      <Section dark>
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-brand-red" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-brand-red font-display">
              Resultados
            </span>
          </div>
          <h2 className="text-section-mobile md:text-section font-light text-white mb-12">
            Lo que quedó operando
          </h2>
        </Reveal>
        <div className="space-y-0 max-w-3xl">
          {caso.resultados.map((r, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="flex gap-4 items-start py-5">
                <span className="text-brand-gold mt-1 text-xs shrink-0">●</span>
                <p className="text-[#bbb]">{r}</p>
              </div>
              <LineReveal color="bg-[#1F1F1F]" />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Testimonio */}
      {caso.testimonial && (
        <Section narrow>
          <Reveal>
            <div className="border-l-2 border-brand-gold pl-8 max-w-3xl">
              <p className="text-xl font-light text-brand-dark leading-relaxed mb-6">
                &ldquo;{caso.testimonial.quote}&rdquo;
              </p>
              <p className="text-sm text-brand-gray">
                {caso.testimonial.name} · {caso.testimonial.role}
              </p>
            </div>
          </Reveal>
        </Section>
      )}

      {/* Servicio relacionado + CTA */}
      <Section dark className="text-center relative overflow-hidden">
        <div className="noise-overlay" />
        <div className="relative z-10">
          <TextReveal
            as="h2"
            className="text-section-mobile md:text-section font-light mb-6 max-w-2xl mx-auto"
          >
            ¿Tu empresa necesita algo así?
          </TextReveal>
          <Reveal delay={0.2}>
            <p className="text-[#777] mb-10 max-w-xl mx-auto leading-relaxed">
              Este proyecto se hizo con el servicio de{" "}
              <Link
                href={caso.serviceHref}
                className="text-white underline underline-offset-4 hover:text-brand-red transition-colors"
              >
                {caso.serviceLabel}
              </Link>
              . En 30 minutos te decimos si aplica para tu operación.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-wrap justify-center gap-5">
              <MagneticButton
                href={`/contacto?utm_source=caso-${caso.slug}&utm_medium=cta&utm_content=cta-final`}
                className="px-10 py-4 text-sm bg-brand-red text-white hover:bg-red-600"
              >
                Agenda una conversación
              </MagneticButton>
              <MagneticButton
                href="/casos"
                className="px-10 py-4 border border-[#333] text-[#999] hover:border-white hover:text-white text-sm"
              >
                Ver más casos
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
