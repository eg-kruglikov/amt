import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Цены и ориентиры",
  description: `Ориентиры по стоимости работ ${site.name} в ${site.city}: ТО, диагностика, VAG. Точная смета — после осмотра или диагностики.`,
};

const rows: {
  area: string;
  logic: string;
  href: string;
  linkLabel: string;
}[] = [
  {
    area: "Техобслуживание (ТО)",
    logic: "Перечень по регламенту, расходники с допусками; фиксируем до старта.",
    href: "/services/to",
    linkLabel: "ТО",
  },
  {
    area: "Диагностика",
    logic:
      "Мотор, электрика, ходовая, КПП и привод — перечень и глубина по симптомам; расширение согласуем до работ.",
    href: "/services/diagnostika",
    linkLabel: "Диагностика",
  },
  {
    area: "Эндоскопия двигателя",
    logic: "Точечно по согласованию; дополняет сканер, не заменяет компрессию там, где она нужна.",
    href: "/services/endoskopiya-dvigatelya",
    linkLabel: "Эндоскопия",
  },
  {
    area: "Диагностика ходовой",
    logic: "Подъёмник и согласованный тест-драйв; фокус на подвеске и рулевом.",
    href: "/services/diagnostika-podveski",
    linkLabel: "Ходовая",
  },
  {
    area: "Диагностика электрики",
    logic: "Коды, питание, запуск и зарядка; глубина по симптомам.",
    href: "/services/diagnostika-elektrooborudovaniya",
    linkLabel: "Электрика",
  },
  {
    area: "Диагностика КПП / трансмиссии",
    logic: "Тип коробки и ошибки до заливки; DSG, АКПП, МКПП, PDK — по модели.",
    href: "/services/diagnostika-kpp",
    linkLabel: "КПП",
  },
  {
    area: "АКПП, ДСГ, робот",
    logic: "После идентификации коробки и считывания ошибок; без «цены в ватсап».",
    href: "/services/akpp-dsg",
    linkLabel: "Трансмиссия",
  },
  {
    area: "Замена масла в ДСГ",
    logic: "Допуск и процедура по модификации; частичная или полная — по согласованию.",
    href: "/services/dsg-zamena-masla",
    linkLabel: "Масло ДСГ",
  },
  {
    area: "Сцепление ДСГ",
    logic: "Смета после осмотра и диагностики; разные сценарии для «сухого»/«мокрого» типа.",
    href: "/services/dsg-sceplenie",
    linkLabel: "Сцепление ДСГ",
  },
  {
    area: "ГУР",
    logic: "Сначала причина (насос, рейка, магистрали), затем заказ узлов.",
    href: "/services/gur-zamena",
    linkLabel: "ГУР",
  },
  {
    area: "Подвеска, двигатель, ГРМ",
    logic: "Зависит от состояния узлов и выбора запчастей; оценка на подъёмнике.",
    href: "/services",
    linkLabel: "Все услуги",
  },
];

export default function PricesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <PageIntro
        eyebrow={site.name}
        title="Цены и ориентиры"
        description={`Мы фиксируем стоимость после согласования объёма работ. Ниже — как считается типовой ремонт ${site.vagBrands} в ${site.city}, без фиктивных цифр «от и до» по телефону.`}
      />
      <div className="mt-10 space-y-6 text-base leading-relaxed text-brand-silver">
        <p>
          Итоговая сумма зависит от состояния автомобиля, выбора оригинальных или проверенных аналогов и перечня работ по регламенту. Для VAG-коробок и узлов с жёсткими допусками (ДСГ, мотор, охлаждение, ГУР) корректная смета возможна после осмотра или диагностики — это честно по отношению к результату.
        </p>

        <div className="overflow-hidden rounded-2xl border border-brand-silver/15">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-brand-silver/15 bg-black/30">
                <th className="px-4 py-3 font-semibold text-brand-white">
                  Направление
                </th>
                <th className="hidden px-4 py-3 font-semibold text-brand-white sm:table-cell">
                  Как оцениваем
                </th>
                <th className="px-4 py-3 font-semibold text-brand-white">Страница</th>
              </tr>
            </thead>
            <tbody className="text-brand-silver">
              {rows.map((row) => (
                <tr
                  key={row.href + row.area}
                  className="border-b border-brand-silver/10 last:border-0"
                >
                  <td className="px-4 py-3 align-top font-medium text-brand-white/95">
                    {row.area}
                    <p className="mt-1 font-normal text-brand-silver sm:hidden">
                      {row.logic}
                    </p>
                  </td>
                  <td className="hidden px-4 py-3 align-top sm:table-cell">{row.logic}</td>
                  <td className="px-4 py-3 align-top">
                    <Link
                      href={row.href}
                      className="font-medium text-brand-gold hover:text-brand-amber"
                    >
                      {row.linkLabel} →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>
          Чтобы получить цифры под вашу модель, позвоните или загляните на{" "}
          <Link href="/contacts" className="font-medium text-brand-gold hover:text-brand-amber">
            контакты
          </Link>
          : подскажем ближайшее окно и перечень данных по автомобилю (пробег, VIN при необходимости, симптомы).
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <Link
            href="/services"
            className="inline-flex rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-black hover:bg-brand-amber"
          >
            К услугам
          </Link>
          <a
            href={`tel:${site.phoneTel}`}
            className="inline-flex rounded-full border border-brand-silver/35 px-6 py-3 text-sm font-semibold text-brand-white hover:border-brand-gold hover:text-brand-gold"
          >
            {site.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
}
