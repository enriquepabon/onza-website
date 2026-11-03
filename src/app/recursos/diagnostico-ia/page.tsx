import type { Metadata } from "next";
import QuizClient from "./quiz-client";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Diagnóstico de Madurez IA Gratuito — Onza",
  description:
    "8 preguntas, 2 minutos. Descubre qué proceso de tu operación conviene atender primero con IA, cuántas horas hay en juego y por dónde empezar.",
  openGraph: {
    title: "Diagnóstico de Madurez IA Gratuito — Onza",
    description:
      "8 preguntas, 2 minutos. Descubre dónde la IA puede generar mayor impacto en tu operación y por dónde empezar. Sin compromiso.",
    url: "https://onzaai.com/recursos/diagnostico-ia",
    siteName: "Onza",
    locale: "es_CO",
    type: "website",
  },
  alternates: {
    canonical: "https://onzaai.com/recursos/diagnostico-ia",
  },
};

export default function DiagnosticoIAPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", href: "/" },
          { name: "Recursos", href: "/recursos" },
          { name: "Diagnóstico IA", href: "/recursos/diagnostico-ia" },
        ]}
      />
      <QuizClient />
    </>
  );
}
