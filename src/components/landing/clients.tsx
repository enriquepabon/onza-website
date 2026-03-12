import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/ui/fade-in";
import Image from "next/image";

const CLIENT_LOGOS = [
  { name: "Grupo México", file: "white-grupomexico.png" },
  { name: "Ticket Master", file: "white-ticketmaster.png" },
  { name: "Avicanna", file: "white-avicanna.png" },
  { name: "Medcann", file: "white-medcann.png" },
  { name: "Success Drivers", file: "white-successdrivers.png" },
];

export function Clients() {
  return (
    <Section dark className="py-16">
      <FadeIn>
        <p className="text-sm tracking-widest uppercase text-gray-500 text-center mb-12">
          Empresas que confían en nosotros
        </p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16 opacity-60">
          {CLIENT_LOGOS.map((logo) => (
            <Image
              key={logo.name}
              src={`/images/client-logos/${logo.file}`}
              alt={logo.name}
              width={120}
              height={40}
              className="h-8 md:h-10 w-auto object-contain"
            />
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}
