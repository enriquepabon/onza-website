"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { MagneticButton } from "@/components/ui/magnetic-button";
import {
  QUIZ_QUESTIONS,
  calculateResult,
  type QuizResult,
} from "@/lib/quiz";
import { COMPANY } from "@/lib/constants";

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

// ── Animated Score Counter ─────────────────────────────────────────────────

function AnimatedScore({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = Math.round(obj.val).toString();
      },
    });
  }, [value]);

  return <span ref={ref}>0</span>;
}

// ── Main Quiz Page ─────────────────────────────────────────────────────────

type Phase = "landing" | "quiz" | "results" | "form" | "done";

export default function DiagnosticoIAPage() {
  const [phase, setPhase] = useState<Phase>("landing");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

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

  function handleStart() {
    setPhase("quiz");
    setCurrentQ(0);
  }

  function handleAnswer(value: number) {
    const q = QUIZ_QUESTIONS[currentQ];
    const updated = { ...answers, [q.id]: value };
    setAnswers(updated);

    if (currentQ < QUIZ_QUESTIONS.length - 1) {
      // Animate out then in
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            setCurrentQ((prev) => prev + 1);
          },
        });
      }
    } else {
      // Last question — calculate results
      const r = calculateResult(updated);
      setResult(r);
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => setPhase("results"),
        });
      }
    }
  }

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      answers,
    };

    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setFormStatus("sent");
        setPhase("done");
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  }

  const levelColor =
    result?.level === "exploracion"
      ? "text-brand-red"
      : result?.level === "oportunidad"
        ? "text-brand-gold"
        : "text-white";

  const inputClasses =
    "w-full border-b border-[#333] bg-transparent py-3 text-white placeholder:text-[#555] focus:border-brand-red focus:outline-none transition-colors";

  return (
    <div className="min-h-screen bg-brand-black flex flex-col">
      {/* Nav spacer */}
      <div className="h-20" />

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl" ref={contentRef}>

          {/* ── Landing ──────────────────────────────────────── */}
          {phase === "landing" && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-brand-red" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-brand-red font-display">
                  Diagnóstico gratuito
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] mb-6">
                ¿Tu empresa está lista para implementar IA?
              </h1>
              <p className="text-[#555] text-lg leading-relaxed mb-4 max-w-lg font-light">
                6 preguntas. 2 minutos. Un diagnóstico real de dónde la IA
                puede generar impacto en tu operación.
              </p>
              <p className="text-xs text-[#444] mb-10">
                Sin cuenta. Sin spam. Resultados inmediatos.
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
              <ProgressBar
                current={currentQ + 1}
                total={QUIZ_QUESTIONS.length}
              />

              <div className="mt-12">
                <p className="text-xs text-[#555] mb-1">
                  {currentQ + 1} de {QUIZ_QUESTIONS.length}
                </p>

                {/* Stat */}
                <div className="border-l-2 border-brand-gold pl-4 mt-6 mb-10">
                  <p className="text-sm text-[#777] leading-relaxed">
                    {QUIZ_QUESTIONS[currentQ].stat}
                  </p>
                  {QUIZ_QUESTIONS[currentQ].statSource && (
                    <p className="text-xs text-[#444] mt-1">
                      — {QUIZ_QUESTIONS[currentQ].statSource}
                    </p>
                  )}
                </div>

                {/* Question */}
                <h2 className="text-2xl md:text-3xl font-light text-white mb-10">
                  {QUIZ_QUESTIONS[currentQ].question}
                </h2>

                {/* Options */}
                <div className="space-y-3">
                  {QUIZ_QUESTIONS[currentQ].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(opt.value)}
                      className="w-full text-left px-6 py-4 border border-[#1F1F1F] text-[#999] hover:border-brand-red hover:text-white transition-all duration-300 text-sm leading-relaxed"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Results (partial) ────────────────────────────── */}
          {phase === "results" && result && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-8 bg-brand-red" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-brand-red font-display">
                  Tu resultado
                </span>
              </div>

              <div className="mb-10">
                <p className={`text-7xl md:text-8xl font-light ${levelColor} tabular-nums`}>
                  <AnimatedScore value={result.score} />
                  <span className="text-2xl text-[#555]">/24</span>
                </p>
                <p className={`text-2xl font-light mt-2 ${levelColor}`}>
                  {result.levelLabel}
                </p>
              </div>

              <div className="border-l-2 border-brand-gold pl-6 mb-12">
                <p className="text-xs text-brand-red tracking-[0.2em] uppercase font-display mb-2">
                  Tu mayor oportunidad
                </p>
                <p className="text-lg text-white font-light">
                  {result.topAreaService}
                </p>
              </div>

              <div className="border-t border-[#1F1F1F] pt-10">
                <p className="text-white text-lg font-light mb-2">
                  ¿Quieres el reporte completo?
                </p>
                <p className="text-sm text-[#555] mb-8">
                  Análisis por cada área, recomendaciones específicas y el
                  siguiente paso sugerido. Llega a tu correo en menos de un
                  minuto.
                </p>

                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <input
                    type="text"
                    name="name"
                    placeholder="Tu nombre"
                    required
                    className={inputClasses}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Tu email"
                    required
                    className={inputClasses}
                  />
                  <input
                    type="text"
                    name="company"
                    placeholder="Tu empresa (opcional)"
                    className={inputClasses}
                  />
                  <div className="flex flex-wrap gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={formStatus === "sending"}
                      className="px-10 py-4 bg-brand-red text-white text-sm tracking-[0.15em] uppercase hover:bg-red-600 transition-colors disabled:opacity-50"
                    >
                      {formStatus === "sending"
                        ? "Enviando..."
                        : "Recibir reporte completo"}
                    </button>
                    <MagneticButton
                      href={COMPANY.calendar}
                      className="px-8 py-4 border border-[#333] text-[#777] hover:border-white hover:text-white text-sm"
                    >
                      Agendar conversación
                    </MagneticButton>
                  </div>
                  {formStatus === "error" && (
                    <p className="text-sm text-brand-red">
                      Algo salió mal. Intenta de nuevo.
                    </p>
                  )}
                </form>
              </div>
            </div>
          )}

          {/* ── Done ─────────────────────────────────────────── */}
          {phase === "done" && (
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="h-px w-8 bg-brand-red" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-brand-red font-display">
                  Listo
                </span>
                <div className="h-px w-8 bg-brand-red" />
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
                Revisa tu correo
              </h2>
              <p className="text-[#777] mb-10 max-w-md mx-auto leading-relaxed">
                El reporte completo ya salió. Si no lo ves en tu bandeja
                principal, revisa spam.
              </p>
              <MagneticButton
                href={COMPANY.calendar}
                className="px-10 py-4 bg-brand-red text-white hover:bg-red-600 text-sm"
              >
                Agendar una conversación
              </MagneticButton>
            </div>
          )}
        </div>
      </div>

      {/* Noise overlay */}
      <div className="noise-overlay" />
    </div>
  );
}
