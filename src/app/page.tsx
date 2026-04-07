import { HeroGeometric } from "@/components/landing/hero-geometric";
import { ServicesOverview } from "@/components/landing/services-overview";
import { Differentiators } from "@/components/landing/differentiators";
import { Stats } from "@/components/landing/stats";
import { CaseStudies } from "@/components/landing/case-studies";
import { Process } from "@/components/landing/process";
import { Testimonials } from "@/components/landing/testimonials";
import { CTA } from "@/components/landing/cta";
import { PhotoBreak } from "@/components/landing/photo-break";
import { JsonLd } from "@/components/seo/json-ld";

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Onza",
  url: "https://onzaai.com",
  logo: "https://onzaai.com/favicon.svg",
  image: "https://onzaai.com/og-image.jpg",
  description:
    "Consultoría boutique de inteligencia artificial para empresas en LATAM. Implementamos soluciones de IA que reducen costos y automatizan procesos con resultados medibles en semanas.",
  email: "enrique@onzaai.com",
  founder: {
    "@type": "Person",
    name: "Enrique Pabón",
    url: "https://linkedin.com/in/enriquepabon",
    jobTitle: "Fundador & Consultor IA",
  },
  areaServed: [
    { "@type": "Country", name: "Colombia" },
    { "@type": "Country", name: "México" },
    { "@type": "Country", name: "Perú" },
    { "@type": "Country", name: "Chile" },
    { "@type": "Country", name: "Argentina" },
    { "@type": "Country", name: "Uruguay" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de Consultoría IA",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Formaciones IA Empresariales",
          description:
            "Capacitaciones prácticas en IA para equipos directivos y operativos. Resultados desde la primera sesión.",
          url: "https://onzaai.com/servicios#formaciones",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Automatización de Procesos con IA",
          description:
            "Flujos automatizados con IA integrados a ERP, CRM y sistemas existentes. Hasta 80% de reducción en tiempos operativos.",
          url: "https://onzaai.com/servicios#automatizacion",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Chatbot IA para Empresas",
          description:
            "Agentes conversacionales alimentados con información real de la empresa. Atención 24/7 en web, WhatsApp y Slack.",
          url: "https://onzaai.com/servicios/chatbot-ia",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Diagnóstico y Consultoría Estratégica IA",
          description:
            "Análisis de operación, identificación de oportunidades y roadmap priorizado con estimaciones de impacto.",
          url: "https://onzaai.com/servicios#diagnostico",
        },
      },
    ],
  },
  knowsAbout: [
    "Inteligencia Artificial",
    "Automatización de Procesos",
    "Chatbots IA",
    "Consultoría Empresarial",
    "Transformación Digital",
    "Machine Learning",
  ],
  sameAs: [
    "https://linkedin.com/company/onzaai",
    "https://linkedin.com/in/enriquepabon",
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={professionalServiceSchema} />
      <HeroGeometric />

      {/* Workspace editorial — laptop + café + notebook */}
      <PhotoBreak src="/images/sections/photo-work.png" height="45vh" mobileHeight="30vh" />

      <ServicesOverview />

      <Differentiators />

      {/* Siluetas ejecutivas — golden hour, glass office */}
      <PhotoBreak src="/images/sections/photo-meeting.png" height="45vh" mobileHeight="28vh" position="center 40%" />

      <Stats />

      <CaseStudies />

      {/* Corredor arquitectónico — precisión, dark mood */}
      <PhotoBreak src="/images/sections/photo-architecture.png" height="38vh" mobileHeight="25vh" position="center" />

      <Process />

      <Testimonials />

      <CTA />
    </>
  );
}
