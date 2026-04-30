import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Пользовательское соглашение",
  description: `Условия использования сайта ${site.name}.`,
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <PageIntro
        eyebrow={site.name}
        title="Пользовательское соглашение"
        description="Общие условия использования информации на сайте. Текст можно уточнить с юристом под ваши процессы."
      />
      <div className="mt-12 space-y-6 text-sm leading-relaxed text-brand-silver">
        <p>
          Материалы на сайте носят информационный характер. Сведения об услугах,
          сроках и стоимости уточняйте в {site.name} перед записью — итоговая смета
          формируется после осмотра и диагностики.
        </p>
        <p>
          Используя сайт, вы соглашаетесь с тем, что технические сбои и устаревание
          отдельных формулировок возможны; актуальные условия подтверждаются при
          обращении в сервис.
        </p>
        <p>
          Контакты:{" "}
          <a
            href={`tel:${site.phoneTel}`}
            className="font-medium text-brand-gold hover:text-brand-amber"
          >
            {site.phoneDisplay}
          </a>
          , {site.city}, {site.region}.
        </p>
      </div>
    </div>
  );
}
