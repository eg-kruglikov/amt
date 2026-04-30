import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

const nav = [
  { href: "/", label: "Главная" },
  { href: "/services", label: "Услуги" },
  { href: "/brands", label: "Марки" },
  { href: "/prices", label: "Цены" },
  { href: "/contacts", label: "Контакты" },
] as const;

const navLinkClass =
  "text-brand-silver transition-colors hover:text-brand-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/45 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-obsidian rounded-sm";

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.86.3 1.7.54 2.5a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.8.24 1.64.42 2.5.54A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function HeaderLogo() {
  return (
    <Image
      src={site.logoSrc}
      alt=""
      width={160}
      height={48}
      priority
      unoptimized
      className="h-9 w-auto max-h-10 max-w-[150px] object-contain object-left sm:max-h-11 sm:max-w-[170px]"
    />
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-brand-silver/20 bg-brand-obsidian shadow-[0_8px_32px_rgba(0,0,0,0.42)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between gap-3 py-3.5 md:gap-6">
          <Link
            href="/"
            aria-label={`${site.name} — на главную`}
            className="group flex min-w-0 items-center gap-3 rounded-lg text-brand-white outline-none transition-colors hover:text-brand-gold focus-visible:ring-2 focus-visible:ring-brand-gold/45 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-obsidian"
          >
            <span className="flex shrink-0 items-center">
              <HeaderLogo />
            </span>
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="text-sm font-semibold tracking-wide">{site.name}</span>
              <span className="text-xs text-brand-silver transition-colors group-hover:text-brand-silver/85">
                {site.city}
              </span>
            </span>
          </Link>

          <nav
            className="hidden items-center gap-7 text-sm font-medium md:flex md:flex-1 md:justify-center"
            aria-label="Основное меню"
          >
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className={navLinkClass}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-3 sm:gap-4">
            <div className="hidden flex-col items-end text-right text-[11px] leading-snug lg:flex">
              <span className="font-medium text-brand-white/90">{site.workHoursLine}</span>
              <Link
                href="/contacts"
                className="mt-1 max-w-[15rem] truncate text-brand-silver transition-colors hover:text-brand-gold hover:underline hover:underline-offset-2"
                title={site.addressLine}
              >
                {site.addressLine}
              </Link>
            </div>
            <a
              href={`tel:${site.phoneTel}`}
              className="group inline-flex items-center gap-2 rounded-lg border border-brand-silver/20 bg-brand-white/[0.03] px-3 py-2 text-sm font-medium text-brand-white/95 tabular-nums tracking-tight shadow-none transition-all hover:border-brand-gold/40 hover:bg-brand-gold/[0.07] hover:text-brand-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/35 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-obsidian sm:px-3.5"
            >
              <PhoneIcon className="shrink-0 text-brand-silver transition-colors group-hover:text-brand-gold" />
              <span>{site.phoneDisplay}</span>
            </a>
          </div>
        </div>

        <div className="border-t border-brand-silver/10 pb-3.5 pt-2.5 lg:hidden">
          <div className="flex flex-col gap-1 text-xs text-brand-silver sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
            <span className="shrink-0 font-medium text-brand-white/88">{site.workHoursLine}</span>
            <Link
              href="/contacts"
              className="min-w-0 transition-colors hover:text-brand-gold hover:underline hover:underline-offset-2 sm:text-right"
            >
              {site.addressLine}
            </Link>
          </div>
          <nav
            className="mt-3 flex flex-wrap gap-x-5 gap-y-2 border-t border-brand-silver/10 pt-3 text-sm font-medium md:hidden"
            aria-label="Меню на мобильном"
          >
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className={navLinkClass}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
