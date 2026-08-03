import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import {
  ACCESO_COOKIE,
  clienteDeRuta,
  esDocumentoProtegido,
  leerAcceso,
} from "@/lib/acceso";
import { guardarAcceso } from "@/lib/accesos-store";

/**
 * Puerta de entrada a las propuestas de cliente. Sin cookie de acceso válida,
 * cualquier documento bajo /p/ manda al formulario y vuelve a la URL original
 * apenas el visitante se identifica. Los enlaces ya enviados no cambian.
 */
export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const { pathname, search } = request.nextUrl;
  if (!esDocumentoProtegido(pathname)) return NextResponse.next();

  const acceso = await leerAcceso(request.cookies.get(ACCESO_COOKIE)?.value);

  if (!acceso) {
    const destino = new URL("/acceso", request.url);
    destino.searchParams.set("r", pathname + search);
    return NextResponse.redirect(destino);
  }

  event.waitUntil(
    guardarAcceso({
      visita_id: acceso.id,
      tipo: "vista",
      cliente: clienteDeRuta(pathname),
      ruta: pathname,
      nombre: acceso.nombre,
      correo: acceso.correo,
      empresa: acceso.empresa,
      cargo: acceso.cargo,
      ip: request.ip ?? request.headers.get("x-forwarded-for"),
      pais: request.geo?.country ?? null,
      ciudad: request.geo?.city ?? null,
      user_agent: request.headers.get("user-agent"),
      referer: request.headers.get("referer"),
    })
  );

  return NextResponse.next();
}

export const config = {
  matcher: ["/p/:path*"],
};
