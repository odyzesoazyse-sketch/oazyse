import { useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    <div className="space-y-8">
      {/* Welcome section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-light text-foreground">Добро пожаловать в Метасинхронику</h1>
        <p className="text-muted-foreground">
          Ваш путь к трансформации сознания начинается здесь
        </p>
      </div>

      {/* Progress cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Прогресс обучения</CardTitle>
            <BookOpen className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.completedLessons}/{stats.totalLessons}</div>
            <Progress value={progressPercent} className="mt-2 h-2" />
            <p className="text-xs text-muted-foreground mt-2">{Math.round(progressPercent)}% завершено</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Сертификация</CardTitle>
            <Award className="w-4 h-4 text-secondary" />
          </CardHeader>
          <CardContent>
            {stats.isCertified ? (
              <div className="flex items-center gap-2 text-secondary">
                <Award className="w-5 h-5" />
                <span className="text-lg font-semibold">Сертифицирован</span>
              </div>
            ) : (
              <div>
                <div className="text-2xl font-bold text-foreground">Не пройден</div>
                <p className="text-xs text-muted-foreground mt-2">
                  {progressPercent >= 100 ? 'Готовы к тесту!' : 'Завершите обучение'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Получено сеансов</CardTitle>
            <Calendar className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.sessionsReceived}</div>
            <p className="text-xs text-muted-foreground mt-2">сеансов метасинхроники</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Проведено сеансов</CardTitle>
            <Star className="w-4 h-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.sessionsConducted}</div>
            {stats.averageRating > 0 && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                <Star className="w-3 h-3 fill-secondary text-secondary" />
                {stats.averageRating.toFixed(1)} средний рейтинг
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover:border-primary/40 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <BookOpen className="w-5 h-5 text-primary" />
              Продолжить обучение
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Изучите технику метасинхроники через видео-уроки
            </p>
            <Button asChild className="w-full">
              <Link to="/member/lessons">
                К урокам
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20 hover:border-secondary/40 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Calendar className="w-5 h-5 text-secondary" />
              Записаться на сеанс
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Получите сеанс метасинхроники от сертифицированного практика
            </p>
            <Button asChild variant="secondary" className="w-full">
              <Link to="/member/sessions">
                Записаться
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {progressPercent >= 100 && !stats.isCertified && (
          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20 hover:border-accent/40 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <ClipboardCheck className="w-5 h-5 text-accent" />
                Пройти сертификацию
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Станьте сертифицированным практиком метасинхроники
              </p>
              <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
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
