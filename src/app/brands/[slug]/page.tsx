import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/PageIntro";
import { brands, getBrandBySlug } from "@/data/brands";
import { getVehicleModelsForBrand } from "@/data/vehicleModels";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) return { title: "Марка" };
  return {
    title: `${brand.titleRu} — сервис и ремонт`,
    description: `${brand.summary} ${site.name}, ${site.city}.`,
  };
}

export default async function BrandPage({ params }: Props) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) notFound();

  const modelLandings = getVehicleModelsForBrand(brand.slug);
  const landingLabels = new Set(
    modelLandings.map((m) => m.shortLabel.toLowerCase()),
  );

  return (
    <article className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <nav className="text-sm text-brand-silver">
        <Link href="/" className="hover:text-brand-gold">
          Главная
        </Link>
        <span className="mx-2 text-brand-silver/50">/</span>
        <Link href="/brands" className="hover:text-brand-gold">
          Марки
        </Link>
        <span className="mx-2 text-brand-silver/50">/</span>
        <span className="text-brand-white">{brand.label}</span>
      </nav>

      <div className="mt-10">
        <PageIntro
          eyebrow={brand.label}
          title={`${brand.titleRu}: сервис в ${site.city}`}
          description={brand.summary}
        />
      </div>

      <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-brand-gold/30 bg-brand-gold/10 p-6">
        <p className="text-sm font-semibold text-brand-white">
          ТО и обслуживание {brand.titleRu}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-brand-silver">
          Отдельная страница под регламент, типовые темы и ответы на частые вопросы по марке.
        </p>
        <Link
          href={`/brands/${brand.slug}/obsluzhivanie`}
          className="mt-4 inline-flex rounded-full bg-brand-gold px-5 py-2.5 text-sm font-semibold text-black hover:bg-brand-amber"
        >
          Открыть раздел
        </Link>
      </div>

      <div className="mx-auto mt-10 max-w-3xl space-y-4">
        {brand.body.map((p, i) => (
          <p key={i} className="text-base leading-relaxed text-brand-silver">
            {p}
          </p>
        ))}
      </div>

      <section className="mx-auto mt-12 max-w-3xl rounded-2xl border border-brand-silver/15 bg-black/20 p-6">
        <h2 className="text-sm font-semibold tracking-wide text-brand-white uppercase">
          Модели — посадочные страницы
        </h2>
        {modelLandings.length > 0 ? (
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {modelLandings.map((m) => (
              <li key={m.slug}>
                <Link
                  href={`/brands/${brand.slug}/${m.slug}`}
                  className="block rounded-xl border border-brand-silver/15 bg-black/30 px-4 py-3 text-sm font-medium text-brand-white transition-colors hover:border-brand-gold/45 hover:text-brand-gold"
                >
                  {m.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
        <h3 className="mt-8 text-xs font-semibold tracking-wide text-brand-silver uppercase">
          Другие модели линейки
        </h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {brand.models
            .filter((name) => !landingLabels.has(name.toLowerCase()))
            .map((m) => (
              <li
                key={m}
                className="rounded-full border border-brand-silver/20 px-3 py-1 text-xs text-brand-silver"
              >
                {m}
              </li>
            ))}
        </ul>
      </section>

      <div className="mx-auto mt-12 flex max-w-3xl flex-wrap gap-4">
        <Link
          href="/services/to"
          className="inline-flex rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-black hover:bg-brand-amber"
        >
          Техобслуживание (ТО)
        </Link>
        <Link
          href="/services/diagnostika"
          className="inline-flex rounded-full border border-brand-silver/35 px-6 py-3 text-sm font-semibold text-brand-white hover:border-brand-gold hover:text-brand-gold"
        >
          Диагностика
        </Link>
        <Link
          href="/services/akpp-dsg"
          className="inline-flex rounded-full border border-brand-silver/35 px-6 py-3 text-sm font-semibold text-brand-white hover:border-brand-gold hover:text-brand-gold"
        >
          АКПП и ДСГ
        </Link>
        <Link
          href="/contacts"
          className="inline-flex rounded-full border border-brand-silver/35 px-6 py-3 text-sm font-semibold text-brand-white hover:border-brand-gold hover:text-brand-gold"
        >
          Запись
        </Link>
      </div>
    </article>
  );
}
