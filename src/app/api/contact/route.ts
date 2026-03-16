import { NextResponse } from "next/server";
import { getResend } from "@/lib/resend";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nombre, email y mensaje son requeridos" },
        { status: 400 }
      );
    }

    const contactEmail = process.env.CONTACT_EMAIL || "hola@onzaai.com";
    const fromAddress = process.env.FROM_EMAIL || "Onza <web@onzaai.com>";

    // Email to Enrique (notification)
    await getResend().emails.send({
      from: fromAddress,
      to: contactEmail,
      replyTo: email,
      subject: `[Onza Web] Nuevo contacto: ${name}${company ? ` — ${company}` : ""}`,
      html: `
        <h2>Nuevo mensaje desde onzaai.com</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Empresa:</strong> ${company}</p>` : ""}
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    // Confirmation email to prospect
    await getResend().emails.send({
      from: fromAddress,
      to: email,
      subject: "Recibimos tu mensaje — Onza",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
          <h2 style="font-weight: 400; font-size: 24px; margin-bottom: 24px;">Hola ${name},</h2>
          <p style="line-height: 1.7; color: #444;">Gracias por escribirnos. Recibimos tu mensaje y te responderemos dentro de las próximas 24 horas.</p>
          <p style="line-height: 1.7; color: #444;">Mientras tanto, si tienes alguna pregunta adicional puedes responder directamente a este correo.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
          <p style="font-size: 13px; color: #999;">Enrique Pabón · Onza<br/>Arquitectura de Soluciones IA<br/><a href="https://onzaai.com" style="color: #999;">onzaai.com</a></p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Error al enviar el mensaje" },
      { status: 500 }
    );
  }
}
