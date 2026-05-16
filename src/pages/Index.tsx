import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import LandingShell from '@/components/LandingShell';

const Divider = () => (
  <div className="l-divider">
    <div className="l-div-line" />
    <div className="l-div-dot" />
    <div className="l-div-line" />
  </div>
);

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate('/member', { replace: true });
  }, [user, navigate]);

  if (user) return null;

  return (
    <LandingShell withHeader={false}>

      {/* HERO */}
      <section className="l-hero" style={{ paddingTop: '2rem' }}>
        <div data-reveal>
          <span className="l-label" style={{ marginBottom: '2rem', display: 'block' }}>системный протокол · 2026</span>
          <h1 className="l-logo">oazyse°</h1>
        </div>
        <p className="l-hero-sub" data-reveal data-delay="1">архитектура нового сознания.</p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }} data-reveal data-delay="2">
          <button className="l-btn" onClick={() => navigate('/auth')}>войти в оазис</button>
          <button className="l-btn-ghost" onClick={() => navigate('/quiz')}>пройти анализ →</button>
        </div>
        <div className="l-hero-line" style={{ marginTop: '5rem' }} data-reveal data-delay="3" />
        <p className="l-hero-tag">институт сознания космического разума.</p>
      </section>

      {/* NAV */}
      <nav className="l-nav">
        {[
          { to: '/method', label: 'метод' },
          { to: '/philosophy', label: 'философия' },
          { to: '/institute', label: 'институт' },
          { to: '/projects', label: 'проекты' },
          { to: '/about', label: 'о создателе' },
          { to: '/join', label: 'войти' },
        ].map(({ to, label }) => (
          <Link key={to} to={to} className="l-nav-link">{label}</Link>
        ))}
      </nav>

      {/* 01 · ЧТО ТАКОЕ ОАЗИС */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 01 ] — что такое оазис</span>
        <h2 className="l-title" data-reveal data-delay="1">самый большой проект<br />который может придумать человек.</h2>
        <p className="l-text" data-reveal data-delay="2">
          не компания. не движение. не религия.<br />
          это пространство где встречаются те кто выбрал жить из полноты.
        </p>
        <p className="l-text" data-reveal data-delay="3">
          мы существуем в эпоху когда человечество впервые массово начинает задавать себе настоящие вопросы — кто я, зачем я здесь, что возможно на самом деле. миллионы людей на планете одновременно просыпаются к чему-то большему.
        </p>
        <p className="l-text" data-reveal data-delay="4">
          каждый человек который становится свободнее изнутри — создаёт оазис вокруг себя. в семье. в окружении. в пространстве где он живёт. так один человек меняет мир. не метафора — механизм.
        </p>
      </section>

      {/* 02 · ТРИ ПУТИ */}
      <Divider />
      <section className="l-section-wide">
        <span className="l-label" data-reveal style={{ textAlign: 'center', display: 'block' }}>[ 02 ] — три пути в оазис</span>
        <h2 className="l-title" data-reveal data-delay="1" style={{ textAlign: 'center' }}>у каждого своя причина.</h2>
        <div className="l-three-grid" data-reveal data-delay="2">
          <div className="l-card-hover">
            <span className="l-mono" style={{ display: 'block', marginBottom: '1rem' }}>если ты знаешь что<br />что-то хочешь изменить</span>
            <p className="l-text" style={{ marginBottom: 0 }}>
              внутри есть что-то — страх, блок, паттерн. ты пробовал. ненадолго помогало. или не помогало совсем. мы войдём туда вместе.
            </p>
          </div>
          <div className="l-card-hover">
            <span className="l-mono" style={{ display: 'block', marginBottom: '1rem' }}>если у тебя<br />всё хорошо</span>
            <p className="l-text" style={{ marginBottom: 0 }}>
              а что если хорошо — это ещё не всё? то состояние в котором ты сейчас — это даже не половина того на что ты способен.
            </p>
          </div>
          <div className="l-card-hover">
            <span className="l-mono" style={{ display: 'block', marginBottom: '1rem' }}>если ты<br />уже там</span>
            <p className="l-text" style={{ marginBottom: 0 }}>
              если ты силён, свободен, созидателен — у нас есть для тебя самая большая задача. помоги другим дойти.
            </p>
          </div>
        </div>
      </section>

      {/* 03 · МЕТАСИНХРОНИКА */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 03 ] — технология</span>
        <h2 className="l-title" data-reveal data-delay="1">метасинхроника</h2>
        <div className="l-card" data-reveal data-delay="2">
          <p className="l-text">
            представь состояние — глубокое, спокойное, абсолютно безопасное. ты полностью присутствуешь. ты можешь выйти из него в любой момент.
          </p>
          <p className="l-text">
            именно в этом состоянии происходит настоящее изменение. потому что всё что ты переживаешь в жизни — рождается в сознании. не снаружи. изнутри.
          </p>
          <p className="l-text">
            есть программное изменение. а есть аппаратное.<br />
            метасинхроника — это аппаратное изменение.
          </p>
          <p className="l-mono" style={{ marginTop: '1.5rem' }}>
            один сеанс. &nbsp;·&nbsp; полтора часа. &nbsp;·&nbsp; гарантия или возврат.
          </p>
        </div>
        <div style={{ marginTop: '2rem', textAlign: 'center' }} data-reveal data-delay="3">
          <Link to="/method" className="l-btn-ghost">узнать подробнее →</Link>
        </div>
      </section>

      {/* 04 · ЛИНЕЙКА */}
      <Divider />
      <section className="l-section-wide">
        <span className="l-label" data-reveal style={{ textAlign: 'center', display: 'block' }}>[ 04 ] — с чего начать</span>
        <h2 className="l-title" data-reveal data-delay="1" style={{ textAlign: 'center' }}>выбери свой путь.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', background: 'hsl(var(--border))' }} data-reveal data-delay="2">
          <div className="l-price-card">
            <span className="l-price-amount">$10<span style={{ fontSize: '0.65rem', letterSpacing: '0.1em', opacity: 0.7 }}>/мес</span></span>
            <p className="l-price-desc">вступить в оазис. сообщество, метод бесплатно внутри, доступ к институту. статус основателя для первых.</p>
          </div>
          <div className="l-price-card">
            <span className="l-price-amount">$150</span>
            <p className="l-price-desc">ранний доступ AI метасинхроника. только 15 мест. первые в мире. прямая связь с Adizele.</p>
          </div>
          <div className="l-price-card">
            <span className="l-price-amount">$500</span>
            <p className="l-price-desc">сеанс с Adizele. один запрос. один-три сеанса до результата. гарантия или возврат.</p>
          </div>
          <div className="l-price-card">
            <span className="l-price-amount">$100k</span>
            <p className="l-price-desc">личная работа один на один. для тех кто строит большое и хочет делать это из правильного состояния.</p>
          </div>
        </div>
      </section>

      {/* 05 · РИТУАЛ ВХОДА */}
      <Divider />
      <div className="l-cta">
        <span className="l-label" data-reveal>[ 05 ] — ритуал входа</span>
        <p className="l-text" data-reveal data-delay="1" style={{ marginBottom: '1rem' }}>
          ты дочитал до этого места.
        </p>
        <p className="l-text" data-reveal data-delay="2" style={{ marginBottom: '1rem' }}>
          это не случайно.
        </p>
        <p className="l-text" data-reveal data-delay="3" style={{ marginBottom: '3rem' }}>
          один шаг. и ты уже не там где был.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }} data-reveal data-delay="4">
          <button className="l-btn" onClick={() => navigate('/auth')}>войти в оазис</button>
          <Link to="/join" className="l-btn-ghost">узнать больше →</Link>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="l-footer">
        <p className="l-footer-text">
          oazyse° &nbsp;·&nbsp; институт сознания космического разума &nbsp;·&nbsp; метафрактализм
        </p>
      </footer>

    </LandingShell>
  );
};

export default Index;
