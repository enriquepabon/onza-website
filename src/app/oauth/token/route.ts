import {
  emitirTokens,
  json,
  leerCliente,
  leerCodigo,
  leerRenovacion,
  opciones,
  pkceValido,
  resourceFrom,
  secretoDe,
} from "@/lib/mcp/oauth";

export const dynamic = "force-dynamic";

const error = (codigo: string, descripcion: string, status = 400) =>
  json({ error: codigo, error_description: descripcion }, status);

async function leerCuerpo(request: Request): Promise<Record<string, string>> {
  const tipo = request.headers.get("content-type") || "";
  if (tipo.includes("application/json")) {
    const body = await request.json().catch(() => ({}));
    return Object.fromEntries(Object.entries(body ?? {}).map(([k, v]) => [k, String(v)]));
  }
  return Object.fromEntries(new URLSearchParams(await request.text()));
}

// El cliente se identifica con client_id (y secreto si se registró como confidencial)
function autenticarCliente(request: Request, body: Record<string, string>) {
  let clientId = body.client_id;
  let secreto = body.client_secret;
  const basic = request.headers.get("authorization")?.match(/^Basic\s+(.+)$/i)?.[1];
  if (basic) {
    const [id, sec] = Buffer.from(basic, "base64").toString().split(":");
    clientId = decodeURIComponent(id ?? "");
    secreto = decodeURIComponent(sec ?? "");
  }
  const cliente = leerCliente(clientId);
  if (!cliente) return null;
  if (cliente.m !== "none" && secreto !== secretoDe(clientId)) return null;
  return { clientId, cliente };
}

export async function POST(request: Request) {
  const body = await leerCuerpo(request);
  const autenticado = autenticarCliente(request, body);
  if (!autenticado) return error("invalid_client", "Cliente desconocido o secreto inválido", 401);

  const resource = resourceFrom(request);
  if (body.resource && body.resource !== resource) {
    return error("invalid_target", `resource debe ser ${resource}`);
  }

  if (body.grant_type === "authorization_code") {
    const codigo = leerCodigo(body.code);
    if (!codigo || codigo.c !== autenticado.clientId) return error("invalid_grant", "Código inválido o vencido");
    if (body.redirect_uri && body.redirect_uri !== codigo.r) return error("invalid_grant", "redirect_uri no coincide");
    if (!body.code_verifier || !pkceValido(body.code_verifier, codigo.ch)) {
      return error("invalid_grant", "code_verifier inválido");
    }
    return json(emitirTokens({ sub: codigo.sub, c: codigo.c, sc: codigo.sc, aud: codigo.res }));
  }

  if (body.grant_type === "refresh_token") {
    const renovacion = leerRenovacion(body.refresh_token);
    if (!renovacion || renovacion.c !== autenticado.clientId) {
      return error("invalid_grant", "Token de renovación inválido o vencido");
    }
    return json(emitirTokens({ sub: renovacion.sub, c: renovacion.c, sc: renovacion.sc, aud: renovacion.aud }));
  }

  return error("unsupported_grant_type", "Solo authorization_code y refresh_token");
}

export const OPTIONS = opciones;
