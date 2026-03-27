export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-obsidian px-6 font-sans">
      <main className="w-full max-w-3xl rounded-3xl border border-brand-silver/25 bg-black/20 p-10 shadow-2xl backdrop-blur-sm md:p-14">
        <div className="space-y-6">
          <p className="text-sm tracking-[0.22em] text-brand-silver uppercase">
            Premium Website Base
          </p>
          <h1 className="text-4xl leading-tight font-semibold text-brand-white md:text-5xl">
            Темная тема с премиум акцентами готова.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-brand-silver">
            Палитра добавлена в глобальные стили. Используй золотой и янтарный
            только как акценты, чтобы дизайн выглядел дорого и чисто.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-4 text-sm font-medium">
          <a
            className="inline-flex items-center rounded-full bg-brand-gold px-5 py-2.5 text-black transition-colors hover:bg-brand-amber"
            href="#"
          >
            Главный акцент
          </a>
          <span className="inline-flex items-center rounded-full border border-brand-silver/40 px-5 py-2.5 text-brand-silver">
            Вторичный: Silver
          </span>
          <span className="inline-flex items-center rounded-full border border-brand-white/25 px-5 py-2.5 text-brand-white">
            Текст: Soft White
          </span>
        </div>
      </main>
    </div>
  );
}
