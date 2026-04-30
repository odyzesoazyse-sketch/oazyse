import { useEffect } from 'react';
import Header from '@/components/Header';

const useCursorTrail = () => {
  useEffect(() => {
    const canUseTrail =
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!canUseTrail) return;

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
    padding-bottom: calc(5.25rem + env(safe-area-inset-bottom));
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
    max-width: min(42rem, 100%);
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
    border: 1px solid hsl(var(--border)/0.65);
    border-radius: 34px;
    padding: 2.25rem;
    position: relative;
    overflow: hidden;
    background:
      linear-gradient(180deg, hsl(var(--background)/0.98), hsl(var(--card)/0.84));
    backdrop-filter: blur(10px);
    box-shadow: 0 18px 60px hsl(var(--neon-purple)/0.05);
  }
  .l-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(135deg, hsl(var(--neon-purple)/0.18), transparent 32%, hsl(var(--neon-green)/0.14));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  .l-card-hover {
    border: 1px solid hsl(var(--border)/0.55);
    border-radius: 30px;
    padding: 1.6rem;
    position: relative;
    overflow: hidden;
    background:
      linear-gradient(180deg, hsl(var(--background)/0.97), hsl(var(--card)/0.82));
    backdrop-filter: blur(10px);
    transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
    cursor: default;
  }
  .l-card-hover::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(135deg, hsl(var(--neon-purple)/0.14), transparent 40%, hsl(var(--neon-green)/0.12));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
  .l-card-hover:hover {
    border-color: hsl(var(--neon-purple)/0.22);
    box-shadow: 0 18px 60px hsl(var(--neon-purple)/0.07);
    transform: translateY(-3px);
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
    gap: 1rem;
  }
  @media (min-width: 640px) {
    .l-three-grid { grid-template-columns: repeat(3, 1fr); }
  }

  @media (max-width: 760px) {
    .l-book-grid {
      grid-template-columns: 1fr !important;
      text-align: center;
    }
    .l-book-grid .l-title {
      text-align: center;
    }
  }

  .l-orbit-system {
    position: relative;
    margin-top: 3rem;
  }

  .l-orbit-visual {
    position: relative;
    width: min(100%, 780px);
    aspect-ratio: 1 / 1;
    margin: 0 auto;
  }

  .l-orbit-glow {
    position: absolute;
    inset: 14%;
    border-radius: 50%;
    background:
      radial-gradient(circle, hsl(var(--neon-purple)/0.12) 0%, hsl(var(--neon-green)/0.06) 24%, transparent 62%);
    filter: blur(18px);
    pointer-events: none;
  }

  .l-orbit-ring {
    position: absolute;
    border-radius: 50%;
    border: 1px solid hsl(var(--border)/0.45);
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow:
      inset 0 0 0 1px hsl(var(--background)/0.35),
      0 0 40px hsl(var(--neon-purple)/0.03);
  }

  .l-orbit-ring::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    background: conic-gradient(
      from 180deg,
      transparent 0deg,
      hsl(var(--neon-purple)/0.14) 70deg,
      transparent 150deg,
      transparent 210deg,
      hsl(var(--neon-green)/0.12) 300deg,
      transparent 360deg
    );
    -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 1px), #fff calc(100% - 1px));
    mask: radial-gradient(farthest-side, transparent calc(100% - 1px), #fff calc(100% - 1px));
    pointer-events: none;
  }

  .l-orbit-core {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: clamp(150px, 24vw, 220px);
    height: clamp(150px, 24vw, 220px);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 1.5rem;
    background:
      radial-gradient(circle at 30% 30%, hsl(var(--neon-purple)/0.22), transparent 55%),
      radial-gradient(circle at 70% 70%, hsl(var(--neon-green)/0.18), transparent 58%),
      linear-gradient(180deg, hsl(var(--background)/0.96), hsl(var(--card)/0.78));
    border: 1px solid hsl(var(--border)/0.55);
    box-shadow:
      0 0 0 10px hsl(var(--neon-purple)/0.04),
      0 24px 80px hsl(var(--foreground)/0.06);
    z-index: 2;
  }

  .l-orbit-core::before {
    content: '';
    position: absolute;
    inset: 8px;
    border-radius: inherit;
    border: 1px solid hsl(var(--neon-purple)/0.18);
    pointer-events: none;
  }

  .l-orbit-core-title {
    display: block;
    font-size: 0.72rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: hsl(var(--neon-purple));
    margin-bottom: 0.8rem;
  }

  .l-orbit-core-text {
    margin: 0;
    font-size: 0.82rem;
    line-height: 1.8;
    color: hsl(var(--muted-foreground));
  }

  .l-orbit-point {
    position: absolute;
    z-index: 3;
    width: min(220px, 34vw);
  }

  .l-orbit-point::before {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: linear-gradient(135deg, hsl(var(--neon-purple)), hsl(var(--neon-green)));
    box-shadow: 0 0 0 8px hsl(var(--neon-purple)/0.08);
  }

  .l-orbit-card {
    position: relative;
    padding: 1rem 1.1rem 1rem 1.2rem;
    border-radius: 22px;
    border: 1px solid hsl(var(--border)/0.52);
    background:
      linear-gradient(180deg, hsl(var(--background)/0.9), hsl(var(--card)/0.72));
    backdrop-filter: blur(12px);
    box-shadow: 0 16px 40px hsl(var(--foreground)/0.04);
  }

  .l-orbit-name {
    display: block;
    font-size: 0.62rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: hsl(var(--neon-purple));
    margin-bottom: 0.45rem;
  }

  .l-orbit-copy {
    margin: 0;
    font-size: 0.78rem;
    line-height: 1.7;
    color: hsl(var(--muted-foreground));
  }

  .l-orbit-person {
    top: 13%;
    right: 12%;
  }
  .l-orbit-person::before {
    left: -18px;
    top: 26px;
  }

  .l-orbit-family {
    top: 30%;
    left: 4%;
  }
  .l-orbit-family::before {
    right: -18px;
    top: 24px;
  }

  .l-orbit-circle {
    top: 53%;
    right: 3%;
  }
  .l-orbit-circle::before {
    left: -18px;
    top: 24px;
  }

  .l-orbit-teams {
    bottom: 20%;
    left: 10%;
  }
  .l-orbit-teams::before {
    right: -18px;
    top: 24px;
  }

  .l-orbit-world {
    bottom: 8%;
    right: 13%;
  }
  .l-orbit-world::before {
    left: -18px;
    top: 24px;
  }

  .l-orbit-ledger {
    margin-top: 2.25rem;
    display: grid;
    gap: 0.9rem 2rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .l-orbit-ledger-item {
    display: grid;
    grid-template-columns: 16px minmax(0, 1fr);
    gap: 0.8rem;
    align-items: start;
  }

  .l-orbit-ledger-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-top: 0.52rem;
    background: linear-gradient(135deg, hsl(var(--neon-purple)), hsl(var(--neon-green)));
    box-shadow: 0 0 0 5px hsl(var(--neon-purple)/0.07);
  }

  .l-orbit-ledger-title {
    display: block;
    font-size: 0.62rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: hsl(var(--foreground));
    margin-bottom: 0.35rem;
  }

  .l-orbit-ledger-text {
    margin: 0;
    font-size: 0.8rem;
    line-height: 1.75;
    color: hsl(var(--muted-foreground));
  }

  .l-breath {
    display: grid;
    gap: 1rem;
    justify-items: center;
    margin-top: 1rem;
  }

  .l-breath-line {
    margin: 0;
    font-size: clamp(1rem, 2.2vw, 1.35rem);
    line-height: 1.55;
    letter-spacing: -0.01em;
    color: hsl(var(--foreground)/0.86);
    text-align: center;
    max-width: 34rem;
  }

  .l-manifest-lines {
    margin-top: 2rem;
    display: grid;
    gap: 0.85rem;
    justify-items: center;
  }

  .l-manifest-line {
    margin: 0;
    font-size: clamp(0.92rem, 1.8vw, 1.08rem);
    line-height: 1.7;
    color: hsl(var(--muted-foreground));
    text-align: center;
    max-width: 42rem;
  }

  .l-source-stream {
    margin-top: 2.5rem;
    display: grid;
    gap: 1.25rem;
  }

  .l-source-item {
    padding: 0 0 1.25rem;
    border-bottom: 1px solid hsl(var(--border)/0.55);
  }

  .l-source-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .l-source-title {
    display: block;
    margin-bottom: 0.45rem;
    font-size: 0.66rem;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: hsl(var(--neon-purple));
  }

  .l-source-text {
    margin: 0;
    font-size: 0.84rem;
    line-height: 1.9;
    color: hsl(var(--muted-foreground));
  }

  .l-river {
    display: grid;
    gap: 1.5rem 2.5rem;
    margin-top: 2.5rem;
  }

  .l-river-block {
    padding-top: 1.25rem;
    border-top: 1px solid hsl(var(--border)/0.45);
  }

  .l-river-title {
    display: block;
    margin-bottom: 0.55rem;
    font-size: 0.64rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: hsl(var(--neon-purple));
  }

  .l-river-text {
    margin: 0;
    font-size: 0.86rem;
    line-height: 1.95;
    color: hsl(var(--muted-foreground));
  }

  .l-wave {
    display: grid;
    gap: 0;
    border-top: 1px solid hsl(var(--border)/0.6);
    border-bottom: 1px solid hsl(var(--border)/0.6);
  }

  .l-wave-row {
    display: grid;
    grid-template-columns: 64px minmax(110px, 0.45fr) minmax(0, 1fr);
    gap: 1.5rem;
    align-items: baseline;
    padding: 1.35rem 0;
    border-bottom: 1px solid hsl(var(--border)/0.45);
  }

  .l-wave-row:last-child {
    border-bottom: none;
  }

  .l-wave-num {
    font-size: 0.6rem;
    letter-spacing: 0.24em;
    color: hsl(var(--neon-purple));
  }

  .l-wave-title {
    font-size: clamp(1.2rem, 3vw, 2.1rem);
    letter-spacing: -0.04em;
    color: hsl(var(--foreground));
  }

  .l-wave-text {
    margin: 0;
    font-size: 0.88rem;
    line-height: 1.9;
    color: hsl(var(--muted-foreground));
  }

  @media (min-width: 840px) {
    .l-river {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 899px) {
    .l-orbit-visual {
      aspect-ratio: auto;
      min-height: 620px;
    }

    .l-orbit-point {
      width: min(220px, 58vw);
    }

    .l-orbit-person {
      top: 6%;
      right: 4%;
    }

    .l-orbit-family {
      top: 22%;
      left: 0;
    }

    .l-orbit-circle {
      top: 48%;
      right: 0;
    }

    .l-orbit-teams {
      bottom: 14%;
      left: 0;
    }

    .l-orbit-world {
      bottom: 0;
      right: 3%;
    }

    .l-orbit-ledger {
      grid-template-columns: 1fr;
    }

    .l-breath-line {
      max-width: 100%;
    }
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
    text-align: center;
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
    text-align: center;
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

  @media (hover: none), (pointer: coarse) {
    .ls-root,
    .l-btn,
    .l-btn-ghost,
    .l-nav-link {
      cursor: auto;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      scroll-behavior: auto !important;
      transition-duration: 0.001ms !important;
    }

    [data-reveal] {
      opacity: 1;
      transform: none;
    }
  }

  @media (max-width: 760px) {
    .ls-root {
      padding-bottom: calc(7.5rem + env(safe-area-inset-bottom));
    }

    .ls-orb {
      width: 118vw;
      height: 360px;
      top: -90px;
      opacity: 0.75;
    }

    .l-hero {
      min-height: min(82vh, 680px);
      padding: 7.9rem 1.1rem 4.9rem !important;
      justify-content: center;
    }

    .l-logo {
      font-size: clamp(3.25rem, 18vw, 5.75rem);
      letter-spacing: 0.02em;
      margin-bottom: 1.4rem;
    }

    .l-hero-title {
      font-size: clamp(2.2rem, 14vw, 4rem);
      letter-spacing: 0.01em;
      margin-bottom: 1.15rem;
    }

    .l-hero-sub {
      font-size: 0.68rem;
      line-height: 1.75;
      letter-spacing: 0.14em;
      margin-bottom: 2.5rem;
      max-width: 20rem;
    }

    .l-hero-tag {
      width: min(100% - 2rem, 21rem);
      bottom: 0.8rem;
      white-space: normal;
      line-height: 1.7;
    }

    .l-hero-line {
      height: 54px;
      margin-bottom: 1.8rem;
    }

    .l-section,
    .l-section-wide,
    .l-cta {
      padding: 4.1rem 1.1rem;
    }

    .l-section,
    .l-section-wide,
    .l-divider,
    .l-cta {
      max-width: 100%;
    }

    .l-label {
      font-size: 0.54rem;
      letter-spacing: 0.18em;
      line-height: 1.8;
      margin-bottom: 1.65rem;
    }

    .l-title {
      font-size: clamp(1.85rem, 9.5vw, 2.65rem);
      line-height: 1.08;
      margin-bottom: 1.65rem;
    }

    .l-text {
      font-size: 0.92rem;
      line-height: 1.82;
    }

    .l-card,
    .l-card-hover {
      border-radius: 26px;
      padding: 1.35rem !important;
    }

    .l-card-hover {
      flex-direction: column !important;
      gap: 0.85rem !important;
    }

    .l-card-hover > span {
      min-width: 0 !important;
      padding-top: 0 !important;
    }

    .l-section div[style*="grid-template-columns: 1fr 1fr"],
    .l-section-wide div[style*="grid-template-columns: 1fr 1fr"],
    .l-section div[style*="grid-template-columns: 96px 1fr"],
    .l-section-wide div[style*="grid-template-columns: 96px 1fr"] {
      grid-template-columns: 1fr !important;
    }

    .l-section div[style*="display: flex"],
    .l-section-wide div[style*="display: flex"],
    .l-cta div[style*="display: flex"] {
      max-width: 100%;
    }

    .l-btn {
      width: min(100%, 22rem);
      padding: 0.95rem 1.1rem;
      letter-spacing: 0.14em;
      font-size: 0.62rem;
    }

    .l-btn-ghost {
      width: min(100%, 22rem);
      padding: 0.65rem 0.5rem;
      line-height: 1.55;
    }

    .l-divider {
      padding: 0 1.1rem;
      gap: 1rem;
    }

    .l-book-grid {
      grid-template-columns: 1fr !important;
      text-align: center;
      gap: 1.75rem !important;
    }

    .l-book-grid .l-title {
      text-align: center;
    }

    .l-orbit-system {
      margin-top: 2rem;
    }

    .l-orbit-visual {
      aspect-ratio: auto;
      min-height: auto;
      display: grid;
      gap: 0.85rem;
      margin-top: 1.5rem;
    }

    .l-orbit-ring,
    .l-orbit-glow {
      display: none;
    }

    .l-orbit-core,
    .l-orbit-point {
      position: relative;
      inset: auto !important;
      left: auto !important;
      top: auto !important;
      right: auto !important;
      bottom: auto !important;
      transform: none;
      width: 100%;
      height: auto;
      border-radius: 24px;
      padding: 1.25rem;
    }

    .l-orbit-point::before {
      display: none;
    }

    .l-orbit-card {
      padding: 1.1rem;
      border-radius: 22px;
    }

    .l-river {
      gap: 1rem;
    }

    .l-wave-row {
      grid-template-columns: 1fr;
      gap: 0.45rem;
      padding: 1.25rem 0;
    }

    .l-wave-title {
      font-size: 1.55rem;
      line-height: 1.05;
    }

    .l-footer {
      padding: 2.5rem 1.1rem 1.25rem;
    }

    .l-footer > div {
      flex-wrap: wrap;
      gap: 1rem !important;
    }
  }

`;

interface LandingShellProps {
  children: React.ReactNode;
  withHeader?: boolean;
  withFooter?: boolean;
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

const LandingShell = ({ children, withHeader = true, withFooter = true }: LandingShellProps) => {
  useCursorTrail();
  useReveal();

  return (
    <div className="ls-root">
      <style>{SHELL_CSS}</style>
      <div className="ls-orb" />
      {withHeader && <Header />}
      {children}
      {withFooter && <Footer />}
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
