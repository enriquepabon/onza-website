import { HeroGeometric } from "@/components/landing/hero-geometric";
import { Clients } from "@/components/landing/clients";
import { ServicesOverview } from "@/components/landing/services-overview";
import { Differentiators } from "@/components/landing/differentiators";
import { Stats } from "@/components/landing/stats";
import { CaseStudies } from "@/components/landing/case-studies";
import { Process } from "@/components/landing/process";
import { Testimonials } from "@/components/landing/testimonials";
import { CTA } from "@/components/landing/cta";
import { PhotoBreak } from "@/components/landing/photo-break";

export default function Home() {
  return (
    <>
      <HeroGeometric />
      <Clients />

      {/* Grand entry — luz diagonal con partículas */}
      <PhotoBreak src="/images/sections/abstract-a.jpg" height="55vh" />

      <ServicesOverview />

      {/* Tira minimalista — arco dorado */}
      <PhotoBreak src="/images/sections/abstract-e.jpg" height="30vh" />

      <Differentiators />

      {/* Humo rojo — transición dramática */}
      <PhotoBreak src="/images/sections/abstract-c.jpg" height="52vh" position="center 40%" />

      <Stats />

      <CaseStudies />

      {/* Capas arquitectónicas */}
      <PhotoBreak src="/images/sections/abstract-f.jpg" height="38vh" position="center" />

      <Process />

      <Testimonials />

      {/* Líquido oscuro — pausa meditativa antes del CTA */}
      <PhotoBreak src="/images/sections/abstract-b.jpg" height="45vh" position="center 30%" />

      <CTA />
    </>
  );
}
