/**
 * Servidor OAuth 2.1 mínimo para el MCP de Onza.
 *
 * Claude y ChatGPT solo aceptan conectores remotos con OAuth (registro dinámico
 * de clientes + PKCE S256). Aquí no hay base de datos: clientes, códigos y
 * tokens son cargas firmadas con HMAC. La llave sale de ACCESO_SECRET (ya
 * existe en Vercel); subir MCP_TOKEN_VERSION invalida todas las conexiones.
 *
 * Solo hay un usuario posible, el dueño: para autorizar, se le envía un código
 * a su correo (MCP_OWNER_EMAIL, por defecto CONTACT_EMAIL).
 */

import { createHash, createHmac, randomBytes, randomInt, timingSafeEqual } from "crypto";

export const SCOPE = "onza";
export const OWNER_EMAIL =
  process.env.MCP_OWNER_EMAIL || process.env.CONTACT_EMAIL || "enrique@onzaai.com";

const TTL = {
  pendiente: 10 * 60, // código enviado por correo
  codigo: 5 * 60, // authorization code
  acceso: 60 * 60, // access token
  renovacion: 90 * 24 * 60 * 60, // refresh token
};

// En producción el emisor es fijo; en desarrollo se toma del origen local
export function issuerFrom(request: Request): string {
  if (process.env.MCP_ISSUER) return process.env.MCP_ISSUER;
  if (process.env.NODE_ENV !== "production") return new URL(request.url).origin;
  return "https://onzaai.com";
}

export const resourceFrom = (request: Request) => `${issuerFrom(request)}/api/mcp`;

// ── Firma ──────────────────────────────────────────────────────────────────

function llave(): Buffer {
  const base = process.env.MCP_SECRET || process.env.ACCESO_SECRET;
  if (!base) throw new Error("Falta ACCESO_SECRET (o MCP_SECRET) para firmar tokens del MCP");
  return createHmac("sha256", base)
    .update(`onza-mcp-oauth-v${process.env.MCP_TOKEN_VERSION || "1"}`)
    .digest();
}

const b64url = (buf: Buffer | string) => Buffer.from(buf).toString("base64url");

function hmac(texto: string): string {
  return createHmac("sha256", llave()).update(texto).digest("base64url");
}

function igual(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

type Tipo = "cliente" | "pendiente" | "codigo" | "acceso" | "renovacion";
const PREFIJO: Record<Tipo, string> = {
  cliente: "oc",
  pendiente: "op",
  codigo: "oac",
  acceso: "oat",
  renovacion: "ort",
};

function firmar<T extends object>(tipo: Tipo, datos: T, ttl?: number): string {
  const ahora = Math.floor(Date.now() / 1000);
  const carga = { ...datos, iat: ahora, ...(ttl ? { exp: ahora + ttl } : {}) };
  const cuerpo = `${PREFIJO[tipo]}.${b64url(JSON.stringify(carga))}`;
  return `${cuerpo}.${hmac(cuerpo)}`;
}

function leer<T>(tipo: Tipo, token: string | null | undefined): (T & { iat: number; exp?: number }) | null {
  if (!token) return null;
  const partes = token.split(".");
  if (partes.length !== 3 || partes[0] !== PREFIJO[tipo]) return null;
  const cuerpo = `${partes[0]}.${partes[1]}`;
  try {
    if (!igual(hmac(cuerpo), partes[2])) return null;
    const carga = JSON.parse(Buffer.from(partes[1], "base64url").toString());
    if (carga.exp && carga.exp < Math.floor(Date.now() / 1000)) return null;
    return carga;
  } catch {
    return null;
  }
}

// ── Clientes (registro dinámico, RFC 7591) ─────────────────────────────────

export type MetodoAuth = "none" | "client_secret_post" | "client_secret_basic";

export interface Cliente {
  r: string[]; // redirect_uris
  n: string; // client_name
  m: MetodoAuth;
}

export function redirectValida(uri: unknown): uri is string {
  if (typeof uri !== "string" || uri.length > 500) return false;
  try {
    const u = new URL(uri);
    if (u.hash) return false;
    if (u.protocol === "https:") return true;
    // Clientes locales (Claude Code, MCP Inspector) usan loopback por http
    return u.protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(u.hostname);
  } catch {
    return false;
  }
}

export function registrarCliente(cliente: Cliente): { clientId: string; secret?: string } {
  const clientId = firmar("cliente", cliente);
  return cliente.m === "none" ? { clientId } : { clientId, secret: secretoDe(clientId) };
}

export const secretoDe = (clientId: string) => hmac(`secreto:${clientId}`);

export const leerCliente = (clientId: string | null) => leer<Cliente>("cliente", clientId);

// La redirección debe coincidir exacta; en loopback se permite otro puerto (RFC 8252)
export function redirectRegistrada(cliente: Cliente, uri: string): boolean {
  if (cliente.r.includes(uri)) return true;
  try {
    const pedida = new URL(uri);
    if (pedida.protocol !== "http:") return false;
    return cliente.r.some((r) => {
      const reg = new URL(r);
      return reg.protocol === "http:" && reg.hostname === pedida.hostname && reg.pathname === pedida.pathname;
    });
  } catch {
    return false;
  }
}

// ── Autorización ───────────────────────────────────────────────────────────

export interface Solicitud {
  c: string; // client_id
  r: string; // redirect_uri
  ch: string; // code_challenge (S256)
  s?: string; // state
  sc: string; // scope
  res: string; // resource
}

const ALFABETO = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

// Código de 8 caracteres (32^8 combinaciones): no se puede adivinar en línea
export function nuevoCodigoCorreo(): string {
  return Array.from({ length: 8 }, () => ALFABETO[randomInt(ALFABETO.length)]).join("");
}

export const normalizarCodigo = (texto: string) => texto.toUpperCase().replace(/[^A-Z0-9]/g, "");

export function firmarPendiente(solicitud: Solicitud, codigo: string): string {
  const nonce = randomBytes(12).toString("base64url");
  return firmar("pendiente", { ...solicitud, n: nonce, h: hmac(`codigo:${codigo}:${nonce}`) }, TTL.pendiente);
}

export function verificarPendiente(token: string, codigo: string): Solicitud | null {
  const p = leer<Solicitud & { n: string; h: string }>("pendiente", token);
  if (!p) return null;
  if (!igual(hmac(`codigo:${normalizarCodigo(codigo)}:${p.n}`), p.h)) return null;
  return { c: p.c, r: p.r, ch: p.ch, s: p.s, sc: p.sc, res: p.res };
}

export const leerPendiente = (token: string) => leer<Solicitud>("pendiente", token);

export function emitirCodigo(solicitud: Solicitud): string {
  return firmar("codigo", { ...solicitud, sub: OWNER_EMAIL }, TTL.codigo);
}

export const leerCodigo = (codigo: string) => leer<Solicitud & { sub: string }>("codigo", codigo);

export function pkceValido(verifier: string, challenge: string): boolean {
  if (!/^[A-Za-z0-9\-._~]{43,128}$/.test(verifier)) return false;
  return igual(createHash("sha256").update(verifier).digest("base64url"), challenge);
}

// ── Tokens ─────────────────────────────────────────────────────────────────

export interface Concesion {
  sub: string;
  c: string; // client_id
  sc: string;
  aud: string; // resource
}

export function emitirTokens(concesion: Concesion) {
  return {
    access_token: firmar("acceso", concesion, TTL.acceso),
    token_type: "Bearer",
    expires_in: TTL.acceso,
    refresh_token: firmar("renovacion", concesion, TTL.renovacion),
    scope: concesion.sc,
  };
}

export const leerRenovacion = (token: string) => leer<Concesion>("renovacion", token);

export function verificarAcceso(request: Request): (Concesion & { exp?: number; token: string }) | null {
  const encabezado = request.headers.get("authorization") || "";
  const token = encabezado.match(/^Bearer\s+(.+)$/i)?.[1]?.trim();
  const concesion = leer<Concesion>("acceso", token);
  if (!token || !concesion) return null;
  if (concesion.aud !== resourceFrom(request) || concesion.sub !== OWNER_EMAIL) return null;
  return { ...concesion, token };
}

// ── Respuestas comunes ─────────────────────────────────────────────────────

export const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type, mcp-protocol-version, mcp-session-id",
  "Access-Control-Expose-Headers": "WWW-Authenticate, mcp-session-id",
};

export function json(datos: unknown, status = 200, extra: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(datos), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...CORS, ...extra },
  });
}

export const opciones = () => new Response(null, { status: 204, headers: CORS });

export function metadatosRecurso(request: Request) {
  const issuer = issuerFrom(request);
  return {
    resource: resourceFrom(request),
    authorization_servers: [issuer],
    scopes_supported: [SCOPE],
    bearer_methods_supported: ["header"],
    resource_name: "Onza",
    resource_documentation: `${issuer}/`,
  };
}

export function metadatosServidor(request: Request) {
  const issuer = issuerFrom(request);
  return {
    issuer,
    authorization_endpoint: `${issuer}/oauth/authorize`,
    token_endpoint: `${issuer}/oauth/token`,
    registration_endpoint: `${issuer}/oauth/register`,
    response_types_supported: ["code"],
    response_modes_supported: ["query"],
    grant_types_supported: ["authorization_code", "refresh_token"],
    code_challenge_methods_supported: ["S256"],
    token_endpoint_auth_methods_supported: ["none", "client_secret_post", "client_secret_basic"],
    scopes_supported: [SCOPE],
    authorization_response_iss_parameter_supported: true,
    service_documentation: `${issuer}/`,
  };
}
