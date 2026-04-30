import { site } from "@/lib/site";

type YandexMapEmbedProps = {
  className?: string;
  /** Подпись для screen readers */
  title?: string;
};

/**
 * Виджет по карточке организации Яндекса (`oid`): на карте та же синяя метка
 * автосервиса и подпись «Ателье точной механики», что в приложении. Красный
 * `pt` рисовал бы произвольную точку и мог не совпадать с зданием.
 */
export function YandexMapEmbed({
  className = "",
  title = `${site.tagline} — ${site.addressLine}, ${site.city}`,
}: YandexMapEmbedProps) {
  const { id, lon, lat, zoom } = site.yandexMapsOrg;
  const ll = `${lon},${lat}`;
  const params = new URLSearchParams({
    ll,
    z: String(zoom),
    l: "map",
    oid: id,
  });
  const src = `https://yandex.ru/map-widget/v1/?${params.toString()}`;

  return (
    <iframe
      title={title}
      src={src}
      className={`h-full min-h-[240px] w-full rounded-2xl border border-brand-silver/15 bg-black/40 ${className}`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  );
}
