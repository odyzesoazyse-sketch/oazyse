import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Calendar, MessageSquare, Award, TrendingUp, Users } from 'lucide-react';

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
      // Get certification status
      const { data: cert } = await supabase
        .from('certifications')
        .select('passed, certified_at')
        .eq('user_id', user.id)
        .eq('passed', true)
        .maybeSingle();

      // Get sessions received (as requester)
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

      // Get sessions conducted (as practitioner)
      const { data: conductedData } = await supabase
        .from('session_bookings')
        .select('id')
        .eq('practitioner_id', user.id)
        .eq('status', 'completed');

      // Get feedback received
      const { data: receivedFeedback } = await supabase
        .from('session_feedback')
        .select('*')
        .eq('to_user_id', user.id)
        .order('created_at', { ascending: false });

      // Get feedback given
      const { data: givenFeedback } = await supabase
        .from('session_feedback')
        .select('*')
        .eq('from_user_id', user.id)
        .order('created_at', { ascending: false });

      // Calculate average rating
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
            className={`w-4 h-4 ${
              star <= rating
                ? 'fill-secondary text-secondary'
                : 'text-muted-foreground'
            }`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-muted-foreground">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-light text-foreground">Статистика и отзывы</h1>
        <p className="text-muted-foreground">
          Ваша активность и обратная связь
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Получено сеансов
            </CardTitle>
            <Calendar className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.sessionsReceived}</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Проведено сеансов
            </CardTitle>
            <Users className="w-4 h-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.sessionsConducted}</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Средний рейтинг
            </CardTitle>
            <Star className="w-4 h-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-foreground">
                {stats.averageRating > 0 ? stats.averageRating.toFixed(1) : '—'}
              </span>
              {stats.averageRating > 0 && renderStars(Math.round(stats.averageRating))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Статус
            </CardTitle>
            <Award className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            {stats.isCertified ? (
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-secondary/20 text-secondary">
                  <Award className="w-3 h-3 mr-1" />
                  Сертифицирован
                </Badge>
              </div>
            ) : (
              <span className="text-foreground">Ученик</span>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Feedback tabs */}
      <Tabs defaultValue="received" className="space-y-6">
        <TabsList className="bg-muted">
          <TabsTrigger value="received">
            Полученные отзывы ({feedbackReceived.length})
          </TabsTrigger>
          <TabsTrigger value="given">
            Оставленные отзывы ({feedbackGiven.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="received" className="space-y-4">
          {feedbackReceived.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="py-12 text-center">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Пока нет отзывов
                </h3>
                <p className="text-muted-foreground">
                  Отзывы появятся после проведённых сеансов
                </p>
              </CardContent>
            </Card>
          ) : (
            feedbackReceived.map((feedback) => (
              <Card key={feedback.id} className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    {renderStars(feedback.rating)}
                    <span className="text-sm text-muted-foreground">
                      {new Date(feedback.created_at).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                  {feedback.comment && (
                    <p className="text-foreground">{feedback.comment}</p>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="given" className="space-y-4">
          {feedbackGiven.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="py-12 text-center">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Вы ещё не оставляли отзывов
                </h3>
                <p className="text-muted-foreground">
                  После сеанса не забудьте оставить отзыв практику
                </p>
              </CardContent>
            </Card>
          ) : (
            feedbackGiven.map((feedback) => (
              <Card key={feedback.id} className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    {renderStars(feedback.rating)}
                    <span className="text-sm text-muted-foreground">
                      {new Date(feedback.created_at).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                  {feedback.comment && (
                    <p className="text-foreground">{feedback.comment}</p>
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
