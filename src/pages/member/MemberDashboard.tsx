import { useEffect, useState } from 'react';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Calendar, 
  ClipboardCheck, 
  BarChart3, 
  LogOut, 
  Menu, 
  X,
  Home,
  User,
  Award
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserStats {
  completedLessons: number;
  totalLessons: number;
  isCertified: boolean;
  sessionsReceived: number;
  sessionsConducted: number;
  averageRating: number;
}

const MemberDashboard = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState<UserStats>({
    completedLessons: 0,
    totalLessons: 0,
    isCertified: false,
    sessionsReceived: 0,
    sessionsConducted: 0,
    averageRating: 0
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchUserStats();
    }
  }, [user]);

  const fetchUserStats = async () => {
    if (!user) return;

    try {
      // Get total lessons
      const { data: lessons } = await supabase
        .from('lessons')
        .select('id')
        .eq('is_published', true);

      // Get completed lessons
      const { data: progress } = await supabase
        .from('lesson_progress')
        .select('id')
        .eq('user_id', user.id)
        .eq('completed', true);

      // Get certification status
      const { data: cert } = await supabase
        .from('certifications')
        .select('passed')
        .eq('user_id', user.id)
        .eq('passed', true)
        .maybeSingle();

      // Get sessions received
      const { data: received } = await supabase
        .from('session_requests')
        .select('id, session_bookings!inner(status)')
        .eq('requester_id', user.id);

      // Get sessions conducted
      const { data: conducted } = await supabase
        .from('session_bookings')
        .select('id')
        .eq('practitioner_id', user.id)
        .eq('status', 'completed');

      // Get average rating
      const { data: ratings } = await supabase
        .from('session_feedback')
        .select('rating')
        .eq('to_user_id', user.id);

      const avgRating = ratings && ratings.length > 0
        ? ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length
        : 0;

      setStats({
        completedLessons: progress?.length || 0,
        totalLessons: lessons?.length || 0,
        isCertified: !!cert?.passed,
        sessionsReceived: received?.filter(r => r.session_bookings?.some((b: any) => b.status === 'completed')).length || 0,
        sessionsConducted: conducted?.length || 0,
        averageRating: avgRating
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Загрузка...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const navItems = [
    { path: '/member', icon: Home, label: 'Главная', exact: true },
    { path: '/member/lessons', icon: BookOpen, label: 'Обучение' },
    { path: '/member/sessions', icon: Calendar, label: 'Сеансы' },
    { path: '/member/certification', icon: ClipboardCheck, label: 'Сертификация' },
    { path: '/member/stats', icon: BarChart3, label: 'Статистика' },
    { path: '/member/profile', icon: User, label: 'Профиль' },
  ];

  const isActive = (path: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border p-4 flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
        <span className="font-medium text-primary">Метасинхроника</span>
        <Button variant="ghost" size="icon" onClick={handleSignOut}>
          <LogOut className="w-5 h-5" />
        </Button>
      </header>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-40 transform transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Award className="w-4 h-4 text-primary" />
            </div>
            <span className="font-semibold text-foreground">Метасинхроника</span>
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive(item.path, item.exact)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Stats summary */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-muted/50">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Уроки</span>
              <span className="text-foreground">{stats.completedLessons}/{stats.totalLessons}</span>
            </div>
            {stats.isCertified && (
              <div className="flex items-center gap-2 text-secondary">
                <Award className="w-4 h-4" />
                <span>Сертифицирован</span>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            className="w-full mt-4 justify-start text-muted-foreground hover:text-foreground"
            onClick={handleSignOut}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Выйти
          </Button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0">
        <div className="p-6 lg:p-8">
          <Outlet context={{ stats, refreshStats: fetchUserStats }} />
        </div>
      </main>
    </div>
  );
};

export default MemberDashboard;
