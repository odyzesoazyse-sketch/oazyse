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
        <span className="text-[10px] uppercase tracking-[0.2em] text-neon-purple">{t('oazyse.aboutTitle')}</span>
        <h1 className="text-3xl md:text-5xl font-light tracking-tight bg-gradient-to-r from-neon-purple via-neon-green to-neon-purple bg-clip-text text-transparent">OAZYSE</h1>
      </div>

      <div className="h-[1px] bg-gradient-to-r from-neon-purple via-neon-green to-neon-purple" />

      <div className="space-y-6">
        <p className="body relative pl-4 border-l-2 border-neon-purple">{t('oazyse.aboutText1')}</p>
        <p className="body relative pl-4 border-l-2 border-neon-green">{t('oazyse.aboutText2')}</p>
      </div>

      <div className="space-y-8">
        <span className="text-[10px] uppercase tracking-[0.2em] text-neon-green">{t('oazyse.joinTitle')}</span>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group">
            <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground group-focus-within:text-neon-purple transition-colors">{t('oazyse.namePlaceholder')}</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full mt-2 py-3 bg-transparent border-b border-border focus:border-neon-purple outline-none transition-colors"
            />
          </div>
          <div className="group">
            <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground group-focus-within:text-neon-green transition-colors">{t('oazyse.emailPlaceholder')}</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full mt-2 py-3 bg-transparent border-b border-border focus:border-neon-green outline-none transition-colors"
            />
          </div>
          <div className="group">
            <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground group-focus-within:text-neon-purple transition-colors">{t('oazyse.motivationPlaceholder')}</label>
            <input
              type="text"
              value={formData.motivation}
              onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
              className="w-full mt-2 py-3 bg-transparent border-b border-border focus:border-neon-purple outline-none transition-colors"
            />
          </div>
          <button 
            type="submit" 
            className="px-6 py-3 bg-gradient-to-r from-neon-purple to-neon-green text-white text-[10px] uppercase tracking-[0.15em] rounded hover:shadow-[0_0_25px_hsl(var(--neon-purple)/0.5)] transition-all"
          >
            {t('oazyse.submitButton')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OazyseSection;