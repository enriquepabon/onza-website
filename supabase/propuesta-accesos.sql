-- Registro de accesos a las propuestas de cliente publicadas en /p/*.
-- Proyecto Supabase: onza-web (ref olzclgsavfrbuolvajjy).
--
-- Dos tipos de fila:
--   'registro' — la persona llenó el formulario de /acceso
--   'vista'    — abrió una página del documento (portal, propuesta, demo, simulador)
-- Ambas comparten visita_id, así que el recorrido completo se reconstruye agrupando por él.

create table if not exists public.propuesta_accesos (
  id          uuid primary key default gen_random_uuid(),
  visita_id   text not null,
  tipo        text not null check (tipo in ('registro', 'vista')),
  cliente     text not null,
  ruta        text not null,
  nombre      text,
  correo      text,
  empresa     text,
  cargo       text,
  ip          text,
  pais        text,
  ciudad      text,
  user_agent  text,
  referer     text,
  creado_en   timestamptz not null default now()
);

create index if not exists propuesta_accesos_cliente_fecha_idx
  on public.propuesta_accesos (cliente, creado_en desc);
create index if not exists propuesta_accesos_visita_idx
  on public.propuesta_accesos (visita_id);

-- RLS activo y sin políticas: nadie entra con la llave anónima.
-- Solo el service_role (el backend del sitio) puede escribir y leer.
alter table public.propuesta_accesos enable row level security;
revoke all on public.propuesta_accesos from anon, authenticated;

-- Una fila por visita y cliente: quién es, qué propuesta abrió, cuántas páginas
-- vio y cuándo. La identidad se toma del registro de esa visita, no del grupo,
-- para que no se pierda cuando la misma persona abre propuestas de dos clientes.
drop view if exists public.propuesta_visitas;
create view public.propuesta_visitas
with (security_invoker = true) as
with identidad as (
  select distinct on (visita_id)
    visita_id, nombre, correo, empresa, cargo, creado_en as registrado_en
  from public.propuesta_accesos
  where tipo = 'registro'
  order by visita_id, creado_en
)
select
  a.visita_id,
  a.cliente,
  i.nombre,
  i.correo,
  i.empresa,
  i.cargo,
  -- La geolocalización solo la resuelve el edge, así que llega en las vistas,
  -- no en la fila de registro.
  max(a.ciudad) as ciudad,
  max(a.pais) as pais,
  min(a.creado_en) as primer_acceso,
  max(a.creado_en) as ultimo_acceso,
  count(*) filter (where a.tipo = 'vista') as paginas_vistas,
  count(distinct a.ruta) filter (where a.tipo = 'vista') as documentos_distintos
from public.propuesta_accesos a
left join identidad i on i.visita_id = a.visita_id
group by a.visita_id, a.cliente, i.nombre, i.correo, i.empresa, i.cargo;

revoke all on public.propuesta_visitas from anon, authenticated;
