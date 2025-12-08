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
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md z-50 border-b border-border/30">
      <div className="max-w-4xl mx-auto px-5 md:px-8">
        <div className="flex justify-end items-center gap-1 py-3 border-b border-border/20">
          <ThemeToggle />
          <LanguageSwitcher />
          {user ? (
            <button
              onClick={() => signOut()}
              className="p-2.5 hover:bg-muted/50 rounded-sm transition-colors"
              aria-label="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          ) : (
            <Link
              to="/auth"
              className="p-2.5 hover:bg-muted/50 rounded-sm transition-colors"
              aria-label="Sign in"
            >
              <User className="w-4 h-4" />
            </Link>
          )}
        </div>
        
        <div className="py-5 text-center">
          <p className="text-[10px] md:text-xs text-muted-foreground tracking-[0.2em] uppercase mb-2">
            {t('header.title')}
          </p>
          <p className="text-muted-foreground/60 text-[10px] tracking-wider mb-1">
            {t('header.presents')}
          </p>
          <h1 className="font-serif italic text-2xl md:text-3xl tracking-wide">
            Oazyse
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
