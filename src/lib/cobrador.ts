/**
 * Datos compartidos por la landing del cobrador digital (/cobrador), su
 * formulario y la ruta /api/cobrador. Sin dependencias de servidor: el
 * formulario también lo importa.
 */

export const RANGOS_CARTERA = [
  { valor: "menos-20m", etiqueta: "Menos de $20M" },
  { valor: "20m-50m", etiqueta: "$20M a $50M" },
  { valor: "50m-200m", etiqueta: "$50M a $200M" },
  { valor: "mas-200m", etiqueta: "Más de $200M" },
  { valor: "no-se", etiqueta: "No sé (eso también lo resolvemos)" },
] as const;

export type RangoCartera = (typeof RANGOS_CARTERA)[number]["valor"];

export function etiquetaRango(valor: string): string | null {
  return RANGOS_CARTERA.find((r) => r.valor === valor)?.etiqueta ?? null;
}

export const UTM_CLAVES = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type Utm = Partial<Record<(typeof UTM_CLAVES)[number], string>>;
