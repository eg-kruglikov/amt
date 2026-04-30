import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description: `Политика обработки персональных данных ${site.name} (${site.city}).`,
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <PageIntro
        eyebrow={site.name}
        title="Политика конфиденциальности"
        description="Краткие положения об обработке данных посетителей сайта и клиентов. При необходимости замените текст на юридически согласованный вариант."
      />
      <div className="mt-12 space-y-6 text-sm leading-relaxed text-brand-silver">
        <p>
          Настоящая страница описывает общий подход {site.name} ({site.tagline}) к
          персональным данным, которые вы можете передать при записи, звонке или
          обращении через формы на сайте (если такие появятся).
        </p>
        <p>
          Оператор обрабатывает данные в целях обработки заявок, обратной связи и
          исполнения договора на оказание услуг. Сроки и состав данных определяются
          фактом обращения и применимым законодательством Российской Федерации.
        </p>
        <p>
          По вопросам, связанным с персональными данными, вы можете связаться с
          нами по телефону{" "}
          <a
            href={`tel:${site.phoneTel}`}
            className="font-medium text-brand-gold hover:text-brand-amber"
          >
            {site.phoneDisplay}
          </a>{" "}
          или через раздел «Контакты».
        </p>
      </div>
    </div>
  );
}
