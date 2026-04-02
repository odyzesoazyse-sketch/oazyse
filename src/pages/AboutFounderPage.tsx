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
        <p className="l-hero-sub" data-reveal data-delay="1">я — это и есть оазис.</p>
        <div className="l-hero-line" data-reveal data-delay="2" />
      </section>

      {/* 01 · ПУТЬ */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 01 ] — путь</span>
        <h2 className="l-title" data-reveal data-delay="1">есть проекты которые делают.<br />и есть проекты которые — ты.</h2>
        <p className="l-text" data-reveal data-delay="2">
          оазис — это я. не в смысле собственности. в смысле совпадения. когда я думаю об этом — внутри появляется что-то чистое. космическое. ни один другой проект никогда не вызывал во мне этого состояния. и я понял: значит это настоящее.
        </p>
        <p className="l-text" data-reveal data-delay="3">
          я всю жизнь видел вещи немного раньше других. думал о том о чём вокруг ещё не говорили. проходило пять лет — и это становилось трендом. сначала я в этом сомневался. потом принял. потом понял что это не случайность — это направление.
        </p>
      </section>

      {/* 02 · МОМЕНТ */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 02 ] — момент</span>
        <h2 className="l-title" data-reveal data-delay="1">был момент — просто момент тишины.</h2>
        <p className="l-text" data-reveal data-delay="2">
          когда я ощутил себя по-настоящему. почувствовал что я и есть то самое сознание которое всё это создаёт. что реальность вокруг живая, детальная, бесконечная — и я её часть. не наблюдатель. соавтор.
        </p>
        <p className="l-text" data-reveal data-delay="3">
          это было необъяснимо. это было божественно. и именно после этого всё встало на место.
        </p>
        <p className="l-text" data-reveal data-delay="4">
          я начал отдавать свои техники людям. и видел как они за один сеанс переживают то что сам искал годами. что-то в них открывалось — быстро, чисто, без лишнего. и я понял: это нельзя держать при себе. это было бы несправедливо по отношению к миру.
        </p>
        <div className="l-card" data-reveal data-delay="4" style={{ marginTop: '2.5rem' }}>
          <p className="l-mono">так появился институт. метод. философия. оазис.</p>
        </div>
      </section>

      {/* 03 · ЗАДАЧА */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 03 ] — задача</span>
        <h2 className="l-title" data-reveal data-delay="1">я не гуру.<br />не CEO.<br />не спаситель.</h2>
        <p className="l-text" data-reveal data-delay="2">
          я человек который нашёл кое-что настоящее — и не смог не поделиться. архитектор который увидел как должна выглядеть система для новой эпохи — и начал её строить. с восхищением. с нетерпением. с ощущением что это только начало.
        </p>
        <p className="l-text" data-reveal data-delay="3">
          моя задача — создавать людей сильнее себя. если оазис породит людей которые превзойдут его создателя — значит всё сделано правильно.
        </p>
        <p className="l-text" data-reveal data-delay="4" style={{ fontStyle: 'italic' }}>
          я первый. но не последний.<br />и я бесконечно рад что ты здесь.
        </p>
        <p className="l-founder-sig" data-reveal data-delay="4">— adizele oazyse</p>
      </section>

      {/* CTA */}
      <Divider />
      <div className="l-cta">
        <span className="l-label" data-reveal>[ следующий шаг ]</span>
        <p className="l-text" data-reveal data-delay="1" style={{ marginBottom: '3rem' }}>
          если это резонирует — войди в оазис.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }} data-reveal data-delay="2">
          <Link to="/join" className="l-btn">войти в оазис</Link>
          <Link to="/method" className="l-btn-ghost">узнать метод →</Link>
        </div>
      </div>

      {/* FOOTER */}

    </LandingShell>
  );
};

export default AboutFounderPage;
