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
      navigate('/');
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
    <div className="min-h-screen bg-background flex items-center justify-center px-5">
      <div className="w-full max-w-sm space-y-10 animate-fade-in">
        <div className="text-center space-y-3">
          <h1 className="font-serif italic text-4xl">Oazyse</h1>
          <p className="text-sm text-muted-foreground tracking-wide">
            {isSignUp ? t('auth.createAccount') : t('auth.welcomeBack')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <Input
              type="text"
              placeholder={t('auth.fullName')}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="input-elegant"
            />
          )}
          
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-elegant"
          />
          
          <Input
            type="password"
            placeholder={t('auth.password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-elegant"
          />

          <Button
            type="submit"
            disabled={loading}
            className="btn-primary w-full mt-2"
          >
            {loading ? '...' : isSignUp ? t('auth.signUp') : t('auth.signIn')}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/30" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-[0.15em]">
            <span className="bg-background px-4 text-muted-foreground">{t('auth.or')}</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full h-12 text-xs uppercase tracking-[0.1em] font-medium border-border/50 hover:border-foreground hover:bg-muted/30 transition-all"
        >
          {t('auth.continueWithGoogle')}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          {isSignUp ? t('auth.haveAccount') : t('auth.noAccount')}{' '}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-foreground font-medium link-underline"
          >
            {isSignUp ? t('auth.signIn') : t('auth.signUp')}
          </button>
        </p>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="block w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wider"
        >
          ← {t('auth.backToHome')}
        </button>
      </div>
    </div>
  );
};

export default Auth;
