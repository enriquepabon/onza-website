// Herramientas de blog del MCP: guía de estilo, validación y borradores como PR.
// Los artículos son MDX en content/blog; publicar es fusionar el PR a main.

import matter from "gray-matter";
import { getAllPosts } from "@/lib/blog";

const CATEGORIAS = ["Automatización", "Diagnóstico", "Estrategia", "Formación", "Herramientas", "Industria", "Soluciones"];

const ENLACES_SERVICIO = [
  "/servicios/automatizacion-ia",
  "/servicios/agentes-ia",
  "/servicios/chatbot-ia",
  "/servicios/formacion-ia",
  "/servicios/diagnostico-ia",
  "/recursos/diagnostico-ia",
  "/contacto",
];

export function listarPosts() {
  return getAllPosts().map((p) => ({
    slug: p.slug,
    titulo: p.title,
    descripcion: p.description,
    fecha: p.date,
    categoria: p.category,
    palabrasClave: p.keywords,
    url: `https://onzaai.com/blog/${p.slug}`,
  }));
}

export function leerPost(slug: string) {
  const post = getAllPosts().find((p) => p.slug === slug);
  return post ? { ...post, url: `https://onzaai.com/blog/${post.slug}` } : null;
}

export function guiaBlog() {
  const posts = listarPosts();
  return {
    marca: [
      "Onza es una firma boutique de arquitectura de soluciones IA para empresas medianas en LATAM. Tono sobrio, preciso y con autoridad, como un consultor senior.",
      "Español profesional neutro de Latinoamérica, tuteo.",
      "Abre siempre con el impacto operativo o financiero (horas, costos, errores, tiempos de respuesta), nunca con la tecnología.",
      "Nunca titulares ni subtítulos centrados en herramientas (n8n, RAG, Python, LangChain, Zapier).",
      "Nunca menciones agroindustria.",
      "Nunca prometas ROI garantizado ni porcentajes de retorno seguros. Las cifras van como rangos con su supuesto.",
      "Sin guiones largos (—), sin signos de exclamación, sin emojis, sin relleno como 'crucial', 'fundamental', 'potenciar' o 'en el panorama actual'.",
    ],
    estructura: [
      "Entre 700 y 1.400 palabras.",
      "Un párrafo de entrada que plantea el problema del lector, sin título (el título sale del frontmatter; no uses '# ').",
      "De 4 a 7 secciones con '## '. Subtítulos que dicen algo, no 'Introducción' ni 'Conclusión'.",
      "Al menos 3 enlaces internos: otros artículos del blog y un servicio relacionado.",
      "Cierre con una invitación concreta: el diagnóstico gratuito (/recursos/diagnostico-ia) o el servicio del tema.",
    ],
    imagenes: [
      "Toda nota lleva portada: horizontal, de al menos 1600 × 900, en JPG o WebP de menos de 1 MB. Se muestra a todo el ancho y recortada a 16:10 en el listado.",
      "Las imágenes dentro del texto van con un alt que describa lo que se ve, no con palabras clave.",
      "Flujo: blog_crear_borrador, luego blog_agregar_imagen (uso portada, y las de contenido que hagan falta) e insertar en el MDX el markdown que devuelve con blog_actualizar_borrador.",
      "Fotos reales de operación o abstractas sobrias. Nada de robots, cerebros brillantes ni pantallas con código.",
    ],
    frontmatter: [
      "---",
      'title: "Título de máximo 70 caracteres, orientado al resultado"',
      'description: "Entre 120 y 170 caracteres. Es la descripción para Google."',
      `date: "${new Date().toISOString().slice(0, 10)}"`,
      'author: "Enrique Pabón"',
      `category: "${CATEGORIAS[2]}"`,
      'keywords: ["frase clave principal", "variante", "variante LATAM"]',
      "---",
    ].join("\n"),
    categorias: CATEGORIAS,
    enlacesServicio: ENLACES_SERVICIO,
    articulosExistentes: posts.map((p) => ({ slug: p.slug, titulo: p.titulo, categoria: p.categoria, url: `/blog/${p.slug}` })),
  };
}

export interface Hallazgo {
  nivel: "error" | "advertencia";
  mensaje: string;
}

const HERRAMIENTAS = /\b(n8n|RAG|Python|LangChain|Zapier|Make\.com|LlamaIndex)\b/i;

export function validarPost(mdx: string, slug?: string): { valido: boolean; hallazgos: Hallazgo[]; palabras: number } {
  const hallazgos: Hallazgo[] = [];
  const error = (mensaje: string) => hallazgos.push({ nivel: "error", mensaje });
  const aviso = (mensaje: string) => hallazgos.push({ nivel: "advertencia", mensaje });

  let data: Record<string, unknown> = {};
  let cuerpo = mdx;
  try {
    const parsed = matter(mdx);
    data = parsed.data;
    cuerpo = parsed.content;
  } catch {
    error("El frontmatter no se pudo leer. Debe ir entre líneas '---' al inicio.");
  }

  const titulo = typeof data.title === "string" ? data.title : "";
  const descripcion = typeof data.description === "string" ? data.description : "";
  if (!titulo) error("Falta title en el frontmatter.");
  else if (titulo.length > 70) aviso(`El título tiene ${titulo.length} caracteres; Google corta cerca de 70.`);
  if (!descripcion) error("Falta description en el frontmatter.");
  else if (descripcion.length < 120 || descripcion.length > 170) {
    aviso(`La descripción tiene ${descripcion.length} caracteres; lo ideal es entre 120 y 170.`);
  }
  if (typeof data.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
    error('date debe ser texto con formato "AAAA-MM-DD".');
  }
  if (typeof data.category !== "string" || !data.category) error("Falta category.");
  else if (!CATEGORIAS.includes(data.category)) aviso(`La categoría "${data.category}" es nueva; las actuales son ${CATEGORIAS.join(", ")}.`);
  if (!Array.isArray(data.keywords) || data.keywords.length < 3) aviso("Agrega al menos 3 keywords.");
  if (typeof data.image !== "string") aviso("Sin portada: después de crear el borrador, súbela con blog_agregar_imagen (uso portada).");

  if (slug !== undefined) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) error("El slug solo admite minúsculas sin tildes, números y guiones.");
    else if (listarPosts().some((p) => p.slug === slug)) error(`Ya existe un artículo con el slug "${slug}".`);
  }

  const texto = `${titulo}\n${descripcion}\n${cuerpo}`;
  if (/agroindustri/i.test(texto)) error("Menciona agroindustria, que está fuera de la marca.");
  if (/ROI\s+garantizad|garantiza\w*\s+(el\s+)?(ROI|retorno)|100\s?%\s+(de\s+)?(ROI|retorno)/i.test(texto)) {
    error("Promete retorno garantizado. Usa rangos con su supuesto.");
  }
  if (HERRAMIENTAS.test(titulo)) error("El título se centra en una herramienta; debe hablar del resultado de negocio.");
  const subtitulos = cuerpo.match(/^#{2,3}\s.+$/gm) ?? [];
  for (const h of subtitulos) if (HERRAMIENTAS.test(h)) error(`Subtítulo centrado en herramienta: "${h.replace(/^#+\s/, "")}".`);
  if (/^#\s/m.test(cuerpo)) aviso("No uses '# ' en el cuerpo: el título sale del frontmatter.");

  const palabras = cuerpo.replace(/[#*_>`[\]()-]/g, " ").split(/\s+/).filter(Boolean).length;
  if (palabras < 450) error(`Tiene ${palabras} palabras; el mínimo es 450 y lo habitual del blog es 700 a 1.400.`);
  else if (palabras < 650) aviso(`Tiene ${palabras} palabras; los artículos del blog tienen entre 700 y 1.400.`);
  if (subtitulos.length < 3) aviso("Usa al menos 3 secciones con '## '.");

  const internos = cuerpo.match(/\]\(\/[^)]+\)/g) ?? [];
  if (internos.length < 3) aviso(`Tiene ${internos.length} enlaces internos; usa al menos 3 (artículos y un servicio).`);
  const guiones = (cuerpo.match(/—/g) ?? []).length;
  if (guiones) aviso(`Tiene ${guiones} guiones largos (—); el blog no los usa.`);
  if (/!(?!\[)/.test(cuerpo.replace(/!\[[^\]]*\]\([^)]*\)/g, ""))) aviso("Tiene signos de exclamación; el tono de la marca los evita.");

  return { valido: !hallazgos.some((h) => h.nivel === "error"), hallazgos, palabras };
}

// ── GitHub: borradores como PR ─────────────────────────────────────────────
// Requiere GITHUB_TOKEN con permiso de contenido y pull requests sobre el repo.

class ErrorGitHub extends Error {
  constructor(public status: number, mensaje: string) {
    super(mensaje);
  }
}

function github() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO || "enriquepabon/onza-website";
  if (!token) {
    throw new Error(
      "Falta GITHUB_TOKEN en Vercel. Mientras tanto, entrega el MDX validado para que Enrique lo agregue en content/blog/.",
    );
  }
  return async (path: string, init?: RequestInit) => {
    const api = process.env.GITHUB_API_URL || "https://api.github.com";
    const res = await fetch(`${api}/repos/${repo}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
      },
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) throw new ErrorGitHub(res.status, `GitHub ${res.status} en ${path}: ${body.message ?? "error"}`);
    return body;
  };
}

type GitHub = ReturnType<typeof github>;

const rama = (slug: string) => `blog/${slug}`;
const rutaMdx = (slug: string) => `content/blog/${slug}.mdx`;

async function exigirRama(gh: GitHub, slug: string) {
  try {
    await gh(`/git/ref/heads/${rama(slug)}`);
  } catch (error) {
    if (error instanceof ErrorGitHub && error.status === 404) {
      throw new Error(`No hay borrador para "${slug}". Créalo primero con blog_crear_borrador.`);
    }
    throw error;
  }
}

async function leerArchivo(gh: GitHub, ruta: string, ref: string): Promise<{ sha: string; texto: string } | null> {
  try {
    const f = await gh(`/contents/${ruta}?ref=${encodeURIComponent(ref)}`);
    return { sha: f.sha, texto: Buffer.from(f.content ?? "", "base64").toString("utf8") };
  } catch (error) {
    if (error instanceof ErrorGitHub && error.status === 404) return null;
    throw error;
  }
}

async function guardarArchivo(gh: GitHub, ruta: string, ref: string, contenido: Buffer, mensaje: string) {
  const actual = await leerArchivo(gh, ruta, ref);
  await gh(`/contents/${ruta}`, {
    method: "PUT",
    body: JSON.stringify({ message: mensaje, content: contenido.toString("base64"), branch: ref, ...(actual ? { sha: actual.sha } : {}) }),
  });
}

export async function crearBorrador(slug: string, mdx: string, nota?: string) {
  const gh = github();
  const titulo = String(matter(mdx).data.title ?? slug);
  const main = await gh("/git/ref/heads/main");
  try {
    await gh("/git/refs", { method: "POST", body: JSON.stringify({ ref: `refs/heads/${rama(slug)}`, sha: main.object.sha }) });
  } catch (error) {
    if (error instanceof ErrorGitHub && error.status === 422) {
      throw new Error(`Ya existe un borrador para "${slug}". Usa blog_actualizar_borrador para cambiarlo.`);
    }
    throw error;
  }
  await guardarArchivo(gh, rutaMdx(slug), rama(slug), Buffer.from(mdx), `Blog: ${titulo}`);
  const pr = await gh("/pulls", {
    method: "POST",
    body: JSON.stringify({
      title: `Blog: ${titulo}`,
      head: rama(slug),
      base: "main",
      body: `Borrador creado desde el MCP de Onza.${nota ? `\n\n${nota}` : ""}\n\nVercel deja una vista previa en este PR. Al fusionarlo, el artículo se publica en https://onzaai.com/blog/${slug}.`,
    }),
  });
  return { pr: pr.html_url as string, rama: rama(slug), url: `https://onzaai.com/blog/${slug}` };
}

export async function actualizarBorrador(slug: string, mdx: string) {
  const gh = github();
  await exigirRama(gh, slug);
  await guardarArchivo(gh, rutaMdx(slug), rama(slug), Buffer.from(mdx), `Blog: ajustes a ${slug}`);
  const prs = await gh(`/pulls?head=${encodeURIComponent(`${(process.env.GITHUB_REPO || "enriquepabon/onza-website").split("/")[0]}:${rama(slug)}`)}&state=open`);
  return { rama: rama(slug), pr: (prs[0]?.html_url as string | undefined) ?? null };
}

// ── Imágenes ───────────────────────────────────────────────────────────────

const MAX_IMAGEN = 8 * 1024 * 1024;

// Se reconoce el formato por los primeros bytes: ChatGPT y Drive a veces
// entregan las imágenes como application/octet-stream
function formatoImagen(b: Buffer): string | null {
  if (b.length < 12) return null;
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "jpg";
  if (b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "png";
  if (b.subarray(0, 4).toString("ascii") === "RIFF" && b.subarray(8, 12).toString("ascii") === "WEBP") return "webp";
  if (b.subarray(4, 12).toString("ascii").startsWith("ftypavi")) return "avif";
  return null;
}

// Un enlace de Drive "compartir" devuelve una página, no el archivo
function urlDescargable(url: string): string {
  const drive = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]{20,})/);
  return drive ? `https://drive.google.com/uc?export=download&id=${drive[1]}` : url;
}

async function descargar(url: string): Promise<Buffer> {
  const u = new URL(urlDescargable(url));
  const privada = /^(localhost|127\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.|\[?::1\]?$)/;
  if (u.protocol !== "https:" || privada.test(u.hostname)) throw new Error("La imagen debe estar en una URL https pública.");
  const res = await fetch(u, { redirect: "follow", signal: AbortSignal.timeout(20_000) });
  if (!res.ok) throw new Error(`No se pudo descargar la imagen (HTTP ${res.status}).`);
  if (Number(res.headers.get("content-length") ?? 0) > MAX_IMAGEN) throw new Error("La imagen pesa más de 8 MB.");
  const bytes = Buffer.from(await res.arrayBuffer());
  if (bytes.length > MAX_IMAGEN) throw new Error("La imagen pesa más de 8 MB.");
  return bytes;
}

const nombreArchivo = (texto: string) =>
  texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50) || "imagen";

// Pone o reemplaza "image:" en el frontmatter sin reescribir el resto
function conPortada(mdx: string, ruta: string): string {
  const m = mdx.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return mdx;
  const linea = `image: "${ruta}"`;
  const fm = /^image:.*$/m.test(m[1]) ? m[1].replace(/^image:.*$/m, linea) : `${m[1]}\n${linea}`;
  return mdx.replace(m[0], `---\n${fm}\n---`);
}

export interface OrigenImagen {
  url?: string;
  base64?: string;
}

export async function agregarImagen({ slug, origen, uso, alt, nombre }: { slug: string; origen: OrigenImagen; uso: "portada" | "contenido"; alt: string; nombre?: string }) {
  const gh = github();
  await exigirRama(gh, slug);

  const bytes = origen.base64 ? Buffer.from(origen.base64.replace(/^data:[^,]+,/, ""), "base64") : await descargar(origen.url!);
  if (bytes.length > MAX_IMAGEN) throw new Error("La imagen pesa más de 8 MB.");
  const ext = formatoImagen(bytes);
  if (!ext) throw new Error("El archivo no es una imagen JPG, PNG, WebP o AVIF.");

  const archivo = uso === "portada" ? `portada.${ext}` : `${nombreArchivo(nombre || alt)}.${ext}`;
  const publica = `/images/blog/${slug}/${archivo}`;
  await guardarArchivo(gh, `public${publica}`, rama(slug), bytes, `Blog: imagen ${archivo} para ${slug}`);

  let portadaEnMdx = false;
  if (uso === "portada") {
    const mdx = await leerArchivo(gh, rutaMdx(slug), rama(slug));
    if (mdx) {
      await guardarArchivo(gh, rutaMdx(slug), rama(slug), Buffer.from(conPortada(mdx.texto, publica)), `Blog: portada de ${slug}`);
      portadaEnMdx = true;
    }
  }

  return {
    ruta: publica,
    pesoKB: Math.round(bytes.length / 1024),
    ...(uso === "contenido" ? { markdown: `![${alt.replace(/[[\]]/g, "")}](${publica})` } : { portadaEnMdx }),
    rama: rama(slug),
  };
}
