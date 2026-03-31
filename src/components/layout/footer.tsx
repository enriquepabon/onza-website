import Link from "next/link";
import { COMPANY } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-brand-black text-white py-16">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <svg
                viewBox="0 0 600 600"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <g fill="currentColor">
                  <polygon points="68,90 108,90 301,468 299,468" />
                  <polygon points="492,90 532,90 301,468 299,468" />
                  <path d="M 328,100 L 340,100 C 330,250 312,380 301,468 L 299,468 C 308,380 320,250 328,100 Z" />
                </g>
              </svg>
              <span className="font-display font-light tracking-logo">
                ONZA
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
              {COMPANY.description}
            </p>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-gray-500 mb-4">
              Servicios
            </h4>
            <div className="flex flex-col gap-3">
              <Link href="/servicios#formaciones" className="text-sm text-gray-400 hover:text-white transition-colors">Formaciones IA</Link>
              <Link href="/servicios#automatizacion" className="text-sm text-gray-400 hover:text-white transition-colors">Automatización</Link>
              <Link href="/servicios#soluciones" className="text-sm text-gray-400 hover:text-white transition-colors">Soluciones a Medida</Link>
              <Link href="/servicios/chatbot-ia" className="text-sm text-gray-400 hover:text-white transition-colors">Chatbot IA</Link>
              <Link href="/servicios#diagnostico" className="text-sm text-gray-400 hover:text-white transition-colors">Diagnóstico Estratégico</Link>
            </div>
          </div>

          {/* Recursos */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-gray-500 mb-4">
              Recursos
            </h4>
            <div className="flex flex-col gap-3">
              <Link href="/recursos/diagnostico-ia" className="text-sm text-gray-400 hover:text-white transition-colors">Diagnóstico de madurez IA</Link>
              <Link href="/recursos/guia-ia" className="text-sm text-gray-400 hover:text-white transition-colors">Guía de implementación</Link>
              <Link href="/blog" className="text-sm text-gray-400 hover:text-white transition-colors">Blog</Link>
              <Link href="/nosotros" className="text-sm text-gray-400 hover:text-white transition-colors">Nosotros</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-gray-500 mb-4">
              Contacto
            </h4>
            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <a
                href={COMPANY.calendar}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Agendar conversación
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className="hover:text-white transition-colors"
              >
                {COMPANY.email}
              </a>
              <a
                href={COMPANY.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Onza. Colombia.
          </p>
        </div>
      </div>
    </footer>
  );
}
