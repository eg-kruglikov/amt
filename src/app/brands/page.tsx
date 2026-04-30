import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { brands } from "@/data/brands";
import { site } from "@/lib/site";
import { vehicleModels } from "@/data/vehicleModels";

export const metadata: Metadata = {
  title: "Марки",
  description: `Ремонт и сервис ${site.vagBrands} в ${site.city} (${site.region}): Volkswagen, Audi, Škoda, Porsche и др. — хабы по маркам и услугам.`,
};

export default function BrandsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <PageIntro
        eyebrow={site.city}
        title="Марки в работе"
        description={`${site.name} ориентирован на ${site.vagBrands}. Ниже — хабы по маркам и отдельные страницы «ТО и обслуживание» под марочные запросы; от них удобно вести на услуги и запись.`}
      />
      <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((b) => (
          <li key={b.slug}>
            <Link
              href={`/brands/${b.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-brand-silver/15 bg-black/15 p-6 transition-colors hover:border-brand-gold/40"
            >
              <p className="text-xs font-semibold tracking-wide text-brand-amber uppercase">
                {b.label}
              </p>
              <h2 className="mt-2 text-xl font-semibold text-brand-white group-hover:text-brand-gold">
                {b.titleRu}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-silver">
                {b.summary}
              </p>
              <p className="mt-4 text-xs text-brand-silver/80">
                Модели: {b.models.slice(0, 5).join(", ")}
                {b.models.length > 5 ? "…" : ""}
              </p>
              <span className="mt-4 text-xs font-semibold tracking-wide text-brand-amber uppercase">
                Открыть раздел
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <section className="mt-16 rounded-2xl border border-brand-silver/10 bg-black/15 p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-brand-white">
          Все модельные страницы
        </h2>
        <p className="mt-2 text-sm text-brand-silver">
          Внутренняя перелинковка для поисковиков и быстрый переход с хаба марок.
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {vehicleModels.map((m) => (
            <li key={`${m.brandSlug}-${m.slug}`}>
              <Link
                href={`/brands/${m.brandSlug}/${m.slug}`}
                className="inline-flex rounded-full border border-brand-silver/20 bg-black/25 px-3 py-1.5 text-xs font-medium text-brand-silver transition-colors hover:border-brand-gold/40 hover:text-brand-gold"
              >
                {m.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="mx-auto mt-12 max-w-2xl text-center text-sm text-brand-silver">
        Нужна запись или смета? Перейдите на{" "}
        <Link href="/services" className="font-medium text-brand-gold hover:text-brand-amber">
          услуги
        </Link>{" "}
        или{" "}
        <Link href="/contacts" className="font-medium text-brand-gold hover:text-brand-amber">
          контакты
        </Link>
        .
      </p>
    </div>
  );
}
