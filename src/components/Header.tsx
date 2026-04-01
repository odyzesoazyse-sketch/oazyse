import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import BackButton from './BackButton';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';
import { Stories, StoriesTrigger, hasNewStories } from './Stories';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdmin();
  const [storiesOpen, setStoriesOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-background z-50">
        <div className="flex items-center justify-between h-9 px-4">
          {/* Left - Back button or Stories trigger */}
          <div className="flex-1 flex items-center gap-1">
            {!isHomePage && <BackButton />}
            <StoriesTrigger 
              onClick={() => setStoriesOpen(true)} 
              hasNew={hasNewStories()} 
            />
          </div>
          
          {/* Center - Logo */}
          <span className="text-lg tracking-wide font-normal bg-gradient-to-r from-neon-purple to-neon-green bg-clip-text text-transparent" style={{ fontFamily: 'Questrial, sans-serif' }}>
            oazyse°
          </span>
          
          {/* Right - Actions */}
          <div className="flex-1 flex items-center justify-end gap-0.5">
            <ThemeToggle />
            <LanguageSwitcher />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-1 text-foreground hover:text-foreground/70 transition-colors">
                    <User className="w-3 h-3" strokeWidth={1.5} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-background border-border z-50">
                  <DropdownMenuItem onClick={() => signOut()} className="flex items-center gap-2 cursor-pointer">
                    <LogOut className="w-3 h-3" />
                    <span>Выйти</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth" className="p-1 text-foreground hover:text-foreground/70 transition-colors">
                <User className="w-3 h-3" strokeWidth={1.5} />
              </Link>
            )}
          </div>
        </div>
        <div className="h-[1px] bg-gradient-to-r from-transparent via-neon-purple to-transparent animate-neon-line-pulse" />
        {/* Public nav — hidden on /member routes */}
        {!location.pathname.startsWith('/member') && (
          <nav className="flex items-center justify-center gap-4 py-1.5 px-4 overflow-x-auto scrollbar-hide">
            {[
              { to: '/method', label: 'метод' },
              { to: '/philosophy', label: 'философия' },
              { to: '/institute', label: 'институт' },
              { to: '/projects', label: 'проекты' },
              { to: '/about', label: 'создатель' },
              { to: '/join', label: 'вступить' },
              { to: '/glossary', label: 'глоссарий' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`text-[0.55rem] tracking-[0.2em] lowercase whitespace-nowrap transition-colors ${
                  location.pathname === to
                    ? 'text-neon-purple'
                    : 'text-muted-foreground/50 hover:text-neon-purple'
                }`}
                style={{ fontFamily: 'Questrial, sans-serif' }}
              >
                {label}
              </Link>
            ))}
          </nav>
        )}
      </header>
      
      {/* Stories modal */}
      <Stories isOpen={storiesOpen} onClose={() => setStoriesOpen(false)} />
    </>
  );
};

export default Header;