import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Calendar, MessageSquare, Award, Users } from 'lucide-react';

interface Feedback {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  from_user_id: string;
}

interface StatsData {
  sessionsReceived: number;
  sessionsConducted: number;
  averageRating: number;
  totalFeedback: number;
  isCertified: boolean;
  certifiedAt: string | null;
}

const MemberStats = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<StatsData>({
    sessionsReceived: 0,
    sessionsConducted: 0,
    averageRating: 0,
    totalFeedback: 0,
    isCertified: false,
    certifiedAt: null
  });
  const [feedbackReceived, setFeedbackReceived] = useState<Feedback[]>([]);
  const [feedbackGiven, setFeedbackGiven] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    if (!user) return;

    try {
      const { data: cert } = await supabase
        .from('certifications')
        .select('passed, certified_at')
        .eq('user_id', user.id)
        .eq('passed', true)
        .maybeSingle();

      const { data: requestsData } = await supabase
        .from('session_requests')
        .select(`
          id,
          session_bookings (
            id,
            status
          )
        `)
        .eq('requester_id', user.id);

      const sessionsReceived = requestsData?.filter(r => 
        r.session_bookings?.some((b: any) => b.status === 'completed')
      ).length || 0;

      const { data: conductedData } = await supabase
        .from('session_bookings')
        .select('id')
        .eq('practitioner_id', user.id)
        .eq('status', 'completed');

      const { data: receivedFeedback } = await supabase
        .from('session_feedback')
        .select('*')
        .eq('to_user_id', user.id)
        .order('created_at', { ascending: false });

      const { data: givenFeedback } = await supabase
        .from('session_feedback')
        .select('*')
        .eq('from_user_id', user.id)
        .order('created_at', { ascending: false });

      const avgRating = receivedFeedback && receivedFeedback.length > 0
        ? receivedFeedback.reduce((acc, f) => acc + f.rating, 0) / receivedFeedback.length
        : 0;

      setStats({
        sessionsReceived,
        sessionsConducted: conductedData?.length || 0,
        averageRating: avgRating,
        totalFeedback: receivedFeedback?.length || 0,
        isCertified: !!cert?.passed,
        certifiedAt: cert?.certified_at || null
      });

      setFeedbackReceived(receivedFeedback || []);
      setFeedbackGiven(givenFeedback || []);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${
              star <= rating
                ? 'fill-neon-green text-neon-green'
                : 'text-muted-foreground/30'
            }`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-muted-foreground font-light">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <p className="label text-neon-green">Аналитика</p>
        <h1 className="title">Статистика</h1>
        <p className="body max-w-xl">
          Ваша активность и обратная связь
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-border hover:border-neon-purple/30 transition-colors group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="label">Получено</span>
              <Calendar className="w-4 h-4 text-neon-purple group-hover:animate-neon-text-pulse" />
            </div>
            <div className="text-3xl font-light text-foreground">{stats.sessionsReceived}</div>
            <p className="text-xs text-muted-foreground mt-1">сеансов</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-neon-green/30 transition-colors group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="label">Проведено</span>
              <Users className="w-4 h-4 text-neon-green group-hover:animate-neon-text-pulse" />
            </div>
            <div className="text-3xl font-light text-foreground">{stats.sessionsConducted}</div>
            <p className="text-xs text-muted-foreground mt-1">сеансов</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-neon-green/30 transition-colors group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="label">Рейтинг</span>
              <Star className="w-4 h-4 text-neon-green group-hover:animate-neon-text-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-light text-foreground">
                {stats.averageRating > 0 ? stats.averageRating.toFixed(1) : '—'}
              </span>
            </div>
            {stats.averageRating > 0 && (
              <div className="mt-2">{renderStars(Math.round(stats.averageRating))}</div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-neon-purple/30 transition-colors group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="label">Статус</span>
              <Award className="w-4 h-4 text-neon-purple group-hover:animate-neon-text-pulse" />
            </div>
            {stats.isCertified ? (
              <div className="flex items-center gap-2 text-neon-green">
                <Award className="w-4 h-4" />
                <span className="text-sm font-light">Сертифицирован</span>
              </div>
            ) : (
              <span className="text-lg font-light text-foreground">Ученик</span>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Feedback tabs */}
      <Tabs defaultValue="received" className="space-y-6">
        <TabsList className="bg-muted/50 border border-border">
          <TabsTrigger value="received" className="data-[state=active]:bg-neon-green/10 data-[state=active]:text-neon-green">
            Полученные ({feedbackReceived.length})
          </TabsTrigger>
          <TabsTrigger value="given" className="data-[state=active]:bg-neon-purple/10 data-[state=active]:text-neon-purple">
            Оставленные ({feedbackGiven.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="received" className="space-y-3">
          {feedbackReceived.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="py-12 text-center">
                <MessageSquare className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-light text-foreground mb-2">Нет отзывов</h3>
                <p className="body text-sm">
                  Отзывы появятся после сеансов
                </p>
              </CardContent>
            </Card>
          ) : (
            feedbackReceived.map((feedback) => (
              <Card key={feedback.id} className="bg-card border-border">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    {renderStars(feedback.rating)}
                    <span className="text-xs text-muted-foreground">
                      {new Date(feedback.created_at).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                  {feedback.comment && (
                    <p className="text-sm text-foreground font-light">{feedback.comment}</p>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="given" className="space-y-3">
          {feedbackGiven.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="py-12 text-center">
                <MessageSquare className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-light text-foreground mb-2">Нет отзывов</h3>
                <p className="body text-sm">
                  Не забудьте оставить отзыв после сеанса
                </p>
              </CardContent>
            </Card>
          ) : (
            feedbackGiven.map((feedback) => (
              <Card key={feedback.id} className="bg-card border-border">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    {renderStars(feedback.rating)}
                    <span className="text-xs text-muted-foreground">
                      {new Date(feedback.created_at).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                  {feedback.comment && (
                    <p className="text-sm text-foreground font-light">{feedback.comment}</p>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MemberStats;