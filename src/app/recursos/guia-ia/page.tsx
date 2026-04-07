import type { Metadata } from "next";
import GuideForm from "./guide-form";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Guía Práctica para Implementar IA en tu Empresa — Onza",
  description:
    "Descarga gratis nuestra guía de 15 páginas: framework de diagnóstico, errores comunes, cómo medir ROI y checklist de preparación para IA empresarial.",
  openGraph: {
    title: "Guía Práctica para Implementar IA en tu Empresa — Onza",
    description:
      "Framework de diagnóstico, errores comunes al implementar IA, cómo medir ROI y checklist de preparación. Recurso gratuito de Onza.",
    url: "https://onzaai.com/recursos/guia-ia",
    siteName: "Onza",
    locale: "es_CO",
    type: "website",
  },
  alternates: {
    canonical: "https://onzaai.com/recursos/guia-ia",
  },
};

export default function GuiaIAPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", href: "/" },
          { name: "Recursos", href: "/recursos" },
          { name: "Guía IA", href: "/recursos/guia-ia" },
        ]}
      />
      <GuideForm />
    </>
  );
}
