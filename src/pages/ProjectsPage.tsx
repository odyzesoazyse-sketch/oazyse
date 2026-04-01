import { Link } from 'react-router-dom';
import LandingShell, { Divider } from '@/components/LandingShell';

const projects = [
  { name: 'метасинхроника', desc: 'метод работы с сознанием которому мы даём гарантию. через живого практика или через искусственный интеллект. доступен каждому участнику оазиса бесплатно.' },
  { name: 'метафрактализм', desc: 'философия и движение. способ видеть себя и мир который меняет всё.' },
  { name: 'oazyse mesh', desc: 'децентрализованная сеть агентов искусственного интеллекта. создана с одним намерением: изобилие для всех.' },
  { name: 'танцевальные метаморфозы', desc: 'метод работы с телом и сознанием через движение.' },
  { name: 'AI метасинхроника', desc: 'первая система которая проводит сеансы метасинхроники через искусственный интеллект. полная приватность. любая точка мира. любой момент.' },
];

const ProjectsPage = () => {
  return (
    <LandingShell>

      {/* HERO */}
      <section className="l-hero" style={{ minHeight: '60vh', paddingTop: '5rem' }}>
        <div data-reveal>
          <span className="l-label" style={{ marginBottom: '2rem', display: 'block' }}>живая система</span>
          <h1 className="l-hero-title">проекты оазиса</h1>
        </div>
        <p className="l-hero-sub" data-reveal data-delay="1">один механизм. бесконечное количество применений.</p>
        <div className="l-hero-line" data-reveal data-delay="2" />
      </section>

      {/* 01 · ВСЕ ПРОЕКТЫ */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 01 ] — что существует сейчас</span>
        <h2 className="l-title" data-reveal data-delay="1">оазис — это живая система<br />которая постоянно создаёт новое.</h2>
        <p className="l-text" data-reveal data-delay="2">
          проекты появляются, развиваются, иногда уходят. но оазис остаётся. потому что он держится не на проектах — а на намерении: поднять уровень сознания на земле настолько чтобы это изменило всё вокруг.
        </p>
        <div style={{ marginTop: '2.5rem' }} data-reveal data-delay="3">
          {projects.map((p) => (
            <div key={p.name} className="l-term">
              <span className="l-term-word">{p.name}</span>
              <p className="l-term-def">{p.desc}</p>
            </div>
          ))}
        </div>
        <div className="l-card" data-reveal data-delay="4" style={{ marginTop: '2rem' }}>
          <p className="l-mono">ни один проект не является оазисом. все они — его выражение в конкретный момент времени. оазис больше любого из них.</p>
        </div>
      </section>

      {/* 02 · AI МЕТАСИНХРОНИКА */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 02 ] — продукт института</span>
        <h2 className="l-title" data-reveal data-delay="1">AI метасинхроника</h2>
        <p className="l-text" data-reveal data-delay="2">
          метасинхроника всегда требовала человека. практика. присутствия. живого сеанса.
        </p>
        <p className="l-text" data-reveal data-delay="3">
          теперь — нет.
        </p>
        <p className="l-text" data-reveal data-delay="4">
          каждый год наши технологии становятся умнее. но меняемся ли мы? те кто стоят за этими экранами?
        </p>
        <div className="l-card" data-reveal data-delay="4" style={{ marginTop: '2rem' }}>
          <p className="l-text" style={{ fontStyle: 'italic', marginBottom: '1.5rem' }}>
            впервые в истории — да.
          </p>
          <p className="l-text" style={{ marginBottom: '1.5rem' }}>
            институт сознания космического разума создал первый продукт который использует силу искусственного интеллекта не снаружи — а внутри. не чтобы сделать тебя продуктивнее. а чтобы изменить тебя на глубинном уровне сознания.
          </p>
          <p className="l-mono">
            один сеанс. &nbsp;·&nbsp; один запрос. &nbsp;·&nbsp; полная приватность. &nbsp;·&nbsp; любая точка мира. &nbsp;·&nbsp; любой момент.
          </p>
          <p className="l-mono" style={{ marginTop: '0.75rem' }}>таких продуктов не существует. мы первые.</p>
        </div>
      </section>

      {/* 03 · ОАЗИС КАК ПЛАТФОРМА */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 03 ] — оазис как живое пространство</span>
        <h2 className="l-title" data-reveal data-delay="1">большинство платформ построены<br />на внимании. оазис — на состоянии.</h2>
        <p className="l-text" data-reveal data-delay="2">
          они берут твоё время и продают его. неважно в каком состоянии ты выходишь. оазис построен на противоположном — нам не нужно твоё внимание. нам нужно твоё состояние. и чем оно выше — тем сильнее вся система.
        </p>
        <p className="l-text" data-reveal data-delay="3">
          это не другая функция. это другая цивилизационная логика.
        </p>
        <p className="l-text" data-reveal data-delay="4">
          внутри оазиса человек не потребляет — он живёт. у него есть своя точка на живой карте мира. свой круг людей. своё пространство которое он строит.
        </p>
        <div style={{ display: 'grid', gap: '1px', background: 'hsl(var(--border))', marginTop: '2.5rem' }} data-reveal data-delay="4">
          {[
            ['мини-оазис', 'каждый участник может создать своё живое пространство для людей которых он собирает вокруг себя.'],
            ['сеансы', 'внутри люди проводят друг другу сеансы. создают вместе. встречаются физически. строят проекты.'],
            ['волна', 'когда человек переживает трансформацию — это расходится волной. не через рекламу. через живое состояние.'],
          ].map(([title, desc]) => (
            <div key={title} className="l-card-hover" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '0.6rem', letterSpacing: '0.25em', color: 'hsl(var(--neon-purple))', textTransform: 'uppercase', paddingTop: '0.2rem', flexShrink: 0, minWidth: '80px' }}>{title}</span>
              <p className="l-text" style={{ marginBottom: 0, fontSize: '0.82rem' }}>{desc}</p>
            </div>
          ))}
        </div>
        <div className="l-card" data-reveal data-delay="4" style={{ marginTop: '1px' }}>
          <p className="l-mono">оазис — первое пространство в истории где технология служит сознанию а не наоборот.</p>
        </div>
      </section>

      {/* CTA */}
      <Divider />
      <div className="l-cta">
        <span className="l-label" data-reveal>[ все проекты растут изнутри ]</span>
        <p className="l-text" data-reveal data-delay="1" style={{ marginBottom: '3rem' }}>
          стань частью — и сам станешь проектом.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }} data-reveal data-delay="2">
          <Link to="/join" className="l-btn">войти в оазис</Link>
          <Link to="/method" className="l-btn-ghost">узнать метод →</Link>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="l-footer">
        <p className="l-footer-text">
          oazyse° &nbsp;·&nbsp; институт сознания космического разума &nbsp;·&nbsp; метафрактализм
        </p>
      </footer>

    </LandingShell>
  );
};

export default ProjectsPage;
