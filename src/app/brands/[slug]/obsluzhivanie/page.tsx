import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ServiceFaqJsonLd } from "@/components/ServiceFaqJsonLd";
import { brands, getBrandBySlug } from "@/data/brands";
import { getBrandMaintenance } from "@/data/brandMaintenance";
import { getBaseUrl } from "@/lib/baseUrl";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  const m = getBrandMaintenance(slug);
  if (!brand || !m) return { title: "Обслуживание" };
  return {
    title: `ТО и обслуживание ${brand.titleRu} в ${site.city}`,
    description: `${m.lead} ${site.name}.`,
    alternates: {
      canonical: `${getBaseUrl()}/brands/${slug}/obsluzhivanie`,
    },
  };
}

export default async function BrandMaintenancePage({ params }: Props) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  const m = getBrandMaintenance(slug);
  if (!brand || !m) notFound();

  return (
    <article className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      {m.faqs.length ? <ServiceFaqJsonLd faqs={m.faqs} /> : null}
      <nav className="text-sm text-brand-silver">
        <Link href="/" className="hover:text-brand-gold">
          Главная
        </Link>
        <span className="mx-2 text-brand-silver/50">/</span>
        <Link href="/brands" className="hover:text-brand-gold">
          Марки
        </Link>
        <span className="mx-2 text-brand-silver/50">/</span>
        <Link href={`/brands/${brand.slug}`} className="hover:text-brand-gold">
          {brand.label}
        </Link>
        <span className="mx-2 text-brand-silver/50">/</span>
        <span className="text-brand-white">ТО и обслуживание</span>
      </nav>

      <header className="mx-auto mt-10 max-w-3xl text-center">
        <p className="text-sm tracking-[0.2em] text-brand-silver uppercase">
          {brand.label} · {site.city}
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-brand-white sm:text-4xl">
          ТО и обслуживание {brand.titleRu}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-brand-silver">{m.lead}</p>
      </header>

      <div className="mx-auto mt-12 max-w-3xl space-y-10 border-t border-brand-silver/10 pt-10">
        {m.sections.map((sec) => (
          <section key={sec.title}>
            <h2 className="text-xl font-semibold tracking-tight text-brand-white">
              {sec.title}
            </h2>
            <div className="mt-4 space-y-4">
              {sec.paragraphs.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-brand-silver">
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      {m.faqs.length ? (
        <section className="mx-auto mt-12 max-w-3xl rounded-2xl border border-brand-silver/15 bg-black/20 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-brand-white">Частые вопросы</h2>
          <ul className="mt-6 space-y-6">
            {m.faqs.map((item) => (
              <li key={item.question}>
                <p className="font-medium text-brand-white">{item.question}</p>
                <p className="mt-2 text-sm leading-relaxed text-brand-silver">
                  {item.answer}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mx-auto mt-12 max-w-3xl rounded-2xl border border-brand-gold/25 bg-brand-gold/5 p-6">
        <h2 className="text-sm font-semibold tracking-wide text-brand-white uppercase">
          Куда дальше
        </h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          <li>
            <Link
              href={`/brands/${brand.slug}`}
              className="inline-flex rounded-full border border-brand-gold/45 bg-black/20 px-4 py-2 text-sm font-medium text-brand-gold hover:bg-brand-gold/10"
            >
              Все о марке {brand.label}
            </Link>
          </li>
          <li>
            <Link
              href="/services/to"
              className="inline-flex rounded-full border border-brand-gold/45 bg-black/20 px-4 py-2 text-sm font-medium text-brand-gold hover:bg-brand-gold/10"
            >
              ТО (услуга)
            </Link>
          </li>
          <li>
            <Link
              href="/services/diagnostika"
              className="inline-flex rounded-full border border-brand-gold/45 bg-black/20 px-4 py-2 text-sm font-medium text-brand-gold hover:bg-brand-gold/10"
            >
              Диагностика
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="inline-flex rounded-full border border-brand-gold/45 bg-black/20 px-4 py-2 text-sm font-medium text-brand-gold hover:bg-brand-gold/10"
            >
              Блог
            </Link>
          </li>
          <li>
            <Link
              href="/contacts"
              className="inline-flex rounded-full border border-brand-gold/45 bg-black/20 px-4 py-2 text-sm font-medium text-brand-gold hover:bg-brand-gold/10"
            >
              Запись
            </Link>
          </li>
        </ul>
      </section>

      <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-brand-silver">
        <Link
          href={`/brands/${brand.slug}`}
          className="font-medium text-brand-gold hover:text-brand-amber"
        >
          ← Назад к {brand.titleRu}
        </Link>
      </p>
    </article>
  );
}
