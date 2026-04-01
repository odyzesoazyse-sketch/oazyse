import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LandingShell from '@/components/LandingShell';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error('404:', location.pathname);
  }, [location.pathname]);

  return (
    <LandingShell>
      <section className="l-hero" style={{ minHeight: '90vh' }}>
        <div data-reveal>
          <span className="l-label" style={{ marginBottom: '2rem', display: 'block' }}>[ 404 ]</span>
          <h1 className="l-logo" style={{ fontSize: 'clamp(2.5rem, 9vw, 6rem)' }}>страница<br />не найдена</h1>
        </div>
        <p className="l-hero-sub" data-reveal data-delay="1">
          ты ищешь что-то — но этого здесь нет.
        </p>
        <div data-reveal data-delay="2" style={{ marginTop: '1rem' }}>
          <Link to="/" className="l-btn">вернуться домой</Link>
        </div>
      </section>
    </LandingShell>
  );
};

export default NotFound;
