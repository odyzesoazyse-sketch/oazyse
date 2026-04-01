import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const authSchema = z.object({
  email: z.string().email('Неверный формат email'),
  password: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
  fullName: z.string().optional()
});

const Auth = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, signUp, signIn, signInWithGoogle } = useAuth();
  const { toast } = useToast();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/member', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      authSchema.parse({ email, password, fullName: isSignUp ? fullName : undefined });
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast({
          variant: 'destructive',
          title: t('auth.error'),
          description: err.errors[0].message
        });
        return;
      }
    }

    setLoading(true);
    
    try {
      if (isSignUp) {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          if (error.message.includes('already registered')) {
            toast({
              variant: 'destructive',
              title: t('auth.error'),
              description: t('auth.alreadyRegistered')
            });
          } else {
            throw error;
          }
        } else {
          toast({
            title: t('auth.success'),
            description: t('auth.signupSuccess')
          });
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            variant: 'destructive',
            title: t('auth.error'),
            description: t('auth.invalidCredentials')
          });
        }
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

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) throw error;
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

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-xs space-y-6 animate-fade-in">
        {/* Logo */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl tracking-wide font-normal bg-gradient-to-r from-neon-purple to-neon-green bg-clip-text text-transparent" style={{ fontFamily: 'Questrial, sans-serif' }}>
            oazyse°
          </h1>
          <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
            {isSignUp ? t('auth.createAccount') : t('auth.welcomeBack')}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {isSignUp && (
            <Input
              type="text"
              placeholder={t('auth.fullName')}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="h-9 text-[10px] bg-transparent border-border/30 focus:border-neon-purple/50 placeholder:text-muted-foreground/50 tracking-wide"
            />
          )}
          
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-9 text-[10px] bg-transparent border-border/30 focus:border-neon-purple/50 placeholder:text-muted-foreground/50 tracking-wide"
          />
          
          <Input
            type="password"
            placeholder={t('auth.password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-9 text-[10px] bg-transparent border-border/30 focus:border-neon-purple/50 placeholder:text-muted-foreground/50 tracking-wide"
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-9 text-[9px] uppercase tracking-[0.15em] bg-neon-purple/20 text-neon-purple border border-neon-purple/30 hover:bg-neon-purple/30 transition-all"
          >
            {loading ? '...' : isSignUp ? t('auth.signUp') : t('auth.signIn')}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-neon-purple/20" />
          </div>
          <div className="relative flex justify-center text-[8px] uppercase tracking-[0.2em]">
            <span className="bg-background px-3 text-muted-foreground">{t('auth.or')}</span>
          </div>
        </div>

        {/* Google Button */}
        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full h-9 text-[9px] uppercase tracking-[0.15em] border-border/30 hover:border-neon-green/50 hover:bg-neon-green/10 hover:text-neon-green transition-all"
        >
          {t('auth.continueWithGoogle')}
        </Button>

        {/* Toggle Sign Up / Sign In */}
        <p className="text-center text-[9px] text-muted-foreground tracking-wide">
          {isSignUp ? t('auth.haveAccount') : t('auth.noAccount')}{' '}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-neon-purple hover:text-neon-purple/80 transition-colors"
          >
            {isSignUp ? t('auth.signIn') : t('auth.signUp')}
          </button>
        </p>

        {/* Back Link */}
        <button
          type="button"
          onClick={() => navigate('/')}
          className="block w-full text-center text-[8px] uppercase tracking-[0.2em] text-muted-foreground hover:text-neon-green transition-colors"
        >
          ← {t('auth.backToHome')}
        </button>
      </div>
    </div>
  );
};

export default Auth;
