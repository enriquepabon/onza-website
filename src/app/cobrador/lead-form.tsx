"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { RANGOS_CARTERA, UTM_CLAVES, type Utm } from "@/lib/cobrador";
import { trackEvent } from "@/lib/gtag";

const CLAVE_ORIGEN = "onza_cobrador_origen";

type Origen = { utm: Utm; referer: string };

/** UTM de la URL actual; si no trae, los de la primera página de la sesión. */
function leerOrigen(): Origen {
  const params = new URLSearchParams(window.location.search);
  const utm: Utm = {};
  for (const clave of UTM_CLAVES) {
    const valor = params.get(clave);
    if (valor) utm[clave] = valor;
  }
  if (Object.keys(utm).length > 0) {
    return { utm, referer: document.referrer };
  }
  try {
    const guardado = sessionStorage.getItem(CLAVE_ORIGEN);
    if (guardado) return JSON.parse(guardado) as Origen;
  } catch {
    // sessionStorage bloqueado (modo privado): se sigue sin él
  }
  return { utm: {}, referer: document.referrer };
}

const campo =
  "w-full border-b border-[#333] bg-transparent py-3 text-base text-white placeholder:text-[#4a4a4a] focus:border-brand-red focus:outline-none transition-colors";
const etiqueta = "block text-[10px] tracking-[0.25em] uppercase text-[#888] mb-1";

export function LeadForm() {
  const [estado, setEstado] = useState<"listo" | "enviando" | "enviado" | "error">("listo");
  const [error, setError] = useState("");
  const [nombre, setNombre] = useState("");

  // Guarda el origen de la primera visita para no perderlo si la persona
  // navega por el sitio y vuelve al formulario sin los UTM en la URL.
  useEffect(() => {
    try {
      if (!sessionStorage.getItem(CLAVE_ORIGEN)) {
        sessionStorage.setItem(CLAVE_ORIGEN, JSON.stringify(leerOrigen()));
      }
    } catch {
      // sin sessionStorage no pasa nada: el envío lee la URL actual
    }
  }, []);

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEstado("enviando");
    setError("");

    const form = e.currentTarget;
    const datos = new FormData(form);
    const origen = leerOrigen();
    const rango = String(datos.get("rango_cartera") ?? "");

    try {
      const respuesta = await fetch("/api/cobrador", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: datos.get("nombre"),
          empresa: datos.get("empresa"),
          cargo: datos.get("cargo"),
          correo: datos.get("correo"),
          whatsapp: datos.get("whatsapp"),
          rango_cartera: rango,
          sitio: datos.get("sitio"),
          utm: origen.utm,
          referer: origen.referer,
          pagina: window.location.pathname,
        }),
      });
      const cuerpo = await respuesta.json().catch(() => ({}));

      if (!respuesta.ok) {
        setError(
          cuerpo.error ?? "No pudimos enviar tus datos. Intenta de nuevo en un momento."
        );
        setEstado("error");
        return;
      }

      setNombre(String(datos.get("nombre") ?? "").trim().split(/\s+/)[0] ?? "");
      setEstado("enviado");
      form.reset();
      trackEvent("generate_lead", { form: "cobrador", rango_cartera: rango });
    } catch {
      setError("Se cortó la conexión. Revisa tu internet e intenta de nuevo.");
      setEstado("error");
    }
  }

  if (estado === "enviado") {
    return (
      <div className="border border-[#1F1F1F] p-8 md:p-12" role="status">
        <div className="h-px w-10 bg-brand-red mb-8" />
        <p className="text-3xl md:text-4xl font-light text-white mb-4">
          {nombre ? `Listo, ${nombre}.` : "Listo."}
        </p>
        <p className="text-lg text-[#999] font-light leading-relaxed">
          Te escribimos por WhatsApp en menos de un día hábil.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} className="relative space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
        <div>
          <label htmlFor="nombre" className={etiqueta}>Nombre</label>
          <input id="nombre" name="nombre" type="text" autoComplete="name" required maxLength={160} className={campo} placeholder="Tu nombre" />
        </div>
        <div>
          <label htmlFor="empresa" className={etiqueta}>Empresa</label>
          <input id="empresa" name="empresa" type="text" autoComplete="organization" required maxLength={160} className={campo} placeholder="Nombre de la empresa" />
        </div>
        <div>
          <label htmlFor="cargo" className={etiqueta}>Cargo</label>
          <input id="cargo" name="cargo" type="text" autoComplete="organization-title" required maxLength={160} className={campo} placeholder="Gerente financiero, jefe de cartera…" />
        </div>
        <div>
          <label htmlFor="correo" className={etiqueta}>Correo</label>
          <input id="correo" name="correo" type="email" autoComplete="email" inputMode="email" required maxLength={200} className={campo} placeholder="nombre@empresa.com" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="whatsapp" className={etiqueta}>WhatsApp</label>
          <input id="whatsapp" name="whatsapp" type="tel" autoComplete="tel" inputMode="tel" required maxLength={40} className={campo} placeholder="300 123 4567" />
        </div>
      </div>

      <fieldset>
        <legend className="text-lg md:text-xl font-light text-white mb-5 leading-snug">
          ¿Cuánta cartera vencida tienes entre 31 y 180 días?
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {RANGOS_CARTERA.map((rango, i) => (
            <label
              key={rango.valor}
              className={`relative block cursor-pointer ${i === RANGOS_CARTERA.length - 1 ? "sm:col-span-2" : ""}`}
            >
              <input
                type="radio"
                name="rango_cartera"
                value={rango.valor}
                required
                className="peer sr-only"
              />
              <span className="block border border-[#2A2A2A] py-3.5 pl-11 pr-4 text-sm text-[#bbb] transition-colors hover:border-[#555] peer-checked:border-brand-red peer-checked:text-white peer-focus-visible:ring-1 peer-focus-visible:ring-brand-red">
                {rango.etiqueta}
              </span>
              <span
                className="pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border border-[#555] transition-colors peer-checked:border-brand-red"
                aria-hidden="true"
              />
              <span
                className="pointer-events-none absolute left-[calc(1rem+4px)] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-brand-red opacity-0 transition-opacity peer-checked:opacity-100"
                aria-hidden="true"
              />
            </label>
          ))}
        </div>
      </fieldset>

      {/* Campo trampa para bots: fuera de la vista y del orden de tabulación */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="sitio">No llenar</label>
        <input id="sitio" name="sitio" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="space-y-4">
        <button
          type="submit"
          disabled={estado === "enviando"}
          className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 bg-brand-red text-white text-sm tracking-[0.15em] uppercase hover:bg-red-600 transition-colors disabled:opacity-50"
        >
          {estado === "enviando" ? "Enviando…" : "Quiero el diagnóstico"}
        </button>
        {estado === "error" && (
          <p className="text-sm text-brand-red" role="alert">
            {error}
          </p>
        )}
        <p className="text-xs text-[#555] leading-relaxed">
          Usamos estos datos solo para contactarte sobre el cobrador digital.
        </p>
      </div>
    </form>
  );
}
