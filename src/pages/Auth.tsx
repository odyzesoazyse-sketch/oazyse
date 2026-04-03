import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, signIn } = useAuth();
  const { toast } = useToast();
  
  const [mode, setMode] = useState<'waitlist' | 'success' | 'login'>('waitlist');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [telegram, setTelegram] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/member', { replace: true });
    }
  }, [user, navigate]);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || (!email && !telegram)) {
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: 'Пожалуйста, введите имя и контакт для связи (email или telegram)'
      });
      return;
    }

    setLoading(true);
    
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      const { error } = await (supabase.from as any)('waitlist').insert([
        { full_name: fullName, email: email || null, telegram: telegram || null }
      ]);
      
      if (error) throw error;
      
      setMode('success');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Ошибка сервера',
        description: error.message || 'Не удалось сохранить заявку. Попробуйте позже.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await signIn(email, password);
      if (error) {
        toast({
          variant: 'destructive',
          title: t('auth.error'),
          description: t('auth.invalidCredentials')
        });
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: t('auth.error'),
        description: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  if (mode === 'success') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 animate-fade-in text-center space-y-6">
        <h1 className="text-3xl tracking-wide font-normal bg-gradient-to-r from-neon-purple to-neon-green bg-clip-text text-transparent" style={{ fontFamily: 'Questrial, sans-serif' }}>
          заявка принята.
        </h1>
        <p className="text-[12px] uppercase tracking-[0.1em] text-muted-foreground max-w-sm leading-relaxed">
          В данный момент оазис находится в закрытом режиме. <br /><br />
          Ваша заявка сохранена. Мы свяжемся с вами, когда откроем набор новых участников.
        </p>
        <div className="space-y-4 w-full max-w-xs pt-4">
          <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">наши соцсети</p>
          <a href="https://t.me/oazyse" target="_blank" rel="noopener noreferrer" className="block w-full h-10 leading-10 text-[10px] uppercase tracking-[0.15em] bg-neon-purple/10 text-neon-purple border border-neon-purple/30 hover:bg-neon-purple/20 transition-all rounded-md">
            Telegram
          </a>
          <a href="https://instagram.com/oazyse" target="_blank" rel="noopener noreferrer" className="block w-full h-10 leading-10 text-[10px] uppercase tracking-[0.15em] bg-transparent text-muted-foreground border border-border/50 hover:border-neon-purple/50 transition-all rounded-md">
            Instagram
          </a>
          <a href="https://youtube.com/@oazyse" target="_blank" rel="noopener noreferrer" className="block w-full h-10 leading-10 text-[10px] uppercase tracking-[0.15em] bg-transparent text-muted-foreground border border-border/50 hover:border-neon-purple/50 transition-all rounded-md">
            YouTube
          </a>
        </div>
        <button onClick={() => navigate('/')} className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground hover:text-neon-green transition-colors mt-8">
          ← вернуться на главную
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-xs space-y-6 animate-fade-in">
        {/* Logo */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl tracking-wide font-normal bg-gradient-to-r from-neon-purple to-neon-green bg-clip-text text-transparent" style={{ fontFamily: 'Questrial, sans-serif' }}>
            oazyse°
          </h1>
          <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
            {mode === 'waitlist' ? 'лист ожидания' : 'вход для участников'}
          </p>
        </div>

        {/* Form */}
        {mode === 'waitlist' ? (
          <form onSubmit={handleWaitlistSubmit} className="space-y-3">
            <Input
              type="text"
              placeholder="ваше имя"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="h-10 text-[11px] bg-transparent border-border/30 focus:border-neon-purple/50 placeholder:text-muted-foreground/50 tracking-wide"
            />
            <Input
              type="email"
              placeholder="email (необязательно)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 text-[11px] bg-transparent border-border/30 focus:border-neon-purple/50 placeholder:text-muted-foreground/50 tracking-wide"
            />
            <Input
              type="text"
              placeholder="telegram @username"
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
              className="h-10 text-[11px] bg-transparent border-border/30 focus:border-neon-purple/50 placeholder:text-muted-foreground/50 tracking-wide"
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-10 mt-2 text-[10px] uppercase tracking-[0.15em] bg-neon-purple/20 text-neon-purple border border-neon-purple/30 hover:bg-neon-purple/30 transition-all"
            >
              {loading ? '...' : 'оставить заявку'}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleLoginSubmit} className="space-y-3">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-10 text-[11px] bg-transparent border-border/30 focus:border-neon-purple/50 placeholder:text-muted-foreground/50 tracking-wide"
            />
            <Input
              type="password"
              placeholder={t('auth.password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-10 text-[11px] bg-transparent border-border/30 focus:border-neon-purple/50 placeholder:text-muted-foreground/50 tracking-wide"
            />
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-10 mt-2 text-[10px] uppercase tracking-[0.15em] bg-neon-purple/20 text-neon-purple border border-neon-purple/30 hover:bg-neon-purple/30 transition-all"
            >
              {loading ? '...' : t('auth.signIn')}
            </Button>
          </form>
        )}

        {/* Toggle Login/Waitlist */}
        <p className="text-center text-[9px] text-muted-foreground tracking-wide mt-4">
          <button
            type="button"
            onClick={() => setMode(mode === 'waitlist' ? 'login' : 'waitlist')}
            className="hover:text-neon-purple transition-colors"
          >
            {mode === 'waitlist' ? 'уже есть доступ?' : 'создать заявку'}
          </button>
        </p>

        {/* Back Link */}
        <button
          type="button"
          onClick={() => navigate('/')}
          className="block w-full text-center pt-2 text-[8px] uppercase tracking-[0.2em] text-muted-foreground hover:text-neon-green transition-colors"
        >
          ← {t('auth.backToHome')}
        </button>
      </div>
    </div>
  );
};

export default Auth;
