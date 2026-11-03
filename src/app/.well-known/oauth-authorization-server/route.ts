import { json, metadatosServidor, opciones } from "@/lib/mcp/oauth";

export const dynamic = "force-dynamic";

// Metadatos del servidor de autorización (RFC 8414)
export function GET(request: Request) {
  return json(metadatosServidor(request), 200, { "Cache-Control": "public, max-age=3600" });
}

export const OPTIONS = opciones;
