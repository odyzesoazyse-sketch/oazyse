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
        <span className="label">{t('contacts.title')}</span>
        <h1 className="title">{t('contacts.title')}</h1>
        <p className="body">{t('contacts.description')}</p>
      </div>

      <div>
        <span className="label">{t('contacts.email')}</span>
        <a href="mailto:contact@oazyse.ooo" className="block mt-1 text-sm hover:opacity-50 transition-opacity">
          contact@oazyse.ooo
        </a>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="label">{t('contacts.namePlaceholder')}</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full mt-2 py-3 bg-transparent border-b border-border focus:border-foreground outline-none transition-colors"
          />
        </div>
        <div>
          <label className="label">{t('contacts.emailPlaceholder')}</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full mt-2 py-3 bg-transparent border-b border-border focus:border-foreground outline-none transition-colors"
          />
        </div>
        <div>
          <label className="label">{t('contacts.messagePlaceholder')}</label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={3}
            className="w-full mt-2 py-3 bg-transparent border-b border-border focus:border-foreground outline-none transition-colors resize-none"
          />
        </div>
        <button type="submit" className="px-6 py-3 bg-foreground text-background text-[10px] uppercase tracking-[0.15em]">
          {t('contacts.submitButton')}
        </button>
      </form>
    </div>
  );
};

export default ContactsSection;