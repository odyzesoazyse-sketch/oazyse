import { useEffect, useRef, useState } from 'react';

// Custom cursor trail hook
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
        background: rgba(255,255,255,0.6);
        pointer-events: none;
        z-index: 9999;
        transition: opacity 0.5s ease;
      `;
      document.body.appendChild(dot);
      return dot;
    };

    for (let i = 0; i < maxTrail; i++) trail.push(createDot());

    let mouseX = 0, mouseY = 0;
    const positions: {x: number; y: number}[] = Array(maxTrail).fill({ x: 0, y: 0 });

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

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
        dot.style.opacity = `${(1 - i / maxTrail) * 0.5}`;
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

// Intersection observer hook for scroll-reveal
const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
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
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&family=Space+Mono:wght@400;700&family=Questrial&display=swap');

        .landing-root {
          background: #050505;
          color: #f0f0f0;
          font-family: 'Space Grotesk', sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
          cursor: none;
        }

        .mono {
          font-family: 'Space Mono', monospace;
        }

        /* Pulse background */
        .pulse-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background: radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.025) 0%, transparent 70%);
          animation: pulse-anim 8s ease-in-out infinite;
        }

        @keyframes pulse-anim {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }

        /* Scan line */
        .scanline {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: rgba(255,255,255,0.04);
          z-index: 1;
          animation: scan 12s linear infinite;
        }

        @keyframes scan {
          0% { top: 0; }
          100% { top: 100vh; }
        }

        /* Reveal animation */
        [data-reveal] {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1);
        }

        [data-reveal].revealed {
          opacity: 1;
          transform: translateY(0);
        }

        [data-reveal][data-delay="1"] { transition-delay: 0.15s; }
        [data-reveal][data-delay="2"] { transition-delay: 0.3s; }
        [data-reveal][data-delay="3"] { transition-delay: 0.45s; }
        [data-reveal][data-delay="4"] { transition-delay: 0.6s; }

        /* Hero */
        .hero {
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

        .hero-logo {
          font-family: 'Questrial', sans-serif;
          font-size: clamp(3rem, 10vw, 8rem);
          font-weight: 400;
          letter-spacing: 0.05em;
          background: linear-gradient(135deg, #ffffff 0%, #aaaaaa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          margin-bottom: 2.5rem;
        }

        .hero-sub {
          font-size: clamp(0.9rem, 2.5vw, 1.15rem);
          font-weight: 300;
          letter-spacing: 0.3em;
          text-transform: lowercase;
          color: rgba(240,240,240,0.55);
          margin-bottom: 6rem;
        }

        .hero-tag {
          font-family: 'Space Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.2);
          text-transform: lowercase;
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
        }

        .hero-line {
          width: 1px;
          height: 80px;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.15), transparent);
          margin: 0 auto 4rem;
        }

        /* Sections */
        .section {
          position: relative;
          z-index: 2;
          max-width: 720px;
          margin: 0 auto;
          padding: 10rem 2rem;
        }

        .section-label {
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.35em;
          color: rgba(255,255,255,0.25);
          text-transform: uppercase;
          margin-bottom: 3rem;
        }

        .section-title {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #ffffff;
          line-height: 1.1;
          margin-bottom: 3rem;
        }

        .section-text {
          font-size: 1rem;
          font-weight: 300;
          line-height: 1.9;
          color: rgba(240,240,240,0.6);
          margin-bottom: 1.5rem;
        }

        .section-text:last-of-type {
          margin-bottom: 0;
        }

        .divider {
          position: relative;
          z-index: 2;
          max-width: 720px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.07);
        }

        .divider-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          flex-shrink: 0;
        }

        /* Method block */
        .method-card {
          border: 1px solid rgba(255,255,255,0.06);
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
        }

        .method-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent);
        }

        /* Founder */
        .founder-name {
          font-family: 'Space Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.3);
          margin-top: 3rem;
          text-transform: lowercase;
        }

        /* CTA */
        .cta-section {
          position: relative;
          z-index: 2;
          padding: 12rem 2rem;
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
        }

        .cta-text {
          font-size: 0.85rem;
          font-weight: 300;
          line-height: 1.8;
          color: rgba(240,240,240,0.45);
          margin-bottom: 3rem;
          letter-spacing: 0.05em;
        }

        .email-form {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
        }

        .email-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255,255,255,0.15);
          padding: 1rem 0;
          color: #f0f0f0;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.9rem;
          font-weight: 300;
          outline: none;
          text-align: center;
          letter-spacing: 0.1em;
          transition: border-color 0.3s;
        }

        .email-input::placeholder {
          color: rgba(255,255,255,0.2);
          font-family: 'Space Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.25em;
          text-transform: lowercase;
        }

        .email-input:focus {
          border-bottom-color: rgba(255,255,255,0.4);
        }

        .cta-btn {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.7);
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          padding: 1rem 2.5rem;
          cursor: none;
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
          position: relative;
          overflow: hidden;
        }

        .cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.04);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }

        .cta-btn:hover {
          border-color: rgba(255,255,255,0.5);
          color: #ffffff;
        }

        .cta-btn:hover::before {
          transform: scaleX(1);
        }

        .success-msg {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.25em;
          color: rgba(255,255,255,0.35);
          text-transform: lowercase;
          margin-top: 1.5rem;
          animation: fade-up 0.6s ease forwards;
        }

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Footer */
        .footer {
          position: relative;
          z-index: 2;
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 3rem 2rem;
          text-align: center;
        }

        .footer-text {
          font-family: 'Space Mono', monospace;
          font-size: 0.58rem;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.15);
          text-transform: lowercase;
        }

        /* Number tag */
        .num-tag {
          font-family: 'Space Mono', monospace;
          font-size: 0.55rem;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.12);
          margin-bottom: 1rem;
        }
      `}</style>

      {/* Background effects */}
      <div className="pulse-bg" />
      <div className="scanline" />

      {/* BLOCK 1: HERO */}
      <section className="hero">
        <div data-reveal>
          <div className="num-tag mono" style={{marginBottom: '2rem', opacity: 0.4}}>[ 00 ]</div>
          <h1 className="hero-logo">oazyse°</h1>
        </div>
        <p className="hero-sub" data-reveal data-delay="1">архитектура новой реальности.</p>
        <div className="hero-line" data-reveal data-delay="2" />
        <p className="hero-tag mono">системный протокол загружен. &nbsp;·&nbsp; институт сознания космического разума.</p>
      </section>

      {/* BLOCK 2: PHILOSOPHY */}
      <div className="divider">
        <div className="divider-line" />
        <div className="divider-dot" />
        <div className="divider-line" />
      </div>

      <section className="section">
        <p className="section-label mono" data-reveal>[ 01 ] — манифест</p>
        <h2 className="section-title" data-reveal data-delay="1">ИСХОДНЫЙ КОД</h2>
        <p className="section-text" data-reveal data-delay="2">
          Внешний мир не имеет своей воли. Это зеркало, которое покорно отражает геометрию твоего внутреннего состояния.
        </p>
        <p className="section-text" data-reveal data-delay="3">
          Мы представляем oazyse° — экосистему для тех, кто готов выйти из автоматического сценария и стать Архитектором.
        </p>
        <p className="section-text" data-reveal data-delay="4">
          Мы не учим «успеху». Мы передаем ключи от Метафрактализма — знания о том, как изменить узор мысли, чтобы материя перестроилась сама.
        </p>
      </section>

      {/* BLOCK 3: METHOD */}
      <div className="divider">
        <div className="divider-line" />
        <div className="divider-dot" />
        <div className="divider-line" />
      </div>

      <section className="section">
        <p className="section-label mono" data-reveal>[ 02 ] — технология</p>
        <h2 className="section-title" data-reveal data-delay="1">ТЕХНОЛОГИЯ:<br />МЕТАСИНХРОНИКА</h2>
        <div className="method-card" data-reveal data-delay="2">
          <p className="section-text">
            Классическая психология работает с прошлым. Мы работаем с Вероятностью.
          </p>
          <p className="section-text">
            Метасинхроника — это инженерная настройка связи с космическим разумом.
          </p>
          <p className="section-text">
            Это способ удалить вирусы страха и сомнений из своего биокомпьютера и загрузить чистый опыт желаемого будущего.
          </p>
          <p className="section-text" style={{marginBottom: 0, fontFamily: 'Space Mono, monospace', fontSize: '0.72rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.25)'}}>
            без эзотерики. без религии. только физика сознания.
          </p>
        </div>
      </section>

      {/* BLOCK 4: FOUNDER */}
      <div className="divider">
        <div className="divider-line" />
        <div className="divider-dot" />
        <div className="divider-line" />
      </div>

      <section className="section">
        <p className="section-label mono" data-reveal>[ 03 ] — от архитектора</p>
        <h2 className="section-title" data-reveal data-delay="1">ОТ АРХИТЕКТОРА</h2>
        <p className="section-text" data-reveal data-delay="2">
          Я — Адизель Оазьес.
        </p>
        <p className="section-text" data-reveal data-delay="3">
          Моя цель — не собрать последователей. Моя цель — активировать Лидеров.
        </p>
        <p className="section-text" data-reveal data-delay="4">
          Я создаю этот проект, чтобы ты мог построить свой собственный автономный оазис — зону высокой частоты, которая исцелит пространство вокруг тебя.
        </p>
        <p className="section-text" style={{color: 'rgba(255,255,255,0.35)', fontStyle: 'italic'}} data-reveal data-delay="4">
          Семью. Бизнес. Мир.
        </p>
        <p className="founder-name" data-reveal data-delay="4">— адизель оазьес</p>
      </section>

      {/* BLOCK 5: CTA */}
      <div className="divider">
        <div className="divider-line" />
        <div className="divider-dot" />
        <div className="divider-line" />
      </div>

      <div className="cta-section">
        <p className="section-label mono" data-reveal>[ 04 ] — доступ</p>
        <p className="cta-text" data-reveal data-delay="1">
          Доступ к системе открывается поэтапно.<br />
          Оставь свой сигнал, чтобы быть первым,<br />кто получит ключ.
        </p>

        {!sent ? (
          <form className="email-form" onSubmit={handleSubmit} data-reveal data-delay="2">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="email.address"
              className="email-input"
              required
            />
            <button type="submit" className="cta-btn">
              отправить сигнал
            </button>
          </form>
        ) : (
          <p className="success-msg">сигнал принят. ожидай ключ.</p>
        )}
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <p className="footer-text">
          oazyse° &nbsp;·&nbsp; институт сознания космического разума &nbsp;·&nbsp; метафрактализм
        </p>
      </footer>
    </div>
  );
};

export default TestLanding;
