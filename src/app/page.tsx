import Image from "next/image";
import Link from "next/link";
import { services } from "@/data/services";
import { site } from "@/lib/site";

export default function Home() {
  const preview = services.slice(0, 3);
  return (
    <>
      <section className="relative isolate w-full min-h-[min(88vh,40rem)] overflow-hidden border-b border-brand-silver/10 sm:min-h-[min(90vh,44rem)]">
        {/* unoptimized: без /_next/image — иначе после замены hero.webp с тем же именем часто отдаётся старый кэш */}
        <Image
          src="/images/hero/hero.webp"
          alt={`${site.name}, ${site.tagline} — ${site.city}`}
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          unoptimized
        />
        {/* Затемнение для читаемости текста: слева плотнее, справа фото просвечивает */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-obsidian via-brand-obsidian/88 to-brand-obsidian/35 sm:via-brand-obsidian/80 sm:to-brand-obsidian/25"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-obsidian/90 via-transparent to-black/40"
          aria-hidden
        />
        <div className="relative z-10 mx-auto flex min-h-[min(88vh,40rem)] w-full max-w-6xl flex-col justify-center px-4 py-16 sm:min-h-[min(90vh,44rem)] sm:px-6 sm:py-20 lg:py-24">
          <div className="max-w-xl space-y-6 drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)]">
            <p className="text-sm tracking-[0.22em] text-brand-silver uppercase">
              {site.city} · {site.region}
            </p>
            <p className="text-sm font-medium text-brand-gold/95 sm:text-base">
              {site.name} — {site.tagline}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-brand-white sm:text-5xl lg:text-[2.75rem] lg:leading-[1.12] xl:text-5xl xl:leading-tight 2xl:text-6xl 2xl:leading-tight">
              Ремонт и обслуживание: двигатель, ходовая, ГРМ и ТО
            </h1>
            <p className="text-lg leading-relaxed text-brand-silver sm:text-xl sm:leading-relaxed">
              Акцент на двигатель, ГРМ, сцепление и подвеску. Понятная смета,
              запись в {site.city}.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full bg-brand-gold px-7 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-brand-amber"
              >
                Смотреть услуги
              </Link>
              <Link
                href="/contacts"
                className="inline-flex items-center justify-center rounded-full border border-white/35 bg-black/20 px-7 py-3.5 text-sm font-semibold text-brand-white backdrop-blur-sm transition-colors hover:border-brand-gold hover:text-brand-gold"
              >
                Запись и контакты
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-4 py-16 sm:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-brand-white md:text-3xl">
              Ключевые направления
            </h2>
          </div>
          <Link
            href="/services"
            className="text-sm font-semibold text-brand-gold hover:text-brand-amber"
          >
            Все услуги →
          </Link>
        </div>
        <ul className="grid gap-6 md:grid-cols-3">
          {preview.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-silver/15 bg-black/20 transition-colors hover:border-brand-gold/40"
              >
                <div className="relative aspect-video w-full border-b border-brand-silver/10">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover opacity-90 transition-opacity group-hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <h3 className="text-lg font-semibold text-brand-white group-hover:text-brand-gold">
                    {s.title}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-brand-silver">
                    {s.summary}
                  </p>
                  <span className="text-xs font-medium tracking-wide text-brand-amber uppercase">
                    Подробнее
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-brand-silver/10 bg-black/20">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="rounded-3xl border border-brand-gold/25 bg-brand-gold/5 px-8 py-10 text-center md:px-14">
            <h2 className="text-2xl font-semibold text-brand-white md:text-3xl">
              Запись в {site.name} · {site.city}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-brand-silver">
              Позвоните или загляните на страницу контактов — подскажем по услугам и времени.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={`tel:${site.phoneTel}`}
                className="inline-flex rounded-full bg-brand-gold px-8 py-3 text-sm font-semibold text-black hover:bg-brand-amber"
              >
                {site.phoneDisplay}
              </a>
              <Link
                href="/contacts"
                className="inline-flex rounded-full border border-brand-white/30 px-8 py-3 text-sm font-semibold text-brand-white hover:border-brand-gold hover:text-brand-gold"
              >
                Контакты
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
