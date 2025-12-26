import { useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Calendar, ClipboardCheck, Star, ArrowRight, Award } from 'lucide-react';

interface UserStats {
  completedLessons: number;
  totalLessons: number;
  isCertified: boolean;
  sessionsReceived: number;
  sessionsConducted: number;
  averageRating: number;
}

const MemberHome = () => {
  const { stats } = useOutletContext<{ stats: UserStats }>();
  
  const progressPercent = stats.totalLessons > 0 
    ? (stats.completedLessons / stats.totalLessons) * 100 
    : 0;

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Welcome section */}
      <div className="space-y-4">
        <p className="label text-neon-purple">Личный кабинет</p>
        <h1 className="title">Метасинхроника</h1>
        <p className="body max-w-xl">
          Ваш путь к трансформации сознания. Изучайте материалы, практикуйте технику и помогайте другим.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-border hover:border-neon-purple/30 transition-colors group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="label">Прогресс</span>
              <BookOpen className="w-4 h-4 text-neon-purple group-hover:animate-neon-text-pulse" />
            </div>
            <div className="text-3xl font-light text-foreground mb-2">{stats.completedLessons}/{stats.totalLessons}</div>
            <Progress value={progressPercent} className="h-1 bg-muted" />
            <p className="text-xs text-muted-foreground mt-2">{Math.round(progressPercent)}% завершено</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-neon-green/30 transition-colors group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="label">Статус</span>
              <Award className="w-4 h-4 text-neon-green group-hover:animate-neon-text-pulse" />
            </div>
            {stats.isCertified ? (
              <div className="flex items-center gap-2 text-neon-green">
                <Award className="w-5 h-5" />
                <span className="text-lg font-light">Сертифицирован</span>
              </div>
            ) : (
              <div>
                <div className="text-3xl font-light text-foreground">Ученик</div>
                <p className="text-xs text-muted-foreground mt-2">
                  {progressPercent >= 100 ? 'Готовы к тесту' : 'В процессе обучения'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-neon-purple/30 transition-colors group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="label">Получено</span>
              <Calendar className="w-4 h-4 text-neon-purple group-hover:animate-neon-text-pulse" />
            </div>
            <div className="text-3xl font-light text-foreground">{stats.sessionsReceived}</div>
            <p className="text-xs text-muted-foreground mt-2">сеансов</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-neon-green/30 transition-colors group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="label">Проведено</span>
              <Star className="w-4 h-4 text-neon-green group-hover:animate-neon-text-pulse" />
            </div>
            <div className="text-3xl font-light text-foreground">{stats.sessionsConducted}</div>
            {stats.averageRating > 0 && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                <Star className="w-3 h-3 fill-neon-green text-neon-green" />
                {stats.averageRating.toFixed(1)} рейтинг
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-card border-border hover:border-neon-purple/50 transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-sm bg-neon-purple/10 flex items-center justify-center group-hover:animate-neon-pulse-purple">
                <BookOpen className="w-5 h-5 text-neon-purple" />
              </div>
              <h3 className="font-light text-foreground">Обучение</h3>
            </div>
            <p className="body text-sm mb-6">
              Видео-уроки по технике метасинхроники
            </p>
            <Button asChild variant="outline" className="w-full border-neon-purple/30 text-neon-purple hover:bg-neon-purple hover:text-primary-foreground">
              <Link to="/member/lessons">
                К урокам
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-neon-green/50 transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-sm bg-neon-green/10 flex items-center justify-center group-hover:animate-neon-pulse-green">
                <Calendar className="w-5 h-5 text-neon-green" />
              </div>
              <h3 className="font-light text-foreground">Сеансы</h3>
            </div>
            <p className="body text-sm mb-6">
              Получите или проведите сеанс метасинхроники
            </p>
            <Button asChild variant="outline" className="w-full border-neon-green/30 text-neon-green hover:bg-neon-green hover:text-secondary-foreground">
              <Link to="/member/sessions">
                Записаться
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {progressPercent >= 100 && !stats.isCertified && (
          <Card className="bg-card border-border hover:border-neon-purple/50 transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-sm bg-neon-purple/10 flex items-center justify-center group-hover:animate-neon-pulse-purple">
                  <ClipboardCheck className="w-5 h-5 text-neon-purple" />
                </div>
                <h3 className="font-light text-foreground">Сертификация</h3>
              </div>
              <p className="body text-sm mb-6">
                Станьте сертифицированным практиком
              </p>
              <Button asChild variant="outline" className="w-full border-neon-purple/30 text-neon-purple hover:bg-neon-purple hover:text-primary-foreground">
                <Link to="/member/certification">
                  К тесту
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MemberHome;
