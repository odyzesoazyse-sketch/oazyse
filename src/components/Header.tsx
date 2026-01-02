import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut, Settings } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';
import { Stories, StoriesTrigger, hasNewStories } from './Stories';

const Header = () => {
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdmin();
  const [storiesOpen, setStoriesOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-background z-50">
        <div className="flex items-center justify-between h-7 px-4">
          {/* Left - Stories trigger */}
          <div className="flex-1 flex items-center">
            <StoriesTrigger 
              onClick={() => setStoriesOpen(true)} 
              hasNew={hasNewStories()} 
            />
          </div>
          
          {/* Center - Logo */}
          <span className="text-sm tracking-wide font-normal bg-gradient-to-r from-neon-purple to-neon-green bg-clip-text text-transparent" style={{ fontFamily: 'Questrial, sans-serif' }}>
            oazyse°
          </span>
          
          {/* Right - Actions */}
          <div className="flex-1 flex items-center justify-end">
            <ThemeToggle />
            <LanguageSwitcher />
            {isAdmin && (
              <Link to="/admin" className="p-1.5 text-neon-purple hover:text-neon-green transition-colors">
                <Settings className="w-3.5 h-3.5" />
              </Link>
            )}
            {user ? (
              <button onClick={() => signOut()} className="p-1.5 text-neon-purple hover:text-neon-green transition-colors">
                <LogOut className="w-3.5 h-3.5" />
              </button>
            ) : (
              <Link to="/auth" className="p-1.5 text-neon-purple hover:text-neon-green transition-colors">
                <User className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
        <div className="h-[1px] bg-gradient-to-r from-transparent via-neon-purple to-transparent animate-neon-line-pulse" />
      </header>
      
      {/* Stories modal */}
      <Stories isOpen={storiesOpen} onClose={() => setStoriesOpen(false)} />
    </>
  );
};

export default Header;