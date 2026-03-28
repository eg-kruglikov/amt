import Link from "next/link";
import { site } from "@/lib/site";

const nav = [
  { href: "/", label: "Главная" },
  { href: "/services", label: "Услуги" },
  { href: "/contacts", label: "Контакты" },
] as const;

/** Временный знак в шапке; после готовности логотипа от дизайнера замени на <Image src="/images/logo/..." /> */
function BrandMark() {
  const letters = site.name.slice(0, 3).toUpperCase();
  return (
    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-gold/45 bg-brand-gold/10 text-[0.65rem] font-bold tracking-[0.08em] text-brand-gold"
      aria-hidden
    >
      {letters}
    </span>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-brand-silver/15 bg-brand-obsidian/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:px-6 md:h-16 md:flex-row md:items-center md:justify-between md:gap-6 md:py-0">
        <div className="flex items-center justify-between gap-4 md:justify-start">
          <Link
            href="/"
            className="flex items-center gap-3 text-brand-white transition-colors hover:text-brand-gold"
          >
            <BrandMark />
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-wide">{site.name}</span>
              <span className="text-xs text-brand-silver">{site.city}</span>
            </span>
          </Link>
          <a
            href={`tel:${site.phoneTel}`}
            className="rounded-full border border-brand-gold/50 bg-brand-gold/10 px-3 py-1.5 text-xs font-medium text-brand-gold transition-colors hover:border-brand-amber hover:bg-brand-amber/10 hover:text-brand-amber md:hidden"
          >
            Звонок
          </a>
        </div>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm font-medium md:flex-1 md:justify-center">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-brand-silver transition-colors hover:text-brand-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <a
          href={`tel:${site.phoneTel}`}
          className="hidden shrink-0 rounded-full border border-brand-gold/50 bg-brand-gold/10 px-4 py-2 text-sm font-medium text-brand-gold transition-colors hover:border-brand-amber hover:bg-brand-amber/10 hover:text-brand-amber md:inline-flex md:items-center md:justify-center"
        >
          {site.phoneDisplay}
        </a>
      </div>
    </header>
  );
}
