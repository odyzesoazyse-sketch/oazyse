import { Link } from 'react-router-dom';
import { User, LogOut, Settings, Sparkles } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';

const Header = () => {
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdmin();

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-xl z-50 border-b border-border/50">
      <div className="flex items-center justify-between h-14 px-6 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:shadow-[0_0_20px_hsl(var(--neon-purple)/0.5)] transition-shadow">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight text-gradient">OAZYSE</span>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <LanguageSwitcher />
          
          {isAdmin && (
            <Link 
              to="/admin" 
              className="p-2.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            >
              <Settings className="w-4 h-4" />
            </Link>
          )}
          
          {user ? (
            <button 
              onClick={() => signOut()} 
              className="p-2.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            >
              <LogOut className="w-4 h-4" />
            </button>
          ) : (
            <Link 
              to="/auth" 
              className="ml-2 btn-accent text-xs"
            >
              Sign up
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;