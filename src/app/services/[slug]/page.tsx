import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/PageIntro";
import { ServiceFaqJsonLd } from "@/components/ServiceFaqJsonLd";
import { getServiceBySlug, services } from "@/data/services";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Услуга" };
  return {
    title: service.title,
    description: `${service.summary} ${site.name} (${site.tagline.toLowerCase()}), ${site.city}.`,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const relatedFromSlugs =
    service.relatedSlugs
      ?.map((s) => {
        const rel = getServiceBySlug(s);
        if (!rel) return null;
        return { href: `/services/${rel.slug}`, label: rel.title };
      })
      .filter((x): x is { href: string; label: string } => x != null) ?? [];

  const related = [...relatedFromSlugs, ...(service.relatedLinks ?? [])];

  const hasSections = Boolean(service.sections?.length);

  return (
    <article className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      {service.faqs?.length ? <ServiceFaqJsonLd faqs={service.faqs} /> : null}
      <nav className="text-sm text-brand-silver">
        <Link href="/" className="hover:text-brand-gold">
          Главная
        </Link>
        <span className="mx-2 text-brand-silver/50">/</span>
        <Link href="/services" className="hover:text-brand-gold">
          Услуги
        </Link>
        <span className="mx-2 text-brand-silver/50">/</span>
        <span className="text-brand-white">{service.title}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-start">
        <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-brand-silver/20">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="space-y-6">
          <PageIntro
            eyebrow={`${site.name} · ${site.tagline}`}
            title={service.title}
            description={service.summary}
          />
          <ul className="space-y-3 rounded-2xl border border-brand-silver/15 bg-black/20 p-6">
            {service.highlights.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-brand-silver">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contacts"
              className="inline-flex rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-black hover:bg-brand-amber"
            >
              Записаться в Мытищах
            </Link>
            <Link
              href="/services"
              className="inline-flex rounded-full border border-brand-silver/35 px-6 py-3 text-sm font-semibold text-brand-white hover:border-brand-gold hover:text-brand-gold"
            >
              Все услуги
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-14 max-w-none space-y-10 border-t border-brand-silver/10 pt-10">
        {hasSections
          ? service.sections!.map((sec) => (
              <section key={sec.title} className="max-w-3xl">
                <h2 className="text-xl font-semibold tracking-tight text-brand-white">
                  {sec.title}
                </h2>
                <div className="mt-4 space-y-4">
                  {sec.paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-base leading-relaxed text-brand-silver"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))
          : service.body.map((paragraph, index) => (
              <p
                key={index}
                className="mb-4 max-w-3xl text-base leading-relaxed text-brand-silver last:mb-0"
              >
                {paragraph}
              </p>
            ))}
      </div>

      {service.faqs?.length ? (
        <section className="mt-14 max-w-3xl rounded-2xl border border-brand-silver/15 bg-black/20 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-brand-white">Частые вопросы</h2>
          <ul className="mt-6 space-y-6">
            {service.faqs.map((item) => (
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

      {related.length > 0 ? (
        <section className="mt-12 rounded-2xl border border-brand-gold/20 bg-brand-gold/5 p-6 lg:max-w-xl">
          <h2 className="text-sm font-semibold tracking-wide text-brand-white uppercase">
            См. также
          </h2>
          <ul className="mt-4 flex flex-col gap-2">
            {related.map((item) => (
              <li key={`${item.href}-${item.label}`}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-brand-gold hover:text-brand-amber"
                >
                  {item.label} →
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
