import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import LandingShell, { Divider } from '@/components/LandingShell';
import bookCoverRu from '@/assets/book-cover-ru.png';
import bookCoverEn from '@/assets/book-cover-en.png';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { i18n } = useTranslation();
  const bookCover = i18n.language === 'ru' ? bookCoverRu : bookCoverEn;

  return (
    <LandingShell>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="l-hero" style={{ paddingTop: '8rem' }}>
        <div data-reveal>
          <p
            className="l-mono"
            style={{ marginBottom: '2rem', color: 'hsl(var(--muted-foreground)/0.4)', textAlign: 'center' }}
          >
            институт сознания космического разума открывает миру
          </p>
          <h1 className="l-logo">oazyse°</h1>
        </div>
        <p className="l-hero-sub" data-reveal data-delay="1">пространство, где человек становится ближе к себе.</p>
        <div data-reveal data-delay="2">
          <button className="l-btn" onClick={() => navigate(user ? '/member' : '/auth')}>{user ? 'открыть профиль' : 'открыть oazyse'}</button>
        </div>
        <div className="l-hero-line" style={{ marginTop: '5rem' }} data-reveal data-delay="3" />
        <p className="l-hero-tag">один человек. одно решение. другая жизнь.</p>
      </section>

      {/* ── STRIP ────────────────────────────────────────── */}
      <div style={{
        borderTop: '1px solid hsl(var(--border))',
        borderBottom: '1px solid hsl(var(--border))',
        padding: '0.875rem 2rem',
        display: 'flex',
        justifyContent: 'center',
        gap: '2.5rem',
        flexWrap: 'wrap',
        position: 'relative',
        zIndex: 2,
      }}>
        {['свобода изнутри', 'метасинхроника', 'институт', 'живая система', 'антихрупкая среда', 'метафрактализм'].map((phrase) => (
          <span key={phrase} className="l-label" style={{ marginBottom: 0, opacity: 0.35 }}>{phrase}</span>
        ))}
      </div>

      {/* ── 01 · ЧТО ТАКОЕ ОАЗИС ────────────────────────── */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 01 ] — что такое оазис</span>
        <h2 className="l-title" data-reveal data-delay="1">самый большой проект<br />который может придумать человек.</h2>
        <p className="l-text" data-reveal data-delay="2">
          это пространство для людей, которые хотят жить не из страха и не из автоматизма.<br />
          для тех, кто хочет создавать вокруг себя больше жизни, ясности и смысла.
        </p>
        <p className="l-text" data-reveal data-delay="3">
          мы живём в момент, когда всё больше людей задают себе настоящие вопросы. кто я. зачем я здесь. как жить по-настоящему. что в этой жизни вообще возможно.
        </p>
        <p className="l-text" data-reveal data-delay="4">
          когда человек становится свободнее внутри, это сразу меняет среду вокруг него. дом. отношения. работу. круг людей. так один человек меняет мир. не как красивая мысль, а как реальный механизм.
        </p>
        <p className="l-text" data-reveal data-delay="4">
          оазис растёт не за счёт шума. он растёт потому, что живое состояние узнаётся. человек проходит путь сам, и после этого рядом с ним начинают меняться другие.
        </p>
        <div className="l-card" data-reveal data-delay="4" style={{ marginTop: '2.5rem' }}>
          <p className="l-mono">оазис держится на простом человеческом желании: быть свободным, жить по-настоящему и находить своих.</p>
        </div>
      </section>

      {/* ── 02 · ПОЧЕМУ СЕЙЧАС ──────────────────────────── */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 02 ] — почему именно сейчас</span>
        <h2 className="l-title" data-reveal data-delay="1">не сто лет назад.<br />не через пятьдесят.<br />именно сейчас.</h2>
        <p className="l-text" data-reveal data-delay="2">
          потому что впервые в истории совпали сразу две вещи. технологии позволяют дотянуться почти до любого человека. и сами люди стали сильнее чувствовать, что старые ответы больше не работают.
        </p>
        <p className="l-text" data-reveal data-delay="3">
          раньше главный вопрос был: как выжить. сейчас всё чаще встаёт другой: как жить. мир меняется быстро. старые системы трещат. прежний способ думать уже не даёт человеку опоры.
        </p>
        <p className="l-text" data-reveal data-delay="4">
          поэтому оазис появился именно сейчас. сейчас он нужен. и сейчас он возможен.
        </p>
        <div className="l-card" data-reveal data-delay="4" style={{ marginTop: '2rem' }}>
          <p className="l-mono">у каждой большой идеи есть своё время. время oazyse пришло сейчас.</p>
        </div>
      </section>

      {/* ── 03 · КНИГА ─────────────────────────────────────── */}
      <Divider />
      <section className="l-section-wide">
        <span className="l-label" data-reveal style={{ textAlign: 'center', display: 'block' }}>[ 03 ] — первый материальный объект</span>
        <div
          data-reveal
          data-delay="1"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 0.78fr) minmax(0, 1.22fr)',
            gap: '2.5rem',
            alignItems: 'center',
          }}
          className="l-book-grid"
        >
          <div style={{ justifySelf: 'center', maxWidth: '220px' }}>
            <div style={{
              border: '1px solid hsl(var(--border)/0.7)',
              padding: '0.75rem',
              borderRadius: '22px',
              background: 'linear-gradient(180deg, hsl(var(--background)/0.9), hsl(var(--card)/0.7))',
              boxShadow: '0 22px 70px hsl(var(--neon-purple)/0.10)',
            }}>
              <img src={bookCover} alt="Искусство вознесения" style={{ width: '100%', borderRadius: '14px', border: '1px solid hsl(var(--border)/0.6)' }} />
            </div>
          </div>
          <div>
            <h2 className="l-title" style={{ marginBottom: '1.5rem' }}>«искусство вознесения» — книга оазиса.</h2>
            <p className="l-text">
              не каждый человек хочет сразу идти в сессию или глубоко погружаться в сайт. иногда первый вход мягче: открыть книгу, почувствовать язык, понять, почему оазис вообще появился.
            </p>
            <p className="l-text">
              книга здесь не как приложение к проекту. это отдельный материальный след oazyse. через неё человек может спокойно войти в этот мир в своём темпе.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '2rem' }}>
              <Link to="/news" className="l-btn">читать хронику</Link>
              <Link to="/about" className="l-btn-ghost">к создателю →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 04 · ОАЗИС НЕ СОЗДАЮТ ─────────────────────── */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 04 ] — оазис не создают</span>
        <h2 className="l-title" data-reveal data-delay="1">его вспоминают.</h2>
        <p className="l-text" data-reveal data-delay="2">
          почти каждый человек хотя бы раз это чувствовал.
        </p>
        <div className="l-breath" data-reveal data-delay="3">
          {[
            'встречу после которой внутри стало тише.',
            'человека рядом с которым стало свободнее.',
            'пространство в котором не хотелось играть роль.',
            'момент когда жизнь вдруг переставала казаться пластмассовой.',
          ].map((line) => (
            <p key={line} className="l-breath-line">{line}</p>
          ))}
        </div>
        <p className="l-text" data-reveal data-delay="4" style={{ marginTop: '2rem' }}>
          это и есть оазис.
        </p>
        <p className="l-text" data-reveal data-delay="4">
          не как слово и не как красивая концепция.
        </p>
        <p className="l-text" data-reveal data-delay="4">
          а как состояние, в котором человек снова становится ближе к себе.
        </p>
        <p className="l-text" data-reveal data-delay="4">
          поэтому оазис не нужно выдумывать. его нужно узнать, вспомнить и дать ему форму в жизни.
        </p>
      </section>

      {/* ── 05 · ВОЛНА ─────────────── */}
      <Divider />
      <section className="l-section-wide">
        <span className="l-label" data-reveal style={{ textAlign: 'center', display: 'block' }}>[ 05 ] — как один человек меняет среду</span>
        <h2 className="l-title" data-reveal data-delay="1" style={{ textAlign: 'center' }}>всё начинается<br />с одного человека.</h2>
        <p className="l-text" data-reveal data-delay="2" style={{ textAlign: 'center', maxWidth: '46rem', margin: '0 auto 3rem' }}>
          не нужен большой жест. достаточно увидеть, как меняется жизнь вокруг человека, когда внутри становится больше тишины и ясности.
        </p>
        <div className="l-wave" data-reveal data-delay="3">
          {[
            ['01', 'человек', 'внутри становится тише. человек меньше живёт реакцией и больше живёт собой.'],
            ['02', 'дом', 'рядом с ним становится спокойнее. в доме появляется больше тепла, честности и опоры.'],
            ['03', 'круг', 'вокруг начинают собираться люди, рядом с которыми жизнь становится сильнее.'],
            ['04', 'дело', 'работа перестаёт быть одной только борьбой и становится формой живого вклада.'],
            ['05', 'мир', 'когда таких людей становится много, между ними рождается новая среда. это и есть оазис.'],
          ].map(([num, title, text]) => (
            <div key={num} className="l-wave-row">
              <span className="l-wave-num">{num}</span>
              <span className="l-wave-title">{title}</span>
              <p className="l-wave-text">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 06 · ВСЁ ЭТО ПРИШЛО ИЗ ПУТИ ───────────────── */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 06 ] — откуда это пришло</span>
        <h2 className="l-title" data-reveal data-delay="1">всё это выросло<br />из реального пути.</h2>
        <p className="l-text" data-reveal data-delay="2">
          сначала был долгий поиск того, что на самом деле меняет человека. не на уровне настроения. не на уровне красивых слов. а глубже.
        </p>
        <p className="l-text" data-reveal data-delay="3">
          из этого пути вырос институт сознания космического разума. не как вывеска, а как место, где можно исследовать, проверять, наблюдать и собирать то, что действительно работает.
        </p>
        <p className="l-text" data-reveal data-delay="4">
          из этого же пути начали рождаться конкретные формы.
        </p>
        <div className="l-source-stream" data-reveal data-delay="4">
          {[
            ['метасинхроника', 'способ точной работы с глубинным состоянием человека.'],
            ['метафрактализм', 'язык, который помогает увидеть связь внутреннего и внешнего.'],
            ['будущий интеллект oazyse', 'форма, которая однажды сможет дать человеку доступ к этой глубине в любой точке мира.'],
          ].map(([title, desc]) => (
            <div key={title} className="l-source-item">
              <span className="l-source-title">{title}</span>
              <p className="l-source-text">{desc}</p>
            </div>
          ))}
        </div>
        <p className="l-text" data-reveal data-delay="4" style={{ marginTop: '2rem' }}>
          всё это не набор продуктов. это разные формы одной и той же задачи: помочь человеку стать живее, свободнее и ближе к себе.
        </p>
        <div style={{ marginTop: '2rem' }} data-reveal data-delay="4">
          <Link to="/institute" className="l-btn-ghost">об институте →</Link>
        </div>
      </section>

      {/* ── 07 · ЕСЛИ ТАКИЕ ЛЮДИ НАЧНУТ УЗНАВАТЬ ДРУГ ДРУГА ─ */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 07 ] — если такие люди начнут узнавать друг друга</span>
        <h2 className="l-title" data-reveal data-delay="1">тогда люди начнут<br />находить друг друга иначе.</h2>
        <p className="l-text" data-reveal data-delay="2">
          люди будут находить друг друга не только по профессии. не только по выгоде. не только по привычным ролям.
        </p>
        <p className="l-text" data-reveal data-delay="3">
          а по глубине. по внутреннему вектору. по тому, что они несут в мир.
        </p>
        <p className="l-text" data-reveal data-delay="4">
          тогда иначе будут собираться семьи, дружеские круги, команды, сообщества и города.
        </p>
        <p className="l-text" data-reveal data-delay="4">
          появится не просто сеть контактов. появится сеть живых оазисов.
        </p>
        <p className="l-text" data-reveal data-delay="4">
          и тогда оазис перестанет быть только идеей. он станет реальностью.
        </p>
      </section>

      {/* ── 08 · ВХОД ─────────────────────────────────── */}
      <Divider />
      <div className="l-cta">
        <span className="l-label" data-reveal>[ 08 ] — открыть oazyse</span>
        <p className="l-text" data-reveal data-delay="1" style={{ marginBottom: '1rem' }}>
          если ты это узнал, тебе не нужно долго объяснять дальше.
        </p>
        <p className="l-text" data-reveal data-delay="2" style={{ marginBottom: '3rem' }}>
          некоторые вещи человек понимает раньше, чем может точно назвать. иногда этого достаточно, чтобы сделать первый шаг.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }} data-reveal data-delay="3">
          <button className="l-btn" onClick={() => navigate('/auth')}>открыть oazyse</button>
          <Link to="/news" className="l-btn-ghost">читать ленту →</Link>
        </div>
      </div>

      {/* ── FOOTER GAP ────────────────────────────────── */}
      <Divider />

    </LandingShell>
  );
};

export default Index;
