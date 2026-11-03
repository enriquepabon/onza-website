import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { CORS, SCOPE, issuerFrom, opciones, verificarAcceso } from "@/lib/mcp/oauth";
import { crearServidor } from "@/lib/mcp/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Endpoint MCP (Streamable HTTP, sin sesiones): cada POST crea su servidor.
// Sin token válido responde 401 con la pista para iniciar OAuth (RFC 9728).
function sinAutorizacion(request: Request): Response {
  const conToken = /^Bearer\s/i.test(request.headers.get("authorization") ?? "");
  const metadatos = `${issuerFrom(request)}/.well-known/oauth-protected-resource`;
  return new Response(
    JSON.stringify({ error: conToken ? "invalid_token" : "unauthorized", error_description: "Conecta el MCP de Onza con OAuth" }),
    {
      status: 401,
      headers: {
        ...CORS,
        "Content-Type": "application/json",
        "WWW-Authenticate": `Bearer resource_metadata="${metadatos}", scope="${SCOPE}"${conToken ? ', error="invalid_token"' : ""}`,
      },
    },
  );
}

export async function POST(request: Request) {
  const acceso = verificarAcceso(request);
  if (!acceso) return sinAutorizacion(request);

  const server = crearServidor();
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  });
  await server.connect(transport);
  const respuesta = await transport.handleRequest(request, {
    authInfo: { token: acceso.token, clientId: acceso.c, scopes: [acceso.sc], expiresAt: acceso.exp, extra: { sub: acceso.sub } },
  });
  const headers = new Headers(respuesta.headers);
  for (const [k, v] of Object.entries(CORS)) headers.set(k, v);
  return new Response(respuesta.body, { status: respuesta.status, headers });
}

// Sin sesiones ni stream de notificaciones: GET y DELETE no aplican. Sin token
// igual responden 401, para que un cliente que empiece por GET descubra OAuth.
const noPermitido = (request: Request) =>
  verificarAcceso(request)
    ? new Response(JSON.stringify({ error: "method_not_allowed" }), {
        status: 405,
        headers: { ...CORS, Allow: "POST, OPTIONS", "Content-Type": "application/json" },
      })
    : sinAutorizacion(request);

export const GET = noPermitido;
export const DELETE = noPermitido;
export const OPTIONS = opciones;
