import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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
    <div className="space-y-8">
      <h2 className="section-title animate-fade-up">{t('contacts.title')}</h2>
      
      <div className="space-y-6 animate-fade-up" style={{ animationDelay: '100ms' }}>
        <p className="text-sm md:text-base leading-[1.8] font-serif text-muted-foreground text-pretty">
          {t('contacts.description')}
        </p>
        
        <div className="content-card">
          <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground/60 mb-1">
            {t('contacts.email')}
          </p>
          <a 
            href="mailto:contact@oazyse.ooo" 
            className="text-sm font-medium link-underline"
          >
            contact@oazyse.ooo
          </a>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 animate-fade-up" style={{ animationDelay: '200ms' }}>
        <Input 
          placeholder={t('contacts.namePlaceholder')} 
          value={formData.name} 
          onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
          className="input-elegant" 
        />
        <Input 
          type="email" 
          placeholder={t('contacts.emailPlaceholder')} 
          value={formData.email} 
          onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
          className="input-elegant" 
        />
        <Textarea 
          placeholder={t('contacts.messagePlaceholder')} 
          value={formData.message} 
          onChange={(e) => setFormData({ ...formData, message: e.target.value })} 
          className="input-elegant min-h-[120px] resize-none" 
        />
        <Button type="submit" className="btn-primary w-full mt-2">
          {t('contacts.submitButton')}
        </Button>
      </form>
    </div>
  );
};

export default ContactsSection;
