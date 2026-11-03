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

// Abre un PR en GitHub con el artículo. Requiere GITHUB_TOKEN con permiso de
// contenido y pull requests sobre el repositorio.
export async function crearBorrador(slug: string, mdx: string, nota?: string) {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO || "enriquepabon/onza-website";
  if (!token) {
    throw new Error(
      "Falta GITHUB_TOKEN en Vercel. Mientras tanto, entrega el MDX validado para que Enrique lo agregue en content/blog/.",
    );
  }
  const gh = async (path: string, init?: RequestInit) => {
    const res = await fetch(`https://api.github.com/repos/${repo}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
      },
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(`GitHub ${res.status} en ${path}: ${body.message ?? "error"}`);
    return body;
  };

  const titulo = String(matter(mdx).data.title ?? slug);
  const rama = `blog/${slug}`;
  const main = await gh("/git/ref/heads/main");
  await gh("/git/refs", { method: "POST", body: JSON.stringify({ ref: `refs/heads/${rama}`, sha: main.object.sha }) });
  await gh(`/contents/content/blog/${slug}.mdx`, {
    method: "PUT",
    body: JSON.stringify({ message: `Blog: ${titulo}`, content: Buffer.from(mdx).toString("base64"), branch: rama }),
  });
  const pr = await gh("/pulls", {
    method: "POST",
    body: JSON.stringify({
      title: `Blog: ${titulo}`,
      head: rama,
      base: "main",
      body: `Borrador creado desde el MCP de Onza.${nota ? `\n\n${nota}` : ""}\n\nVercel deja una vista previa en este PR. Al fusionarlo, el artículo se publica en https://onzaai.com/blog/${slug}.`,
    }),
  });
  return { pr: pr.html_url as string, rama, url: `https://onzaai.com/blog/${slug}` };
}
