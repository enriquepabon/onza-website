import { Hero } from "@/components/landing/hero";
import { Clients } from "@/components/landing/clients";
import { ServicesOverview } from "@/components/landing/services-overview";
import { Differentiators } from "@/components/landing/differentiators";
import { Stats } from "@/components/landing/stats";
import { Process } from "@/components/landing/process";
import { CTA } from "@/components/landing/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Clients />
      <ServicesOverview />
      <Differentiators />
      <Stats />
      <Process />
      <CTA />
    </>
  );
}
