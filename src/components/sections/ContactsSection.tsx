import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
    <div className="space-y-10">
      <h2 className="text-xs font-semibold uppercase tracking-widest animate-fade-up">{t('contacts.title')}</h2>
      
      <div className="space-y-4 animate-fade-up" style={{ animationDelay: '100ms' }}>
        <p className="text-sm md:text-base leading-relaxed font-serif text-pretty">{t('contacts.description')}</p>
        <p className="text-sm">
          <span className="font-medium">{t('contacts.email')}:</span>{' '}
          <a href="mailto:contact@oazyse.ooo" className="link-underline">contact@oazyse.ooo</a>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 animate-fade-up" style={{ animationDelay: '200ms' }}>
        <Input 
          placeholder={t('contacts.namePlaceholder')} 
          value={formData.name} 
          onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
          className="border-border focus:border-foreground rounded-none bg-transparent text-sm transition-colors" 
        />
        <Input 
          type="email" 
          placeholder={t('contacts.emailPlaceholder')} 
          value={formData.email} 
          onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
          className="border-border focus:border-foreground rounded-none bg-transparent text-sm transition-colors" 
        />
        <Input 
          placeholder={t('contacts.messagePlaceholder')} 
          value={formData.message} 
          onChange={(e) => setFormData({ ...formData, message: e.target.value })} 
          className="border-border focus:border-foreground rounded-none bg-transparent text-sm transition-colors" 
        />
        <Button 
          type="submit" 
          className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-none text-xs uppercase tracking-widest font-medium h-11 transition-all"
        >
          {t('contacts.submitButton')}
        </Button>
      </form>
    </div>
  );
};

export default ContactsSection;
