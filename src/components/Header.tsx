import { Link } from 'react-router-dom';
import { User, LogOut, Settings } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';

const Header = () => {
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdmin();

  return (
    <header className="fixed top-0 left-0 right-0 bg-background z-50">
      <div className="flex items-center justify-between h-6 px-4">
        <span className="text-xs tracking-wide font-normal bg-gradient-to-r from-neon-purple to-neon-green bg-clip-text text-transparent" style={{ fontFamily: 'Questrial, sans-serif' }}>oazyse°</span>
        <div className="flex items-center">
          <ThemeToggle />
          <LanguageSwitcher />
          {isAdmin && (
            <Link to="/admin" className="p-1.5 text-neon-purple hover:text-neon-green transition-colors">
              <Settings className="w-3 h-3" />
            </Link>
          )}
          {user ? (
            <button onClick={() => signOut()} className="p-1.5 text-neon-purple hover:text-neon-green transition-colors">
              <LogOut className="w-3 h-3" />
            </button>
          ) : (
            <Link to="/auth" className="p-1.5 text-neon-purple hover:text-neon-green transition-colors">
              <User className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>
      <div className="h-[1px] bg-gradient-to-r from-transparent via-neon-purple to-transparent animate-neon-line-pulse" />
    </header>
  );
};

export default Header;