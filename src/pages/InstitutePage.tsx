import { Link } from 'react-router-dom';
import LandingShell, { Divider } from '@/components/LandingShell';

const InstitutePage = () => {
  return (
    <LandingShell>

      {/* HERO */}
      <section className="l-hero" style={{ minHeight: '60vh', paddingTop: '5rem' }}>
        <div data-reveal>
          <span className="l-label" style={{ marginBottom: '2rem', display: 'block' }}>исследовательское сердце оазиса</span>
          <h1 className="l-hero-title" style={{ fontSize: 'clamp(1.4rem, 4vw, 3rem)' }}>институт сознания<br />космического разума</h1>
        </div>
        <p className="l-hero-sub" data-reveal data-delay="1">там где заканчиваются готовые ответы — начинается настоящее познание.</p>
        <div className="l-hero-line" data-reveal data-delay="2" />
      </section>

      {/* 01 · О ИНСТИТУТЕ */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 01 ] — о институте</span>
        <h2 className="l-title" data-reveal data-delay="1">есть вопросы которые человечество<br />задаёт себе с самого начала.</h2>
        <p className="l-text" data-reveal data-delay="2">
          не "как работает рынок" и не "как оптимизировать процессы". а настоящие вопросы — как устроена реальность на самом деле. что такое сознание. есть ли что-то большее чем вселенная которую мы видим. и если есть — можно ли это изучать. можно ли к этому прикоснуться.
        </p>
        <p className="l-text" data-reveal data-delay="3">
          институт сознания космического разума существует для этих вопросов.
        </p>
        <p className="l-text" data-reveal data-delay="4">
          космический разум — это то что выходит за пределы трёхмерного восприятия. больше космоса. больше вселенной. та нить которую невозможно поймать логикой — но можно почувствовать. и можно исследовать.
        </p>
        <div className="l-card" data-reveal data-delay="4" style={{ marginTop: '2rem' }}>
          <p className="l-text" style={{ marginBottom: '1rem' }}>
            это не мистика. и не академическая наука в привычном смысле.
          </p>
          <p className="l-mono">это третье — исследование на стыке, там где заканчиваются готовые ответы и начинается настоящее познание.</p>
        </div>
      </section>

      {/* 02 · ИСТОРИЯ */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 02 ] — история</span>
        <h2 className="l-title" data-reveal data-delay="1">институт создал оазис.<br />и стал его частью.</h2>
        <p className="l-text" data-reveal data-delay="2">
          институт изучает как устроен мир на глубинных уровнях. как сознание взаимодействует с реальностью. какие законы управляют тем что мы называем жизнью. через эксперименты, через практики, через технологии, через живой опыт людей.
        </p>
        <p className="l-text" data-reveal data-delay="3">
          институт создал оазис. и в этот момент произошло нечто удивительное — то что было создано стало больше создателя. оазис вырос за пределы института. и институт с радостью стал его частью.
        </p>
        <div className="l-card" data-reveal data-delay="4" style={{ marginTop: '2rem' }}>
          <p className="l-mono">так бывает когда создаёшь что-то по-настоящему живое.</p>
        </div>
      </section>

      {/* 03 · КАК ВОЙТИ */}
      <Divider />
      <div className="l-cta">
        <span className="l-label" data-reveal>[ 03 ] — как войти</span>
        <p className="l-text" data-reveal data-delay="1" style={{ marginBottom: '1rem' }}>
          войти в институт можно изнутри оазиса.
        </p>
        <p className="l-text" data-reveal data-delay="2" style={{ marginBottom: '3rem' }}>
          это путь для тех кто хочет не просто применять методы — а понимать откуда они.
        </p>
        <div data-reveal data-delay="3">
          <Link to="/join" className="l-btn">войти в оазис</Link>
        </div>
      </div>

      {/* FOOTER */}

    </LandingShell>
  );
};

export default InstitutePage;
