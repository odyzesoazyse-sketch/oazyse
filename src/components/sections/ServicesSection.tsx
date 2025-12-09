import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';

const serviceKeys = ['tea', 'satsang', 'hypnotherapy', 'meditation', 'consultations'];

const ServicesSection = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen px-6 md:px-12 lg:px-24 py-12 pb-32">
      {/* Header */}
      <div className="mb-12 animate-slide-up">
        <span className="yeezy-label text-muted-foreground">{t('services.title')}</span>
        <h1 className="font-display text-huge tracking-tight mt-4">
          {t('services.title')}
        </h1>
      </div>

      {/* Services List */}
      <div className="border-t border-border">
        {serviceKeys.map((key, index) => (
          <div 
            key={key} 
            className="group border-b border-border py-8 md:py-12 cursor-pointer hover:bg-muted transition-colors animate-slide-up"
            style={{ animationDelay: `${(index + 1) * 100}ms` }}
          >
            <div className="flex items-start gap-6 md:gap-12">
              <span className="font-display text-4xl md:text-6xl text-muted-foreground/30 group-hover:text-muted-foreground/60 transition-colors">
                {String(index + 1).padStart(2, '0')}
              </span>
              
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl md:text-4xl tracking-tight group-hover:tracking-wide transition-all duration-300">
                    {t(`services.items.${key}.title`)}
                  </h3>
                  <ArrowRight className="w-6 h-6 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-2" />
                </div>
                <p className="yeezy-body text-muted-foreground max-w-2xl">
                  {t(`services.items.${key}.description`)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;