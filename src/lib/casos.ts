// Casos de cliente. Toda la información aquí ya es pública en el sitio
// (case-studies y testimonials del home); no agregar datos de clientes
// que no estén publicados en otra parte.

export interface Caso {
  slug: string;
  client: string;
  sector: string;
  country: string;
  service: string;
  serviceHref: string;
  serviceLabel: string;
  duration: string;
  metric: string;
  metricLabel: string;
  title: string;
  description: string;
  resumen: string;
  contexto: string[];
  solucion: string[];
  resultados: string[];
  testimonial?: {
    quote: string;
    name: string;
    role: string;
  };
}

export const CASOS: Caso[] = [
  {
    slug: "formacion-ia-grupo-mexico",
    client: "Grupo México",
    sector: "Manufactura",
    country: "México",
    service: "Formación IA",
    serviceHref: "/servicios/formacion-ia",
    serviceLabel: "Formación en IA para empresas",
    duration: "8 semanas",
    metric: "500+",
    metricLabel: "personas formadas",
    title: "500+ personas formadas en IA en una de las empresas más grandes de México",
    description:
      "Programa nacional de adopción de IA para Grupo México: más de 500 personas formadas en 8 semanas, desde operarios de planta hasta directivos, con talleres prácticos de Copilot e IA generativa.",
    resumen:
      "Programa nacional de adopción de IA para equipos operativos y directivos. Desde planta hasta sala de juntas.",
    contexto: [
      "Grupo México necesitaba que la adopción de IA no se quedara en el área de tecnología. El reto era formar a equipos muy distintos entre sí, desde operarios de planta hasta directivos C-level, con un programa que le sirviera a cada nivel sin diluirse en teoría.",
    ],
    solucion: [
      "Diseñamos un programa escalonado de formación en inteligencia artificial con módulos adaptados a cada nivel de la organización. Los operarios trabajaron sobre sus procesos reales de manufactura, y los directivos sobre decisiones de adopción y priorización.",
      "Todos los módulos fueron prácticos: talleres con Microsoft Copilot y herramientas de IA generativa aplicadas al trabajo diario de cada equipo, no demostraciones genéricas.",
    ],
    resultados: [
      "Más de 500 personas formadas en IA y Copilot en 8 semanas.",
      "Cobertura completa de la organización: de planta a sala de juntas.",
      "Equipos usando IA sobre sus procesos reales desde la primera sesión.",
    ],
  },
  {
    slug: "automatizacion-ia-avicanna",
    client: "Avicanna",
    sector: "Ciencias de la Vida",
    country: "Colombia",
    service: "Automatización + Aplicativos",
    serviceHref: "/servicios/automatizacion-ia",
    serviceLabel: "Automatización de procesos con IA",
    duration: "6 meses",
    metric: "8",
    metricLabel: "aplicativos en producción",
    title: "8 aplicativos de IA en producción para la cadena de suministro de Avicanna",
    description:
      "Suite de 8 aplicativos para supply chain y trazabilidad en Avicanna, más un programa de certificación que dejó a 100+ colaboradores operando herramientas de IA por su cuenta.",
    resumen:
      "Suite de apps para supply chain y trazabilidad. Programa de certificación para personal operativo en herramientas IA.",
    contexto: [
      "Avicanna, empresa de ciencias de la vida con operación en Colombia, manejaba procesos críticos de su cadena de suministro con trabajo manual: trazabilidad de materia prima, reportes de producción, controles de proceso. Cada uno consumía horas de personal operativo y dejaba espacio para errores.",
    ],
    solucion: [
      "Desarrollamos 8 aplicativos que digitalizaron los procesos críticos de la cadena de suministro, desde la trazabilidad de materia prima hasta los reportes automatizados de producción.",
      "En paralelo, certificamos a más de 100 colaboradores en el uso de herramientas de IA. El objetivo era que la operación no dependiera de nosotros: autonomía tecnológica dentro de la organización.",
    ],
    resultados: [
      "8 aplicativos en producción en 6 meses.",
      "Más de 100 colaboradores certificados en herramientas de IA.",
      "Procesos de trazabilidad y reportería que antes eran manuales, corriendo solos.",
    ],
  },
  {
    slug: "agente-ia-latroupe",
    client: "LaTroupe",
    sector: "Hospitalidad",
    country: "Europa",
    service: "IA Operacional",
    serviceHref: "/servicios/agentes-ia",
    serviceLabel: "Agentes de IA para empresas",
    duration: "4 sesiones",
    metric: "7",
    metricLabel: "hoteles estandarizados",
    title: "7 hoteles en 3 países, un solo estándar operativo consultable con IA",
    description:
      "LaTroupe unificó la operación de sus 7 hoteles boutique en 3 países con un playbook único y un agente de IA que cualquier colaborador consulta en tiempo real, en su idioma.",
    resumen:
      "Playbook unificado para 7 sedes en 3 países. Agente IA que cualquier colaborador consulta en tiempo real.",
    contexto: [
      "LaTroupe opera 7 hoteles boutique distribuidos en 3 países europeos, y cada sede funcionaba distinto: procedimientos dispersos en documentos sueltos, políticas que variaban por hotel y conocimiento operativo que vivía en la cabeza de cada gerente.",
    ],
    solucion: [
      "Creamos un playbook operativo unificado para las 7 sedes: SOPs, políticas y mejores prácticas en un solo estándar.",
      "Sobre ese playbook implementamos un agente de IA que cualquier colaborador, desde recepción hasta housekeeping, consulta en tiempo real y en su idioma: procedimientos, políticas, checklists.",
    ],
    resultados: [
      "7 hoteles operando bajo un mismo estándar.",
      "Conocimiento operativo consultable 24/7 en cualquier idioma del equipo.",
      "Todo el proyecto en 4 sesiones de trabajo.",
    ],
    testimonial: {
      quote:
        "Tenemos siete hoteles en tres países y cada uno funcionaba distinto. Enrique tomó ese caos y lo convirtió en algo estandarizado: SOPs unificados, procesos por sede, y un agente que cualquier colaborador puede consultar cuando lo necesita. En cuatro sesiones hicimos lo que nos habría tomado un año.",
      name: "Javier Parra",
      role: "Gerente de Operaciones Global, LaTroupe",
    },
  },
  {
    slug: "plataforma-ia-language-for-living",
    client: "Language for Living",
    sector: "Educación",
    country: "Colombia",
    service: "Solución IA a Medida",
    serviceHref: "/servicios",
    serviceLabel: "Soluciones IA a medida",
    duration: "6 semanas",
    metric: "6",
    metricLabel: "semanas a producción",
    title: "Una plataforma educativa completa con IA, operativa en 6 semanas",
    description:
      "Language for Living pasó de procesos manuales a una plataforma web con test de nivel adaptativo por IA, registro de estudiantes y automatización interna, construida y en producción en 6 semanas.",
    resumen:
      "Test de nivel adaptativo, registro de estudiantes y automatización de procesos internos. Funcionando desde el día 1.",
    contexto: [
      "Language for Living, academia de idiomas en Colombia, corría su operación con procesos manuales: el test de nivel, el registro de estudiantes y la administración interna consumían horas de trabajo que no escalaban con el crecimiento del negocio.",
    ],
    solucion: [
      "Diseñamos y desplegamos una plataforma web completa: test de nivel de inglés adaptativo impulsado por IA, sistema de registro de estudiantes y automatización de los procesos administrativos internos.",
      "La plataforma quedó operativa desde el día 1, integrada con los procesos existentes de la academia.",
    ],
    resultados: [
      "De la primera conversación a producción en 6 semanas.",
      "Test de nivel adaptativo con IA funcionando desde el lanzamiento.",
      "Procesos manuales de registro y administración eliminados.",
    ],
    testimonial: {
      quote:
        "Enrique construyó toda la plataforma en semanas: el test de nivel de inglés, el registro de estudiantes, las integraciones con nuestros procesos. Nunca tuve que explicarle nada dos veces. Llegó, entendió el negocio, y lo que entregó fue exactamente lo que teníamos en la cabeza.",
      name: "Samuel Avila",
      role: "Fundador, Language for Living",
    },
  },
];

export function getCasoBySlug(slug: string): Caso | undefined {
  return CASOS.find((c) => c.slug === slug);
}
