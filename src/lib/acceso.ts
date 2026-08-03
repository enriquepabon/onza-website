/**
 * Control de acceso a las propuestas de cliente en /p/*.
 *
 * Objetivo: trazabilidad. Antes de ver una propuesta el visitante deja nombre,
 * correo, empresa y cargo. La identidad viaja en una cookie firmada con HMAC
 * para que no se pueda fabricar a mano y para que el middleware la lea sin
 * consultar la base de datos.
 *
 * Este módulo corre en el runtime Edge (middleware). Solo Web Crypto, sin Node.
 */

export const ACCESO_COOKIE = "onza_acceso";
export const ACCESO_MAX_AGE = 60 * 60 * 24 * 90; // 90 días

export type AccesoPayload = {
  /** Identificador de la visita. Enlaza el registro con las páginas que abrió. */
  id: string;
  nombre: string;
  correo: string;
  empresa: string;
  cargo: string;
  /** Momento del registro, en milisegundos. */
  t: number;
};

/**
 * Si ACCESO_SECRET no está configurada se usa esta constante. La alternativa
 * (fallar cerrado) dejaría a un cliente frente a una propuesta rota por una
 * variable de entorno olvidada, y aquí no hay secretos que proteger: la firma
 * solo evita que alguien fabrique la cookie a mano para saltarse el formulario.
 */
const SECRETO_FALLBACK = "onza-acceso-propuestas-2026";

function secreto(): string {
  return process.env.ACCESO_SECRET || SECRETO_FALLBACK;
}

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function aBase64Url(datos: ArrayBuffer): string {
  const bytes = new Uint8Array(datos);
  let binario = "";
  for (let i = 0; i < bytes.length; i++) binario += String.fromCharCode(bytes[i]);
  return btoa(binario).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function desdeBase64Url(texto: string): ArrayBuffer {
  const normalizado = texto.replace(/-/g, "+").replace(/_/g, "/");
  const relleno = normalizado.length % 4 ? "=".repeat(4 - (normalizado.length % 4)) : "";
  const binario = atob(normalizado + relleno);
  const buffer = new ArrayBuffer(binario.length);
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < binario.length; i++) bytes[i] = binario.charCodeAt(i);
  return buffer;
}

/** TextEncoder devuelve Uint8Array; Web Crypto pide ArrayBuffer. */
function aBytes(texto: string): ArrayBuffer {
  const vista = encoder.encode(texto);
  const buffer = new ArrayBuffer(vista.length);
  new Uint8Array(buffer).set(vista);
  return buffer;
}

async function llaveHmac(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    aBytes(secreto()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function firmarAcceso(payload: AccesoPayload): Promise<string> {
  const cuerpo = aBase64Url(aBytes(JSON.stringify(payload)));
  const firma = await crypto.subtle.sign("HMAC", await llaveHmac(), aBytes(cuerpo));
  return `${cuerpo}.${aBase64Url(firma)}`;
}

export async function leerAcceso(token: string | undefined): Promise<AccesoPayload | null> {
  if (!token) return null;
  const [cuerpo, firma] = token.split(".");
  if (!cuerpo || !firma) return null;

  try {
    const valida = await crypto.subtle.verify(
      "HMAC",
      await llaveHmac(),
      desdeBase64Url(firma),
      aBytes(cuerpo)
    );
    if (!valida) return null;

    const payload = JSON.parse(decoder.decode(desdeBase64Url(cuerpo))) as AccesoPayload;
    if (!payload?.id || !payload?.correo) return null;
    if (Date.now() - payload.t > ACCESO_MAX_AGE * 1000) return null;
    return payload;
  } catch {
    return null;
  }
}

/** Prefijo de ruta → nombre del cliente, para etiquetar el registro. */
const CLIENTES: ReadonlyArray<{ prefijo: string; cliente: string }> = [
  { prefijo: "/p/plastibarranca", cliente: "Plastibarranca" },
  { prefijo: "/p/extrusiones", cliente: "Extrusiones S.A." },
  { prefijo: "/p/constructora-cajica", cliente: "Inversiones Milenium" },
  { prefijo: "/p/portal-sia-trade", cliente: "SIA Trade" },
  { prefijo: "/p/formacion-lacteos", cliente: "Lácteos" },
];

export function clienteDeRuta(pathname: string): string {
  return CLIENTES.find(({ prefijo }) => pathname.startsWith(prefijo))?.cliente ?? "Onza";
}

/**
 * Solo se protegen los documentos: páginas HTML y rutas de directorio.
 * Las imágenes y demás recursos de /p/*\/assets pasan sin interceptar, porque
 * redirigirlos rompería la página una vez el visitante ya se registró.
 */
export function esDocumentoProtegido(pathname: string): boolean {
  if (!pathname.startsWith("/p/")) return false;
  const ultimo = pathname.split("/").pop() ?? "";
  if (ultimo === "") return true;
  if (!ultimo.includes(".")) return true;
  return ultimo.toLowerCase().endsWith(".html");
}

/** Evita open redirects: solo se acepta volver a una propuesta de este sitio. */
export function rutaDeRetornoSegura(valor: string | null | undefined): string | null {
  if (!valor) return null;
  if (!valor.startsWith("/p/") || valor.startsWith("//")) return null;
  if (valor.includes("\\") || valor.includes("://")) return null;
  return valor;
}
