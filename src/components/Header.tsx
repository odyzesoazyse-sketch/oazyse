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
    <header className="fixed top-0 left-0 right-0 bg-background/90 backdrop-blur-sm z-50 border-b border-border/30">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-end gap-1 mb-2">
          <ThemeToggle />
          <LanguageSwitcher />
          {user ? (
            <button
              onClick={() => signOut()}
              className="p-2 hover:bg-muted/50 rounded-sm transition-colors"
              aria-label="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          ) : (
            <Link
              to="/auth"
              className="p-2 hover:bg-muted/50 rounded-sm transition-colors"
              aria-label="Sign in"
            >
              <User className="w-4 h-4" />
            </Link>
          )}
        </div>
        <div className="text-center">
          <p className="text-[9px] md:text-[10px] text-muted-foreground tracking-[0.15em] uppercase mb-0.5">
            {t('header.title')}
          </p>
          <p className="text-[9px] text-muted-foreground/50 tracking-wider mb-1">
            {t('header.presents')}
          </p>
          <h1 className="font-serif italic text-xl md:text-2xl">Oazyse</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
