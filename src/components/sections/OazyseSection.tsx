import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';
import { ArrowUpRight } from 'lucide-react';

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
    <div className="min-h-screen px-6 md:px-12 lg:px-24 py-12 pb-32">
      {/* Hero */}
      <div className="relative mb-20 animate-slide-up">
        <span className="font-display text-[30vw] md:text-[20vw] absolute -top-16 -left-4 opacity-[0.03] pointer-events-none leading-none">
          O
        </span>
        <div className="relative z-10 space-y-6">
          <span className="yeezy-label text-muted-foreground">{t('oazyse.aboutTitle')}</span>
          <h1 className="font-display text-massive tracking-tight">
            OAZYSE
          </h1>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-20">
        <p className="yeezy-body text-muted-foreground animate-slide-up" style={{ animationDelay: '100ms' }}>
          {t('oazyse.aboutText1')}
        </p>
        <p className="yeezy-body text-muted-foreground animate-slide-up" style={{ animationDelay: '200ms' }}>
          {t('oazyse.aboutText2')}
        </p>
      </div>

      <div className="yeezy-divider" />

      {/* Join Form */}
      <div className="max-w-xl mx-auto animate-slide-up" style={{ animationDelay: '300ms' }}>
        <div className="text-center mb-12">
          <span className="yeezy-label text-muted-foreground">{t('oazyse.joinTitle')}</span>
          <h2 className="font-display text-display tracking-tight mt-4">
            ПРИСОЕДИНИТЬСЯ
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="yeezy-label text-muted-foreground">{t('oazyse.namePlaceholder')}</label>
            <input 
              type="text"
              value={formData.name} 
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
              className="w-full h-14 px-0 bg-transparent border-0 border-b border-border text-lg font-sans focus:outline-none focus:border-foreground transition-colors"
            />
          </div>
          
          <div className="space-y-2">
            <label className="yeezy-label text-muted-foreground">{t('oazyse.emailPlaceholder')}</label>
            <input 
              type="email"
              value={formData.email} 
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
              className="w-full h-14 px-0 bg-transparent border-0 border-b border-border text-lg font-sans focus:outline-none focus:border-foreground transition-colors"
            />
          </div>
          
          <div className="space-y-2">
            <label className="yeezy-label text-muted-foreground">{t('oazyse.motivationPlaceholder')}</label>
            <input 
              type="text"
              value={formData.motivation} 
              onChange={(e) => setFormData({ ...formData, motivation: e.target.value })} 
              className="w-full h-14 px-0 bg-transparent border-0 border-b border-border text-lg font-sans focus:outline-none focus:border-foreground transition-colors"
            />
          </div>

          <button type="submit" className="yeezy-btn w-full flex items-center justify-center gap-3 mt-8">
            {t('oazyse.submitButton')}
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default OazyseSection;