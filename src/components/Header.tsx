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
      <div className="max-w-4xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <p className="text-[8px] text-muted-foreground tracking-[0.12em] uppercase leading-tight">
              {t('header.title')} <span className="text-muted-foreground/40 mx-1">•</span> 
              <span className="normal-case italic font-serif text-[10px]">Oazyse</span>
            </p>
          </div>
          <div className="flex items-center gap-0.5">
            <ThemeToggle />
            <LanguageSwitcher />
            {user ? (
              <button
                onClick={() => signOut()}
                className="p-1.5 hover:bg-muted/50 rounded-sm transition-colors"
                aria-label="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            ) : (
              <Link
                to="/auth"
                className="p-1.5 hover:bg-muted/50 rounded-sm transition-colors"
                aria-label="Sign in"
              >
                <User className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
