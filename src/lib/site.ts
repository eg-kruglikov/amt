export const site = {
  /** Короткое имя бренда */
  name: "АТМ",
  /** Полное название */
  tagline: "Ателье точной механики",
  city: "Мытищи",
  region: "Московская область",
  /** Основные марки в текстах и SEO (в т.ч. Porsche в составе профиля сервиса) */
  vagBrands: "Volkswagen, Audi, Škoda, SEAT, Porsche",
  addressLine: "1-й Стрелковый переулок, 62",
  phoneDisplay: "+7 (938) 477-87-22",
  phoneTel: "+79384778722",
  /**
   * Логотип в шапке: положите файл в `public/` и укажите путь от корня сайта.
   * Примеры: `/images/logo/logo.svg`, `/images/logo/logo.webp`, `/images/logo/logo.png`
   */
  logoSrc: "/images/logo/logo.svg",
  /** Режим работы — подставьте фактические часы */
  workHoursLine: "Пн–Вс · по предварительной записи",
  /**
   * Карточка организации в Яндекс.Картах (встраивание виджета + прямая ссылка).
   * https://yandex.ru/maps/org/…/ID/
   */
  yandexMapsOrg: {
    id: "206031433429",
    lon: 37.772145,
    lat: 55.944004,
    /** Масштаб: ближе — проще совпасть с меткой карточки на здании */
    zoom: 18,
    pageUrl:
      "https://yandex.ru/maps/org/atelye_tochnoy_mekhaniki/206031433429/?ll=37.772145%2C55.944004&z=18",
  },
} as const;
