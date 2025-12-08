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
    <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm z-50 py-6 px-4 border-b border-border/50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end items-center gap-2 mb-3">
          <ThemeToggle />
          <LanguageSwitcher />
          {user ? (
            <button
              onClick={() => signOut()}
              className="p-2 hover:bg-muted rounded-sm transition-colors"
              aria-label="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          ) : (
            <Link
              to="/auth"
              className="p-2 hover:bg-muted rounded-sm transition-colors"
              aria-label="Sign in"
            >
              <User className="w-4 h-4" />
            </Link>
          )}
        </div>
        <div className="text-center">
          <h1 className="text-sm md:text-base leading-relaxed tracking-wide">
            <span className="font-semibold uppercase tracking-widest text-xs md:text-sm">{t('header.title')}</span>
            <span className="text-muted-foreground mx-2">{t('header.presents')}</span>
            <span className="font-serif italic text-lg md:text-xl">Oazyse</span>
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
