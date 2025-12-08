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
    <div className="space-y-8">
      <h2 className="font-bold uppercase text-base md:text-lg">{t('contacts.title')}</h2>
      <div className="space-y-4">
        <p className="text-sm md:text-base leading-relaxed">{t('contacts.description')}</p>
        <p className="text-sm md:text-base"><span className="font-bold">{t('contacts.email')}:</span> contact@oazyse.ooo</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input placeholder={t('contacts.namePlaceholder')} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="border-foreground rounded-none" />
        <Input type="email" placeholder={t('contacts.emailPlaceholder')} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="border-foreground rounded-none" />
        <Input placeholder={t('contacts.messagePlaceholder')} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="border-foreground rounded-none" />
        <Button type="submit" className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-none">{t('contacts.submitButton')}</Button>
      </form>
    </div>
  );
};

export default ContactsSection;
