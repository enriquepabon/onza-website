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
  title: "Onza — Arquitectura de Soluciones IA",
  description:
    "Diseñamos arquitectura de soluciones IA que transforma operaciones con impacto financiero medible. Consultoría boutique para LATAM.",
  keywords: [
    "consultoría IA",
    "inteligencia artificial empresarial",
    "automatización procesos",
    "transformación digital",
    "Colombia",
    "LATAM",
  ],
  openGraph: {
    title: "Onza — Arquitectura de Soluciones IA",
    description:
      "Soluciones IA que transforman operaciones con impacto financiero medible.",
    url: "https://onzaai.com",
    siteName: "Onza",
    locale: "es_CO",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased">
        <SmoothScrollProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
