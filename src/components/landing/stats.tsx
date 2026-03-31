"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "500+", numericPart: "500", prefix: "", suffix: "+", label: "personas formadas en IA", sublabel: "En empresas de manufactura, hospitalidad y agroindustria" },
  { value: "3", numericPart: "3", prefix: "", suffix: "", label: "continentes, un estándar de trabajo", sublabel: "Colombia · México · Europa" },
  { value: "95%", numericPart: "95", prefix: "", suffix: "%", label: "de pilotos de IA no generan resultados medibles", sublabel: "El problema es integración, no tecnología" },
  { value: "54%", numericPart: "54", prefix: "", suffix: "%", label: "de empresas en LATAM aumentará inversión en IA este año", sublabel: "La pregunta no es si, sino cómo" },
];

function StatCard({ stat, index }: { stat: (typeof STATS)[0]; index: number }) {
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = numberRef.current;
    if (!el) return;

    const numericValue = parseFloat(stat.numericPart.replace(/,/g, ""));
    if (isNaN(numericValue)) return;

    const hasDecimal = stat.numericPart.includes(".");
    const obj = { val: 0 };
    const anim = gsap.to(obj, {
      val: numericValue,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
      onUpdate: () => {
        const formatted = hasDecimal
          ? obj.val.toFixed(1)
          : numericValue > 999 ? Math.round(obj.val).toLocaleString() : Math.round(obj.val).toString();
        el.textContent = `${stat.prefix}${formatted}${stat.suffix}`;
      },
    });

    return () => { anim.kill(); };
  }, [stat]);

  return (
    <Reveal delay={index * 0.15}>
      <div className="relative">
        <div className="h-px w-8 bg-brand-gold mb-6" />
        <p className="text-4xl md:text-5xl lg:text-6xl font-light text-brand-gold mb-4 tabular-nums">
          <span ref={numberRef}>{stat.value}</span>
        </p>
        <p className="text-sm text-gray-300 leading-relaxed mb-2">{stat.label}</p>
        <p className="text-xs text-[#555]">{stat.sublabel}</p>
      </div>
    </Reveal>
  );
}

export function Stats() {
  return (
    <section className="bg-brand-black py-24 md:py-32 lg:py-40 relative overflow-hidden">
      <div className="noise-overlay" />
      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-brand-red" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-brand-red font-display">El contexto</span>
              </div>
            </Reveal>
            <TextReveal as="h2" className="text-section-mobile md:text-section font-light text-white">
              La IA está transformando LATAM. La pregunta es si tu empresa lidera o se queda atrás.
            </TextReveal>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {STATS.map((stat, i) => (<StatCard key={i} stat={stat} index={i} />))}
        </div>
        <Reveal delay={0.4}>
          <div className="mt-16 flex flex-wrap gap-4 justify-start">
            <MagneticButton
              href="/recursos/diagnostico-ia?utm_source=homepage&utm_medium=cta&utm_content=stats-diagnostico"
              className="px-8 py-3 bg-brand-red text-white hover:bg-red-600 text-sm"
            >
              ¿Dónde está tu empresa? Haz el test
            </MagneticButton>
            <MagneticButton
              href="/contacto?utm_source=homepage&utm_medium=cta&utm_content=stats"
              className="px-8 py-3 border border-[#333] text-[#777] hover:border-white hover:text-white text-sm"
            >
              Hablemos de tu operación
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
