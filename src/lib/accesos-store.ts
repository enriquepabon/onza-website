/**
 * Persistencia de los accesos a propuestas en Supabase.
 *
 * Se usa la API REST con fetch en vez del SDK para que el mismo módulo sirva en
 * el middleware (runtime Edge) y en las rutas de API (runtime Node).
 */

export type TipoAcceso = "registro" | "vista";

export type RegistroAcceso = {
  visita_id: string;
  tipo: TipoAcceso;
  cliente: string;
  ruta: string;
  nombre?: string | null;
  correo?: string | null;
  empresa?: string | null;
  cargo?: string | null;
  ip?: string | null;
  pais?: string | null;
  ciudad?: string | null;
  user_agent?: string | null;
  referer?: string | null;
};

/**
 * Inserta el registro. Nunca lanza: la trazabilidad no puede tumbar la entrega
 * de una propuesta al cliente.
 */
export async function guardarAcceso(registro: RegistroAcceso): Promise<void> {
  const url = process.env.SUPABASE_URL;
  const llave = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !llave) return;

  try {
    await fetch(`${url}/rest/v1/propuesta_accesos`, {
      method: "POST",
      headers: {
        apikey: llave,
        Authorization: `Bearer ${llave}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(registro),
    });
  } catch {
    // silencio intencional
  }
}
