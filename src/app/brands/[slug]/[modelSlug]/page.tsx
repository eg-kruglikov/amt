import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBrandBySlug } from "@/data/brands";
import { getBaseUrl } from "@/lib/baseUrl";
import { ServiceFaqJsonLd } from "@/components/ServiceFaqJsonLd";
import { site } from "@/lib/site";
import { getVehicleModel, vehicleModels } from "@/data/vehicleModels";

type Props = { params: Promise<{ slug: string; modelSlug: string }> };

export function generateStaticParams() {
  return vehicleModels.map((m) => ({
    slug: m.brandSlug,
    modelSlug: m.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, modelSlug } = await params;
  const model = getVehicleModel(slug, modelSlug);
  if (!model) return { title: "Модель" };
  const brand = getBrandBySlug(slug);
  return {
    title: `${model.title} — сервис и ремонт`,
    description: `${model.summary} ${site.name}.`,
    alternates: {
      canonical: `${getBaseUrl()}/brands/${slug}/${modelSlug}`,
    },
  };
}

export default async function VehicleModelPage({ params }: Props) {
  const { slug, modelSlug } = await params;
  const brand = getBrandBySlug(slug);
  const model = getVehicleModel(slug, modelSlug);
  if (!brand || !model) notFound();

  const hasSections = Boolean(model.sections?.length);

  return (
    <article className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      {model.faqs?.length ? <ServiceFaqJsonLd faqs={model.faqs} /> : null}
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
        <span className="text-brand-white">{model.shortLabel}</span>
      </nav>

      <header className="mx-auto mt-10 max-w-3xl text-center">
        <p className="text-sm tracking-[0.2em] text-brand-silver uppercase">
          {brand.label} · {site.city}
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-brand-white sm:text-4xl md:text-5xl">
          {model.title}: сервис в {site.city}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-brand-silver">
          {model.summary}
        </p>
      </header>

      <div className="mx-auto mt-12 max-w-3xl space-y-10 border-t border-brand-silver/10 pt-10">
        {hasSections
          ? model.sections!.map((sec) => (
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
            ))
          : model.body.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-brand-silver">
                {p}
              </p>
            ))}
      </div>

      {model.faqs?.length ? (
        <section className="mx-auto mt-12 max-w-3xl rounded-2xl border border-brand-silver/15 bg-black/20 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-brand-white">Частые вопросы</h2>
          <ul className="mt-6 space-y-6">
            {model.faqs.map((item) => (
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
          {model.related.map((r) => (
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

      <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-brand-silver">
        <Link
          href={`/brands/${brand.slug}`}
          className="font-medium text-brand-gold hover:text-brand-amber"
        >
          ← Все модели {brand.label}
        </Link>
      </p>
    </article>
  );
}
