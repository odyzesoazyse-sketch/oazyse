import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 bg-background z-50">
      <div className="flex items-center justify-between h-12 px-6">
        <span className="text-sm tracking-wide">OAZYSE</span>
        <div className="flex items-center">
          <ThemeToggle />
          <LanguageSwitcher />
          {user ? (
            <button onClick={() => signOut()} className="p-3 hover:opacity-50 transition-opacity">
              <LogOut className="w-4 h-4" />
            </button>
          ) : (
            <Link to="/auth" className="p-3 hover:opacity-50 transition-opacity">
              <User className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;