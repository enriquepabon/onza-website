import { NextResponse, type NextRequest } from "next/server";
import {
  ACCESO_COOKIE,
  ACCESO_MAX_AGE,
  clienteDeRuta,
  firmarAcceso,
  rutaDeRetornoSegura,
} from "@/lib/acceso";
import { guardarAcceso } from "@/lib/accesos-store";
import { getResend } from "@/lib/resend";

export const dynamic = "force-dynamic";

const CORREO_VALIDO = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function limpiar(valor: unknown, maximo = 160): string {
  return typeof valor === "string" ? valor.trim().slice(0, maximo) : "";
}

function escapar(texto: string): string {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Registra al visitante, le entrega la cookie de acceso y avisa por correo.
 * El aviso llega en el momento, que es cuando sirve para hacer seguimiento.
 */
export async function POST(request: NextRequest) {
  try {
    const cuerpo = await request.json();

    const nombre = limpiar(cuerpo.nombre);
    const correo = limpiar(cuerpo.correo, 200).toLowerCase();
    const empresa = limpiar(cuerpo.empresa);
    const cargo = limpiar(cuerpo.cargo);
    const retorno = rutaDeRetornoSegura(limpiar(cuerpo.r, 400)) ?? "/";

    if (!nombre || !correo || !empresa || !cargo) {
      return NextResponse.json(
        { error: "Faltan datos. Los cuatro campos son necesarios para continuar." },
        { status: 400 }
      );
    }
    if (!CORREO_VALIDO.test(correo)) {
      return NextResponse.json(
        { error: "Revisa el correo: no parece una dirección válida." },
        { status: 400 }
      );
    }

    const cliente = clienteDeRuta(retorno);
    const visitaId = crypto.randomUUID();
    const token = await firmarAcceso({
      id: visitaId,
      nombre,
      correo,
      empresa,
      cargo,
      t: Date.now(),
    });

    const respuesta = NextResponse.json({ success: true, r: retorno });
    respuesta.cookies.set(ACCESO_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: ACCESO_MAX_AGE,
    });

    const registro = {
      visita_id: visitaId,
      tipo: "registro" as const,
      cliente,
      ruta: retorno,
      nombre,
      correo,
      empresa,
      cargo,
      ip: request.ip ?? request.headers.get("x-forwarded-for"),
      pais: request.geo?.country ?? null,
      ciudad: request.geo?.city ?? null,
      user_agent: request.headers.get("user-agent"),
      referer: request.headers.get("referer"),
    };

    // Se esperan las dos: en serverless la función se congela al responder y
    // una promesa suelta puede quedarse sin ejecutar. Ninguna de las dos puede
    // tumbar la entrega del documento, así que los fallos solo se registran.
    const [registroResultado, correoResultado] = await Promise.allSettled([
      guardarAcceso(registro),
      avisarPorCorreo({ nombre, correo, empresa, cargo, cliente, ruta: retorno }),
    ]);
    if (registroResultado.status === "rejected") {
      console.error("[acceso] falló el registro en Supabase:", registroResultado.reason);
    }
    if (correoResultado.status === "rejected") {
      console.error("[acceso] falló el aviso por correo:", correoResultado.reason);
    }

    return respuesta;
  } catch {
    return NextResponse.json(
      { error: "No pudimos abrir el documento. Intenta de nuevo." },
      { status: 500 }
    );
  }
}

async function avisarPorCorreo({
  nombre,
  correo,
  empresa,
  cargo,
  cliente,
  ruta,
}: {
  nombre: string;
  correo: string;
  empresa: string;
  cargo: string;
  cliente: string;
  ruta: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.error("[acceso] falta RESEND_API_KEY; no se envió el aviso");
    return;
  }

  const destino = process.env.CONTACT_EMAIL || "enrique@onzaai.com";
  const remitente = process.env.FROM_EMAIL || "Onza <web@onzaai.com>";
  const momento = new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" });

  // Resend devuelve el error en la respuesta en vez de lanzarlo, así que un
  // dominio sin verificar pasaría inadvertido si no se revisa aquí.
  const { error } = await getResend().emails.send({
    from: remitente,
    to: destino,
    replyTo: correo,
    subject: `[Propuesta ${cliente}] Abrió el documento: ${escapar(nombre)} — ${escapar(empresa)}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; color: #1a1a1a;">
        <p style="font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #999;">Acceso a propuesta · ${escapar(cliente)}</p>
        <h2 style="font-weight: 400; font-size: 22px; margin: 8px 0 20px;">${escapar(nombre)} acaba de abrir el documento</h2>
        <table style="border-collapse: collapse; font-size: 14px; line-height: 1.8;">
          <tr><td style="color:#888; padding-right:16px;">Empresa</td><td>${escapar(empresa)}</td></tr>
          <tr><td style="color:#888; padding-right:16px;">Cargo</td><td>${escapar(cargo)}</td></tr>
          <tr><td style="color:#888; padding-right:16px;">Correo</td><td><a href="mailto:${escapar(correo)}" style="color:#1a1a1a;">${escapar(correo)}</a></td></tr>
          <tr><td style="color:#888; padding-right:16px;">Documento</td><td>${escapar(ruta)}</td></tr>
          <tr><td style="color:#888; padding-right:16px;">Momento</td><td>${escapar(momento)}</td></tr>
        </table>
        <p style="font-size: 13px; color: #666; line-height: 1.7; margin-top: 24px;">El recorrido completo (qué páginas abrió y cuándo) queda en la tabla <strong>propuesta_accesos</strong> de Supabase.</p>
      </div>
    `,
  });

  if (error) {
    console.error("[acceso] Resend rechazó el aviso:", JSON.stringify(error), "| destino:", destino, "| remitente:", remitente);
  }
}
