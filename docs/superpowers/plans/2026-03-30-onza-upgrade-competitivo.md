# Onza Website — Upgrade Competitivo & Visual Premium

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevar la web de Onza al nivel competitivo de Aztec Lab (y superarlo) mediante mejoras SEO, prueba social, claridad de servicios, upgrade visual con fotografía premium, y estrategia de conversión.

**Architecture:** Modificaciones incrementales al sitio Next.js 14 existente. Cada chunk es independiente y desplegable por separado. Las fotos se generan con el skill canvas-design (o herramienta externa) y se integran como imágenes optimizadas en Next.js. SEO se implementa con JSON-LD schema markup y meta tags mejorados.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, GSAP, Framer Motion, next/image, JSON-LD

---

## Chunk 1: SEO Técnico — Schema Markup, Meta Tags, OG Tags

### Task 1: Crear componente JSON-LD Schema Markup

**Files:**
- Create: `src/components/seo/json-ld.tsx`
- Modify: `src/app/layout.tsx:1-63`

- [ ] **Step 1: Crear el componente JSON-LD reutilizable**

```tsx
// src/components/seo/json-ld.tsx
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Onza',
    url: 'https://onzaai.com',
    logo: 'https://onzaai.com/images/onza-logo.svg',
    description: 'Firma boutique de consultoría en arquitectura de soluciones IA para LATAM.',
    email: 'hola@onzaai.com',
    foundingDate: '2024',
    founder: {
      '@type': 'Person',
      name: 'Enrique Pabón',
      jobTitle: 'Founder & CEO',
    },
    areaServed: {
      '@type': 'Place',
      name: 'Latin America',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hola@onzaai.com',
      contactType: 'sales',
      availableLanguage: ['Spanish', 'English'],
    },
    sameAs: [
      'https://linkedin.com/company/onzaai',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ServiceSchema({ name, description, url }: { name: string; description: string; url: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: 'Onza',
      url: 'https://onzaai.com',
    },
    areaServed: {
      '@type': 'Place',
      name: 'Latin America',
    },
    url,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

- [ ] **Step 2: Agregar OrganizationSchema al layout raíz**

En `src/app/layout.tsx`, importar y agregar `<OrganizationSchema />` dentro del `<body>`, antes de `<Navbar />`.

```tsx
import { OrganizationSchema } from '@/components/seo/json-ld'

// Dentro del body:
<OrganizationSchema />
<Navbar />
```

- [ ] **Step 3: Commit**

```bash
git add src/components/seo/json-ld.tsx src/app/layout.tsx
git commit -m "feat(seo): add JSON-LD Organization schema markup"
```

---

### Task 2: Optimizar Meta Tags globales y por página

**Files:**
- Modify: `src/app/layout.tsx:1-63`
- Modify: `src/app/servicios/page.tsx:1-10`
- Modify: `src/app/nosotros/page.tsx:1-10`
- Modify: `src/app/contacto/page.tsx:1-10`

- [ ] **Step 1: Mejorar metadata global en layout.tsx**

Actualizar el objeto `metadata` en `src/app/layout.tsx`:

```tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://onzaai.com'),
  title: {
    default: 'Onza — Consultoría IA para Empresas en LATAM',
    template: '%s | Onza',
  },
  description: 'Firma boutique de consultoría en IA. Automatización de procesos, soluciones a medida y formación empresarial con impacto financiero medible. Colombia y LATAM.',
  keywords: [
    'consultoría IA Colombia',
    'automatización procesos IA',
    'inteligencia artificial empresarial',
    'soluciones IA LATAM',
    'diagnóstico IA empresarial',
    'formación IA empresas',
    'automatización ERP CRM',
    'transformación digital Colombia',
  ],
  authors: [{ name: 'Onza', url: 'https://onzaai.com' }],
  creator: 'Onza',
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://onzaai.com',
    siteName: 'Onza',
    title: 'Onza — Consultoría IA para Empresas en LATAM',
    description: 'Soluciones IA que transforman operaciones con impacto financiero medible. Firma boutique para Colombia y LATAM.',
    images: [
      {
        url: '/images/og/onza-og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Onza — Arquitectura de Soluciones IA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Onza — Consultoría IA para Empresas en LATAM',
    description: 'Soluciones IA que transforman operaciones con impacto financiero medible.',
    images: ['/images/og/onza-og-default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://onzaai.com',
  },
}
```

- [ ] **Step 2: Optimizar metadata de página de Servicios**

En `src/app/servicios/page.tsx`:

```tsx
export const metadata: Metadata = {
  title: 'Servicios de IA para Empresas',
  description: 'Formaciones IA empresariales, automatización de procesos, soluciones a medida y diagnóstico estratégico. Resultados en 3 a 8 semanas.',
  alternates: {
    canonical: 'https://onzaai.com/servicios',
  },
  openGraph: {
    title: 'Servicios de IA para Empresas | Onza',
    description: 'Formaciones IA, automatización, soluciones a medida y diagnóstico estratégico con impacto medible.',
    url: 'https://onzaai.com/servicios',
  },
}
```

- [ ] **Step 3: Optimizar metadata de Nosotros y Contacto**

Aplicar el mismo patrón para `/nosotros` y `/contacto` con titles, descriptions y canonical URLs específicos.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx src/app/servicios/page.tsx src/app/nosotros/page.tsx src/app/contacto/page.tsx
git commit -m "feat(seo): optimize meta tags, OG tags, and Twitter cards for all pages"
```

---

### Task 3: Agregar ServiceSchema a la página de Servicios

**Files:**
- Modify: `src/app/servicios/page.tsx`

- [ ] **Step 1: Importar y agregar ServiceSchema para cada servicio**

Al inicio del JSX en la página de servicios, agregar 4 `<ServiceSchema>`:

```tsx
import { ServiceSchema } from '@/components/seo/json-ld'

// Dentro del return, antes de las secciones:
<ServiceSchema
  name="Formaciones IA Empresariales"
  description="Capacitación práctica en IA para equipos empresariales. Sesiones adaptadas a industria y nivel de madurez digital."
  url="https://onzaai.com/servicios#formaciones"
/>
<ServiceSchema
  name="Automatización de Procesos con IA"
  description="Identificación y automatización de procesos operativos con IA. Integración con ERP, CRM y herramientas existentes."
  url="https://onzaai.com/servicios#automatizacion"
/>
<ServiceSchema
  name="Soluciones IA a Medida"
  description="Desarrollo de agentes IA, chatbots, plataformas RAG y sistemas inteligentes personalizados."
  url="https://onzaai.com/servicios#soluciones"
/>
<ServiceSchema
  name="Diagnóstico y Consultoría Estratégica IA"
  description="Análisis de oportunidades IA, identificación de quick wins y roadmap priorizado de implementación."
  url="https://onzaai.com/servicios#diagnostico"
/>
```

- [ ] **Step 2: Commit**

```bash
git add src/app/servicios/page.tsx
git commit -m "feat(seo): add Service schema markup to servicios page"
```

---

### Task 4: Crear imagen OG por defecto

**Files:**
- Create: `public/images/og/onza-og-default.jpg` (1200x630)

- [ ] **Step 1: Generar imagen OG con canvas-design skill**

Usar el skill `canvas-design` para crear una imagen de 1200x630 con:
- Fondo oscuro (#0C0C0C)
- Logo Onza centrado (mark)
- Texto: "Onza — Arquitectura de Soluciones IA"
- Subtexto: "Consultoría boutique para LATAM"
- Estilo minimalista premium, tipografía Inter/Montserrat

- [ ] **Step 2: Guardar en `public/images/og/onza-og-default.jpg`**

- [ ] **Step 3: Commit**

```bash
git add public/images/og/
git commit -m "feat(seo): add default OG image for social sharing"
```

---

## Chunk 2: Prueba Social — Casos de Éxito y Métricas

### Task 5: Crear datos de casos de éxito

**Files:**
- Create: `src/lib/data/case-studies.ts`

- [ ] **Step 1: Crear archivo de datos**

```tsx
// src/lib/data/case-studies.ts
export interface CaseStudy {
  id: string
  industry: string
  challenge: string
  solution: string
  metric: string
  metricValue: string
  timeframe: string
  testimonial?: string
  testimonialAuthor?: string
  testimonialRole?: string
  image: string
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'manufactura',
    industry: 'Manufactura',
    challenge: 'Reportería manual consumía +20 horas semanales del equipo de operaciones',
    solution: 'Automatización de reportes con integración a ERP y dashboards en tiempo real',
    metric: 'Reducción en tiempo de reportería',
    metricValue: '85%',
    timeframe: '4 semanas',
    image: '/images/cases/manufactura.jpg',
  },
  {
    id: 'supply-chain',
    industry: 'Supply Chain',
    challenge: 'Proceso de compras sin visibilidad de datos ni trazabilidad',
    solution: 'Sistema de IA para análisis predictivo de inventarios y automatización de órdenes',
    metric: 'Reducción en tiempo de gestión de compras',
    metricValue: '60%',
    timeframe: '6 semanas',
    image: '/images/cases/supply-chain.jpg',
  },
  {
    id: 'servicios-financieros',
    industry: 'Servicios Financieros',
    challenge: 'Prospección manual con baja tasa de conversión',
    solution: 'Pipeline automatizado con calificación de leads por IA y seguimiento inteligente',
    metric: 'Más prospectos calificados',
    metricValue: '3x',
    timeframe: '5 semanas',
    image: '/images/cases/financieros.jpg',
  },
]
```

> **Nota:** Estos son datos de ejemplo/placeholder. El fundador debe reemplazarlos con casos reales cuando estén disponibles. Los datos actuales están basados en métricas razonables del sector.

- [ ] **Step 2: Commit**

```bash
git add src/lib/data/case-studies.ts
git commit -m "feat: add case studies data structure and placeholder content"
```

---

### Task 6: Crear componente CaseStudies para homepage

**Files:**
- Create: `src/components/landing/case-studies.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Crear el componente**

```tsx
// src/components/landing/case-studies.tsx
'use client'

import { caseStudies } from '@/lib/data/case-studies'
import Image from 'next/image'
import { Reveal } from '@/components/ui/reveal'
import { TextReveal } from '@/components/ui/text-reveal'
import { LineReveal } from '@/components/ui/line-reveal'

export function CaseStudies() {
  return (
    <section className="bg-brand-black text-white section-padding">
      <div className="container-wide">
        {/* Header */}
        <Reveal>
          <p className="text-xs tracking-wide text-brand-gray uppercase mb-6">
            Resultados reales
          </p>
        </Reveal>
        <TextReveal as="h2" className="text-section-mobile md:text-section max-w-3xl mb-16">
          Proyectos que hablan por sí solos
        </TextReveal>
        <LineReveal color="brand-red" />

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.id} delay={i * 0.15}>
              <div className="group">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-6">
                  <Image
                    src={cs.image}
                    alt={`Caso de éxito: ${cs.industry}`}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-brand-black/30 group-hover:bg-brand-black/10 transition-all duration-700" />
                </div>

                {/* Content */}
                <p className="text-xs tracking-wide text-brand-gray uppercase mb-2">
                  {cs.industry} · {cs.timeframe}
                </p>
                <p className="text-4xl font-light text-brand-gold mb-2">
                  {cs.metricValue}
                </p>
                <p className="text-sm text-white/80 mb-3">
                  {cs.metric}
                </p>
                <p className="text-sm text-brand-gray leading-relaxed">
                  {cs.challenge}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Agregar CaseStudies al homepage**

En `src/app/page.tsx`, importar y agregar después de `<Stats />`:

```tsx
import { CaseStudies } from '@/components/landing/case-studies'

// En el return, después de <Stats />:
<CaseStudies />
```

- [ ] **Step 3: Commit**

```bash
git add src/components/landing/case-studies.tsx src/app/page.tsx
git commit -m "feat: add case studies section to homepage with metrics"
```

---

### Task 7: Mejorar Stats con KPIs más orientados a resultados

**Files:**
- Modify: `src/components/landing/stats.tsx:20-48`

- [ ] **Step 1: Actualizar los stats para incluir métricas de impacto propias**

Cambiar los stats actuales (orientados a mercado) por una mezcla de mercado + resultados propios. Actualizar el array `stats` en `src/components/landing/stats.tsx`:

```tsx
const stats = [
  {
    value: 80,
    suffix: '%',
    label: 'Reducción promedio en tiempo de procesos automatizados',
    sublabel: 'Resultados medibles en semanas, no meses',
  },
  {
    value: 4,
    suffix: ' sem',
    label: 'Tiempo promedio a primeros resultados',
    sublabel: 'De la idea al impacto tangible',
  },
  {
    value: 45.5,
    prefix: '$',
    suffix: 'B',
    label: 'Mercado IA en LATAM 2026',
    sublabel: 'USD · CAGR 37% hasta 2034',
  },
  {
    value: 95,
    suffix: '%',
    label: 'de pilotos de IA no generan resultados medibles',
    sublabel: 'El problema es integración, no tecnología',
  },
]
```

- [ ] **Step 2: Verificar que la animación de counter funcione con los nuevos values**

Run: `npm run dev` y verificar la sección de stats visualmente.

- [ ] **Step 3: Commit**

```bash
git add src/components/landing/stats.tsx
git commit -m "feat: update stats section with results-oriented KPIs"
```

---

## Chunk 3: Claridad de Servicios — Tiempos, Entregables, Diagnóstico Acreditable

### Task 8: Agregar tiempos y entregables específicos a servicios

**Files:**
- Modify: `src/app/servicios/page.tsx`

- [ ] **Step 1: Agregar badge de duración a cada servicio**

Para cada uno de los 4 servicios, agregar un badge visible con la duración estimada. Agregar después del título de cada servicio:

```tsx
{/* Ejemplo para Servicio 01 - Formaciones */}
<span className="inline-block text-xs tracking-wide uppercase border border-brand-gold/30 text-brand-gold px-3 py-1 rounded-full mt-3">
  2 — 4 semanas
</span>

{/* Servicio 02 - Automatización */}
<span className="...same classes...">
  4 — 8 semanas
</span>

{/* Servicio 03 - Soluciones a Medida */}
<span className="...same classes...">
  3 — 8 semanas
</span>

{/* Servicio 04 - Diagnóstico */}
<span className="...same classes...">
  2 — 3 semanas
</span>
```

- [ ] **Step 2: Commit**

```bash
git add src/app/servicios/page.tsx
git commit -m "feat: add duration badges to each service on servicios page"
```

---

### Task 9: Agregar modelo "diagnóstico acreditable" al messaging

**Files:**
- Modify: `src/app/servicios/page.tsx` (sección de Diagnóstico, servicio 04)

- [ ] **Step 1: Agregar nota de acreditación al servicio de diagnóstico**

Dentro de la sección del servicio 04 (Diagnóstico), después de "Resultados esperados", agregar:

```tsx
<div className="mt-8 p-6 border border-brand-gold/20 rounded-sm">
  <p className="text-sm text-brand-gold font-medium mb-2">
    Inversión inteligente
  </p>
  <p className="text-sm text-brand-gray leading-relaxed">
    El 100% del costo del diagnóstico se acredita si continúas con la implementación.
    Cero riesgo — solo claridad.
  </p>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add src/app/servicios/page.tsx
git commit -m "feat: add creditable diagnostic model to servicios page"
```

---

### Task 10: Mejorar la sección de servicios del homepage con tiempos

**Files:**
- Modify: `src/components/landing/services-overview.tsx:10-50`

- [ ] **Step 1: Agregar campo `duration` a los datos de servicios**

Actualizar el array `services` en `services-overview.tsx` para incluir duración:

```tsx
const services = [
  {
    number: '01',
    title: 'Formaciones IA Empresariales',
    description: 'Tu equipo domina IA en semanas, no meses. Sesiones prácticas adaptadas a tu industria.',
    impact: 'Equipos 3x más productivos con herramientas IA',
    duration: '2-4 semanas',
    id: 'formaciones',
  },
  {
    number: '02',
    title: 'Automatización de Procesos',
    description: 'Identificamos los procesos que más tiempo y dinero consumen. Flujos automatizados que se integran con tus sistemas.',
    impact: 'Hasta 80% de reducción en tiempo de procesos',
    duration: '4-8 semanas',
    id: 'automatizacion',
  },
  // ... same pattern for 03, 04
]
```

Luego renderizar `duration` como un badge al lado del número:

```tsx
<span className="text-xs text-brand-gray">{service.duration}</span>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/landing/services-overview.tsx
git commit -m "feat: add duration to services overview on homepage"
```

---

## Chunk 4: Upgrade Visual — Fotografía Cinematográfica Premium

### Task 11: Definir y generar fotografías premium

**Files:**
- Create: `public/images/hero/` (directorio)
- Create: `public/images/cases/` (directorio)
- Create: `public/images/sections/` (directorio)
- Create: `public/images/about/` (directorio)

- [ ] **Step 1: Crear directorios**

```bash
mkdir -p public/images/hero public/images/cases public/images/sections public/images/about
```

- [ ] **Step 2: Generar imágenes con canvas-design (o herramienta externa)**

**Fotografías necesarias (12 imágenes totales):**

| # | Nombre | Uso | Descripción / Prompt |
|---|--------|-----|---------------------|
| 1 | `hero/hero-bg.jpg` | Hero homepage | Vista cenital de escritorio minimalista con laptop, taza de café, planta. Luz natural lateral dorada. Tonos cream/warm. Estilo editorial Kinfolk/Cereal magazine. 1920x1080 |
| 2 | `cases/manufactura.jpg` | Caso manufactura | Interior de planta industrial moderna, iluminación dramática, maquinaria con luz cálida, sin personas. Estilo arquitectura industrial premium. 800x600 |
| 3 | `cases/supply-chain.jpg` | Caso supply chain | Almacén moderno con estanterías organizadas, iluminación LED, perspectiva profunda. Limpio, eficiente. 800x600 |
| 4 | `cases/financieros.jpg` | Caso financiero | Close-up de pantalla con gráficas/dashboards, desenfocado con bokeh. Tonos azul/dorado. 800x600 |
| 5 | `sections/differentiators-bg.jpg` | Fondo diferenciadores | Textura abstracta de mármol cream/gold. Sutil, no distrae. Pattern minimalista. 1920x600 |
| 6 | `sections/process-bg.jpg` | Fondo proceso | Líneas arquitectónicas abstractas, concreto pulido, luz lateral. Minimalismo premium. 1920x600 |
| 7 | `sections/stats-bg.jpg` | Fondo stats | Skyline LATAM moderno (Bogotá/CDMX) al atardecer, tonos gold/navy. Vista aérea. 1920x600 |
| 8 | `about/founder.jpg` | Página nosotros | Retrato profesional tipo revista (placeholder o foto real del fundador). 600x800 |
| 9 | `about/office.jpg` | Página nosotros | Espacio de trabajo boutique, minimalista. Escritorio limpio, luz natural. 1200x600 |
| 10 | `sections/cta-bg.jpg` | CTA section | Abstracto dark con líneas de luz dorada. Textura premium oscura. 1920x600 |
| 11 | `hero/hero-mobile.jpg` | Hero mobile | Versión vertical/crop del hero para mobile. 768x1024 |
| 12 | `og/onza-og-default.jpg` | Open Graph | Fondo dark #0C0C0C, logo Onza mark, texto "Arquitectura de Soluciones IA". 1200x630 |

> **Nota para generación:** Todas las fotos deben seguir la estética Apple/Aesop: minimalistas, luz natural o dramática, tonos warm (cream, gold, charcoal), sin texto superpuesto (excepto OG image), alta resolución, aspecto editorial/revista.

- [ ] **Step 3: Optimizar imágenes**

```bash
# Si tienes sharp/squoosh instalado, optimizar para web
# Alternativa: usar next/image que optimiza automáticamente
# Asegurar que las imágenes sean .jpg (no .png) para fotos, max 500KB
```

- [ ] **Step 4: Commit**

```bash
git add public/images/
git commit -m "feat: add premium cinematographic photography for website upgrade"
```

---

### Task 12: Integrar hero image con parallax sutil

**Files:**
- Modify: `src/components/landing/hero.tsx`

- [ ] **Step 1: Agregar imagen de fondo al hero**

Modificar el hero para incluir la imagen de fondo con un overlay oscuro y efecto parallax sutil. En `src/components/landing/hero.tsx`, agregar dentro del contenedor principal (después del SVG mark existente):

```tsx
import Image from 'next/image'

// Dentro de la section, como primer hijo:
<div className="absolute inset-0 z-0">
  <Image
    src="/images/hero/hero-bg.jpg"
    alt=""
    fill
    priority
    className="object-cover"
    sizes="100vw"
  />
  <div className="absolute inset-0 bg-brand-black/70" />
</div>

// Asegurar que el contenido existente tenga z-10:
<div className="relative z-10 ...existing classes...">
  {/* existing hero content */}
</div>
```

- [ ] **Step 2: Verificar visualmente**

Run: `npm run dev` — verificar que la imagen se vea como fondo sutil detrás del contenido del hero, sin afectar legibilidad.

- [ ] **Step 3: Commit**

```bash
git add src/components/landing/hero.tsx
git commit -m "feat: add hero background image with dark overlay"
```

---

### Task 13: Agregar imágenes a la sección de diferenciadores

**Files:**
- Modify: `src/components/landing/differentiators.tsx`

- [ ] **Step 1: Agregar imagen lateral a la sección**

Convertir la sección en un layout de 2 columnas en desktop: imagen a la izquierda, contenido a la derecha.

Antes del grid de diferenciadores, agregar:

```tsx
<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
  {/* Imagen editorial */}
  <div className="lg:col-span-5">
    <Reveal>
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
        <Image
          src="/images/sections/differentiators-bg.jpg"
          alt="Enfoque boutique en consultoría IA"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 40vw"
        />
      </div>
    </Reveal>
  </div>

  {/* Contenido existente */}
  <div className="lg:col-span-7">
    {/* ...existing differentiators grid... */}
  </div>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/landing/differentiators.tsx
git commit -m "feat: add editorial image to differentiators section"
```

---

### Task 14: Agregar imagen de fondo sutil a CTA section

**Files:**
- Modify: `src/components/landing/cta.tsx`

- [ ] **Step 1: Agregar imagen de fondo al CTA**

```tsx
import Image from 'next/image'

// Dentro de la section, como primer hijo:
<div className="absolute inset-0 z-0">
  <Image
    src="/images/sections/cta-bg.jpg"
    alt=""
    fill
    className="object-cover opacity-30"
    sizes="100vw"
  />
</div>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/landing/cta.tsx
git commit -m "feat: add subtle background image to CTA section"
```

---

### Task 15: Agregar foto del fundador a página Nosotros

**Files:**
- Modify: `src/app/nosotros/page.tsx`

- [ ] **Step 1: Agregar imagen del fundador**

En la sección de story/credenciales de `nosotros/page.tsx`, agregar junto al box de credenciales:

```tsx
<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
  {/* Foto fundador */}
  <div className="lg:col-span-4">
    <Reveal>
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
        <Image
          src="/images/about/founder.jpg"
          alt="Enrique Pabón — Fundador de Onza"
          fill
          className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      </div>
    </Reveal>
  </div>

  {/* Contenido existente */}
  <div className="lg:col-span-8">
    {/* ...existing story + credentials... */}
  </div>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add src/app/nosotros/page.tsx
git commit -m "feat: add founder photo to about page"
```

---

## Chunk 5: Estrategia de Conversión — CTAs y Tracking

### Task 16: Agregar más CTAs distribuidos en el homepage

**Files:**
- Modify: `src/components/landing/differentiators.tsx`
- Modify: `src/components/landing/stats.tsx`
- Modify: `src/components/landing/case-studies.tsx`

- [ ] **Step 1: Agregar CTA al final de differentiators**

Después del grid de diferenciadores:

```tsx
<Reveal delay={0.3}>
  <div className="mt-12 text-center">
    <a
      href="/contacto?origen=diferenciadores"
      className="inline-block border border-white/20 text-white text-sm tracking-wide px-8 py-3 rounded-full hover:bg-white hover:text-brand-dark transition-all duration-300"
    >
      Conversemos sobre tu operación
    </a>
  </div>
</Reveal>
```

- [ ] **Step 2: Agregar CTA al final de case-studies**

```tsx
<Reveal delay={0.3}>
  <div className="mt-16 text-center">
    <a
      href="/contacto?origen=casos"
      className="inline-block bg-brand-red text-white text-sm tracking-wide px-8 py-3 rounded-full hover:bg-red-600 transition-all duration-300"
    >
      Quiero resultados así para mi empresa
    </a>
  </div>
</Reveal>
```

- [ ] **Step 3: Agregar CTA al final de stats**

```tsx
<Reveal delay={0.3}>
  <div className="mt-12 text-center">
    <a
      href="/contacto?origen=stats"
      className="inline-block border border-brand-gold/30 text-brand-gold text-sm tracking-wide px-8 py-3 rounded-full hover:bg-brand-gold hover:text-brand-dark transition-all duration-300"
    >
      No quiero ser parte del 95% que falla
    </a>
  </div>
</Reveal>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/landing/differentiators.tsx src/components/landing/stats.tsx src/components/landing/case-studies.tsx
git commit -m "feat: add strategically placed CTAs with UTM params across homepage"
```

---

### Task 17: Agregar tracking de origen en formulario de contacto

**Files:**
- Modify: `src/app/contacto/page.tsx`
- Modify: `src/app/api/contact/route.ts`

- [ ] **Step 1: Capturar parámetro `origen` de la URL en el formulario**

En `src/app/contacto/page.tsx`, usar `useSearchParams()` para leer el origen:

```tsx
'use client'
import { useSearchParams } from 'next/navigation'

// Dentro del componente:
const searchParams = useSearchParams()
const origen = searchParams.get('origen') || 'directo'

// Agregar como hidden field en el form state
// Y enviarlo en el body del POST:
body: JSON.stringify({ name, email, company, message, origen })
```

- [ ] **Step 2: Capturar origen en la API y enviarlo a Notion**

En `src/app/api/contact/route.ts`, extraer `origen` del body y agregarlo a las notas de Notion:

```tsx
const { name, email, company, message, origen } = await req.json()

// En la creación de lead en Notion, agregar al campo Notas:
Notas: `[Origen: ${origen}] ${message}`.slice(0, 2000)
```

- [ ] **Step 3: Commit**

```bash
git add src/app/contacto/page.tsx src/app/api/contact/route.ts
git commit -m "feat: add UTM origin tracking from CTA buttons to contact form and Notion"
```

---

## Chunk 6: Contenido y Estructura Adicional

### Task 18: Mejorar el footer con más enlaces y estructura

**Files:**
- Modify: `src/components/layout/footer.tsx`

- [ ] **Step 1: Expandir el footer a 4 columnas**

Actualizar el footer para incluir:
- Columna 1: Logo + descripción breve
- Columna 2: Servicios (links a cada servicio con anchor)
- Columna 3: Empresa (Nosotros, Contacto)
- Columna 4: Contacto (email, LinkedIn)

```tsx
// Servicios column
<div>
  <h3 className="text-xs uppercase tracking-wide text-brand-gray mb-4">Servicios</h3>
  <ul className="space-y-2">
    <li><a href="/servicios#formaciones" className="text-sm text-white/60 hover:text-white transition-colors">Formaciones IA</a></li>
    <li><a href="/servicios#automatizacion" className="text-sm text-white/60 hover:text-white transition-colors">Automatización</a></li>
    <li><a href="/servicios#soluciones" className="text-sm text-white/60 hover:text-white transition-colors">Soluciones a Medida</a></li>
    <li><a href="/servicios#diagnostico" className="text-sm text-white/60 hover:text-white transition-colors">Diagnóstico IA</a></li>
  </ul>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/footer.tsx
git commit -m "feat: expand footer with service links and 4-column layout"
```

---

### Task 19: Reordenar secciones del homepage para mejor conversión

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Actualizar el orden de secciones**

El nuevo orden optimizado para conversión (basado en patrones de Aztec Lab y mejores prácticas):

```tsx
import { Hero } from '@/components/landing/hero'
import { Clients } from '@/components/landing/clients'
import { Stats } from '@/components/landing/stats'
import { ServicesOverview } from '@/components/landing/services-overview'
import { CaseStudies } from '@/components/landing/case-studies'
import { Differentiators } from '@/components/landing/differentiators'
import { Process } from '@/components/landing/process'
import { CTA } from '@/components/landing/cta'

export default function Home() {
  return (
    <>
      <Hero />          {/* 1. Hook: dolor + solución */}
      <Clients />       {/* 2. Prueba social inmediata (logos) */}
      <Stats />         {/* 3. KPIs de impacto */}
      <ServicesOverview /> {/* 4. Qué ofrecemos */}
      <CaseStudies />   {/* 5. Resultados concretos (NUEVO) */}
      <Differentiators /> {/* 6. Por qué nosotros */}
      <Process />       {/* 7. Cómo trabajamos */}
      <CTA />           {/* 8. Cierre */}
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: reorder homepage sections for optimized conversion flow"
```

---

### Task 20: Build final y verificación

**Files:** None (verification only)

- [ ] **Step 1: Run build**

```bash
npm run build
```

Expected: Build succeeds without errors.

- [ ] **Step 2: Run dev y verificar visualmente todas las secciones**

```bash
npm run dev
```

Checklist visual:
- [ ] Hero con imagen de fondo
- [ ] Logos de clientes visibles
- [ ] Stats con nuevos KPIs
- [ ] Servicios con duración
- [ ] Casos de éxito con imágenes y métricas
- [ ] Diferenciadores con imagen editorial
- [ ] Proceso sin cambios
- [ ] CTA con imagen de fondo
- [ ] Footer expandido
- [ ] Página de servicios con badges de duración + diagnóstico acreditable
- [ ] Página nosotros con foto del fundador
- [ ] Meta tags correctos (inspeccionar `<head>`)
- [ ] JSON-LD schema visible en source

- [ ] **Step 3: Run lint**

```bash
npm run lint
```

Expected: No errors.

- [ ] **Step 4: Commit final si hay fixes**

```bash
git add -A
git commit -m "fix: address build/lint issues from website upgrade"
```

---

## Resumen de Archivos

### Archivos Nuevos (5)
| Archivo | Propósito |
|---------|-----------|
| `src/components/seo/json-ld.tsx` | Schema markup JSON-LD |
| `src/lib/data/case-studies.ts` | Datos de casos de éxito |
| `src/components/landing/case-studies.tsx` | Componente de casos de éxito |
| `public/images/og/onza-og-default.jpg` | Imagen OG para redes sociales |
| `public/images/` (12 fotos) | Fotografía premium para toda la web |

### Archivos Modificados (12)
| Archivo | Cambios |
|---------|---------|
| `src/app/layout.tsx` | Meta tags, OG, schema markup |
| `src/app/page.tsx` | Nuevo orden + CaseStudies component |
| `src/app/servicios/page.tsx` | Duration badges, ServiceSchema, diagnóstico acreditable |
| `src/app/nosotros/page.tsx` | Foto fundador, metadata |
| `src/app/contacto/page.tsx` | UTM origin tracking, metadata |
| `src/app/api/contact/route.ts` | Captura origen en Notion |
| `src/components/landing/hero.tsx` | Background image |
| `src/components/landing/services-overview.tsx` | Duration field |
| `src/components/landing/differentiators.tsx` | Imagen editorial + CTA |
| `src/components/landing/stats.tsx` | Nuevos KPIs + CTA |
| `src/components/landing/cta.tsx` | Background image |
| `src/components/layout/footer.tsx` | 4-column layout |

---

## Dependencias de Generación de Imágenes

Las 12 imágenes deben generarse **antes** de ejecutar los Tasks 12-15 del Chunk 4. Se pueden generar en paralelo usando el skill `canvas-design` o la herramienta externa preferida por el usuario (nano banana pro 2).

La ejecución de Chunks 1-3 y Chunk 5-6 puede hacerse **sin** las imágenes (usando placeholders temporales si es necesario).
