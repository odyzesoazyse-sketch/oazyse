import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, Clock, User, Plus, Star } from 'lucide-react';
import { toast } from 'sonner';

interface SessionRequest {
  id: string;
  requester_id: string;
  preferred_date: string;
  preferred_time_start: string;
  preferred_time_end: string;
  gender_preference: string;
  language: string;
  notes: string;
  status: string;
  created_at: string;
  profiles?: {
    full_name: string;
  };
}

interface Booking {
  id: string;
  request_id: string;
  practitioner_id: string;
  scheduled_at: string;
  status: string;
  meeting_link: string;
  session_requests: {
    requester_id: string;
    notes: string;
  };
}

const MemberSessions = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<SessionRequest[]>([]);
  const [myRequests, setMyRequests] = useState<SessionRequest[]>([]);
  const [myBookings, setMyBookings] = useState<Booking[]>([]);
  const [isCertified, setIsCertified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [bookDialogOpen, setBookDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<SessionRequest | null>(null);

  // Form state
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTimeStart, setPreferredTimeStart] = useState('');
  const [preferredTimeEnd, setPreferredTimeEnd] = useState('');
  const [genderPreference, setGenderPreference] = useState('any');
  const [notes, setNotes] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [meetingLink, setMeetingLink] = useState('');

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const { data: cert } = await supabase
        .from('certifications')
        .select('passed')
        .eq('user_id', user.id)
        .eq('passed', true)
        .maybeSingle();

      setIsCertified(!!cert?.passed);

      const { data: openRequests } = await supabase
        .from('session_requests')
        .select('*')
        .eq('status', 'open')
        .neq('requester_id', user.id)
        .order('created_at', { ascending: false });

      setRequests(openRequests || []);

      const { data: myReqs } = await supabase
        .from('session_requests')
        .select('*')
        .eq('requester_id', user.id)
        .order('created_at', { ascending: false });

      setMyRequests(myReqs || []);

      const { data: bookings } = await supabase
        .from('session_bookings')
        .select(`
          *,
          session_requests (
            requester_id,
            notes
          )
        `)
        .eq('practitioner_id', user.id);

      setMyBookings(bookings || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const createRequest = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('session_requests')
        .insert({
          requester_id: user.id,
          preferred_date: preferredDate || null,
          preferred_time_start: preferredTimeStart || null,
          preferred_time_end: preferredTimeEnd || null,
          gender_preference: genderPreference,
          notes: notes
        });

      if (error) throw error;

      toast.success('Заявка создана');
      setCreateDialogOpen(false);
      resetForm();
      fetchData();
    } catch (error) {
      console.error('Error creating request:', error);
      toast.error('Ошибка создания заявки');
    }
  };

  const bookSession = async () => {
    if (!user || !selectedRequest) return;

    try {
      const { error: bookingError } = await supabase
        .from('session_bookings')
        .insert({
          request_id: selectedRequest.id,
          practitioner_id: user.id,
          scheduled_at: scheduledTime,
          meeting_link: meetingLink
        });

      if (bookingError) throw bookingError;

      const { error: updateError } = await supabase
        .from('session_requests')
        .update({ status: 'booked' })
        .eq('id', selectedRequest.id);

      if (updateError) throw updateError;

      toast.success('Сеанс назначен');
      setBookDialogOpen(false);
      setSelectedRequest(null);
      setScheduledTime('');
      setMeetingLink('');
      fetchData();
    } catch (error) {
      console.error('Error booking session:', error);
      toast.error('Ошибка назначения сеанса');
    }
  };

  const resetForm = () => {
    setPreferredDate('');
    setPreferredTimeStart('');
    setPreferredTimeEnd('');
    setGenderPreference('any');
    setNotes('');
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, { text: string; color: string }> = {
      open: { text: 'Открыта', color: 'text-neon-purple' },
      booked: { text: 'Назначен', color: 'text-neon-green' },
      completed: { text: 'Завершён', color: 'text-muted-foreground' },
      cancelled: { text: 'Отменён', color: 'text-destructive' }
    };
    const config = labels[status] || { text: status, color: 'text-muted-foreground' };
    return <span className={`text-xs uppercase tracking-wider ${config.color}`}>{config.text}</span>;
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <p className="label text-neon-green">Практика</p>
          <h1 className="title">Сеансы</h1>
          <p className="body max-w-xl">
            Получайте и проводите сеансы метасинхроники
          </p>
        </div>
        
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-neon-purple hover:bg-neon-purple/80 text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Новая заявка
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-card border-border">
            <DialogHeader>
              <DialogTitle className="font-light">Новая заявка на сеанс</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Дата</Label>
                <Input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="bg-background border-border"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">С</Label>
                  <Input
                    type="time"
                    value={preferredTimeStart}
                    onChange={(e) => setPreferredTimeStart(e.target.value)}
                    className="bg-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">До</Label>
                  <Input
                    type="time"
                    value={preferredTimeEnd}
                    onChange={(e) => setPreferredTimeEnd(e.target.value)}
                    className="bg-background border-border"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Пол практика</Label>
                <Select value={genderPreference} onValueChange={setGenderPreference}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Не важно</SelectItem>
                    <SelectItem value="male">Мужчина</SelectItem>
                    <SelectItem value="female">Женщина</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Пожелания</Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Опишите ваш запрос..."
                  className="bg-background border-border resize-none"
                />
              </div>
              <Button onClick={createRequest} className="w-full bg-neon-purple hover:bg-neon-purple/80">
                Создать
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="requests" className="space-y-6">
        <TabsList className="bg-muted/50 border border-border">
          <TabsTrigger value="requests" className="data-[state=active]:bg-neon-purple/10 data-[state=active]:text-neon-purple">
            Мои заявки
          </TabsTrigger>
          {isCertified && (
            <TabsTrigger value="available" className="data-[state=active]:bg-neon-green/10 data-[state=active]:text-neon-green">
              Доступные
            </TabsTrigger>
          )}
          {isCertified && (
            <TabsTrigger value="booked" className="data-[state=active]:bg-neon-purple/10 data-[state=active]:text-neon-purple">
              Назначенные
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="requests" className="space-y-3">
          {myRequests.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="py-12 text-center">
                <Calendar className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-light text-foreground mb-2">Нет заявок</h3>
                <p className="body text-sm mb-4">
                  Создайте заявку на сеанс
                </p>
                <Button onClick={() => setCreateDialogOpen(true)} variant="outline" className="border-neon-purple/30 text-neon-purple">
                  <Plus className="w-4 h-4 mr-2" />
                  Создать
                </Button>
              </CardContent>
            </Card>
          ) : (
            myRequests.map((request) => (
              <Card key={request.id} className="bg-card border-border hover:border-neon-purple/30 transition-colors">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        {getStatusLabel(request.status)}
                        <span className="text-xs text-muted-foreground">
                          {new Date(request.created_at).toLocaleDateString('ru-RU')}
                        </span>
                      </div>
                      {request.preferred_date && (
                        <div className="flex items-center gap-2 text-foreground text-sm">
                          <Calendar className="w-3 h-3 text-neon-purple" />
                          <span>{new Date(request.preferred_date).toLocaleDateString('ru-RU')}</span>
                          {request.preferred_time_start && (
                            <>
                              <Clock className="w-3 h-3 text-neon-purple ml-2" />
                              <span>{request.preferred_time_start} - {request.preferred_time_end}</span>
                            </>
                          )}
                        </div>
                      )}
                      {request.notes && (
                        <p className="text-sm text-muted-foreground">{request.notes}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {isCertified && (
          <TabsContent value="available" className="space-y-3">
            {requests.length === 0 ? (
              <Card className="bg-card border-border">
                <CardContent className="py-12 text-center">
                  <User className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-light text-foreground mb-2">Нет заявок</h3>
                  <p className="body text-sm">
                    Пока нет открытых заявок
                  </p>
                </CardContent>
              </Card>
            ) : (
              requests.map((request) => (
                <Card key={request.id} className="bg-card border-border hover:border-neon-green/50 transition-colors group">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          {getStatusLabel(request.status)}
                          <span className="text-xs text-muted-foreground">
                            {new Date(request.created_at).toLocaleDateString('ru-RU')}
                          </span>
                        </div>
                        {request.preferred_date && (
                          <div className="flex items-center gap-2 text-foreground text-sm">
                            <Calendar className="w-3 h-3 text-neon-green" />
                            <span>{new Date(request.preferred_date).toLocaleDateString('ru-RU')}</span>
                            {request.preferred_time_start && (
                              <>
                                <Clock className="w-3 h-3 text-neon-green ml-2" />
                                <span>{request.preferred_time_start} - {request.preferred_time_end}</span>
                              </>
                            )}
                          </div>
                        )}
                        {request.gender_preference && request.gender_preference !== 'any' && (
                          <div className="flex items-center gap-2 text-muted-foreground text-xs">
                            <User className="w-3 h-3" />
                            <span>Предпочтение: {request.gender_preference === 'male' ? 'мужчина' : 'женщина'}</span>
                          </div>
                        )}
                        {request.notes && (
                          <p className="text-sm text-muted-foreground">{request.notes}</p>
                        )}
                      </div>
                      <Button
                        onClick={() => {
                          setSelectedRequest(request);
                          setBookDialogOpen(true);
                        }}
                        className="bg-neon-green hover:bg-neon-green/80 text-secondary-foreground"
                      >
                        Взять
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        )}

        {isCertified && (
          <TabsContent value="booked" className="space-y-3">
            {myBookings.length === 0 ? (
              <Card className="bg-card border-border">
                <CardContent className="py-12 text-center">
                  <Star className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-light text-foreground mb-2">Нет сеансов</h3>
                  <p className="body text-sm">
                    Возьмите заявку для проведения сеанса
                  </p>
                </CardContent>
              </Card>
            ) : (
              myBookings.map((booking) => (
                <Card key={booking.id} className="bg-card border-border">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        {getStatusLabel(booking.status)}
                        <div className="flex items-center gap-2 text-foreground text-sm">
                          <Calendar className="w-3 h-3 text-neon-purple" />
                          <span>{new Date(booking.scheduled_at).toLocaleString('ru-RU')}</span>
                        </div>
                        {booking.meeting_link && (
                          <a 
                            href={booking.meeting_link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-neon-purple hover:underline text-sm"
                          >
                            Ссылка на встречу
                          </a>
                        )}
                        {booking.session_requests?.notes && (
                          <p className="text-sm text-muted-foreground">{booking.session_requests.notes}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        )}
      </Tabs>

      {/* Book session dialog */}
      <Dialog open={bookDialogOpen} onOpenChange={setBookDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-light">Назначить сеанс</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Дата и время</Label>
              <Input
                type="datetime-local"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Ссылка на встречу</Label>
              <Input
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
                placeholder="https://zoom.us/..."
                className="bg-background border-border"
              />
            </div>
            <Button onClick={bookSession} className="w-full bg-neon-green hover:bg-neon-green/80 text-secondary-foreground">
              Назначить
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MemberSessions;