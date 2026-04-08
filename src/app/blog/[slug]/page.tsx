import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

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
    alternates: {
      canonical: `https://onzaai.com/blog/${post.slug}`,
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
    url: `https://onzaai.com/blog/${post.slug}`,
    author: {
      "@type": "Person",
      name: post.author,
      url: "https://linkedin.com/in/enriquepabon",
      jobTitle: "Fundador & Consultor IA",
      worksFor: {
        "@type": "Organization",
        name: "Onza",
        url: "https://onzaai.com",
      },
    },
    publisher: {
      "@type": "Organization",
      name: "Onza",
      url: "https://onzaai.com",
      logo: {
        "@type": "ImageObject",
        url: "https://onzaai.com/favicon.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://onzaai.com/blog/${post.slug}`,
    },
    inLanguage: "es",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
      />

      <Section dark className="pt-32 pb-8">
        <Reveal>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[#777] hover:text-white transition-colors mb-8"
          >
            ← Blog
          </Link>
        </Reveal>
        <Reveal>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs text-brand-red tracking-[0.2em] uppercase font-display">
              {post.category}
            </span>
            <span className="text-xs text-[#777]">·</span>
            <span className="text-xs text-[#777]">
              {new Date(post.date).toLocaleDateString("es-CO", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="text-xs text-[#777]">·</span>
            <span className="text-xs text-[#777]">{post.readingTime}</span>
          </div>
        </Reveal>
        <TextReveal
          as="h1"
          className="text-hero-mobile md:text-hero font-light max-w-4xl"
        >
          {post.title}
        </TextReveal>
        <Reveal delay={0.2}>
          <p className="text-[#999] mt-6 max-w-2xl leading-relaxed text-lg font-light">
            {post.description}
          </p>
        </Reveal>
      </Section>

      {/* Blog hero image */}
      <div className="relative w-full h-[30vh] md:h-[45vh] overflow-hidden">
        <Image
          src={`/images/blog/${post.slug}.png`}
          alt={post.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-30" />
      </div>

      {/* Author bar */}
      <Section narrow>
        <div className="flex items-center gap-4 py-6 border-b border-gray-200 mb-12">
          <Image
            src="/images/enrique-pabon.jpg"
            alt={post.author}
            width={40}
            height={40}
            className="rounded-full object-cover w-10 h-10"
          />
          <div>
            <p className="text-sm font-medium">{post.author}</p>
            <p className="text-xs text-brand-gray">Fundador, Onza</p>
          </div>
        </div>

        {/* Quick answer block — optimized for LLM citation */}
        <div className="border-l-2 border-brand-gold pl-6 mb-12 py-1">
          <p className="text-xs text-brand-gold tracking-[0.15em] uppercase mb-2 font-display">
            En resumen
          </p>
          <p className="text-brand-dark leading-relaxed">
            {post.description}
          </p>
        </div>

        <article className="blog-article text-base leading-[1.85] text-brand-gray max-w-none">
          <MDXRemote source={post.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
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
