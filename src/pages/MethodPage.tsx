import { Link } from 'react-router-dom';
import LandingShell, { Divider } from '@/components/LandingShell';

const MethodPage = () => {
  return (
    <LandingShell>

      {/* HERO */}
      <section className="l-hero" style={{ minHeight: '60vh', paddingTop: '5rem' }}>
        <div data-reveal>
          <span className="l-label" style={{ marginBottom: '2rem', display: 'block' }}>как происходит изменение</span>
          <h1 className="l-hero-title">метасинхроника</h1>
        </div>
        <p className="l-hero-sub" data-reveal data-delay="1">точная работа с тем местом, откуда рождаются реакции.</p>
        <div className="l-hero-line" data-reveal data-delay="2" />
      </section>

      {/* 01 · ОТ ЧЕГО МЫ ОСВОБОЖДАЕМ */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 01 ] — где находится рычаг</span>
        <h2 className="l-title" data-reveal data-delay="1">проблема редко живёт<br />там где болит.</h2>
        <p className="l-text" data-reveal data-delay="2">
          человек может годами менять привычки, окружение, работу и отношения, а потом снова возвращаться в тот же внутренний сценарий. значит дело не только в поведении.
        </p>
        <p className="l-text" data-reveal data-delay="3">
          под реакциями обычно лежит более глубокая связка: память, тело, страх, привычный выбор и старый вывод о себе. пока она работает, человек может всё понимать головой и всё равно жить по-старому.
        </p>
        <p className="l-text" data-reveal data-delay="4">
          метод нужен не для спора с симптомом. он нужен, чтобы найти место, из которого симптом снова и снова возникает.
        </p>
        <div className="l-card" data-reveal data-delay="4" style={{ marginTop: '2.5rem' }}>
          <p className="l-mono">мы работаем не с историей о проблеме, а с внутренним механизмом, который снова её создаёт.</p>
        </div>
      </section>

      {/* 02 · МЕТАСИНХРОНИКА */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 02 ] — метасинхроника</span>
        <h2 className="l-title" data-reveal data-delay="1">состояние становится<br />местом точной работы.</h2>
        <p className="l-text" data-reveal data-delay="2">
          метасинхроника начинается с особого состояния внимания. человек остаётся в сознании, всё слышит, может остановиться в любой момент и не теряет контроль.
        </p>
        <p className="l-text" data-reveal data-delay="3">
          в этом состоянии легче пройти мимо поверхностных объяснений и увидеть связку, которая обычно прячется глубже слов. задача не в том, чтобы придумать новую мысль, а в том, чтобы изменить внутреннюю опору.
        </p>
        <div className="l-card" data-reveal data-delay="4" style={{ marginTop: '2rem' }}>
          <p className="l-text" style={{ marginBottom: '1rem' }}>
            есть изменения, которые держатся на усилии.
          </p>
          <p className="l-text" style={{ fontStyle: 'italic', marginBottom: '1.5rem' }}>
            а есть изменения, которые происходят в самой основе.
          </p>
          <p className="l-text" style={{ marginBottom: 0 }}>
            метасинхроника относится ко второму типу. за один сеанс можно сдвинуть программу, которую человек долго считал частью себя. не всегда это выглядит драматично. иногда главный результат очень тихий: там, где раньше поднималась боль, появляется спокойствие.
          </p>
          <p className="l-mono" style={{ marginTop: '1.5rem' }}>
            метасинхроника — не дар. это навык точной работы с состоянием.
          </p>
        </div>
      </section>

      {/* 03 · КОСМИЧЕСКИЙ ЧЕЛОВЕК */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 03 ] — космический человек</span>
        <h2 className="l-title" data-reveal data-delay="1">в человеке есть нечто<br />глубже всех ролей.</h2>
        <p className="l-text" data-reveal data-delay="2">
          у каждого человека есть слои идентичности. национальность. семья. культура. вера. социальная роль. история о себе.
        </p>
        <p className="l-text" data-reveal data-delay="3">
          всё это важно, но всё это не исчерпывает человека. многие такие слои вошли извне и со временем стали тем, что человек привык называть собой.
        </p>
        <p className="l-text" data-reveal data-delay="4">
          глубже этого остаётся сознание. не роль и не маска. именно с этим уровнем и работает метод.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'hsl(var(--border))', marginTop: '2.5rem' }} data-reveal data-delay="4">
          <div className="l-card-hover" style={{ padding: '1.5rem' }}>
            <span className="l-mono" style={{ display: 'block', marginBottom: '0.75rem' }}>по горизонтали</span>
            <p className="l-text" style={{ marginBottom: 0, fontSize: '0.82rem' }}>человек живёт, действует и создаёт в этом мире.</p>
          </div>
          <div className="l-card-hover" style={{ padding: '1.5rem' }}>
            <span className="l-mono" style={{ display: 'block', marginBottom: '0.75rem' }}>по вертикали</span>
            <p className="l-text" style={{ marginBottom: 0, fontSize: '0.82rem' }}>сознание, которое наблюдает и собирает его внутреннюю реальность.</p>
          </div>
        </div>
        <div className="l-card" data-reveal data-delay="4" style={{ marginTop: '1px' }}>
          <p className="l-mono">условно: чем меньше человек живёт готовыми программами, тем больше в нём внутренней свободы.</p>
          <p className="l-mono" style={{ marginTop: '0.75rem' }}>метасинхроника помогает двигаться именно в эту сторону.</p>
        </div>
      </section>

      {/* 04 · ДЛЯ СКЕПТИКОВ */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 04 ] — проверка реальностью</span>
        <h2 className="l-title" data-reveal data-delay="1">метод должен выдерживать<br />сомнение.</h2>
        <p className="l-text" data-reveal data-delay="2">
          здесь не нужна вера. если после работы человек не чувствует изменения в отношении к своему запросу, значит результата не произошло.
        </p>
        <p className="l-text" data-reveal data-delay="3">
          поэтому метод проверяется не красивым описанием, а фактом: стало ли внутри иначе там, где раньше было застревание.
        </p>
        <p className="l-text" data-reveal data-delay="4">
          если стало иначе, значит работа попала в механизм. если нет, это не нужно защищать словами.
        </p>
        <div className="l-card" data-reveal data-delay="4" style={{ marginTop: '2rem' }}>
          <p className="l-text" style={{ marginBottom: '1rem' }}>
            мы не продаём процесс ради процесса.
          </p>
          <p className="l-mono">если ты прошёл сеанс и не почувствовал изменений, мы возвращаем деньги. потому что здесь важен результат.</p>
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }} data-reveal data-delay="4">
          <Link to="/session" className="l-btn">прийти с личным запросом</Link>
        </div>
      </section>

      {/* FOOTER */}

    </LandingShell>
  );
};

export default MethodPage;
