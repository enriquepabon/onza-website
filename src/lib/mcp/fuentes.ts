// Fuentes de datos del MCP. Todo con fetch: Notion (leads), Supabase (accesos a
// propuestas) y Google (Analytics y Search Console con una cuenta de servicio).

import { createSign } from "crypto";

export class FuenteNoConfigurada extends Error {}

const desde = (dias: number) => new Date(Date.now() - dias * 86_400_000).toISOString();

// ── Notion: pipeline de leads ──────────────────────────────────────────────

const PIPELINE_DB = process.env.NOTION_PIPELINE_DB_ID || "719f92b5d7da45758476b5e6676d35d1";

type PropiedadNotion = { type: string; [k: string]: unknown };

function valorNotion(p: PropiedadNotion): string | null {
  const v = p[p.type] as unknown;
  switch (p.type) {
    case "title":
    case "rich_text":
      return (v as { plain_text: string }[]).map((t) => t.plain_text).join("") || null;
    case "select":
    case "status":
      return (v as { name: string } | null)?.name ?? null;
    case "multi_select":
      return (v as { name: string }[]).map((s) => s.name).join(", ") || null;
    case "date":
      return (v as { start: string } | null)?.start ?? null;
    case "email":
    case "url":
    case "phone_number":
      return (v as string | null) ?? null;
    case "number":
      return v === null ? null : String(v);
    case "checkbox":
      return v ? "sí" : "no";
    default:
      return null;
  }
}

export interface Lead {
  id: string;
  creado: string;
  url: string;
  lead: string | null;
  contacto: string | null;
  email: string | null;
  stage: string | null;
  canal: string | null;
  probabilidad: string | null;
  proximaAccion: string | null;
  notas: string | null;
  [k: string]: string | null;
}

function aLead(pagina: { id: string; created_time: string; url: string; properties: Record<string, PropiedadNotion> }): Lead {
  const props = Object.fromEntries(Object.entries(pagina.properties).map(([k, v]) => [k, valorNotion(v)]));
  return {
    ...props,
    id: pagina.id,
    creado: pagina.created_time,
    url: pagina.url,
    lead: props.Lead ?? null,
    contacto: props.Contacto ?? null,
    email: props.Email ?? null,
    stage: props.Stage ?? null,
    canal: props.Canal ?? null,
    probabilidad: props.Probabilidad ?? null,
    proximaAccion: props["Próxima Acción"] ?? null,
    notas: props.Notas ?? null,
  };
}

async function notion(path: string, init?: RequestInit) {
  const key = process.env.NOTION_API_KEY;
  if (!key) throw new FuenteNoConfigurada("Falta NOTION_API_KEY: no hay acceso al pipeline de leads.");
  const res = await fetch(`https://api.notion.com/v1${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${key}`, "Notion-Version": "2022-06-28", "Content-Type": "application/json" },
  });
  const body = await res.json();
  if (!res.ok) throw new Error(`Notion ${res.status}: ${body.message ?? "error"}`);
  return body;
}

export async function leads({ dias = 30, limite = 20, texto }: { dias?: number; limite?: number; texto?: string }) {
  const filtros: unknown[] = [{ timestamp: "created_time", created_time: { on_or_after: desde(dias) } }];
  if (texto) {
    filtros.push({
      or: [
        { property: "Lead", title: { contains: texto } },
        { property: "Contacto", rich_text: { contains: texto } },
        { property: "Email", email: { contains: texto } },
        { property: "Notas", rich_text: { contains: texto } },
      ],
    });
  }
  const body = await notion(`/databases/${PIPELINE_DB}/query`, {
    method: "POST",
    body: JSON.stringify({
      filter: { and: filtros },
      sorts: [{ timestamp: "created_time", direction: "descending" }],
      page_size: Math.min(limite, 100),
    }),
  });
  return (body.results as Parameters<typeof aLead>[0][]).map(aLead);
}

export async function lead(id: string) {
  return aLead(await notion(`/pages/${encodeURIComponent(id)}`));
}

// ── Supabase: accesos a propuestas /p/* ────────────────────────────────────

async function supabase(path: string) {
  const url = process.env.SUPABASE_URL;
  const llave = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !llave) throw new FuenteNoConfigurada("Falta SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  const res = await fetch(`${url}/rest/v1/${path}`, { headers: { apikey: llave, Authorization: `Bearer ${llave}` } });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
  return res.json();
}

// PostgREST usa comas y paréntesis como sintaxis: se dejan solo caracteres seguros
const limpiar = (texto: string) => texto.replace(/[^A-Za-z0-9À-ÿ@.\s-]/g, "").trim().slice(0, 60);

export interface Visita {
  visita_id: string;
  cliente: string;
  nombre: string | null;
  correo: string | null;
  empresa: string | null;
  cargo: string | null;
  ciudad: string | null;
  pais: string | null;
  primer_acceso: string;
  ultimo_acceso: string;
  paginas_vistas: number;
  documentos_distintos: number;
}

export async function visitas({ dias = 30, cliente, texto, limite = 30 }: { dias?: number; cliente?: string; texto?: string; limite?: number }): Promise<Visita[]> {
  const q = new URLSearchParams({ select: "*", order: "ultimo_acceso.desc", limit: String(Math.min(limite, 200)) });
  q.append("ultimo_acceso", `gte.${desde(dias)}`);
  if (cliente) q.append("cliente", `ilike.*${limpiar(cliente)}*`);
  if (texto) {
    const t = limpiar(texto);
    if (t) q.append("or", `(nombre.ilike.*${t}*,empresa.ilike.*${t}*,correo.ilike.*${t}*,cliente.ilike.*${t}*)`);
  }
  return supabase(`propuesta_visitas?${q}`);
}

export async function recorrido(visitaId: string) {
  const q = new URLSearchParams({
    select: "tipo,cliente,ruta,nombre,correo,empresa,cargo,ciudad,pais,referer,creado_en",
    visita_id: `eq.${limpiar(visitaId)}`,
    order: "creado_en.asc",
    limit: "500",
  });
  return supabase(`propuesta_accesos?${q}`) as Promise<Record<string, string | null>[]>;
}

// ── Google: Analytics 4 y Search Console ──────────────────────────────────

const tokensGoogle = new Map<string, { token: string; vence: number }>();

async function tokenGoogle(scope: string): Promise<string> {
  const crudo = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!crudo) {
    throw new FuenteNoConfigurada(
      "Falta GOOGLE_SERVICE_ACCOUNT_JSON en Vercel: crea una cuenta de servicio en Google Cloud, dale acceso de lectura a la propiedad de Analytics y a Search Console, y pega su JSON en esa variable.",
    );
  }
  const guardado = tokensGoogle.get(scope);
  if (guardado && guardado.vence > Date.now() + 60_000) return guardado.token;

  const cuenta = JSON.parse(crudo) as { client_email: string; private_key: string };
  const ahora = Math.floor(Date.now() / 1000);
  const b64 = (o: object) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const sinFirma = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({
    iss: cuenta.client_email,
    scope,
    aud: "https://oauth2.googleapis.com/token",
    iat: ahora,
    exp: ahora + 3600,
  })}`;
  const firma = createSign("RSA-SHA256").update(sinFirma).sign(cuenta.private_key, "base64url");

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${sinFirma}.${firma}`,
    }),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(`Google OAuth ${res.status}: ${body.error_description ?? body.error}`);
  tokensGoogle.set(scope, { token: body.access_token, vence: Date.now() + body.expires_in * 1000 });
  return body.access_token;
}

const DESGLOSE_GA: Record<string, string | null> = {
  resumen: null,
  paginas: "pagePath",
  fuentes: "sessionSourceMedium",
  paises: "country",
  ciudades: "city",
  dias: "date",
};

export async function trafico({ dias = 28, desglose = "resumen", limite = 10 }: { dias?: number; desglose?: string; limite?: number }) {
  const token = await tokenGoogle("https://www.googleapis.com/auth/analytics.readonly");
  const propiedad = process.env.GA_PROPERTY_ID || "531795156";
  const dimension = DESGLOSE_GA[desglose] ?? null;
  const metricas = ["activeUsers", "newUsers", "sessions", "screenPageViews", "engagementRate", "averageSessionDuration", "keyEvents"];

  const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propiedad}:runReport`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      dateRanges: [{ startDate: `${dias}daysAgo`, endDate: "today" }],
      dimensions: dimension ? [{ name: dimension }] : [],
      metrics: metricas.map((name) => ({ name })),
      limit: dimension === "date" ? dias + 1 : limite,
      orderBys: dimension === "date"
        ? [{ dimension: { dimensionName: "date" } }]
        : dimension ? [{ metric: { metricName: "sessions" }, desc: true }] : [],
    }),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(`Google Analytics ${res.status}: ${body.error?.message ?? "error"}`);

  const filas = (body.rows ?? []) as { dimensionValues?: { value: string }[]; metricValues: { value: string }[] }[];
  return {
    periodo: `últimos ${dias} días`,
    filas: filas.map((f) => ({
      ...(dimension ? { [desglose]: f.dimensionValues?.[0]?.value } : {}),
      ...Object.fromEntries(metricas.map((m, i) => [m, Number(f.metricValues[i]?.value ?? 0)])),
    })),
  };
}

export async function busquedas({ dias = 28, limite = 25, desglose = "consultas" }: { dias?: number; limite?: number; desglose?: string }) {
  const token = await tokenGoogle("https://www.googleapis.com/auth/webmasters.readonly");
  const sitio = process.env.GSC_SITE || "https://onzaai.com/";
  const fecha = (d: number) => new Date(Date.now() - d * 86_400_000).toISOString().slice(0, 10);
  const res = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(sitio)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        startDate: fecha(dias),
        endDate: fecha(0),
        dimensions: [desglose === "paginas" ? "page" : "query"],
        rowLimit: Math.min(limite, 500),
      }),
    },
  );
  const body = await res.json();
  if (!res.ok) throw new Error(`Search Console ${res.status}: ${body.error?.message ?? "error"}`);
  return {
    periodo: `${fecha(dias)} a ${fecha(0)}`,
    filas: ((body.rows ?? []) as { keys: string[]; clicks: number; impressions: number; ctr: number; position: number }[]).map((r) => ({
      [desglose === "paginas" ? "pagina" : "consulta"]: r.keys[0],
      clics: r.clicks,
      impresiones: r.impressions,
      ctr: Math.round(r.ctr * 1000) / 10,
      posicion: Math.round(r.position * 10) / 10,
    })),
  };
}
