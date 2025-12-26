import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Award, Save } from 'lucide-react';
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
      const { data: profileData } = await supabase
        .from('profiles')
        .select('full_name, avatar_url')
        .eq('user_id', user.id)
        .maybeSingle();

      if (profileData) {
        setProfile(profileData);
        setFullName(profileData.full_name || '');
      }

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
      toast.success('Сохранено');
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Ошибка сохранения');
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
        <div className="animate-pulse text-muted-foreground font-light">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-2xl animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <p className="label text-neon-purple">Настройки</p>
        <h1 className="title">Профиль</h1>
        <p className="body">
          Управление личными данными
        </p>
      </div>

      {/* Profile card */}
      <Card className="bg-card border-border">
        <CardContent className="p-6 space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 border-2 border-neon-purple/30">
              <AvatarImage src={profile.avatar_url || undefined} />
              <AvatarFallback className="bg-neon-purple/10 text-neon-purple text-xl font-light">
                {getInitials(profile.full_name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-light text-foreground text-lg">
                {profile.full_name || 'Пользователь'}
              </h3>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              {certification?.passed && (
                <div className="flex items-center gap-1 mt-2 text-neon-green text-xs">
                  <Award className="w-3 h-3" />
                  <span className="uppercase tracking-wider">Практик</span>
                </div>
              )}
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Имя</Label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Введите имя"
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Email</Label>
              <Input
                value={user?.email || ''}
                disabled
                className="bg-muted border-border"
              />
              <p className="text-[10px] text-muted-foreground">
                Email нельзя изменить
              </p>
            </div>

            <Button 
              onClick={saveProfile} 
              disabled={saving}
              className="bg-neon-purple hover:bg-neon-purple/80"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Сохранение...' : 'Сохранить'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Certification info */}
      {certification?.passed && (
        <Card className="bg-card border-neon-green/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-sm bg-neon-green/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-neon-green" />
              </div>
              <div>
                <p className="label text-neon-green">Сертификация</p>
                <h3 className="font-light text-foreground">Подтверждена</h3>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 pt-4 border-t border-border">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Дата</p>
                <p className="text-foreground font-light">
                  {new Date(certification.certified_at).toLocaleDateString('ru-RU')}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Результат</p>
                <p className="text-foreground font-light">{certification.test_score}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MemberProfile;