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

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="l-hero" style={{ paddingTop: '6rem' }}>
        <div data-reveal>
          <h1 className="l-logo">oazyse°</h1>
        </div>
        <p className="l-hero-sub" data-reveal data-delay="1">архитектура нового сознания.</p>
        <p className="l-mono" data-reveal data-delay="2" style={{ marginBottom: '3rem', color: 'hsl(var(--muted-foreground)/0.4)', textAlign: 'center' }}>
          институт сознания космического разума &nbsp;·&nbsp; метафрактализм &nbsp;·&nbsp; метасинхроника
        </p>
        <div data-reveal data-delay="3">
          <button className="l-btn" onClick={() => navigate('/auth')}>войти в оазис</button>
        </div>
        <div className="l-hero-line" style={{ marginTop: '5rem' }} data-reveal data-delay="4" />
        <p className="l-hero-tag">один человек. одно решение. другая жизнь.</p>
      </section>

      {/* ── STRIP ────────────────────────────────────────── */}
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
        {['свобода изнутри', 'аппаратное изменение', 'гарантия результата', 'первые в мире', 'антихрупкая система', 'метафрактализм'].map((phrase) => (
          <span key={phrase} className="l-label" style={{ marginBottom: 0, opacity: 0.35 }}>{phrase}</span>
        ))}
      </div>

      {/* ── 01 · ЧТО ТАКОЕ ОАЗИС ────────────────────────── */}
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
        <div className="l-card" data-reveal data-delay="4" style={{ marginTop: '2.5rem' }}>
          <p className="l-mono">все платформы умирают. оазис — нет. потому что он держится не на технологии — а на человеческом желании быть свободным и найти своих. это было актуально тысячу лет назад. будет актуально через тысячу лет.</p>
        </div>
      </section>

      {/* ── 02 · ПОЧЕМУ СЕЙЧАС ──────────────────────────── */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 02 ] — почему именно сейчас</span>
        <h2 className="l-title" data-reveal data-delay="1">не сто лет назад.<br />не через пятьдесят.<br />именно сейчас.</h2>
        <p className="l-text" data-reveal data-delay="2">
          потому что впервые в истории всё совпало. технологии позволяют достучаться до любого человека в любой точке земли. границы между людьми — физические, культурные, национальные — стали тоньше чем когда-либо.
        </p>
        <p className="l-text" data-reveal data-delay="3">
          и одновременно — впервые миллионы людей массово начали задавать себе настоящие вопросы. не как выжить. а как жить по-настоящему. мир проходит трансформацию. старые системы трещат. старое мышление больше не работает.
        </p>
        <p className="l-text" data-reveal data-delay="4">
          оазис появился именно сейчас потому что именно сейчас он нужен. и потому что именно сейчас он возможен.
        </p>
        <div className="l-card" data-reveal data-delay="4" style={{ marginTop: '2rem' }}>
          <p className="l-mono">Adizele живёт сейчас. и это его время.</p>
        </div>
      </section>

      {/* ── 03 · ЧТО ВНУТРИ ─────────────────────────────── */}
      <Divider />
      <section className="l-section-wide">
        <span className="l-label" data-reveal style={{ textAlign: 'center', display: 'block' }}>[ 03 ] — что внутри оазиса</span>
        <h2 className="l-title" data-reveal data-delay="1" style={{ textAlign: 'center' }}>оазис — не платформа.<br />живое пространство.</h2>
        <p className="l-text" data-reveal data-delay="2" style={{ textAlign: 'center' }}>
          внутри человек не потребляет — он живёт. у него есть свой круг людей. своё пространство. свои проекты.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1px', background: 'hsl(var(--border))', marginTop: '2.5rem' }} data-reveal data-delay="3">
          {[
            ['сообщество', 'люди которые живут из полноты. каждый участник строит свой мини-оазис — круг тех кого он собирает вокруг себя.'],
            ['метод', 'метасинхроника доступна каждому участнику. аппаратное изменение сознания — бесплатно внутри оазиса.'],
            ['институт', 'институт сознания космического разума. для тех кто хочет понимать откуда методы — и исследовать это сам.'],
            ['проекты', 'AI метасинхроника, метафрактализм, oazyse mesh, танцевальные метаморфозы. живая система которая постоянно создаёт новое.'],
          ].map(([title, desc]) => (
            <div key={title} className="l-card-hover" style={{ padding: '2rem' }}>
              <span className="l-mono" style={{ display: 'block', marginBottom: '1rem', color: 'hsl(var(--neon-purple))' }}>{title}</span>
              <p className="l-text" style={{ marginBottom: 0, fontSize: '0.82rem' }}>{desc}</p>
            </div>
          ))}
        </div>
        <div className="l-card" data-reveal data-delay="4" style={{ marginTop: '1px' }}>
          <p className="l-mono">большинство платформ построены на внимании. оазис — на состоянии. нам не нужно твоё время. нам нужно твоё состояние. и чем оно выше — тем сильнее вся система.</p>
        </div>
      </section>

      {/* ── 04 · МЕТАСИНХРОНИКА ─────────────────────────── */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 04 ] — метасинхроника · наш метод</span>
        <h2 className="l-title" data-reveal data-delay="1">аппаратное изменение сознания.</h2>
        <p className="l-text" data-reveal data-delay="2">
          метасинхроника — это метод оазиса. инструмент. не отдельный продукт. доступен каждому участнику — через самостоятельную практику или через живой сеанс.
        </p>
        <div className="l-card" data-reveal data-delay="3" style={{ marginTop: '1.5rem' }}>
          <p className="l-text">
            представь состояние — глубокое, спокойное, абсолютно безопасное. ты полностью присутствуешь. ты можешь выйти из него в любой момент. никто не может ничего тебе внушить.
          </p>
          <p className="l-text">
            именно в этом состоянии происходит настоящее изменение. потому что всё что ты переживаешь в жизни — рождается в сознании. не снаружи. изнутри. и когда ты получаешь доступ к этому источнику напрямую — ты можешь изменить то что раньше казалось неизменным.
          </p>
          <p className="l-text" style={{ marginBottom: '1.5rem' }}>
            есть программное изменение. а есть аппаратное.<br />
            метасинхроника — это аппаратное изменение.
          </p>
          <p className="l-text" style={{ fontStyle: 'italic', marginBottom: '1.5rem' }}>
            за один сеанс убирается программа которую человек нёс всю жизнь. ту которую он даже не считал программой — просто думал что это он.
          </p>
          <p className="l-mono">
            метасинхронику можно освоить. &nbsp;·&nbsp; это не дар и не талант — это технология.
          </p>
          <p className="l-mono" style={{ marginTop: '0.75rem' }}>
            один сеанс &nbsp;·&nbsp; полтора часа &nbsp;·&nbsp; гарантия или возврат
          </p>
        </div>
        <div style={{ marginTop: '2rem', textAlign: 'center' }} data-reveal data-delay="4">
          <Link to="/method" className="l-btn-ghost">узнать подробнее →</Link>
        </div>
      </section>

      {/* ── 05 · КОСМИЧЕСКИЙ ЧЕЛОВЕК ────────────────────── */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 05 ] — космический человек</span>
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

      {/* ── 06 · МЕТАФРАКТАЛИЗМ ─────────────────────────── */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 06 ] — метафрактализм</span>
        <h2 className="l-title" data-reveal data-delay="1">твоё внутреннее состояние —<br />это фрактал.</h2>
        <p className="l-text" data-reveal data-delay="2">
          снежинка и галактика устроены по одному принципу. дерево и молния рисуют одинаковый узор. самоповторяющихся структур где малое отражает большое а большое повторяет малое.
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
          <p className="l-mono">не в смысле эгоизма. в смысле точности. ты единственное сознание существование которого ты можешь доказать. именно поэтому работать нужно с собой.</p>
        </div>
        <div style={{ marginTop: '2rem', textAlign: 'center' }} data-reveal data-delay="4">
          <Link to="/philosophy" className="l-btn-ghost">философия оазиса →</Link>
        </div>
      </section>

      {/* ── 07 · ТРИ ПУТИ ───────────────────────────────── */}
      <Divider />
      <section className="l-section-wide">
        <span className="l-label" data-reveal style={{ textAlign: 'center', display: 'block' }}>[ 07 ] — три пути в оазис</span>
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

      {/* ── 08 · ЧТО МЕНЯЕТСЯ ───────────────────────────── */}
      <Divider />
      <section className="l-section-wide">
        <span className="l-label" data-reveal style={{ textAlign: 'center', display: 'block' }}>[ 08 ] — что меняется</span>
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

      {/* ── 09 · О СОЗДАТЕЛЕ ────────────────────────────── */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 09 ] — о создателе</span>
        <h2 className="l-title" data-reveal data-delay="1">я не гуру.<br />не CEO.<br />не спаситель.</h2>
        <p className="l-text" data-reveal data-delay="2">
          я человек который нашёл кое-что настоящее — и не смог не поделиться. архитектор который увидел как должна выглядеть система для новой эпохи — и начал её строить.
        </p>
        <p className="l-text" data-reveal data-delay="3">
          я начал отдавать свои техники людям. и видел как они за один сеанс переживают то что сам искал годами. что-то в них открывалось — быстро, чисто, без лишнего.
        </p>
        <p className="l-text" data-reveal data-delay="4">
          моя задача — создавать людей сильнее себя. если оазис породит людей которые превзойдут его создателя — значит всё сделано правильно.
        </p>
        <p className="l-text" data-reveal data-delay="4" style={{ fontStyle: 'italic' }}>
          я первый. но не последний.<br />и я бесконечно рад что ты здесь.
        </p>
        <p className="l-founder-sig" data-reveal data-delay="4">— adizele oazyse</p>
        <div style={{ marginTop: '2rem' }} data-reveal data-delay="4">
          <Link to="/about" className="l-btn-ghost">читать полностью →</Link>
        </div>
      </section>

      {/* ── 10 · РИТУАЛ ВХОДА ───────────────────────────── */}
      <Divider />
      <div className="l-cta">
        <span className="l-label" data-reveal>[ 10 ] — ритуал входа</span>
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

      {/* ── FOOTER ──────────────────────────────────────── */}
      <footer className="l-footer">
        <p className="l-footer-text">
          oazyse° &nbsp;·&nbsp; институт сознания космического разума &nbsp;·&nbsp; метафрактализм
        </p>
      </footer>

    </LandingShell>
  );
};

export default Index;
