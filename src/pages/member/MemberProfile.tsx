import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Award, Save } from 'lucide-react';
import { toast } from 'sonner';

interface Profile {
  full_name: string | null;
  avatar_url: string | null;
}

interface CertInfo {
  passed: boolean;
  certified_at: string;
  test_score: number;
}

const MemberProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile>({ full_name: '', avatar_url: null });
  const [certification, setCertification] = useState<CertInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      // Get profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('full_name, avatar_url')
        .eq('user_id', user.id)
        .maybeSingle();

      if (profileData) {
        setProfile(profileData);
        setFullName(profileData.full_name || '');
      }

      // Get certification
      const { data: certData } = await supabase
        .from('certifications')
        .select('passed, certified_at, test_score')
        .eq('user_id', user.id)
        .eq('passed', true)
        .maybeSingle();

      if (certData) {
        setCertification(certData);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    if (!user) return;
    setSaving(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ full_name: fullName })
        .eq('user_id', user.id);

      if (error) throw error;

      setProfile(prev => ({ ...prev, full_name: fullName }));
      toast.success('Профиль сохранён');
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Ошибка сохранения профиля');
    } finally {
      setSaving(false);
    }
  };

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-muted-foreground">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-light text-foreground">Мой профиль</h1>
        <p className="text-muted-foreground">
          Управление личными данными
        </p>
      </div>

      {/* Profile card */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <User className="w-5 h-5" />
            Личные данные
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={profile.avatar_url || undefined} />
              <AvatarFallback className="bg-primary/20 text-primary text-xl">
                {getInitials(profile.full_name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-foreground">
                {profile.full_name || 'Пользователь'}
              </h3>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              {certification?.passed && (
                <Badge variant="secondary" className="mt-2 bg-secondary/20 text-secondary">
                  <Award className="w-3 h-3 mr-1" />
                  Сертифицированный практик
                </Badge>
              )}
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Полное имя</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Введите ваше имя"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={user?.email || ''}
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">
                Email нельзя изменить
              </p>
            </div>

            <Button onClick={saveProfile} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Сохранение...' : 'Сохранить'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Certification info */}
      {certification?.passed && (
        <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Award className="w-5 h-5 text-secondary" />
              Сертификация
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Дата получения</p>
                <p className="text-foreground font-medium">
                  {new Date(certification.certified_at).toLocaleDateString('ru-RU')}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Результат теста</p>
                <p className="text-foreground font-medium">{certification.test_score}%</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Вы являетесь сертифицированным практиком метасинхроники и можете проводить сеансы другим участникам платформы.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MemberProfile;
