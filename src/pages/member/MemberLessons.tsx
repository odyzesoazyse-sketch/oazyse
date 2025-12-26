import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
      toast.success('Урок завершён');
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
        <div className="animate-pulse text-muted-foreground font-light">Загрузка...</div>
      </div>
    );
  }

  if (selectedLesson) {
    return (
      <div className="space-y-8 animate-fade-in">
        <Button
          variant="ghost"
          onClick={() => setSelectedLesson(null)}
          className="text-muted-foreground hover:text-foreground -ml-2"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Назад
        </Button>

        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <p className="label text-neon-purple">
              Урок {lessons.findIndex(l => l.id === selectedLesson.id) + 1}
            </p>
            {progress.get(selectedLesson.id) && (
              <span className="inline-flex items-center gap-1 text-xs text-neon-green">
                <CheckCircle2 className="w-3 h-3" />
                Завершён
              </span>
            )}
          </div>
          <h1 className="title text-2xl md:text-3xl">{selectedLesson.title}</h1>
          <p className="body">{selectedLesson.description}</p>
        </div>

        {/* Video player */}
        <div className="aspect-video bg-muted rounded-sm overflow-hidden border border-border">
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
            <Button 
              onClick={() => markAsCompleted(selectedLesson.id)}
              className="bg-neon-green hover:bg-neon-green/80 text-secondary-foreground"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Завершить урок
            </Button>
          )}
          
          {(() => {
            const currentIndex = lessons.findIndex(l => l.id === selectedLesson.id);
            const nextLesson = lessons[currentIndex + 1];
            if (nextLesson) {
              return (
                <Button variant="outline" onClick={() => setSelectedLesson(nextLesson)} className="border-border">
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
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <p className="label text-neon-purple">Обучение</p>
        <h1 className="title">Видео-уроки</h1>
        <p className="body max-w-xl">
          Освойте технику метасинхроники через последовательные уроки
        </p>
      </div>

      {/* Progress bar */}
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="label">Ваш прогресс</span>
            <span className="text-sm font-light text-foreground">{completedCount} из {lessons.length}</span>
          </div>
          <Progress value={progressPercent} className="h-1 bg-muted" />
        </CardContent>
      </Card>

      {/* Lessons list */}
      <div className="space-y-3">
        {lessons.map((lesson, index) => {
          const isCompleted = progress.get(lesson.id);

          return (
            <Card
              key={lesson.id}
              className={`bg-card border-border transition-all duration-300 cursor-pointer hover:border-neon-purple/50 group ${
                isCompleted ? 'border-neon-green/30' : ''
              }`}
              onClick={() => setSelectedLesson(lesson)}
            >
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-sm flex items-center justify-center flex-shrink-0 transition-all ${
                    isCompleted 
                      ? 'bg-neon-green/10 text-neon-green' 
                      : 'bg-neon-purple/10 text-neon-purple group-hover:animate-neon-pulse-purple'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <PlayCircle className="w-5 h-5" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="label">Урок {index + 1}</span>
                      {isCompleted && (
                        <span className="text-[10px] uppercase tracking-wider text-neon-green">
                          Завершён
                        </span>
                      )}
                    </div>
                    <h3 className="font-light text-foreground truncate">{lesson.title}</h3>
                  </div>

                  <div className="flex items-center gap-1 text-muted-foreground text-xs">
                    <Clock className="w-3 h-3" />
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
