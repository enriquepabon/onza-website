"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

const CLIENT_LOGOS = [
  { name: "Grupo México", file: "white-grupomexico.png" },
  { name: "Ticket Master", file: "white-ticketmaster.png" },
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
          {MARQUEE_LOGOS.map((logo, i) => {
            const isLarge = logo.name === "Grupo México" || logo.name === "Ticket Master";
            return (
              <div
                key={`${logo.name}-${i}`}
                className="flex-shrink-0 mx-12 md:mx-16"
              >
                <Image
                  src={`/images/client-logos/${logo.file}`}
                  alt={logo.name}
                  width={isLarge ? 360 : 120}
                  height={isLarge ? 120 : 40}
                  className={`${isLarge ? "h-20 md:h-24" : "h-7 md:h-9"} w-auto object-contain opacity-40 hover:opacity-70 transition-opacity duration-500 grayscale`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
