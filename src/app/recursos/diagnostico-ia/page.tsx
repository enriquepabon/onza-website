import type { Metadata } from "next";
import QuizClient from "./quiz-client";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Diagnóstico de Madurez IA Gratuito — Onza",
  description:
    "6 preguntas, 2 minutos. Descubre en qué punto está tu empresa para implementar IA y dónde puede generar mayor impacto operativo. Resultados inmediatos.",
  openGraph: {
    title: "Diagnóstico de Madurez IA Gratuito — Onza",
    description:
      "6 preguntas, 2 minutos. Descubre dónde la IA puede generar mayor impacto en tu operación. Resultados inmediatos y sin compromiso.",
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
