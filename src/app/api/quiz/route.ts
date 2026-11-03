import { NextResponse } from "next/server";
import { getResend } from "@/lib/resend";
import { createPipelineLead } from "@/lib/notion";
import {
  TEMPERATURA_LABEL,
  answersValid,
  calcularDiagnostico,
  generarAvisoHtml,
  generarResumenTexto,
  generateReportHtml,
  resumenSinModelo,
  type Contacto,
} from "@/lib/quiz";
import { PROCESO_MAX, generarLectura } from "@/lib/diagnostico-ia";

export const dynamic = "force-dynamic";
// La lectura con Claude más los dos correos pueden pasar de los 10 s por defecto
export const maxDuration = 60;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function texto(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { answers } = body;

    const contacto: Contacto = {
      name: texto(body.name, 120),
      email: texto(body.email, 200),
      company: texto(body.company, 160) || undefined,
      telefono: texto(body.telefono, 40) || undefined,
      proceso: texto(body.proceso, PROCESO_MAX) || undefined,
    };

    if (!contacto.name || !EMAIL_RE.test(contacto.email) || !answersValid(answers)) {
      return NextResponse.json(
        { error: "Nombre, correo y respuestas son requeridos" },
        { status: 400 },
      );
    }

    const diagnostico = calcularDiagnostico(answers);

    // Campo trampa: invisible para personas. Si llega lleno es un bot: se le
    // responde normal, sin gastar en Claude ni enviar correos.
    if (texto(body.sitio, 200)) {
      return NextResponse.json({ success: true, diagnostico, lectura: null });
    }

    const lectura = await generarLectura(diagnostico, contacto);
    const interno = lectura?.interno ?? resumenSinModelo(diagnostico, contacto);
    const visitante = lectura?.visitante ?? null;

    const fromAddress = process.env.FROM_EMAIL || "Onza <web@onzaai.com>";
    const contactEmail = process.env.CONTACT_EMAIL || "enrique@onzaai.com";
    // En Vercel la función se congela al responder: todo se espera aquí.
    // Cada envío va en su propia promesa para que un fallo (incluido un
    // cliente sin llave) no le quite el resultado al visitante.
    const envios = await Promise.allSettled([
      (async () => getResend().emails.send({
        from: fromAddress,
        to: contacto.email,
        subject: `Tu diagnóstico IA: ${visitante?.titular || diagnostico.oportunidad.titulo}`,
        html: generateReportHtml(diagnostico, contacto.name, visitante),
      }))(),
      (async () => getResend().emails.send({
        from: fromAddress,
        to: contactEmail,
        replyTo: contacto.email,
        subject: `[Diagnóstico IA] ${TEMPERATURA_LABEL[interno.temperatura]} · ${contacto.name}${contacto.company ? ` · ${contacto.company}` : ""}`,
        html: generarAvisoHtml(diagnostico, contacto, interno, visitante),
      }))(),
      createPipelineLead({
        name: contacto.name,
        email: contacto.email,
        company: contacto.company,
        message: generarResumenTexto(diagnostico, contacto, interno, visitante),
        proximaAccion: interno.mensajeSugerido
          ? `Escribirle (${TEMPERATURA_LABEL[interno.temperatura]}): ${interno.mensajeSugerido}`
          : "Responder el diagnóstico IA",
      }),
    ]);

    // Resend no lanza: devuelve { error } cuando el envío falla
    envios.forEach((r, i) => {
      const fallo =
        r.status === "rejected"
          ? r.reason
          : r.value && "error" in r.value
            ? r.value.error
            : null;
      if (fallo) {
        console.error(`[quiz] envío ${["visitante", "aviso", "notion"][i]} falló`, fallo);
      }
    });

    return NextResponse.json({ success: true, diagnostico, lectura: visitante });
  } catch (error) {
    console.error("[quiz]", error);
    return NextResponse.json(
      { error: "Error al procesar el diagnóstico" },
      { status: 500 },
    );
  }
}
