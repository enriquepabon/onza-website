import { NextResponse, type NextRequest } from "next/server";
import { etiquetaRango, UTM_CLAVES, type Utm } from "@/lib/cobrador";
import { getResend } from "@/lib/resend";

export const dynamic = "force-dynamic";

const CORREO_VALIDO = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

type Lead = {
  nombre: string;
  empresa: string;
  cargo: string;
  correo: string;
  whatsapp: string;
  rango_cartera: string;
  fuente: string;
  pagina: string;
  referer: string | null;
  user_agent: string | null;
  pais: string | null;
  ciudad: string | null;
} & Utm;

function limpiar(valor: unknown, maximo = 160): string {
  return typeof valor === "string" ? valor.trim().slice(0, maximo) : "";
}

function escapar(texto: string): string {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Vercel entrega la ciudad codificada para URL ("Bogot%C3%A1"). */
function decodificar(valor: string | undefined): string | null {
  if (!valor) return null;
  try {
    return decodeURIComponent(valor);
  } catch {
    return valor;
  }
}

/**
 * Deja el número en formato internacional (+57…) para abrir el chat con un
 * clic desde el correo. Un celular colombiano de 10 dígitos recibe el +57.
 */
function normalizarWhatsapp(valor: string): string | null {
  let digitos = valor.replace(/\D/g, "");
  if (digitos.startsWith("00")) digitos = digitos.slice(2);
  if (!valor.trim().startsWith("+") && digitos.length === 10 && digitos.startsWith("3")) {
    digitos = `57${digitos}`;
  }
  if (digitos.length < 8 || digitos.length > 15) return null;
  return `+${digitos}`;
}

/**
 * Recibe el formulario de /cobrador: guarda el lead en Supabase y avisa a
 * Enrique por correo en el mismo momento, porque la promesa de la página es
 * escribir por WhatsApp en menos de un día hábil.
 */
export async function POST(request: NextRequest) {
  let cuerpo: Record<string, unknown>;
  try {
    cuerpo = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  // Campo trampa: invisible para las personas, los bots lo llenan. Se responde
  // como si todo hubiera salido bien para no darles pistas.
  if (limpiar(cuerpo.sitio)) {
    return NextResponse.json({ success: true });
  }

  const nombre = limpiar(cuerpo.nombre);
  const empresa = limpiar(cuerpo.empresa);
  const cargo = limpiar(cuerpo.cargo);
  const correo = limpiar(cuerpo.correo, 200).toLowerCase();
  const whatsapp = normalizarWhatsapp(limpiar(cuerpo.whatsapp, 40));
  const rango = limpiar(cuerpo.rango_cartera, 20);
  const etiqueta = etiquetaRango(rango);

  if (!nombre || !empresa || !cargo || !correo || !limpiar(cuerpo.whatsapp) || !rango) {
    return NextResponse.json(
      { error: "Faltan datos. Todos los campos son necesarios." },
      { status: 400 }
    );
  }
  if (!CORREO_VALIDO.test(correo)) {
    return NextResponse.json(
      { error: "Revisa el correo: no parece una dirección válida." },
      { status: 400 }
    );
  }
  if (!whatsapp) {
    return NextResponse.json(
      { error: "Revisa el WhatsApp. Si el número no es de Colombia, escríbelo con su indicativo (+52, +51…)." },
      { status: 400 }
    );
  }
  if (!etiqueta) {
    return NextResponse.json(
      { error: "Elige cuánta cartera vencida tienes." },
      { status: 400 }
    );
  }

  const utmRecibido =
    cuerpo.utm && typeof cuerpo.utm === "object" ? (cuerpo.utm as Record<string, unknown>) : {};
  const utm: Utm = {};
  for (const clave of UTM_CLAVES) {
    const valor = limpiar(utmRecibido[clave], 200);
    if (valor) utm[clave] = valor;
  }

  const pagina = limpiar(cuerpo.pagina, 200);

  const lead: Lead = {
    nombre,
    empresa,
    cargo,
    correo,
    whatsapp,
    rango_cartera: rango,
    fuente: utm.utm_source ?? "directo",
    ...utm,
    pagina: pagina.startsWith("/") ? pagina : "/cobrador",
    referer: limpiar(cuerpo.referer, 400) || request.headers.get("referer"),
    user_agent: request.headers.get("user-agent"),
    pais: request.geo?.country ?? null,
    ciudad: decodificar(request.geo?.city),
  };

  // Se esperan las dos: en serverless la función se congela al responder.
  // Basta con que una salga bien para no perder el lead.
  const [guardado, avisado] = await Promise.allSettled([
    guardarLead(lead),
    avisarPorCorreo(lead, etiqueta),
  ]);
  const okGuardado = guardado.status === "fulfilled" && guardado.value;
  const okAvisado = avisado.status === "fulfilled" && avisado.value;
  if (guardado.status === "rejected") console.error("[cobrador] error al guardar:", guardado.reason);
  if (avisado.status === "rejected") console.error("[cobrador] error en el aviso:", avisado.reason);

  if (!okGuardado && !okAvisado) {
    return NextResponse.json(
      { error: "No pudimos recibir tus datos. Intenta de nuevo en un momento o escríbenos a enrique@onzaai.com." },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}

async function guardarLead(lead: Lead): Promise<boolean> {
  const url = process.env.SUPABASE_URL;
  const llave = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !llave) {
    console.error("[cobrador] falta SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY; no se guardó el lead");
    return false;
  }

  const respuesta = await fetch(`${url}/rest/v1/leads_cobrador`, {
    method: "POST",
    headers: {
      apikey: llave,
      Authorization: `Bearer ${llave}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(lead),
    cache: "no-store",
  });
  if (!respuesta.ok) {
    console.error("[cobrador] Supabase rechazó el lead:", respuesta.status, await respuesta.text());
    return false;
  }
  return true;
}

async function avisarPorCorreo(lead: Lead, etiqueta: string): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) {
    console.error("[cobrador] falta RESEND_API_KEY; no se envió el aviso");
    return false;
  }

  const destino = process.env.CONTACT_EMAIL || "enrique@onzaai.com";
  const remitente = process.env.FROM_EMAIL || "Onza <web@onzaai.com>";
  const momento = new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" });
  const chat = `https://wa.me/${lead.whatsapp.replace(/\D/g, "")}`;
  const campana = [lead.utm_medium, lead.utm_campaign, lead.utm_content, lead.utm_term]
    .filter(Boolean)
    .join(" · ");

  const filas: [string, string][] = [
    ["Empresa", escapar(lead.empresa)],
    ["Cargo", escapar(lead.cargo)],
    ["Cartera 31–180 días", escapar(etiqueta)],
    ["WhatsApp", `<a href="${chat}" style="color:#1a1a1a;">${escapar(lead.whatsapp)}</a>`],
    ["Correo", `<a href="mailto:${escapar(lead.correo)}" style="color:#1a1a1a;">${escapar(lead.correo)}</a>`],
    ["Fuente", escapar(lead.fuente) + (campana ? ` <span style="color:#888;">(${escapar(campana)})</span>` : "")],
    ["Momento", escapar(momento)],
  ];

  // Resend devuelve el error en la respuesta en vez de lanzarlo.
  const { error } = await getResend().emails.send({
    from: remitente,
    to: destino,
    replyTo: lead.correo,
    subject: `[Cobrador] ${lead.nombre}, ${lead.empresa} · ${etiqueta}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; color: #1a1a1a;">
        <p style="font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #999;">Lead · Cobrador digital</p>
        <h2 style="font-weight: 400; font-size: 22px; margin: 8px 0 20px;">${escapar(lead.nombre)} pidió el diagnóstico</h2>
        <table style="border-collapse: collapse; font-size: 14px; line-height: 1.8;">
          ${filas
            .map(
              ([etiquetaFila, valor]) =>
                `<tr><td style="color:#888; padding-right:16px; vertical-align:top;">${etiquetaFila}</td><td>${valor}</td></tr>`
            )
            .join("")}
        </table>
        <p style="margin-top: 24px;">
          <a href="${chat}" style="display:inline-block; background:#1a1a1a; color:#fff; text-decoration:none; padding:10px 18px; font-size:13px; letter-spacing:1px;">Escribir por WhatsApp</a>
        </p>
        <p style="font-size: 13px; color: #666; line-height: 1.7; margin-top: 24px;">La página promete respuesta por WhatsApp en menos de un día hábil. El registro queda en la tabla <strong>leads_cobrador</strong> de Supabase.</p>
      </div>
    `,
  });

  if (error) {
    console.error("[cobrador] Resend rechazó el aviso:", JSON.stringify(error), "| destino:", destino);
    return false;
  }
  return true;
}
