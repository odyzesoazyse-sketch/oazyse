import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';
import { ArrowUpRight } from 'lucide-react';

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
    <div className="min-h-screen px-6 md:px-12 lg:px-24 py-12 pb-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left - Info */}
        <div className="space-y-12 animate-slide-up">
          <div className="space-y-6">
            <span className="yeezy-label text-muted-foreground">{t('contacts.title')}</span>
            <h1 className="font-display text-huge tracking-tight">
              СВЯЗАТЬСЯ
            </h1>
            <p className="yeezy-body text-muted-foreground max-w-md">
              {t('contacts.description')}
            </p>
          </div>

          <div className="space-y-6">
            <div className="yeezy-card">
              <span className="yeezy-label text-muted-foreground block mb-3">
                {t('contacts.email')}
              </span>
              <a 
                href="mailto:contact@oazyse.ooo" 
                className="font-display text-2xl md:text-3xl link-brutal"
              >
                CONTACT@OAZYSE.OOO
              </a>
            </div>
          </div>
        </div>

        {/* Right - Form */}
        <div className="animate-slide-up" style={{ animationDelay: '150ms' }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="yeezy-label text-muted-foreground">{t('contacts.namePlaceholder')}</label>
              <input 
                type="text"
                value={formData.name} 
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                className="w-full h-14 px-0 bg-transparent border-0 border-b border-border text-lg font-sans focus:outline-none focus:border-foreground transition-colors"
              />
            </div>
            
            <div className="space-y-2">
              <label className="yeezy-label text-muted-foreground">{t('contacts.emailPlaceholder')}</label>
              <input 
                type="email"
                value={formData.email} 
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                className="w-full h-14 px-0 bg-transparent border-0 border-b border-border text-lg font-sans focus:outline-none focus:border-foreground transition-colors"
              />
            </div>
            
            <div className="space-y-2">
              <label className="yeezy-label text-muted-foreground">{t('contacts.messagePlaceholder')}</label>
              <textarea 
                value={formData.message} 
                onChange={(e) => setFormData({ ...formData, message: e.target.value })} 
                rows={4}
                className="w-full px-0 py-4 bg-transparent border-0 border-b border-border text-lg font-sans focus:outline-none focus:border-foreground transition-colors resize-none"
              />
            </div>

            <button type="submit" className="yeezy-btn w-full flex items-center justify-center gap-3 mt-8">
              {t('contacts.submitButton')}
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactsSection;