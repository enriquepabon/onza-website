import {
  json,
  opciones,
  redirectValida,
  registrarCliente,
  type MetodoAuth,
} from "@/lib/mcp/oauth";

export const dynamic = "force-dynamic";

const METODOS: MetodoAuth[] = ["none", "client_secret_post", "client_secret_basic"];

// Registro dinámico de clientes (RFC 7591). Claude y ChatGPT lo llaman una vez
// por conexión; el client_id es la propia registración firmada.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return json({ error: "invalid_client_metadata", error_description: "Cuerpo JSON requerido" }, 400);
  }

  const uris: unknown[] = Array.isArray(body.redirect_uris) ? body.redirect_uris : [];
  if (!uris.length || uris.length > 10 || !uris.every(redirectValida)) {
    return json(
      { error: "invalid_redirect_uri", error_description: "redirect_uris debe tener entre 1 y 10 URLs https (o loopback http)" },
      400,
    );
  }

  const metodo: MetodoAuth = METODOS.includes(body.token_endpoint_auth_method)
    ? body.token_endpoint_auth_method
    : "client_secret_basic"; // valor por defecto de RFC 7591
  const nombre =
    typeof body.client_name === "string" && body.client_name.trim()
      ? body.client_name.trim().slice(0, 80)
      : "Cliente MCP";

  const { clientId, secret } = registrarCliente({ r: uris as string[], n: nombre, m: metodo });

  return json(
    {
      client_id: clientId,
      client_id_issued_at: Math.floor(Date.now() / 1000),
      client_name: nombre,
      redirect_uris: uris,
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      token_endpoint_auth_method: metodo,
      ...(secret ? { client_secret: secret, client_secret_expires_at: 0 } : {}),
    },
    201,
  );
}

export const OPTIONS = opciones;
