import { HeroGeometric } from "@/components/landing/hero-geometric";
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
