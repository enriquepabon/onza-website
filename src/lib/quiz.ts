// ── Types ──────────────────────────────────────────────────────────────────

export interface QuizOption {
  label: string;
  value: number; // 1-4
}

export interface QuizQuestion {
  id: string;
  stat: string;
  statSource?: string;
  question: string;
  options: QuizOption[];
  serviceMap?: string; // which Onza service this maps to
}

export interface QuizResult {
  score: number;
  level: "exploracion" | "oportunidad" | "aceleracion";
  levelLabel: string;
  topArea: string;
  topAreaService: string;
  answers: Record<string, number>;
}

// ── Questions ──────────────────────────────────────────────────────────────

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "tamano",
    stat: "En LATAM, 7 de cada 10 empresas medianas ya están experimentando con IA. La mayoría sin un plan detrás.",
    question: "¿Cuántas personas trabajan en tu empresa?",
    options: [
      { label: "Menos de 20", value: 1 },
      { label: "20 a 100", value: 2 },
      { label: "100 a 500", value: 3 },
      { label: "Más de 500", value: 4 },
    ],
  },
  {
    id: "shadow_ai",
    stat: "68% de los empleados que usan IA en el trabajo lo hacen por su cuenta, sin supervisión ni lineamientos.",
    statSource: "Microsoft Work Trend Index",
    question: "¿Tus colaboradores están usando herramientas de IA por su cuenta?",
    serviceMap: "Formaciones IA Empresariales",
    options: [
      { label: "No, y no creo que lo hagan", value: 1 },
      { label: "Probablemente sí, pero no tenemos visibilidad", value: 2 },
      { label: "Sí, sin políticas ni lineamientos", value: 3 },
      { label: "Sí, y ya nos generó problemas de seguridad o calidad", value: 4 },
    ],
  },
  {
    id: "adopcion",
    stat: "95% de los pilotos de IA fracasan. No por la tecnología — por cómo se implementan.",
    question: "¿Cómo está tu equipo con herramientas de IA hoy?",
    serviceMap: "Diagnóstico y Consultoría Estratégica IA",
    options: [
      { label: "No las usan", value: 1 },
      { label: "Algunos experimentan solos, sin dirección", value: 2 },
      { label: "Hay iniciativas pero sin resultados claros", value: 3 },
      { label: "Ya usamos IA en procesos concretos", value: 4 },
    ],
  },
  {
    id: "conocimiento",
    stat: "Un equipo de soporte gasta el 40% de su tiempo contestando lo que ya está escrito en algún documento que nadie encuentra.",
    question: "¿Tu equipo o tus clientes hacen las mismas preguntas una y otra vez?",
    serviceMap: "Chatbot IA / Soluciones a Medida",
    options: [
      { label: "No, cada consulta es diferente", value: 1 },
      { label: "Sí, pero lo manejamos", value: 2 },
      { label: "Sí, y le come mucho tiempo al equipo", value: 3 },
      { label: "Sí, y estamos perdiendo clientes por lentitud", value: 4 },
    ],
  },
  {
    id: "datos",
    stat: "Las empresas que deciden con datos ganan 23% más que las que deciden con instinto. No es magia — es tener la información correcta a tiempo.",
    statSource: "McKinsey",
    question: "¿Con qué información toma decisiones tu equipo directivo?",
    serviceMap: "Automatización de Procesos con IA",
    options: [
      { label: "Intuición y experiencia", value: 1 },
      { label: "Reportes manuales en Excel que alguien arma cada semana", value: 2 },
      { label: "Dashboards, pero con datos que no siempre están al día", value: 3 },
      { label: "Datos en tiempo real integrados con nuestros sistemas", value: 4 },
    ],
  },
  {
    id: "urgencia",
    stat: "Más de la mitad de las empresas en LATAM van a invertir más en IA este año. La pregunta ya no es si, sino en qué y con quién.",
    question: "¿Qué tan cerca estás de querer hacer algo con IA?",
    options: [
      { label: "Solo estoy mirando, sin planes concretos", value: 1 },
      { label: "Quiero arrancar este trimestre pero no sé por dónde", value: 2 },
      { label: "Ya tengo presupuesto y busco quién lo ejecute", value: 3 },
      { label: "Ya intentamos algo, no funcionó, necesito otro enfoque", value: 4 },
    ],
  },
];

// ── Scoring ────────────────────────────────────────────────────────────────

export function calculateResult(answers: Record<string, number>): QuizResult {
  const score = Object.values(answers).reduce((sum, v) => sum + v, 0);

  let level: QuizResult["level"];
  let levelLabel: string;

  if (score <= 10) {
    level = "exploracion";
    levelLabel = "Exploración";
  } else if (score <= 16) {
    level = "oportunidad";
    levelLabel = "Oportunidad";
  } else {
    level = "aceleracion";
    levelLabel = "Aceleración";
  }

  // Find the service-mapped question with highest score
  const serviceQuestions = QUIZ_QUESTIONS.filter((q) => q.serviceMap);
  let topScore = 0;
  let topArea = "";
  let topAreaService = "";

  for (const q of serviceQuestions) {
    const val = answers[q.id] ?? 0;
    if (val > topScore) {
      topScore = val;
      topArea = q.id;
      topAreaService = q.serviceMap!;
    }
  }

  return { score, level, levelLabel, topArea, topAreaService, answers };
}

// ── Report blocks (pre-written) ────────────────────────────────────────────

const AREA_LABELS: Record<string, string> = {
  shadow_ai: "Adopción no controlada de IA",
  adopcion: "Nivel de adopción de IA",
  conocimiento: "Acceso a conocimiento operativo",
  datos: "Toma de decisiones con datos",
};

const AREA_ANALYSIS: Record<string, Record<number, { status: string; implication: string; action: string }>> = {
  shadow_ai: {
    1: {
      status: "Tu equipo no está usando IA. Eso puede cambiar en cualquier momento.",
      implication: "No tienes un problema de Shadow AI hoy, pero tampoco estás capitalizando las herramientas que ya existen. Los equipos que no adoptan IA se quedan atrás.",
      action: "Un programa de formación estructurado puede adelantarse al problema y convertir la adopción en ventaja.",
    },
    2: {
      status: "Es probable que tu equipo ya esté usando IA sin que lo sepas.",
      implication: "Cada empleado que usa ChatGPT con datos de la empresa es un riesgo que no estás gestionando. No es mala intención — es falta de lineamientos.",
      action: "Necesitas visibilidad primero y lineamientos después. Una formación que establezca las reglas del juego.",
    },
    3: {
      status: "Tu equipo usa IA sin políticas. Eso es un riesgo abierto.",
      implication: "Datos confidenciales, respuestas incorrectas a clientes, procesos no documentados — el riesgo crece cada día que pasa sin estructura.",
      action: "Formación + políticas de uso. No para prohibir, sino para canalizar. El equipo quiere usar IA — dale el marco para hacerlo bien.",
    },
    4: {
      status: "La IA sin control ya te generó problemas. Es urgente actuar.",
      implication: "Si ya hubo incidentes de seguridad o calidad, el costo de no hacer nada es medible. Y va a empeorar.",
      action: "Diagnóstico de riesgo inmediato + programa de formación con governance. No se trata de frenar la adopción, sino de dirigirla.",
    },
  },
  adopcion: {
    1: {
      status: "Tu equipo no usa herramientas de IA en su trabajo.",
      implication: "Estás en el punto de partida. Eso no es malo — significa que puedes empezar bien en vez de corregir una adopción caótica.",
      action: "Un diagnóstico rápido identifica dónde la IA genera impacto real en tu operación. Sin eso, cualquier inversión es una apuesta.",
    },
    2: {
      status: "Algunos experimentan, pero sin dirección.",
      implication: "Los early adopters de tu equipo están aprendiendo solos. Eso genera esfuerzos dispersos que no se convierten en resultados para la empresa.",
      action: "Canalizar esa energía con formación estructurada. Convertir experimentos individuales en capacidad organizacional.",
    },
    3: {
      status: "Hay iniciativas de IA pero los resultados no llegan.",
      implication: "Este es el punto más frustrante: hay inversión, hay esfuerzo, pero algo falla en la ejecución. Casi siempre es un problema de enfoque, no de tecnología.",
      action: "Un diagnóstico estratégico que evalúe qué se está haciendo, por qué no funciona, y dónde reorientar.",
    },
    4: {
      status: "Ya usan IA en procesos concretos. Bien.",
      implication: "Estás más adelante que el 90% de las empresas. El siguiente paso es escalar lo que funciona y medir el impacto financiero.",
      action: "Automatización de los procesos que ya validaron + métricas de ROI para justificar la siguiente fase de inversión.",
    },
  },
  conocimiento: {
    1: {
      status: "Las consultas que reciben son variadas y no se repiten.",
      implication: "Un chatbot o agente interno probablemente no es la prioridad en este momento. El impacto estaría en otra área.",
      action: "Enfocarse en las áreas donde sí hay patrones repetitivos — procesos manuales, reportería, toma de decisiones.",
    },
    2: {
      status: "Hay preguntas repetitivas pero las manejan.",
      implication: "Lo manejan, pero cada hora que tu equipo gasta respondiendo lo mismo es una hora que no dedica a trabajo de mayor valor.",
      action: "Un agente interno alimentado con tu documentación puede absorber esas consultas y liberar tiempo del equipo. Implementación típica: 3-6 semanas.",
    },
    3: {
      status: "Las preguntas repetitivas le comen mucho tiempo a tu equipo.",
      implication: "Esto es tiempo medible. Multiplica las horas semanales por el costo hora del equipo — ese es el costo de no tener la información accesible.",
      action: "Un chatbot con acceso a tu base de conocimiento resuelve esto. Tu equipo deja de ser el helpdesk y vuelve a hacer su trabajo real.",
    },
    4: {
      status: "Estás perdiendo clientes por lentitud en la respuesta.",
      implication: "Ya no es un tema de eficiencia — es un tema de ingresos. Cada cliente que se va por lentitud es dinero que no recuperas.",
      action: "Implementación urgente. Un agente conversacional que responda 24/7 con tu información real, con escalamiento a humano cuando no pueda resolver.",
    },
  },
  datos: {
    1: {
      status: "Las decisiones se toman con intuición.",
      implication: "Funciona cuando el mercado es estable y el equipo tiene experiencia. Cuando las condiciones cambian, la intuición no escala.",
      action: "Antes de automatizar reportes necesitas saber qué datos tienes, dónde están y qué tan confiables son. Eso es un diagnóstico.",
    },
    2: {
      status: "Alguien arma reportes en Excel cada semana.",
      implication: "Esas horas manuales son un costo fijo que no genera valor. Y el reporte ya está desactualizado cuando llega.",
      action: "Automatizar la generación de reportes y conectar los datos directamente a dashboards que el equipo pueda consultar en tiempo real.",
    },
    3: {
      status: "Tienen dashboards, pero los datos no siempre están al día.",
      implication: "Estás a medio camino. La infraestructura existe pero las integraciones fallan o los datos llegan tarde. Tomar decisiones con datos retrasados es casi peor que no tener datos.",
      action: "Revisar las integraciones, automatizar los flujos de datos, y asegurar que lo que ve el directorio refleja la realidad de hoy, no la de la semana pasada.",
    },
    4: {
      status: "Datos en tiempo real, integrados. Vas bien.",
      implication: "Estás en la posición ideal para dar el siguiente paso: modelos predictivos, alertas automatizadas, optimización continua.",
      action: "Explorar soluciones de IA que usen tus datos para anticipar problemas antes de que ocurran, no solo reportarlos después.",
    },
  },
};

const LEVEL_CONTEXT: Record<string, string> = {
  exploracion: "Estás en una posición similar a la mayoría de empresas en LATAM: hay interés pero falta dirección. La buena noticia es que empezar bien es más valioso que empezar rápido.",
  oportunidad: "Tu empresa tiene dolores claros que la IA puede resolver. No estás en cero — estás en el punto donde un movimiento bien hecho genera impacto rápido.",
  aceleracion: "Ya tienes tracción con IA. El reto ahora es escalar lo que funciona, corregir lo que no, y medir el retorno para justificar la siguiente fase.",
};

export function generateReportHtml(result: QuizResult, name: string): string {
  const levelColor = result.level === "exploracion" ? "#FF3B30" : result.level === "oportunidad" ? "#D4AF37" : "#FFFFFF";
  const areaBlocks = ["shadow_ai", "adopcion", "conocimiento", "datos"]
    .map((areaId) => {
      const val = result.answers[areaId] ?? 1;
      const analysis = AREA_ANALYSIS[areaId]?.[val];
      if (!analysis) return "";
      const areaLabel = AREA_LABELS[areaId];
      return `
        <tr><td style="padding:24px 0 8px 0;">
          <p style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#FF3B30;margin:0;">${areaLabel}</p>
        </td></tr>
        <tr><td style="padding:0 0 6px 0;">
          <p style="font-size:16px;color:#FFFFFF;margin:0;">${analysis.status}</p>
        </td></tr>
        <tr><td style="padding:0 0 6px 0;">
          <p style="font-size:14px;color:#999999;line-height:1.6;margin:0;">${analysis.implication}</p>
        </td></tr>
        <tr><td style="padding:0 0 16px 0;border-bottom:1px solid #1F1F1F;">
          <p style="font-size:14px;color:#D4AF37;margin:0;">${analysis.action}</p>
        </td></tr>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0C0C0C;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0C0C0C;">
<tr><td align="center" style="padding:40px 20px;">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

<!-- Header -->
<tr><td style="padding:0 0 32px 0;">
  <p style="font-size:12px;letter-spacing:4px;text-transform:uppercase;color:#666;margin:0;">O N Z A</p>
</td></tr>

<!-- Title -->
<tr><td style="padding:0 0 32px 0;border-bottom:1px solid #1F1F1F;">
  <p style="font-size:28px;font-weight:300;color:#FFFFFF;margin:0 0 8px 0;">Tu diagnóstico de madurez IA</p>
  <p style="font-size:14px;color:#666;margin:0;">${name}, estos son tus resultados.</p>
</td></tr>

<!-- Score -->
<tr><td style="padding:32px 0;">
  <p style="font-size:64px;font-weight:300;color:${levelColor};margin:0;">${result.score}<span style="font-size:24px;color:#555;">/24</span></p>
  <p style="font-size:20px;font-weight:300;color:#FFFFFF;margin:8px 0 0 0;">Nivel: ${result.levelLabel}</p>
</td></tr>
<tr><td style="padding:0 0 32px 0;border-bottom:1px solid #1F1F1F;">
  <p style="font-size:14px;color:#999;line-height:1.6;margin:0;">${LEVEL_CONTEXT[result.level]}</p>
</td></tr>

<!-- Analysis by area -->
<tr><td style="padding:16px 0 0 0;">
  <p style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#666;margin:0;">Análisis por área</p>
</td></tr>
${areaBlocks}

<!-- Top opportunity -->
<tr><td style="padding:32px 0;border-bottom:1px solid #1F1F1F;">
  <p style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#FF3B30;margin:0 0 12px 0;">Tu mayor oportunidad</p>
  <p style="font-size:18px;font-weight:300;color:#FFFFFF;margin:0 0 8px 0;">${result.topAreaService}</p>
  <p style="font-size:14px;color:#999;line-height:1.6;margin:0;">Basado en tus respuestas, esta es el área donde la IA puede generar más impacto en tu operación hoy.</p>
</td></tr>

<!-- CTA -->
<tr><td style="padding:32px 0;" align="center">
  <p style="font-size:16px;color:#FFFFFF;margin:0 0 16px 0;">¿Quieres profundizar en esto?</p>
  <a href="https://onzaai.com/contacto?utm_source=diagnostico&utm_medium=email&utm_content=reporte"
     style="display:inline-block;padding:14px 32px;background:#FF3B30;color:#FFFFFF;text-decoration:none;font-size:13px;letter-spacing:1px;text-transform:uppercase;">
    Agenda 30 minutos
  </a>
</td></tr>

<!-- Footer -->
<tr><td style="padding:32px 0 0 0;border-top:1px solid #1F1F1F;">
  <p style="font-size:12px;color:#555;margin:0;">Onza — Consultoría IA para empresas en LATAM</p>
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

export function generateReportSummary(result: QuizResult): string {
  const lines = [
    `[Diagnóstico IA] Score: ${result.score}/24 — Nivel: ${result.levelLabel}`,
    `Mayor oportunidad: ${result.topAreaService}`,
    "",
    "Respuestas:",
  ];

  for (const q of QUIZ_QUESTIONS) {
    const val = result.answers[q.id];
    const opt = q.options.find((o) => o.value === val);
    lines.push(`- ${q.question} → ${opt?.label ?? "N/A"} (${val})`);
  }

  // Lead temperature from P6
  const urgency = result.answers["urgencia"] ?? 1;
  const temp = urgency <= 1 ? "Frío" : urgency <= 2 ? "Tibio" : "Caliente";
  lines.push("", `Temperatura del lead: ${temp}`);

  return lines.join("\n");
}
