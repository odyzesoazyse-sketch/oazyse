import { useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { CalendarDays, House, LogOut, User } from 'lucide-react';
import LandingShell, { Divider } from '@/components/LandingShell';

const MemberDashboard = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth', { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground animate-pulse font-light tracking-wide">
          Загрузка...
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const navItems = [
    { path: '/member', icon: House, label: 'пространство', exact: true },
    { path: '/member/sessions', icon: CalendarDays, label: 'мои сессии' },
    { path: '/member/profile', icon: User, label: 'профиль' },
  ];

  const isActive = (path: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/', { replace: true });
  };

  return (
    <LandingShell>
      <section className="l-hero" style={{ minHeight: '34vh', paddingTop: '7rem' }}>
        <div className="text-center space-y-3" data-reveal>
          <p className="l-label" style={{ marginBottom: '1.5rem' }}>пространство участника</p>
          <h1 className="l-hero-title">внутри oazyse°<br />сайт остаётся с тобой.</h1>
          <p className="l-hero-sub">всё, что связано с профилем и сессиями, теперь живёт внутри той же оболочки сайта.</p>
        </div>
      </section>

      <Divider />

      <section className="l-section" style={{ paddingTop: '3.25rem', paddingBottom: '9rem', maxWidth: '860px' }}>
        <div className="mb-8 flex flex-wrap items-center gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.68rem] uppercase tracking-[0.18em] transition-colors ${
                isActive(item.path, item.exact)
                  ? 'border-neon-purple/40 bg-gradient-to-r from-neon-purple/12 to-neon-green/10 text-foreground'
                  : 'border-border/70 text-muted-foreground hover:text-foreground'
              }`}
            >
              <item.icon className="h-3.5 w-3.5" strokeWidth={1.7} />
              <span>{item.label}</span>
            </NavLink>
          ))}
          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 rounded-full border border-border/70 px-4 py-2 text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <LogOut className="h-3.5 w-3.5" strokeWidth={1.7} />
            <span>выйти</span>
          </button>
        </div>

        <Outlet />
      </section>
    </LandingShell>
  );
};

export default MemberDashboard;
