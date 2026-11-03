import { COMPANY } from "@/lib/constants";

// ── Types ──────────────────────────────────────────────────────────────────

export interface QuizOption {
  id: string;
  label: string;
}

export interface QuizQuestion {
  id: string;
  why: string; // por qué lo preguntamos: se muestra sobre la pregunta
  question: string;
  options: QuizOption[];
}

export type QuizAnswers = Record<string, string>;

export type Temperatura = "caliente" | "tibio" | "frio";

export interface Oportunidad {
  titulo: string;
  descripcion: string;
  servicio: string;
  href: string;
}

export interface Rango {
  min: number;
  max: number | null; // null = sin tope ("más de")
}

// Resultado calculado sin modelo: siempre existe, haya o no lectura con Claude
export interface Diagnostico {
  answers: QuizAnswers;
  sector: string;
  area: string;
  tarea: string;
  oportunidad: Oportunidad;
  complemento: Oportunidad | null;
  tiempoHoy: Rango | null; // horas al mes que se van hoy en esa tarea
  tiempoRecuperable: Rango | null; // parte que suele poder automatizarse
  preparacion: { nivel: "inicial" | "intermedia" | "avanzada"; label: string; descripcion: string };
  primerPaso: string;
  temperatura: Temperatura;
}

// Lo que ve el visitante, generado con Claude (src/lib/diagnostico-ia.ts)
export interface LecturaPersonalizada {
  titular: string;
  lectura: string;
  estimacion: string; // vacía si el visitante no describió un proceso
  primerPaso: string;
  pregunta: string;
}

// Lo que recibe Enrique para contactarlo. Nunca se envía al navegador.
export interface ResumenInterno {
  resumen: string;
  temperatura: Temperatura;
  razonTemperatura: string;
  servicio: string;
  mensajeSugerido: string;
  preguntasLlamada: string[];
  alertas: string;
}

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ── Questions ──────────────────────────────────────────────────────────────

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "sector",
    why: "Los procesos que más se repiten cambian mucho de un sector a otro.",
    question: "¿En qué sector está tu empresa?",
    options: [
      { id: "comercio", label: "Comercio y consumo" },
      { id: "manufactura", label: "Manufactura e industria" },
      { id: "logistica", label: "Logística y distribución" },
      { id: "servicios", label: "Servicios profesionales" },
      { id: "salud", label: "Salud y bienestar" },
      { id: "educacion", label: "Educación" },
      { id: "construccion", label: "Construcción e inmobiliario" },
      { id: "otro", label: "Otro sector" },
    ],
  },
  {
    id: "tamano",
    why: "Define si conviene empezar con una solución puntual o con un plan por áreas.",
    question: "¿Cuántas personas trabajan en tu empresa?",
    options: [
      { id: "menos_20", label: "Menos de 20" },
      { id: "20_100", label: "20 a 100" },
      { id: "100_500", label: "100 a 500" },
      { id: "mas_500", label: "Más de 500" },
    ],
  },
  {
    id: "area",
    why: "El diagnóstico parte de donde se pierde el tiempo, no de la tecnología.",
    question: "¿En qué área sientes que se pierde más tiempo hoy?",
    options: [
      { id: "ventas", label: "Ventas y atención al cliente" },
      { id: "operaciones", label: "Operaciones o producción" },
      { id: "finanzas", label: "Finanzas y administración" },
      { id: "compras", label: "Compras, inventario y logística" },
      { id: "talento", label: "Talento humano" },
      { id: "direccion", label: "Dirección y reportes" },
    ],
  },
  {
    id: "tarea",
    why: "Cada tipo de trabajo repetitivo tiene una solución distinta.",
    question: "¿Qué trabajo se repite más en esa área?",
    options: [
      { id: "atencion", label: "Responder las mismas preguntas una y otra vez" },
      { id: "captura", label: "Digitar o pasar datos de un sistema a otro" },
      { id: "reportes", label: "Armar reportes o consolidar información" },
      { id: "documentos", label: "Revisar documentos: facturas, contratos, órdenes" },
      { id: "seguimiento", label: "Hacer seguimiento a cotizaciones, cobros o pedidos" },
    ],
  },
  {
    id: "horas",
    why: "Con esto estimamos cuánto tiempo podría recuperar tu equipo.",
    question: "Sumando a todo el equipo, ¿cuántas horas a la semana se van en ese trabajo?",
    options: [
      { id: "menos_5", label: "Menos de 5 horas" },
      { id: "5_15", label: "Entre 5 y 15 horas" },
      { id: "15_40", label: "Entre 15 y 40 horas" },
      { id: "mas_40", label: "Más de 40 horas" },
      { id: "no_se", label: "No sabría decir" },
    ],
  },
  {
    id: "sistemas",
    why: "Dónde viven los datos define qué tan rápido se puede implementar.",
    question: "¿Dónde está la información que usa ese proceso?",
    options: [
      { id: "excel", label: "En Excel, correos y WhatsApp" },
      { id: "erp", label: "En un ERP o CRM, con mucho Excel alrededor" },
      { id: "conectados", label: "En sistemas conectados entre sí" },
      { id: "no_claro", label: "No lo tengo claro" },
    ],
  },
  {
    id: "ia_hoy",
    why: "No es lo mismo empezar de cero que ordenar lo que el equipo ya hace por su cuenta.",
    question: "¿Cómo usa tu equipo la IA hoy?",
    options: [
      { id: "no", label: "No la usamos" },
      { id: "propia", label: "Cada quien por su cuenta, sin lineamientos" },
      { id: "pruebas", label: "Hicimos pruebas, sin resultados claros" },
      { id: "procesos", label: "Ya la usamos en procesos concretos" },
    ],
  },
  {
    id: "momento",
    why: "Así sabemos qué tan detallado debe ser el siguiente paso.",
    question: "¿En qué momento estás?",
    options: [
      { id: "explorando", label: "Explorando, sin planes concretos" },
      { id: "trimestre", label: "Quiero arrancar este trimestre" },
      { id: "presupuesto", label: "Tengo presupuesto y busco quién lo ejecute" },
      { id: "intentado", label: "Ya lo intentamos y necesito otro enfoque" },
    ],
  },
];

export function answersValid(answers: unknown): answers is QuizAnswers {
  if (!answers || typeof answers !== "object") return false;
  const a = answers as Record<string, unknown>;
  return QUIZ_QUESTIONS.every((q) => q.options.some((o) => o.id === a[q.id]));
}

export function answerLabel(questionId: string, answers: QuizAnswers): string {
  const q = QUIZ_QUESTIONS.find((x) => x.id === questionId);
  return q?.options.find((o) => o.id === answers[questionId])?.label ?? "Sin respuesta";
}

// ── Diagnóstico ────────────────────────────────────────────────────────────

const OPORTUNIDADES: Record<string, Oportunidad> = {
  atencion: {
    titulo: "Un asistente que responde con la información de tu empresa",
    descripcion:
      "Las preguntas que se repiten las responde un asistente que conoce tus documentos, políticas y precios. Tu equipo atiende solo lo que necesita criterio.",
    servicio: "Chatbot IA para empresas",
    href: "/servicios/chatbot-ia",
  },
  captura: {
    titulo: "Datos que pasan solos de un sistema a otro",
    descripcion:
      "Lo que hoy se digita a mano, como pedidos, facturas o formularios, se captura y se registra solo, con una validación antes de entrar al sistema.",
    servicio: "Automatización de procesos con IA",
    href: "/servicios/automatizacion-ia",
  },
  reportes: {
    titulo: "Reportes que se arman solos",
    descripcion:
      "El consolidado que alguien arma cada semana se genera con los datos del día y le llega a quien lo necesita, sin que nadie lo pida.",
    servicio: "Automatización de procesos con IA",
    href: "/servicios/automatizacion-ia",
  },
  documentos: {
    titulo: "Revisión automática de documentos",
    descripcion:
      "Facturas, contratos u órdenes se leen y se comparan contra las reglas de tu operación. A revisión humana solo llegan las excepciones.",
    servicio: "Automatización de procesos con IA",
    href: "/servicios/automatizacion-ia",
  },
  seguimiento: {
    titulo: "Seguimiento que no depende de la memoria de nadie",
    descripcion:
      "Cotizaciones, cobros y pedidos pendientes reciben seguimiento a tiempo, con el mensaje adecuado para cada caso y una alerta cuando algo se traba.",
    servicio: "Agentes de IA",
    href: "/servicios/agentes-ia",
  },
};

const COMPLEMENTO_FORMACION: Oportunidad = {
  titulo: "Lineamientos para el uso que ya existe",
  descripcion:
    "Tu equipo ya usa IA por su cuenta. Unas reglas claras y una formación corta evitan que datos de la empresa terminen donde no deben.",
  servicio: "Formación IA empresarial",
  href: "/servicios/formacion-ia",
};

const PRIMER_PASO: Record<string, string> = {
  atencion:
    "Lista las 20 preguntas que más se repiten y dónde está hoy la respuesta de cada una. Esa lista es la base del asistente.",
  captura:
    "Escoge un solo flujo de captura, por ejemplo los pedidos que llegan por correo, y cuenta cuántos registros a mano hace el equipo en una semana.",
  reportes:
    "Identifica el reporte que más horas consume, quién lo arma y de qué fuentes saca los datos. Es el candidato natural para automatizar primero.",
  documentos:
    "Junta una muestra de 30 documentos recientes y anota qué se revisa en cada uno. Esas reglas son las que después aplica el sistema.",
  seguimiento:
    "Cuenta cuántos pendientes, entre cotizaciones, cobros o pedidos, se quedaron sin seguimiento el último mes. Ese número es lo que cuesta hoy.",
};

// Horas al mes (4,3 semanas) según el rango semanal que eligió
const HORAS_MES: Record<string, Rango> = {
  menos_5: { min: 0, max: 20 },
  "5_15": { min: 20, max: 65 },
  "15_40": { min: 65, max: 170 },
  mas_40: { min: 170, max: null },
};

// Supuesto conservador: entre el 30% y el 60% de una tarea repetitiva se automatiza
const RECUPERABLE = { min: 0.3, max: 0.6 };

const redondear5 = (n: number) => Math.max(5, Math.round(n / 5) * 5);

const PUNTOS_SISTEMAS: Record<string, number> = { excel: 1, erp: 2, conectados: 3, no_claro: 1 };
const PUNTOS_IA: Record<string, number> = { no: 1, propia: 2, pruebas: 2, procesos: 3 };

const PREPARACION: Record<Diagnostico["preparacion"]["nivel"], Omit<Diagnostico["preparacion"], "nivel">> = {
  inicial: {
    label: "Base por construir",
    descripcion:
      "Primero hay que ordenar dónde vive la información. Un primer proyecto acotado sirve justamente para eso.",
  },
  intermedia: {
    label: "Lista para un primer proyecto",
    descripcion:
      "Hay suficiente orden para automatizar un proceso concreto en pocas semanas, sin cambiar los sistemas que ya usan.",
  },
  avanzada: {
    label: "Lista para escalar",
    descripcion:
      "Hay datos conectados y experiencia con IA. El siguiente paso es llevar lo que funciona a más áreas y medir el retorno.",
  },
};

const TEMPERATURA: Record<string, Temperatura> = {
  explorando: "frio",
  trimestre: "tibio",
  presupuesto: "caliente",
  intentado: "caliente",
};

export function calcularDiagnostico(answers: QuizAnswers): Diagnostico {
  const tarea = answers.tarea;
  const tiempoHoy = HORAS_MES[answers.horas] ?? null;
  const tiempoRecuperable = tiempoHoy
    ? {
        min: tiempoHoy.min === 0 ? 0 : redondear5(tiempoHoy.min * RECUPERABLE.min),
        max: tiempoHoy.max === null ? null : redondear5(tiempoHoy.max * RECUPERABLE.max),
      }
    : null;

  const puntos = (PUNTOS_SISTEMAS[answers.sistemas] ?? 1) + (PUNTOS_IA[answers.ia_hoy] ?? 1);
  const nivel = puntos <= 3 ? "inicial" : puntos === 4 ? "intermedia" : "avanzada";

  return {
    answers,
    sector: answerLabel("sector", answers),
    area: answerLabel("area", answers),
    tarea: answerLabel("tarea", answers),
    oportunidad: OPORTUNIDADES[tarea] ?? OPORTUNIDADES.captura,
    complemento: answers.ia_hoy === "propia" ? COMPLEMENTO_FORMACION : null,
    tiempoHoy,
    tiempoRecuperable,
    preparacion: { nivel, ...PREPARACION[nivel] },
    primerPaso: PRIMER_PASO[tarea] ?? PRIMER_PASO.captura,
    temperatura: TEMPERATURA[answers.momento] ?? "tibio",
  };
}

export function formatoRango(r: Rango, unidad = "horas al mes"): string {
  if (r.max === null) return `más de ${r.min} ${unidad}`;
  if (r.min === 0) return `hasta ${r.max} ${unidad}`;
  return `entre ${r.min} y ${r.max} ${unidad}`;
}

export const TEMPERATURA_LABEL: Record<Temperatura, string> = {
  caliente: "Caliente",
  tibio: "Tibio",
  frio: "Frío",
};

// ── Correo al visitante ────────────────────────────────────────────────────

function bloque(kicker: string, titulo: string, texto: string, color = "#FF3B30"): string {
  return `
<tr><td style="padding:28px 0;border-bottom:1px solid #1F1F1F;">
  <p style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${color};margin:0 0 10px 0;">${kicker}</p>
  ${titulo ? `<p style="font-size:18px;font-weight:300;color:#FFFFFF;margin:0 0 8px 0;">${titulo}</p>` : ""}
  <p style="font-size:14px;color:#999999;line-height:1.6;margin:0;">${texto}</p>
</td></tr>`;
}

export function generateReportHtml(
  d: Diagnostico,
  name: string,
  lectura?: LecturaPersonalizada | null,
): string {
  const titular = lectura?.titular || d.oportunidad.titulo;
  const tiempo = d.tiempoHoy
    ? `Hoy se van ${formatoRango(d.tiempoHoy)} en ${d.tarea.toLowerCase()}. Si se automatiza entre el 30% y el 60% de ese trabajo, que es lo habitual en tareas repetitivas, tu equipo recupera ${formatoRango(d.tiempoRecuperable!)}.`
    : "No tenemos el dato de horas. En la conversación lo estimamos juntos con dos o tres preguntas.";

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0C0C0C;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0C0C0C;">
<tr><td align="center" style="padding:40px 20px;">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

<tr><td style="padding:0 0 32px 0;">
  <p style="font-size:12px;letter-spacing:4px;text-transform:uppercase;color:#666;margin:0;">O N Z A</p>
</td></tr>

<tr><td style="padding:0 0 28px 0;border-bottom:1px solid #1F1F1F;">
  <p style="font-size:13px;color:#666;margin:0 0 12px 0;">${escapeHtml(name)}, este es tu diagnóstico.</p>
  <p style="font-size:26px;font-weight:300;color:#FFFFFF;line-height:1.3;margin:0;">${escapeHtml(titular)}</p>
</td></tr>

${lectura ? bloque("Lectura de tu caso", "", escapeHtml(lectura.lectura) + (lectura.estimacion ? `<br/><br/>${escapeHtml(lectura.estimacion)}` : "")) : ""}
${bloque("Dónde está la oportunidad", escapeHtml(d.oportunidad.titulo), escapeHtml(d.oportunidad.descripcion))}
${bloque("Tiempo en juego", "", escapeHtml(tiempo))}
${bloque("Preparación", escapeHtml(d.preparacion.label), escapeHtml(d.preparacion.descripcion))}
${d.complemento ? bloque("También conviene", escapeHtml(d.complemento.titulo), escapeHtml(d.complemento.descripcion)) : ""}
${bloque("Primer paso, en los próximos 30 días", "", escapeHtml(lectura?.primerPaso || d.primerPaso), "#D4AF37")}

<tr><td style="padding:32px 0;" align="center">
  ${lectura?.pregunta ? `<p style="font-size:14px;color:#999;line-height:1.6;margin:0 0 20px 0;">Para conversar: ${escapeHtml(lectura.pregunta)}</p>` : ""}
  <a href="${COMPANY.calendar}"
     style="display:inline-block;padding:14px 32px;background:#FF3B30;color:#FFFFFF;text-decoration:none;font-size:13px;letter-spacing:1px;text-transform:uppercase;">
    Agenda 30 minutos
  </a>
</td></tr>

<tr><td style="padding:32px 0 0 0;border-top:1px solid #1F1F1F;">
  <p style="font-size:12px;color:#555;margin:0;">Onza · Arquitectura de soluciones IA</p>
  <p style="font-size:12px;color:#555;margin:4px 0 0 0;">
    <a href="https://onzaai.com/servicios" style="color:#777;text-decoration:none;">Servicios</a> ·
    <a href="https://onzaai.com/blog" style="color:#777;text-decoration:none;">Blog</a> ·
    <a href="https://onzaai.com/contacto" style="color:#777;text-decoration:none;">Contacto</a>
  </p>
</td></tr>

</table>
</td></tr>
</table>
</body></html>`;
}

// ── Aviso interno a Enrique ────────────────────────────────────────────────

export interface Contacto {
  name: string;
  email: string;
  company?: string;
  telefono?: string;
  proceso?: string;
}

function respuestasTexto(answers: QuizAnswers): string[] {
  return QUIZ_QUESTIONS.map((q) => `- ${q.question} → ${answerLabel(q.id, answers)}`);
}

// Sin lectura de Claude: el resumen sale de las respuestas
export function resumenSinModelo(d: Diagnostico, contacto: Contacto): ResumenInterno {
  return {
    resumen: `${contacto.company || "Empresa sin nombre"} (${d.sector.toLowerCase()}, ${answerLabel("tamano", d.answers).toLowerCase()} personas). Pierde tiempo en ${d.area.toLowerCase()}: ${d.tarea.toLowerCase()}.`,
    temperatura: d.temperatura,
    razonTemperatura: `Respondió «${answerLabel("momento", d.answers)}».`,
    servicio: d.oportunidad.servicio,
    mensajeSugerido: "",
    preguntasLlamada: [],
    alertas: "",
  };
}

export function generarResumenTexto(
  d: Diagnostico,
  contacto: Contacto,
  interno: ResumenInterno,
  lectura?: LecturaPersonalizada | null,
): string {
  const lines = [
    `[Diagnóstico IA] ${TEMPERATURA_LABEL[interno.temperatura]} · ${interno.servicio}`,
    "",
    interno.resumen,
    `Temperatura: ${TEMPERATURA_LABEL[interno.temperatura]}. ${interno.razonTemperatura}`,
  ];
  if (interno.alertas) lines.push(`Alertas: ${interno.alertas}`);
  if (interno.mensajeSugerido) lines.push("", "Mensaje sugerido:", interno.mensajeSugerido);
  if (interno.preguntasLlamada.length) {
    lines.push("", "Para la llamada:", ...interno.preguntasLlamada.map((p) => `- ${p}`));
  }
  if (contacto.telefono) lines.push("", `WhatsApp: ${contacto.telefono}`);
  lines.push("", "Respuestas:", ...respuestasTexto(d.answers));
  if (contacto.proceso) lines.push("", `Proceso descrito: ${contacto.proceso}`);
  if (lectura) lines.push("", `Lo que vio en pantalla: ${lectura.titular}. ${lectura.lectura}`);
  return lines.join("\n");
}

export function generarAvisoHtml(
  d: Diagnostico,
  contacto: Contacto,
  interno: ResumenInterno,
  lectura?: LecturaPersonalizada | null,
): string {
  const fila = (k: string, v: string) =>
    `<tr><td style="color:#888;padding:4px 16px 4px 0;vertical-align:top;">${k}</td><td style="color:#1a1a1a;padding:4px 0;">${v}</td></tr>`;
  const wa = contacto.telefono?.replace(/[^\d]/g, "");

  return `
<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;color:#1a1a1a;line-height:1.6;max-width:640px;">
  <p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#FF3B30;margin:0 0 8px 0;">Nuevo diagnóstico IA · ${TEMPERATURA_LABEL[interno.temperatura]}</p>
  <p style="font-size:18px;margin:0 0 16px 0;">${escapeHtml(interno.resumen)}</p>

  <table style="font-size:14px;border-collapse:collapse;margin:0 0 20px 0;">
    ${fila("Nombre", escapeHtml(contacto.name))}
    ${fila("Correo", `<a href="mailto:${escapeHtml(contacto.email)}" style="color:#1a1a1a;">${escapeHtml(contacto.email)}</a>`)}
    ${contacto.company ? fila("Empresa", escapeHtml(contacto.company)) : ""}
    ${contacto.telefono ? fila("WhatsApp", wa ? `<a href="https://wa.me/${wa}" style="color:#1a1a1a;">${escapeHtml(contacto.telefono)}</a>` : escapeHtml(contacto.telefono)) : ""}
    ${fila("Temperatura", `${TEMPERATURA_LABEL[interno.temperatura]}. ${escapeHtml(interno.razonTemperatura)}`)}
    ${fila("Servicio", escapeHtml(interno.servicio))}
    ${interno.alertas ? fila("Alertas", escapeHtml(interno.alertas)) : ""}
  </table>

  ${interno.mensajeSugerido ? `
  <p style="font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#888;margin:0 0 6px 0;">Mensaje sugerido para escribirle</p>
  <p style="background:#F5F1E8;padding:14px 16px;margin:0 0 20px 0;">${escapeHtml(interno.mensajeSugerido)}</p>` : ""}

  ${interno.preguntasLlamada.length ? `
  <p style="font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#888;margin:0 0 6px 0;">Para la llamada</p>
  <ul style="margin:0 0 20px 0;padding-left:20px;">${interno.preguntasLlamada.map((p) => `<li>${escapeHtml(p)}</li>`).join("")}</ul>` : ""}

  ${contacto.proceso ? `
  <p style="font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#888;margin:0 0 6px 0;">Proceso que describió</p>
  <p style="margin:0 0 20px 0;">${escapeHtml(contacto.proceso)}</p>` : ""}

  <p style="font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#888;margin:0 0 6px 0;">Respuestas</p>
  <ul style="margin:0 0 20px 0;padding-left:20px;color:#444;">${QUIZ_QUESTIONS.map((q) => `<li>${escapeHtml(q.question)} <strong>${escapeHtml(answerLabel(q.id, d.answers))}</strong></li>`).join("")}</ul>

  <p style="font-size:12px;color:#888;margin:0;">
    ${lectura ? `Lo que vio en pantalla: «${escapeHtml(lectura.titular)}».` : "No hubo lectura con Claude: el visitante vio el diagnóstico estándar."}
    Tiempo estimado: ${d.tiempoHoy ? formatoRango(d.tiempoHoy) : "sin dato"}. Preparación: ${escapeHtml(d.preparacion.label)}.
  </p>
</div>`;
}
