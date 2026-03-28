import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { services } from "@/data/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Услуги",
  description: `Услуги ${site.name} (${site.tagline.toLowerCase()}) в ${site.city}: двигатель, ГРМ, сцепление, подвеска, жидкости, диагностика.`,
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <PageIntro
        eyebrow={site.city}
        title="Услуги автосервиса"
        description={`Двигатель и переборка, ГРМ, сцепление, подвеска, масла и фильтры, диагностика — в ${site.city} (${site.region}). Ниже карточки ведут на отдельные страницы.`}
      />
      <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/services/${s.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-silver/15 bg-black/15 transition-colors hover:border-brand-gold/35"
            >
              <div className="relative aspect-video w-full border-b border-brand-silver/10">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h2 className="text-xl font-semibold text-brand-white group-hover:text-brand-gold">
                  {s.title}
                </h2>
                <p className="flex-1 text-sm leading-relaxed text-brand-silver">
                  {s.summary}
                </p>
                <ul className="space-y-1.5 text-xs text-brand-silver/90">
                  {s.highlights.slice(0, 3).map((h) => (
                    <li key={h} className="flex gap-2">
                      <span className="text-brand-gold" aria-hidden>
                        ·
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <span className="pt-2 text-xs font-semibold tracking-wide text-brand-amber uppercase">
                  Открыть раздел
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
