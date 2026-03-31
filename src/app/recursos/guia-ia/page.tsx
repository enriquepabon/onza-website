"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";

const GUIDE_TOPICS = [
  "Cómo identificar los procesos con mayor potencial de IA en tu empresa",
  "Los 5 errores más comunes al implementar IA (y cómo evitarlos)",
  "Framework de diagnóstico: las preguntas que debes hacerte antes de invertir",
  "Cómo medir el ROI de un proyecto de IA sin autoengañarte",
  "Checklist: ¿está tu empresa lista para implementar IA?",
  "Cómo presentar un caso de inversión en IA al directorio",
];

export default function GuiaIAPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      message: "[Lead Magnet] Descarga: Guía para implementar IA en tu empresa",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputClasses =
    "w-full border-b border-[#333] bg-transparent py-3 text-white placeholder:text-[#555] focus:border-brand-red focus:outline-none transition-colors";

  return (
    <>
      <Section dark className="pt-32 pb-16">
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-brand-red" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-brand-red font-display">
              Recurso gratuito
            </span>
          </div>
        </Reveal>
        <TextReveal
          as="h1"
          className="text-hero-mobile md:text-hero font-light max-w-4xl"
        >
          Guía práctica para implementar IA en tu empresa
        </TextReveal>
        <Reveal delay={0.3}>
          <p className="text-lg text-[#555] max-w-xl leading-relaxed mt-8 font-light">
            Lo que hemos aprendido implementando IA en manufactura,
            hospitalidad y agroindustria. Sin jerga, sin promesas, con
            ejemplos reales.
          </p>
        </Reveal>
      </Section>

      <Section dark>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Content preview */}
          <Reveal>
            <div>
              <h2 className="text-2xl font-light mb-8 text-white">
                Qué vas a encontrar
              </h2>
              <div className="space-y-0">
                {GUIDE_TOPICS.map((topic, i) => (
                  <div key={i} className="flex gap-4 items-start py-4 border-b border-[#1F1F1F]">
                    <span className="text-brand-gold text-xs mt-1 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm text-[#999] leading-relaxed">{topic}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10 p-6 border border-[#1F1F1F]">
                <p className="text-xs text-[#555] tracking-[0.15em] uppercase mb-2">
                  Formato
                </p>
                <p className="text-sm text-[#999]">
                  PDF de 15 páginas. Lectura de 20 minutos. Incluye checklists
                  imprimibles y framework de diagnóstico.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            {status === "sent" ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <p className="text-2xl font-light mb-3 text-white">
                    Listo. Revisa tu correo.
                  </p>
                  <p className="text-[#777]">
                    Te enviamos la guía al email que nos diste. Si no la ves,
                    revisa spam.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-light mb-6 text-white">
                  Descarga gratis
                </h2>
                <p className="text-[#777] leading-relaxed mb-8">
                  Déjanos tu email y te enviamos la guía. No te vamos a
                  llenar de correos ni a compartir tus datos con nadie.
                </p>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <input
                    type="text"
                    name="name"
                    placeholder="Tu nombre"
                    required
                    className={inputClasses}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Tu email corporativo"
                    required
                    className={inputClasses}
                  />
                  <input
                    type="text"
                    name="company"
                    placeholder="Tu empresa (opcional)"
                    className={inputClasses}
                  />
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center justify-center px-10 py-4 bg-brand-red text-white text-sm tracking-[0.15em] uppercase hover:bg-red-600 transition-colors disabled:opacity-50"
                  >
                    {status === "sending" ? "Enviando..." : "Descargar guía"}
                  </button>
                  {status === "error" && (
                    <p className="text-sm text-brand-red">
                      Algo salió mal. Intenta de nuevo.
                    </p>
                  )}
                </form>
              </div>
            )}
          </Reveal>
        </div>
      </Section>
    </>
  );
}
