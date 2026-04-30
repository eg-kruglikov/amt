import { getBaseUrl } from "@/lib/baseUrl";
import { site } from "@/lib/site";

/** Schema.org: автосервис + локальная точка (для Яндекса и Google). */
export function LocalBusinessJsonLd() {
  const baseUrl = getBaseUrl();
  const json = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: `${site.name} — ${site.tagline}`,
    description: `Сервис ${site.vagBrands}: ТО, диагностика, ремонт в ${site.city}.`,
    url: baseUrl,
    telephone: site.phoneTel,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.region,
      streetAddress: site.addressLine,
      addressCountry: "RU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.yandexMapsOrg.lat,
      longitude: site.yandexMapsOrg.lon,
    },
    sameAs: [site.yandexMapsOrg.pageUrl],
    areaServed: {
      "@type": "AdministrativeArea",
      name: site.region,
    },
    priceRange: "$$",
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
