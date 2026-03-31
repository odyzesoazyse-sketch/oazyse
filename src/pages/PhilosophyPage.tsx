import LandingShell from '@/components/LandingShell';

const Divider = () => (
  <div className="l-divider">
    <div className="l-div-line" />
    <div className="l-div-dot" />
    <div className="l-div-line" />
  </div>
);

const PhilosophyPage = () => {
  return (
    <LandingShell>

      {/* HERO */}
      <section className="l-hero" style={{ minHeight: '60vh', paddingTop: '5rem' }}>
        <div data-reveal>
          <span className="l-label" style={{ marginBottom: '2rem', display: 'block' }}>способ видеть</span>
          <h1 className="l-hero-title">метафрактализм</h1>
        </div>
        <p className="l-hero-sub" data-reveal data-delay="1">твоё внутреннее состояние — это фрактал.</p>
        <div className="l-hero-line" data-reveal data-delay="2" />
      </section>

      {/* 01 · МЕТАФРАКТАЛИЗМ */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 01 ] — метафрактализм</span>
        <h2 className="l-title" data-reveal data-delay="1">физический мир<br />состоит из фракталов.</h2>
        <p className="l-text" data-reveal data-delay="2">
          самоповторяющихся структур где малое отражает большое а большое повторяет малое. снежинка и галактика устроены по одному принципу. дерево и молния рисуют одинаковый узор.
        </p>
        <p className="l-text" data-reveal data-delay="3">
          метафрактализм говорит: сознание работает так же. твоё внутреннее состояние — это фрактал. и он отражается во всём что тебя окружает. не метафорически — буквально. меняешь внутренний фрактал — меняется внешняя реальность. не завтра. сейчас.
        </p>
        <p className="l-text" data-reveal data-delay="4">
          это наблюдение существует во всех великих философиях мира — от стоиков до буддистов, от суфиев до квантовых физиков. метафрактализм не противоречит ни одной из них. он просто называет то о чём они все говорили — на языке современного человека.
        </p>
        <div className="l-card" data-reveal data-delay="4" style={{ marginTop: '2rem' }}>
          <p className="l-text" style={{ marginBottom: '1rem' }}>
            и добавляет одно чего не было нигде явно: ты центр вселенной.
          </p>
          <p className="l-mono">не в смысле эгоизма. в смысле точности. ты единственное сознание существование которого ты можешь доказать. именно поэтому работать нужно с ними.</p>
        </div>
        <p className="l-text" data-reveal data-delay="4" style={{ marginTop: '2rem' }}>
          метафрактализм — это способ видеть. когда ты его принимаешь — ты перестаёшь ждать что мир изменится сам. ты понимаешь что ты и есть точка изменения.
        </p>
        <div className="l-card" data-reveal data-delay="4" style={{ marginTop: '2rem', borderColor: 'hsl(var(--neon-purple)/0.15)' }}>
          <p className="l-mono">предупреждение: метафрактализм выходит за рамки привычной логики. его можно не понять с первого раза. и это нормально. он ждёт.</p>
        </div>
      </section>

      {/* 02 · МИР КОТОРЫЙ ВОЗМОЖЕН */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 02 ] — мир который возможен</span>
        <h2 className="l-title" data-reveal data-delay="1">представь мир где большинство людей<br />свободны изнутри.</h2>
        <p className="l-text" data-reveal data-delay="2">
          не идеальны. не одинаковы. просто свободны от программ которые им не принадлежат.
        </p>
        <div style={{ display: 'grid', gap: '1px', background: 'hsl(var(--border))', marginTop: '2rem' }} data-reveal data-delay="3">
          {[
            ['бизнес', 'где человек строит из желания создавать — а не из страха.'],
            ['отношения', 'где строятся не из одиночества — а из полноты.'],
            ['воспитание', 'где родитель воспитывает ребёнка не из тревоги — а из силы.'],
          ].map(([title, desc]) => (
            <div key={title} className="l-card-hover" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '0.6rem', letterSpacing: '0.25em', color: 'hsl(var(--neon-purple))', textTransform: 'uppercase', paddingTop: '0.2rem', flexShrink: 0, minWidth: '80px' }}>{title}</span>
              <p className="l-text" style={{ marginBottom: 0, fontSize: '0.82rem' }}>{desc}</p>
            </div>
          ))}
        </div>
        <p className="l-text" data-reveal data-delay="4" style={{ marginTop: '2.5rem' }}>
          каждый человек с расширенным сознанием меняет пространство вокруг себя. его семья. его окружение. его город. его страна. войны начинаются внутри людей. и заканчиваются тоже там.
        </p>
        <p className="l-text" data-reveal data-delay="4">
          оазис не обещает спасти мир. он даёт каждому человеку возможность начать с себя. а когда таких людей становится достаточно — мир меняется сам. не по указу. не по революции. по внутреннему сдвигу миллионов.
        </p>
        <div className="l-card" data-reveal data-delay="4" style={{ marginTop: '2rem' }}>
          <p className="l-mono">вот зачем существует оазис.</p>
        </div>
      </section>

      {/* 03 · ПОЧЕМУ ОАЗИС НЕ УМРЁТ */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 03 ] — почему оазис не умрёт</span>
        <h2 className="l-title" data-reveal data-delay="1">все платформы умирают.<br />оазис — нет.</h2>
        <p className="l-text" data-reveal data-delay="2">
          потому что он не держится на технологии. технология внутри него — инструмент. а держится он на том что не устаревает никогда — на человеческом желании быть свободным и найти своих.
        </p>
        <p className="l-text" data-reveal data-delay="3">
          это было актуально тысячу лет назад. будет актуально через тысячу лет.
        </p>
        <p className="l-text" data-reveal data-delay="4">
          оазис — единственный актив который становится ценнее по мере того как им пользуются. чем больше людей внутри — тем выше средний уровень сознания в системе. тем сильнее среда. тем быстрее трансформируется каждый новый человек.
        </p>
        <div className="l-card" data-reveal data-delay="4" style={{ marginTop: '2rem' }}>
          <p className="l-mono">антихрупкая система. она усиливается от роста а не ослабевает.</p>
          <p className="l-mono" style={{ marginTop: '0.75rem' }}>и ещё одно: в оазисе продукт и миссия — одно и то же.</p>
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

export default PhilosophyPage;
