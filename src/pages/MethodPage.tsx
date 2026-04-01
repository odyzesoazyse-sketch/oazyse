import { Link } from 'react-router-dom';
import LandingShell, { Divider } from '@/components/LandingShell';

const MethodPage = () => {
  return (
    <LandingShell>

      {/* HERO */}
      <section className="l-hero" style={{ minHeight: '60vh', paddingTop: '5rem' }}>
        <div data-reveal>
          <span className="l-label" style={{ marginBottom: '2rem', display: 'block' }}>аппаратное изменение сознания</span>
          <h1 className="l-hero-title">метод</h1>
        </div>
        <p className="l-hero-sub" data-reveal data-delay="1">всё остальное — поверхность.</p>
        <div className="l-hero-line" data-reveal data-delay="2" />
      </section>

      {/* 01 · ОТ ЧЕГО МЫ ОСВОБОЖДАЕМ */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 01 ] — от чего мы освобождаем</span>
        <h2 className="l-title" data-reveal data-delay="1">есть мир который<br />существовал до тебя.</h2>
        <p className="l-text" data-reveal data-delay="2">
          мир где ты рождаешься уже должным — системе, корпорации, чужому сценарию. мир где школа учит подчиняться, реклама учит хотеть, а работа учит терпеть. мир синтетического — еды, ценностей, смыслов.
        </p>
        <p className="l-text" data-reveal data-delay="3">
          это не чья-то злая воля. это просто старое мышление. двумерное. плоское.
        </p>
        <p className="l-text" data-reveal data-delay="4">
          оазис освобождает не от людей и не от систем. он освобождает от того что сидит внутри — от страхов которые ты принял за себя, от потолков которые тебе навязали, от тихого ощущения что ты живёшь не свою жизнь.
        </p>
        <div className="l-card" data-reveal data-delay="4" style={{ marginTop: '2.5rem' }}>
          <p className="l-mono">это и есть настоящая свобода. не та что снаружи. та что изнутри.</p>
        </div>
      </section>

      {/* 02 · МЕТАСИНХРОНИКА */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 02 ] — метасинхроника</span>
        <h2 className="l-title" data-reveal data-delay="1">это одно из самых удивительных<br />открытий которое мы сделали.</h2>
        <p className="l-text" data-reveal data-delay="2">
          представь состояние — глубокое, спокойное, абсолютно безопасное. как самая ясная медитация которую ты когда-либо испытывал. ты полностью присутствуешь. ты можешь выйти из него в любой момент. никто не может ничего тебе внушить.
        </p>
        <p className="l-text" data-reveal data-delay="3">
          именно в этом состоянии происходит настоящее изменение. потому что всё — абсолютно всё что ты переживаешь в жизни — рождается в сознании. не снаружи. изнутри. и когда ты получаешь доступ к этому источнику напрямую — ты можешь изменить то что раньше казалось неизменным.
        </p>
        <div className="l-card" data-reveal data-delay="4" style={{ marginTop: '2rem' }}>
          <p className="l-text" style={{ marginBottom: '1rem' }}>
            есть программное изменение. а есть аппаратное.
          </p>
          <p className="l-text" style={{ fontStyle: 'italic', marginBottom: '1.5rem' }}>
            метасинхроника — это аппаратное изменение.
          </p>
          <p className="l-text" style={{ marginBottom: 0 }}>
            за один сеанс полтора-два часа можно убрать программу которую человек нёс всю жизнь. ту которую даже не считал программой — просто думал что это он.
          </p>
          <p className="l-mono" style={{ marginTop: '1.5rem' }}>
            метасинхронику можно освоить. &nbsp;·&nbsp; это не дар и не талант — это технология.
          </p>
        </div>
      </section>

      {/* 03 · КОСМИЧЕСКИЙ ЧЕЛОВЕК */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 03 ] — космический человек</span>
        <h2 className="l-title" data-reveal data-delay="1">есть то что остаётся<br />когда убираешь всё.</h2>
        <p className="l-text" data-reveal data-delay="2">
          у каждого человека есть слои идентичности. он казах или немец. он сын своих родителей. он гражданин своей страны. он верующий или нет. богатый или бедный.
        </p>
        <p className="l-text" data-reveal data-delay="3">
          все эти слои — программы. не плохие и не хорошие. просто программы. они вошли извне — через культуру, семью, религию, общество — и стали тем что человек называет собой.
        </p>
        <p className="l-text" data-reveal data-delay="4">
          остаётся сознание. чистое. незапрограммированное. космическое. вот это и есть космический человек.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'hsl(var(--border))', marginTop: '2.5rem' }} data-reveal data-delay="4">
          <div className="l-card-hover" style={{ padding: '1.5rem' }}>
            <span className="l-mono" style={{ display: 'block', marginBottom: '0.75rem' }}>по горизонтали</span>
            <p className="l-text" style={{ marginBottom: 0, fontSize: '0.82rem' }}>человек — живёт, действует, создаёт в этом мире.</p>
          </div>
          <div className="l-card-hover" style={{ padding: '1.5rem' }}>
            <span className="l-mono" style={{ display: 'block', marginBottom: '0.75rem' }}>по вертикали</span>
            <p className="l-text" style={{ marginBottom: 0, fontSize: '0.82rem' }}>сознание которое наблюдает и является центром своей реальности.</p>
          </div>
        </div>
        <div className="l-card" data-reveal data-delay="4" style={{ marginTop: '1px' }}>
          <p className="l-mono">шкала 0–100. ноль — полностью внутри программ. сто — полная внутренняя свобода, действие из полноты.</p>
          <p className="l-mono" style={{ marginTop: '0.75rem' }}>метасинхроника — инструмент движения по этой шкале.</p>
        </div>
      </section>

      {/* 04 · ДЛЯ СКЕПТИКОВ */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 04 ] — для тех кто сомневается</span>
        <h2 className="l-title" data-reveal data-delay="1">хорошо.<br />сомневайся.</h2>
        <p className="l-text" data-reveal data-delay="2">
          мы не просим тебя верить. мы сами проверяли всё на себе. снова и снова. пока не убедились.
        </p>
        <p className="l-text" data-reveal data-delay="3">
          вот что мы знаем точно: всё что когда-либо тебя по-настоящему меняло — происходило изнутри. не снаружи. книга которая перевернула мировоззрение. разговор который изменил всё. момент тишины в котором ты вдруг понял что-то важное.
        </p>
        <p className="l-text" data-reveal data-delay="4">
          мы просто научились работать с этим напрямую.
        </p>
        <div className="l-card" data-reveal data-delay="4" style={{ marginTop: '2rem' }}>
          <p className="l-text" style={{ marginBottom: '1rem' }}>
            ни один метод в мире не даёт гарантию. мы даём.
          </p>
          <p className="l-mono">если ты прошёл сеанс и не почувствовал изменений — мы возвращаем деньги. без вопросов. потому что мы продаём результат. не время. не процесс. результат.</p>
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }} data-reveal data-delay="4">
          <Link to="/join" className="l-btn">записаться на сеанс</Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="l-footer">
        <p className="l-footer-text">
          oazyse° &nbsp;·&nbsp; институт сознания космического разума &nbsp;·&nbsp; метафрактализм
        </p>
      </footer>

    </LandingShell>
  );
};

export default MethodPage;
