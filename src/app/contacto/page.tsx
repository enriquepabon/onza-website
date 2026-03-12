"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/ui/fade-in";
import { COMPANY } from "@/lib/constants";

export default function ContactoPage() {
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
    "w-full border-b border-gray-300 bg-transparent py-3 text-brand-dark placeholder:text-gray-400 focus:border-brand-dark focus:outline-none transition-colors";

  return (
    <>
      <Section dark className="pt-32 pb-16">
        <FadeIn>
          <p className="text-sm tracking-widest uppercase text-gray-400 mb-4">
            Contacto
          </p>
          <h1 className="text-hero-mobile md:text-hero font-light max-w-4xl">
            Conversemos sobre tu operación
          </h1>
        </FadeIn>
      </Section>

      <Section narrow>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <FadeIn>
            <div>
              <h2 className="text-2xl font-light mb-6">
                Sin compromiso, sin jerga — solo claridad
              </h2>
              <p className="text-brand-gray leading-relaxed mb-8">
                Cuéntanos sobre tu empresa y los desafíos que enfrentas. En una
                primera conversación identificamos si hay oportunidades de IA
                que generen impacto real en tu operación.
              </p>

              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-xs tracking-widest uppercase text-brand-gray mb-1">
                    Email
                  </p>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="text-brand-dark hover:text-brand-red transition-colors"
                  >
                    {COMPANY.email}
                  </a>
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase text-brand-gray mb-1">
                    LinkedIn
                  </p>
                  <a
                    href={COMPANY.founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-dark hover:text-brand-red transition-colors"
                  >
                    {COMPANY.founder.name}
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            {status === "sent" ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <p className="text-2xl font-light mb-3">Mensaje enviado</p>
                  <p className="text-brand-gray">
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
                  className="inline-flex items-center justify-center px-10 py-4 bg-brand-red text-white text-sm tracking-wide uppercase hover:bg-red-600 transition-colors disabled:opacity-50"
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
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
