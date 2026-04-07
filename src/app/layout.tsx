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
  title: "Consultoría IA para Empresas en LATAM — Onza",
  description:
    "Implementamos soluciones de IA que reducen costos y automatizan procesos en empresas de LATAM. Diagnóstico sin compromiso. Resultados medibles en semanas.",
  keywords: [
    "consultoría IA Colombia",
    "automatización procesos con IA",
    "implementar IA en empresa",
    "diagnóstico IA empresarial",
    "soluciones IA LATAM",
    "IA para operaciones empresariales",
  ],
  openGraph: {
    title: "Consultoría IA para Empresas en LATAM — Onza",
    description:
      "Implementamos soluciones de IA que reducen costos y automatizan procesos en empresas de LATAM. Resultados medibles en semanas.",
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
  url: "https://onzaai.com",
  logo: "https://onzaai.com/favicon.svg",
  email: "enrique@onzaai.com",
  description:
    "Consultoría boutique de soluciones IA para empresas en LATAM. Automatización de procesos, diagnóstico estratégico y soluciones a medida.",
  areaServed: ["CO", "MX", "PE", "CL", "AR", "UY"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "enrique@onzaai.com",
    availableLanguage: ["Spanish", "English"],
  },
  sameAs: [
    "https://linkedin.com/company/onzaai",
    "https://linkedin.com/in/enriquepabon",
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
