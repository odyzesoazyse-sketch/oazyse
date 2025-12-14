import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';
import { Zap, Brain, Sparkles } from 'lucide-react';

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
      {/* Header */}
      <div className="space-y-4">
        <span className="text-[10px] uppercase tracking-[0.2em] text-neon-purple">{t('oazyse.aboutTitle')}</span>
        <h1 className="text-3xl md:text-5xl font-light tracking-tight bg-gradient-to-r from-neon-purple via-neon-green to-neon-purple bg-clip-text text-transparent animate-neon-text-pulse">
          OAZYSE
        </h1>
      </div>

      <div className="h-[1px] bg-gradient-to-r from-neon-purple via-neon-green to-neon-purple animate-neon-line-pulse" />

      {/* About Text */}
      <div className="space-y-6">
        <p className="body relative pl-4 border-l-2 border-neon-purple hover:bg-neon-purple/5 transition-all py-2">
          {t('oazyse.aboutText1')}
        </p>
        <p className="body relative pl-4 border-l-2 border-neon-green hover:bg-neon-green/5 transition-all py-2">
          {t('oazyse.aboutText2')}
        </p>
        <p className="body relative pl-4 border-l-2 border-neon-purple hover:bg-neon-purple/5 transition-all py-2">
          {t('oazyse.aboutText3')}
        </p>
      </div>

      {/* Method Section */}
      <div className="space-y-6 p-6 border border-neon-purple/30 rounded-lg hover:border-neon-purple hover:shadow-[0_0_30px_hsl(var(--neon-purple)/0.2)] transition-all">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-purple to-neon-green flex items-center justify-center animate-neon-pulse-purple">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-light text-neon-purple">{t('oazyse.method.title')}</h2>
        </div>
        <p className="body text-muted-foreground">{t('oazyse.method.description')}</p>
        <p className="body text-muted-foreground">{t('oazyse.method.metasync')}</p>
        <div className="flex items-center gap-2 text-neon-green">
          <Zap className="w-4 h-4" />
          <span className="text-sm font-medium">{t('oazyse.method.results')}</span>
        </div>
      </div>

      {/* Join Form */}
      <div className="space-y-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-neon-green animate-neon-pulse-green" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-neon-green">{t('oazyse.joinTitle')}</span>
          </div>
          <p className="body text-muted-foreground">{t('oazyse.joinDescription')}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group">
            <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground group-focus-within:text-neon-purple transition-colors">
              {t('oazyse.namePlaceholder')}
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full mt-2 py-3 bg-transparent border-b border-border focus:border-neon-purple outline-none transition-colors"
            />
          </div>
          <div className="group">
            <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground group-focus-within:text-neon-green transition-colors">
              {t('oazyse.emailPlaceholder')}
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full mt-2 py-3 bg-transparent border-b border-border focus:border-neon-green outline-none transition-colors"
            />
          </div>
          <div className="group">
            <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground group-focus-within:text-neon-purple transition-colors">
              {t('oazyse.motivationPlaceholder')}
            </label>
            <textarea
              value={formData.motivation}
              onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
              rows={3}
              className="w-full mt-2 py-3 bg-transparent border-b border-border focus:border-neon-purple outline-none transition-colors resize-none"
            />
          </div>
          <button 
            type="submit" 
            className="w-full px-6 py-4 bg-gradient-to-r from-neon-purple to-neon-green text-white text-[10px] uppercase tracking-[0.15em] rounded hover:shadow-[0_0_30px_hsl(var(--neon-purple)/0.5)] transition-all animate-neon-pulse-purple"
          >
            {t('oazyse.submitButton')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OazyseSection;
