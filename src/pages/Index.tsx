import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import LandingShell, { Divider } from '@/components/LandingShell';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate('/member', { replace: true });
  }, [user, navigate]);

  if (user) return null;

  return (
    <LandingShell>

      {/* HERO */}
      <section className="l-hero" style={{ paddingTop: '6rem' }}>
        <div data-reveal>
          <span className="l-label" style={{ marginBottom: '2rem', display: 'block' }}>системный протокол · 2026</span>
          <h1 className="l-logo">oazyse°</h1>
        </div>
        <p className="l-hero-sub" data-reveal data-delay="1">архитектура нового сознания.</p>
        <p className="l-mono" data-reveal data-delay="2" style={{ marginBottom: '3rem', color: 'hsl(var(--muted-foreground)/0.4)', textAlign: 'center' }}>
          один сеанс &nbsp;·&nbsp; полтора часа &nbsp;·&nbsp; гарантия или возврат
        </p>
        <div data-reveal data-delay="3">
          <button className="l-btn" onClick={() => navigate('/auth')}>войти в оазис</button>
        </div>
        <div className="l-hero-line" style={{ marginTop: '5rem' }} data-reveal data-delay="4" />
        <p className="l-hero-tag">институт сознания космического разума.</p>
      </section>

      {/* MARQUEE STRIP */}
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
        {['свобода изнутри', 'аппаратное изменение', 'гарантия или возврат', 'первые в мире', 'институт сознания', 'метафрактализм'].map((phrase) => (
          <span key={phrase} className="l-label" style={{ marginBottom: 0, opacity: 0.35 }}>{phrase}</span>
        ))}
      </div>

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
        <p className="l-text" data-reveal data-delay="4">
          к 2030 году в оазисе будет миллион человек. не потому что мы будем рекламироваться. потому что каждый кто прошёл — приводит других. не по просьбе. по состоянию.
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
          <p className="l-text" style={{ fontStyle: 'italic', marginBottom: '1.5rem' }}>
            за один сеанс убирается программа которую человек нёс всю жизнь. ту которую он даже не считал программой — просто думал что это он.
          </p>
          <p className="l-mono" style={{ marginTop: '1.5rem' }}>
            один сеанс. &nbsp;·&nbsp; полтора часа. &nbsp;·&nbsp; гарантия или возврат.
          </p>
        </div>
        <div style={{ marginTop: '2rem', textAlign: 'center' }} data-reveal data-delay="3">
          <Link to="/method" className="l-btn-ghost">узнать подробнее →</Link>
        </div>
      </section>

      {/* 04 · ЧТО МЕНЯЕТСЯ */}
      <Divider />
      <section className="l-section-wide">
        <span className="l-label" data-reveal style={{ textAlign: 'center', display: 'block' }}>[ 04 ] — что меняется</span>
        <h2 className="l-title" data-reveal data-delay="1" style={{ textAlign: 'center' }}>не симптом.<br />источник.</h2>
        <div className="l-three-grid" data-reveal data-delay="2">
          <div className="l-card-hover">
            <span className="l-mono" style={{ display: 'block', marginBottom: '1rem' }}>страх · блок · паттерн</span>
            <p className="l-text" style={{ marginBottom: 0 }}>
              за один сеанс убирается то что человек нёс всю жизнь. не заглушается — убирается. насовсем.
            </p>
          </div>
          <div className="l-card-hover">
            <span className="l-mono" style={{ display: 'block', marginBottom: '1rem' }}>ощущение что живёшь<br />не свою жизнь</span>
            <p className="l-text" style={{ marginBottom: 0 }}>
              после сеанса люди говорят: "я впервые почувствовал что я — это я". не роль. не маска. я.
            </p>
          </div>
          <div className="l-card-hover">
            <span className="l-mono" style={{ display: 'block', marginBottom: '1rem' }}>потолок в деньгах ·<br />отношениях · здоровье</span>
            <p className="l-text" style={{ marginBottom: 0 }}>
              потолок не снаружи. он внутри. снимается источник — исчезает ограничение. жизнь расширяется сама.
            </p>
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
