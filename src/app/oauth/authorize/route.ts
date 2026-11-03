import { getResend } from "@/lib/resend";
import {
  OWNER_EMAIL,
  SCOPE,
  emitirCodigo,
  firmarPendiente,
  issuerFrom,
  leerCliente,
  leerPendiente,
  nuevoCodigoCorreo,
  redirectRegistrada,
  resourceFrom,
  verificarPendiente,
  type Solicitud,
} from "@/lib/mcp/oauth";

export const dynamic = "force-dynamic";

// Autorización del MCP: el dueño confirma con un código que le llega al correo.
// Pasos: inicio (GET) → enviar código → verificar → redirección al cliente.

const CAMPOS = ["client_id", "redirect_uri", "code_challenge", "code_challenge_method", "state", "scope", "resource", "response_type"] as const;

type Params = Partial<Record<(typeof CAMPOS)[number], string>>;

function escapar(texto: string): string {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const correoVisible = (correo: string) => correo.replace(/^(.).*(@.*)$/, "$1•••$2");

function pagina(titulo: string, cuerpo: string, status = 200): Response {
  const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapar(titulo)} · Onza</title>
<meta name="robots" content="noindex, nofollow">
<link rel="icon" href="/favicon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;1,400&display=swap" rel="stylesheet">
<style>
:root{--bg:#0C0C0C;--bg1:#141414;--border:#2A2A2A;--white:#fff;--off:#E8E8E8;--light:#C8C8C8;--med:#8A8A8A;--dim:#555;--red:#FF3B30;--gold:#D4AF37;--serif:"Playfair Display",Georgia,serif;--sans:"Inter",sans-serif}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--bg);color:var(--off);font-family:var(--sans);font-weight:300;min-height:100vh;display:flex;flex-direction:column}
body::before{content:"";position:fixed;inset:0;pointer-events:none;background:radial-gradient(circle at 15% 5%,rgba(212,175,55,.10),transparent 40%),radial-gradient(circle at 85% 95%,rgba(255,59,48,.10),transparent 40%)}
header{padding:26px 28px;max-width:960px;margin:0 auto;width:100%}
header .onza{font-weight:300;letter-spacing:8px;font-size:17px;color:var(--off)}
main{position:relative;flex:1;display:flex;align-items:center;justify-content:center;padding:24px 28px 56px}
.caja{width:100%;max-width:480px}
.eyebrow{font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--gold);margin-bottom:18px}
h1{font-family:var(--serif);font-weight:400;font-size:clamp(28px,5vw,40px);line-height:1.1;color:var(--white)}
h1 em{color:var(--gold);font-style:italic}
.intro{margin-top:16px;color:var(--light);font-size:15px;line-height:1.65}
form{margin-top:30px;background:var(--bg1);border:.5px solid var(--border);border-radius:12px;padding:26px 24px}
label{display:block;font-size:10.5px;letter-spacing:2px;text-transform:uppercase;color:var(--med);margin-bottom:8px}
input[type=text]{width:100%;background:#0F0F0F;border:.5px solid var(--border);border-radius:8px;padding:14px;color:var(--white);font-family:var(--sans);font-size:20px;letter-spacing:6px;text-align:center;text-transform:uppercase}
input[type=text]:focus{outline:none;border-color:rgba(212,175,55,.55)}
button{width:100%;margin-top:14px;background:var(--gold);color:#0C0C0C;border:none;border-radius:8px;padding:15px 18px;font-family:var(--sans);font-weight:500;font-size:12px;letter-spacing:2.5px;text-transform:uppercase;cursor:pointer}
button.secundario{background:transparent;color:var(--med);border:.5px solid var(--border)}
.error{margin-top:14px;color:var(--red);font-size:13px;line-height:1.5}
.nota{margin-top:20px;font-size:11.5px;color:var(--dim);line-height:1.7}
.permisos{margin-top:18px;font-size:13px;color:var(--light);line-height:1.7;padding-left:18px}
</style>
</head>
<body>
<header><span class="onza">ONZA</span></header>
<main><div class="caja">${cuerpo}</div></main>
</body>
</html>`;
  return new Response(html, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}

const ocultos = (p: Params) =>
  CAMPOS.filter((k) => p[k]).map((k) => `<input type="hidden" name="${k}" value="${escapar(p[k]!)}">`).join("");

function redirigir(request: Request, uri: string, datos: Record<string, string | undefined>): Response {
  const destino = new URL(uri);
  for (const [k, v] of Object.entries(datos)) if (v) destino.searchParams.set(k, v);
  destino.searchParams.set("iss", issuerFrom(request)); // RFC 9207
  return new Response(null, { status: 303, headers: { Location: destino.toString(), "Cache-Control": "no-store" } });
}

type Validacion =
  | { ok: true; solicitud: Solicitud; nombre: string }
  | { ok: false; respuesta: Response };

// Si el cliente o la redirección no son válidos se muestra el error aquí;
// cualquier otro error vuelve al cliente por su redirect_uri (RFC 6749 §4.1.2.1)
function validar(request: Request, p: Params): Validacion {
  const cliente = leerCliente(p.client_id ?? null);
  if (!cliente || !p.redirect_uri || !redirectRegistrada(cliente, p.redirect_uri)) {
    return {
      ok: false,
      respuesta: pagina(
        "Conexión no válida",
        `<div class="eyebrow">Conexión no válida</div><h1>No reconocemos esta <em>aplicación</em></h1><p class="intro">El cliente no está registrado o la dirección de retorno no coincide. Vuelve a agregar el conector desde Claude o ChatGPT.</p>`,
        400,
      ),
    };
  }
  const error = (codigo: string, descripcion: string): Validacion => ({
    ok: false,
    respuesta: redirigir(request, p.redirect_uri!, { error: codigo, error_description: descripcion, state: p.state }),
  });
  if (p.response_type !== "code") return error("unsupported_response_type", "Solo response_type=code");
  if (!p.code_challenge || p.code_challenge_method !== "S256") return error("invalid_request", "PKCE S256 es obligatorio");
  const resource = resourceFrom(request);
  if (p.resource && p.resource !== resource) return error("invalid_target", `resource debe ser ${resource}`);

  return {
    ok: true,
    nombre: cliente.n,
    solicitud: { c: p.client_id!, r: p.redirect_uri, ch: p.code_challenge, s: p.state, sc: SCOPE, res: resource },
  };
}

function pantallaInicio(p: Params, nombre: string, error = ""): Response {
  return pagina(
    "Conectar con Onza",
    `<div class="eyebrow">Conectar con Onza</div>
<h1><em>${escapar(nombre)}</em><br>quiere acceder a tu MCP</h1>
<p class="intro">Podrá consultar el tráfico del sitio, los leads del diagnóstico y del formulario, quién abrió cada propuesta y preparar borradores de blog. Nada se publica sin tu revisión.</p>
<form method="post">
  ${ocultos(p)}
  <input type="hidden" name="paso" value="enviar">
  <p class="intro" style="margin-top:0">Para confirmar que eres tú, enviaremos un código a <strong>${escapar(correoVisible(OWNER_EMAIL))}</strong>.</p>
  <button type="submit">Enviar código</button>
  ${error ? `<p class="error">${escapar(error)}</p>` : ""}
</form>
<form method="post" style="background:none;border:none;padding:0;margin-top:10px">
  ${ocultos(p)}
  <input type="hidden" name="paso" value="cancelar">
  <button type="submit" class="secundario">Cancelar</button>
</form>`,
  );
}

function pantallaCodigo(p: Params, pendiente: string, error = ""): Response {
  return pagina(
    "Ingresa el código",
    `<div class="eyebrow">Revisa tu correo</div>
<h1>Ingresa el <em>código</em></h1>
<p class="intro">Lo enviamos a ${escapar(correoVisible(OWNER_EMAIL))}. Vence en 10 minutos.</p>
<form method="post">
  ${ocultos(p)}
  <input type="hidden" name="paso" value="verificar">
  <input type="hidden" name="pendiente" value="${escapar(pendiente)}">
  <label for="codigo">Código</label>
  <input id="codigo" name="codigo" type="text" inputmode="text" autocomplete="one-time-code" maxlength="12" autofocus required>
  <button type="submit">Autorizar</button>
  ${error ? `<p class="error">${escapar(error)}</p>` : ""}
</form>
<form method="post" style="background:none;border:none;padding:0;margin-top:10px">
  ${ocultos(p)}
  <input type="hidden" name="paso" value="enviar">
  <button type="submit" class="secundario">Enviar otro código</button>
</form>
<p class="nota">Si no pediste esta conexión, cierra esta ventana. Sin el código nadie puede autorizarla.</p>`,
  );
}

async function enviarCodigo(codigo: string, nombre: string): Promise<boolean> {
  const visible = `${codigo.slice(0, 4)}-${codigo.slice(4)}`;
  try {
    const { error } = await getResend().emails.send({
      from: process.env.FROM_EMAIL || "Onza <web@onzaai.com>",
      to: OWNER_EMAIL,
      subject: `${visible} es tu código para conectar ${nombre} a Onza`,
      html: `<div style="font-family:Helvetica,Arial,sans-serif;font-size:15px;color:#1a1a1a;line-height:1.6">
<p>Para autorizar a <strong>${escapar(nombre)}</strong> a usar el MCP de Onza, ingresa este código:</p>
<p style="font-size:28px;letter-spacing:6px;font-weight:600;margin:18px 0">${visible}</p>
<p style="color:#666;font-size:13px">Vence en 10 minutos. Si no fuiste tú, ignora este correo: sin el código no se puede autorizar.</p>
</div>`,
    });
    if (error) console.error("[mcp-oauth] Resend rechazó el código", error);
    return !error;
  } catch (error) {
    console.error("[mcp-oauth] no se pudo enviar el código", error);
    return false;
  }
}

export function GET(request: Request) {
  const params = Object.fromEntries(new URL(request.url).searchParams) as Params;
  const v = validar(request, params);
  return v.ok ? pantallaInicio(params, v.nombre) : v.respuesta;
}

export async function POST(request: Request) {
  const form = new URLSearchParams(await request.text());
  const params = Object.fromEntries(CAMPOS.map((k) => [k, form.get(k) ?? undefined])) as Params;
  const v = validar(request, params);
  if (!v.ok) return v.respuesta;

  const paso = form.get("paso");

  if (paso === "cancelar") {
    return redirigir(request, v.solicitud.r, { error: "access_denied", error_description: "El usuario canceló", state: v.solicitud.s });
  }

  if (paso === "enviar") {
    const codigo = nuevoCodigoCorreo();
    if (!(await enviarCodigo(codigo, v.nombre))) {
      return pantallaInicio(params, v.nombre, "No pudimos enviar el correo. Intenta de nuevo en un momento.");
    }
    return pantallaCodigo(params, firmarPendiente(v.solicitud, codigo));
  }

  if (paso === "verificar") {
    const pendiente = form.get("pendiente") ?? "";
    const pedido = leerPendiente(pendiente);
    if (!pedido) return pantallaInicio(params, v.nombre, "El código venció. Pide uno nuevo.");
    // La solicitud firmada manda: no se aceptan cambios en los campos ocultos
    if (pedido.c !== v.solicitud.c || pedido.r !== v.solicitud.r || pedido.ch !== v.solicitud.ch) {
      return pantallaInicio(params, v.nombre, "La solicitud cambió. Pide un código nuevo.");
    }
    const solicitud = verificarPendiente(pendiente, form.get("codigo") ?? "");
    if (!solicitud) return pantallaCodigo(params, pendiente, "Ese código no coincide. Revísalo e intenta de nuevo.");
    return redirigir(request, solicitud.r, { code: emitirCodigo(solicitud), state: solicitud.s });
  }

  return pantallaInicio(params, v.nombre);
}
