import { Link } from 'react-router-dom';
import LandingShell, { Divider } from '@/components/LandingShell';

const InstitutePage = () => {
  return (
    <LandingShell>
      <section className="l-section-wide" style={{ paddingTop: '6.25rem', paddingBottom: '2rem' }}>
        <div
          data-reveal
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
          }}
        >
          {[
            { to: '/institute', label: 'институт' },
            { to: '/method', label: 'метасинхроника' },
            { to: '/philosophy', label: 'метафрактализм' },
            { to: '/projects', label: 'проекты' },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="l-btn-ghost"
              style={{
                padding: '0.7rem 1rem',
                border: '1px solid hsl(var(--border)/0.75)',
                borderRadius: '999px',
                background: 'hsl(var(--background)/0.7)',
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      {/* HERO */}
      <section className="l-hero" style={{ minHeight: '54vh', paddingTop: '2rem' }}>
        <div data-reveal>
          <span className="l-label" style={{ marginBottom: '2rem', display: 'block' }}>откуда всё выросло</span>
          <h1 className="l-hero-title" style={{ fontSize: 'clamp(1.4rem, 4vw, 3rem)' }}>институт сознания<br />космического разума</h1>
        </div>
        <p className="l-hero-sub" data-reveal data-delay="1">место, из которого выросли язык, метод и направление oazyse.</p>
        <div className="l-hero-line" data-reveal data-delay="2" />
      </section>

      {/* 01 · О ИНСТИТУТЕ */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 01 ] — о институте</span>
        <h2 className="l-title" data-reveal data-delay="1">есть вопросы,<br />которые всегда возвращаются.</h2>
        <p className="l-text" data-reveal data-delay="2">
          не про рынок и не про эффективность. а про главное. как устроена реальность. что такое сознание. есть ли в человеке нечто большее, чем набор привычек, ролей и реакций.
        </p>
        <p className="l-text" data-reveal data-delay="3">
          институт сознания космического разума появился именно для этих вопросов.
        </p>
        <p className="l-text" data-reveal data-delay="4">
          космический разум здесь не догма. это название для направления поиска. попытка говорить о том, что больше привычного восприятия, но всё же может быть исследовано.
        </p>
        <div className="l-card" data-reveal data-delay="4" style={{ marginTop: '2rem' }}>
          <p className="l-text" style={{ marginBottom: '1rem' }}>
            это не мистика и не академическая наука в привычном виде.
          </p>
          <p className="l-mono">это исследование на стыке опыта, наблюдения, практики и языка.</p>
        </div>
      </section>

      {/* 02 · ИСТОРИЯ */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 02 ] — история</span>
        <h2 className="l-title" data-reveal data-delay="1">институт создал оазис.<br />потом оазис стал больше.</h2>
        <p className="l-text" data-reveal data-delay="2">
          институт изучает сознание, реальность и связь внутреннего состояния человека с его жизнью. через практику, наблюдение, технологии и живой опыт.
        </p>
        <p className="l-text" data-reveal data-delay="3">
          из этой работы вырос oazyse. и в какой-то момент стало ясно: проект стал больше своей первой формы. институт остался источником, но перестал быть пределом.
        </p>
        <div className="l-card" data-reveal data-delay="4" style={{ marginTop: '2rem' }}>
          <p className="l-mono">так бывает, когда идея перестаёт быть только идеей и становится средой.</p>
        </div>
      </section>

      {/* 03 · КАК ВОЙТИ */}
      <Divider />
      <div className="l-cta">
        <span className="l-label" data-reveal>[ 03 ] — следующий шаг</span>
        <p className="l-text" data-reveal data-delay="1" style={{ marginBottom: '1rem' }}>
          если тебе близок источник, дальше естественно идти в сам метод.
        </p>
        <p className="l-text" data-reveal data-delay="2" style={{ marginBottom: '3rem' }}>
          это путь для тех, кто хочет не только пользоваться метасинхроникой, но и понимать, откуда она выросла.
        </p>
        <div data-reveal data-delay="3">
          <Link to="/method" className="l-btn">метасинхроника</Link>
        </div>
      </div>

      {/* FOOTER */}

    </LandingShell>
  );
};

export default InstitutePage;
