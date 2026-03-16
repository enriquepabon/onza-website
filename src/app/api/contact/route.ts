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

    await getResend().emails.send({
      from: "Onza Website <onboarding@resend.dev>",
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

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Error al enviar el mensaje" },
      { status: 500 }
    );
  }
}
