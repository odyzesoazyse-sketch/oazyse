import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';

const OazyseSection = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', motivation: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.motivation) {
      toast({ title: t('oazyse.errorTitle'), description: t('oazyse.errorMessage') });
      return;
    }
    toast({ title: t('oazyse.successTitle'), description: t('oazyse.successMessage') });
    setFormData({ name: '', email: '', motivation: '' });
  };

  return (
    <div className="px-6 py-16 max-w-2xl mx-auto space-y-16">
      <div className="space-y-4">
        <span className="label">{t('oazyse.aboutTitle')}</span>
        <h1 className="title">OAZYSE</h1>
      </div>

      <div className="space-y-6">
        <p className="body">{t('oazyse.aboutText1')}</p>
        <p className="body">{t('oazyse.aboutText2')}</p>
      </div>

      <div className="space-y-8">
        <span className="label">{t('oazyse.joinTitle')}</span>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="label">{t('oazyse.namePlaceholder')}</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full mt-2 py-3 bg-transparent border-b border-border focus:border-foreground outline-none transition-colors"
            />
          </div>
          <div>
            <label className="label">{t('oazyse.emailPlaceholder')}</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full mt-2 py-3 bg-transparent border-b border-border focus:border-foreground outline-none transition-colors"
            />
          </div>
          <div>
            <label className="label">{t('oazyse.motivationPlaceholder')}</label>
            <input
              type="text"
              value={formData.motivation}
              onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
              className="w-full mt-2 py-3 bg-transparent border-b border-border focus:border-foreground outline-none transition-colors"
            />
          </div>
          <button type="submit" className="px-6 py-3 bg-foreground text-background text-[10px] uppercase tracking-[0.15em]">
            {t('oazyse.submitButton')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OazyseSection;