import { useEffect, useMemo, useState } from 'react';
import LandingShell from '@/components/LandingShell';

const COUNTDOWN_HOURS = 20;
const COUNTDOWN_MS = COUNTDOWN_HOURS * 60 * 60 * 1000;

const TIMER_CSS = `
  .o-home {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: stretch;
    justify-content: center;
    padding: 0 1.25rem;
    text-align: center;
    z-index: 2;
  }

  .o-home-copy {
    width: min(100%, 54rem);
    margin: auto;
    padding: 8rem 0 6rem;
  }

  .o-home-eyebrow {
    margin: 0 0 2rem;
    font-size: clamp(0.58rem, 0.9vw, 0.68rem);
    line-height: 1.8;
    letter-spacing: 0.2em;
    text-transform: lowercase;
    color: hsl(var(--muted-foreground) / 0.4);
  }

  .o-home-subtitle {
    margin: 1.25rem auto 0;
    width: min(100%, 32rem);
    font-size: clamp(0.72rem, 1.2vw, 0.88rem);
    line-height: 1.75;
    letter-spacing: 0.22em;
    text-transform: lowercase;
    color: hsl(var(--muted-foreground));
  }

  .o-launch {
    width: min(100%, 12.5rem);
    margin: 3rem auto 0;
    z-index: 3;
  }

  .o-launch-grid {
    display: grid;
    grid-template-columns: 2.6ch auto 2.6ch auto 2.6ch;
    align-items: center;
    justify-items: center;
    justify-content: center;
    column-gap: 0.7rem;
  }

  .o-launch-cell {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .o-launch-value {
    display: block;
    width: 2.6ch;
    text-align: center;
    font-family: 'Questrial', sans-serif;
    font-size: clamp(1rem, 1.5vw, 1.18rem);
    font-weight: 400;
    line-height: 1;
    letter-spacing: 0.04em;
    font-variant-numeric: tabular-nums;
    color: hsl(var(--foreground));
    animation: o-launch-shift 520ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .o-launch-divider {
    width: 1px;
    min-height: 0.9rem;
    background: hsl(var(--foreground) / 0.12);
    opacity: 1;
    flex-shrink: 0;
  }

  @keyframes o-launch-shift {
    0% {
      opacity: 0;
      transform: translateY(10px) scale(0.96);
      filter: blur(4px);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0);
    }
  }

  @media (max-width: 760px) {
    .o-home {
      padding: 0 1rem;
      min-height: 100svh;
    }

    .o-home-copy {
      padding: 7.75rem 0 5rem;
    }

    .o-home-eyebrow {
      margin-bottom: 1.5rem;
      letter-spacing: 0.14em;
      line-height: 1.7;
    }

    .o-home-subtitle {
      margin-top: 0.9rem;
      max-width: 18rem;
      font-size: 0.72rem;
      letter-spacing: 0.14em;
      line-height: 1.75;
    }

    .o-launch {
      width: min(100%, 10.75rem);
      margin-top: 2.2rem;
    }

    .o-launch-grid {
      grid-template-columns: 2.2ch auto 2.2ch auto 2.2ch;
      column-gap: 0.42rem;
    }

    .o-launch-divider {
      min-height: 0.78rem;
    }

    .o-launch-value {
      width: 2.2ch;
      font-size: 0.92rem;
      letter-spacing: 0.03em;
    }
  }
`;

const formatTimeLeft = (targetTime: number, now: number) => {
  const distance = Math.max(0, targetTime - now);
  const hours = Math.floor(distance / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return {
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  };
};

const TimerCell = ({ value }: { value: string }) => (
  <div className="o-launch-cell">
    <span key={value} className="o-launch-value">
      {value}
    </span>
  </div>
);

const Index = () => {
  const targetTime = useMemo(() => Date.now() + COUNTDOWN_MS, []);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const timeLeft = formatTimeLeft(targetTime, now);

  return (
    <LandingShell withHeader={false} withFooter={false}>
      <style>{TIMER_CSS}</style>

      <section className="o-home">
        <div className="o-home-copy">
          <div data-reveal>
            <p className="o-home-eyebrow">институт сознания космического разума открывает миру</p>
            <h1 className="l-logo" style={{ marginBottom: 0, letterSpacing: '0.04em' }}>oazyse°</h1>
          </div>
          <p className="o-home-subtitle" data-reveal data-delay="1">
            архитектура нового сознания.
          </p>

          <div className="o-launch" data-reveal data-delay="2">
            <div className="o-launch-grid">
              <TimerCell value={timeLeft.hours} />
              <div className="o-launch-divider" />
              <TimerCell value={timeLeft.minutes} />
              <div className="o-launch-divider" />
              <TimerCell value={timeLeft.seconds} />
            </div>
          </div>
        </div>
      </section>
    </LandingShell>
  );
};

export default Index;
