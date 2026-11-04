import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Ping diario (vercel.json → crons). El plan gratuito de Supabase pausa el
// proyecto tras 7 días sin actividad, y en pausa se pierden los accesos a las
// propuestas de /p/. Una lectura mínima cuenta como actividad.
//
// Si CRON_SECRET está definido, Vercel lo envía como Bearer y aquí se exige.
// Sin él la ruta queda abierta, pero solo lee una fila y no devuelve datos.
export async function GET(request: Request) {
  const secreto = process.env.CRON_SECRET;
  if (secreto && request.headers.get("authorization") !== `Bearer ${secreto}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const url = process.env.SUPABASE_URL;
  const llave = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !llave) {
    return NextResponse.json({ ok: false, error: "Supabase sin configurar" }, { status: 500 });
  }

  try {
    const respuesta = await fetch(`${url}/rest/v1/propuesta_accesos?select=id&limit=1`, {
      headers: { apikey: llave, Authorization: `Bearer ${llave}` },
      cache: "no-store",
    });
    if (!respuesta.ok) {
      console.error("[cron-supabase] respuesta", respuesta.status, await respuesta.text());
      return NextResponse.json({ ok: false, status: respuesta.status }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[cron-supabase] sin conexión", error);
    return NextResponse.json({ ok: false, error: "Sin conexión con Supabase" }, { status: 502 });
  }
}
