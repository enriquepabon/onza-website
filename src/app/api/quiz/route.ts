import { NextResponse } from "next/server";
import { getResend } from "@/lib/resend";
import { createPipelineLead } from "@/lib/notion";
import {
  calculateResult,
  generateReportHtml,
  generateReportSummary,
} from "@/lib/quiz";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, answers } = body;

    if (!name || !email || !answers) {
      return NextResponse.json(
        { error: "Nombre, email y respuestas son requeridos" },
        { status: 400 },
      );
    }

    const result = calculateResult(answers);
    const reportHtml = generateReportHtml(result, name);
    const reportSummary = generateReportSummary(result);

    const fromAddress = process.env.FROM_EMAIL || "Onza <web@onzaai.com>";
    const contactEmail = process.env.CONTACT_EMAIL || "hola@onzaai.com";

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
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Empresa:</strong> ${company}</p>` : ""}
        <p><strong>Score:</strong> ${result.score}/24 — ${result.levelLabel}</p>
        <p><strong>Mayor oportunidad:</strong> ${result.topAreaService}</p>
        <hr/>
        <pre style="font-size:13px;color:#666;white-space:pre-wrap;">${reportSummary}</pre>
      `,
    });

    // Capture lead in Notion
    createPipelineLead({
      name,
      email,
      company,
      message: reportSummary,
    }).catch(() => {});

    return NextResponse.json({ success: true, result });
  } catch {
    return NextResponse.json(
      { error: "Error al procesar el diagnóstico" },
      { status: 500 },
    );
  }
}
