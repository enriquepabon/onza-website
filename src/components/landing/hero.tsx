import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";

export function Hero() {
  return (
    <Section dark className="min-h-screen flex items-center pt-20">
      <div className="max-w-4xl">
        <FadeIn>
          <p className="text-sm tracking-widest uppercase text-gray-400 mb-6">
            Consultoría en Arquitectura de Soluciones IA
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="text-hero-mobile md:text-hero font-light mb-8 leading-tight">
            Tu operación pierde tiempo y dinero cada día.
            <span className="text-brand-red">
              {" "}
              Nosotros lo resolvemos con IA.
            </span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
            Diseñamos soluciones de inteligencia artificial que transforman
            operaciones — reduciendo costos, eliminando errores y acelerando
            procesos con impacto financiero medible.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div className="flex flex-wrap gap-4">
            <Button href="/contacto" size="lg">
              Agenda una conversación
            </Button>
            <Button
              href="/servicios"
              variant="outline"
              size="lg"
              className="border-gray-600 text-white hover:bg-white hover:text-brand-dark"
            >
              Conoce nuestros servicios
            </Button>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
