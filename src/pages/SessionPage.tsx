import { Link } from 'react-router-dom';
import LandingShell, { Divider } from '@/components/LandingShell';

const SessionPage = () => {
  return (
    <LandingShell>
      {/* HERO */}
      <section className="l-hero" style={{ minHeight: '60vh', paddingTop: '5rem' }}>
        <div data-reveal>
          <span className="l-label" style={{ marginBottom: '2rem', display: 'block' }}>один сеанс · полтора часа</span>
          <h1 className="l-hero-title">аппаратное<br />изменение</h1>
        </div>
        <p className="l-hero-sub" data-reveal data-delay="1">персональная метасинхроника с adizele</p>
        <div className="l-hero-line" data-reveal data-delay="2" />
      </section>

      {/* 01 · СМЫСЛ */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 01 ] — как это работает</span>
        <h2 className="l-title" data-reveal data-delay="1">есть программное изменение.<br />а есть аппаратное.</h2>
        <p className="l-text" data-reveal data-delay="2">
          всё что ты переживаешь в жизни — рождается в сознании. не снаружи. изнутри. программы которые управляли тобой незаметно. убеждения которые ты принял за правду о себе. всё это — не ты. это записи. и их можно переписать.
        </p>
        <p className="l-text" data-reveal data-delay="3">
          за один сеанс полтора-два часа можно убрать программу которую человек нёс всю жизнь. ту которую даже не считал программой — просто думал что это он. и когда она уходит — человек впервые ощущает себя настоящего.
        </p>
        <div className="l-card" data-reveal data-delay="4" style={{ marginTop: '2rem' }}>
          <p className="l-mono">
            метасинхроника работает везде где есть сознание. <br />
            от страха перед сценой до финансового потолка.
          </p>
        </div>
      </section>

      {/* 02 · ЗАПИСЬ */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 02 ] — запись на сессию</span>
        <h2 className="l-title" data-reveal data-delay="1">твой момент перехода.</h2>
        <p className="l-text" data-reveal data-delay="2">
          один запрос. один сеанс. гарантия результата или полный возврат средств. потому что мы продаём результат, а не время.
        </p>
        
        <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }} data-reveal data-delay="3">
          <a 
            href="https://t.me/oazyse" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="l-btn"
            style={{ width: '100%', maxWidth: '300px', textAlign: 'center' }}
          >
            написать в telegram
          </a>
          
          <p className="l-text" style={{ fontSize: '0.7rem', textAlign: 'center' }}>
            или оставьте заявку в лист ожидания,<br />если расписание заполнено.
          </p>
          
          <Link to="/auth" className="l-btn-ghost">в лист ожидания →</Link>
        </div>
      </section>

    </LandingShell>
  );
};

export default SessionPage;
