import { useNavigate } from 'react-router-dom';
import LandingShell, { Divider } from '@/components/LandingShell';

const JoinPage = () => {
  const navigate = useNavigate();

  return (
    <LandingShell>

      {/* HERO */}
      <section className="l-hero" style={{ minHeight: '60vh', paddingTop: '5rem' }}>
        <div data-reveal>
          <span className="l-label" style={{ marginBottom: '2rem', display: 'block' }}>один шаг</span>
          <h1 className="l-hero-title">войти в оазис</h1>
        </div>
        <p className="l-hero-sub" data-reveal data-delay="1">и ты уже не там где был.</p>
        <div className="l-hero-line" data-reveal data-delay="2" />
      </section>

      {/* 01 · ПОЧЕМУ СЕЙЧАС */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 01 ] — почему сейчас</span>
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

      {/* 02 · ВКЛАД В ОАЗИС */}
      <Divider />
      <section className="l-section">
        <span className="l-label" data-reveal>[ 02 ] — вклад в оазис</span>
        <h2 className="l-title" data-reveal data-delay="1">оазис не продаёт членство.<br />он принимает вклад.</h2>
        <p className="l-text" data-reveal data-delay="2">
          когда ты приходишь в оазис — ты не покупаешь продукт. ты решаешь поддержать то во что веришь. это другое намерение. и оно меняет всё.
        </p>
        <p className="l-text" data-reveal data-delay="3">
          размер вклада — это личное дело каждого. внутри нет уровней и иерархий. нет VIP-доступа и эконома.
        </p>
        <div className="l-card" data-reveal data-delay="4" style={{ marginTop: '2rem' }}>
          <p className="l-mono">все участники равны. оазис — пространство для тех кто выбрал жить из полноты. независимо от того сколько они вносят.</p>
        </div>
      </section>

      {/* 03 · РИТУАЛ ВХОДА */}
      <Divider />
      <div className="l-cta">
        <span className="l-label" data-reveal>[ 03 ] — ритуал входа</span>
        <p className="l-text" data-reveal data-delay="1" style={{ marginBottom: '1rem' }}>
          ты дочитал до этого места.
        </p>
        <p className="l-text" data-reveal data-delay="2" style={{ marginBottom: '1rem' }}>
          это не случайно.
        </p>
        <p className="l-text" data-reveal data-delay="3" style={{ marginBottom: '1rem' }}>
          люди которые доходят до конца — уже внутри. они просто ещё не сделали шаг.
        </p>
        <p className="l-text" data-reveal data-delay="3" style={{ marginBottom: '3rem' }}>
          вступить в оазис — это момент когда ты говоришь себе: я выбираю жить иначе. я выбираю служить чему-то большему. я готов.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }} data-reveal data-delay="4">
          <button className="l-btn" onClick={() => navigate('/auth')}>войти в оазис</button>
          <p style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: 'hsl(var(--muted-foreground)/0.4)', textTransform: 'lowercase' }}>
            первые участники получают особые условия.
          </p>
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

export default JoinPage;
