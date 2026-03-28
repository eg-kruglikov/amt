import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/PageIntro";
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
    description: `${service.summary} ${site.name}, ${site.city}.`,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <article className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
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
            eyebrow={`${site.city} · ${site.name}`}
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

      <div className="mt-14 max-w-none border-t border-brand-silver/10 pt-10">
        {service.body.map((paragraph, index) => (
          <p
            key={index}
            className="mb-4 text-base leading-relaxed text-brand-silver last:mb-0"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
