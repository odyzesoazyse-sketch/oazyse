import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, LogOut, Settings } from 'lucide-react';
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
                    <User className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-background border-border z-50">
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="flex items-center gap-2 cursor-pointer">
                        <Settings className="w-4 h-4" />
                        <span>Админ</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link to="/member" className="flex items-center gap-2 cursor-pointer">
                      <Settings className="w-4 h-4" />
                      <span>Настройки</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()} className="flex items-center gap-2 cursor-pointer">
                    <LogOut className="w-4 h-4" />
                    <span>Выйти</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth" className="p-1 text-foreground hover:text-foreground/70 transition-colors">
                <User className="w-4 h-4" strokeWidth={1.5} />
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