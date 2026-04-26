import { Link } from 'react-router-dom';

const MemberHome = () => {
  return (
    <div className="min-h-[70vh] animate-fade-in">
      <div className="max-w-3xl space-y-8">
        <div className="space-y-4">
          <p className="label text-neon-purple">точка входа открыта</p>
          <h1 className="title">ты внутри oazyse°.</h1>
          <p className="body max-w-xl">
            Сайт никуда не исчезает: это и есть твоё пространство внутри oazyse°. Здесь будут собираться профиль, твои сессии и следующие шаги, а пока лучший ход — держать живую связь с движением через Telegram.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.2fr,0.8fr]">
          <div className="rounded-[28px] border border-border/70 p-6">
            <p className="label text-neon-green">сейчас главное</p>
            <h2 className="text-2xl font-light text-foreground">остаться рядом с потоком oazyse°.</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Мы уже знаем, что ты вошёл в пространство. Дальше здесь будут появляться твои личные сессии, состояние входа и живая связка сайта с ботом. Пока это собирается, держи открытым основной канал связи.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                to="/member/sessions"
                className="inline-flex items-center rounded-full border border-neon-purple/30 bg-gradient-to-r from-neon-purple/12 to-neon-green/10 px-4 py-2 text-[0.68rem] uppercase tracking-[0.18em] text-foreground transition-colors hover:border-neon-purple/50"
              >
                открыть мои сессии
              </Link>
              <Link
                to="/member/profile"
                className="inline-flex items-center rounded-full border border-border/70 px-4 py-2 text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
              >
                открыть профиль
              </Link>
            </div>
          </div>

          <div className="rounded-[28px] border border-border/70 p-6">
            <p className="label text-neon-purple">что дальше</p>
            <div className="space-y-3 text-sm leading-7 text-muted-foreground">
              <p>здесь появится мягкая связка с ботом и личными уведомлениями.</p>
              <p>здесь же будут жить твои переходы в живой контакт, без выхода из сайта.</p>
              <p>пространство будет расти, а не заменяться другим интерфейсом.</p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <a
            href="https://t.me/oazysebot"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-border/70 rounded-2xl p-5 text-sm text-foreground hover:border-neon-purple/40 transition-colors"
          >
            бот
            <span className="block mt-2 text-xs leading-relaxed text-muted-foreground">открыть @oazysebot и держать прямую связь с пространством</span>
          </a>
          <a
            href="https://t.me/metafractalism"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-border/70 rounded-2xl p-5 text-sm text-foreground hover:border-neon-green/40 transition-colors"
          >
            канал
            <span className="block mt-2 text-xs leading-relaxed text-muted-foreground">следить за хроникой, текстами и тем, как oazyse° раскрывается дальше</span>
          </a>
          <a
            href="https://t.me/adizele"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-border/70 rounded-2xl p-5 text-sm text-foreground hover:border-neon-purple/40 transition-colors"
          >
            adizele
            <span className="block mt-2 text-xs leading-relaxed text-muted-foreground">написать лично и держать прямую связь</span>
          </a>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <Link
            to="/"
            className="border border-border/70 rounded-2xl p-5 text-sm text-foreground hover:border-neon-purple/40 transition-colors"
          >
            главная
            <span className="block mt-2 text-xs leading-relaxed text-muted-foreground">вернуться к манифесту оазиса</span>
          </Link>
          <Link
            to="/news"
            className="border border-border/70 rounded-2xl p-5 text-sm text-foreground hover:border-neon-green/40 transition-colors"
          >
            лента
            <span className="block mt-2 text-xs leading-relaxed text-muted-foreground">следить за развитием проекта</span>
          </Link>
          <Link
            to="/session"
            className="border border-border/70 rounded-2xl p-5 text-sm text-foreground hover:border-neon-purple/40 transition-colors"
          >
            метод
            <span className="block mt-2 text-xs leading-relaxed text-muted-foreground">снова посмотреть, как наш метод работает с подсознанием</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MemberHome;
