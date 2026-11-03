# Onza Website

## What This Is
Website for Onza — a boutique AI solutions consulting firm based in Colombia targeting LATAM.

## Stack
Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS 3, Framer Motion, Resend

## Brand Rules (NON-NEGOTIABLE)
- Aesthetic: Minimalista premium (Apple/Aesop/Tesla feel)
- NEVER use tool-centric headlines (n8n, RAG, Python)
- ALWAYS lead with business/operational impact
- NEVER mention agroindustria
- NEVER promise "100% ROI garantizado"
- Language: Spanish profesional LATAM
- Tone: Firma boutique — sophisticated, precise, authoritative

## Colors
- Primary BG: #FFFFFF | Dark BG: #0C0C0C
- Text: #1A1A1A (primary) | #666666 (secondary)
- Accent Red: #FF3B30 | Gold: #D4AF37
- Cream: #F5F1E8 | Navy: #1A2A3A

## Typography
- Headlines/Body: Inter (Helvetica Neue substitute)
- Logo/Special: Montserrat Light (Futura substitute)

## Commands
- `npm run dev` — dev server
- `npm run build` — production build
- `npm run lint` — linting

## Propuestas de cliente (/p/*)

Los portales de cliente son HTML estático en `public/p/<cliente>/`. Están cerrados
tras un formulario de identificación, para saber quién abre cada propuesta.

- `src/middleware.ts` — intercepta todo documento HTML bajo `/p/`. Sin cookie
  válida redirige a `/acceso?r=<ruta>`; con cookie deja pasar y registra la vista.
  Los recursos con extensión (`/assets/*.jpg`) pasan sin interceptar.
- `src/app/acceso/route.ts` — el formulario (nombre, correo, empresa, cargo).
  Se sirve como HTML propio, fuera del layout del sitio, con la estética de los
  portales.
- `src/app/api/acceso/route.ts` — valida, firma la cookie (90 días), guarda el
  registro y avisa a Enrique por correo.
- `src/lib/acceso.ts` — firma HMAC de la cookie y mapa ruta → cliente. **Al
  publicar una propuesta nueva hay que sumar su prefijo a `CLIENTES`**, o el
  registro queda etiquetado como "Onza".
- Datos en Supabase `onza-web` (ref `olzclgsavfrbuolvajjy`), tabla
  `propuesta_accesos` y vista `propuesta_visitas`. Esquema en
  `supabase/propuesta-accesos.sql`. RLS activo sin políticas: solo el
  service_role lee y escribe.

Variables de entorno: `ACCESO_SECRET`, `SUPABASE_URL`,
`SUPABASE_SERVICE_ROLE_KEY` (más `RESEND_API_KEY` y `CONTACT_EMAIL` para el aviso).

## MCP (Claude y ChatGPT)

`https://onzaai.com/api/mcp` es un servidor MCP (Streamable HTTP, sin sesiones)
para consultar el sitio desde Claude o ChatGPT. Código en `src/lib/mcp/`.

- OAuth 2.1 propio, sin base de datos (`src/lib/mcp/oauth.ts`): registro
  dinámico de clientes, PKCE S256, `resource` y `iss` (RFC 9207). Clientes,
  códigos y tokens son cargas firmadas con una llave derivada de
  `ACCESO_SECRET`. Subir `MCP_TOKEN_VERSION` invalida todas las conexiones.
- Solo autoriza al dueño: `/oauth/authorize` envía un código de 8 caracteres a
  `MCP_OWNER_EMAIL` (por defecto `CONTACT_EMAIL`) por Resend.
- Metadatos en `/.well-known/oauth-protected-resource` (también con
  `/api/mcp` al final) y `/.well-known/oauth-authorization-server`.
- Herramientas (`src/lib/mcp/server.ts`): resumen_actividad, leads (Notion),
  propuestas_visitas y propuesta_recorrido (Supabase), trafico_web y
  busquedas_google (Google), blog_listar, blog_leer, blog_guia, blog_validar,
  blog_crear_borrador (abre un PR, nunca publica), search y fetch (formato de
  ChatGPT) y get_profile (`openai/profile`).
- Variables opcionales: `GOOGLE_SERVICE_ACCOUNT_JSON` (cuenta de servicio con
  lectura en GA4 `531795156` y Search Console), `GITHUB_TOKEN` (contenido y PR
  sobre el repo). Sin ellas, esas herramientas responden qué falta.
- `next.config.mjs` incluye `content/blog` en la función `/api/mcp`.
