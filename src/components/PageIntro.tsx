type PageIntroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <div className="mx-auto max-w-3xl space-y-4 text-center">
      {eyebrow ? (
        <p className="text-sm tracking-[0.2em] text-brand-silver uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="text-3xl font-semibold tracking-tight text-brand-white sm:text-4xl md:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="text-lg leading-relaxed text-brand-silver">{description}</p>
      ) : null}
    </div>
  );
}
