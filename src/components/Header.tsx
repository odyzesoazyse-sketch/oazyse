import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-md z-50 border-b border-border">
      <div className="flex items-center justify-between h-14 px-6 md:px-12">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <span className="font-display text-2xl md:text-3xl tracking-tight">
            OAZYSE
          </span>
          <span className="hidden md:block h-4 w-px bg-border" />
          <span className="hidden md:block yeezy-label text-muted-foreground">
            {t('header.title')}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <LanguageSwitcher />
          {user ? (
            <button
              onClick={() => signOut()}
              className="p-3 hover:bg-muted transition-colors"
              aria-label="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          ) : (
            <Link
              to="/auth"
              className="p-3 hover:bg-muted transition-colors"
              aria-label="Sign in"
            >
              <User className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;