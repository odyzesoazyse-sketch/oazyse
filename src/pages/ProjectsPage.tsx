import { Link } from 'react-router-dom';
import LandingShell, { Divider } from '@/components/LandingShell';

const projects = [
  { name: 'метасинхроника', desc: 'точная работа с глубинным состоянием человека. первый практический инструмент oazyse.' },
  { name: 'метафрактализм', desc: 'язык, который помогает увидеть связь внутреннего рисунка и внешней реальности.' },
  { name: 'oazyse mesh', desc: 'будущая сеть людей, пространств и интеллектуальных агентов, где технология служит живому состоянию.' },
  { name: 'танцевальные метаморфозы', desc: 'телесная ветвь метода, где изменение проходит не только через слово, но и через движение.' },
  { name: 'AI метасинхроника', desc: 'будущая форма приватной работы с запросом через искусственный интеллект, когда метод будет готов к масштабированию.' },
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
        <p className="l-hero-sub" data-reveal data-delay="1">не список продуктов, а карта того, во что oazyse постепенно разворачивается.</p>
        <div className="l-hero-line" data-reveal data-delay="2" />
      </section>

      {/* 01 · ВСЕ ПРОЕКТЫ */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 01 ] — что существует сейчас</span>
        <h2 className="l-title" data-reveal data-delay="1">оазис — это живая система<br />которая постоянно создаёт новое.</h2>
        <p className="l-text" data-reveal data-delay="2">
          проекты oazyse не случайны. каждый из них отвечает за свой слой: сознание, тело, язык, среду, технологию и масштаб.
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
          <p className="l-mono">если главная объясняет, зачем существует oazyse, эта страница показывает, во что он может вырасти.</p>
        </div>
      </section>

      {/* 02 · AI МЕТАСИНХРОНИКА */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 02 ] — продукт института</span>
        <h2 className="l-title" data-reveal data-delay="1">AI метасинхроника —<br />не чат и не советчик.</h2>
        <p className="l-text" data-reveal data-delay="2">
          сегодня метасинхроника требует живого практика и точного присутствия. это правильно: пока метод должен оставаться максимально человеческим.
        </p>
        <p className="l-text" data-reveal data-delay="3">
          но у oazyse уже виден следующий горизонт.
        </p>
        <p className="l-text" data-reveal data-delay="4">
          если искусственный интеллект однажды сможет работать не только с информацией, а с глубинным запросом человека, это будет не очередное приложение, а новая форма доступа к внутренней работе.
        </p>
        <div className="l-card" data-reveal data-delay="4" style={{ marginTop: '2rem' }}>
          <p className="l-text" style={{ fontStyle: 'italic', marginBottom: '1.5rem' }}>
            задача не в том, чтобы заменить человека машиной.
          </p>
          <p className="l-text" style={{ marginBottom: '1.5rem' }}>
            задача в том, чтобы довести метод до такой ясности, чтобы его можно было масштабировать без потери бережности, точности и приватности.
          </p>
          <p className="l-mono">
            один запрос. &nbsp;·&nbsp; полная приватность. &nbsp;·&nbsp; любой язык. &nbsp;·&nbsp; любая точка мира.
          </p>
          <p className="l-mono" style={{ marginTop: '0.75rem' }}>сейчас это горизонт, а не витрина. поэтому об этом лучше говорить честно.</p>
        </div>
      </section>

      {/* 03 · ОАЗИС КАК ПЛАТФОРМА */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 03 ] — оазис как живое пространство</span>
        <h2 className="l-title" data-reveal data-delay="1">большинство платформ построены<br />на внимании. оазис — на состоянии.</h2>
        <p className="l-text" data-reveal data-delay="2">
          большинство платформ забирают внимание и монетизируют его. не так важно, в каком состоянии ты выходишь. oazyse построен на противоположном: здесь важно, каким человеком ты становишься внутри системы.
        </p>
        <p className="l-text" data-reveal data-delay="3">
          это не просто другая функция. это другая логика среды.
        </p>
        <p className="l-text" data-reveal data-delay="4">
          внутри oazyse человек не просто потребляет. он живёт, строит свою точку, собирает свой круг и создаёт своё пространство.
        </p>
        <div style={{ display: 'grid', gap: '1px', background: 'hsl(var(--border))', marginTop: '2.5rem' }} data-reveal data-delay="4">
          {[
            ['мини-оазис', 'каждый участник может создать своё живое пространство для людей, которых он собирает вокруг себя.'],
            ['сеансы', 'внутри люди работают друг с другом, создают вместе, встречаются и строят проекты.'],
            ['волна', 'когда человек переживает трансформацию, это расходится дальше не через рекламу, а через живое состояние.'],
          ].map(([title, desc]) => (
            <div key={title} className="l-card-hover" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '0.6rem', letterSpacing: '0.25em', color: 'hsl(var(--neon-purple))', textTransform: 'uppercase', paddingTop: '0.2rem', flexShrink: 0, minWidth: '80px' }}>{title}</span>
              <p className="l-text" style={{ marginBottom: 0, fontSize: '0.82rem' }}>{desc}</p>
            </div>
          ))}
        </div>
        <div className="l-card" data-reveal data-delay="4" style={{ marginTop: '1px' }}>
          <p className="l-mono">oazyse задуман как пространство, где технология служит сознанию, а не наоборот.</p>
        </div>
      </section>

      {/* CTA */}
      <Divider />
      <div className="l-cta">
        <span className="l-label" data-reveal>[ все проекты растут изнутри ]</span>
        <p className="l-text" data-reveal data-delay="1" style={{ marginBottom: '3rem' }}>
          каждый новый проект здесь растёт из той же внутренней работы.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }} data-reveal data-delay="2">
          <Link to="/method" className="l-btn">метасинхроника</Link>
          <Link to="/institute" className="l-btn-ghost">к институту →</Link>
        </div>
      </div>

      {/* FOOTER */}

    </LandingShell>
  );
};

export default ProjectsPage;
