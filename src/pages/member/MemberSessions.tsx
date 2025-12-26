import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, Clock, User, Plus, Star, MessageSquare } from 'lucide-react';
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
      // Check certification
      const { data: cert } = await supabase
        .from('certifications')
        .select('passed')
        .eq('user_id', user.id)
        .eq('passed', true)
        .maybeSingle();

      setIsCertified(!!cert?.passed);

      // Fetch open requests (not from current user)
      const { data: openRequests } = await supabase
        .from('session_requests')
        .select('*')
        .eq('status', 'open')
        .neq('requester_id', user.id)
        .order('created_at', { ascending: false });

      setRequests(openRequests || []);

      // Fetch my requests
      const { data: myReqs } = await supabase
        .from('session_requests')
        .select('*')
        .eq('requester_id', user.id)
        .order('created_at', { ascending: false });

      setMyRequests(myReqs || []);

      // Fetch my bookings (as practitioner)
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

      toast.success('Заявка создана успешно');
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
      // Create booking
      const { error: bookingError } = await supabase
        .from('session_bookings')
        .insert({
          request_id: selectedRequest.id,
          practitioner_id: user.id,
          scheduled_at: scheduledTime,
          meeting_link: meetingLink
        });

      if (bookingError) throw bookingError;

      // Update request status
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

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; label: string }> = {
      open: { variant: 'outline', label: 'Открыта' },
      booked: { variant: 'secondary', label: 'Назначен' },
      completed: { variant: 'default', label: 'Завершён' },
      cancelled: { variant: 'destructive', label: 'Отменён' }
    };
    const config = statusConfig[status] || { variant: 'outline' as const, label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
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
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-light text-foreground">Сеансы метасинхроники</h1>
          <p className="text-muted-foreground">
            Получайте и проводите сеансы трансформации сознания
          </p>
        </div>
        
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Создать заявку
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Новая заявка на сеанс</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Предпочтительная дата</Label>
                <Input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Время с</Label>
                  <Input
                    type="time"
                    value={preferredTimeStart}
                    onChange={(e) => setPreferredTimeStart(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Время до</Label>
                  <Input
                    type="time"
                    value={preferredTimeEnd}
                    onChange={(e) => setPreferredTimeEnd(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Предпочтение по полу практика</Label>
                <Select value={genderPreference} onValueChange={setGenderPreference}>
                  <SelectTrigger>
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
                <Label>Дополнительные пожелания</Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Опишите ваш запрос или тему для работы..."
                />
              </div>
              <Button onClick={createRequest} className="w-full">
                Создать заявку
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="requests" className="space-y-6">
        <TabsList className="bg-muted">
          <TabsTrigger value="requests">Мои заявки</TabsTrigger>
          {isCertified && <TabsTrigger value="available">Доступные заявки</TabsTrigger>}
          {isCertified && <TabsTrigger value="booked">Назначенные сеансы</TabsTrigger>}
        </TabsList>

        <TabsContent value="requests" className="space-y-4">
          {myRequests.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="py-12 text-center">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium text-foreground mb-2">У вас пока нет заявок</h3>
                <p className="text-muted-foreground mb-4">
                  Создайте заявку, чтобы получить сеанс метасинхроники
                </p>
                <Button onClick={() => setCreateDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Создать заявку
                </Button>
              </CardContent>
            </Card>
          ) : (
            myRequests.map((request) => (
              <Card key={request.id} className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {getStatusBadge(request.status)}
                        <span className="text-sm text-muted-foreground">
                          {new Date(request.created_at).toLocaleDateString('ru-RU')}
                        </span>
                      </div>
                      {request.preferred_date && (
                        <div className="flex items-center gap-2 text-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(request.preferred_date).toLocaleDateString('ru-RU')}</span>
                          {request.preferred_time_start && (
                            <>
                              <Clock className="w-4 h-4 ml-2" />
                              <span>{request.preferred_time_start} - {request.preferred_time_end}</span>
                            </>
                          )}
                        </div>
                      )}
                      {request.notes && (
                        <p className="text-muted-foreground">{request.notes}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {isCertified && (
          <TabsContent value="available" className="space-y-4">
            {requests.length === 0 ? (
              <Card className="bg-card border-border">
                <CardContent className="py-12 text-center">
                  <User className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Нет доступных заявок</h3>
                  <p className="text-muted-foreground">
                    Пока нет открытых заявок от других участников
                  </p>
                </CardContent>
              </Card>
            ) : (
              requests.map((request) => (
                <Card key={request.id} className="bg-card border-border hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          {getStatusBadge(request.status)}
                          <span className="text-sm text-muted-foreground">
                            {new Date(request.created_at).toLocaleDateString('ru-RU')}
                          </span>
                        </div>
                        {request.preferred_date && (
                          <div className="flex items-center gap-2 text-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(request.preferred_date).toLocaleDateString('ru-RU')}</span>
                            {request.preferred_time_start && (
                              <>
                                <Clock className="w-4 h-4 ml-2" />
                                <span>{request.preferred_time_start} - {request.preferred_time_end}</span>
                              </>
                            )}
                          </div>
                        )}
                        {request.gender_preference && request.gender_preference !== 'any' && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <User className="w-4 h-4" />
                            <span>Предпочтение: {request.gender_preference === 'male' ? 'мужчина' : 'женщина'}</span>
                          </div>
                        )}
                        {request.notes && (
                          <p className="text-muted-foreground">{request.notes}</p>
                        )}
                      </div>
                      <Button
                        onClick={() => {
                          setSelectedRequest(request);
                          setBookDialogOpen(true);
                        }}
                      >
                        Взять сеанс
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        )}

        {isCertified && (
          <TabsContent value="booked" className="space-y-4">
            {myBookings.length === 0 ? (
              <Card className="bg-card border-border">
                <CardContent className="py-12 text-center">
                  <Star className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Нет назначенных сеансов</h3>
                  <p className="text-muted-foreground">
                    Возьмите заявку, чтобы провести сеанс
                  </p>
                </CardContent>
              </Card>
            ) : (
              myBookings.map((booking) => (
                <Card key={booking.id} className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          {getStatusBadge(booking.status)}
                        </div>
                        <div className="flex items-center gap-2 text-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(booking.scheduled_at).toLocaleString('ru-RU')}</span>
                        </div>
                        {booking.meeting_link && (
                          <a 
                            href={booking.meeting_link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            Ссылка на встречу
                          </a>
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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Назначить сеанс</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Дата и время сеанса</Label>
              <Input
                type="datetime-local"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Ссылка на встречу (Zoom, Google Meet и т.д.)</Label>
              <Input
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
                placeholder="https://..."
              />
            </div>
            <Button onClick={bookSession} className="w-full" disabled={!scheduledTime}>
              Назначить сеанс
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MemberSessions;
