import { Link } from 'react-router-dom';
import LandingShell, { Divider } from '@/components/LandingShell';

const AboutFounderPage = () => {
  return (
    <LandingShell>

      {/* HERO */}
      <section className="l-hero" style={{ minHeight: '60vh', paddingTop: '5rem' }}>
        <div data-reveal>
          <span className="l-label" style={{ marginBottom: '2rem', display: 'block' }}>основатель · архитектор · первый</span>
          <h1 className="l-hero-title">Adizele Oazyse</h1>
        </div>
        <p className="l-hero-sub" data-reveal data-delay="1">человек, из которого вырос oazyse.</p>
        <div className="l-hero-line" data-reveal data-delay="2" />
      </section>

      {/* 01 · ПУТЬ */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 01 ] — путь</span>
        <h2 className="l-title" data-reveal data-delay="1">есть проекты, которые делают.<br />а есть проекты, которыми живут.</h2>
        <p className="l-text" data-reveal data-delay="2">
          oazyse начался не как бизнес-идея. он начался как состояние, которое уже нельзя было держать только внутри. я просто узнал в нём то, что искал много лет.
        </p>
        <p className="l-text" data-reveal data-delay="3">
          я с детства замечал вещи немного раньше других. то, о чём вокруг ещё не говорили, через несколько лет становилось очевидным для всех. сначала я сомневался в этом. потом принял. потом понял, что это не случайность, а мой вектор.
        </p>
      </section>

      {/* 02 · МОМЕНТ */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 02 ] — момент</span>
        <h2 className="l-title" data-reveal data-delay="1">всё началось<br />с одного тихого момента.</h2>
        <p className="l-text" data-reveal data-delay="2">
          когда я впервые по-настоящему ощутил себя. не роль. не историю. а само сознание, которое проживает эту жизнь. тогда многое встало на свои места.
        </p>
        <p className="l-text" data-reveal data-delay="3">
          это трудно было объяснить словами. но после этого путь стал ясным.
        </p>
        <p className="l-text" data-reveal data-delay="4">
          я начал работать с людьми и увидел, как за один сеанс в них открывается то, что я сам искал годами. быстро. точно. без лишнего. тогда стало ясно: это нельзя оставлять только у себя.
        </p>
        <div className="l-card" data-reveal data-delay="4" style={{ marginTop: '2.5rem' }}>
          <p className="l-mono">так появился институт. метод. философия. оазис.</p>
        </div>
      </section>

      {/* 03 · ЗАДАЧА */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 03 ] — задача</span>
        <h2 className="l-title" data-reveal data-delay="1">я не гуру.<br />я не спаситель.<br />я первый человек этого пути.</h2>
        <p className="l-text" data-reveal data-delay="2">
          я человек, который нашёл нечто настоящее и не смог оставить это только себе. я увидел, какой может быть эта система, и начал её строить.
        </p>
        <p className="l-text" data-reveal data-delay="3">
          моя задача — создавать людей сильнее себя. если oazyse однажды породит людей, которые превзойдут его создателя, значит всё сделано правильно.
        </p>
        <p className="l-text" data-reveal data-delay="4" style={{ fontStyle: 'italic' }}>
          я первый. но точно не последний.
        </p>
        <p className="l-founder-sig" data-reveal data-delay="4">— adizele oazyse</p>
      </section>

      {/* CTA */}
      <Divider />
      <div className="l-cta">
        <span className="l-label" data-reveal>[ следующий шаг ]</span>
        <p className="l-text" data-reveal data-delay="1" style={{ marginBottom: '3rem' }}>
          если это отзывается, дальше можно пойти в метод или сразу в личную сессию.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }} data-reveal data-delay="2">
          <Link to="/session" className="l-btn">личная сессия</Link>
          <Link to="/method" className="l-btn-ghost">метасинхроника →</Link>
        </div>
      </div>

      {/* FOOTER */}

    </LandingShell>
  );
};

export default AboutFounderPage;
