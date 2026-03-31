import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { LineReveal } from "@/components/ui/line-reveal";

export const metadata: Metadata = {
  title: "Blog — Onza | IA para empresas en LATAM",
  description:
    "Guías prácticas sobre implementación de IA, automatización de procesos y diagnóstico empresarial. Sin jerga, sin promesas vacías.",
  openGraph: {
    title: "Blog — Onza | IA para empresas en LATAM",
    description:
      "Guías prácticas sobre implementación de IA, automatización de procesos y diagnóstico empresarial.",
    url: "https://onzaai.com/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Section dark className="pt-32 pb-16">
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-brand-red" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-brand-red font-display">
              Blog
            </span>
          </div>
        </Reveal>
        <TextReveal
          as="h1"
          className="text-hero-mobile md:text-hero font-light max-w-4xl"
        >
          Ideas sobre IA que puedes aplicar hoy
        </TextReveal>
      </Section>

      <Section>
        <div className="space-y-0">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.08}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <article className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-10 md:py-14 items-start">
                  <div className="md:col-span-2">
                    <p className="text-xs text-brand-red tracking-[0.2em] uppercase font-display">
                      {post.category}
                    </p>
                    <p className="text-xs text-brand-gray mt-1">
                      {new Date(post.date).toLocaleDateString("es-CO", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="md:col-span-7">
                    <h2 className="text-2xl md:text-3xl font-light group-hover:text-brand-red transition-colors duration-500">
                      {post.title}
                    </h2>
                    <p className="text-sm text-brand-gray leading-relaxed mt-3 max-w-xl">
                      {post.description}
                    </p>
                  </div>
                  <div className="md:col-span-3 md:text-right">
                    <p className="text-xs text-brand-gray">{post.readingTime}</p>
                    <span className="inline-block mt-3 text-xs text-brand-gray group-hover:text-brand-red group-hover:translate-x-2 transition-all duration-500">
                      →
                    </span>
                  </div>
                </article>
                <LineReveal color="bg-gray-200" />
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
