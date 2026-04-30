type Faq = { question: string; answer: string };

type ServiceFaqJsonLdProps = {
  faqs: Faq[];
};

/** Schema.org FAQPage для услуги. */
export function ServiceFaqJsonLd({ faqs }: ServiceFaqJsonLdProps) {
  if (!faqs.length) return null;
  const json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
