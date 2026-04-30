import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { getServicesForHub } from "@/data/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Услуги",
  description: `Услуги ${site.name} (${site.tagline.toLowerCase()}) в ${site.city}: ТО и регламент ${site.vagBrands}, диагностика, двигатель и ГРМ, АКПП и ДСГ (масло и сцепление), ГУР, МКПП, подвеска, жидкости. Ориентиры — в «Ценах».`,
};

export default function ServicesPage() {
  const hub = getServicesForHub();
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <PageIntro
        eyebrow={site.city}
        title="Услуги автосервиса"
        description={`ТО, диагностика, двигатель и ГРМ, АКПП и ДСГ (включая замену масла в преселективной коробке и сцепление «сухого» типа), гидроусилитель, сцепление МКПП, подвеска и жидкости — для ${site.vagBrands} в ${site.city}. Ниже каждое направление раскрыто отдельной страницей; по маркам см. «Марки», логика цен — «Цены и ориентиры».`}
      />

      <div className="mt-10 flex flex-wrap gap-3 rounded-2xl border border-brand-silver/10 bg-black/15 p-4 text-sm">
        <Link
          href="/brands"
          className="rounded-full border border-brand-gold/45 bg-brand-gold/10 px-4 py-2 font-medium text-brand-gold hover:bg-brand-gold/20"
        >
          Марки
        </Link>
        <Link
          href="/prices"
          className="rounded-full border border-brand-silver/25 px-4 py-2 font-medium text-brand-silver hover:border-brand-gold hover:text-brand-gold"
        >
          Цены и ориентиры
        </Link>
        <Link
          href="/blog"
          className="rounded-full border border-brand-silver/25 px-4 py-2 font-medium text-brand-silver hover:border-brand-gold hover:text-brand-gold"
        >
          Блог
        </Link>
      </div>

      <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {hub.map((s) => (
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
