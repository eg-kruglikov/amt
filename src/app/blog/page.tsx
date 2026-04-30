import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { blogPosts, blogTopicsPlanned } from "@/data/blog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Блог",
  description: `Материалы по эксплуатации и ремонту ${site.vagBrands}: ошибки, ГРМ, ТО, ДСГ. ${site.name}, ${site.city}.`,
};

export default function BlogPage() {
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime(),
  );
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <PageIntro
        eyebrow="Экспертиза"
        title="Блог"
        description={`Информационные материалы по ${site.vagBrands} для владельцев в ${site.city} и области: типовые ошибки, ГРМ, трансмиссия. Статьи дополняются по мере готовности.`}
      />

      <div className="mt-12 space-y-4">
        <h2 className="text-sm font-semibold tracking-wide text-brand-white uppercase">
          Статьи
        </h2>
        <ul className="space-y-3">
          {sorted.map((post) => {
            const dateLabel = new Date(post.datePublished).toLocaleDateString("ru-RU", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });
            return (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block rounded-2xl border border-brand-silver/15 bg-black/20 p-5 transition-colors hover:border-brand-gold/35"
                >
                  <span className="text-xs text-brand-silver/90">{dateLabel}</span>
                  <span className="mt-2 block text-lg font-semibold text-brand-white group-hover:text-brand-gold">
                    {post.title}
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-brand-silver">
                    {post.description}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-12 rounded-2xl border border-brand-silver/15 bg-black/20 p-6">
        <h2 className="text-sm font-semibold tracking-wide text-brand-white uppercase">
          Скоро
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-brand-silver">
          {blogTopicsPlanned.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/services"
          className="inline-flex rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-black hover:bg-brand-amber"
        >
          Услуги
        </Link>
        <Link
          href="/contacts"
          className="inline-flex rounded-full border border-brand-silver/35 px-6 py-3 text-sm font-semibold text-brand-white hover:border-brand-gold hover:text-brand-gold"
        >
          Контакты
        </Link>
      </div>
    </div>
  );
}
