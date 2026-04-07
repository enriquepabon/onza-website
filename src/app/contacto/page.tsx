import type { Metadata } from "next";
import ContactForm from "./contact-form";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Contacto — Onza | Consultoría IA para Empresas en LATAM",
  description:
    "Conversemos sobre cómo la IA puede transformar tu operación. Sin compromiso, sin jerga — solo claridad. Respuesta en menos de 24 horas.",
  openGraph: {
    title: "Contacto — Onza | Consultoría IA para Empresas en LATAM",
    description:
      "Conversemos sobre cómo la IA puede transformar tu operación. Sin compromiso, sin jerga — solo claridad.",
    url: "https://onzaai.com/contacto",
    siteName: "Onza",
    locale: "es_CO",
    type: "website",
  },
  alternates: {
    canonical: "https://onzaai.com/contacto",
  },
};

export default function ContactoPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", href: "/" },
          { name: "Contacto", href: "/contacto" },
        ]}
      />
      <ContactForm />
    </>
  );
}
