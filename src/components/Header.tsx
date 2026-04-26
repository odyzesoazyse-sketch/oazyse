import { Link, useLocation } from 'react-router-dom';
import { House, Newspaper, Landmark, Sparkles, CircleUserRound } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import BackButton from './BackButton';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isMemberArea = location.pathname.startsWith('/member');
  const publicTabs = [
    { to: '/', label: 'главная', icon: House, accent: 'purple' },
    { to: '/news', label: 'лента', icon: Newspaper, accent: 'green' },
    { to: '/institute', label: 'институт', icon: Landmark, accent: 'mixed' },
    user
      ? { to: '/session', label: 'попробовать метод', icon: Sparkles, accent: 'purple' as const }
      : { to: '/auth', label: 'вступить', icon: CircleUserRound, accent: 'purple' as const },
  ];
  const instituteActive = ['/institute', '/method', '/philosophy', '/projects'].includes(location.pathname);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-background/92 backdrop-blur-md z-50">
        <div className="flex items-center justify-between h-9 px-3 sm:px-4">
          <div className="flex-1 flex items-center gap-1.5 min-w-0">
            {!isHomePage && <BackButton />}
            <LanguageSwitcher />
          </div>
          
          {/* Center - Logo */}
          <Link
            to="/"
            className="text-base sm:text-lg tracking-wide font-normal bg-gradient-to-r from-neon-purple to-neon-green bg-clip-text text-transparent shrink-0"
            style={{ fontFamily: 'Questrial, sans-serif' }}
          >
            oazyse°
          </Link>
          
          {/* Right - Actions */}
          <div className="flex-1 flex items-center justify-end gap-1">
            <ThemeToggle />
          </div>
        </div>
        <div className="h-[1px] bg-gradient-to-r from-transparent via-neon-purple to-transparent animate-neon-line-pulse" />
        {!isMemberArea && (
          <nav className="flex items-center justify-center gap-3 py-1.5 px-3 overflow-x-auto scrollbar-hide">
            {[
              { to: '/institute', label: 'институт', active: instituteActive },
              { to: '/about', label: 'создатель', active: location.pathname === '/about' },
            ].map(({ to, label, active }) => (
              <Link
                key={to}
                to={to}
                className={`text-[0.5rem] sm:text-[0.55rem] tracking-[0.16em] sm:tracking-[0.2em] lowercase whitespace-nowrap transition-colors ${
                  active ? 'text-neon-purple' : 'text-muted-foreground/50 hover:text-neon-purple'
                }`}
                style={{ fontFamily: 'Questrial, sans-serif' }}
              >
                {label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <nav className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom))] left-1/2 z-50 w-[min(94vw,440px)] -translate-x-1/2 rounded-full border border-border/80 bg-background/90 px-2 py-2 backdrop-blur-md shadow-[0_0_30px_hsl(var(--neon-purple)/0.08)]">
          <div className="absolute left-1/2 top-0 h-px w-24 -translate-x-1/2 bg-gradient-to-r from-transparent via-neon-green/80 to-transparent" />
          <div className="flex items-center justify-between gap-1">
            {publicTabs.map(({ to, label, icon: Icon, accent }) => {
              const active = to === '/institute'
                ? instituteActive
                : location.pathname === to;
              const iconShell = active
                ? accent === 'green'
                  ? 'border-neon-green/40 from-neon-green/14 to-neon-purple/10'
                  : accent === 'mixed'
                    ? 'border-neon-purple/40 from-neon-purple/14 to-neon-green/14'
                    : 'border-neon-purple/40 from-neon-purple/14 to-neon-green/10'
                : 'border-border/70 from-transparent to-transparent';

              const iconColor = active
                ? accent === 'green'
                  ? 'text-neon-green'
                  : 'text-neon-purple'
                : 'text-muted-foreground/70';

              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex min-w-0 flex-1 flex-col items-center gap-1 rounded-full px-2 py-2 transition-all ${
                    active
                      ? 'bg-gradient-to-r from-neon-purple/10 to-neon-green/10 text-foreground'
                      : 'text-muted-foreground/70 hover:text-foreground'
                  }`}
                  style={{ fontFamily: 'Questrial, sans-serif' }}
                >
                  <span
                    className={`relative flex h-8 w-8 items-center justify-center rounded-full border bg-gradient-to-br ${iconShell}`}
                  >
                    <span
                      className={`absolute inset-[5px] rounded-full border ${
                        active ? 'border-white/10' : 'border-transparent'
                      }`}
                    />
                    <span
                      className={`absolute h-1 w-1 rounded-full ${
                        active
                          ? accent === 'green'
                            ? 'bg-neon-green shadow-[0_0_12px_hsl(var(--neon-green)/0.7)]'
                            : 'bg-neon-purple shadow-[0_0_12px_hsl(var(--neon-purple)/0.7)]'
                          : 'bg-muted-foreground/35'
                      }`}
                    />
                    <Icon className={`relative h-3.5 w-3.5 ${iconColor}`} strokeWidth={1.7} />
                  </span>
                  <span className={`text-[0.42rem] sm:text-[0.46rem] tracking-[0.12em] sm:tracking-[0.14em] lowercase whitespace-nowrap ${active ? 'text-foreground' : ''}`}>{label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
    </>
  );
};

export default Header;
