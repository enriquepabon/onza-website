import { NextResponse } from "next/server";
import { getResend } from "@/lib/resend";
import { createPipelineLead } from "@/lib/notion";
import {
  QUIZ_QUESTIONS,
  calculateResult,
  escapeHtml,
  generateReportHtml,
  generateReportSummary,
} from "@/lib/quiz";
import { PROCESO_MAX, generarLectura } from "@/lib/diagnostico-ia";

export const dynamic = "force-dynamic";
// La lectura con Claude más los dos correos pueden pasar de los 10 s por defecto
export const maxDuration = 60;

function answersValid(answers: unknown): answers is Record<string, number> {
  if (!answers || typeof answers !== "object") return false;
  const a = answers as Record<string, unknown>;
  return QUIZ_QUESTIONS.every((q) => {
    const v = a[q.id];
    return Number.isInteger(v) && (v as number) >= 1 && (v as number) <= 4;
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, answers, proceso } = body;

    if (!name || !email || !answersValid(answers)) {
      return NextResponse.json(
        { error: "Nombre, email y respuestas son requeridos" },
        { status: 400 },
      );
    }

    const procesoLimpio =
      typeof proceso === "string" ? proceso.trim().slice(0, PROCESO_MAX) : "";

    const result = calculateResult(answers);
    const lectura = await generarLectura(result, {
      company,
      proceso: procesoLimpio,
    });
    const reportHtml = generateReportHtml(result, name, lectura);
    const reportSummary = generateReportSummary(result, {
      proceso: procesoLimpio,
      lectura,
    });

    const fromAddress = process.env.FROM_EMAIL || "Onza <web@onzaai.com>";
    const contactEmail = process.env.CONTACT_EMAIL || "enrique@onzaai.com";

    // Send report to user
    await getResend().emails.send({
      from: fromAddress,
      to: email,
      subject: `Tu diagnóstico de madurez IA — ${result.levelLabel} (${result.score}/24)`,
      html: reportHtml,
    });

    // Notify Enrique
    await getResend().emails.send({
      from: fromAddress,
      to: contactEmail,
      replyTo: email,
      subject: `[Diagnóstico IA] ${name}${company ? ` — ${company}` : ""} · ${result.levelLabel} (${result.score}/24)`,
      html: `
        <h2>Nuevo diagnóstico IA completado</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${company ? `<p><strong>Empresa:</strong> ${escapeHtml(company)}</p>` : ""}
        <p><strong>Score:</strong> ${result.score}/24 — ${result.levelLabel}</p>
        <p><strong>Mayor oportunidad:</strong> ${result.topAreaService}</p>
        <p><strong>Lectura IA:</strong> ${lectura ? "sí" : "no (salió el reporte estándar)"}</p>
        <hr/>
        <pre style="font-size:13px;color:#666;white-space:pre-wrap;">${escapeHtml(reportSummary)}</pre>
      `,
    });

    // Capture lead in Notion
    createPipelineLead({
      name,
      email,
      company,
      message: reportSummary,
    }).catch(() => {});

    return NextResponse.json({ success: true, result, lectura });
  } catch {
    return NextResponse.json(
      { error: "Error al procesar el diagnóstico" },
      { status: 500 },
    );
  }
}
