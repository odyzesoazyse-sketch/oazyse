import { useEffect } from 'react';
import Header from '@/components/Header';

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
      { threshold: 0.12 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

const SHELL_CSS = `
  .ls-root {
    background: hsl(var(--background));
    color: hsl(var(--foreground));
    font-family: 'Questrial', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
    cursor: none;
  }

  .ls-orb {
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
    animation: ls-orb-pulse 10s ease-in-out infinite;
  }
  .dark .ls-orb {
    background: radial-gradient(ellipse, hsl(var(--neon-purple)/0.08) 0%, transparent 70%);
  }
  @keyframes ls-orb-pulse {
    0%, 100% { opacity: 0.6; transform: translateX(-50%) scale(1); }
    50% { opacity: 1; transform: translateX(-50%) scale(1.08); }
  }

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

  .l-hero-title {
    font-family: 'Questrial', sans-serif;
    font-size: clamp(2rem, 7vw, 5rem);
    font-weight: 400;
    letter-spacing: 0.04em;
    background: linear-gradient(to right, hsl(var(--neon-purple)), hsl(var(--neon-green)));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.1;
    margin-bottom: 1.5rem;
  }

  .l-hero-sub {
    font-size: clamp(0.75rem, 2vw, 0.9rem);
    font-weight: 400;
    letter-spacing: 0.3em;
    text-transform: lowercase;
    color: hsl(var(--muted-foreground));
    margin-bottom: 4rem;
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
    margin: 0 auto 3rem;
  }

  .l-section {
    position: relative;
    z-index: 2;
    max-width: 680px;
    margin: 0 auto;
    padding: 7rem 2rem;
  }

  .l-section-wide {
    position: relative;
    z-index: 2;
    max-width: 880px;
    margin: 0 auto;
    padding: 7rem 2rem;
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

  .l-card-hover {
    border: 1px solid hsl(var(--border));
    padding: 2rem;
    position: relative;
    overflow: hidden;
    background: hsl(var(--card));
    transition: border-color 0.3s, box-shadow 0.3s;
    cursor: default;
  }
  .l-card-hover::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, hsl(var(--neon-purple)/0.3), transparent);
    transition: background 0.3s;
  }
  .l-card-hover:hover {
    border-color: hsl(var(--neon-purple)/0.3);
    box-shadow: 0 0 30px hsl(var(--neon-purple)/0.05);
  }
  .l-card-hover:hover::before {
    background: linear-gradient(to right, transparent, hsl(var(--neon-purple)/0.6), hsl(var(--neon-green)/0.4), transparent);
  }

  .l-mono {
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    color: hsl(var(--muted-foreground)/0.6);
    text-transform: lowercase;
    line-height: 1.8;
  }

  .l-three-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1px;
    background: hsl(var(--border));
  }
  @media (min-width: 640px) {
    .l-three-grid { grid-template-columns: repeat(3, 1fr); }
  }

  .l-price-card {
    border: 1px solid hsl(var(--border));
    padding: 2rem;
    position: relative;
    background: hsl(var(--card));
    transition: border-color 0.3s;
  }
  .l-price-card:hover { border-color: hsl(var(--neon-purple)/0.4); }
  .l-price-amount {
    font-size: clamp(1.4rem, 3vw, 2rem);
    font-weight: 400;
    background: linear-gradient(to right, hsl(var(--neon-purple)), hsl(var(--neon-green)));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.75rem;
    display: block;
    letter-spacing: -0.02em;
  }
  .l-price-desc {
    font-size: 0.8rem;
    line-height: 1.7;
    color: hsl(var(--muted-foreground));
  }

  .l-term {
    padding: 1.5rem 0;
    border-bottom: 1px solid hsl(var(--border));
  }
  .l-term:last-child { border-bottom: none; }
  .l-term-word {
    font-size: 0.85rem;
    font-weight: 400;
    background: linear-gradient(to right, hsl(var(--neon-purple)), hsl(var(--neon-green)));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
    display: block;
  }
  .l-term-def {
    font-size: 0.82rem;
    line-height: 1.8;
    color: hsl(var(--muted-foreground));
  }

  .l-founder-sig {
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    color: hsl(var(--muted-foreground)/0.5);
    margin-top: 2.5rem;
    text-transform: lowercase;
  }

  .l-cta {
    position: relative;
    z-index: 2;
    padding: 8rem 2rem;
    text-align: center;
    max-width: 520px;
    margin: 0 auto;
  }

  .l-btn {
    background: transparent;
    border: 1px solid hsl(var(--neon-purple)/0.4);
    color: hsl(var(--neon-purple));
    font-family: 'Questrial', sans-serif;
    font-size: 0.65rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    padding: 0.875rem 2.5rem;
    cursor: none;
    position: relative;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
    display: inline-block;
    text-decoration: none;
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

  .l-btn-ghost {
    background: transparent;
    border: none;
    color: hsl(var(--muted-foreground));
    font-family: 'Questrial', sans-serif;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: lowercase;
    padding: 0.5rem 0;
    cursor: none;
    transition: color 0.3s;
    display: inline-block;
    text-decoration: none;
  }
  .l-btn-ghost:hover { color: hsl(var(--foreground)); }

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

  .l-nav {
    position: relative;
    z-index: 2;
    max-width: 880px;
    margin: 0 auto;
    padding: 1.5rem 2rem 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem 1.5rem;
    justify-content: center;
  }
  .l-nav-link {
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    color: hsl(var(--muted-foreground)/0.5);
    text-transform: lowercase;
    text-decoration: none;
    transition: color 0.3s;
    cursor: none;
    padding: 0.25rem 0;
  }
  .l-nav-link:hover { color: hsl(var(--neon-purple)); }
`;

interface LandingShellProps {
  children: React.ReactNode;
  withHeader?: boolean;
}

const Footer = () => (
  <footer className="l-footer">
    <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginBottom: '2rem' }}>
      <a href="https://t.me/oazyse" target="_blank" rel="noopener noreferrer" className="l-nav-link">telegram</a>
      <a href="https://instagram.com/oazyse" target="_blank" rel="noopener noreferrer" className="l-nav-link">instagram</a>
      <a href="https://youtube.com/@oazyse" target="_blank" rel="noopener noreferrer" className="l-nav-link">youtube</a>
    </div>
    <p className="l-footer-text">
      oazyse° &nbsp;·&nbsp; институт сознания космического разума &nbsp;·&nbsp; метафрактализм
    </p>
  </footer>
);

const LandingShell = ({ children, withHeader = true }: LandingShellProps) => {
  useCursorTrail();
  useReveal();

  return (
    <div className="ls-root">
      <style>{SHELL_CSS}</style>
      <div className="ls-orb" />
      {withHeader && <Header />}
      {children}
      <Footer />
    </div>
  );
};

const Divider = () => (
  <div className="l-divider">
    <div className="l-div-line" />
    <div className="l-div-dot" />
    <div className="l-div-line" />
  </div>
);

export default LandingShell;
export { useCursorTrail, useReveal, SHELL_CSS, Divider };
