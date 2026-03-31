# Diagnóstico de Madurez IA — Herramienta gratuita

**Fecha:** 31 de marzo de 2026
**Estado:** Aprobado
**Ruta:** `/recursos/diagnostico-ia`

---

## Qué es

Un quiz interactivo de 6 preguntas que diagnostica la madurez IA de una empresa y mapea sus dolores operacionales a los servicios de Onza. Resultados parciales visibles de inmediato. Reporte completo por email.

## Objetivo

Doble: darle valor real al visitante (entiende su situación) y capturar leads calificados con contexto (Onza sabe qué servicio recomendar antes de la primera llamada).

## Audiencia

Decision makers: CEOs, CTOs, gerentes de operaciones. Las preguntas no requieren conocimiento técnico.

## Decisiones de diseño

- **Enfoque híbrido:** resultados parciales gratis, reporte completo por email
- **Quiz lineal:** una pregunta por pantalla con barra de progreso
- **Bloques pre-escritos:** sin IA generativa, variantes por respuesta
- **Tono:** directo-cercano, consistente con el resto del sitio
- **Animaciones:** GSAP + Lenis (premium-web-animations, alineado con Onza)
- **Resultados escalonados:** parciales describen la oportunidad, reporte por email incluye recomendación de servicio

---

## Las 6 preguntas

### P1 — Tamaño y contexto (segmentación)

*En LATAM, 7 de cada 10 empresas medianas ya están experimentando con IA. La mayoría sin un plan detrás.*

"¿Cuántas personas trabajan en tu empresa?"
1. Menos de 20
2. 20 a 100
3. 100 a 500
4. Más de 500

### P2 — Shadow AI (→ Formaciones + Diagnóstico)

*68% de los empleados que usan IA en el trabajo lo hacen por su cuenta, sin supervisión ni lineamientos. — Microsoft Work Trend Index*

"¿Tus colaboradores están usando herramientas de IA por su cuenta?"
1. No, y no creo que lo hagan
2. Probablemente sí, pero no tenemos visibilidad
3. Sí, sin políticas ni lineamientos
4. Sí, y ya nos generó problemas de seguridad o calidad

### P3 — Nivel de adopción (→ Formaciones + Diagnóstico)

*95% de los pilotos de IA fracasan. No por la tecnología — por cómo se implementan.*

"¿Cómo está tu equipo con herramientas de IA hoy?"
1. No las usan
2. Algunos experimentan solos, sin dirección
3. Hay iniciativas pero sin resultados claros
4. Ya usamos IA en procesos concretos

### P4 — Conocimiento repetitivo (→ Chatbot IA / Soluciones a Medida)

*Un equipo de soporte gasta el 40% de su tiempo contestando lo que ya está escrito en algún documento que nadie encuentra.*

"¿Tu equipo o tus clientes hacen las mismas preguntas una y otra vez?"
1. No, cada consulta es diferente
2. Sí, pero lo manejamos
3. Sí, y le come mucho tiempo al equipo
4. Sí, y estamos perdiendo clientes por lentitud

### P5 — Decisiones con datos (→ Automatización + Diagnóstico)

*Las empresas que deciden con datos ganan 23% más que las que deciden con instinto. No es magia — es tener la información correcta a tiempo. — McKinsey*

"¿Con qué información toma decisiones tu equipo directivo?"
1. Intuición y experiencia
2. Reportes manuales en Excel que alguien arma cada semana
3. Dashboards, pero con datos que no siempre están al día
4. Datos en tiempo real integrados con nuestros sistemas

### P6 — Urgencia (calificación del lead)

*Más de la mitad de las empresas en LATAM van a invertir más en IA este año. La pregunta ya no es si, sino en qué y con quién.*

"¿Qué tan cerca estás de querer hacer algo con IA?"
1. Solo estoy mirando, sin planes concretos
2. Quiero arrancar este trimestre pero no sé por dónde
3. Ya tengo presupuesto y busco quién lo ejecute
4. Ya intentamos algo, no funcionó, necesito otro enfoque

---

## Scoring

Cada respuesta vale 1-4 puntos. Score total: 6-24.

| Score | Nivel | Significado |
|-------|-------|-------------|
| 6-10 | Exploración | Estás empezando. Necesitas claridad antes de invertir. |
| 11-16 | Oportunidad | Hay dolores claros y oportunidades concretas. El momento es ahora. |
| 17-24 | Aceleración | Ya tienes tracción. Necesitas ejecutar más rápido o corregir rumbo. |

### Mapeo a servicios

| Pregunta | Dolor detectado | Servicio Onza |
|----------|----------------|---------------|
| P2 | Adopción sin control | Formaciones IA Empresariales |
| P3 | Equipo sin dirección | Formaciones + Diagnóstico |
| P4 | Conocimiento disperso | Chatbot IA / Soluciones a Medida |
| P5 | Operación ciega | Automatización + Diagnóstico |

P1 segmenta por tamaño. P6 califica temperatura del lead.

---

## Flujo de pantallas

### Pantalla 1 — Landing
Headline + dato gancho + botón "Comenzar diagnóstico". Sin formulario.

### Pantallas 2-7 — Preguntas
Una por pantalla. Barra de progreso (1/6). Dato contextual arriba. 4 opciones como botones. Click en opción avanza automáticamente. Transiciones animadas con GSAP.

### Pantalla 8 — Resultados parciales
- Score con animación (número sube, estilo Stats del homepage)
- Nivel con color (rojo/gold/blanco)
- Área de mayor oportunidad en una línea
- Formulario: nombre + email + empresa (opcional)
- CTA primario: "Recibir reporte completo"
- CTA secundario: "Agendar conversación directa"

### Pantalla 9 — Confirmación
"Listo. Revisa tu correo." + CTA para agendar mientras espera.

---

## Reporte por email (HTML vía Resend)

### Estructura

1. **Header:** Logo Onza + "Tu diagnóstico de madurez IA"
2. **Score:** Número + nivel + línea de contexto
3. **Análisis por área (P2-P5):** Estado actual, implicación, qué podría cambiar. Bloques pre-escritos, 3-4 variantes por pregunta.
4. **Mayor oportunidad:** Área que más puntuó, expandida. Mapeo sutil a servicio Onza.
5. **Siguiente paso:** CTA con UTM `?utm_source=diagnostico&utm_medium=email&utm_content=reporte`
6. **Footer:** Contacto Onza + links a servicios y blog

### Implementación
- Bloques pre-escritos por combinación de respuestas
- Sin IA generativa, sin costos de API
- Envío inmediato vía Resend
- Lead capturado en Notion vía createPipelineLead() con resultados en campo Notas

---

## Integración técnica

- **Ruta:** `/recursos/diagnostico-ia` — client component
- **Estado:** React state local (no necesita backend hasta el envío)
- **Envío:** POST a `/api/contact` existente con resultados en message
- **Email:** Resend (ya integrado)
- **Lead capture:** Notion pipeline (ya integrado)
- **Animaciones:** GSAP + ScrollTrigger + transiciones entre preguntas
- **SEO:** Meta tags + Open Graph + Schema markup
- **Sitemap:** Agregar a sitemap dinámico existente

---

## Fuera de alcance

- IA generativa para reportes
- Cuenta de usuario / historial de diagnósticos
- Comparación con benchmark por industria
- Versión en inglés
