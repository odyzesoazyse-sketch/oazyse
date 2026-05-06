import { FormEvent, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface LeadFormProps {
  status: string;
  title: string;
  description: string;
  submitLabel: string;
}

const LeadForm = ({ status, title, description, submitLabel }: LeadFormProps) => {
  const { toast } = useToast();
  const [fullName, setFullName] = useState('');
  const [telegram, setTelegram] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanName = fullName.trim();
    const cleanTelegram = telegram.trim();
    const cleanEmail = email.trim();

    if (!cleanName) {
      toast({
        variant: 'destructive',
        title: 'Нужно имя',
        description: 'Оставь имя, чтобы мы понимали, к кому обращаться.'
      });
      return;
    }

    if (!cleanTelegram && !cleanEmail) {
      toast({
        variant: 'destructive',
        title: 'Нужен контакт',
        description: 'Оставь Telegram или email, иначе мы не сможем ответить.'
      });
      return;
    }

    setLoading(true);

    const { error } = await supabase.from('waitlist').insert({
      full_name: cleanName,
      telegram: cleanTelegram || null,
      email: cleanEmail || null,
      status
    });

    setLoading(false);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Заявка не ушла',
        description: 'Попробуй ещё раз или напиши напрямую в Telegram.'
      });
      return;
    }

    setSent(true);
    setFullName('');
    setTelegram('');
    setEmail('');
    toast({
      title: 'Заявка принята',
      description: 'Мы увидим контакт и вернёмся с следующим шагом.'
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="l-card"
      style={{
        display: 'grid',
        gap: '1rem',
        textAlign: 'left',
        marginTop: '2rem'
      }}
    >
      <div style={{ marginBottom: '0.5rem' }}>
        <span className="l-label" style={{ marginBottom: '0.9rem' }}>{title}</span>
        <p className="l-text" style={{ marginBottom: 0, fontSize: '0.82rem' }}>{description}</p>
      </div>

      <label className="l-mono" style={{ display: 'grid', gap: '0.55rem' }}>
        имя
        <input
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          placeholder="как к тебе обращаться"
          style={fieldStyle}
        />
      </label>

      <label className="l-mono" style={{ display: 'grid', gap: '0.55rem' }}>
        telegram
        <input
          value={telegram}
          onChange={(event) => setTelegram(event.target.value)}
          placeholder="@username"
          style={fieldStyle}
        />
      </label>

      <label className="l-mono" style={{ display: 'grid', gap: '0.55rem' }}>
        email
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="если удобнее через почту"
          type="email"
          style={fieldStyle}
        />
      </label>

      <button type="submit" className="l-btn" disabled={loading} style={{ marginTop: '0.75rem' }}>
        {loading ? 'отправляем...' : sent ? 'заявка отправлена' : submitLabel}
      </button>
    </form>
  );
};

const fieldStyle = {
  width: '100%',
  border: '1px solid hsl(var(--border) / 0.75)',
  background: 'hsl(var(--background) / 0.72)',
  color: 'hsl(var(--foreground))',
  borderRadius: '18px',
  padding: '0.95rem 1rem',
  fontFamily: 'Questrial, sans-serif',
  fontSize: '0.86rem',
  outline: 'none'
};

export default LeadForm;
