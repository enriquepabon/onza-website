import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <Section className="bg-brand-navy text-white text-center">
      <FadeIn>
        <h2 className="text-section-mobile md:text-section font-light mb-6 max-w-3xl mx-auto">
          ¿Listo para transformar tu operación con IA?
        </h2>
        <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
          Conversemos sobre tu operación. Sin compromiso, sin jerga — solo
          claridad sobre dónde la IA puede generar impacto real.
        </p>
        <Button href="/contacto" size="lg">
          Agenda una conversación
        </Button>
      </FadeIn>
    </Section>
  );
}
