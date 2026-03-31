import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: `${post.title} — Onza Blog`,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: `${post.title} — Onza Blog`,
      description: post.description,
      url: `https://onzaai.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Onza",
      url: "https://onzaai.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Section dark className="pt-32 pb-16">
        <Reveal>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[#555] hover:text-white transition-colors mb-8"
          >
            ← Blog
          </Link>
        </Reveal>
        <Reveal>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs text-brand-red tracking-[0.2em] uppercase font-display">
              {post.category}
            </span>
            <span className="text-xs text-[#555]">·</span>
            <span className="text-xs text-[#555]">
              {new Date(post.date).toLocaleDateString("es-CO", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="text-xs text-[#555]">·</span>
            <span className="text-xs text-[#555]">{post.readingTime}</span>
          </div>
        </Reveal>
        <TextReveal
          as="h1"
          className="text-hero-mobile md:text-hero font-light max-w-4xl"
        >
          {post.title}
        </TextReveal>
      </Section>

      <Section narrow>
        <article className="prose prose-lg max-w-none prose-headings:font-light prose-headings:text-brand-dark prose-p:text-brand-gray prose-p:leading-relaxed prose-a:text-brand-red prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-dark prose-li:text-brand-gray prose-blockquote:border-brand-gold prose-blockquote:text-brand-gray">
          <MDXRemote source={post.content} />
        </article>
      </Section>

      {/* CTA */}
      <Section dark className="text-center relative overflow-hidden">
        <div className="noise-overlay" />
        <div className="relative z-10">
          <TextReveal
            as="h2"
            className="text-section-mobile md:text-section font-light mb-6 max-w-2xl mx-auto"
          >
            ¿Quieres implementar esto en tu empresa?
          </TextReveal>
          <Reveal delay={0.2}>
            <p className="text-[#777] mb-10 max-w-xl mx-auto leading-relaxed">
              Una conversación de 30 minutos para entender si tiene sentido aplicar IA en tu operación.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <MagneticButton
              href="/contacto?utm_source=blog&utm_medium=cta&utm_content=post-footer"
              className="px-10 py-4 text-sm bg-brand-red text-white hover:bg-red-600"
            >
              Agenda una conversación
            </MagneticButton>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
