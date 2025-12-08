import { useTranslation } from 'react-i18next';

const serviceKeys = ['tea', 'satsang', 'hypnotherapy', 'meditation', 'consultations'];

const ServicesSection = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <h2 className="section-title animate-fade-up">{t('services.title')}</h2>
      
      <div className="grid gap-4">
        {serviceKeys.map((key, index) => (
          <div 
            key={key} 
            className="content-card animate-fade-up group"
            style={{ animationDelay: `${(index + 1) * 80}ms` }}
          >
            <div className="flex items-start gap-4">
              <span className="text-[10px] text-muted-foreground/60 font-medium tracking-wider mt-0.5">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="space-y-2 flex-1">
                <h3 className="text-xs font-semibold uppercase tracking-[0.15em] group-hover:tracking-[0.2em] transition-all duration-300">
                  {t(`services.items.${key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed font-serif text-muted-foreground text-pretty">
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
