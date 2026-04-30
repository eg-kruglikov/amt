import { site } from "@/lib/site";

export type Brand = {
  slug: string;
  /** Короткое имя для заголовков (латиница/официальное написание) */
  label: string;
  /** Русское название в тексте */
  titleRu: string;
  summary: string;
  /** Типовые модели — для внутреннего SEO-текста и будущих посадочных */
  models: string[];
  body: string[];
};

export const brands: Brand[] = [
  {
    slug: "volkswagen",
    label: "Volkswagen",
    titleRu: "Фольксваген",
    summary: `ТО, диагностика и ремонт Volkswagen в ${site.city}: от поло и гольфа до тигуана, туарега и транспортера — по согласованной смете.`,
    models: [
      "Polo",
      "Golf",
      "Jetta",
      "Passat",
      "Tiguan",
      "Touran",
      "Touareg",
      "Caddy",
      "Transporter",
    ],
    body: [
      "Отдельный раздел под владельцев VW: регламентное обслуживание, типовые работы по двигателю и ГРМ, подвеске, сцеплению и трансмиссии — в логике профильного VAG-сервиса.",
      "Посадочные: Tiguan, Polo, Golf, Jetta, Passat, Touran, Touareg, Caddy, Transporter; остальные модели — при записи.",
    ],
  },
  {
    slug: "audi",
    label: "Audi",
    titleRu: "Ауди",
    summary: `Сервис и ремонт Audi в ${site.city}: A3, A4, A5, A6, Q3, Q5, Q7, TT — диагностика перед ремонтом и понятные этапы работ.`,
    models: ["A3", "A4", "A5", "A6", "Q3", "Q5", "Q7", "TT"],
    body: [
      "Для Audi важны корректная диагностика и соблюдение допусков по жидкостям и узлам. Здесь удобно собрать переходы на ТО, двигатель, ГРМ и электронику.",
      "Посадочные: A3, A4, A5, A6, Q3, Q5, Q7, TT; остальные модели — при записи.",
    ],
  },
  {
    slug: "skoda",
    label: "Škoda",
    titleRu: "Шкода",
    summary: `Ремонт и обслуживание Škoda в ${site.city}: Octavia, Rapid, Kodiaq, Karoq, Yeti и другие — от ТО до ходовой и ДСГ.`,
    models: ["Octavia", "Rapid", "Kodiaq", "Karoq", "Fabia", "Yeti", "Superb"],
    body: [
      "Škoda в профильном сервисе часто пересекается с платформами VW и Audi: единый подход к диагностике и запчастям упрощает согласование работ.",
      "Посадочные страницы: Octavia, Rapid, Fabia, Karoq, Kodiaq, Superb, Yeti; по другим моделям поможем при записи.",
    ],
  },
  {
    slug: "porsche",
    label: "Porsche",
    titleRu: "Порше",
    summary: `Сервис и ремонт Porsche в ${site.city}: Cayenne, Macan, Panamera, 911, спорткары 718 — ТО, диагностика, трансмиссия и подвеска по согласованной смете.`,
    models: [
      "Cayenne",
      "Macan",
      "Panamera",
      "911",
      "718 Cayman",
      "718 Boxster",
      "Taycan",
    ],
    body: [
      "Porsche требует соблюдения допусков по маслам, тормозной жидкости и трансмиссии (в т.ч. PDK), аккуратной диагностики перед крупным ремонтом и понятного плана работ.",
      "Посадочные: Cayenne, Macan, Panamera, 911, Cayman, Boxster, Taycan; по редким модификациям и дооснащению уточняйте при записи.",
    ],
  },
  {
    slug: "seat",
    label: "SEAT",
    titleRu: "Сеат",
    summary: `Ремонт и ТО SEAT в ${site.city}: Leon, Ibiza, Ateca и другие модели VAG-платформ — ДСГ, ГРМ, подвеска, диагностика.`,
    models: ["Leon", "Ibiza", "Ateca", "Arona", "Tarraco", "Alhambra"],
    body: [
      "SEAT в независимом VAG-сервисе обслуживается по тем же принципам, что Volkswagen и Škoda: допуски по маслам, корректная работа с DSG и цепным ГРМ на турбо, прозрачная смета.",
      "Модельные посадочные для SEAT появятся по мере запроса; базовый вход — эта страница и раздел «ТО и обслуживание SEAT», общие услуги и запись.",
    ],
  },
];

export function getBrandBySlug(slug: string) {
  return brands.find((b) => b.slug === slug);
}
