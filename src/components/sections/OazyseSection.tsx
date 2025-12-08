import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
    <div className="space-y-12">
      <div className="space-y-8 animate-fade-up">
        <h2 className="section-title">{t('oazyse.aboutTitle')}</h2>
        <div className="space-y-5">
          <p className="text-sm md:text-base leading-[1.8] font-serif text-muted-foreground text-pretty">
            {t('oazyse.aboutText1')}
          </p>
          <p className="text-sm md:text-base leading-[1.8] font-serif text-muted-foreground text-pretty">
            {t('oazyse.aboutText2')}
          </p>
        </div>
      </div>

      <div className="space-y-6 animate-fade-up" style={{ animationDelay: '150ms' }}>
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] pb-4 border-b border-border/30">
          {t('oazyse.joinTitle')}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            placeholder={t('oazyse.namePlaceholder')} 
            value={formData.name} 
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
            className="input-elegant" 
          />
          <Input 
            type="email" 
            placeholder={t('oazyse.emailPlaceholder')} 
            value={formData.email} 
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
            className="input-elegant" 
          />
          <Input 
            placeholder={t('oazyse.motivationPlaceholder')} 
            value={formData.motivation} 
            onChange={(e) => setFormData({ ...formData, motivation: e.target.value })} 
            className="input-elegant" 
          />
          <Button type="submit" className="btn-primary w-full mt-2">
            {t('oazyse.submitButton')}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default OazyseSection;
