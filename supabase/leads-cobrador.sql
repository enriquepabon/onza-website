-- Leads de la landing del cobrador digital (onzaai.com/cobrador).
-- Proyecto Supabase: onza-web (ref olzclgsavfrbuolvajjy).
--
-- Una fila por envío del formulario. El aviso a Enrique sale por Resend en el
-- mismo momento; esta tabla es el registro que queda y la base para medir los
-- anuncios (fuente y utm_*).

create table if not exists public.leads_cobrador (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),
  nombre         text not null,
  empresa        text not null,
  cargo          text not null,
  correo         text not null,
  whatsapp       text not null,
  -- Cartera vencida entre 31 y 180 días. Las etiquetas visibles están en
  -- src/lib/cobrador.ts.
  rango_cartera  text not null check (
    rango_cartera in ('menos-20m', '20m-50m', '50m-200m', 'mas-200m', 'no-se')
  ),
  -- utm_source de la visita, o 'directo' si llegó sin UTM.
  fuente         text not null default 'directo',
  utm_source     text,
  utm_medium     text,
  utm_campaign   text,
  utm_content    text,
  utm_term       text,
  -- Ruta del formulario, por si la oferta cambia de página (p. ej. 3 cargos).
  pagina         text not null default '/cobrador',
  referer        text,
  user_agent     text,
  pais           text,
  ciudad         text
);

create index if not exists leads_cobrador_fecha_idx
  on public.leads_cobrador (created_at desc);

-- Igual que propuesta_accesos: RLS activo y sin políticas. Nadie entra con la
-- llave anónima; solo el service_role (el backend del sitio) escribe y lee.
alter table public.leads_cobrador enable row level security;
revoke all on public.leads_cobrador from anon, authenticated;
