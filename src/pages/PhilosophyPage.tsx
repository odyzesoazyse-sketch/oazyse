import { Link } from 'react-router-dom';
import LandingShell, { Divider } from '@/components/LandingShell';

const PhilosophyPage = () => {
  return (
    <LandingShell>

      {/* HERO */}
      <section className="l-hero" style={{ minHeight: '60vh', paddingTop: '5rem' }}>
        <div data-reveal>
          <span className="l-label" style={{ marginBottom: '2rem', display: 'block' }}>способ видеть</span>
          <h1 className="l-hero-title">метафрактализм</h1>
        </div>
        <p className="l-hero-sub" data-reveal data-delay="1">язык, который помогает увидеть связь внутреннего и внешнего.</p>
        <div className="l-hero-line" data-reveal data-delay="2" />
      </section>

      {/* 01 · МЕТАФРАКТАЛИЗМ */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 01 ] — метафрактализм</span>
        <h2 className="l-title" data-reveal data-delay="1">мир повторяет себя<br />в малом и в большом.</h2>
        <p className="l-text" data-reveal data-delay="2">
          в природе многое устроено по принципу самоповторения. малое отражает большое, а большое повторяет малое. снежинка и галактика, дерево и молния часто несут один и тот же рисунок.
        </p>
        <p className="l-text" data-reveal data-delay="3">
          метафрактализм говорит: с сознанием происходит нечто похожее. внутреннее состояние становится рисунком, который повторяется в выборе, отношениях, работе, деньгах, теле и масштабе жизни.
        </p>
        <p className="l-text" data-reveal data-delay="4">
          это не отменяет материальный мир и не подменяет действие фантазией. наоборот: чем точнее человек видит свой внутренний рисунок, тем точнее он действует снаружи.
        </p>
        <div className="l-card" data-reveal data-delay="4" style={{ marginTop: '2rem' }}>
          <p className="l-text" style={{ marginBottom: '1rem' }}>
            отсюда рождается одна простая мысль: для себя ты и есть центр мира.
          </p>
          <p className="l-mono">не в смысле эгоизма. в смысле ответственности. единственная точка реальности, к которой у тебя есть прямой доступ, — твоё собственное сознание.</p>
        </div>
        <p className="l-text" data-reveal data-delay="4" style={{ marginTop: '2rem' }}>
          метафрактализм — это способ видеть. когда он включается, человек перестаёт ждать, что мир сам станет другим, и начинает работать с той точкой, из которой его мир собирается.
        </p>
        <div className="l-card" data-reveal data-delay="4" style={{ marginTop: '2rem', borderColor: 'hsl(var(--neon-purple)/0.15)' }}>
          <p className="l-mono">это не лозунг из серии “думай позитивно”. это более строгий взгляд: смотри, какой рисунок ты несёшь, и что он создаёт вокруг.</p>
        </div>
      </section>

      {/* 02 · МИР КОТОРЫЙ ВОЗМОЖЕН */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 02 ] — мир который возможен</span>
        <h2 className="l-title" data-reveal data-delay="1">представь мир,<br />где люди свободнее внутри.</h2>
        <p className="l-text" data-reveal data-delay="2">
          не идеальны. не одинаковы. просто свободнее от программ, которые им не принадлежат.
        </p>
        <div style={{ display: 'grid', gap: '1px', background: 'hsl(var(--border))', marginTop: '2rem' }} data-reveal data-delay="3">
          {[
            ['бизнес', 'где человек строит не из страха, а из желания создавать.'],
            ['отношения', 'которые рождаются не из одиночества, а из полноты.'],
            ['воспитание', 'где родитель растит ребёнка не из тревоги, а из внутренней силы.'],
          ].map(([title, desc]) => (
            <div key={title} className="l-card-hover" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '0.6rem', letterSpacing: '0.25em', color: 'hsl(var(--neon-purple))', textTransform: 'uppercase', paddingTop: '0.2rem', flexShrink: 0, minWidth: '80px' }}>{title}</span>
              <p className="l-text" style={{ marginBottom: 0, fontSize: '0.82rem' }}>{desc}</p>
            </div>
          ))}
        </div>
        <p className="l-text" data-reveal data-delay="4" style={{ marginTop: '2.5rem' }}>
          каждый человек, который становится свободнее внутри, меняет пространство вокруг себя. семью. окружение. город. иногда и целое поколение.
        </p>
        <p className="l-text" data-reveal data-delay="4">
          оазис не обещает спасти мир. он даёт человеку возможность начать с себя. а когда таких людей становится много, мир меняется не по указу, а изнутри.
        </p>
        <div className="l-card" data-reveal data-delay="4" style={{ marginTop: '2rem' }}>
          <p className="l-mono">в этом и есть смысл oazyse.</p>
        </div>
      </section>

      {/* 03 · ПОЧЕМУ ОАЗИС НЕ УМРЁТ */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 03 ] — почему оазис не умрёт</span>
        <h2 className="l-title" data-reveal data-delay="1">многие платформы исчезают.<br />оазис может остаться.</h2>
        <p className="l-text" data-reveal data-delay="2">
          потому что он не держится только на технологии. технология здесь инструмент. а держится всё на том, что не устаревает: на человеческом желании быть свободным и находить своих.
        </p>
        <p className="l-text" data-reveal data-delay="3">
          это было важно тысячу лет назад. будет важно и через тысячу лет.
        </p>
        <p className="l-text" data-reveal data-delay="4">
          чем больше живых людей внутри такой системы, тем сильнее сама среда. а значит, тем легче новому человеку почувствовать, что другой способ жизни вообще возможен.
        </p>
        <div className="l-card" data-reveal data-delay="4" style={{ marginTop: '2rem' }}>
          <p className="l-mono">антихрупкая система: от роста она становится сильнее, а не слабее.</p>
          <p className="l-mono" style={{ marginTop: '0.75rem' }}>здесь продукт и смысл движения не расходятся.</p>
        </div>
      </section>

      {/* CTA */}
      <Divider />
      <div className="l-cta">
        <span className="l-label" data-reveal>[ философия оживает в действии ]</span>
        <p className="l-text" data-reveal data-delay="1" style={{ marginBottom: '3rem' }}>
          если язык стал понятным, следующий шаг — увидеть, как он превращается в метасинхронику.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }} data-reveal data-delay="2">
          <Link to="/method" className="l-btn">к метасинхронике</Link>
          <Link to="/" className="l-btn-ghost">вернуться к оазису →</Link>
        </div>
      </div>

      {/* FOOTER */}

    </LandingShell>
  );
};

export default PhilosophyPage;
