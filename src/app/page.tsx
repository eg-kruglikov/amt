import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { brands } from "@/data/brands";
import { getServicesForHub } from "@/data/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Сервис в Мытищах",
  description: `${site.name}: ремонт и ТО ${site.vagBrands} в ${site.city} — диагностика, двигатель, ГРМ, АКПП и ДСГ, подвеска. ${site.region}.`,
};

export default function Home() {
  const hub = getServicesForHub();
  const preview = hub.slice(0, 6);
  return (
    <>
      <section className="relative isolate w-full min-h-[min(88vh,40rem)] overflow-hidden border-b border-brand-silver/10 sm:min-h-[min(90vh,44rem)]">
        {/* unoptimized: без /_next/image — иначе после замены hero.webp с тем же именем часто отдаётся старый кэш */}
        <Image
          src="/images/hero/hero.webp"
          alt={`${site.name}, сервис ${site.vagBrands} — ${site.city}`}
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
              Сервис {site.vagBrands}: ТО, диагностика, мотор, ГРМ, ДСГ и ходовая
            </h1>
            <p className="text-lg leading-relaxed text-brand-silver sm:text-xl sm:leading-relaxed">
              Профиль VAG в {site.city}: от регламентного обслуживания до АКПП и
              ДСГ, сцепления и подвески. Смета до старта работ.
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

      <section className="border-b border-brand-silver/10 bg-black/12">
        <div className="mx-auto max-w-6xl space-y-8 px-4 py-14 sm:px-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl font-semibold text-brand-white md:text-3xl">
              Почему мы
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-brand-silver md:mx-0">
              Профиль VAG в {site.city}: прозрачная смета, понятные этапы работ и
              фокус на узлах, по которым чаще всего обращаются владельцы группы.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Смета до старта",
                text: "Согласуем объём и стоимость до начала ремонта — без навязанных услуг.",
              },
              {
                title: "VAG-специфика",
                text: `Диагностика и ремонт ${site.vagBrands}: от ТО до ДСГ и ходовой.`,
              },
              {
                title: "Запись и сроки",
                text: "Работаем по предварительной записи — удобно спланировать визит.",
              },
              {
                title: "Мытищи, МО",
                text: `${site.city}: адрес и контакты на странице «Контакты».`,
              },
            ].map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-brand-silver/15 bg-black/25 px-5 py-5"
              >
                <p className="font-semibold text-brand-white">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-brand-silver">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-brand-silver/10 bg-black/16">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-brand-silver/15 bg-black/25 p-6">
              <h2 className="text-base font-semibold text-brand-white">
                Отзывы и рейтинг
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-brand-silver">
                Карточка {site.name} в Яндекс.Картах — актуальные отзывы и ответы,
                маршрут и режим в одном месте.
              </p>
              <a
                href={site.yandexMapsOrg.pageUrl}
                className="mt-4 inline-flex text-sm font-semibold text-brand-gold hover:text-brand-amber"
                target="_blank"
                rel="noreferrer"
              >
                Открыть профиль в Яндекс.Картах →
              </a>
            </div>
            <div className="rounded-2xl border border-brand-silver/15 bg-black/25 p-6">
              <h2 className="text-base font-semibold text-brand-white">
                Ориентиры по ценам
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-brand-silver">
                Как формируем смету: ТО, диагностика, ДСГ и ГУР без «фейковых
                прайсов» — честно про осмотр и допуски.
              </p>
              <Link
                href="/prices"
                className="mt-4 inline-flex text-sm font-semibold text-brand-gold hover:text-brand-amber"
              >
                Раздел «Цены и ориентиры» →
              </Link>
            </div>
            <div className="rounded-2xl border border-brand-silver/15 bg-black/25 p-6">
              <h2 className="text-base font-semibold text-brand-white">
                Частый спрос
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-brand-silver">
                ТО, диагностика, замена масла в ДСГ, сцепление DQ200, ГУР и ходовая
                — отдельные страницы с деталями.
              </p>
              <Link
                href="/services"
                className="mt-4 inline-flex text-sm font-semibold text-brand-gold hover:text-brand-amber"
              >
                Каталог услуг →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-4 py-16 sm:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-brand-white md:text-3xl">
              С чего начать
            </h2>
            <p className="max-w-2xl text-sm text-brand-silver">
              ТО, диагностика и узлы, по которым чаще всего обращаются владельцы{" "}
              {site.vagBrands}.
            </p>
          </div>
          <Link
            href="/services"
            className="text-sm font-semibold text-brand-gold hover:text-brand-amber"
          >
            Все услуги →
          </Link>
        </div>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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

      <section className="border-t border-brand-silver/10 bg-black/15">
        <div className="mx-auto max-w-6xl space-y-6 px-4 py-14 sm:px-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-brand-white md:text-3xl">
                Популярные модели
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-brand-silver">
                Отдельные страницы под частые запросы: ТО, ДСГ, ГРМ и ходовая.
              </p>
            </div>
            <Link
              href="/brands"
              className="text-sm font-semibold text-brand-gold hover:text-brand-amber"
            >
              Все марки →
            </Link>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                href: "/brands/volkswagen/tiguan",
                title: "Volkswagen Tiguan",
              },
              { href: "/brands/skoda/octavia", title: "Škoda Octavia" },
              { href: "/brands/audi/q5", title: "Audi Q5" },
              { href: "/brands/porsche/cayenne", title: "Porsche Cayenne" },
              { href: "/brands/porsche/macan", title: "Porsche Macan" },
              { href: "/brands/volkswagen/golf", title: "Volkswagen Golf" },
              { href: "/brands/volkswagen/passat", title: "Volkswagen Passat" },
              { href: "/brands/audi/a4", title: "Audi A4" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex h-full flex-col rounded-2xl border border-brand-silver/15 bg-black/20 p-5 transition-colors hover:border-brand-gold/40"
                >
                  <span className="text-base font-semibold text-brand-white hover:text-brand-gold">
                    {item.title}
                  </span>
                  <span className="mt-2 text-xs text-brand-silver">
                    Сервис в {site.city}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-brand-silver/10 bg-black/10">
        <div className="mx-auto max-w-6xl space-y-8 px-4 py-14 sm:px-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-brand-white md:text-3xl">
                Марки
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-brand-silver">
                Отдельные хабы по брендам — удобны для навигации и под
                марочные запросы.
              </p>
            </div>
            <Link
              href="/brands"
              className="text-sm font-semibold text-brand-gold hover:text-brand-amber"
            >
              Все марки →
            </Link>
          </div>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {brands.map((b) => (
              <li key={b.slug}>
                <Link
                  href={`/brands/${b.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-brand-silver/15 bg-black/20 p-5 transition-colors hover:border-brand-gold/40"
                >
                  <span className="text-xs font-semibold tracking-wide text-brand-amber uppercase">
                    {b.label}
                  </span>
                  <span className="mt-2 text-lg font-semibold text-brand-white group-hover:text-brand-gold">
                    {b.titleRu}
                  </span>
                  <span className="mt-2 line-clamp-3 text-sm text-brand-silver">
                    {b.summary}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-brand-silver/10 bg-black/18">
        <div className="mx-auto max-w-6xl space-y-6 px-4 py-14 sm:px-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-brand-white md:text-3xl">
              Как нас найти
            </h2>
            <p className="max-w-2xl text-sm text-brand-silver">
              Один адрес в {site.city} — запись по телефону, визит после согласования времени.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,280px)] lg:items-start">
            <div className="rounded-2xl border border-brand-silver/15 bg-black/25 p-6 sm:p-8">
              <p className="text-xs font-semibold tracking-wide text-brand-silver uppercase">
                Сервис
              </p>
              <p className="mt-2 text-lg font-semibold text-brand-white">
                {site.name} · {site.tagline}
              </p>
              <p className="mt-4 text-sm text-brand-silver">{site.workHoursLine}</p>
              <p className="mt-4 text-sm leading-relaxed text-brand-white">
                {site.addressLine}
              </p>
              <p className="mt-1 text-sm text-brand-silver">
                {site.city}, {site.region}
              </p>
              <a
                href={`tel:${site.phoneTel}`}
                className="mt-6 inline-flex text-base font-semibold text-brand-gold hover:text-brand-amber"
              >
                {site.phoneDisplay}
              </a>
              <div className="mt-6">
                <Link
                  href="/contacts#map"
                  className="text-sm font-semibold text-brand-white underline-offset-2 hover:text-brand-gold hover:underline"
                >
                  Открыть карту проезда →
                </Link>
              </div>
            </div>
            <div className="rounded-2xl border border-brand-silver/15 bg-black/20 p-6 text-sm text-brand-silver">
              <p className="font-semibold text-brand-white">На карте</p>
              <p className="mt-3 leading-relaxed">
                Интерактивная схема проезда — на странице контактов, с возможностью
                построить маршрут в Яндекс.Картах.
              </p>
              <Link
                href="/contacts#map"
                className="mt-4 inline-block font-semibold text-brand-gold hover:text-brand-amber"
              >
                Карта и маршрут
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-brand-silver/10 bg-black/20">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="rounded-3xl border border-brand-gold/25 bg-brand-gold/5 px-8 py-10 text-center md:px-14">
            <h2 className="text-2xl font-semibold text-brand-white md:text-3xl">
              Запись в {site.name} · {site.city}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-brand-silver">
              Позвоните или загляните на страницу контактов — подскажем по услугам и времени.
              Ориентиры по стоимости — в разделе{" "}
              <Link href="/prices" className="font-medium text-brand-gold hover:text-brand-amber">
                «Цены»
              </Link>
              .
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
