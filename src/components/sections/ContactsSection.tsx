import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';

const ContactsSection = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({ title: t('contacts.errorTitle'), description: t('contacts.errorMessage') });
      return;
    }
    toast({ title: t('contacts.successTitle'), description: t('contacts.successMessage') });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="px-6 py-16 max-w-2xl mx-auto space-y-12">
      <div className="space-y-4">
        <span className="text-[10px] uppercase tracking-[0.2em] text-neon-purple">{t('contacts.title')}</span>
        <h1 className="title bg-gradient-to-r from-neon-purple to-neon-green bg-clip-text text-transparent">{t('contacts.title')}</h1>
        <p className="body">{t('contacts.description')}</p>
      </div>

      <div className="h-[1px] bg-gradient-to-r from-neon-purple via-neon-green to-transparent" />

      <div className="p-4 border border-neon-purple/30 rounded-lg hover:border-neon-purple hover:shadow-[0_0_20px_hsl(var(--neon-purple)/0.2)] transition-all">
        <span className="text-[10px] uppercase tracking-[0.2em] text-neon-green">{t('contacts.email')}</span>
        <a 
          href="mailto:contact@oazyse.ooo" 
          className="block mt-1 text-sm text-neon-purple hover:text-neon-green transition-colors"
        >
          contact@oazyse.ooo
        </a>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="group">
          <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground group-focus-within:text-neon-purple transition-colors">{t('contacts.namePlaceholder')}</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full mt-2 py-3 bg-transparent border-b border-border focus:border-neon-purple outline-none transition-colors"
          />
        </div>
        <div className="group">
          <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground group-focus-within:text-neon-green transition-colors">{t('contacts.emailPlaceholder')}</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full mt-2 py-3 bg-transparent border-b border-border focus:border-neon-green outline-none transition-colors"
          />
        </div>
        <div className="group">
          <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground group-focus-within:text-neon-purple transition-colors">{t('contacts.messagePlaceholder')}</label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={3}
            className="w-full mt-2 py-3 bg-transparent border-b border-border focus:border-neon-purple outline-none transition-colors resize-none"
          />
        </div>
        <button 
          type="submit" 
          className="px-6 py-3 bg-gradient-to-r from-neon-green to-neon-purple text-white text-[10px] uppercase tracking-[0.15em] rounded hover:shadow-[0_0_25px_hsl(var(--neon-green)/0.5)] transition-all"
        >
          {t('contacts.submitButton')}
        </button>
      </form>
    </div>
  );
};

export default ContactsSection;