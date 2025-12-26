import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, PlayCircle, Clock, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';

interface Lesson {
  id: string;
  title: string;
  description: string;
  video_url: string;
  duration_minutes: number;
  order_index: number;
}

interface LessonProgress {
  lesson_id: string;
  completed: boolean;
}

const MemberLessons = () => {
  const { user } = useAuth();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [progress, setProgress] = useState<Map<string, boolean>>(new Map());
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLessons();
  }, [user]);

  const fetchLessons = async () => {
    try {
      const { data: lessonsData, error: lessonsError } = await supabase
        .from('lessons')
        .select('*')
        .eq('is_published', true)
        .order('order_index');

      if (lessonsError) throw lessonsError;

      if (user) {
        const { data: progressData } = await supabase
          .from('lesson_progress')
          .select('lesson_id, completed')
          .eq('user_id', user.id);

        const progressMap = new Map<string, boolean>();
        progressData?.forEach((p: LessonProgress) => {
          progressMap.set(p.lesson_id, p.completed);
        });
        setProgress(progressMap);
      }

      setLessons(lessonsData || []);
    } catch (error) {
      console.error('Error fetching lessons:', error);
      toast.error('Ошибка загрузки уроков');
    } finally {
      setLoading(false);
    }
  };

  const markAsCompleted = async (lessonId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('lesson_progress')
        .upsert({
          user_id: user.id,
          lesson_id: lessonId,
          completed: true,
          completed_at: new Date().toISOString()
        }, { onConflict: 'user_id,lesson_id' });

      if (error) throw error;

      setProgress(prev => new Map(prev).set(lessonId, true));
      toast.success('Урок отмечен как завершённый');
    } catch (error) {
      console.error('Error marking lesson:', error);
      toast.error('Ошибка сохранения прогресса');
    }
  };

  const completedCount = Array.from(progress.values()).filter(Boolean).length;
  const progressPercent = lessons.length > 0 ? (completedCount / lessons.length) * 100 : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-muted-foreground">Загрузка уроков...</div>
      </div>
    );
  }

  if (selectedLesson) {
    return (
      <div className="space-y-6">
        <Button
          variant="ghost"
          onClick={() => setSelectedLesson(null)}
          className="text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Назад к урокам
        </Button>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-light text-foreground">{selectedLesson.title}</h1>
            {progress.get(selectedLesson.id) && (
              <Badge variant="secondary" className="bg-secondary/20 text-secondary">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Завершён
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground">{selectedLesson.description}</p>
        </div>

        {/* Video player */}
        <div className="aspect-video bg-muted rounded-lg overflow-hidden">
          <iframe
            src={selectedLesson.video_url}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          {!progress.get(selectedLesson.id) && (
            <Button onClick={() => markAsCompleted(selectedLesson.id)}>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Отметить как завершённый
            </Button>
          )}
          
          {/* Navigate to next lesson */}
          {(() => {
            const currentIndex = lessons.findIndex(l => l.id === selectedLesson.id);
            const nextLesson = lessons[currentIndex + 1];
            if (nextLesson) {
              return (
                <Button variant="outline" onClick={() => setSelectedLesson(nextLesson)}>
                  Следующий урок
                </Button>
              );
            }
            return null;
          })()}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-light text-foreground">Видео-обучение</h1>
        <p className="text-muted-foreground">
          Освойте технику метасинхроники через последовательные уроки
        </p>
      </div>

      {/* Progress bar */}
      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Ваш прогресс</span>
            <span className="text-sm font-medium text-foreground">{completedCount} из {lessons.length} уроков</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </CardContent>
      </Card>

      {/* Lessons list */}
      <div className="grid gap-4">
        {lessons.map((lesson, index) => {
          const isCompleted = progress.get(lesson.id);
          const prevCompleted = index === 0 || progress.get(lessons[index - 1]?.id);

          return (
            <Card
              key={lesson.id}
              className={`bg-card border-border transition-all cursor-pointer hover:border-primary/50 ${
                isCompleted ? 'border-secondary/50' : ''
              }`}
              onClick={() => setSelectedLesson(lesson)}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isCompleted 
                      ? 'bg-secondary/20 text-secondary' 
                      : 'bg-primary/10 text-primary'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <PlayCircle className="w-6 h-6" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-muted-foreground">Урок {index + 1}</span>
                      {isCompleted && (
                        <Badge variant="secondary" className="bg-secondary/20 text-secondary text-xs">
                          Завершён
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-medium text-foreground truncate">{lesson.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{lesson.description}</p>
                  </div>

                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <Clock className="w-4 h-4" />
                    {lesson.duration_minutes} мин
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MemberLessons;
