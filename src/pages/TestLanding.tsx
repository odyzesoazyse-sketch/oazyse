import { useEffect, useState } from 'react';

const useCursorTrail = () => {
  useEffect(() => {
    const trail: HTMLDivElement[] = [];
    const maxTrail = 8;

    const createDot = () => {
      const dot = document.createElement('div');
      dot.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: linear-gradient(135deg, hsl(270,100%,65%), hsl(150,100%,45%));
        pointer-events: none;
        z-index: 9999;
      `;
      document.body.appendChild(dot);
      return dot;
    };

    for (let i = 0; i < maxTrail; i++) trail.push(createDot());

    let mouseX = 0, mouseY = 0;
    const positions: { x: number; y: number }[] = Array(maxTrail).fill({ x: 0, y: 0 });

    const onMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
    document.addEventListener('mousemove', onMove);

    let frame: number;
    const animate = () => {
      positions[0] = { x: mouseX, y: mouseY };
      for (let i = 1; i < maxTrail; i++) {
        positions[i] = {
          x: positions[i].x + (positions[i - 1].x - positions[i].x) * 0.35,
          y: positions[i].y + (positions[i - 1].y - positions[i].y) * 0.35,
        };
      }
      trail.forEach((dot, i) => {
        dot.style.left = `${positions[i].x - 2}px`;
        dot.style.top = `${positions[i].y - 2}px`;
        dot.style.opacity = `${(1 - i / maxTrail) * 0.6}`;
        dot.style.transform = `scale(${1 - i * 0.1})`;
      });
      frame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(frame);
      trail.forEach(d => d.remove());
    };
  }, []);
};

const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('revealed')),
      { threshold: 0.15 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

const TestLanding = () => {
  useCursorTrail();
  useReveal();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail('');
  };

  return (
    <div className="landing-root">
      <style>{`
        .landing-root {
          background: hsl(var(--background));
          color: hsl(var(--foreground));
          font-family: 'Questrial', sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
          cursor: none;
        }

        /* Subtle pulsing gradient orb */
        .landing-orb {
          position: fixed;
          top: -20%;
          left: 50%;
          transform: translateX(-50%);
          width: 700px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(ellipse, hsl(var(--neon-purple)/0.04) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
          animation: orb-pulse 10s ease-in-out infinite;
        }

        .dark .landing-orb {
          background: radial-gradient(ellipse, hsl(var(--neon-purple)/0.08) 0%, transparent 70%);
        }

        @keyframes orb-pulse {
          0%, 100% { opacity: 0.6; transform: translateX(-50%) scale(1); }
          50% { opacity: 1; transform: translateX(-50%) scale(1.08); }
        }

        /* Reveal */
        [data-reveal] {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1);
        }
        [data-reveal].revealed { opacity: 1; transform: translateY(0); }
        [data-reveal][data-delay="1"] { transition-delay: 0.15s; }
        [data-reveal][data-delay="2"] { transition-delay: 0.3s; }
        [data-reveal][data-delay="3"] { transition-delay: 0.45s; }
        [data-reveal][data-delay="4"] { transition-delay: 0.6s; }

        /* Hero */
        .l-hero {
          position: relative;
          z-index: 2;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 0 2rem;
        }

        .l-logo {
          font-family: 'Questrial', sans-serif;
          font-size: clamp(3.5rem, 12vw, 9rem);
          font-weight: 400;
          letter-spacing: 0.04em;
          background: linear-gradient(to right, hsl(var(--neon-purple)), hsl(var(--neon-green)));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          margin-bottom: 2rem;
        }

        .l-hero-sub {
          font-size: clamp(0.75rem, 2vw, 0.9rem);
          font-weight: 400;
          letter-spacing: 0.3em;
          text-transform: lowercase;
          color: hsl(var(--muted-foreground));
          margin-bottom: 5rem;
        }

        .l-hero-tag {
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          color: hsl(var(--muted-foreground)/0.5);
          text-transform: lowercase;
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
        }

        .l-hero-line {
          width: 1px;
          height: 80px;
          background: linear-gradient(to bottom, transparent, hsl(var(--neon-purple)/0.3), transparent);
          margin: 0 auto 4rem;
        }

        /* Sections */
        .l-section {
          position: relative;
          z-index: 2;
          max-width: 680px;
          margin: 0 auto;
          padding: 9rem 2rem;
        }

        .l-label {
          font-size: 0.6rem;
          letter-spacing: 0.35em;
          color: hsl(var(--neon-purple));
          text-transform: uppercase;
          margin-bottom: 2.5rem;
          display: block;
        }

        .l-title {
          font-size: clamp(1.6rem, 4vw, 2.8rem);
          font-weight: 400;
          letter-spacing: -0.01em;
          color: hsl(var(--foreground));
          line-height: 1.15;
          margin-bottom: 2.5rem;
          background: linear-gradient(to right, hsl(var(--neon-purple)), hsl(var(--neon-green)));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .l-text {
          font-size: 0.9rem;
          line-height: 2;
          color: hsl(var(--muted-foreground));
          margin-bottom: 1.25rem;
        }

        .l-text:last-of-type { margin-bottom: 0; }

        /* Divider */
        .l-divider {
          position: relative;
          z-index: 2;
          max-width: 680px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .l-div-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, hsl(var(--border)), transparent);
        }

        .l-div-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: hsl(var(--neon-purple)/0.5);
          flex-shrink: 0;
        }

        /* Method card */
        .l-card {
          border: 1px solid hsl(var(--border));
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
          background: hsl(var(--card));
        }

        .l-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, hsl(var(--neon-purple)/0.4), hsl(var(--neon-green)/0.4), transparent);
        }

        .l-mono {
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          color: hsl(var(--muted-foreground)/0.6);
          text-transform: lowercase;
          line-height: 1.8;
        }

        /* Founder */
        .l-founder-sig {
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          color: hsl(var(--muted-foreground)/0.5);
          margin-top: 2.5rem;
          text-transform: lowercase;
        }

        /* CTA */
        .l-cta {
          position: relative;
          z-index: 2;
          padding: 10rem 2rem;
          text-align: center;
          max-width: 520px;
          margin: 0 auto;
        }

        .l-cta-text {
          font-size: 0.85rem;
          line-height: 1.9;
          color: hsl(var(--muted-foreground));
          margin-bottom: 3rem;
          letter-spacing: 0.02em;
        }

        .l-form {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          max-width: 360px;
          margin: 0 auto;
          width: 100%;
        }

        .l-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid hsl(var(--border));
          padding: 0.875rem 0;
          color: hsl(var(--foreground));
          font-family: 'Questrial', sans-serif;
          font-size: 0.85rem;
          outline: none;
          text-align: center;
          letter-spacing: 0.08em;
          transition: border-color 0.3s;
        }

        .l-input::placeholder {
          color: hsl(var(--muted-foreground)/0.4);
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: lowercase;
        }

        .l-input:focus {
          border-bottom-color: hsl(var(--neon-purple));
        }

        .l-btn {
          background: transparent;
          border: 1px solid hsl(var(--neon-purple)/0.4);
          color: hsl(var(--neon-purple));
          font-family: 'Questrial', sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          padding: 0.875rem 2rem;
          cursor: none;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
        }

        .l-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, hsl(var(--neon-purple)/0.08), hsl(var(--neon-green)/0.08));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }

        .l-btn:hover {
          border-color: hsl(var(--neon-green)/0.6);
          color: hsl(var(--neon-green));
          box-shadow: 0 0 20px hsl(var(--neon-green)/0.1);
        }

        .l-btn:hover::before { transform: scaleX(1); }

        .l-success {
          font-size: 0.65rem;
          letter-spacing: 0.25em;
          color: hsl(var(--neon-green));
          text-transform: lowercase;
          margin-top: 1.5rem;
          animation: fade-up 0.6s ease forwards;
        }

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Footer */
        .l-footer {
          position: relative;
          z-index: 2;
          border-top: 1px solid hsl(var(--border));
          padding: 3rem 2rem;
          text-align: center;
        }

        .l-footer-text {
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          color: hsl(var(--muted-foreground)/0.4);
          text-transform: lowercase;
        }
      `}</style>

      <div className="landing-orb" />

      {/* BLOCK 1: HERO */}
      <section className="l-hero">
        <div data-reveal>
          <span className="l-label" style={{ marginBottom: '2rem', display: 'block' }}>системный протокол</span>
          <h1 className="l-logo">oazyse°</h1>
        </div>
        <p className="l-hero-sub" data-reveal data-delay="1">архитектура новой реальности.</p>
        <div className="l-hero-line" data-reveal data-delay="2" />
        <p className="l-hero-tag">институт сознания космического разума.</p>
      </section>

      {/* BLOCK 2: PHILOSOPHY */}
      <div className="l-divider">
        <div className="l-div-line" />
        <div className="l-div-dot" />
        <div className="l-div-line" />
      </div>

      <section className="l-section">
        <span className="l-label" data-reveal>[ 01 ] — манифест</span>
        <h2 className="l-title" data-reveal data-delay="1">ИСХОДНЫЙ КОД</h2>
        <p className="l-text" data-reveal data-delay="2">
          Внешний мир не имеет своей воли. Это зеркало, которое покорно отражает геометрию твоего внутреннего состояния.
        </p>
        <p className="l-text" data-reveal data-delay="3">
          Мы представляем oazyse° — экосистему для тех, кто готов выйти из автоматического сценария и стать Архитектором.
        </p>
        <p className="l-text" data-reveal data-delay="4">
          Мы не учим «успеху». Мы передаем ключи от Метафрактализма — знания о том, как изменить узор мысли, чтобы материя перестроилась сама.
        </p>
      </section>

      {/* BLOCK 3: METHOD */}
      <div className="l-divider">
        <div className="l-div-line" />
        <div className="l-div-dot" />
        <div className="l-div-line" />
      </div>

      <section className="l-section">
        <span className="l-label" data-reveal>[ 02 ] — технология</span>
        <h2 className="l-title" data-reveal data-delay="1">ТЕХНОЛОГИЯ:<br />МЕТАСИНХРОНИКА</h2>
        <div className="l-card" data-reveal data-delay="2">
          <p className="l-text">
            Классическая психология работает с прошлым. Мы работаем с Вероятностью.
          </p>
          <p className="l-text">
            Метасинхроника — это инженерная настройка связи с космическим разумом.
          </p>
          <p className="l-text">
            Это способ удалить вирусы страха и сомнений из своего биокомпьютера и загрузить чистый опыт желаемого будущего.
          </p>
          <p className="l-mono" style={{ marginTop: '1.5rem' }}>
            без эзотерики. &nbsp;·&nbsp; без религии. &nbsp;·&nbsp; только физика сознания.
          </p>
        </div>
      </section>

      {/* BLOCK 4: FOUNDER */}
      <div className="l-divider">
        <div className="l-div-line" />
        <div className="l-div-dot" />
        <div className="l-div-line" />
      </div>

      <section className="l-section">
        <span className="l-label" data-reveal>[ 03 ] — от архитектора</span>
        <h2 className="l-title" data-reveal data-delay="1">ОТ АРХИТЕКТОРА</h2>
        <p className="l-text" data-reveal data-delay="2">Я — Адизель Оазьес.</p>
        <p className="l-text" data-reveal data-delay="3">
          Моя цель — не собрать последователей. Моя цель — активировать Лидеров.
        </p>
        <p className="l-text" data-reveal data-delay="4">
          Я создаю этот проект, чтобы ты мог построить свой собственный автономный оазис — зону высокой частоты, которая исцелит пространство вокруг тебя.
        </p>
        <p className="l-text" style={{ fontStyle: 'italic' }} data-reveal data-delay="4">
          Семью. Бизнес. Мир.
        </p>
        <p className="l-founder-sig" data-reveal data-delay="4">— адизель оазьес</p>
      </section>

      {/* BLOCK 5: CTA */}
      <div className="l-divider">
        <div className="l-div-line" />
        <div className="l-div-dot" />
        <div className="l-div-line" />
      </div>

      <div className="l-cta">
        <span className="l-label" data-reveal>[ 04 ] — доступ</span>
        <p className="l-cta-text" data-reveal data-delay="1">
          Доступ к системе открывается поэтапно.<br />
          Оставь свой сигнал, чтобы быть первым,<br />кто получит ключ.
        </p>
        {!sent ? (
          <form className="l-form" onSubmit={handleSubmit} data-reveal data-delay="2">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="твой email"
              className="l-input"
              required
            />
            <button type="submit" className="l-btn">отправить сигнал</button>
          </form>
        ) : (
          <p className="l-success">сигнал принят. ожидай ключ.</p>
        )}
      </div>

      {/* FOOTER */}
    </div>
  );
};

export default TestLanding;
