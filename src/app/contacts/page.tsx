import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Контакты",
  description: `Контакты ${site.name} — ${site.tagline.toLowerCase()} в ${site.city}: телефон, адрес, запись.`,
};

export default function ContactsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <PageIntro
        eyebrow={site.city}
        title="Контакты и запись"
        description={`Сервис в ${site.city} (${site.region}). Запись по телефону и визит по адресу ниже. Карту и часы работы можно добавить позже.`}
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
    </div>
  );
}
