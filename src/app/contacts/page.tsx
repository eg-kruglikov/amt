import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { YandexMapEmbed } from "@/components/YandexMapEmbed";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Контакты",
  description: `Контакты ${site.name} — ${site.tagline.toLowerCase()} в ${site.city}: телефон, адрес, запись.`,
};

export default function ContactsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
      <PageIntro
        eyebrow={site.city}
        title="Контакты и запись"
        description={`Сервис в ${site.city} (${site.region}). Запись по телефону и визит по адресу ниже.`}
      />

      <div className="mt-12 space-y-8 rounded-3xl border border-brand-silver/15 bg-black/20 p-8">
        <div>
          <h2 className="text-sm font-semibold tracking-wide text-brand-silver uppercase">
            Адрес
          </h2>
          <p className="mt-2 text-lg text-brand-white">{site.addressLine}</p>
          <p className="mt-1 text-sm text-brand-silver">
            {site.city}, {site.region}
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold tracking-wide text-brand-silver uppercase">
            Телефон
          </h2>
          <a
            href={`tel:${site.phoneTel}`}
            className="mt-2 inline-block text-2xl font-semibold text-brand-gold hover:text-brand-amber"
          >
            {site.phoneDisplay}
          </a>
        </div>
        <div className="border-t border-brand-silver/10 pt-8">
          <Link
            href="/services"
            className="text-sm font-semibold text-brand-white hover:text-brand-gold"
          >
            ← К списку услуг
          </Link>
        </div>
      </div>

      <section
        id="map"
        aria-labelledby="contacts-map-heading"
        className="mt-12 space-y-4 scroll-mt-24"
      >
        <h2
          id="contacts-map-heading"
          className="text-lg font-semibold text-brand-white"
        >
          Схема проезда
        </h2>
        <p className="text-sm text-brand-silver">
          Карта открывается по карточке организации в Яндексе — та же метка
          автосервиса и название, что в приложении. Ниже — перейти к карточке
          целиком (маршрут, отзывы).
        </p>
        <div className="aspect-[16/10] w-full max-h-[min(28rem,70vh)] min-h-[220px]">
          <YandexMapEmbed />
        </div>
        <p className="text-center text-xs text-brand-silver/85">
          <a
            href={site.yandexMapsOrg.pageUrl}
            className="font-medium text-brand-gold hover:text-brand-amber"
            target="_blank"
            rel="noreferrer"
          >
            Карточка «{site.name}» в Яндекс.Картах
          </a>
        </p>
      </section>
    </div>
  );
}
