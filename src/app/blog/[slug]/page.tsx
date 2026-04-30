import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBaseUrl } from "@/lib/baseUrl";
import { blogPosts, getBlogPostBySlug } from "@/data/blog";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Статья" };
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `${getBaseUrl()}/blog/${post.slug}`,
    },
  };
}

function ArticleJsonLd({
  slug,
  title,
  description,
  datePublished,
}: {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
}) {
  const url = `${getBaseUrl()}/blog/${slug}`;
  const json = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished,
    author: {
      "@type": "Organization",
      name: site.name,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const dateLabel = new Date(post.datePublished).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <ArticleJsonLd
        slug={post.slug}
        title={post.title}
        description={post.description}
        datePublished={post.datePublished}
      />
      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <nav className="text-sm text-brand-silver">
          <Link href="/" className="hover:text-brand-gold">
            Главная
          </Link>
          <span className="mx-2 text-brand-silver/50">/</span>
          <Link href="/blog" className="hover:text-brand-gold">
            Блог
          </Link>
          <span className="mx-2 text-brand-silver/50">/</span>
          <span className="line-clamp-1 text-brand-white">{post.title}</span>
        </nav>

        <header className="mt-10 space-y-4">
          <p className="text-xs tracking-wide text-brand-silver uppercase">
            {dateLabel}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-brand-white sm:text-4xl">
            {post.title}
          </h1>
          <p className="text-lg leading-relaxed text-brand-silver">
            {post.description}
          </p>
        </header>

        <div className="mt-10 space-y-5 border-t border-brand-silver/10 pt-10">
          {post.body.map((paragraph, index) => (
            <p
              key={index}
              className="text-base leading-relaxed text-brand-silver"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <section className="mt-12 rounded-2xl border border-brand-gold/25 bg-brand-gold/5 p-6">
          <h2 className="text-sm font-semibold tracking-wide text-brand-white uppercase">
            Полезные разделы
          </h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {post.related.map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className="inline-flex rounded-full border border-brand-gold/45 bg-black/20 px-4 py-2 text-sm font-medium text-brand-gold hover:bg-brand-gold/10"
                >
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-10 text-center text-sm text-brand-silver">
          <Link href="/blog" className="font-medium text-brand-gold hover:text-brand-amber">
            ← Все материалы блога
          </Link>
        </p>
      </article>
    </>
  );
}
