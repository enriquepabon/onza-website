import { json, metadatosRecurso, opciones } from "@/lib/mcp/oauth";

export const dynamic = "force-dynamic";

// Metadatos del recurso protegido (RFC 9728): le dicen al cliente dónde autorizarse
export function GET(request: Request) {
  return json(metadatosRecurso(request), 200, { "Cache-Control": "public, max-age=3600" });
}

export const OPTIONS = opciones;
