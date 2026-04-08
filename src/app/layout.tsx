import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  verification: {
    google: "google271b6b4a77bc174c",
  },
  title: "Onza — Consultoría de Inteligencia Artificial para Empresas en Colombia y LATAM",
  description:
    "Onza es una firma boutique de consultoría IA en Colombia. Implementamos soluciones de inteligencia artificial que reducen costos y automatizan procesos en empresas de LATAM. Diagnóstico sin compromiso.",
  keywords: [
    "consultoría IA Colombia",
    "automatización procesos con IA",
    "implementar IA en empresa",
    "diagnóstico IA empresarial",
    "soluciones IA LATAM",
    "IA para operaciones empresariales",
  ],
  openGraph: {
    title: "Onza — Consultoría de Inteligencia Artificial para Empresas en Colombia y LATAM",
    description:
      "Onza es una firma boutique de consultoría IA en Colombia. Soluciones de inteligencia artificial que reducen costos y automatizan procesos. Resultados medibles en semanas.",
    url: "https://onzaai.com",
    siteName: "Onza",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "https://onzaai.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Onza — Consultoría IA para Empresas en LATAM",
      },
    ],
  },
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "https://onzaai.com",
  },
  metadataBase: new URL("https://onzaai.com"),
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Onza",
  alternateName: ["Onza AI", "Onza Consultoría IA", "OnzaAI"],
  url: "https://onzaai.com",
  logo: "https://onzaai.com/favicon.svg",
  email: "enrique@onzaai.com",
  description:
    "Consultoría boutique de inteligencia artificial para empresas en Colombia y LATAM. Automatización de procesos con IA, chatbots empresariales, diagnóstico estratégico, formaciones y soluciones a medida. Resultados medibles en semanas.",
  foundingDate: "2024",
  founder: {
    "@type": "Person",
    name: "Enrique Pabón",
    url: "https://enriquepabon.com",
    jobTitle: "Fundador & AI Solutions Architect",
    sameAs: ["https://linkedin.com/in/enriquepabon"],
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "CO",
  },
  areaServed: [
    { "@type": "Country", name: "Colombia" },
    { "@type": "Country", name: "México" },
    { "@type": "Country", name: "Perú" },
    { "@type": "Country", name: "Chile" },
    { "@type": "Country", name: "Argentina" },
    { "@type": "Country", name: "Uruguay" },
  ],
  knowsAbout: [
    "Inteligencia Artificial",
    "Consultoría IA",
    "Automatización de Procesos",
    "Chatbots Empresariales",
    "Agentes de IA",
    "Formación en IA",
    "Diagnóstico de Madurez IA",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "enrique@onzaai.com",
    availableLanguage: ["Spanish", "English"],
  },
  sameAs: [
    "https://linkedin.com/company/onzaai",
    "https://linkedin.com/in/enriquepabon",
    "https://enriquepabon.com",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <SmoothScrollProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
