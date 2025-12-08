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
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="font-bold uppercase text-base md:text-lg">{t('oazyse.aboutTitle')}</h2>
        <p className="text-sm md:text-base leading-relaxed">{t('oazyse.aboutText1')}</p>
        <p className="text-sm md:text-base leading-relaxed">{t('oazyse.aboutText2')}</p>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold uppercase text-base md:text-lg">{t('oazyse.joinTitle')}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input placeholder={t('oazyse.namePlaceholder')} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="border-foreground rounded-none" />
          <Input type="email" placeholder={t('oazyse.emailPlaceholder')} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="border-foreground rounded-none" />
          <Input placeholder={t('oazyse.motivationPlaceholder')} value={formData.motivation} onChange={(e) => setFormData({ ...formData, motivation: e.target.value })} className="border-foreground rounded-none" />
          <Button type="submit" className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-none">{t('oazyse.submitButton')}</Button>
        </form>
      </div>
    </div>
  );
};

export default OazyseSection;
