import { Link } from 'react-router-dom';
import LandingShell, { Divider } from '@/components/LandingShell';

const requests = [
  ['страх и тревога', 'когда тело будто заранее ждёт опасность, даже если внешне всё спокойно.'],
  ['деньги и потолок', 'когда человек много делает, но внутри есть запрет идти дальше и брать больше.'],
  ['отношения', 'когда снова повторяется один и тот же сценарий: зависимость, холод, ревность, потеря себя.'],
  ['энергия и воля', 'когда ум понимает, что пора действовать, но внутри нет движения.'],
  ['переход', 'когда нужно принять решение, выйти на новый уровень или перестать держаться за старую жизнь.'],
];

const steps = [
  ['запрос', 'мы формулируем не красивую цель, а ту точку, где жизнь реально застряла.'],
  ['погружение', 'ты остаёшься в сознании, всё слышишь и можешь остановить процесс в любой момент.'],
  ['перезапись', 'мы находим программу, которая держит старый сценарий, и меняем саму внутреннюю опору.'],
  ['фиксация', 'после сеанса остаётся ясный следующий шаг, чтобы изменение вошло в действие.'],
];

const fit = [
  ['подходит', 'если есть конкретный запрос, который повторяется в жизни и уже надоело объяснять его себе словами.'],
  ['подходит', 'если ты готов смотреть честно, а не искать подтверждение привычной истории о себе.'],
  ['не подходит', 'если нужен диагноз, медицинская помощь, кризисная терапия или кто-то, кто примет решение вместо тебя.'],
  ['не подходит', 'если хочется просто поговорить без намерения что-то менять.'],
];

const SessionPage = () => {
  return (
    <LandingShell>
      {/* HERO */}
      <section className="l-hero" style={{ minHeight: '72vh', paddingTop: '6rem' }}>
        <div data-reveal>
          <span className="l-label" style={{ marginBottom: '2rem', display: 'block' }}>живой вход в метод adizele</span>
          <h1 className="l-hero-title">попробовать,<br />как метод работает<br />с подсознанием.</h1>
        </div>
        <p className="l-hero-sub" data-reveal data-delay="1">не витрина услуги, а прямое прикосновение к тому, как меняется внутренний механизм.</p>
        <div data-reveal data-delay="2" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="https://t.me/adizele" target="_blank" rel="noopener noreferrer" className="l-btn">связаться с adizele</a>
          <Link to="/method" className="l-btn-ghost">метасинхроника →</Link>
        </div>
        <div className="l-hero-line" style={{ marginTop: '4rem' }} data-reveal data-delay="3" />
      </section>

      {/* 01 · СМЫСЛ */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 01 ] — что это</span>
        <h2 className="l-title" data-reveal data-delay="1">не продажа сеанса.<br />а живая встреча с методом.</h2>
        <p className="l-text" data-reveal data-delay="2">
          иногда человеку не нужен длинный маршрут объяснений. ему нужно один раз по-настоящему увидеть, как работает сам механизм изменений. этот формат существует именно для этого.
        </p>
        <p className="l-text" data-reveal data-delay="3">
          если внутри есть повторяющийся узор, мы не спорим с его поверхностью. мы подходим к той точке, где формируется внутренняя программа, и смотрим, можно ли сдвинуть её вживую.
        </p>
        <div className="l-card" data-reveal data-delay="4" style={{ marginTop: '2.5rem' }}>
          <p className="l-mono">это способ почувствовать не обещание, а сам принцип метода: как меняется состояние, из которого потом меняется жизнь.</p>
        </div>
      </section>

      {/* 02 · ЗАПРОСЫ */}
      <Divider />
      <section className="l-section-wide">
        <span className="l-label" data-reveal style={{ textAlign: 'center', display: 'block' }}>[ 02 ] — с чем приходят</span>
        <h2 className="l-title" data-reveal data-delay="1" style={{ textAlign: 'center' }}>обычно люди приходят<br />с тем, что давно повторяется.</h2>
        <div style={{ marginTop: '2.5rem' }} data-reveal data-delay="2">
          {requests.map(([title, desc]) => (
            <div key={title} className="l-term">
              <span className="l-term-word">{title}</span>
              <p className="l-text" style={{ marginBottom: 0, fontSize: '0.82rem' }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 03 · КОМУ ПОДХОДИТ */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 03 ] — кому подходит</span>
        <h2 className="l-title" data-reveal data-delay="1">кому это подходит,<br />а кому нет.</h2>
        <p className="l-text" data-reveal data-delay="2">
          сессия не заменяет медицину, психиатрию или экстренную помощь. это работа с внутренним запросом для человека, который находится в устойчивом состоянии и хочет увидеть механизм своего повторяющегося сценария.
        </p>
        <div style={{ marginTop: '2rem' }} data-reveal data-delay="3">
          {fit.map(([type, desc]) => (
            <div key={desc} className="l-term">
              <span className="l-term-word" style={{ color: type === 'подходит' ? 'hsl(var(--neon-green))' : 'hsl(var(--muted-foreground))' }}>{type}</span>
              <p className="l-text" style={{ marginBottom: 0, fontSize: '0.84rem' }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 04 · ПРОЦЕСС */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 04 ] — как проходит</span>
        <h2 className="l-title" data-reveal data-delay="1">бережно.<br />точно.<br />по делу.</h2>
        <p className="l-text" data-reveal data-delay="2">
          сеанс длится полтора-два часа. это онлайн-работа в спокойном состоянии внимания. человек не теряет контроль, не исчезает и не становится внушаемым объектом. наоборот, он впервые может ясно увидеть то, что обычно управляет им изнутри.
        </p>
        <div className="l-card" data-reveal data-delay="3" style={{ marginTop: '2rem' }}>
          <p className="l-mono">формат: онлайн · один запрос · 90-120 минут · короткая фиксация следующего шага после работы.</p>
        </div>
        <div style={{ marginTop: '2.5rem' }} data-reveal data-delay="3">
          {steps.map(([title, desc], index) => (
            <div key={title} className="l-term">
              <span className="l-term-word">{String(index + 1).padStart(2, '0')} · {title}</span>
              <p className="l-term-def">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 05 · ГАРАНТИЯ */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 05 ] — гарантия</span>
        <h2 className="l-title" data-reveal data-delay="1">здесь важен результат,<br />а не процесс ради процесса.</h2>
        <p className="l-text" data-reveal data-delay="2">
          если после сеанса ты честно не чувствуешь изменения в отношении к своему запросу, деньги возвращаются. это принципиальная часть формата.
        </p>
        <p className="l-text" data-reveal data-delay="3">
          гарантия нужна не для громкой упаковки. она нужна, чтобы человек входил в работу без страха, что ему снова продадут процесс вместо результата.
        </p>
        <div className="l-card" data-reveal data-delay="4" style={{ marginTop: '2rem' }}>
          <p className="l-mono">один запрос. один сеанс. гарантия результата или полный возврат средств.</p>
        </div>
      </section>

      {/* 06 · ЗАПИСЬ */}
      <Divider />
      <div className="l-cta">
        <span className="l-label" data-reveal>[ 06 ] — следующий шаг</span>
        <p className="l-text" data-reveal data-delay="1" style={{ marginBottom: '1rem' }}>
          если ты хочешь ближе подойти к методу, напиши коротко: кто ты, что сейчас повторяется в твоей жизни и почему ты чувствуешь, что время пришло.
        </p>
        <p className="l-text" data-reveal data-delay="2" style={{ marginBottom: '3rem' }}>
          если этот путь тебе подходит, мы продолжим дальше. если нет, я скажу об этом прямо. здесь важна честная точность, а не продажа ради продажи.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }} data-reveal data-delay="3">
          <a href="https://t.me/adizele" target="_blank" rel="noopener noreferrer" className="l-btn">связаться с adizele</a>
          <a href="https://t.me/oazysebot" target="_blank" rel="noopener noreferrer" className="l-btn-ghost">связать путь через бот →</a>
        </div>
      </div>

      <Divider />
    </LandingShell>
  );
};

export default SessionPage;
