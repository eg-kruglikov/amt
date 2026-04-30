import Link from "next/link";
import { getServicesForHub } from "@/data/services";
import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  const topServices = getServicesForHub().slice(0, 6);
  return (
    <footer className="mt-auto border-t border-brand-silver/15 bg-black/25">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div className="space-y-3">
          <p className="text-sm font-semibold tracking-wide text-brand-white">
            {site.name}
          </p>
          <p className="text-xs leading-snug text-brand-silver/95 sm:text-sm">
            {site.tagline}
          </p>
          <p className="text-sm leading-relaxed text-brand-silver">
            Сервис {site.vagBrands} в {site.city}: ТО, диагностика, двигатель и
            ГРМ, АКПП и ДСГ, подвеска, жидкости.
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-semibold text-brand-white">Популярное</p>
          <ul className="space-y-2 text-sm text-brand-silver">
            {topServices.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-brand-gold">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-semibold text-brand-white">Навигация</p>
          <ul className="space-y-2 text-sm text-brand-silver">
            <li>
              <Link href="/services" className="hover:text-brand-gold">
                Услуги
              </Link>
            </li>
            <li>
              <Link href="/brands" className="hover:text-brand-gold">
                Марки
              </Link>
            </li>
            <li>
              <Link href="/prices" className="hover:text-brand-gold">
                Цены
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-brand-gold">
                Блог
              </Link>
            </li>
            <li>
              <Link href="/contacts" className="hover:text-brand-gold">
                Контакты и запись
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-brand-gold">
                Политика конфиденциальности
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-brand-gold">
                Пользовательское соглашение
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-semibold text-brand-white">
            {site.city}, {site.region}
          </p>
          <p className="text-sm text-brand-silver">{site.addressLine}</p>
          <a
            href={`tel:${site.phoneTel}`}
            className="inline-block text-sm font-medium text-brand-gold hover:text-brand-amber"
          >
            {site.phoneDisplay}
          </a>
        </div>
      </div>
      <div className="border-t border-brand-silver/10 py-4 text-center text-xs text-brand-silver/80">
        © {year} {site.name} — {site.tagline}. {site.city}.
      </div>
    </footer>
  );
}
