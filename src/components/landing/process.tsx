"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { number: "01", title: "Descubrimiento", description: "Entendemos el problema antes de proponer nada. Entrevistas, mapeo de procesos, alcance y expectativas claras." },
  { number: "02", title: "Diseño", description: "Arquitectura de la solución. Blueprint visual que todos entienden, sin tecnicismos innecesarios." },
  { number: "03", title: "Construcción", description: "Desarrollo e implementación. Iteraciones cortas, feedback constante, sin sorpresas al final." },
  { number: "04", title: "Entrega + Adopción", description: "Deploy, capacitación al equipo, documentación. Funciona desde el día 1." },
  { number: "05", title: "Soporte", description: "Ajustes post-lanzamiento. Acompañamiento hasta que el equipo vuele solo." },
];

export function Process() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;

    const anim = gsap.fromTo(
      el,
      { scaleY: 0, transformOrigin: "top center" },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: el.parentElement, start: "top 60%", end: "bottom 40%", scrub: 1 },
      }
    );

    return () => { anim.kill(); };
  }, []);

  return (
    <section className="bg-white py-24 md:py-32 lg:py-40">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto mb-20">
          <div>
            <Reveal>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-brand-red" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-brand-red font-display">Cómo trabajamos</span>
              </div>
            </Reveal>
            <TextReveal as="h2" className="text-section-mobile md:text-section font-light text-brand-dark">
              Cómo llegamos de la primera conversación a algo que funciona
            </TextReveal>
          </div>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px">
            <div ref={lineRef} className="w-full h-full bg-brand-red" />
          </div>

          <div className="space-y-16 md:space-y-20">
            {STEPS.map((step, i) => (
              <Reveal key={step.number} delay={i * 0.1}>
                <div className="grid grid-cols-[40px_1fr] md:grid-cols-[80px_1fr] gap-6 md:gap-10">
                  <div className="flex justify-center">
                    <div className="w-10 h-10 rounded-full border border-brand-red flex items-center justify-center bg-white relative z-10">
                      <span className="text-xs text-brand-red font-display tracking-wider">{step.number}</span>
                    </div>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-2xl font-light mb-3 text-brand-dark">{step.title}</h3>
                    <p className="text-sm text-brand-gray leading-relaxed max-w-md">{step.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
