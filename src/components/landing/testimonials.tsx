"use client";

import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";

const TESTIMONIALS = [
  {
    quote:
      "Enrique construyó toda nuestra plataforma web en semanas — incluyendo el test de nivel de inglés, el sistema de registro de estudiantes y la integración con nuestros procesos internos. Lo que más me sorprendió fue que en ningún momento tuve que explicarle dos veces qué necesitaba. Entendió el negocio desde el primer día.",
    name: "Samuel Avila",
    role: "Fundador",
    company: "Language for Living",
    sector: "Educación · Colombia",
  },
  {
    quote:
      "Tenemos siete hoteles en tres países y cada uno operaba de una forma diferente. Enrique nos ayudó a estandarizar toda la operación con IA — desde los SOPs hasta un agente que cualquier colaborador puede consultar en cualquier momento. En cuatro sesiones construimos lo que nos habría tomado un año solo.",
    name: "Javier Parra",
    role: "Gerente de Operaciones Global",
    company: "LaTroupe",
    sector: "Hospitalidad · Europa",
  },
  {
    quote:
      "Sabíamos que la IA era importante pero no teníamos claridad de por dónde empezar. Onza nos ayudó a identificar dónde estaba el impacto real y a ejecutarlo. Sin presentaciones genéricas, sin rodeos — directo al problema.",
    name: "César Escobar",
    role: "Co-Fundador",
    company: "Success Drivers",
    sector: "Consultoría · Colombia",
  },
];

export function Testimonials() {
  return (
    <section className="bg-white py-24 md:py-32 lg:py-40">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-brand-red" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-brand-red font-display">
                  Clientes
                </span>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <TextReveal
              as="h2"
              className="text-section-mobile md:text-section font-light text-brand-dark"
            >
              Lo que dicen quienes ya trabajaron con nosotros
            </TextReveal>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <div className="bg-brand-cream p-8 md:p-10 h-full flex flex-col">
                <p className="text-brand-dark leading-relaxed text-[15px] flex-1 mb-8">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <div className="h-px w-8 bg-brand-gold mb-5" />
                  <p className="text-sm font-medium text-brand-dark">{t.name}</p>
                  <p className="text-xs text-brand-gray mt-0.5">{t.role} · {t.company}</p>
                  <p className="text-xs text-[#aaa] mt-1 tracking-wide">{t.sector}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
