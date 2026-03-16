"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

const CLIENT_LOGOS = [
  { name: "Grupo México", file: "white-grupomexico.png" },
  { name: "Ticket Master", file: "white-ticketmaster.png" },
  { name: "Oleoflores", file: "white-oleoflores.png" },
  { name: "Avicanna", file: "white-avicanna.png" },
  { name: "Medcann", file: "white-medcann.png" },
  { name: "Success Drivers", file: "white-successdrivers.png" },
];

const MARQUEE_LOGOS = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

export function Clients() {
  return (
    <section className="bg-brand-black py-16 overflow-hidden border-t border-[#1A1A1A]">
      <Reveal>
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#555] text-center mb-10 font-display">
          Empresas que confían en nosotros
        </p>
      </Reveal>

      <div className="relative">
        <div className="flex animate-marquee">
          {MARQUEE_LOGOS.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex-shrink-0 mx-12 md:mx-16 flex items-center"
            >
              <Image
                src={`/images/client-logos/${logo.file}`}
                alt={logo.name}
                width={180}
                height={60}
                className="h-10 md:h-12 w-auto object-contain opacity-40 hover:opacity-70 transition-opacity duration-500 grayscale"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
