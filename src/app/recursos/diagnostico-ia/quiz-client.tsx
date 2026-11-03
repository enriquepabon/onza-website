"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { MagneticButton } from "@/components/ui/magnetic-button";
import {
  QUIZ_QUESTIONS,
  formatoRango,
  type Diagnostico,
  type LecturaPersonalizada,
  type QuizAnswers,
} from "@/lib/quiz";
import { COMPANY } from "@/lib/constants";
import { trackEvent } from "@/lib/gtag";

// ── Progress Bar ───────────────────────────────────────────────────────────

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className="h-0.5 flex-1 transition-colors duration-500"
          style={{ backgroundColor: i < current ? "#FF3B30" : "#1F1F1F" }}
        />
      ))}
    </div>
  );
}

// ── Kicker ─────────────────────────────────────────────────────────────────

function Kicker({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div className={`flex items-center gap-3 mb-8 ${center ? "justify-center" : ""}`}>
      <div className="h-px w-8 bg-brand-red" />
      <span className="text-[10px] tracking-[0.3em] uppercase text-brand-red font-display">
        {children}
      </span>
    </div>
  );
}

// ── Pasos mientras Claude escribe la lectura ───────────────────────────────

const LOADING_STEPS = [
  "Leyendo tus respuestas",
  "Estimando el tiempo en juego",
  "Escribiendo la lectura de tu caso",
];

function LoadingSteps() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setStep((s) => Math.min(s + 1, LOADING_STEPS.length - 1)),
      2600,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <Kicker>Un momento</Kicker>
      <h2 className="text-3xl md:text-4xl font-light text-white mb-12">
        Preparando tu diagnóstico
      </h2>
      <ul className="space-y-5">
        {LOADING_STEPS.map((label, i) => (
          <li
            key={label}
            className={`flex items-center gap-4 text-sm transition-colors duration-700 ${
              i < step ? "text-[#777]" : i === step ? "text-white" : "text-[#333]"
            }`}
          >
            <span className="relative flex h-2 w-2">
              {i === step && (
                <span className="absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-60 animate-ping" />
              )}
              <span
                className={`relative inline-flex h-2 w-2 rounded-full ${
                  i <= step ? "bg-brand-red" : "bg-[#262626]"
                }`}
              />
            </span>
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Main Quiz Client ──────────────────────────────────────────────────────

type Phase = "landing" | "quiz" | "form" | "loading" | "results";

export default function QuizClient() {
  const [phase, setPhase] = useState<Phase>("landing");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [diagnostico, setDiagnostico] = useState<Diagnostico | null>(null);
  const [lectura, setLectura] = useState<LecturaPersonalizada | null>(null);
  // Lo escrito en el formulario se conserva si el envío falla y hay que reintentar
  const [datos, setDatos] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  const animateIn = useCallback(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
    );
  }, []);

  useEffect(() => { animateIn(); }, [phase, currentQ, animateIn]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [phase]);

  function transition(next: () => void) {
    if (!contentRef.current) return next();
    gsap.to(contentRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: "power2.in",
      onComplete: next,
    });
  }

  function handleStart() {
    setPhase("quiz");
    setCurrentQ(0);
    trackEvent("quiz_start", { form: "diagnostico-ia" });
  }

  function handleAnswer(optionId: string) {
    const q = QUIZ_QUESTIONS[currentQ];
    setAnswers((prev) => ({ ...prev, [q.id]: optionId }));

    if (currentQ < QUIZ_QUESTIONS.length - 1) {
      transition(() => setCurrentQ((prev) => prev + 1));
    } else {
      transition(() => setPhase("form"));
    }
  }

  function handleBack() {
    if (phase === "form") {
      transition(() => setPhase("quiz"));
    } else if (currentQ > 0) {
      transition(() => setCurrentQ((prev) => prev - 1));
    }
  }

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(false);

    const form = e.currentTarget;
    const field = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement).value;
    const campos = {
      name: field("name"),
      email: field("email"),
      company: field("company"),
      telefono: field("telefono"),
      proceso: field("proceso"),
      sitio: field("sitio"),
    };
    setDatos(campos);
    setPhase("loading");

    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...campos, answers }),
      });
      const json = res.ok ? await res.json().catch(() => null) : null;
      if (!json?.diagnostico) throw new Error("sin diagnóstico");

      setDiagnostico(json.diagnostico);
      setLectura(json.lectura ?? null);
      trackEvent("generate_lead", { form: "diagnostico-ia" });
      transition(() => setPhase("results"));
    } catch {
      setFormError(true);
      setPhase("form");
    }
  }

  const inputClasses =
    "w-full border-b border-[#333] bg-transparent py-3 text-white placeholder:text-[#555] focus:border-brand-red focus:outline-none transition-colors";

  const question = QUIZ_QUESTIONS[currentQ];

  return (
    <div className="min-h-screen bg-brand-black flex flex-col">
      {/* Nav spacer */}
      <div className="h-20" />

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl" ref={contentRef}>

          {/* ── Landing ──────────────────────────────────────── */}
          {phase === "landing" && (
            <div>
              <Kicker>Diagnóstico gratuito</Kicker>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] mb-6">
                ¿Dónde está perdiendo tiempo tu operación?
              </h1>
              <p className="text-[#777] text-lg leading-relaxed mb-4 max-w-lg font-light">
                8 preguntas, unos 2 minutos. Te decimos qué proceso conviene
                atender primero, cuántas horas hay en juego y por dónde empezar.
              </p>
              <p className="text-xs text-[#555] mb-10">
                Sin costo ni compromiso. El resultado lo ves al final y te llega una copia al correo.
              </p>
              <button
                onClick={handleStart}
                className="px-10 py-4 bg-brand-red text-white text-sm tracking-[0.15em] uppercase hover:bg-red-600 transition-colors"
              >
                Comenzar diagnóstico
              </button>
            </div>
          )}

          {/* ── Quiz Questions ───────────────────────────────── */}
          {phase === "quiz" && (
            <div>
              <ProgressBar current={currentQ + 1} total={QUIZ_QUESTIONS.length} />

              <div className="mt-10">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-xs text-[#555]">
                    {currentQ + 1} de {QUIZ_QUESTIONS.length}
                  </p>
                  {currentQ > 0 && (
                    <button
                      onClick={handleBack}
                      className="text-xs text-[#555] hover:text-white transition-colors"
                    >
                      ← Anterior
                    </button>
                  )}
                </div>

                <p className="border-l-2 border-brand-gold pl-4 text-sm text-[#777] leading-relaxed mb-8">
                  {question.why}
                </p>

                <h2 className="text-2xl md:text-3xl font-light text-white mb-10">
                  {question.question}
                </h2>

                <div
                  className={
                    question.options.length > 6
                      ? "grid grid-cols-1 sm:grid-cols-2 gap-3"
                      : "space-y-3"
                  }
                >
                  {question.options.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleAnswer(opt.id)}
                      className={`w-full text-left px-6 py-4 border text-sm leading-relaxed transition-all duration-300 hover:border-brand-red hover:text-white ${
                        answers[question.id] === opt.id
                          ? "border-brand-red/60 text-white"
                          : "border-[#1F1F1F] text-[#999]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Correo antes del resultado ───────────────────── */}
          {phase === "form" && (
            <div>
              <ProgressBar current={QUIZ_QUESTIONS.length} total={QUIZ_QUESTIONS.length} />

              <div className="mt-10">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-xs text-[#555]">Último paso</p>
                  <button
                    onClick={handleBack}
                    className="text-xs text-[#555] hover:text-white transition-colors"
                  >
                    ← Anterior
                  </button>
                </div>

                <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
                  Tu diagnóstico está listo
                </h2>
                <p className="text-[#777] leading-relaxed mb-10 max-w-lg">
                  ¿A nombre de quién lo preparamos? Lo ves aquí mismo y te
                  enviamos una copia a tu correo.
                </p>

                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <input
                      type="text"
                      name="name"
                      defaultValue={datos.name}
                      placeholder="Tu nombre"
                      autoComplete="name"
                      required
                      className={inputClasses}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Tu correo"
                      autoComplete="email"
                      required
                      defaultValue={datos.email}
                      className={inputClasses}
                    />
                    <input
                      type="text"
                      name="company"
                      defaultValue={datos.company}
                      placeholder="Tu empresa"
                      autoComplete="organization"
                      className={inputClasses}
                    />
                    <input
                      type="tel"
                      name="telefono"
                      defaultValue={datos.telefono}
                      placeholder="WhatsApp (opcional)"
                      autoComplete="tel"
                      className={inputClasses}
                    />
                  </div>
                  <textarea
                    name="proceso"
                    defaultValue={datos.proceso}
                    rows={3}
                    maxLength={600}
                    placeholder="Opcional: cuéntanos en una o dos frases qué proceso le quita más tiempo a tu equipo. La lectura parte de ahí."
                    className={`${inputClasses} resize-none`}
                  />
                  {/* Campo trampa para bots: fuera de pantalla, sin foco */}
                  <input
                    type="text"
                    name="sitio"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute -left-[9999px] h-px w-px opacity-0"
                  />
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-10 py-4 bg-brand-red text-white text-sm tracking-[0.15em] uppercase hover:bg-red-600 transition-colors"
                    >
                      Ver mi diagnóstico
                    </button>
                  </div>
                  {formError && (
                    <p className="text-sm text-brand-red">
                      Algo salió mal. Intenta de nuevo en un momento.
                    </p>
                  )}
                  <p className="text-xs text-[#555] leading-relaxed">
                    Usamos tus datos solo para enviarte el diagnóstico y, si te
                    interesa, conversar sobre tu caso. Nada de listas de correo.
                  </p>
                </form>
              </div>
            </div>
          )}

          {/* ── Cargando ─────────────────────────────────────── */}
          {phase === "loading" && <LoadingSteps />}

          {/* ── Resultado ────────────────────────────────────── */}
          {phase === "results" && diagnostico && (
            <div>
              <Kicker>{datos.name ? `${datos.name.trim().split(" ")[0]}, este es tu diagnóstico` : "Tu diagnóstico"}</Kicker>

              <h1 className="text-3xl md:text-5xl font-light text-white leading-[1.15] mb-8">
                {lectura?.titular || diagnostico.oportunidad.titulo}
              </h1>

              {lectura && (
                <p className="text-lg text-[#BBB] font-light leading-relaxed mb-12">
                  {lectura.lectura}
                </p>
              )}

              <div className="grid gap-px bg-[#1F1F1F] border border-[#1F1F1F] sm:grid-cols-3 mb-12">
                <div className="bg-brand-black p-6">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#666] mb-3">
                    Dónde se pierde
                  </p>
                  <p className="text-white font-light leading-snug mb-2">{diagnostico.area}</p>
                  <p className="text-xs text-[#777] leading-relaxed">{diagnostico.tarea}</p>
                </div>
                <div className="bg-brand-black p-6">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#666] mb-3">
                    Tiempo en juego
                  </p>
                  {diagnostico.tiempoHoy ? (
                    <>
                      <p className="text-white font-light leading-snug mb-2 first-letter:uppercase">
                        {formatoRango(diagnostico.tiempoHoy)}
                      </p>
                      <p className="text-xs text-[#777] leading-relaxed">
                        Recuperables: {formatoRango(diagnostico.tiempoRecuperable!, "h")},
                        si se automatiza del 30% al 60%.
                      </p>
                    </>
                  ) : (
                    <p className="text-xs text-[#777] leading-relaxed">
                      Sin dato de horas. Lo estimamos juntos en la conversación.
                    </p>
                  )}
                </div>
                <div className="bg-brand-black p-6">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#666] mb-3">
                    Preparación
                  </p>
                  <p className="text-white font-light leading-snug mb-2">
                    {diagnostico.preparacion.label}
                  </p>
                  <p className="text-xs text-[#777] leading-relaxed">
                    {diagnostico.preparacion.descripcion}
                  </p>
                </div>
              </div>

              <div className="border-l-2 border-brand-red pl-6 mb-10">
                <p className="text-xs text-brand-red tracking-[0.2em] uppercase font-display mb-3">
                  Qué haríamos
                </p>
                <p className="text-xl text-white font-light mb-3">
                  {diagnostico.oportunidad.titulo}
                </p>
                <p className="text-sm text-[#999] leading-relaxed mb-3">
                  {diagnostico.oportunidad.descripcion}
                </p>
                {lectura?.estimacion && (
                  <p className="text-sm text-[#999] leading-relaxed mb-3">{lectura.estimacion}</p>
                )}
                <Link
                  href={diagnostico.oportunidad.href}
                  className="text-xs tracking-[0.15em] uppercase text-[#777] hover:text-white transition-colors"
                >
                  Cómo funciona →
                </Link>
              </div>

              {diagnostico.complemento && (
                <div className="border-l-2 border-[#333] pl-6 mb-10">
                  <p className="text-xs text-[#777] tracking-[0.2em] uppercase font-display mb-3">
                    También conviene
                  </p>
                  <p className="text-white font-light mb-2">{diagnostico.complemento.titulo}</p>
                  <p className="text-sm text-[#999] leading-relaxed">
                    {diagnostico.complemento.descripcion}
                  </p>
                </div>
              )}

              <div className="border-l-2 border-brand-gold pl-6 mb-14">
                <p className="text-xs text-brand-gold tracking-[0.2em] uppercase font-display mb-3">
                  Primer paso, en los próximos 30 días
                </p>
                <p className="text-white font-light leading-relaxed">
                  {lectura?.primerPaso || diagnostico.primerPaso}
                </p>
              </div>

              <div className="border-t border-[#1F1F1F] pt-10">
                {lectura?.pregunta && (
                  <p className="text-[#999] leading-relaxed mb-8">
                    Una pregunta para conversar: {lectura.pregunta}
                  </p>
                )}
                <MagneticButton
                  href={COMPANY.calendar}
                  className="px-10 py-4 bg-brand-red text-white hover:bg-red-600 text-sm"
                >
                  Agendar 30 minutos
                </MagneticButton>
                <p className="text-xs text-[#555] mt-6">
                  Te enviamos una copia a {datos.email}. Si no la ves, revisa spam.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Noise overlay */}
      <div className="noise-overlay" />
    </div>
  );
}
