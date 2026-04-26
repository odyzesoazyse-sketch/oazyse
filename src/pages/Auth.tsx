import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import LandingShell, { Divider } from '@/components/LandingShell';

type AuthMode = 'signup' | 'login' | 'confirm-email';

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error) return error.message;
  return fallback;
};

const Auth = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, signIn, signUp } = useAuth();
  const { toast } = useToast();

  const [mode, setMode] = useState<AuthMode>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [telegram, setTelegram] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/member', { replace: true });
    }
  }, [user, navigate]);

  const resetPasswordFields = () => {
    setPassword('');
    setConfirmPassword('');
  };

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    resetPasswordFields();
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: 'Введите имя, чтобы создать аккаунт Oazyse.'
      });
      return;
    }

    if (password.length < 6) {
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: 'Пароль должен содержать минимум 6 символов.'
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: 'Пароли не совпадают.'
      });
      return;
    }

    setLoading(true);

    try {
      const { error, session } = await signUp(email.trim(), password, fullName.trim());
      if (error) throw error;

      const { error: waitlistError } = await supabase.from('waitlist').insert({
        full_name: fullName.trim(),
        email: email.trim(),
        telegram: telegram.trim() || null,
        status: 'registered'
      });

      if (waitlistError) {
        console.warn('Failed to save registration contact:', waitlistError);
      }

      if (!session) {
        setMode('confirm-email');
        return;
      }

      navigate('/member', { replace: true });
    } catch (error: unknown) {
      toast({
        variant: 'destructive',
        title: 'Ошибка регистрации',
        description: getErrorMessage(error, 'Не удалось создать аккаунт. Попробуйте позже.')
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signIn(email.trim(), password);
      if (error) {
        toast({
          variant: 'destructive',
          title: t('auth.error'),
          description: t('auth.invalidCredentials')
        });
      }
    } catch (error: unknown) {
      toast({
        variant: 'destructive',
        title: t('auth.error'),
        description: getErrorMessage(error, 'Не удалось войти. Попробуйте позже.')
      });
    } finally {
      setLoading(false);
    }
  };

  if (mode === 'confirm-email') {
    return (
      <LandingShell>
        <section className="l-hero" style={{ minHeight: '70vh', paddingTop: '7rem' }}>
          <div className="w-full max-w-md text-center px-4">
            <h1 className="text-4xl tracking-wide font-normal bg-gradient-to-r from-neon-purple to-neon-green bg-clip-text text-transparent" style={{ fontFamily: 'Questrial, sans-serif' }}>
              почти внутри.
            </h1>
            <p className="mt-5 text-[11px] uppercase tracking-[0.16em] text-muted-foreground leading-relaxed">
              мы отправили письмо на ваш email. подтвердите адрес, затем войдите в свой кабинет.
            </p>
            <div className="w-full space-y-3 pt-8">
              <Button
                type="button"
                onClick={() => switchMode('login')}
                className="w-full h-11 rounded-full text-[10px] uppercase tracking-[0.18em] bg-gradient-to-r from-neon-purple/12 to-neon-green/12 text-foreground border border-border/70 hover:border-neon-purple/35 hover:bg-white transition-all"
              >
                перейти ко входу
              </Button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="block w-full text-center pt-2 text-[8px] uppercase tracking-[0.2em] text-muted-foreground hover:text-neon-green transition-colors"
              >
                вернуться на главную
              </button>
            </div>
          </div>
        </section>
      </LandingShell>
    );
  }

  const isSignup = mode === 'signup';

  return (
    <LandingShell>
      <section className="l-hero" style={{ minHeight: '34vh', paddingTop: '7rem' }}>
        <div className="text-center space-y-3" data-reveal>
          <h1 className="text-4xl md:text-5xl tracking-wide font-normal bg-gradient-to-r from-neon-purple to-neon-green bg-clip-text text-transparent" style={{ fontFamily: 'Questrial, sans-serif' }}>
            oazyse°
          </h1>
          <p className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
            {isSignup ? 'вступить в oazyse' : 'вход в пространство'}
          </p>
        </div>
      </section>

      <Divider />

      <section className="l-section" style={{ paddingTop: '3.5rem', paddingBottom: '10rem' }}>
        <div className="mx-auto w-full max-w-md animate-fade-in">
          <div
            className="space-y-6 rounded-[32px] border border-border/70 px-5 py-6 md:px-7 md:py-8"
            style={{
              background: 'linear-gradient(180deg, hsl(var(--background)/0.96), hsl(var(--card)/0.86))',
              boxShadow: '0 20px 80px hsl(var(--neon-purple)/0.05)',
            }}
          >
          <div className="grid grid-cols-2 gap-1 rounded-full border border-border/50 p-1">
            <button
              type="button"
              onClick={() => switchMode('signup')}
              className={`h-9 rounded-full text-[9px] uppercase tracking-[0.15em] transition-all ${
                isSignup ? 'bg-gradient-to-r from-neon-purple/12 to-neon-green/10 text-foreground border border-neon-purple/20' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              аккаунт
            </button>
            <button
              type="button"
              onClick={() => switchMode('login')}
              className={`h-9 rounded-full text-[9px] uppercase tracking-[0.15em] transition-all ${
                !isSignup ? 'bg-gradient-to-r from-neon-green/12 to-neon-purple/10 text-foreground border border-neon-green/20' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              войти
            </button>
          </div>

          {isSignup ? (
            <form onSubmit={handleSignupSubmit} className="space-y-3">
              <Input
                type="text"
                placeholder="ваше имя"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="h-11 rounded-full px-4 text-[11px] bg-white/70 border-border/40 focus:border-neon-purple/35 placeholder:text-muted-foreground/50 tracking-wide"
              />
              <Input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 rounded-full px-4 text-[11px] bg-white/70 border-border/40 focus:border-neon-purple/35 placeholder:text-muted-foreground/50 tracking-wide"
              />
              <Input
                type="text"
                placeholder="telegram @username (если есть)"
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
                className="h-11 rounded-full px-4 text-[11px] bg-white/70 border-border/40 focus:border-neon-purple/35 placeholder:text-muted-foreground/50 tracking-wide"
              />
              <Input
                type="password"
                placeholder="пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="h-11 rounded-full px-4 text-[11px] bg-white/70 border-border/40 focus:border-neon-purple/35 placeholder:text-muted-foreground/50 tracking-wide"
              />
              <Input
                type="password"
                placeholder="повторите пароль"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="h-11 rounded-full px-4 text-[11px] bg-white/70 border-border/40 focus:border-neon-purple/35 placeholder:text-muted-foreground/50 tracking-wide"
              />

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 mt-2 rounded-full text-[10px] uppercase tracking-[0.18em] bg-gradient-to-r from-neon-purple/12 to-neon-green/12 text-foreground border border-border/70 hover:border-neon-purple/35 hover:bg-white transition-all"
              >
                {loading ? '...' : 'вступить в oazyse'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleLoginSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 rounded-full px-4 text-[11px] bg-white/70 border-border/40 focus:border-neon-purple/35 placeholder:text-muted-foreground/50 tracking-wide"
              />
              <Input
                type="password"
                placeholder={t('auth.password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 rounded-full px-4 text-[11px] bg-white/70 border-border/40 focus:border-neon-purple/35 placeholder:text-muted-foreground/50 tracking-wide"
              />
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 mt-2 rounded-full text-[10px] uppercase tracking-[0.18em] bg-gradient-to-r from-neon-green/12 to-neon-purple/10 text-foreground border border-border/70 hover:border-neon-green/35 hover:bg-white transition-all"
              >
                {loading ? '...' : t('auth.signIn')}
              </Button>
            </form>
          )}

          <p className="text-center text-[10px] text-muted-foreground leading-relaxed tracking-wide">
            {isSignup
              ? 'Это твоя личная точка входа в Oazyse. Дальше мы мягко проведём тебя внутрь пространства и в Telegram.'
              : 'Если точки входа ещё нет, создай её и войди в Oazyse через один общий контур: сайт, канал и бот.'}
          </p>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="block w-full text-center pt-2 text-[8px] uppercase tracking-[0.2em] text-muted-foreground hover:text-neon-green transition-colors"
          >
            ← {t('auth.backToHome')}
          </button>
          </div>
        </div>
      </section>
    </LandingShell>
  );
};

export default Auth;
