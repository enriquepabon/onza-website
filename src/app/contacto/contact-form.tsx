"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { COMPANY } from "@/lib/constants";

export default function ContactForm() {
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
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
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
              Contacto
            </span>
          </div>
        </Reveal>
        <TextReveal
          as="h1"
          className="text-hero-mobile md:text-hero font-light max-w-4xl"
        >
          Conversemos
        </TextReveal>
      </Section>

      <Section dark>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <Reveal>
            <div>
              <h2 className="text-2xl font-light mb-6 text-white">
                Sin compromiso, sin jerga — solo claridad
              </h2>
              <p className="text-[#777] leading-relaxed mb-8">
                Cuéntanos sobre tu empresa y los desafíos que enfrentas. En una
                primera conversación identificamos si hay oportunidades de IA
                que generen impacto real en tu operación.
              </p>

              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#555] mb-1">
                    Email
                  </p>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="text-white hover:text-brand-red transition-colors"
                  >
                    {COMPANY.email}
                  </a>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#555] mb-1">
                    LinkedIn
                  </p>
                  <a
                    href={COMPANY.founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-brand-red transition-colors"
                  >
                    {COMPANY.founder.name}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            {status === "sent" ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <p className="text-2xl font-light mb-3 text-white">Mensaje enviado</p>
                  <p className="text-[#777]">
                    Te responderemos dentro de las próximas 24 horas.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Tu nombre"
                    required
                    className={inputClasses}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Tu email"
                    required
                    className={inputClasses}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="company"
                    placeholder="Tu empresa (opcional)"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Cuéntanos sobre tu operación y los desafíos que enfrentas"
                    required
                    rows={4}
                    className={`${inputClasses} resize-none`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center justify-center px-10 py-4 bg-brand-red text-white text-sm tracking-[0.15em] uppercase hover:bg-red-600 transition-colors disabled:opacity-50"
                >
                  {status === "sending" ? "Enviando..." : "Enviar mensaje"}
                </button>
                {status === "error" && (
                  <p className="text-sm text-brand-red">
                    Error al enviar. Intenta de nuevo o escríbenos directamente
                    a {COMPANY.email}.
                  </p>
                )}
              </form>
            )}
          </Reveal>
        </div>
      </Section>
    </>
  );
}
